"use client";

import React from "react";
import { LanguageCode } from "@/lib/ai/types";

interface TypingIndicatorProps {
  language?: LanguageCode;
}

export default function TypingIndicator({ language = "en" }: TypingIndicatorProps) {
  let label = "Cleopatra AI is consulting hotel records...";
  if (language === "ar") {
    label = "Cleopatra AI تبحث في السجلات المعتمدة...";
  } else if (language === "de") {
    label = "Cleopatra AI prüft Hotelunterlagen...";
  } else if (language === "fr") {
    label = "Cleopatra AI consulte les registres officiels...";
  } else if (language === "es") {
    label = "Cleopatra AI está consultando los registros...";
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white border border-[#D99A35]/30 shadow-sm max-w-xs text-xs text-[#101B35]/80"
    >
      <div className="flex items-center gap-1.5" aria-hidden="true">
        <span className="w-2 h-2 rounded-full bg-[#D99A35] animate-bounce [animation-delay:-0.3s]" />
        <span className="w-2 h-2 rounded-full bg-[#D99A35] animate-bounce [animation-delay:-0.15s]" />
        <span className="w-2 h-2 rounded-full bg-[#D99A35] animate-bounce" />
      </div>
      <span className="text-[11px] font-medium text-slate-600 truncate">{label}</span>
    </div>
  );
}

