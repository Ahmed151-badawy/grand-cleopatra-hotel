import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, HeartHandshake, Compass, Sparkles } from "lucide-react";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import Button from "@/components/common/Button";

export default function HotelIntro() {
  return (
    <section className="py-20 lg:py-28 bg-[#F8F5EF] relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D99A35]/5 rounded-full blur-3xl pointer-events-none" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Imagery Grid */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Main Image */}
              <div className="relative h-72 sm:h-96 rounded-xl overflow-hidden shadow-xl border-2 border-[#D99A35]/30">
                <Image
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=85"
                  alt="Grand Cleopatra Rooftop Dining"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Secondary stacked images */}
              <div className="space-y-4">
                <div className="relative h-36 sm:h-44 rounded-xl overflow-hidden shadow-md border border-[#D99A35]/20">
                  <Image
                    src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=85"
                    alt="Deluxe Room Interior"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="relative h-36 sm:h-48 rounded-xl overflow-hidden shadow-md border border-[#D99A35]/20">
                  <Image
                    src="https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=800&q=85"
                    alt="Hot Air Balloons Luxor"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              </div>
            </div>

            {/* Floating Heritage Badge */}
            <div className="absolute -bottom-6 left-6 sm:left-10 bg-[#101B35] text-white p-4 rounded-xl shadow-2xl border-2 border-[#D99A35] flex items-center gap-3.5 max-w-xs">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#D99A35] shrink-0 bg-white">
                <Image
                  src="/images/brand/grand-cleopatra-seal.jpg"
                  alt="Cleopatra Seal"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#D99A35] font-bold block">
                  Authentic Heritage
                </span>
                <span className="text-sm font-semibold text-white">
                  Welcoming Guests Since 1975
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-[#D99A35]/15 text-[#D99A35] border border-[#D99A35]/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>West Bank Haven • Luxor, Egypt</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#101B35] tracking-tight font-serif leading-tight">
              An Oasis of Serenity in the Cradle of Ancient Thebes
            </h2>

            <div className="w-16 h-1 rounded-full bg-gradient-to-r from-[#D99A35] to-[#F3B95F]" />

            <p className="text-base sm:text-lg text-[#101B35]/80 leading-relaxed">
              Tucked away in the peaceful village of Gezira El Bairat on Luxor&apos;s West Bank,
              <strong> Grand Cleopatra Hotel</strong> offers an authentic Egyptian sanctuary.
              While the East Bank buzzes with commercial bustle, our West Bank haven greets you
              with quiet date palm groves, friendly neighborhood smiles, and breathtaking views
              toward the sacred mountains guarding the Pharaohs.
            </p>

            <p className="text-sm sm:text-base text-[#101B35]/75 leading-relaxed">
              Whether you are watching the dawn balloons soar from our panoramic rooftop with a
              glass of freshly brewed mint tea, or returning from the Valley of the Kings to an
              immaculately chilled, comfortable room, our family-led team treats every guest with
              revered Egyptian hospitality.
            </p>

            {/* Value checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-sm font-medium text-[#101B35]">
                <CheckCircle2 className="w-4 h-4 text-[#D99A35] shrink-0" />
                <span>3-minute walk to local Nile ferry</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-medium text-[#101B35]">
                <CheckCircle2 className="w-4 h-4 text-[#D99A35] shrink-0" />
                <span>Minutes to Valley of the Kings & Memnon</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-medium text-[#101B35]">
                <CheckCircle2 className="w-4 h-4 text-[#D99A35] shrink-0" />
                <span>Rooftop restaurant with 360° vistas</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-medium text-[#101B35]">
                <CheckCircle2 className="w-4 h-4 text-[#D99A35] shrink-0" />
                <span>Private tours & airport transfer desk</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Button href="/about" variant="primary">
                Read Our Story
              </Button>
              <Button href="/rooms" variant="outline">
                View Room Options
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

