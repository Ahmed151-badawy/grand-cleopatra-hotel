"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MessageSquare, X, Sparkles } from "lucide-react";
import AIChatWindow from "./AIChatWindow";
import { useRouter } from "next/navigation";

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasPrompted, setHasPrompted] = useState(false);
  const router = useRouter();

  // Subtle nudge tooltip appearing after 6 seconds of browsing
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasPrompted(true);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  // Listen for Escape key to close widget
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleOpenPlanner = () => {
    setIsOpen(false);
    router.push("/planner");
  };

  return (
    <>
      {/* Floating Chat Window Modal */}
      <AIChatWindow
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onOpenPlanner={handleOpenPlanner}
      />

      {/* Floating Launcher Button */}
      <aside
        aria-label="Hotel AI Concierge Assistant"
        className="fixed z-40 sm:z-50 bottom-20 right-4 sm:bottom-6 sm:right-6 transition-all duration-300"
      >
        <div className="relative flex items-center">
          {/* Proactive Tooltip Callout (auto hides when clicked) */}
          {!isOpen && hasPrompted && (
            <div className="hidden md:flex items-center gap-2 mr-3 px-3.5 py-2 rounded-full bg-[#101B35] text-white text-xs shadow-xl border border-[#D99A35]/40 animate-fade-in">
              <Sparkles className="w-3.5 h-3.5 text-[#D99A35] flex-shrink-0" />
              <span className="font-medium text-[#F8F5EF] whitespace-nowrap">
                Need help? Ask Cleopatra AI
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setHasPrompted(false);
                }}
                className="text-white/50 hover:text-white p-0.5 ml-1"
                aria-label="Dismiss AI assistance prompt"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* Launcher Circular Button */}
          <button
            type="button"
            onClick={() => {
              setIsOpen((prev) => !prev);
              setHasPrompted(false);
            }}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close AI Concierge" : "Open AI Concierge"}
            className={`group relative flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#D99A35]/40 ${
              isOpen
                ? "bg-[#101B35] border-2 border-[#D99A35] text-white rotate-90"
                : "bg-gradient-to-tr from-[#101B35] via-[#16274D] to-[#101B35] border-2 border-[#D99A35] text-white"
            }`}
          >
            {/* Glowing gold pulse ring behind button */}
            {!isOpen && (
              <span className="absolute -inset-1 rounded-full bg-[#D99A35]/20 animate-ping opacity-75 pointer-events-none" />
            )}

            {isOpen ? (
              <X className="w-6 h-6 text-[#F3B95F]" />
            ) : (
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#D99A35]/60">
                <Image
                  src="/images/brand/grand-cleopatra-seal.jpg"
                  alt="Cleopatra AI"
                  fill
                  className="object-cover"
                  sizes="40px"
                  priority
                />
              </div>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
