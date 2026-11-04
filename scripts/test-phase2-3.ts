import { runAIPhase2And3Tests } from "../src/lib/ai/eval/eval-runner";

async function main() {
  console.log("===============================================================");
  console.log(" CLEOPATRA AI - PHASE 2 & PHASE 3 AUTOMATED TEST SUITE");
  console.log(" Grand Cleopatra Hotel - Luxor, Egypt");
  console.log("===============================================================\n");

  const summary = await runAIPhase2And3Tests();

  console.log(`Executed ${summary.total} tests in ${summary.overallLatencyMs}ms:\n`);

  for (const res of summary.results) {
    const symbol = res.passed ? "✓ PASS" : "✗ FAIL";
    console.log(`[${symbol}] [${res.testId}] ${res.name} (${res.durationMs}ms)`);
    if (res.message) {
      console.log(`       Message: ${res.message}`);
    }
    if (res.score !== undefined) {
      console.log(`       Accuracy Score: ${res.score.toFixed(1)}%`);
    }
  }

  console.log("\n===============================================================");
  console.log(`Summary: ${summary.passed}/${summary.total} Passed (${((summary.passed / summary.total) * 100).toFixed(1)}%)`);
  console.log("===============================================================");

  if (summary.failed > 0) {
    console.error(`\nTest suite reported ${summary.failed} failures.`);
    process.exit(1);
  } else {
    console.log("\nAll Phase 2 & Phase 3 automated tests passed successfully!");
    process.exit(0);
  }
}

main().catch((err) => {
  console.error("Test runner encountered an error:", err);
  process.exit(1);
});
