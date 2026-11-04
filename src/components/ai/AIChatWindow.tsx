"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  RotateCcw,
  Sparkles,
  Compass,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import AIMessage, { ChatMessageUI } from "./AIMessage";
import AIInput from "./AIInput";
import TypingIndicator from "./TypingIndicator";
import LanguageSelector from "./LanguageSelector";
import { LanguageCode } from "@/lib/ai/types";

interface AIChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPlanner?: () => void;
}

export default function AIChatWindow({
  isOpen,
  onClose,
  onOpenPlanner,
}: AIChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessageUI[]>([]);
  const [conversationId, setConversationId] = useState<string>("");
  const [language, setLanguage] = useState<LanguageCode>("en");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isRTL = language === "ar";

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Load conversation ID from session storage if exists
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedId = sessionStorage.getItem("cleo_conv_id");
      if (storedId) {
        setConversationId(storedId);
      }
    }
  }, []);

  const handleLanguageChange = (newLang: LanguageCode) => {
    setLanguage(newLang);
  };

  const handleResetChat = () => {
    setMessages([]);
    setError(null);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("cleo_conv_id");
    }
    setConversationId("");
  };

  const handleSendMessage = async (text: string) => {
    setError(null);
    setIsLoading(true);

    const userMessage: ChatMessageUI = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          conversationId: conversationId || undefined,
          language,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to communicate with Cleopatra AI.");
      }

      // Persist conversation ID
      if (data.conversationId) {
        setConversationId(data.conversationId);
        if (typeof window !== "undefined") {
          sessionStorage.setItem("cleo_conv_id", data.conversationId);
        }
      }

      // Automatically align language if detected
      if (data.detectedLanguage && data.detectedLanguage !== language) {
        setLanguage(data.detectedLanguage);
      }

      const assistantMessage: ChatMessageUI = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.response,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        source: data.source,
        confidence: data.confidence,
        retrievedKnowledgeIds: data.retrievedKnowledgeIds,
        requiresHumanConfirmation: data.requiresHumanConfirmation,
        whatsappHandoff: data.whatsappHandoff,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Network error. Please try again.";
      setError(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Localized quick suggestion pills
  const getQuickSuggestions = () => {
    switch (language) {
      case "ar":
        return [
          { text: "ما هي أنواع الغرف المتاحة؟", icon: "🛏️" },
          { text: "كيف أصل إلى الفندق والمعدية؟", icon: "⛵" },
          { text: "هل يتوفر حمام سباحة؟", icon: "🏊" },
          { text: "ما هي مواعيد تسجيل الدخول والإفطار؟", icon: "⏰" },
          { text: "ساعدني في التخطيط لرحلتي في الأقصر", icon: "🧭", isPlanner: true },
        ];
      case "de":
        return [
          { text: "Welche Zimmertypen gibt es?", icon: "🛏️" },
          { text: "Wie erreiche ich das Hotel & Fähre?", icon: "⛵" },
          { text: "Gibt es einen Swimmingpool?", icon: "🏊" },
          { text: "Wann sind Check-in und Frühstück?", icon: "⏰" },
          { text: "Hilf mir bei der Reiseplanung für Luxor", icon: "🧭", isPlanner: true },
        ];
      case "fr":
        return [
          { text: "Quels types de chambres proposez-vous?", icon: "🛏️" },
          { text: "Comment rejoindre l'hôtel et le bac?", icon: "⛵" },
          { text: "Y a-t-il une piscine?", icon: "🏊" },
          { text: "Quels sont les horaires d'arrivée?", icon: "⏰" },
          { text: "Aidez-moi à planifier mon séjour", icon: "🧭", isPlanner: true },
        ];
      case "es":
        return [
          { text: "¿Qué tipos de habitaciones tienen?", icon: "🛏️" },
          { text: "¿Cómo llego al hotel y al ferry?", icon: "⛵" },
          { text: "¿Hay piscina en el hotel?", icon: "🏊" },
          { text: "¿A qué hora es el check-in y desayuno?", icon: "⏰" },
          { text: "Ayúdame a planificar mi viaje a Lúxor", icon: "🧭", isPlanner: true },
        ];
      default:
        return [
          { text: "What room types do you offer?", icon: "🛏️" },
          { text: "How can I reach the hotel & ferry?", icon: "⛵" },
          { text: "Does the hotel have a swimming pool?", icon: "🏊" },
          { text: "What are the check-in & breakfast times?", icon: "⏰" },
          { text: "Help me plan my trip to Luxor", icon: "🧭", isPlanner: true },
        ];
    }
  };

  const getWelcomeGreeting = () => {
    switch (language) {
      case "ar":
        return {
          title: "أهلاً بك في فندق جراند كليوباترا",
          desc: "أنا المساعد الذكي Cleopatra AI. يسعدني تزويدك بمعلومات معتمدة حول الغرف، الإفطار على الروف، مواعيد المعدية النهرية، ومعالم الأقصر.",
        };
      case "de":
        return {
          title: "Willkommen im Grand Cleopatra Hotel",
          desc: "Ich bin Cleopatra AI, Ihr digitaler Concierge. Ich beantworte Fragen zu Zimmern, Dachterrassenfrühstück, Fähre und thebanischen Monumenten.",
        };
      case "fr":
        return {
          title: "Bienvenue au Grand Cleopatra Hotel",
          desc: "Je suis Cleopatra AI, votre concierge virtuel. Posez-moi vos questions sur nos chambres, le petit-déjeuner sur le toit ou la traversée du Nil.",
        };
      case "es":
        return {
          title: "Bienvenido al Grand Cleopatra Hotel",
          desc: "Soy Cleopatra AI, su conserje virtual. Estoy a su disposición para informarle sobre habitaciones, desayuno en la terraza y visitas a Lúxor.",
        };
      default:
        return {
          title: "Welcome to Grand Cleopatra Hotel",
          desc: "I am Cleopatra AI, your intelligent hotel concierge. Ask me anything about our room categories, rooftop breakfast, Nile ferry access, or Luxor monuments.",
        };
    }
  };

  if (!isOpen) return null;

  const greeting = getWelcomeGreeting();

  return (
    <div
      role="dialog"
      aria-label="Cleopatra AI Concierge Chat"
      dir={isRTL ? "rtl" : "ltr"}
      className="fixed z-50 flex flex-col bg-slate-50 shadow-2xl border border-[#D99A35]/40 overflow-hidden transition-all duration-300
        inset-x-0 bottom-0 top-16 sm:top-auto sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[420px] sm:h-[620px] sm:rounded-2xl"
    >
      {/* Premium Navy Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#101B35] text-white border-b border-[#D99A35]/30">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-[#D99A35] shadow-md flex-shrink-0 bg-[#101B35]">
            <Image
              src="/images/brand/grand-cleopatra-seal.jpg"
              alt="Cleopatra AI Seal"
              fill
              className="object-cover"
              sizes="36px"
              priority
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-bold text-sm text-[#F3B95F] tracking-wide font-serif">
              <span>Cleopatra AI</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Online" />
            </div>
            <div className="text-[10px] text-[#EDE6D8]/80 truncate max-w-[190px]">
              Grand Cleopatra Hotel • Luxor
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          <LanguageSelector
            currentLanguage={language}
            onLanguageChange={handleLanguageChange}
            compact
          />

          <button
            type="button"
            onClick={handleResetChat}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            title="Reset conversation"
            aria-label="Reset conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            title="Close chat"
            aria-label="Close chat window"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F8F5EF]/60">
        {/* Welcome Card if no messages */}
        {messages.length === 0 && (
          <div className="rounded-2xl border border-[#D99A35]/30 bg-white p-4 shadow-sm text-center my-2">
            <div className="mx-auto w-12 h-12 rounded-full bg-[#101B35] flex items-center justify-center text-[#D99A35] shadow-md mb-2.5">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#101B35] mb-1">
              {greeting.title}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              {greeting.desc}
            </p>

            {/* Quick Suggestions */}
            <div className="text-left space-y-1.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#D99A35] px-1">
                {isRTL ? "أسئلة مقترحة سريعة:" : "Quick Suggestions:"}
              </div>
              <div className="flex flex-col gap-1.5">
                {getQuickSuggestions().map((s, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      if (s.isPlanner && onOpenPlanner) {
                        onClose();
                        onOpenPlanner();
                      } else {
                        handleSendMessage(s.text);
                      }
                    }}
                    className="flex items-center gap-2 w-full text-left rounded-xl px-3 py-2 text-xs text-slate-700 bg-slate-50 hover:bg-[#D99A35]/10 hover:text-[#101B35] border border-slate-200 transition-all font-medium group"
                  >
                    <span className="text-sm flex-shrink-0" aria-hidden="true">{s.icon}</span>
                    <span className="flex-1 truncate">{s.text}</span>
                    {s.isPlanner && (
                      <span className="text-[10px] bg-[#D99A35] text-white px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                        Planner
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Render Conversation Messages */}
        {messages.map((msg) => (
          <AIMessage key={msg.id} message={msg} language={language} />
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className={`flex w-full ${isRTL ? "justify-end" : "justify-start"}`}>
            <TypingIndicator language={language} />
          </div>
        )}

        {/* Error Notification */}
        {error && (
          <div className="my-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center justify-between gap-2 shadow-sm">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span>{error}</span>
            </div>
            <button
              type="button"
              onClick={() => setError(null)}
              className="text-xs text-red-600 underline font-semibold hover:text-red-800"
            >
              Dismiss
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Travel Planner Banner Link */}
      <div className="px-4 py-1.5 bg-[#101B35]/5 border-t border-slate-200 flex items-center justify-between text-[11px] text-[#101B35]">
        <span className="flex items-center gap-1 font-medium text-slate-600">
          <Compass className="w-3.5 h-3.5 text-[#D99A35]" />
          {isRTL ? "ترغب في برنامج سياحي مخصص للأقصر؟" : "Want a custom Luxor itinerary?"}
        </span>
        <button
          type="button"
          onClick={() => {
            onClose();
            if (onOpenPlanner) onOpenPlanner();
          }}
          className="font-bold text-[#D99A35] hover:text-[#B67C21] transition-colors underline"
        >
          {isRTL ? "فتح المخطط الذكي" : "Open AI Planner"}
        </button>
      </div>

      {/* Input Area */}
      <AIInput
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        language={language}
      />
    </div>
  );
}

