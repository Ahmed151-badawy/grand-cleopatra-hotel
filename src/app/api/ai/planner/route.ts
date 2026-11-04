import { NextRequest, NextResponse } from "next/server";
import { PlannerRequestSchema } from "@/lib/ai/validation/schemas";
import { defaultTravelPlannerEngine } from "@/lib/ai/planner/travel-planner";
import { checkRateLimit } from "@/lib/ai/security/rate-limiter";
import { detectPromptInjection } from "@/lib/ai/security/injection-detector";
import { sanitizeInput } from "@/lib/ai/security/sanitizer";
import { AIError } from "@/lib/ai/types";

export async function POST(req: NextRequest) {
  try {
    // 1. Client IP Extraction & Sliding-Window Rate Limiting
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

    const rateLimit = await checkRateLimit(ip, 15, 60000);

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many travel planner requests. Please wait a minute before requesting another itinerary.",
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

    // 2. Parse Request JSON Body
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

    // 3. Zod Validation
    const validation = PlannerRequestSchema.safeParse(rawBody);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed for travel planner request.",
          code: "AI_VALIDATION_ERROR",
          issues: validation.error.flatten(),
        },
        { status: 400 }
      );
    }

    const plannerInput = validation.data;

    // 4. Prompt Injection Check on Special Requirements & Freeform inputs
    if (plannerInput.specialRequirements) {
      const injectionCheck = detectPromptInjection(plannerInput.specialRequirements);
      if (injectionCheck.isInjection) {
        return NextResponse.json(
          {
            success: false,
            error: "Security rule violation: prohibited input pattern in special requirements.",
            code: "AI_INJECTION_DETECTED",
          },
          { status: 400 }
        );
      }
      plannerInput.specialRequirements = sanitizeInput(plannerInput.specialRequirements, 500);
    }

    if (plannerInput.startingPoint) {
      plannerInput.startingPoint = sanitizeInput(plannerInput.startingPoint, 100);
    }

    // Normalize budget alias if moderate was provided
    if ((plannerInput.budget as string) === "moderate") {
      plannerInput.budget = "standard";
    }

    // 5. Generate Itinerary via Travel Planner Engine
    const itinerary = defaultTravelPlannerEngine.generateItinerary(plannerInput);

    // 6. Return Structured JSON Response
    return NextResponse.json(
      {
        success: true,
        itinerary,
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

    const message = err instanceof Error ? err.message : "Internal planner error occurred.";
    return NextResponse.json(
      {
        success: false,
        error: message,
        code: "INTERNAL_PLANNER_ERROR",
      },
      { status: 500 }
    );
  }
}
