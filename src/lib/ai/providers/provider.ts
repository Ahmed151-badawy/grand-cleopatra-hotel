import {
  AIProvider,
  ChatMessage,
  CompletionOptions,
  CompletionResult,
  ProviderHealth,
} from "../types";
import { getAIConfig } from "../config";
import { OllamaProvider } from "./ollama";
import { FallbackProvider } from "./fallback";

export class ResilientAIProvider implements AIProvider {
  public readonly name: string;
  public readonly model: string;
  private primaryProvider: AIProvider;
  private fallbackProvider: FallbackProvider;
  private isCircuitOpen: boolean = false;
  private lastFailureTime: number = 0;
  private readonly cooldownMs: number = 30000; // 30 seconds circuit breaker

  constructor(primary?: AIProvider) {
    const config = getAIConfig();
    this.fallbackProvider = new FallbackProvider();

    if (config.provider === "fallback") {
      this.primaryProvider = this.fallbackProvider;
    } else {
      this.primaryProvider = primary || new OllamaProvider();
    }

    this.name = this.primaryProvider.name;
    this.model = this.primaryProvider.model;
  }

  async healthCheck(): Promise<ProviderHealth> {
    return this.primaryProvider.healthCheck();
  }

  async generateCompletion(
    messages: ChatMessage[],
    options: CompletionOptions = {}
  ): Promise<CompletionResult> {
    const now = Date.now();

    // If circuit breaker is open and still in cooldown, route directly to fallback
    if (this.isCircuitOpen && now - this.lastFailureTime < this.cooldownMs) {
      return this.fallbackProvider.generateCompletion(messages, options);
    }

    try {
      const result = await this.primaryProvider.generateCompletion(messages, options);
      // Success: reset circuit breaker
      this.isCircuitOpen = false;
      return result;
    } catch (err) {
      this.isCircuitOpen = true;
      this.lastFailureTime = Date.now();
      console.warn(
        `[Cleopatra AI] Primary provider '${this.primaryProvider.name}' unavailable. Circuit breaker OPEN for 30s. Routing to grounded fallback. Error: ${(err as Error)?.message}`
      );
      return await this.fallbackProvider.generateCompletion(messages, options);
    }
  }
}

let cachedProvider: AIProvider | null = null;

export function getAIProvider(): AIProvider {
  if (!cachedProvider) {
    cachedProvider = new ResilientAIProvider();
  }
  return cachedProvider;
}
