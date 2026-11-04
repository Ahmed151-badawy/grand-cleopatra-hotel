import { KnowledgeRecord, AttractionRecord, RetrievalResult, VerificationStatus, isKnowledgeRecord } from "../types";
import { tokenizeAndNormalize, detectLanguage } from "./multilingual-normalizer";
import { OllamaMultilingualEmbeddingAdapter } from "../embeddings/embeddings";
import hotelKnowledgeData from "@/data/ai/hotel-knowledge.json";
import luxorAttractionsData from "@/data/ai/luxor-attractions.json";

export interface SearchOptions {
  maxResults?: number;
  threshold?: number;
  category?: "hotel" | "attractions" | "all";
}

const STOP_WORDS = new Set([
  "a", "an", "the", "and", "or", "in", "into", "on", "at", "to", "for", "of", "with",
  "is", "are", "was", "were", "do", "does", "did", "can", "could", "would", "should",
  "i", "you", "your", "my", "we", "our", "it", "its", "what", "where", "how", "when",
  "من", "في", "على", "الى", "إلى", "عن", "مع", "هل", "ما", "ماذا", "اين", "أين", "كيف", "هو", "هي",
  "der", "die", "das", "und", "in", "im", "ist", "sind", "sie", "wie", "wo", "ich",
  "le", "la", "les", "un", "une", "des", "et", "en", "dans", "est", "sont", "je",
  "el", "la", "los", "las", "un", "una", "y", "en", "es", "son", "de", "yo"
]);

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

    const queryTokens = tokenizeAndNormalize(query);
    const significantQueryTokens = queryTokens.filter((t) => !STOP_WORDS.has(t));
    const tokensToUse = significantQueryTokens.length > 0 ? significantQueryTokens : queryTokens;

    if (tokensToUse.length === 0) {
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
      const matchDetails = this.scoreRecord(query, tokensToUse, record);
      if (matchDetails.score >= threshold) {
        let confidence: "high" | "medium" | "low" = "low";
        if (matchDetails.score >= 0.60) {
          confidence = "high";
        } else if (matchDetails.score >= 0.38) {
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
    significantTokens: string[],
    record: KnowledgeRecord | AttractionRecord
  ): { score: number; matchedKeywords: string[] } {
    let score = 0;
    const matchedKeywords: string[] = [];

    const isHotel = isKnowledgeRecord(record);
    const title = isHotel ? record.title : record.name;
    const content = isHotel ? record.content : record.description;
    const keywords = record.keywords || [];

    const titleTokens = tokenizeAndNormalize(title).filter((t) => !STOP_WORDS.has(t));
    const contentTokens = tokenizeAndNormalize(content).filter((t) => !STOP_WORDS.has(t));
    const normalizedQuery = rawQuery.toLowerCase();

    // 1. Keyword phrase & token matching (accumulated, up to 0.65)
    let keywordHits = 0;
    for (const kw of keywords) {
      const kwLower = kw.toLowerCase();

      // Direct substring match
      if (normalizedQuery.includes(kwLower)) {
        keywordHits += 1.5;
        matchedKeywords.push(kw);
        continue;
      }

      // Keyword token overlap
      const kwTokens = tokenizeAndNormalize(kw).filter((t) => !STOP_WORDS.has(t));
      if (kwTokens.length > 0) {
        const tokenOverlap = significantTokens.filter((st) => kwTokens.includes(st));
        if (tokenOverlap.length > 0) {
          keywordHits += tokenOverlap.length / kwTokens.length;
          matchedKeywords.push(...tokenOverlap);
        }
      }
    }

    if (keywordHits > 0) {
      score += Math.min(0.65, keywordHits * 0.30);
    }

    // 2. Title / Name token matching (up to 0.35)
    const titleMatches = significantTokens.filter((st) => titleTokens.includes(st));
    if (titleMatches.length > 0) {
      score += (titleMatches.length / significantTokens.length) * 0.35;
    }

    // 3. Content token overlap (up to 0.15)
    const contentMatches = significantTokens.filter((st) => contentTokens.includes(st));
    if (contentMatches.length > 0) {
      score += Math.min(0.15, (contentMatches.length / significantTokens.length) * 0.15);
    }

    return {
      score: Math.min(1.0, score),
      matchedKeywords: Array.from(new Set(matchedKeywords)),
    };
  }

  public getAttractionsByBank(bank: "West Bank" | "East Bank"): AttractionRecord[] {
    return this.attractions.filter((a) => a.bank === bank || a.bank.includes(bank));
  }

  public getAttractionById(id: string): AttractionRecord | undefined {
    return this.attractions.find((a) => a.id === id);
  }

  public getHotelRecordById(id: string): KnowledgeRecord | undefined {
    return this.hotelKnowledge.find((k) => k.id === id);
  }
}

export const defaultKnowledgeRetriever = new KnowledgeRetriever();
