"use client";

import React from "react";
import Link from "next/link";
import Container from "@/components/common/Container";
import { Compass, Sparkles, Sun, ShieldCheck, ArrowRight, MessageSquare } from "lucide-react";

export default function AIPlannerBanner() {
  return (
    <section className="py-16 bg-[#F8F5EF] border-y border-[#D99A35]/20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#101B35] via-[#142347] to-[#0E1830] p-8 sm:p-12 text-white shadow-2xl border border-[#D99A35]/40">
          {/* Subtle Egyptian decorative background glow */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[#D99A35]/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#1677B8]/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D99A35]/20 text-[#F3B95F] text-xs font-serif font-bold uppercase tracking-widest border border-[#D99A35]/30 mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Cleopatra AI • Guest Technology</span>
              </div>

              <h2 className="font-serif font-extrabold text-2xl sm:text-4xl text-white mb-4 leading-tight">
                Intelligent Luxor Travel Planner & <span className="text-[#D99A35]">Digital Concierge</span>
              </h2>

              <p className="text-sm sm:text-base text-[#EDE6D8]/80 leading-relaxed max-w-2xl mb-6">
                Let our intelligent concierge craft an optimized, heat-aware itinerary across the Theban Necropolis and East Bank temples. Grounded strictly in authentic distances, verified ferry schedules, and actual opening hours.
              </p>

              {/* 3 Value Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <div className="flex items-center gap-2.5 text-xs text-slate-300">
                  <Compass className="w-4 h-4 text-[#D99A35] flex-shrink-0" />
                  <span>Zero unnecessary Nile crossings</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-300">
                  <Sun className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Heat-aware desert scheduling</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>100% verified MoTA monuments</span>
                </div>
              </div>
            </div>

            {/* Right Action Buttons */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Link
                href="/planner"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D99A35] via-[#E2A645] to-[#B67C21] text-white text-sm font-bold shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-100 transition-all font-serif tracking-wider text-center"
              >
                <span>Plan Your Luxor Itinerary</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={() => {
                  // Trigger open chat widget if present
                  const chatBtn = document.querySelector('button[aria-label*="AI Concierge"]') as HTMLButtonElement;
                  if (chatBtn) chatBtn.click();
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold border border-white/20 transition-colors text-center"
              >
                <MessageSquare className="w-4 h-4 text-[#D99A35]" />
                <span>Chat with Concierge</span>
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

