/**
 * Input sanitization utility for Cleopatra AI.
 * Strips script tags, HTML injection vectors, control characters, and enforces length boundaries.
 */

const MAX_USER_INPUT_LENGTH = 1000;

export function sanitizeUserInput(input: unknown, maxLength: number = MAX_USER_INPUT_LENGTH): string {
  if (typeof input !== "string") {
    return "";
  }

  // 1. Trim whitespace
  let clean = input.trim();

  // 2. Enforce length boundary
  if (clean.length > maxLength) {
    clean = clean.substring(0, maxLength);
  }

  // 3. Strip HTML tags and potential script injections
  clean = clean
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/javascript:/gi, "")
    .replace(/vbscript:/gi, "")
    .replace(/onload\s*=/gi, "")
    .replace(/onerror\s*=/gi, "");

  // 4. Remove invisible dangerous control characters except newlines/tabs
  clean = clean.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");

  return clean;
}

export const sanitizeInput = sanitizeUserInput;

export function sanitizeOutput(output: string): string {
  if (typeof output !== "string") {
    return "";
  }
  return output
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "");
}

