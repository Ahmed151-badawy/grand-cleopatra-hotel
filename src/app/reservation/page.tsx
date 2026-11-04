import React, { Suspense } from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { Sparkles, Calendar } from "lucide-react";
import Container from "@/components/common/Container";
import ReservationWizard from "./ReservationWizard";

export const metadata: Metadata = {
  title: "Reservation Inquiry | Grand Cleopatra Hotel Luxor",
  description:
    "Direct room reservation and tour inquiry for Grand Cleopatra Hotel in Luxor, Egypt. Best rates guaranteed, free cancellation, and complimentary Egyptian rooftop breakfast.",
};

export default function ReservationPage() {
  return (
    <>
      {/* Header Banner */}
      <section className="relative py-20 sm:py-28 bg-[#101B35] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=2000&q=85"
            alt="Grand Cleopatra Reservation"
            fill
            priority
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101B35] via-[#101B35]/70 to-[#101B35]/80" />
        </div>

        <Container className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#D99A35]/40 text-[#F3B95F] text-xs font-semibold tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Booking Privilege</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-serif tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Reservation Inquiry
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#EDE6D8]/85 max-w-2xl mx-auto leading-relaxed">
            Reserve directly with our hotel to enjoy guaranteed best rates, flexible
            cancellation, and complimentary rooftop Egyptian breakfast each morning.
          </p>
        </Container>
      </section>

      {/* Main Reservation Section */}
      <section className="py-16 sm:py-20 bg-[#F8F5EF]">
        <Container>
          <Suspense
            fallback={
              <div className="text-center py-20 text-[#101B35]">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#D99A35] border-t-transparent mb-4" />
                <p className="font-semibold text-sm">Loading Reservation System...</p>
              </div>
            }
          >
            <ReservationWizard />
          </Suspense>
        </Container>
      </section>
    </>
  );
}

