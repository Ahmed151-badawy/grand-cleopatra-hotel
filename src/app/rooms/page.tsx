import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Users,
  Maximize,
  BedDouble,
  Check,
  Eye,
  Calendar,
  Sparkles,
  ShieldCheck,
  Coffee,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import Button from "@/components/common/Button";
import CtaBanner from "@/components/home/CtaBanner";
import { rooms } from "@/data/rooms";

export const metadata: Metadata = {
  title: "Rooms & Suites | Grand Cleopatra Hotel Luxor",
  description:
    "Explore our comfortable accommodations in Luxor, Egypt: Deluxe Double Room, Triple Room, and Single Room with Terrace. All with air conditioning, en-suite baths, and free breakfast.",
};

export default function RoomsPage() {
  return (
    <>
      {/* Header Banner */}
      <section className="relative py-24 sm:py-32 bg-[#101B35] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=2000&q=85"
            alt="Grand Cleopatra Hotel Rooms"
            fill
            priority
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101B35] via-[#101B35]/70 to-[#101B35]/80" />
        </div>

        <Container className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#D99A35]/40 text-[#F3B95F] text-xs font-semibold tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Booking.com Accommodations</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-serif tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Rooms & Suites
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#EDE6D8]/85 max-w-2xl mx-auto leading-relaxed">
            Thoughtfully designed for restful slumber after your Egyptian adventures.
            Every room includes silent climate control, pristine private en-suite baths,
            and our complimentary rooftop breakfast.
          </p>
        </Container>
      </section>

      {/* Main Rooms Showcase */}
      <section className="py-20 bg-[#F8F5EF]">
        <Container>
          <div className="space-y-16">
            {rooms.map((room, index) => {
              const isEven = index % 2 === 1;
              return (
                <div
                  key={room.id}
                  id={room.slug}
                  className="bg-white rounded-2xl overflow-hidden border border-[#D99A35]/30 shadow-lg hover:shadow-2xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12"
                >
                  {/* Image Column */}
                  <div
                    className={`lg:col-span-6 relative min-h-[340px] sm:min-h-[420px] ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <Image
                      src={room.heroImage}
                      alt={room.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />

                    {/* Room Badge */}
                    {room.badge && (
                      <div className="absolute top-4 left-4 bg-[#D99A35] text-[#101B35] font-extrabold text-xs uppercase px-3 py-1.5 rounded-full shadow-lg tracking-wider">
                        {room.badge}
                      </div>
                    )}

                    {/* Price floating tag */}
                    <div className="absolute bottom-4 left-4 bg-[#101B35]/95 backdrop-blur-sm border border-[#D99A35]/50 text-white px-4 py-2 rounded-xl shadow-xl">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xs text-[#EDE6D8]/70">from</span>
                        <span className="text-2xl font-black text-[#F3B95F]">
                          ${room.pricePerNight}
                        </span>
                        <span className="text-xs text-[#EDE6D8]/70">/ night</span>
                        {room.originalPrice && (
                          <span className="text-xs text-[#EDE6D8]/50 line-through ml-1">
                            ${room.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Content Column */}
                  <div
                    className={`lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6 ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-xs uppercase font-bold text-[#D99A35] tracking-widest">
                          {room.floor}
                        </span>
                        <span className="text-xs text-[#1677B8] font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Free Rooftop Breakfast
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-bold text-[#101B35] font-serif">
                        {room.name}
                      </h2>
                      <p className="text-xs text-[#D99A35] font-semibold mt-1">
                        {room.view}
                      </p>

                      <p className="text-sm sm:text-base text-[#101B35]/75 mt-3 leading-relaxed">
                        {room.description}
                      </p>

                      {/* Specs Row */}
                      <div className="grid grid-cols-3 gap-3 my-5 py-3 border-y border-[#101B35]/10 text-xs text-[#101B35]">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#D99A35] shrink-0" />
                          <div>
                            <span className="font-bold block">{room.maxGuests} Guests</span>
                            <span className="text-[10px] text-[#101B35]/60">Occupancy</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Maximize className="w-4 h-4 text-[#D99A35] shrink-0" />
                          <div>
                            <span className="font-bold block">{room.sizeSqm} m² / {room.sizeSqft} ft²</span>
                            <span className="text-[10px] text-[#101B35]/60">Floor Area</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <BedDouble className="w-4 h-4 text-[#D99A35] shrink-0" />
                          <div>
                            <span className="font-bold block truncate">{room.slug === "single-room-with-terrace" ? "Single Bed" : room.slug === "triple-room" ? "3 Single/Dbl" : "King / Twins"}</span>
                            <span className="text-[10px] text-[#101B35]/60">Bed Type</span>
                          </div>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-[#101B35] uppercase tracking-wider">
                          Key Room Amenities
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#101B35]/80">
                          {room.features.slice(0, 4).map((feature, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <Check className="w-3.5 h-3.5 text-[#D99A35] shrink-0" />
                              <span className="line-clamp-1">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t border-[#101B35]/10 flex flex-wrap items-center gap-4">
                      <Button
                        href={`/rooms/${room.slug}`}
                        variant="secondary"
                        size="md"
                        icon={<Eye className="w-4 h-4" />}
                      >
                        View Full Details & Photos
                      </Button>
                      <Button
                        href={`/reservation?room=${room.slug}`}
                        variant="primary"
                        size="md"
                        icon={<Calendar className="w-4 h-4" />}
                      >
                        Reserve This Room
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Room Amenities Comparison Table */}
      <section className="py-20 bg-white border-y border-[#EDE6D8]">
        <Container>
          <SectionHeading
            badge="Compare Options"
            title="Room Specifications & Amenities"
            subtitle="Clear, transparent breakdown of what is included in each room category."
          />

          <div className="overflow-x-auto shadow-md rounded-xl border border-[#D99A35]/30">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-[#101B35] text-white">
                  <th className="p-4 sm:p-5 font-bold uppercase tracking-wider text-xs">
                    Features & Amenities
                  </th>
                  {rooms.map((room) => (
                    <th
                      key={room.id}
                      className="p-4 sm:p-5 font-bold font-serif text-sm text-[#F3B95F] text-center"
                    >
                      {room.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDE6D8] bg-[#F8F5EF]/50">
                <tr>
                  <td className="p-4 font-semibold text-[#101B35]">Starting Rate</td>
                  {rooms.map((room) => (
                    <td key={room.id} className="p-4 text-center font-bold text-[#101B35]">
                      ${room.pricePerNight} <span className="text-xs font-normal text-gray-500">/ night</span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#101B35]">Max Capacity</td>
                  <td className="p-4 text-center text-[#101B35]">2 Adults</td>
                  <td className="p-4 text-center text-[#101B35]">3 Adults</td>
                  <td className="p-4 text-center text-[#101B35]">1 Adult</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#101B35]">Room Size</td>
                  <td className="p-4 text-center text-[#101B35]">28 m² (301 ft²)</td>
                  <td className="p-4 text-center text-[#101B35]">36 m² (388 ft²)</td>
                  <td className="p-4 text-center text-[#101B35]">22 m² (237 ft²)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#101B35]">Bedding Arrangement</td>
                  <td className="p-4 text-center text-[#101B35]">1 King or 2 Twins</td>
                  <td className="p-4 text-center text-[#101B35]">3 Singles or 1 Dbl + 1 Single</td>
                  <td className="p-4 text-center text-[#101B35]">1 Super Single Bed</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#101B35]">Private Outdoor Sun Terrace</td>
                  <td className="p-4 text-center text-gray-400">—</td>
                  <td className="p-4 text-center text-gray-400">—</td>
                  <td className="p-4 text-center text-emerald-600 font-bold">
                    <CheckCircle2 className="w-5 h-5 mx-auto text-emerald-600" />
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#101B35]">Private En-Suite Bathroom</td>
                  {rooms.map((room) => (
                    <td key={room.id} className="p-4 text-center text-emerald-600">
                      <CheckCircle2 className="w-5 h-5 mx-auto text-emerald-600" />
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#101B35]">Air Conditioning & Heating</td>
                  {rooms.map((room) => (
                    <td key={room.id} className="p-4 text-center text-emerald-600">
                      <CheckCircle2 className="w-5 h-5 mx-auto text-emerald-600" />
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#101B35]">Daily Egyptian Rooftop Breakfast</td>
                  {rooms.map((room) => (
                    <td key={room.id} className="p-4 text-center text-emerald-600">
                      <CheckCircle2 className="w-5 h-5 mx-auto text-emerald-600" />
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#101B35]">High-Speed Wi-Fi</td>
                  {rooms.map((room) => (
                    <td key={room.id} className="p-4 text-center text-emerald-600">
                      <CheckCircle2 className="w-5 h-5 mx-auto text-emerald-600" />
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#101B35]">Electric Kettle & Tea/Coffee</td>
                  {rooms.map((room) => (
                    <td key={room.id} className="p-4 text-center text-emerald-600">
                      <CheckCircle2 className="w-5 h-5 mx-auto text-emerald-600" />
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}

