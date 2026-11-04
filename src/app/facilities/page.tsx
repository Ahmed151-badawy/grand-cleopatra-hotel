import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Utensils,
  Coffee,
  Compass,
  Flame,
  Ship,
  Car,
  Bike,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import Button from "@/components/common/Button";
import CtaBanner from "@/components/home/CtaBanner";
import { facilities } from "@/data/facilities";
import { hotelInfo } from "@/data/hotel";

export const metadata: Metadata = {
  title: "Facilities & Services | Grand Cleopatra Hotel Luxor",
  description:
    "Experience panoramic rooftop dining, traditional Egyptian breakfast, Valley of the Kings guided excursions, sunrise hot air balloons, Nile felucca sailing, and 24/7 concierge service.",
};

const iconMap: Record<string, React.ReactNode> = {
  Utensils: <Utensils className="w-6 h-6" />,
  Coffee: <Coffee className="w-6 h-6" />,
  Compass: <Compass className="w-6 h-6" />,
  Flame: <Flame className="w-6 h-6" />,
  Ship: <Ship className="w-6 h-6" />,
  Car: <Car className="w-6 h-6" />,
  Bike: <Bike className="w-6 h-6" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6" />,
};

export default function FacilitiesPage() {
  return (
    <>
      {/* Header Banner */}
      <section className="relative py-24 sm:py-32 bg-[#101B35] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=85"
            alt="Grand Cleopatra Rooftop Dining"
            fill
            priority
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101B35] via-[#101B35]/70 to-[#101B35]/80" />
        </div>

        <Container className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#D99A35]/40 text-[#F3B95F] text-xs font-semibold tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hospitality & Experiences</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-serif tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Facilities & Services
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#EDE6D8]/85 max-w-2xl mx-auto leading-relaxed">
            From our panoramic rooftop restaurant overlooking the River Nile to bespoke Pharaonic
            tours and sunrise balloon flights, we craft every moment of your Luxor journey.
          </p>
        </Container>
      </section>

      {/* Facilities List Section */}
      <section className="py-20 bg-[#F8F5EF]">
        <Container>
          <div className="space-y-16">
            {facilities.map((facility, index) => {
              const isEven = index % 2 === 1;
              return (
                <div
                  key={facility.id}
                  id={facility.id}
                  className="bg-white rounded-2xl overflow-hidden border border-[#D99A35]/30 shadow-lg hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12"
                >
                  {/* Image Column */}
                  <div
                    className={`lg:col-span-5 relative min-h-[300px] sm:min-h-[380px] ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <Image
                      src={facility.image}
                      alt={facility.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 42vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />

                    {facility.highlight && (
                      <div className="absolute top-4 left-4 bg-[#D99A35] text-[#101B35] font-extrabold text-xs uppercase px-3 py-1.5 rounded-full shadow-lg tracking-wider">
                        {facility.highlight}
                      </div>
                    )}
                  </div>

                  {/* Content Column */}
                  <div
                    className={`lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6 ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-[#D99A35]">
                          <div className="w-10 h-10 rounded-lg bg-[#D99A35]/15 flex items-center justify-center">
                            {iconMap[facility.icon] || <CheckCircle2 className="w-5 h-5" />}
                          </div>
                          <span className="text-xs uppercase font-bold tracking-widest text-[#1677B8]">
                            {facility.category}
                          </span>
                        </div>

                        {facility.timing && (
                          <span className="text-xs text-[#101B35]/70 flex items-center gap-1.5 bg-[#F8F5EF] px-3 py-1 rounded-full border border-[#D99A35]/20">
                            <Clock className="w-3.5 h-3.5 text-[#D99A35]" />
                            {facility.timing}
                          </span>
                        )}
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-bold text-[#101B35] font-serif">
                        {facility.title}
                      </h2>

                      <p className="text-sm sm:text-base text-[#101B35]/80 leading-relaxed">
                        {facility.fullDescription}
                      </p>

                      {/* Checklist */}
                      <div className="space-y-2 pt-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#101B35]">
                          Key Highlights
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#101B35]/80">
                          {facility.features.map((feature, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-[#D99A35] shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t border-[#101B35]/10 flex flex-wrap items-center gap-4">
                      <Button
                        href="/reservation"
                        variant="primary"
                        size="sm"
                        icon={<ArrowRight className="w-4 h-4" />}
                      >
                        Inquire or Book Stay
                      </Button>
                      <a
                        href={`https://wa.me/${hotelInfo.whatsapp.replace(/\+/g, "")}?text=Hello%20Grand%20Cleopatra%20Hotel,%20I%20am%20interested%20in%20arranging%20${encodeURIComponent(facility.title)}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Inquire on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
