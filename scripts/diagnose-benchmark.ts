import { getAIProvider } from "../src/lib/ai/providers/provider";
import evaluationDataset from "../src/data/ai/evaluation-dataset.json";
import { defaultKnowledgeRetriever } from "../src/lib/ai/retrieval/knowledge-retriever";

async function main() {
  const provider = getAIProvider();

  for (const item of evaluationDataset) {
    const hits = await defaultKnowledgeRetriever.search(item.query, { threshold: 0.25 });
    const completion = await provider.generateCompletion(
      [{ role: "user", content: item.query }],
      { timeoutMs: 1500 }
    );
    const lower = completion.text.toLowerCase();
    const hasMust =
      item.mustContain.length === 0 ||
      item.mustContain.some((t) => lower.includes(t.toLowerCase()));
    const hasNoBanned =
      item.mustNotContain.length === 0 ||
      !item.mustNotContain.some((t) => lower.includes(t.toLowerCase()));
    const pass = hasMust && hasNoBanned;

    console.log(`[${pass ? "PASS" : "FAIL"}] ${item.id}`);
    if (!pass) {
      console.log(`  Query: "${item.query}"`);
      console.log(`  MustContain:`, item.mustContain);
      console.log(`  HasMust: ${hasMust}, HasNoBanned: ${hasNoBanned}`);
      console.log(`  Top Hit:`, hits[0]?.sourceId, "Score:", hits[0]?.score);
      console.log(`  Response: "${completion.text}"\n`);
    }
  }
}

main().catch(console.error);

