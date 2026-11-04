import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import {
  Heart,
  ShieldCheck,
  Compass,
  Coffee,
  CheckCircle2,
  Users,
  Award,
  Calendar,
  Sparkles,
} from "lucide-react";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import Button from "@/components/common/Button";
import CtaBanner from "@/components/home/CtaBanner";
import { hotelInfo } from "@/data/hotel";

export const metadata: Metadata = {
  title: "About Us | Grand Cleopatra Hotel Luxor",
  description:
    "Discover the story of Grand Cleopatra Hotel, welcoming travelers to Luxor's peaceful West Bank since 1975 with authentic Egyptian hospitality and spectacular Nile views.",
};

export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <section className="relative py-24 sm:py-32 bg-[#101B35] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=85"
            alt="Grand Cleopatra Rooftop"
            fill
            priority
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101B35] via-[#101B35]/70 to-[#101B35]/80" />
        </div>

        <Container className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#D99A35]/40 text-[#F3B95F] text-xs font-semibold tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hospitality Heritage Since 1975</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-serif tracking-tight text-white max-w-4xl mx-auto leading-tight">
            About Grand Cleopatra Hotel
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#EDE6D8]/85 max-w-2xl mx-auto leading-relaxed">
            A peaceful boutique hotel on Luxor&apos;s West Bank, dedicated to genuine Egyptian
            warmth, comfort, and unforgettable cultural journeys.
          </p>
        </Container>
      </section>

      {/* Story & Legacy Section */}
      <section className="py-20 bg-[#F8F5EF]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <SectionHeading
                badge="Our Legacy"
                title="A Family Sanctuary in Ancient Thebes"
                subtitle="Rooted in decades of authentic Egyptian hospitality, welcoming generations of explorers."
                align="left"
                className="mb-6"
              />

              <p className="text-sm sm:text-base text-[#101B35]/80 leading-relaxed">
                Founded in 1975 in the serene hamlet of Gezira El Bairat, <strong>Grand Cleopatra Hotel</strong> was
                born from a passion to offer travelers from across the globe a genuine home away from
                home on the West Bank of Luxor.
              </p>

              <p className="text-sm sm:text-base text-[#101B35]/80 leading-relaxed">
                While the bustling city center on the East Bank thrives with commerce and market
                crowds, the West Bank has preserved its tranquil village character, framed by fertile
                green sugar cane fields, swaying date palms, and the monumental golden limestone cliffs
                where the Pharaohs were laid to rest.
              </p>

              <p className="text-sm sm:text-base text-[#101B35]/80 leading-relaxed">
                Over the decades, we have continually refreshed our rooms with modern climate control,
                crisp Egyptian linens, and private en-suite bathrooms, all while maintaining the warm,
                intimate family care that makes our guests return year after year.
              </p>

              <div className="pt-2 flex items-center gap-6">
                <div className="border-l-4 border-[#D99A35] pl-4">
                  <span className="text-3xl font-extrabold text-[#101B35] block font-serif">
                    1975
                  </span>
                  <span className="text-xs text-[#101B35]/70 uppercase tracking-wider font-semibold">
                    Year Established
                  </span>
                </div>

                <div className="border-l-4 border-[#1677B8] pl-4">
                  <span className="text-3xl font-extrabold text-[#101B35] block font-serif">
                    9.2 / 10
                  </span>
                  <span className="text-xs text-[#101B35]/70 uppercase tracking-wider font-semibold">
                    Booking.com Superb
                  </span>
                </div>

                <div className="border-l-4 border-[#D99A35] pl-4">
                  <span className="text-3xl font-extrabold text-[#101B35] block font-serif">
                    100%
                  </span>
                  <span className="text-xs text-[#101B35]/70 uppercase tracking-wider font-semibold">
                    Egyptian Warmth
                  </span>
                </div>
              </div>
            </div>

            {/* Right Images & Heritage Emblem */}
            <div className="lg:col-span-6 relative">
              <div className="relative h-96 sm:h-[450px] w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-[#D99A35]/30">
                <Image
                  src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85"
                  alt="Grand Cleopatra Luxury Room"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Floating Vintage Badge */}
              <div className="absolute -bottom-8 -left-4 sm:left-6 bg-[#101B35] p-5 rounded-xl border-2 border-[#D99A35] shadow-2xl flex items-center gap-4 max-w-sm text-white">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border border-[#D99A35] shrink-0 bg-white">
                  <Image
                    src="/images/brand/grand-cleopatra-seal.jpg"
                    alt="Grand Cleopatra Seal"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#F3B95F] font-serif">
                    Grand Cleopatra Luxor
                  </h4>
                  <p className="text-xs text-[#EDE6D8]/80 mt-0.5">
                    Authentic Pharaonic spirit & modern boutique hospitality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Why Stay on the West Bank */}
      <section className="py-20 bg-white border-y border-[#EDE6D8]">
        <Container>
          <SectionHeading
            badge="The Location Advantage"
            title="Why Travelers Choose the West Bank"
            subtitle="Escape the noise of the city and wake up surrounded by antiquity and authentic rural Egyptian charm."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#F8F5EF] p-8 rounded-xl border border-[#D99A35]/20 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-[#D99A35]/15 text-[#D99A35] flex items-center justify-center mb-6">
                <Compass className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-[#101B35] font-serif mb-3">
                Minutes to Pharaohs&apos; Tombs
              </h3>
              <p className="text-sm text-[#101B35]/75 leading-relaxed">
                Stay just 5 to 12 minutes from the Valley of the Kings, Queen Hatshepsut&apos;s Temple,
                Medinet Habu, and the Colossi of Memnon. Beat the big tour bus crowds by arriving early.
              </p>
            </div>

            <div className="bg-[#F8F5EF] p-8 rounded-xl border border-[#D99A35]/20 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-[#1677B8]/15 text-[#1677B8] flex items-center justify-center mb-6">
                <Heart className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-[#101B35] font-serif mb-3">
                Peaceful, Authentic Village Life
              </h3>
              <p className="text-sm text-[#101B35]/75 leading-relaxed">
                Gezira El Bairat is a tranquil Egyptian village with friendly neighbors, green
                fields, and riverside breezes. No pushy street vendors or heavy traffic noise.
              </p>
            </div>

            <div className="bg-[#F8F5EF] p-8 rounded-xl border border-[#D99A35]/20 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-[#D99A35]/15 text-[#D99A35] flex items-center justify-center mb-6">
                <Coffee className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-[#101B35] font-serif mb-3">
                Effortless Nile River Crossing
              </h3>
              <p className="text-sm text-[#101B35]/75 leading-relaxed">
                The local public ferry is only a 3-minute stroll from our door. For a few Egyptian
                pounds, cross the Nile in 5 minutes right to Luxor Temple and the East Bank.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Our Guiding Principles */}
      <section className="py-20 bg-[#101B35] text-white">
        <Container>
          <SectionHeading
            badge="Hospitality Creed"
            title="What We Stand For"
            subtitle="Every detail of your stay is looked after with dedication, transparency, and care."
            light
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#0A1122]/70 p-6 rounded-xl border border-[#D99A35]/20">
              <ShieldCheck className="w-8 h-8 text-[#D99A35] mb-4" />
              <h4 className="text-base font-bold text-white mb-2">Guest-First Integrity</h4>
              <p className="text-xs text-[#EDE6D8]/70 leading-relaxed">
                Transparent rates with no hidden surprises. Honest local advice and tour planning.
              </p>
            </div>

            <div className="bg-[#0A1122]/70 p-6 rounded-xl border border-[#D99A35]/20">
              <Sparkles className="w-8 h-8 text-[#F3B95F] mb-4" />
              <h4 className="text-base font-bold text-white mb-2">Immaculate Cleanliness</h4>
              <p className="text-xs text-[#EDE6D8]/70 leading-relaxed">
                Daily housekeeping, fresh Egyptian cotton linens, and sparkling en-suite bathrooms.
              </p>
            </div>

            <div className="bg-[#0A1122]/70 p-6 rounded-xl border border-[#D99A35]/20">
              <Coffee className="w-8 h-8 text-[#D99A35] mb-4" />
              <h4 className="text-base font-bold text-white mb-2">Authentic Flavors</h4>
              <p className="text-xs text-[#EDE6D8]/70 leading-relaxed">
                Home-cooked Egyptian specialties made with fresh produce grown in Luxor&apos;s Nile valley.
              </p>
            </div>

            <div className="bg-[#0A1122]/70 p-6 rounded-xl border border-[#D99A35]/20">
              <Users className="w-8 h-8 text-[#1677B8] mb-4" />
              <h4 className="text-base font-bold text-white mb-2">24/7 Family Care</h4>
              <p className="text-xs text-[#EDE6D8]/70 leading-relaxed">
                Whether you arrive late or depart before dawn, our family and staff are always ready.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
