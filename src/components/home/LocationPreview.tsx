import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Navigation,
  Compass,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import Button from "@/components/common/Button";
import { nearbyLandmarks, hotelInfo } from "@/data/hotel";

export default function LocationPreview() {
  return (
    <section className="py-20 lg:py-28 bg-[#101B35] text-white relative overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Location Highlights */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-[#D99A35]/15 text-[#D99A35] border border-[#D99A35]/30">
              <MapPin className="w-3.5 h-3.5" />
              <span>Gezira El Bairat • West Bank, Luxor</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight font-serif leading-tight">
              Stay in Ancient Thebes, Right Beside the Temples
            </h2>

            <div className="w-16 h-1 rounded-full bg-gradient-to-r from-[#D99A35] to-[#F3B95F]" />

            <p className="text-base text-[#EDE6D8]/80 leading-relaxed">
              Grand Cleopatra Hotel is situated on Luxor&apos;s coveted West Bank, where history&apos;s
              greatest Pharaohs built their everlasting tombs. Enjoy peaceful rural lanes,
              whispering palm trees, and zero city stress, with ancient wonders at your doorstep.
            </p>

            {/* Landmark Proximity Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {nearbyLandmarks.slice(0, 4).map((landmark, idx) => (
                <div
                  key={idx}
                  className="bg-[#0A1122]/80 border border-[#D99A35]/25 rounded-lg p-3.5 flex items-start justify-between"
                >
                  <div>
                    <h4 className="text-xs font-bold text-white">{landmark.name}</h4>
                    <span className="text-[11px] text-[#EDE6D8]/60 block mt-0.5">
                      {landmark.distance} away
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-[#F3B95F] bg-[#D99A35]/15 px-2 py-0.5 rounded border border-[#D99A35]/30">
                    {landmark.timeByCar}
                  </span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Button href="/location" variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                Explore Area Guide
              </Button>
              <a
                href="https://maps.google.com/?q=25.6989,32.6321"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-md border border-white/20 text-white hover:bg-white/10 transition-colors"
              >
                <Navigation className="w-4 h-4 text-[#D99A35]" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>
            </div>
          </div>

          {/* Right Column: Visual Map Card with Luxor Overlay */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#D99A35]/40 shadow-2xl bg-[#0A1122]">
              {/* Nile & Temple visual illustration */}
              <div className="relative h-96 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=85"
                  alt="Ancient Luxor Landscape"
                  fill
                  className="object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1122] via-[#0A1122]/40 to-transparent" />
              </div>

              {/* Floating Pin Card */}
              <div className="absolute bottom-6 inset-x-6 bg-[#101B35]/95 backdrop-blur-md p-5 rounded-xl border border-[#D99A35]/30 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#D99A35] flex items-center justify-center text-[#101B35] font-bold shadow-md">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white font-serif">
                        Grand Cleopatra Hotel
                      </h4>
                      <p className="text-xs text-[#F3B95F]">Gezira El Bairat, West Bank, Luxor</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-500/40">
                    Prime Location
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-xs text-[#EDE6D8]/80">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#D99A35]" />
                    <span>2 min to local ferry</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#D99A35]" />
                    <span>5 min to Memnon</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#D99A35]" />
                    <span>10 min to Hatshepsut</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#D99A35]" />
                    <span>12 min to Kings Valley</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
