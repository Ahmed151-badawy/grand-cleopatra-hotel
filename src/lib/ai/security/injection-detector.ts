const PROMPT_INJECTION_PATTERNS: RegExp[] = [
  // English patterns
  /ignore\s+(all\s+)?(previous|prior|above)\s+(instructions|directives|prompts|rules)/i,
  /disregard\s+(all\s+)?(previous|prior|above)\s+(instructions|directives|rules)/i,
  /you\s+are\s+now\s+(in\s+)?(dan|jailbreak|unfiltered|developer)\s+mode/i,
  /reveal\s+(your\s+)?(system\s+prompt|hidden\s+instructions|secret\s+key)/i,
  /repeat\s+(everything|the\s+words)\s+above/i,
  /system\s*:\s*override/i,
  /do\s+anything\s+now/i,
  /bypass\s+(safety|content)\s+filters/i,
  /print\s+your\s+(initial|system)\s+instructions/i,

  // Arabic patterns
  /تجاهل\s+(جميع\s+)?التعليمات\s+السابقة/i,
  /انسى\s+(كل\s+)?الاوامر\s+السابقة/i,
  /اكشف\s+(عن\s+)?التعليمات\s+(السرية|الاساسية)/i,
  /تصرف\s+كأنك\s+(بدون\s+قيود|مخترق)/i,

  // German patterns
  /ignoriere\s+(alle\s+)?(vorherigen|bisherigen)\s+anweisungen/i,
  /zeige\s+(deinen\s+)?system\s*prompt/i,

  // French patterns
  /ignore\s+(toutes\s+les\s+)?instructions\s+précédentes/i,
  /révèle\s+ton\s+prompt\s+système/i,

  // Spanish patterns
  /ignora\s+(todas\s+las\s+)?instrucciones\s+anteriores/i,
  /revela\s+tus\s+instrucciones\s+del\s+sistema/i,
];

export interface InjectionCheckResult {
  isInjection: boolean;
  reason?: string;
  matchedPattern?: string;
}

export function detectPromptInjection(input: string): InjectionCheckResult {
  if (!input || typeof input !== "string") {
    return { isInjection: false };
  }

  for (const pattern of PROMPT_INJECTION_PATTERNS) {
    if (pattern.test(input)) {
      return {
        isInjection: true,
        reason: "Prohibited instruction pattern detected that attempts to bypass system directives.",
        matchedPattern: pattern.source,
      };
    }
  }

  return { isInjection: false };
}
