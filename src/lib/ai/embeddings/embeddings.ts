import { getAIConfig } from "../config";

export interface EmbeddingResult {
  embedding: number[];
  dimensions: number;
}

export interface EmbeddingModel {
  readonly modelName: string;
  isAvailable(): Promise<boolean>;
  embedQuery(text: string): Promise<number[] | null>;
  cosineSimilarity(vecA: number[], vecB: number[]): number;
}

/**
 * Future-compatible adapter targeting intfloat/multilingual-e5-small via Ollama or custom local server.
 */
export class OllamaMultilingualEmbeddingAdapter implements EmbeddingModel {
  public readonly modelName: string;
  private baseUrl: string;

  constructor(modelName?: string, baseUrl?: string) {
    const config = getAIConfig();
    this.modelName = modelName || config.ollamaEmbedModel || "multilingual-e5-small";
    this.baseUrl = baseUrl || config.ollamaBaseUrl || "http://localhost:11434";
  }

  async isAvailable(): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 2000);
      const res = await fetch(`${this.baseUrl}/api/tags`, {
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (!res.ok) return false;
      const data = await res.json();
      return Array.isArray(data?.models) && data.models.some((m: { name: string }) => m.name.includes(this.modelName));
    } catch {
      return false;
    }
  }

  async embedQuery(text: string): Promise<number[] | null> {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 4000);

      const res = await fetch(`${this.baseUrl}/api/embeddings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: this.modelName,
          prompt: text,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (!res.ok) return null;
      const data = await res.json();
      if (Array.isArray(data?.embedding)) {
        return data.embedding;
      }
      return null;
    } catch {
      return null;
    }
  }

  cosineSimilarity(vecA: number[], vecB: number[]): number {
    if (vecA.length !== vecB.length || vecA.length === 0) return 0;
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i]! * vecB[i]!;
      normA += vecA[i]! * vecA[i]!;
      normB += vecB[i]! * vecB[i]!;
    }
    if (normA === 0 || normB === 0) return 0;
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }
}

