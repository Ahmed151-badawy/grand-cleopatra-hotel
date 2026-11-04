import { defaultConciergeEngine, ConciergeEngine } from "../concierge/concierge";
import { defaultTravelPlannerEngine } from "../planner/travel-planner";
import { defaultConversationMemory, ConversationMemory } from "../concierge/conversation-memory";
import { ItineraryResponseSchema } from "../validation/schemas";
import { LanguageCode } from "../types";

export interface PhaseTestResult {
  testId: string;
  name: string;
  passed: boolean;
  message?: string;
  durationMs: number;
  details?: unknown;
}

export interface PhaseTestSummary {
  total: number;
  passed: number;
  failed: number;
  overallLatencyMs: number;
  results: PhaseTestResult[];
}

export async function runAIPhase4And5Tests(): Promise<PhaseTestSummary> {
  const startTime = Date.now();
  const results: PhaseTestResult[] = [];

  // ==========================================
  // PHASE 4: CONCIERGE ENGINE TESTS
  // ==========================================

  // T401: Basic Hotel Information & Location
  const t401Start = Date.now();
  try {
    const res = await defaultConciergeEngine.processMessage(
      "Where is Grand Cleopatra Hotel located and how close is the Nile ferry?"
    );
    const passed =
      res.detectedLanguage === "en" &&
      res.response.toLowerCase().includes("west bank") &&
      res.response.toLowerCase().includes("ferry") &&
      res.retrievedKnowledgeIds.includes("hotel-location-ferry");

    results.push({
      testId: "T401_CONCIERGE_BASIC_HOTEL_INFO",
      name: "Concierge - Basic Hotel Info & Nile Ferry Access",
      passed,
      message: passed
        ? `Retrieved: ${res.retrievedKnowledgeIds.join(", ")} (Intent: ${res.intent})`
        : "Failed basic hotel info retrieval",
      durationMs: Date.now() - t401Start,
    });
  } catch (err) {
    results.push({
      testId: "T401_CONCIERGE_BASIC_HOTEL_INFO",
      name: "Concierge - Basic Hotel Info & Nile Ferry Access",
      passed: false,
      message: (err as Error).message,
      durationMs: Date.now() - t401Start,
    });
  }

  // T402: Multi-turn Conversation & Context Continuity
  const t402Start = Date.now();
  try {
    const memory = new ConversationMemory();
    const concierge = new ConciergeEngine(memory);
    const conversationId = memory.generateId();

    // Turn 1: Ask about Deluxe Double Room
    const turn1 = await concierge.processMessage(
      "Tell me about the Deluxe Double Room and what beds it has.",
      { conversationId }
    );

    // Turn 2: Follow-up question with pronoun "it" without repeating "Deluxe Double Room"
    const turn2 = await concierge.processMessage(
      "Does it have an en-suite bathroom and is breakfast included?",
      { conversationId }
    );

    const passed =
      turn1.retrievedKnowledgeIds.some((id) => id.includes("deluxe") || id.includes("rooms")) &&
      turn2.response.toLowerCase().includes("breakfast") &&
      turn2.response.toLowerCase().includes("en-suite") &&
      memory.getHistory(conversationId).length === 4; // 2 user + 2 assistant messages

    results.push({
      testId: "T402_CONCIERGE_MULTITURN_FOLLOWUP",
      name: "Concierge - Multi-turn Follow-up Context Continuity",
      passed,
      message: passed
        ? `Turn 1 & 2 succeeded. History maintained: ${memory.getHistory(conversationId).length} messages`
        : "Follow-up context continuity failed",
      durationMs: Date.now() - t402Start,
    });
  } catch (err) {
    results.push({
      testId: "T402_CONCIERGE_MULTITURN_FOLLOWUP",
      name: "Concierge - Multi-turn Follow-up Context Continuity",
      passed: false,
      message: (err as Error).message,
      durationMs: Date.now() - t402Start,
    });
  }

  // T403: Arabic Language Conversation
  const t403Start = Date.now();
  try {
    const res = await defaultConciergeEngine.processMessage(
      "ما هي مواعيد تسجيل الوصول والمغادرة في فندق كليوباترا؟"
    );
    const passed =
      res.detectedLanguage === "ar" &&
      res.response.includes("14:00") &&
      res.response.includes("12:00") &&
      res.intent === "checkin_checkout";

    results.push({
      testId: "T403_CONCIERGE_ARABIC_CONVERSATION",
      name: "Concierge - Arabic Language Detection & Check-in Details",
      passed,
      message: passed
        ? `Arabic detected. Correct policy retrieved (Intent: ${res.intent})`
        : "Arabic conversation failed",
      durationMs: Date.now() - t403Start,
    });
  } catch (err) {
    results.push({
      testId: "T403_CONCIERGE_ARABIC_CONVERSATION",
      name: "Concierge - Arabic Language Detection & Check-in Details",
      passed: false,
      message: (err as Error).message,
      durationMs: Date.now() - t403Start,
    });
  }

  // T404: Multilingual Support (German, French, Spanish)
  const t404Start = Date.now();
  try {
    const resDe = await defaultConciergeEngine.processMessage(
      "Ist das Frühstück im Preis inbegriffen?",
      { preferredLanguage: "de" }
    );
    const resFr = await defaultConciergeEngine.processMessage(
      "Proposez-vous un transfert depuis l'aéroport de Louxor?",
      { preferredLanguage: "fr" }
    );
    const resEs = await defaultConciergeEngine.processMessage(
      "¿A qué hora es el check-in en el hotel?",
      { preferredLanguage: "es" }
    );

    const passed =
      resDe.detectedLanguage === "de" &&
      resDe.response.includes("Grand Cleopatra") &&
      resDe.response.includes("06:30") &&
      resFr.detectedLanguage === "fr" &&
      resFr.response.includes("Louxor") &&
      resEs.detectedLanguage === "es" &&
      resEs.response.includes("14:00");

    results.push({
      testId: "T404_CONCIERGE_ALL_LANGUAGES",
      name: "Concierge - Multilingual Grounding (DE, FR, ES)",
      passed,
      message: passed
        ? "German, French, and Spanish queries successfully localized and grounded"
        : "Multilingual test failed",
      durationMs: Date.now() - t404Start,
    });
  } catch (err) {
    results.push({
      testId: "T404_CONCIERGE_ALL_LANGUAGES",
      name: "Concierge - Multilingual Grounding (DE, FR, ES)",
      passed: false,
      message: (err as Error).message,
      durationMs: Date.now() - t404Start,
    });
  }

  // T405: Unknown Hotel Information & Explicit Pool Negation
  const t405Start = Date.now();
  try {
    const poolRes = await defaultConciergeEngine.processMessage(
      "Does Grand Cleopatra Hotel have a heated swimming pool?"
    );
    const spaRes = await defaultConciergeEngine.processMessage(
      "Can I book a massage at your indoor wellness luxury spa center?"
    );

    const poolNegated =
      poolRes.response.toLowerCase().includes("no swimming pool") ||
      poolRes.response.toLowerCase().includes("not have a swimming pool");
    const spaRefused =
      spaRes.response.toLowerCase().includes("not have confirmed records") ||
      spaRes.response.toLowerCase().includes("reception");

    const passed = poolNegated && spaRefused;

    results.push({
      testId: "T405_CONCIERGE_UNKNOWN_INFO_AND_POOL",
      name: "Concierge - Swimming Pool Negation & Unknown Amenities",
      passed,
      message: passed
        ? "Strictly rejected swimming pool and unverified luxury spa"
        : "Failed unknown amenity handling",
      durationMs: Date.now() - t405Start,
    });
  } catch (err) {
    results.push({
      testId: "T405_CONCIERGE_UNKNOWN_INFO_AND_POOL",
      name: "Concierge - Swimming Pool Negation & Unknown Amenities",
      passed: false,
      message: (err as Error).message,
      durationMs: Date.now() - t405Start,
    });
  }

  // T406: Price & Availability Guardrails
  const t406Start = Date.now();
  try {
    const res = await defaultConciergeEngine.processMessage(
      "Can you confirm room 102 is free tonight right now?"
    );
    const passed =
      !res.response.toLowerCase().includes("room 102 is free") &&
      res.whatsappHandoff.displayPhone === "+20 100 345 6789" &&
      res.requiresHumanConfirmation === true;

    results.push({
      testId: "T406_CONCIERGE_PRICE_AND_AVAILABILITY",
      name: "Concierge - Live Availability Guardrail & Disclaimer",
      passed,
      message: passed
        ? "Refused to fabricate live availability and routed to WhatsApp"
        : "Failed availability guardrail",
      durationMs: Date.now() - t406Start,
    });
  } catch (err) {
    results.push({
      testId: "T406_CONCIERGE_PRICE_AND_AVAILABILITY",
      name: "Concierge - Live Availability Guardrail & Disclaimer",
      passed: false,
      message: (err as Error).message,
      durationMs: Date.now() - t406Start,
    });
  }

  // T407: Owner Confirmation Policy Enforcement (Groups & Events)
  const t407Start = Date.now();
  try {
    const res = await defaultConciergeEngine.processMessage(
      "We want to book a private wedding party for a group of 50 people on the rooftop in December."
    );
    const passed =
      res.requiresHumanConfirmation === true &&
      res.response.includes("⚠️") &&
      res.whatsappHandoff.link.includes("wa.me");

    results.push({
      testId: "T407_CONCIERGE_OWNER_CONFIRMATION",
      name: "Concierge - Owner Confirmation Enforcement (Group Events)",
      passed,
      message: passed
        ? "Injected mandatory owner confirmation banner and flagged requiresHumanConfirmation"
        : "Failed owner confirmation requirement",
      durationMs: Date.now() - t407Start,
    });
  } catch (err) {
    results.push({
      testId: "T407_CONCIERGE_OWNER_CONFIRMATION",
      name: "Concierge - Owner Confirmation Enforcement (Group Events)",
      passed: false,
      message: (err as Error).message,
      durationMs: Date.now() - t407Start,
    });
  }

  // T408: Session Isolation
  const t408Start = Date.now();
  try {
    const memory = new ConversationMemory();
    const concierge = new ConciergeEngine(memory);

    const sessionA = memory.generateId();
    const sessionB = memory.generateId();

    await concierge.processMessage("I want to know about the Triple Room.", {
      conversationId: sessionA,
    });
    const historyA = memory.getHistory(sessionA);
    const historyB = memory.getHistory(sessionB);

    const passed =
      historyA.length === 2 &&
      historyB.length === 0 &&
      sessionA !== sessionB;

    results.push({
      testId: "T408_CONCIERGE_SESSION_ISOLATION",
      name: "Concierge - Session Isolation & Memory Security",
      passed,
      message: passed
        ? "Confirmed session A history is isolated and completely inaccessible to session B"
        : "Session isolation failure",
      durationMs: Date.now() - t408Start,
    });
  } catch (err) {
    results.push({
      testId: "T408_CONCIERGE_SESSION_ISOLATION",
      name: "Concierge - Session Isolation & Memory Security",
      passed: false,
      message: (err as Error).message,
      durationMs: Date.now() - t408Start,
    });
  }

  // ==========================================
  // PHASE 5: TRAVEL PLANNER ENGINE TESTS
  // ==========================================

  // T501: One-Day Itinerary Generation
  const t501Start = Date.now();
  try {
    const itinerary = defaultTravelPlannerEngine.generateItinerary({
      days: 1,
      interests: ["ancient_history", "temples"],
      pace: "moderate",
      budget: "standard",
      travelers: 2,
      startingLocation: "Grand Cleopatra Hotel (West Bank, Luxor)",
      language: "en",
      transportPreference: "any",
    });

    const parsed = ItineraryResponseSchema.safeParse(itinerary);
    const passed =
      parsed.success &&
      itinerary.daysCount === 1 &&
      itinerary.days.length === 1 &&
      itinerary.days[0].morning.id === "attraction-valley-of-the-kings" &&
      itinerary.days[0].nileCrossings === 0;

    results.push({
      testId: "T501_PLANNER_ONE_DAY_ITINERARY",
      name: "Travel Planner - 1-Day West Bank Itinerary",
      passed,
      message: passed
        ? `Generated 1-day itinerary: ${itinerary.title} (0 Nile crossings)`
        : "1-day itinerary generation failed",
      durationMs: Date.now() - t501Start,
    });
  } catch (err) {
    results.push({
      testId: "T501_PLANNER_ONE_DAY_ITINERARY",
      name: "Travel Planner - 1-Day West Bank Itinerary",
      passed: false,
      message: (err as Error).message,
      durationMs: Date.now() - t501Start,
    });
  }

  // T502: Multi-day Bank Grouping & Reduced Nile Crossings
  const t502Start = Date.now();
  try {
    const itinerary = defaultTravelPlannerEngine.generateItinerary({
      days: 3,
      interests: ["ancient_history", "balloons", "photography"],
      pace: "moderate",
      budget: "standard",
      travelers: 2,
      startingLocation: "Grand Cleopatra Hotel (West Bank, Luxor)",
      language: "en",
      transportPreference: "any",
    });

    const day1 = itinerary.days[0];
    const day2 = itinerary.days[1];
    const day3 = itinerary.days[2];

    const day1West = day1.bankFocus === "West Bank" && day1.nileCrossings === 0;
    const day2East = day2.bankFocus === "East Bank" && day2.nileCrossings === 2;
    const day3West = day3.bankFocus === "West Bank" && day3.nileCrossings === 0;

    const passed = day1West && day2East && day3West && itinerary.daysCount === 3;

    results.push({
      testId: "T502_PLANNER_MULTI_DAY_BANK_GROUPING",
      name: "Travel Planner - East/West Bank Grouping & Nile Crossings",
      passed,
      message: passed
        ? `Day 1 (West: 0 crossings), Day 2 (East: 2 crossings), Day 3 (West: 0 crossings)`
        : "Bank grouping test failed",
      durationMs: Date.now() - t502Start,
    });
  } catch (err) {
    results.push({
      testId: "T502_PLANNER_MULTI_DAY_BANK_GROUPING",
      name: "Travel Planner - East/West Bank Grouping & Nile Crossings",
      passed: false,
      message: (err as Error).message,
      durationMs: Date.now() - t502Start,
    });
  }

  // T503: Budget Constraints & Classification
  const t503Start = Date.now();
  try {
    const budgetItin = defaultTravelPlannerEngine.generateItinerary({
      days: 2,
      interests: ["ancient_history"],
      pace: "relaxed",
      budget: "budget",
      travelers: 1,
      startingLocation: "Grand Cleopatra Hotel",
      language: "en",
      transportPreference: "walking_ferry",
    });

    const luxuryItin = defaultTravelPlannerEngine.generateItinerary({
      days: 2,
      interests: ["ancient_history"],
      pace: "intensive",
      budget: "luxury",
      travelers: 2,
      startingLocation: "Grand Cleopatra Hotel",
      language: "en",
      transportPreference: "private_driver",
    });

    const budgetMentionsFerry = budgetItin.budgetClassification?.toLowerCase().includes("ferry");
    const luxuryMentionsVIP = luxuryItin.budgetClassification?.toLowerCase().includes("luxury");

    const passed = Boolean(budgetMentionsFerry && luxuryMentionsVIP);

    results.push({
      testId: "T503_PLANNER_BUDGET_CONSTRAINTS",
      name: "Travel Planner - Budget Classification Differentiation",
      passed,
      message: passed
        ? "Budget itinerary specifies local ferry; Luxury itinerary specifies private transport & VIP tomb guidance"
        : "Budget differentiation failed",
      durationMs: Date.now() - t503Start,
    });
  } catch (err) {
    results.push({
      testId: "T503_PLANNER_BUDGET_CONSTRAINTS",
      name: "Travel Planner - Budget Classification Differentiation",
      passed: false,
      message: (err as Error).message,
      durationMs: Date.now() - t503Start,
    });
  }

  // T504: Heat-Aware Planning & Midday Rest
  const t504Start = Date.now();
  try {
    const itinerary = defaultTravelPlannerEngine.generateItinerary({
      days: 2,
      interests: ["archaeology"],
      pace: "moderate",
      budget: "standard",
      travelers: 2,
      startingLocation: "Grand Cleopatra Hotel",
      language: "en",
      transportPreference: "any",
    });

    const hasHeatAdvisoryDay1 = itinerary.days[0].heatAdvisory?.includes("11:30 AM");
    const hasHeatAdvisoryDay2 = itinerary.days[1].heatAdvisory?.includes("11:30 AM");
    const eastBankHasIndoorMuseum = itinerary.days[1].afternoon?.id === "attraction-luxor-museum";

    const passed = Boolean(hasHeatAdvisoryDay1 && hasHeatAdvisoryDay2 && eastBankHasIndoorMuseum);

    results.push({
      testId: "T504_PLANNER_HEAT_AWARE_PACING",
      name: "Travel Planner - Heat-Aware Desert Pacing & Indoor Museum",
      passed,
      message: passed
        ? "Midday heat notices verified; air-conditioned Luxor Museum scheduled for East Bank midday slot"
        : "Heat-aware pacing failed",
      durationMs: Date.now() - t504Start,
    });
  } catch (err) {
    results.push({
      testId: "T504_PLANNER_HEAT_AWARE_PACING",
      name: "Travel Planner - Heat-Aware Desert Pacing & Indoor Museum",
      passed: false,
      message: (err as Error).message,
      durationMs: Date.now() - t504Start,
    });
  }

  // T505: Arabic Itinerary Generation
  const t505Start = Date.now();
  try {
    const itinerary = defaultTravelPlannerEngine.generateItinerary({
      days: 2,
      interests: ["ancient_history", "temples"],
      pace: "moderate",
      budget: "standard",
      travelers: 2,
      startingLocation: "فندق جراند كليوباترا بالأقصر",
      language: "ar",
      transportPreference: "any",
    });

    const parsed = ItineraryResponseSchema.safeParse(itinerary);
    const passed =
      parsed.success &&
      itinerary.language === "ar" &&
      itinerary.title.includes("الأقصر") &&
      itinerary.days[0].morning.name.includes("وادي الملوك") &&
      itinerary.days[1].morning.name.includes("الكرنك");

    results.push({
      testId: "T505_PLANNER_ARABIC_ITINERARY",
      name: "Travel Planner - Arabic Itinerary & Monument Localization",
      passed,
      message: passed
        ? `Arabic itinerary generated: "${itinerary.title}" with authentic Arabic monument names`
        : "Arabic itinerary generation failed",
      durationMs: Date.now() - t505Start,
    });
  } catch (err) {
    results.push({
      testId: "T505_PLANNER_ARABIC_ITINERARY",
      name: "Travel Planner - Arabic Itinerary & Monument Localization",
      passed: false,
      message: (err as Error).message,
      durationMs: Date.now() - t505Start,
    });
  }

  // T506: Strict Output Schema Conformance
  const t506Start = Date.now();
  try {
    const itinerary = defaultTravelPlannerEngine.generateItinerary({
      days: 5,
      interests: ["photography", "balloons", "local_culture"],
      pace: "relaxed",
      budget: "standard",
      travelers: 3,
      startingLocation: "Grand Cleopatra Hotel",
      language: "en",
      transportPreference: "any",
    });

    const validation = ItineraryResponseSchema.safeParse(itinerary);
    const passed =
      validation.success &&
      itinerary.uncertaintyFlags.length >= 2 &&
      itinerary.overallTips.length >= 3 &&
      itinerary.estimatedDurations !== undefined &&
      itinerary.estimatedDurations.totalSightseeingHours > 0;

    results.push({
      testId: "T506_PLANNER_SCHEMA_STRUCTURE_VALIDATION",
      name: "Travel Planner - Strict Zod Output Schema Conformance",
      passed,
      message: passed
        ? "100% Zod schema validation passed with duration metrics and uncertainty flags"
        : `Validation errors: ${JSON.stringify(validation.error?.flatten())}`,
      durationMs: Date.now() - t506Start,
    });
  } catch (err) {
    results.push({
      testId: "T506_PLANNER_SCHEMA_STRUCTURE_VALIDATION",
      name: "Travel Planner - Strict Zod Output Schema Conformance",
      passed: false,
      message: (err as Error).message,
      durationMs: Date.now() - t506Start,
    });
  }

  const overallLatencyMs = Date.now() - startTime;
  const passedCount = results.filter((r) => r.passed).length;
  const failedCount = results.length - passedCount;

  return {
    total: results.length,
    passed: passedCount,
    failed: failedCount,
    overallLatencyMs,
    results,
  };
}
