import type { Metadata } from "next";
import Container from "@/components/common/Container";
import TravelPlanner from "@/components/ai/TravelPlanner";
import { Compass, Sparkles, MapPin, Calendar, ShieldCheck, Sun } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Travel Planner — Grounded Luxor Itineraries | Grand Cleopatra Hotel",
  description:
    "Design personalized, heat-aware Luxor itineraries powered by Cleopatra AI. Optimized for East/West Bank geography, zero unnecessary Nile crossings, and authentic local tips from Grand Cleopatra Hotel.",
};

export default function PlannerPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative bg-[#101B35] text-white pt-24 pb-16 sm:pb-24 overflow-hidden border-b border-[#D99A35]/30">
        {/* Background Subtle Gradient & Egyptian Motif */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#101B35] via-[#142347] to-[#0D162B] opacity-95" />
        <div className="absolute inset-0 bg-[radial-gradient(#D99A35_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D99A35]/20 border border-[#D99A35]/40 text-[#F3B95F] text-xs sm:text-sm font-semibold mb-5 font-serif uppercase tracking-widest shadow-inner">
              <Sparkles className="w-4 h-4 text-[#D99A35]" />
              <span>Cleopatra AI • Luxor Travel Engine</span>
            </div>

            <h1 className="font-serif font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight mb-5 leading-tight">
              Curate Your Perfect <span className="text-[#D99A35]">Luxor Journey</span>
            </h1>

            <p className="text-sm sm:text-lg text-[#EDE6D8]/90 font-normal leading-relaxed mb-8">
              Experience ancient Thebes with intelligent, heat-aware pacing. Our proprietary planning engine groups monuments strictly by West and East Bank to eliminate transit fatigue, starting right from Grand Cleopatra Hotel.
            </p>

            {/* Value Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <Compass className="w-5 h-5 text-[#D99A35] flex-shrink-0" />
                <div className="text-xs text-slate-300">
                  <strong className="text-white block">Bank Partitioned</strong>
                  Zero unnecessary Nile crossings
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <Sun className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <div className="text-xs text-slate-300">
                  <strong className="text-white block">Heat-Aware Pacing</strong>
                  Morning tombs & shaded midday
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <div className="text-xs text-slate-300">
                  <strong className="text-white block">100% Grounded</strong>
                  Verified distances & MoTA sites
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Interactive Planner Section */}
      <section className="-mt-8 relative z-20">
        <Container>
          <div className="max-w-5xl mx-auto">
            <TravelPlanner />
          </div>
        </Container>
      </section>
    </div>
  );
}

