import {
  AIProvider,
  ChatMessage,
  CompletionOptions,
  CompletionResult,
  ProviderHealth,
} from "../types";
import { detectLanguage } from "../retrieval/multilingual-normalizer";
import { defaultKnowledgeRetriever } from "../retrieval/knowledge-retriever";

export class FallbackProvider implements AIProvider {
  public readonly name = "fallback";
  public readonly model = "grounded-rules-v1";

  async healthCheck(): Promise<ProviderHealth> {
    return {
      status: "online",
      providerName: this.name,
      modelName: this.model,
      modelAvailable: true,
      message: "Grounded fallback provider is operational with 100% verified knowledge base.",
      latencyMs: 1,
    };
  }

  async generateCompletion(
    messages: ChatMessage[],
    _options: CompletionOptions = {}
  ): Promise<CompletionResult> {
    const startTime = Date.now();
    const lastUserMessage = [...messages].reverse().find((m) => m.role === "user")?.content || "";
    const lang = detectLanguage(lastUserMessage);

    // Retrieve knowledge directly for the last user message
    const retrieved = await defaultKnowledgeRetriever.search(lastUserMessage, {
      maxResults: 2,
      threshold: 0.28,
    });

    let responseText = "";

    if (retrieved.length > 0 && retrieved[0] && retrieved[0].score >= 0.28) {
      const topRecord = retrieved[0].record;
      const content =
        "content" in topRecord
          ? topRecord.content
          : `${topRecord.name}: ${topRecord.description} (${topRecord.bank}, approx. ${topRecord.travelTimeFromHotel}). Tips: ${topRecord.practicalTips}`;

      // Format grounded response by language
      switch (lang) {
        case "ar":
          responseText = `أهلاً بك في فندق جراند كليوباترا بالأقصر. بناءً على معلوماتنا المعتمدة:\n\n${content}\n\nإذا كنت ترغب في الاستفسار عن تفاصيل إضافية أو تأكيد الحجز، يُرجى التواصل مباشرةً مع الاستقبال عبر واتساب: +20 100 345 6789.`;
          break;
        case "de":
          responseText = `Willkommen im Grand Cleopatra Hotel in Luxor. Basierend auf unseren verifizierten Hotelinformationen:\n\n${content}\n\nFür weitere Fragen oder Buchungsbestätigungen kontaktieren Sie bitte unsere 24/7 Rezeption per WhatsApp: +20 100 345 6789.`;
          break;
        case "fr":
          responseText = `Bienvenue au Grand Cleopatra Hotel à Louxor. D'après nos informations officielles vérifiées:\n\n${content}\n\nPour confirmer une disponibilité ou pour toute demande personnalisée, contactez notre réception 24/7 sur WhatsApp: +20 100 345 6789.`;
          break;
        case "es":
          responseText = `Bienvenido al Grand Cleopatra Hotel en Lúxor. De acuerdo con nuestra información verificada:\n\n${content}\n\nPara consultar disponibilidad o realizar solicitudes especiales, comuníquese con nuestra recepción 24/7 por WhatsApp: +20 100 345 6789.`;
          break;
        default:
          responseText = `Welcome to Grand Cleopatra Hotel, Luxor. Based on our verified records:\n\n${content}\n\nFor real-time availability, customized excursions, or direct inquiries, please reach out to our 24/7 front desk team on WhatsApp: +20 100 345 6789.`;
      }
    } else {
      // Unverified or unknown information fallback with WhatsApp handoff
      switch (lang) {
        case "ar":
          responseText = `شكراً لتواصلك مع فندق جراند كليوباترا بالأقصر. نعتذر، هذه المعلومة المحددة غير مسجلة في قاعدة بياناتنا المعتمدة حتى الآن، ولن نتمكن من تزويدك بإجابة غير مؤكدة حرصاً على راحتك.\n\nيُرجى التواصل مباشرةً مع إدارة الفندق والاستقبال عبر واتساب (+20 100 345 6789) أو البريد الإلكتروني (info@grandcleopatrahotelux.com) وسيسعد فريقنا بمساعدتك فوراً.`;
          break;
        case "de":
          responseText = `Vielen Dank für Ihre Anfrage beim Grand Cleopatra Hotel. Diese spezifische Information ist derzeit nicht in unseren verifizierten Hotelunterlagen erfasst. Um Missverständnisse zu vermeiden, erfinden wir keine Auskünfte.\n\nBitte wenden Sie sich direkt an unsere Rezeption per WhatsApp (+20 100 345 6789) oder E-Mail (info@grandcleopatrahotelux.com). Unser Team hilft Ihnen gerne weiter.`;
          break;
        case "fr":
          responseText = `Merci de contacter le Grand Cleopatra Hotel à Louxor. Cette information spécifique n'est pas encore enregistrée dans notre base de données vérifiée. Afin de vous garantir des informations fiables, nous ne fournissons que des faits confirmés.\n\nVeuillez contacter directement notre réception par WhatsApp (+20 100 345 6789) ou par e-mail (info@grandcleopatrahotelux.com). Notre équipe vous assistera avec plaisir.`;
          break;
        case "es":
          responseText = `Gracias por ponerse en contacto con Grand Cleopatra Hotel. Esta información específica aún no está registrada en nuestra base de datos verificada. Para brindarle total seguridad, solo compartimos información confirmada.\n\nPor favor comuníquese directamente con nuestra recepción por WhatsApp (+20 100 345 6789) o correo (info@grandcleopatrahotelux.com). Nuestro equipo con gusto le atenderá.`;
          break;
        default:
          responseText = `Thank you for contacting Grand Cleopatra Hotel in Luxor. We do not have confirmed records regarding this specific request in our verified database, and we strictly refrain from providing unverified details.\n\nPlease connect directly with our 24/7 reception team on WhatsApp (+20 100 345 6789) or email (info@grandcleopatrahotelux.com), and we will be delighted to assist you promptly.`;
      }
    }

    const latencyMs = Date.now() - startTime;
    return {
      text: responseText,
      model: this.model,
      source: "fallback_engine",
      latencyMs,
    };
  }
}
