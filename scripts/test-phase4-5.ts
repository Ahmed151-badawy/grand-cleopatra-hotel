import { runAIPhase4And5Tests } from "../src/lib/ai/eval/eval-phase4-5";

async function main() {
  console.log("===============================================================");
  console.log(" CLEOPATRA AI - PHASE 4 & PHASE 5 AUTOMATED TEST SUITE");
  console.log(" AI Concierge Engine & Luxor Travel Planner Verification");
  console.log("===============================================================\n");

  const summary = await runAIPhase4And5Tests();

  console.log(`Executed ${summary.total} tests in ${summary.overallLatencyMs}ms:\n`);

  for (const res of summary.results) {
    const symbol = res.passed ? "✓ PASS" : "✗ FAIL";
    console.log(`[${symbol}] [${res.testId}] ${res.name} (${res.durationMs}ms)`);
    if (res.message) {
      console.log(`       Message: ${res.message}`);
    }
  }

  console.log("\n===============================================================");
  console.log(
    `Summary: ${summary.passed}/${summary.total} Passed (${((summary.passed / summary.total) * 100).toFixed(1)}%)`
  );
  console.log("===============================================================");

  if (summary.failed > 0) {
    console.error(`\nTest suite reported ${summary.failed} failures.`);
    process.exit(1);
  } else {
    console.log("\nAll Phase 4 & Phase 5 automated tests passed successfully!");
    process.exit(0);
  }
}

main().catch((err) => {
  console.error("Phase 4 & 5 test runner error:", err);
  process.exit(1);
});

