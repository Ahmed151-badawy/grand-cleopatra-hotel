import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  MapPin,
  Clock,
  Compass,
  Navigation,
  ExternalLink,
  Car,
  Ship,
  Train,
  Plane,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import Button from "@/components/common/Button";
import CtaBanner from "@/components/home/CtaBanner";
import { nearbyLandmarks, hotelInfo } from "@/data/hotel";

export const metadata: Metadata = {
  title: "Location & West Bank Guide | Grand Cleopatra Hotel Luxor",
  description:
    "Located in Gezira El Bairat on the peaceful West Bank of Luxor. Minutes from Valley of the Kings, Hatshepsut Temple, Colossi of Memnon, and a 3-minute walk to the Nile ferry.",
};

const extendedLandmarks = [
  ...nearbyLandmarks,
  {
    name: "Valley of the Queens (Nefertari Tomb)",
    distance: "4.8 km",
    timeByCar: "9 mins",
    description: "The resting place of Pharaonic royal wives, including the famed tomb of Queen Nefertari.",
    icon: "Crown",
  },
  {
    name: "The Ramesseum",
    distance: "3.2 km",
    timeByCar: "6 mins",
    description: "The magnificent memorial temple of Pharaoh Ramesses II featuring colossal fallen statues.",
    icon: "Landmark",
  },
  {
    name: "Luxor Temple (East Bank)",
    distance: "1.2 km via ferry",
    timeByCar: "8 mins",
    description: "Easily reached via a scenic 5-minute traditional Nile ferry ride from our local pier.",
    icon: "Ship",
  },
  {
    name: "Karnak Temple Complex (East Bank)",
    distance: "4.5 km via ferry/taxi",
    timeByCar: "18 mins",
    description: "The vast open-air religious site and the colossal Great Hypostyle Hall.",
    icon: "Columns",
  },
];

export default function LocationPage() {
  return (
    <>
      {/* Header Banner */}
      <section className="relative py-24 sm:py-32 bg-[#101B35] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=2000&q=85"
            alt="Luxor West Bank Landscape"
            fill
            priority
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101B35] via-[#101B35]/70 to-[#101B35]/80" />
        </div>

        <Container className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#D99A35]/40 text-[#F3B95F] text-xs font-semibold tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Prime West Bank Location</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-serif tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Our Location & Luxor Guide
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#EDE6D8]/85 max-w-2xl mx-auto leading-relaxed">
            Situated in Gezira El Bairat, nestled between the serene River Nile and the majestic
            limestone cliffs of the Theban Necropolis.
          </p>
        </Container>
      </section>

      {/* Location Details & Map Preview */}
      <section className="py-20 bg-[#F8F5EF]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <SectionHeading
                badge="Gezira El Bairat"
                title="The Peaceful Heart of the West Bank"
                subtitle="Experience ancient Egypt without the noise and rush of tourist crowds."
                align="left"
                className="mb-4"
              />

              <p className="text-sm sm:text-base text-[#101B35]/80 leading-relaxed">
                Grand Cleopatra Hotel is conveniently located in <strong>Gezira El Bairat</strong>,
                just 250 meters (a 3-minute stroll) from the public West Bank Nile ferry station.
                This allows you to enjoy the best of both worlds: the peace, nature, and temple
                proximity of the West Bank, alongside effortless 5-minute access to Luxor&apos;s East Bank
                bazaars and Luxor Temple.
              </p>

              <div className="p-5 rounded-xl bg-white border border-[#D99A35]/30 shadow-md space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#D99A35] shrink-0 mt-1" />
                  <div>
                    <h4 className="text-sm font-bold text-[#101B35]">Hotel Address</h4>
                    <p className="text-xs text-[#101B35]/80 mt-0.5 leading-relaxed">
                      {hotelInfo.address.full}
                    </p>
                    <span className="text-[11px] text-[#1677B8] font-mono mt-1 block">
                      GPS: 25.6989° N, 32.6321° E
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href="https://maps.google.com/?q=25.6989,32.6321"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#101B35] text-white rounded-md text-xs font-semibold hover:bg-[#1A2A4E] transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#D99A35]" />
                    <span>Navigate with Google Maps</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Visual Map Card */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#D99A35]/40 shadow-2xl bg-[#101B35] text-white">
                <div className="relative h-[380px] w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=85"
                    alt="Luxor Sunset Map View"
                    fill
                    className="object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101B35] via-[#101B35]/40 to-transparent" />
                </div>

                {/* Info Card Overlay */}
                <div className="p-6 bg-[#0A1122] border-t border-[#D99A35]/30 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold font-serif text-base text-white">
                        Grand Cleopatra Hotel
                      </h4>
                      <p className="text-xs text-[#F3B95F]">West Bank Sanctuary, Luxor</p>
                    </div>
                    <span className="text-xs bg-emerald-950 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30 font-semibold">
                      Prime Location
                    </span>
                  </div>

                  <p className="text-xs text-[#EDE6D8]/80 leading-relaxed">
                    Our private airport transfer driver will gladly meet you at Luxor International
                    Airport or the Train Station with a name sign for a completely stress-free arrival.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Proximity to Monuments Grid */}
      <section className="py-20 bg-white border-y border-[#EDE6D8]">
        <Container>
          <SectionHeading
            badge="Ancient Thebes Wonders"
            title="Proximity to Major Attractions"
            subtitle="Plan your itinerary with ease. All world-famous Pharaonic temples and tombs are minutes away."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {extendedLandmarks.map((landmark, idx) => (
              <div
                key={idx}
                className="bg-[#F8F5EF] p-6 rounded-xl border border-[#D99A35]/25 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1677B8]">
                      {landmark.distance}
                    </span>
                    <span className="text-xs font-semibold text-[#B67C21] bg-[#D99A35]/15 px-2.5 py-0.5 rounded-full border border-[#D99A35]/30">
                      {landmark.timeByCar}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#101B35] font-serif">
                    {landmark.name}
                  </h3>

                  <p className="text-xs text-[#101B35]/70 mt-2 leading-relaxed">
                    {landmark.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#101B35]/10 flex items-center justify-between text-xs text-[#101B35]/70">
                  <span className="flex items-center gap-1 text-[#D99A35] font-semibold">
                    <Clock className="w-3.5 h-3.5" /> Quick Access
                  </span>
                  <span>Tours arranged at desk</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How to Reach Us */}
      <section className="py-20 bg-[#101B35] text-white">
        <Container>
          <SectionHeading
            badge="Travel Directions"
            title="How to Get to Grand Cleopatra Hotel"
            subtitle="Seamless transit from air, rail, or river."
            light
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Airport */}
            <div className="bg-[#0A1122]/70 p-8 rounded-xl border border-[#D99A35]/25 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#D99A35]/15 text-[#D99A35] flex items-center justify-center">
                <Plane className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-serif">
                From Luxor Airport (LXR)
              </h3>
              <p className="text-xs text-[#EDE6D8]/75 leading-relaxed">
                Located 26 km away. The easiest, most comfortable route is booking our private
                hotel transfer. Our driver will meet you inside the terminal and drive you in a
                modern air-conditioned car across the Luxor Bridge directly to our hotel (approx. 30 mins).
              </p>
              <div className="text-xs text-[#F3B95F] font-semibold pt-1">
                Private Transfer: $20 USD / vehicle
              </div>
            </div>

            {/* Railway */}
            <div className="bg-[#0A1122]/70 p-8 rounded-xl border border-[#D99A35]/25 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#1677B8]/20 text-[#1677B8] flex items-center justify-center">
                <Train className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-serif">
                From Luxor Train Station
              </h3>
              <p className="text-xs text-[#EDE6D8]/75 leading-relaxed">
                If arriving via the overnight sleeper train from Cairo or train from Aswan, take a
                short 5-minute taxi to the East Bank ferry pier, cross on the public ferry in 5
                minutes, and we are a 3-minute stroll from the landing. Alternatively, request our car pickup.
              </p>
              <div className="text-xs text-[#F3B95F] font-semibold pt-1">
                Ferry Crossing: ~10 EGP (~$0.20 USD)
              </div>
            </div>

            {/* Nile Ferry */}
            <div className="bg-[#0A1122]/70 p-8 rounded-xl border border-[#D99A35]/25 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#D99A35]/15 text-[#D99A35] flex items-center justify-center">
                <Ship className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-serif">
                Local Public Nile Ferry
              </h3>
              <p className="text-xs text-[#EDE6D8]/75 leading-relaxed">
                Operating 24/7 every 10–15 minutes between the East Bank (in front of Luxor Temple)
                and the West Bank (Al Bairat). Once you step off the West Bank dock, walk straight for
                250 meters along the pleasant village street to our entrance.
              </p>
              <div className="text-xs text-[#F3B95F] font-semibold pt-1">
                Walking Distance: 3 minutes
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}

