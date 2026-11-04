import { LanguageCode } from "../types";

/**
 * Normalizes Arabic text by unifying character variants and stripping harakat (tashkeel).
 */
export function normalizeArabicText(text: string): string {
  return text
    // Remove diacritics (tashkeel)
    .replace(/[\u064B-\u065F\u0670]/g, "")
    // Normalize Alef variants to bare Alef
    .replace(/[\u0622\u0623\u0625\u0671]/g, "\u0627")
    // Normalize Teh Marbuta to Heh
    .replace(/\u0629/g, "\u0647")
    // Normalize Alef Maqsura to Yaa
    .replace(/\u0649/g, "\u064A")
    // Normalize Tatweel
    .replace(/\u0640/g, "");
}

/**
 * Normalizes Latin text by stripping accents, lowercasing, and normalizing German umlauts.
 */
export function normalizeLatinText(text: string): string {
  return text
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // strip diacritic marks
}

/**
 * Detects the predominant language of the input query.
 */
export function detectLanguage(input: string): LanguageCode {
  if (!input || !input.trim()) return "en";

  // Check for Arabic characters (Unicode block 0600 - 06FF)
  if (/[\u0600-\u06FF]/.test(input)) {
    return "ar";
  }

  const lower = input.toLowerCase();

  // Distinctive German indicators (excluding international words like 'hotel')
  const deHits = (
    lower.match(/\b(zimmer|frühstück|wie|wann|wo|haben|sie|buchung|rezeption|stornierung|flughafen|kostet|ist|das|der|die|ein|eine|bitte|danke|auf|mit|nach)\b/g) || []
  ).length + (lower.match(/[äöüß]/g) || []).length * 2;

  // Distinctive French indicators
  const frHits = (
    lower.match(/\b(bonjour|chambre|petit-déjeuner|comment|combien|annuler|arrivée|départ|piscine|repas|merci|est-ce|vous|pour|avec|dans|sur|votre)\b/g) || []
  ).length + (lower.match(/[éèêëàâçîïôùû]/g) || []).length * 2;

  // Distinctive Spanish indicators
  const esHits = (
    lower.match(/\b(hola|habitación|desayuno|cómo|cuánto|llegar|cancelar|piscina|aeropuerto|reserva|gracias|por favor|dónde|está|para|con|sobre)\b/g) || []
  ).length + (lower.match(/[áéíóúñ¿¡]/g) || []).length * 2;

  // Distinctive English indicators
  const enHits = (
    lower.match(/\b(where|what|how|when|why|which|is|are|the|and|with|from|have|does|can|will|our|your|about|there|close)\b/g) || []
  ).length;

  if (deHits > enHits && deHits >= frHits && deHits >= esHits) {
    return "de";
  }
  if (frHits > enHits && frHits >= deHits && frHits >= esHits) {
    return "fr";
  }
  if (esHits > enHits && esHits >= deHits && esHits >= frHits) {
    return "es";
  }

  return "en";
}

/**
 * Tokenizes, normalizes, and stems words for cross-language matching.
 */
export function tokenizeAndNormalize(text: string): string[] {
  const isArabic = /[\u0600-\u06FF]/.test(text);
  const normalized = isArabic ? normalizeArabicText(text.toLowerCase()) : normalizeLatinText(text);

  // Split on non-alphanumeric (keeping Arabic letters)
  const rawTokens = normalized
    .split(/[\s,.;:!?()[\]{}"'\\/\-_*+=~`<>|]+/)
    .filter((token) => token.length > 1);

  const tokens = new Set<string>();

  for (const t of rawTokens) {
    tokens.add(t);
    // English simple plural stemming (e.g. rooms -> room, pets -> pet, pools -> pool)
    if (!isArabic && t.length > 3 && t.endsWith("s") && !t.endsWith("ss")) {
      tokens.add(t.slice(0, -1));
    }
  }

  return Array.from(tokens);
}
