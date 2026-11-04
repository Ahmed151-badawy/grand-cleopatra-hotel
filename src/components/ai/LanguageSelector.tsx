"use client";

import React, { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { LanguageCode } from "@/lib/ai/types";

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  dir: "ltr" | "rtl";
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧", dir: "ltr" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇪🇬", dir: "rtl" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪", dir: "ltr" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷", dir: "ltr" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸", dir: "ltr" },
];

interface LanguageSelectorProps {
  currentLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  compact?: boolean;
}

export default function LanguageSelector({
  currentLanguage,
  onLanguageChange,
  compact = false,
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selected =
    SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage) ||
    SUPPORTED_LANGUAGES[0];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select AI Concierge language"
        className={`flex items-center gap-1.5 rounded-full border border-[#D99A35]/30 bg-[#101B35]/80 hover:bg-[#101B35] text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#D99A35] ${
          compact ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-xs font-medium"
        }`}
      >
        <span className="text-sm" aria-hidden="true">
          {selected.flag}
        </span>
        {!compact && (
          <span className="font-medium text-[#F8F5EF]">{selected.nativeName}</span>
        )}
        <ChevronDown
          className={`w-3.5 h-3.5 text-[#D99A35] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Languages"
          className="absolute right-0 mt-1.5 w-44 rounded-xl border border-[#D99A35]/30 bg-[#101B35] p-1.5 shadow-2xl backdrop-blur-md z-50 text-left"
        >
          <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#D99A35]">
            Select Language
          </div>
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isCurrent = lang.code === currentLanguage;
            return (
              <button
                key={lang.code}
                role="option"
                aria-selected={isCurrent}
                type="button"
                onClick={() => {
                  onLanguageChange(lang.code);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition-colors ${
                  isCurrent
                    ? "bg-[#D99A35]/20 text-[#F3B95F] font-semibold"
                    : "text-[#EDE6D8]/90 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm" aria-hidden="true">
                    {lang.flag}
                  </span>
                  <span>{lang.nativeName}</span>
                </div>
                {isCurrent && (
                  <Check className="w-3.5 h-3.5 text-[#D99A35]" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
