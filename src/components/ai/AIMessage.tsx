"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MessageCircle, Check, Copy, AlertTriangle, ShieldCheck, ExternalLink } from "lucide-react";
import { LanguageCode } from "@/lib/ai/types";

export interface ChatMessageUI {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  source?: "ollama_model" | "fallback_engine";
  confidence?: "high" | "medium" | "low";
  retrievedKnowledgeIds?: string[];
  requiresHumanConfirmation?: boolean;
  whatsappHandoff?: {
    phone: string;
    displayPhone: string;
    link: string;
    message: string;
  };
}

interface AIMessageProps {
  message: ChatMessageUI;
  language: LanguageCode;
}

export default function AIMessage({ message, language }: AIMessageProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";
  const isRTL = language === "ar";

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Format assistant response paragraphs and warning callouts safely
  const formatContent = (text: string) => {
    const paragraphs = text.split(/\n\n+/);
    return paragraphs.map((para, i) => {
      // Warning banner detection
      if (para.startsWith("⚠️")) {
        return (
          <div
            key={i}
            className="my-2 p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-start gap-2 shadow-sm font-medium"
          >
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>{para.replace("⚠️", "").trim()}</div>
          </div>
        );
      }

      // Standard text with bold rendering
      const parts = para.split(/(\*\*[^*]+\*\*)/g);
      return (
        <p key={i} className="mb-2 leading-relaxed last:mb-0">
          {parts.map((part, j) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={j} className="font-semibold text-[#101B35]">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return part;
          })}
        </p>
      );
    });
  };

  if (isUser) {
    return (
      <div className={`flex w-full ${isRTL ? "justify-start" : "justify-end"} mb-3`}>
        <div className="max-w-[85%] sm:max-w-[75%] rounded-2xl rounded-tr-sm bg-gradient-to-r from-[#101B35] to-[#1C3364] px-4 py-3 text-white text-xs sm:text-sm shadow-md border border-[#D99A35]/20">
          <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
          <div className="mt-1 text-right text-[10px] text-white/60">
            {message.timestamp}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex w-full ${isRTL ? "justify-end" : "justify-start"} mb-4`}>
      <div className="flex gap-2.5 max-w-[92%] sm:max-w-[85%] items-start">
        {/* Cleopatra AI Avatar */}
        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#D99A35] flex-shrink-0 shadow bg-[#101B35] mt-1">
          <Image
            src="/images/brand/grand-cleopatra-seal.jpg"
            alt="Cleopatra AI"
            fill
            className="object-cover"
            sizes="32px"
          />
        </div>

        {/* Message Bubble */}
        <div className="flex-1 rounded-2xl rounded-tl-sm bg-white border border-[#D99A35]/30 p-4 shadow-sm text-xs sm:text-sm text-slate-800">
          {/* Header Badge */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2.5">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#101B35]">
              <span className="text-[#D99A35]">Cleopatra AI</span>
              <span className="text-slate-400">•</span>
              <span className="flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium border border-emerald-200">
                <ShieldCheck className="w-3 h-3" />
                Verified Hotel Knowledge
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="text-slate-400 hover:text-slate-600 transition-colors p-1"
              title="Copy answer"
              aria-label="Copy answer to clipboard"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* Formatted Text Content */}
          <div className="text-slate-700 font-normal">{formatContent(message.content)}</div>

          {/* Optional WhatsApp Handoff Action Card */}
          {message.whatsappHandoff && (
            <div className="mt-3.5 rounded-xl border border-emerald-200 bg-emerald-50/70 p-3 flex flex-col sm:flex-row items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div className="text-[11px] text-emerald-950 font-medium">
                  {isRTL
                    ? "تواصل مباشرة مع استقبال جراند كليوباترا:"
                    : "Connect directly with 24/7 Hotel Reception:"}
                  <span className="block font-bold text-emerald-800">
                    {message.whatsappHandoff.displayPhone}
                  </span>
                </div>
              </div>

              <a
                href={message.whatsappHandoff.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors shadow-sm flex-shrink-0 w-full sm:w-auto justify-center"
              >
                <span>{isRTL ? "مراسلة عبر واتساب" : "Open WhatsApp"}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}

          {/* Footer Metadata */}
          <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-400 pt-1.5 border-t border-slate-50">
            <span>{message.timestamp}</span>
            {message.retrievedKnowledgeIds && message.retrievedKnowledgeIds.length > 0 && (
              <span className="text-[10px] text-slate-400 truncate max-w-[160px]">
                Ref: {message.retrievedKnowledgeIds[0]}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
