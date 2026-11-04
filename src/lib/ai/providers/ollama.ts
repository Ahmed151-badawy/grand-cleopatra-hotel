import {
  AIProvider,
  ChatMessage,
  CompletionOptions,
  CompletionResult,
  ProviderHealth,
  AITimeoutError,
  AIProviderError,
} from "../types";
import { getAIConfig } from "../config";

export class OllamaProvider implements AIProvider {
  public readonly name = "ollama";
  public readonly model: string;
  private baseUrl: string;

  constructor(model?: string, baseUrl?: string) {
    const config = getAIConfig();
    this.model = model || config.ollamaModel || "qwen2.5:3b";
    this.baseUrl = baseUrl || config.ollamaBaseUrl || "http://localhost:11434";
  }

  async healthCheck(): Promise<ProviderHealth> {
    const startTime = Date.now();
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3000);

      const res = await fetch(`${this.baseUrl}/api/tags`, {
        signal: controller.signal,
      });
      clearTimeout(timeout);
      const latencyMs = Date.now() - startTime;

      if (!res.ok) {
        return {
          status: "degraded",
          providerName: this.name,
          modelName: this.model,
          modelAvailable: false,
          message: `Ollama returned HTTP status ${res.status}`,
          latencyMs,
        };
      }

      const data = await res.json();
      const availableModels: string[] = Array.isArray(data?.models)
        ? data.models.map((m: { name: string }) => m.name)
        : [];

      const modelExists = availableModels.some(
        (name) => name === this.model || name.startsWith(`${this.model}:`)
      );

      return {
        status: modelExists ? "online" : "degraded",
        providerName: this.name,
        modelName: this.model,
        modelAvailable: modelExists,
        message: modelExists
          ? `Ollama online with model ${this.model}`
          : `Ollama running, but target model '${this.model}' is not pulled yet (Available: ${availableModels.join(", ") || "none"})`,
        latencyMs,
      };
    } catch (err: unknown) {
      const latencyMs = Date.now() - startTime;
      const isAbort = (err as Error)?.name === "AbortError";
      return {
        status: "offline",
        providerName: this.name,
        modelName: this.model,
        modelAvailable: false,
        message: isAbort
          ? `Ollama health check timed out after 3000ms`
          : `Could not connect to Ollama daemon at ${this.baseUrl}: ${(err as Error)?.message || "Connection refused"}`,
        latencyMs,
      };
    }
  }

  async generateCompletion(
    messages: ChatMessage[],
    options: CompletionOptions = {}
  ): Promise<CompletionResult> {
    const config = getAIConfig();
    const timeoutMs = options.timeoutMs || config.timeoutMs || 15000;
    const startTime = Date.now();

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, timeoutMs);

    // If external signal is provided, forward it
    if (options.signal) {
      options.signal.addEventListener("abort", () => controller.abort());
    }

    try {
      // Map ChatMessage format to Ollama /api/chat payload
      const formattedMessages = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch(`${this.baseUrl}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: this.model,
          messages: formattedMessages,
          stream: false,
          options: {
            temperature: options.temperature !== undefined ? options.temperature : 0.4,
            num_predict: options.maxTokens || 600,
          },
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const errorText = await res.text().catch(() => "");
        throw new AIProviderError(`Ollama API error (${res.status}): ${errorText}`);
      }

      const data = await res.json();
      const outputText = data?.message?.content || "";
      const latencyMs = Date.now() - startTime;

      return {
        text: outputText.trim(),
        model: this.model,
        source: "ollama_model",
        latencyMs,
        usage: {
          promptTokens: data?.prompt_eval_count,
          completionTokens: data?.eval_count,
        },
      };
    } catch (err: unknown) {
      clearTimeout(timeoutId);

      if ((err as Error)?.name === "AbortError") {
        throw new AITimeoutError(
          `Ollama model inference timed out after ${timeoutMs}ms for model '${this.model}'`
        );
      }

      if (err instanceof AIProviderError || err instanceof AITimeoutError) {
        throw err;
      }

      throw new AIProviderError(
        `Failed to communicate with Ollama at ${this.baseUrl}: ${(err as Error)?.message || "Network error"}`,
        err
      );
    }
  }
}
