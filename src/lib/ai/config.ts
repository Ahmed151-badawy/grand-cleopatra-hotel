export interface AIConfig {
  provider: "ollama" | "fallback";
  ollamaBaseUrl: string;
  ollamaModel: string;
  ollamaEmbedModel: string;
  timeoutMs: number;
  rateLimitMax: number;
  rateLimitWindowMs: number;
  retrievalThreshold: number;
  maxRetrievedChunks: number;
  hotelContact: {
    phone: string;
    whatsapp: string;
    email: string;
  };
}

export function getAIConfig(): AIConfig {
  const provider = (process.env.AI_PROVIDER || "ollama").toLowerCase() as "ollama" | "fallback";

  return {
    provider: provider === "fallback" ? "fallback" : "ollama",
    ollamaBaseUrl: process.env.OLLAMA_BASE_URL || "http://localhost:11434",
    ollamaModel: process.env.OLLAMA_MODEL || "qwen2.5:3b",
    ollamaEmbedModel: process.env.OLLAMA_EMBED_MODEL || "multilingual-e5-small",
    timeoutMs: Number(process.env.AI_REQUEST_TIMEOUT_MS) || 15000,
    rateLimitMax: Number(process.env.AI_RATE_LIMIT_MAX) || 30,
    rateLimitWindowMs: Number(process.env.AI_RATE_LIMIT_WINDOW_MS) || 60000,
    retrievalThreshold: Number(process.env.AI_RETRIEVAL_THRESHOLD) || 0.35,
    maxRetrievedChunks: Number(process.env.AI_MAX_RETRIEVED_CHUNKS) || 4,
    hotelContact: {
      phone: process.env.NEXT_PUBLIC_HOTEL_PHONE || "+20 100 345 6789",
      whatsapp: process.env.NEXT_PUBLIC_HOTEL_WHATSAPP || "+201003456789",
      email: process.env.NEXT_PUBLIC_HOTEL_EMAIL || "info@grandcleopatrahotelux.com",
    },
  };
}

