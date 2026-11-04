import React from "react";
import Image from "next/image";
import { Calendar, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import { hotelInfo } from "@/data/hotel";

export default function CtaBanner() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-[#101B35] to-[#0A1122] relative overflow-hidden border-t border-[#D99A35]/30">
      {/* Background Subtle Silhouette */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <Image
          src="/images/brand/grand-cleopatra-logo.jpg"
          alt="Cleopatra Motif"
          fill
          className="object-cover object-center"
        />
      </div>

      <Container>
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-[#D99A35]/20 text-[#F3B95F] border border-[#D99A35]/40">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Plan Your Ancient Egyptian Journey</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-serif leading-tight">
            Ready to Experience the Magic of Luxor?
          </h2>

          <p className="text-base sm:text-lg text-[#EDE6D8]/85 max-w-2xl mx-auto leading-relaxed">
            Reserve directly with Grand Cleopatra Hotel for guaranteed best rates, flexible
            free cancellation, and complimentary rooftop Egyptian breakfast each morning.
          </p>

          {/* Quick Perks */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#EDE6D8]/90 py-2">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#D99A35]" />
              <span>No Upfront Booking Fees</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#D99A35]" />
              <span>Complimentary Welcome Mint Tea</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#D99A35]" />
              <span>Dedicated Concierge Service</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button
              href="/reservation"
              variant="primary"
              size="lg"
              icon={<Calendar className="w-5 h-5" />}
              iconPosition="left"
            >
              Start Reservation Inquiry
            </Button>

            <a
              href={`https://wa.me/${hotelInfo.whatsapp.replace(/\+/g, "")}?text=Hello%20Grand%20Cleopatra%20Hotel,%20I%20would%20like%20to%20inquire%20about%20room%20availability.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold tracking-wide rounded-md bg-emerald-700 hover:bg-emerald-600 text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Message on WhatsApp</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
