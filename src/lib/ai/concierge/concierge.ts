import {
  ChatMessage,
  LanguageCode,
  isKnowledgeRecord,
  RetrievalResult,
} from "../types";
import { defaultKnowledgeRetriever } from "../retrieval/knowledge-retriever";
import { detectLanguage } from "../retrieval/multilingual-normalizer";
import { getAIProvider } from "../providers/provider";
import { buildConciergeSystemPrompt } from "../prompts/system-prompts";
import { defaultConversationMemory, ConversationMemory } from "./conversation-memory";
import { classifyIntent, ConciergeIntent } from "./intent-classifier";

export interface ConciergeProcessOptions {
  conversationId?: string;
  preferredLanguage?: LanguageCode | "auto";
  timeoutMs?: number;
}

export interface ConciergeResponse {
  conversationId: string;
  detectedLanguage: LanguageCode;
  intent: ConciergeIntent;
  response: string;
  source: "ollama_model" | "fallback_engine";
  confidence: "high" | "medium" | "low";
  retrievedKnowledgeIds: string[];
  requiresHumanConfirmation: boolean;
  whatsappHandoff: {
    phone: string;
    displayPhone: string;
    link: string;
    message: string;
  };
}

export class ConciergeEngine {
  private memory: ConversationMemory;
  private readonly defaultPhone = "+20 100 345 6789";
  private readonly rawPhone = "201003456789";

  constructor(memory: ConversationMemory = defaultConversationMemory) {
    this.memory = memory;
  }

  /**
   * Processes a guest message in a multi-turn conversation.
   */
  public async processMessage(
    userMessage: string,
    options: ConciergeProcessOptions = {}
  ): Promise<ConciergeResponse> {
    const rawInput = userMessage.trim();

    // 1. Session & Conversation ID Management
    let conversationId = options.conversationId?.trim();
    if (!conversationId || !this.memory.isValidId(conversationId)) {
      conversationId = this.memory.generateId();
    }

    // 2. Language Detection
    const detectedLang: LanguageCode =
      options.preferredLanguage && options.preferredLanguage !== "auto"
        ? options.preferredLanguage
        : detectLanguage(rawInput);

    // 3. Conversation Memory History
    const history = this.memory.getHistory(conversationId);

    // 4. Intent Classification
    const intent = classifyIntent(rawInput, detectedLang);

    // 5. Context Enrichment for Follow-Up Queries
    // If the message is short or ambiguous (e.g. "How much is it?", "Does it have a balcony?"),
    // check the last assistant/user turn to append subject context for search.
    const enrichedQuery = this.enrichQueryWithHistory(rawInput, history);

    // 6. Knowledge Base Retrieval
    const retrieved = await defaultKnowledgeRetriever.search(enrichedQuery, {
      category: "all",
      maxResults: 3,
      threshold: 0.25,
    });

    const retrievedIds = retrieved.map((r) => r.sourceId);

    // 7. Check if Owner Confirmation is Required
    const requiresOwnerConfirmation = this.checkOwnerConfirmation(
      intent,
      retrieved,
      rawInput
    );

    // 8. Confidence Determination
    const topScore = retrieved.length > 0 ? retrieved[0].score : 0;
    const confidence: "high" | "medium" | "low" =
      topScore >= 0.6 ? "high" : topScore >= 0.38 ? "medium" : "low";

    // 9. Generate AI Response via Resilient Provider (Ollama -> Fallback)
    const provider = getAIProvider();
    let responseText = "";
    let responseSource: "ollama_model" | "fallback_engine" = "fallback_engine";

    try {
      const health = await provider.healthCheck();
      if (health.status === "online") {
        const systemPrompt = buildConciergeSystemPrompt(retrieved, detectedLang);
        const promptMessages: ChatMessage[] = [
          { role: "system", content: systemPrompt },
          ...history.slice(-4),
          { role: "user", content: rawInput },
        ];

        const completion = await provider.generateCompletion(promptMessages, {
          timeoutMs: options.timeoutMs || 4000,
          temperature: 0.2,
        });

        responseText = completion.text;
        responseSource = completion.source;
      } else {
        responseText = this.formatSafeFallback(retrieved, detectedLang, requiresOwnerConfirmation);
        responseSource = "fallback_engine";
      }
    } catch {
      responseText = this.formatSafeFallback(retrieved, detectedLang, requiresOwnerConfirmation);
      responseSource = "fallback_engine";
    }

    // 10. Post-process to ensure mandatory owner confirmation banner if missing
    if (requiresOwnerConfirmation && !responseText.includes("⚠️")) {
      const banner = this.getOwnerWarningBanner(detectedLang);
      responseText = `${banner}\n\n${responseText}`;
    }

    // 11. WhatsApp Handoff Payload
    const whatsappHandoff = this.buildWhatsAppHandoff(
      rawInput,
      detectedLang,
      intent
    );

    // 12. Save to Conversation Memory
    this.memory.addMessage(conversationId, {
      role: "user",
      content: rawInput,
      timestamp: new Date().toISOString(),
    });
    this.memory.addMessage(conversationId, {
      role: "assistant",
      content: responseText,
      timestamp: new Date().toISOString(),
      source: responseSource,
      retrievedSources: retrieved.map((r) => ({
        id: r.sourceId,
        title: isKnowledgeRecord(r.record) ? r.record.title : r.record.name,
        category: r.record.category,
        verificationStatus: r.verificationStatus,
      })),
    });

    return {
      conversationId,
      detectedLanguage: detectedLang,
      intent,
      response: responseText,
      source: responseSource,
      confidence,
      retrievedKnowledgeIds: retrievedIds,
      requiresHumanConfirmation: requiresOwnerConfirmation,
      whatsappHandoff,
    };
  }

  /**
   * Enriches short or referential follow-up queries with recent conversational subject.
   */
  private enrichQueryWithHistory(rawQuery: string, history: ChatMessage[]): string {
    if (history.length === 0) {
      return rawQuery;
    }

    const hasReferential = /\b(it|this|that|these|the room|they|its|does it|is it)\b/i.test(rawQuery);
    const words = rawQuery.split(/\s+/).length;

    if (words < 14 || hasReferential) {
      const lastUserMessage = [...history]
        .reverse()
        .find((m) => m.role === "user");

      if (lastUserMessage) {
        return `${rawQuery} ${lastUserMessage.content}`;
      }
    }

    return rawQuery;
  }

  /**
   * Determines if owner confirmation is strictly mandatory.
   */
  private checkOwnerConfirmation(
    intent: ConciergeIntent,
    retrieved: RetrievalResult[],
    rawQuery: string
  ): boolean {
    // 1. Explicit record flag
    const hasFlaggedRecord = retrieved.some(
      (r) =>
        r.record.ownerConfirmationRequired ||
        r.record.verificationStatus === "owner_confirmation_required"
    );
    if (hasFlaggedRecord) {
      return true;
    }

    // 2. Large groups, weddings, private hire
    if (
      /\b(wedding|group of \d+|large group|40 people|50 people|private party|event booking|حفلة زفاف|مجموعة كبيرة)\b/i.test(
        rawQuery
      )
    ) {
      return true;
    }

    // 3. Live reservation confirmation requests
    if (intent === "price_availability" && /\b(confirm|free tonight|book right now|متاح الليلة)\b/i.test(rawQuery)) {
      return true;
    }

    return false;
  }

  /**
   * Returns a localized warning banner for owner confirmation.
   */
  private getOwnerWarningBanner(lang: LanguageCode): string {
    switch (lang) {
      case "ar":
        return "⚠️ ملاحظة هامة: هذه التفاصيل أو الأسعار الخاصة تتطلب تأكيداً مسبقاً ومباشراً من إدارة الفندق.";
      case "de":
        return "⚠️ Wichtiger Hinweis: Diese Anfrage erfordert eine ausdrückliche Bestätigung durch das Hotelmanagement.";
      case "fr":
        return "⚠️ Remarque importante: Cette demande nécessite une confirmation directe de la direction de l'hôtel.";
      case "es":
        return "⚠️ Nota importante: Esta solicitud requiere confirmación directa de la administración del hotel.";
      default:
        return "⚠️ Note: This specific policy, group booking, or pricing requires explicit confirmation by hotel management.";
    }
  }

  /**
   * Formats a grounded fallback response when LLM text generation is unavailable.
   */
  private formatSafeFallback(
    retrieved: RetrievalResult[],
    lang: LanguageCode,
    requiresOwnerConfirmation: boolean
  ): string {
    const banner = requiresOwnerConfirmation ? `${this.getOwnerWarningBanner(lang)}\n\n` : "";

    if (retrieved.length > 0 && retrieved[0].score >= 0.25) {
      const top = retrieved[0].record;
      const content = isKnowledgeRecord(top)
        ? top.content
        : `${top.name}: ${top.description} (${top.bank}, travel time: ${top.travelTimeFromHotel}). Tips: ${top.practicalTips}`;

      switch (lang) {
        case "ar":
          return `أهلاً بك في فندق جراند كليوباترا بالأقصر. بناءً على معلوماتنا المعتمدة:\n\n${banner}${content}\n\nلأي استفسارات إضافية أو تأكيد الحجز، يُرجى التواصل مباشرةً مع الاستقبال عبر واتساب: +20 100 345 6789.`;
        case "de":
          return `Willkommen im Grand Cleopatra Hotel in Luxor. Gemäß unseren verifizierten Unterlagen:\n\n${banner}${content}\n\nFür weitere Fragen oder Buchungsanfragen wenden Sie sich bitte an unsere Rezeption per WhatsApp: +20 100 345 6789.`;
        case "fr":
          return `Bienvenue au Grand Cleopatra Hotel à Louxor. Selon nos informations vérifiées:\n\n${banner}${content}\n\nPour toute question ou confirmation, contactez notre réception par WhatsApp: +20 100 345 6789.`;
        case "es":
          return `Bienvenido al Grand Cleopatra Hotel en Lúxor. De acuerdo con nuestros registros confirmados:\n\n${banner}${content}\n\nPara consultas adicionales o reservas, contacte a nuestra recepción por WhatsApp: +20 100 345 6789.`;
        default:
          return `Welcome to Grand Cleopatra Hotel, Luxor. Based on our verified records:\n\n${banner}${content}\n\nFor further details or reservation confirmations, please message our front desk directly on WhatsApp: +20 100 345 6789.`;
      }
    }

    // Unknown or unverified
    switch (lang) {
      case "ar":
        return `شكراً لتواصلك مع فندق جراند كليوباترا بالأقصر. هذه المعلومة المحددة غير مسجلة في قاعدة بياناتنا المعتمدة حتى الآن، ولن نتمكن من تزويدك ببيانات غير مؤكدة حرصاً على راحتك.\n\nيُرجى التواصل مباشرةً مع الاستقبال عبر واتساب (+20 100 345 6789) أو البريد الإلكتروني (info@grandcleopatrahotelux.com).`;
      case "de":
        return `Vielen Dank für Ihre Anfrage. Diese spezifische Auskunft ist derzeit nicht in unseren verifizierten Hotelunterlagen erfasst. Um Missverständnisse zu vermeiden, erfinden wir keine Fakten.\n\nBitte kontaktieren Sie unsere Rezeption per WhatsApp (+20 100 345 6789) oder E-Mail (info@grandcleopatrahotelux.com).`;
      case "fr":
        return `Merci pour votre message. Cette information n'est pas encore enregistrée dans notre base vérifiée. Nous ne fournissons que des faits confirmés.\n\nVeuillez contacter notre réception par WhatsApp (+20 100 345 6789) ou par e-mail (info@grandcleopatrahotelux.com).`;
      case "es":
        return `Gracias por contactarnos. Esta información específica aún no está registrada en nuestra base de datos verificada. Solo brindamos datos confirmados.\n\nPor favor comuníquese con nuestra recepción por WhatsApp (+20 100 345 6789) o correo (info@grandcleopatrahotelux.com).`;
      default:
        return `Thank you for contacting Grand Cleopatra Hotel. We do not have confirmed records regarding this specific request in our verified database, and we strictly refrain from providing unverified details.\n\nPlease connect directly with our 24/7 reception team on WhatsApp (+20 100 345 6789) or email (info@grandcleopatrahotelux.com).`;
    }
  }

  /**
   * Constructs pre-filled WhatsApp handoff link.
   */
  private buildWhatsAppHandoff(
    userQuery: string,
    lang: LanguageCode,
    _intent: ConciergeIntent
  ): { phone: string; displayPhone: string; link: string; message: string } {
    let greeting = "Hello Grand Cleopatra Hotel, I have an inquiry from the website: ";
    if (lang === "ar") {
      greeting = "مرحباً فندق جراند كليوباترا، أود الاستفسار بخصوص: ";
    } else if (lang === "de") {
      greeting = "Hallo Grand Cleopatra Hotel, ich habe eine Anfrage von der Website: ";
    } else if (lang === "fr") {
      greeting = "Bonjour Grand Cleopatra Hotel, j'ai une question depuis votre site: ";
    } else if (lang === "es") {
      greeting = "Hola Grand Cleopatra Hotel, tengo una consulta desde el sitio web: ";
    }

    const prefilledText = encodeURIComponent(`${greeting}"${userQuery.slice(0, 100)}"`);
    const link = `https://wa.me/${this.rawPhone}?text=${prefilledText}`;

    return {
      phone: `+${this.rawPhone}`,
      displayPhone: this.defaultPhone,
      link,
      message: "Direct assistance from Grand Cleopatra front desk",
    };
  }
}

export const defaultConciergeEngine = new ConciergeEngine();
