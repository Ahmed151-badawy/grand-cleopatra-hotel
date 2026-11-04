import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import ContactForm from "./ContactForm";
import FaqSection from "./FaqSection";
import CtaBanner from "@/components/home/CtaBanner";
import { hotelInfo } from "@/data/hotel";

export const metadata: Metadata = {
  title: "Contact Us | Grand Cleopatra Hotel Luxor",
  description:
    "Get in touch with Grand Cleopatra Hotel in Luxor, Egypt. Reach our 24/7 reception via phone, WhatsApp, email, or our inquiry form for reservations, transfers, and excursions.",
};

export default function ContactPage() {
  return (
    <>
      {/* Header Banner */}
      <section className="relative py-24 sm:py-32 bg-[#101B35] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=85"
            alt="Grand Cleopatra Reception"
            fill
            priority
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101B35] via-[#101B35]/70 to-[#101B35]/80" />
        </div>

        <Container className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#D99A35]/40 text-[#F3B95F] text-xs font-semibold tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>24/7 Front Desk & Concierge</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-serif tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Contact Us
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#EDE6D8]/85 max-w-2xl mx-auto leading-relaxed">
            We are always here to assist with room reservations, airport pickups, tour planning,
            or any questions about visiting ancient Luxor.
          </p>
        </Container>
      </section>

      {/* Main Contact Section */}
      <section className="py-20 bg-[#F8F5EF]">
        <Container>
          {/* Quick Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-white p-6 rounded-xl border border-[#D99A35]/30 shadow-md text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#D99A35]/15 text-[#D99A35] flex items-center justify-center mx-auto">
                <Phone className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-[#101B35] uppercase tracking-wider">
                Telephone
              </h4>
              <p className="text-xs text-[#101B35]/70">24/7 Direct Line</p>
              <a
                href={`tel:${hotelInfo.phone}`}
                className="text-sm font-bold text-[#1677B8] hover:text-[#D99A35] transition-colors block"
              >
                {hotelInfo.phone}
              </a>
            </div>

            <div className="bg-white p-6 rounded-xl border border-emerald-500/30 shadow-md text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-[#101B35] uppercase tracking-wider">
                WhatsApp Direct
              </h4>
              <p className="text-xs text-[#101B35]/70">Instant Chat & Confirmation</p>
              <a
                href={`https://wa.me/${hotelInfo.whatsapp.replace(/\+/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors block"
              >
                +20 100 345 6789
              </a>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#D99A35]/30 shadow-md text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#1677B8]/15 text-[#1677B8] flex items-center justify-center mx-auto">
                <Mail className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-[#101B35] uppercase tracking-wider">
                Email
              </h4>
              <p className="text-xs text-[#101B35]/70">Inquiries & Group Requests</p>
              <a
                href={`mailto:${hotelInfo.email}`}
                className="text-xs font-bold text-[#101B35] hover:text-[#D99A35] transition-colors block truncate"
              >
                {hotelInfo.email}
              </a>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#D99A35]/30 shadow-md text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#D99A35]/15 text-[#D99A35] flex items-center justify-center mx-auto">
                <MapPin className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-[#101B35] uppercase tracking-wider">
                Location
              </h4>
              <p className="text-xs text-[#101B35]/70">West Bank, Luxor</p>
              <span className="text-xs font-semibold text-[#101B35] block">
                Gezira El Bairat, Luxor, Egypt
              </span>
            </div>
          </div>

          {/* Form & FAQ Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#D99A35]" />
                <h3 className="text-xl font-bold font-serif text-[#101B35]">
                  Frequently Asked Questions
                </h3>
              </div>
              <p className="text-xs text-[#101B35]/70">
                Quick answers to common questions about arriving in Luxor and staying at Grand Cleopatra.
              </p>
              <FaqSection />
            </div>
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
