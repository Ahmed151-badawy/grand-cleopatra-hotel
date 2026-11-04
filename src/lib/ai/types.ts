export type LanguageCode = "en" | "ar" | "de" | "fr" | "es" | "other";

export type VerificationStatus = "verified" | "unverified" | "owner_confirmation_required";

export interface KnowledgeRecord {
  id: string;
  category: string;
  title: string;
  content: string;
  language: string;
  keywords: string[];
  source: string;
  verificationStatus: VerificationStatus;
  lastVerified: string;
  ownerConfirmationRequired: boolean;
}

export interface AttractionRecord {
  id: string;
  category: "attraction";
  name: string;
  bank: "West Bank" | "East Bank" | "West Bank / East Bank River";
  distanceFromHotelKm: number;
  travelTimeFromHotel: string;
  suggestedDurationHours: number;
  bestTimeOfDay: string;
  description: string;
  practicalTips: string;
  keywords: string[];
  source: string;
  verificationStatus: VerificationStatus;
  lastVerified: string;
  ownerConfirmationRequired: boolean;
}

export function isKnowledgeRecord(rec: KnowledgeRecord | AttractionRecord): rec is KnowledgeRecord {
  return "title" in rec && "content" in rec;
}

export function isAttractionRecord(rec: KnowledgeRecord | AttractionRecord): rec is AttractionRecord {
  return "bank" in rec && "description" in rec;
}

export interface RetrievalResult {
  record: KnowledgeRecord | AttractionRecord;
  score: number;
  confidence: "high" | "medium" | "low";
  matchedKeywords: string[];
  sourceId: string;
  verificationStatus: VerificationStatus;
}

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
  timestamp?: string;
  source?: "ollama_model" | "fallback_engine";
  retrievedSources?: Array<{ id: string; title: string; category: string; verificationStatus: VerificationStatus }>;
}

export interface CompletionOptions {
  temperature?: number;
  maxTokens?: number;
  timeoutMs?: number;
  signal?: AbortSignal;
}

export interface CompletionResult {
  text: string;
  model: string;
  source: "ollama_model" | "fallback_engine";
  latencyMs: number;
  usage?: {
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
  };
}

export interface ProviderHealth {
  status: "online" | "offline" | "degraded";
  providerName: string;
  modelName: string;
  modelAvailable: boolean;
  message: string;
  latencyMs?: number;
}

export interface AIProvider {
  readonly name: string;
  readonly model: string;
  generateCompletion(
    messages: ChatMessage[],
    options?: CompletionOptions
  ): Promise<CompletionResult>;
  healthCheck(): Promise<ProviderHealth>;
}

export interface RetrievalAdapter {
  search(query: string, options?: { maxResults?: number; threshold?: number }): Promise<RetrievalResult[]>;
}

// Normalized Error Hierarchy
export class AIError extends Error {
  public code: string;
  public status: number;
  public details?: unknown;

  constructor(message: string, code: string, status: number = 500, details?: unknown) {
    super(message);
    this.name = "AIError";
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

export class AITimeoutError extends AIError {
  constructor(message: string = "AI model request timed out") {
    super(message, "AI_TIMEOUT", 504);
    this.name = "AITimeoutError";
  }
}

export class AIProviderError extends AIError {
  constructor(message: string, details?: unknown) {
    super(message, "AI_PROVIDER_ERROR", 502, details);
    this.name = "AIProviderError";
  }
}

export class AIValidationError extends AIError {
  constructor(message: string, details?: unknown) {
    super(message, "AI_VALIDATION_ERROR", 400, details);
    this.name = "AIValidationError";
  }
}

export class AIRateLimitError extends AIError {
  constructor(message: string = "Too many requests. Please wait a moment.") {
    super(message, "AI_RATE_LIMIT", 429);
    this.name = "AIRateLimitError";
  }
}

export class AIInjectionDetectedError extends AIError {
  constructor(message: string = "Security rule violation: prohibited input detected.") {
    super(message, "AI_INJECTION_DETECTED", 400);
    this.name = "AIInjectionDetectedError";
  }
}
