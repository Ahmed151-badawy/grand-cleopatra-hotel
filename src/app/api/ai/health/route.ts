import { NextResponse } from "next/server";
import { getAIProvider } from "@/lib/ai/providers/provider";
import { runAIPhase2And3Tests } from "@/lib/ai/eval/eval-runner";
import hotelKnowledge from "@/data/ai/hotel-knowledge.json";
import luxorAttractions from "@/data/ai/luxor-attractions.json";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const runEvaluation = url.searchParams.get("eval") === "true";

    const provider = getAIProvider();
    const health = await provider.healthCheck();

    const responseData: Record<string, unknown> = {
      status: "ok",
      subsystem: "Cleopatra AI",
      timestamp: new Date().toISOString(),
      provider: {
        active: provider.name,
        targetModel: provider.model,
        health,
      },
      knowledgeBase: {
        hotelRecordsCount: hotelKnowledge.length,
        attractionsCount: luxorAttractions.length,
        verified: true,
      },
    };

    if (runEvaluation) {
      const suite = await runAIPhase2And3Tests();
      responseData.testSuite = suite;
    }

    return NextResponse.json(responseData, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        status: "error",
        message: (error as Error)?.message || "Internal server error in health check",
      },
      { status: 500 }
    );
  }
}
