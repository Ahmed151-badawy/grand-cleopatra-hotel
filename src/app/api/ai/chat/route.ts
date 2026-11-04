import { NextRequest, NextResponse } from "next/server";
import { ChatRequestSchema } from "@/lib/ai/validation/schemas";
import { defaultConciergeEngine } from "@/lib/ai/concierge/concierge";
import { checkRateLimit } from "@/lib/ai/security/rate-limiter";
import { detectPromptInjection } from "@/lib/ai/security/injection-detector";
import { sanitizeInput, sanitizeOutput } from "@/lib/ai/security/sanitizer";
import { AIError } from "@/lib/ai/types";

export async function POST(req: NextRequest) {
  try {
    // 1. Client IP Extraction & Sliding-Window Rate Limiting
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

    const rateLimit = await checkRateLimit(ip, 20, 60000);

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please wait a moment before sending another message.",
          code: "AI_RATE_LIMIT",
          retryAfterMs: rateLimit.resetMs,
        },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil(rateLimit.resetMs / 1000).toString(),
          },
        }
      );
    }

    // 2. Request JSON Body Parsing
    let rawBody: unknown;
    try {
      rawBody = await req.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid JSON request body.",
          code: "INVALID_JSON",
        },
        { status: 400 }
      );
    }

    // 3. Zod Schema Validation
    const validation = ChatRequestSchema.safeParse(rawBody);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed.",
          code: "AI_VALIDATION_ERROR",
          issues: validation.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { message, conversationId, sessionId, language } = validation.data;
    const activeConversationId = conversationId || sessionId;

    // 4. Prompt Injection & Jailbreak Detection
    const injectionCheck = detectPromptInjection(message);
    if (injectionCheck.isInjection) {
      return NextResponse.json(
        {
          success: false,
          error: "Security rule violation: prohibited prompt injection pattern detected.",
          code: "AI_INJECTION_DETECTED",
          reason: injectionCheck.reason,
        },
        { status: 400 }
      );
    }

    // 5. Input Sanitization
    const sanitizedInput = sanitizeInput(message, 1000);
    if (!sanitizedInput) {
      return NextResponse.json(
        {
          success: false,
          error: "Message contains only invalid or empty characters.",
          code: "EMPTY_MESSAGE",
        },
        { status: 400 }
      );
    }

    // 6. Execute Concierge Engine
    const result = await defaultConciergeEngine.processMessage(sanitizedInput, {
      conversationId: activeConversationId,
      preferredLanguage: language === "auto" ? undefined : language,
    });

    // 7. Output Sanitization
    const safeResponse = sanitizeOutput(result.response);

    // 8. Return Structured Response
    return NextResponse.json(
      {
        success: true,
        conversationId: result.conversationId,
        detectedLanguage: result.detectedLanguage,
        intent: result.intent,
        response: safeResponse,
        source: result.source,
        confidence: result.confidence,
        retrievedKnowledgeIds: result.retrievedKnowledgeIds,
        requiresHumanConfirmation: result.requiresHumanConfirmation,
        whatsappHandoff: result.whatsappHandoff,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    if (err instanceof AIError) {
      return NextResponse.json(
        {
          success: false,
          error: err.message,
          code: err.code,
        },
        { status: err.status }
      );
    }

    const message = err instanceof Error ? err.message : "Internal server error occurred.";
    return NextResponse.json(
      {
        success: false,
        error: message,
        code: "INTERNAL_AI_ERROR",
      },
      { status: 500 }
    );
  }
}
