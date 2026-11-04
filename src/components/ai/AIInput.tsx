"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, CornerDownLeft } from "lucide-react";
import { LanguageCode } from "@/lib/ai/types";

interface AIInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  language: LanguageCode;
}

export default function AIInput({
  onSendMessage,
  isLoading,
  language,
}: AIInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isRTL = language === "ar";

  let placeholder = "Ask about rooms, ferry, rooftop, or monuments...";
  if (language === "ar") {
    placeholder = "اسأل عن الغرف، المواعيد، المعدية، أو المعالم...";
  } else if (language === "de") {
    placeholder = "Fragen Sie nach Zimmern, Fähre, Frühstück...";
  } else if (language === "fr") {
    placeholder = "Posez une question sur les chambres, le bac...";
  } else if (language === "es") {
    placeholder = "Pregunte sobre habitaciones, el ferry, desayuno...";
  }

  // Auto-resize textarea height up to 120px
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120
      )}px`;
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    onSendMessage(trimmed);
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-3 border-t border-slate-200 bg-white/95 backdrop-blur-sm"
    >
      <div className="relative flex items-center rounded-2xl border border-[#D99A35]/40 bg-slate-50 focus-within:border-[#D99A35] focus-within:ring-2 focus-within:ring-[#D99A35]/20 focus-within:bg-white transition-all shadow-inner">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value.slice(0, 1000))}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isLoading}
          rows={1}
          dir={isRTL ? "rtl" : "ltr"}
          aria-label="Message to Cleopatra AI"
          className="w-full resize-none bg-transparent px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none disabled:opacity-60 max-h-[120px] leading-relaxed"
        />

        <div className="flex items-center gap-1.5 pr-2.5 pl-1.5 flex-shrink-0">
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            aria-label="Send message"
            className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-r from-[#D99A35] to-[#B67C21] text-white hover:from-[#E6AD4B] hover:to-[#C68A2F] disabled:opacity-40 disabled:hover:from-[#D99A35] disabled:hover:to-[#B67C21] transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-[#D99A35]"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="mt-1.5 flex items-center justify-between px-1 text-[10px] text-slate-400">
        <span className="hidden sm:inline-flex items-center gap-1">
          <CornerDownLeft className="w-3 h-3" /> Press Enter to send, Shift+Enter for new line
        </span>
        <span className="ml-auto">
          {input.length}/1000
        </span>
      </div>
    </form>
  );
}
