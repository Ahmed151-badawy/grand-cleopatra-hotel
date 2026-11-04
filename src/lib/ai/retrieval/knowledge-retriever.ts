import { KnowledgeRecord, AttractionRecord, RetrievalResult, VerificationStatus } from "../types";
import { tokenizeAndNormalize, detectLanguage } from "./multilingual-normalizer";
import { OllamaMultilingualEmbeddingAdapter } from "../embeddings/embeddings";
import hotelKnowledgeData from "@/data/ai/hotel-knowledge.json";
import luxorAttractionsData from "@/data/ai/luxor-attractions.json";

export interface SearchOptions {
  maxResults?: number;
  threshold?: number;
  category?: "hotel" | "attractions" | "all";
}

export class KnowledgeRetriever {
  private hotelKnowledge: KnowledgeRecord[];
  private attractions: AttractionRecord[];
  private embeddingAdapter: OllamaMultilingualEmbeddingAdapter;

  constructor() {
    this.hotelKnowledge = hotelKnowledgeData as KnowledgeRecord[];
    this.attractions = luxorAttractionsData as AttractionRecord[];
    this.embeddingAdapter = new OllamaMultilingualEmbeddingAdapter();
  }

  /**
   * Search knowledge base across hotel facts and Luxor attractions.
   */
  public async search(query: string, options: SearchOptions = {}): Promise<RetrievalResult[]> {
    const maxResults = options.maxResults || 4;
    const threshold = options.threshold !== undefined ? options.threshold : 0.25;
    const category = options.category || "all";

    if (!query || !query.trim()) {
      return [];
    }

    const queryLanguage = detectLanguage(query);
    const queryTokens = tokenizeAndNormalize(query);

    if (queryTokens.length === 0) {
      return [];
    }

    const candidateRecords: Array<KnowledgeRecord | AttractionRecord> = [];
    if (category === "hotel" || category === "all") {
      candidateRecords.push(...this.hotelKnowledge);
    }
    if (category === "attractions" || category === "all") {
      candidateRecords.push(...this.attractions);
    }

    const scoredResults: RetrievalResult[] = [];

    for (const record of candidateRecords) {
      const matchDetails = this.scoreRecord(query, queryTokens, record);
      if (matchDetails.score >= threshold) {
        let confidence: "high" | "medium" | "low" = "low";
        if (matchDetails.score >= 0.65) {
          confidence = "high";
        } else if (matchDetails.score >= 0.40) {
          confidence = "medium";
        }

        scoredResults.push({
          record,
          score: matchDetails.score,
          confidence,
          matchedKeywords: matchDetails.matchedKeywords,
          sourceId: record.id,
          verificationStatus: record.verificationStatus as VerificationStatus,
        });
      }
    }

    // Sort descending by score
    scoredResults.sort((a, b) => b.score - a.score);

    return scoredResults.slice(0, maxResults);
  }

  /**
   * Computes lexical & semantic token match score between query and a record.
   */
  private scoreRecord(
    rawQuery: string,
    queryTokens: string[],
    record: KnowledgeRecord | AttractionRecord
  ): { score: number; matchedKeywords: string[] } {
    let score = 0;
    const matchedKeywords: string[] = [];

    const isHotel = "title" in record;
    const title = isHotel ? (record as KnowledgeRecord).title : (record as AttractionRecord).name;
    const content = isHotel ? (record as KnowledgeRecord).content : (record as AttractionRecord).description;
    const keywords = record.keywords || [];

    const titleTokens = tokenizeAndNormalize(title);
    const contentTokens = tokenizeAndNormalize(content);

    // 1. Keyword direct matching (weighted heavily: up to 0.5)
    for (const kw of keywords) {
      const kwTokens = tokenizeAndNormalize(kw);
      if (kwTokens.length === 0) continue;

      // Check if raw query contains the keyword phrase directly
      const normalizedQuery = rawQuery.toLowerCase();
      if (normalizedQuery.includes(kw.toLowerCase())) {
        score += 0.45;
        matchedKeywords.push(kw);
        break; // Count once per record
      }

      // Check token overlap with keyword
      const tokenOverlap = queryTokens.filter((qt) => kwTokens.includes(qt));
      if (tokenOverlap.length > 0) {
        const overlapRatio = tokenOverlap.length / kwTokens.length;
        score += overlapRatio * 0.35;
        matchedKeywords.push(...tokenOverlap);
      }
    }

    // 2. Title / Name token matching (up to 0.35)
    const titleMatches = queryTokens.filter((qt) => titleTokens.includes(qt));
    if (titleMatches.length > 0) {
      score += (titleMatches.length / queryTokens.length) * 0.35;
    }

    // 3. Content token overlap (up to 0.20)
    const contentMatches = queryTokens.filter((qt) => contentTokens.includes(qt));
    if (contentMatches.length > 0) {
      score += Math.min(0.20, (contentMatches.length / queryTokens.length) * 0.20);
    }

    // Cap score at 1.0
    return {
      score: Math.min(1.0, score),
      matchedKeywords: Array.from(new Set(matchedKeywords)),
    };
  }

  /**
   * Retrieve all verified attractions on a specific bank (East Bank vs West Bank).
   */
  public getAttractionsByBank(bank: "West Bank" | "East Bank"): AttractionRecord[] {
    return this.attractions.filter((a) => a.bank === bank || a.bank.includes(bank));
  }

  /**
   * Get attraction by unique ID.
   */
  public getAttractionById(id: string): AttractionRecord | undefined {
    return this.attractions.find((a) => a.id === id);
  }

  /**
   * Get hotel knowledge record by ID.
   */
  public getHotelRecordById(id: string): KnowledgeRecord | undefined {
    return this.hotelKnowledge.find((k) => k.id === id);
  }
}

export const defaultKnowledgeRetriever = new KnowledgeRetriever();
