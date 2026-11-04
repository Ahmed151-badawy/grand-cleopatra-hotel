import { LanguageCode } from "../types";

export type ConciergeIntent =
  | "hotel_info"
  | "room_info"
  | "facilities"
  | "location_transport"
  | "checkin_checkout"
  | "policies"
  | "price_availability"
  | "booking_assistance"
  | "unsupported_unknown";

interface IntentRule {
  intent: ConciergeIntent;
  patterns: RegExp[];
}

const INTENT_RULES: IntentRule[] = [
  // 1. Live availability & direct pricing inquiries
  {
    intent: "price_availability",
    patterns: [
      /\b(free tonight|available tonight|room free|confirm room|is room \d+|availability|rates|pricing|cost per night|how much for|wie viel kostet|tarif par nuit|cuanto cuesta|هل الغرفة شاغرة|متاح الليلة|اسعار الغرف|حجز الليلة)\b/i,
    ],
  },
  // 2. Check-in & Check-out
  {
    intent: "checkin_checkout",
    patterns: [
      /\b(check[\s-]?in|check[\s-]?out|arrival time|departure time|early check[\s-]?in|late check[\s-]?out|luggage storage|anreise|abreise|arrivée|départ|entrada|salida|تسجيل الوصول|تسجيل المغادرة|ميعاد الوصول)\b/i,
    ],
  },
  // 3. Room details & categories
  {
    intent: "room_info",
    patterns: [
      /\b(deluxe double|triple room|single room|terrace room|bed type|king bed|twin bed|room types|what rooms|zimmer|chambre|habitación|غرفة|غرف|اسرة|سرير|أنواع الغرف)\b/i,
    ],
  },
  // 4. Hotel policies (pets, smoking, events, quiet hours)
  {
    intent: "policies",
    patterns: [
      /\b(pet|pets|dog|cat|falcon|tiger|animal|smoking|cigarette|smoke|party|event|wedding|quiet hours|regeln|haustiere|rauchen|fumer|animaux|mascotas|fumar|تدخين|حيوانات أليفة|حفلات|سياسة)\b/i,
    ],
  },
  // 5. Location, ferry, and transportation
  {
    intent: "location_transport",
    patterns: [
      /\b(ferry|nile crossing|how to get|directions|address|west bank|east bank|distance|monuments|airport transfer|taxi|airport pickup|fähre|lage|wegbeschreibung|transfer|bac|traversée|emplacement|transbordador|ubicación|موقع|المعدية|النيل|توصيل|مطار|المسافة|عنوان)\b/i,
    ],
  },
  // 6. Facilities, dining, amenities
  {
    intent: "facilities",
    patterns: [
      /\b(breakfast|dining|food|restaurant|rooftop|garden|wi-?fi|internet|reception|front desk|frühstück|speisen|petit déjeuner|desayuno|wifi|إفطار|مطعم|روف|حديقة|انترنت|واي فاي|استقبال)\b/i,
    ],
  },
  // 7. Booking assistance
  {
    intent: "booking_assistance",
    patterns: [
      /\b(how to book|reserve a room|reservation inquiry|make a booking|buchen|réservation|reservar|حجز|طريقة الحجز|كيف احجز)\b/i,
    ],
  },
  // 8. Unsupported facilities / unknown
  {
    intent: "unsupported_unknown",
    patterns: [
      /\b(swimming pool|pool|spa|gym|fitness|nightclub|casino|swimmingpool|piscine|piscina|حمام سباحة|مسبح|ساونا|جيم)\b/i,
    ],
  },
  // 9. General Hotel info
  {
    intent: "hotel_info",
    patterns: [
      /\b(about the hotel|history|who owns|founded|since 1975|heritage|grand cleopatra|über das hotel|à propos|sobre el hotel|عن الفندق|تاريخ الفندق|معلومات عن الفندق)\b/i,
    ],
  },
];

const ARABIC_INTENT_RULES: Array<{ intent: ConciergeIntent; phrases: string[] }> = [
  {
    intent: "checkin_checkout",
    phrases: [
      "تسجيل الوصول",
      "تسجيل المغادرة",
      "ميعاد الوصول",
      "ميعاد المغادرة",
      "تسجيل الدخول",
      "تسجيل الخروج",
      "الوصول والمغادرة",
      "مواعيد تسجيل",
      "وقت الوصول",
      "وقت المغادرة",
    ],
  },
  {
    intent: "price_availability",
    phrases: [
      "متاح الليلة",
      "شاغرة",
      "اسعار الغرف",
      "سعر الغرفة",
      "حجز الليلة",
      "كم تكلفة",
      "بكم الغرفة",
      "هل الغرفة شاغرة",
    ],
  },
  {
    intent: "room_info",
    phrases: [
      "أنواع الغرف",
      "غرفة دبل",
      "غرفة ثلاثية",
      "غرفة مفردة",
      "سرير مزدوج",
      "غرف الفندق",
      "تراس",
      "الغرف المتاحة",
    ],
  },
  {
    intent: "policies",
    phrases: ["حيوانات أليفة", "تدخين", "حفلة", "زفاف", "سياسة الفندق", "حيوان"],
  },
  {
    intent: "location_transport",
    phrases: [
      "موقع الفندق",
      "المعدية",
      "معدية النيل",
      "كيف اصل",
      "توصيل المطار",
      "المسافة",
      "معبد الكرنك",
      "الضفة الغربية",
      "أين يقع",
      "اين يقع",
    ],
  },
  {
    intent: "facilities",
    phrases: [
      "الإفطار",
      "افطار",
      "فطور",
      "مطعم",
      "انترنت",
      "واي فاي",
      "الاستقبال",
      "خدمة الغرف",
    ],
  },
  {
    intent: "booking_assistance",
    phrases: ["طريقة الحجز", "كيف احجز", "حجز غرفة", "تأكيد الحجز"],
  },
  {
    intent: "unsupported_unknown",
    phrases: ["حمام سباحة", "مسبح", "ساونا", "جيم", "نادي صحي", "كازينو"],
  },
  {
    intent: "hotel_info",
    phrases: [
      "عن الفندق",
      "تاريخ الفندق",
      "فندق كليوباترا",
      "معلومات عن الفندق",
      "جراند كليوباترا",
      "فندق",
    ],
  },
];

/**
 * Classifies the intent of a user message.
 * Defaults to "hotel_info" if general inquiry, or "unsupported_unknown" if no signals match.
 */
export function classifyIntent(
  message: string,
  _lang: LanguageCode = "en"
): ConciergeIntent {
  const normalized = message.toLowerCase().trim();

  // 1. Check Arabic phrase rules if Arabic characters present
  if (/[\u0600-\u06FF]/.test(normalized)) {
    for (const rule of ARABIC_INTENT_RULES) {
      for (const phrase of rule.phrases) {
        if (normalized.includes(phrase)) {
          return rule.intent;
        }
      }
    }
  }

  // 2. Check Latin regex rules
  for (const rule of INTENT_RULES) {
    for (const pattern of rule.patterns) {
      if (pattern.test(normalized)) {
        return rule.intent;
      }
    }
  }

  // Fallback heuristic: if it mentions hotel/Luxor words, treat as hotel_info
  if (/\b(hotel|luxor|egypt|cleopatra|stay|visit|فندق|الأقصر)\b/i.test(normalized)) {
    return "hotel_info";
  }

  return "unsupported_unknown";
}
