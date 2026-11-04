"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Users,
  Maximize,
  BedDouble,
  Check,
  CheckCircle2,
  Calendar,
  Clock,
  ShieldCheck,
  Coffee,
  MessageCircle,
  ArrowRight,
  Wifi,
  AirVent,
  Tv,
  Bath,
  Bell,
  Sun,
  Laptop,
  Wind,
  Armchair,
  Folder,
} from "lucide-react";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import { Room } from "@/data/rooms";
import { hotelInfo } from "@/data/hotel";

interface RoomDetailInteractiveProps {
  room: Room;
  otherRooms: Room[];
}

const iconMap: Record<string, React.ReactNode> = {
  Wifi: <Wifi className="w-5 h-5" />,
  AirVent: <AirVent className="w-5 h-5" />,
  Bath: <Bath className="w-5 h-5" />,
  Tv: <Tv className="w-5 h-5" />,
  Coffee: <Coffee className="w-5 h-5" />,
  Sparkles: <CheckCircle2 className="w-5 h-5" />,
  Bell: <Bell className="w-5 h-5" />,
  Sun: <Sun className="w-5 h-5" />,
  Laptop: <Laptop className="w-5 h-5" />,
  Wind: <Wind className="w-5 h-5" />,
  Armchair: <Armchair className="w-5 h-5" />,
  Folder: <Folder className="w-5 h-5" />,
};

export default function RoomDetailInteractive({
  room,
  otherRooms,
}: RoomDetailInteractiveProps) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(room.images[0] || room.heroImage);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guestCount, setGuestCount] = useState(String(Math.min(2, room.maxGuests)));

  // Calculate nights and estimated total
  let nights = 0;
  if (checkIn && checkOut) {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = end.getTime() - start.getTime();
    if (diff > 0) {
      nights = Math.ceil(diff / (1000 * 3600 * 24));
    }
  }

  const estimatedTotal = nights > 0 ? nights * room.pricePerNight : room.pricePerNight;

  const handleProceedToBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("room", room.slug);
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    if (guestCount) params.set("guests", guestCount);
    router.push(`/reservation?${params.toString()}`);
  };

  return (
    <div className="py-16 bg-[#F8F5EF]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Photos, Narrative, Amenities, Policies (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Interactive Image Showcase */}
            <div className="bg-white p-4 rounded-2xl border border-[#D99A35]/30 shadow-md space-y-4">
              <div className="relative h-[340px] sm:h-[480px] w-full rounded-xl overflow-hidden border border-[#D99A35]/20">
                <Image
                  src={selectedImage}
                  alt={room.name}
                  fill
                  priority
                  className="object-cover transition-all duration-500"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-3">
                {room.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`relative h-20 sm:h-24 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      selectedImage === img
                        ? "border-[#D99A35] shadow-md ring-2 ring-[#D99A35]/50 scale-102"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${room.name} photo ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="20vw"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Room Overview & Key Specs */}
            <div className="bg-white p-8 rounded-2xl border border-[#D99A35]/30 shadow-md space-y-6">
              <h2 className="text-2xl font-bold font-serif text-[#101B35]">
                Room Overview
              </h2>

              <p className="text-sm sm:text-base text-[#101B35]/80 leading-relaxed">
                {room.longDescription}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-[#101B35]/10 text-xs">
                <div className="p-3 bg-[#F8F5EF] rounded-lg">
                  <span className="text-[#101B35]/60 block mb-1">Max Occupancy</span>
                  <span className="text-sm font-bold text-[#101B35] flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#D99A35]" />
                    {room.maxGuests} Guests
                  </span>
                </div>

                <div className="p-3 bg-[#F8F5EF] rounded-lg">
                  <span className="text-[#101B35]/60 block mb-1">Room Area</span>
                  <span className="text-sm font-bold text-[#101B35] flex items-center gap-1.5">
                    <Maximize className="w-4 h-4 text-[#D99A35]" />
                    {room.sizeSqm} m² / {room.sizeSqft} ft²
                  </span>
                </div>

                <div className="p-3 bg-[#F8F5EF] rounded-lg">
                  <span className="text-[#101B35]/60 block mb-1">Bed Configuration</span>
                  <span className="text-sm font-bold text-[#101B35] flex items-center gap-1.5 truncate">
                    <BedDouble className="w-4 h-4 text-[#D99A35] shrink-0" />
                    <span className="truncate">{room.bedType}</span>
                  </span>
                </div>

                <div className="p-3 bg-[#F8F5EF] rounded-lg">
                  <span className="text-[#101B35]/60 block mb-1">Balcony & View</span>
                  <span className="text-sm font-bold text-[#101B35] truncate block">
                    {room.view}
                  </span>
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#101B35]">
                  Why Guests Love This Room
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#101B35]/80">
                  {room.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#D99A35] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Full Amenities Grid */}
            <div className="bg-white p-8 rounded-2xl border border-[#D99A35]/30 shadow-md space-y-6">
              <h2 className="text-2xl font-bold font-serif text-[#101B35]">
                Room Features & Amenities
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {room.amenities.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#F8F5EF] border border-[#D99A35]/20 flex flex-col items-center text-center justify-center space-y-2"
                  >
                    <div className="text-[#D99A35]">
                      {iconMap[item.icon] || <CheckCircle2 className="w-5 h-5" />}
                    </div>
                    <span className="text-xs font-semibold text-[#101B35]">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Additional Inclusions List */}
              <div className="pt-4 border-t border-[#101B35]/10">
                <h4 className="text-xs font-bold text-[#101B35] uppercase tracking-wider mb-3">
                  All In-Room Inclusions
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#101B35]/80">
                  {room.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#D99A35] shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Hotel Stay Policies */}
            <div className="bg-white p-8 rounded-2xl border border-[#D99A35]/30 shadow-md space-y-4">
              <h2 className="text-xl font-bold font-serif text-[#101B35]">
                Hotel Policies & Inclusions
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#101B35]/80">
                <div className="p-3 bg-[#F8F5EF] rounded-lg space-y-1">
                  <span className="font-bold text-[#101B35] block">Check-in / Check-out</span>
                  <p>Check-in from 14:00 (2 PM) • Check-out by 12:00 (noon). Flexible upon availability.</p>
                </div>
                <div className="p-3 bg-[#F8F5EF] rounded-lg space-y-1">
                  <span className="font-bold text-[#101B35] block">Rooftop Breakfast</span>
                  <p>Included with all direct stays. Served 06:30 AM – 10:30 AM (Takeaway boxes for sunrise tours).</p>
                </div>
                <div className="p-3 bg-[#F8F5EF] rounded-lg space-y-1">
                  <span className="font-bold text-[#101B35] block">Free Cancellation</span>
                  <p>Cancel up to 48 hours prior to arrival with no penalty.</p>
                </div>
                <div className="p-3 bg-[#F8F5EF] rounded-lg space-y-1">
                  <span className="font-bold text-[#101B35] block">Payment Methods</span>
                  <p>Pay upon arrival in cash (USD, EUR, EGP) or major credit cards.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking Card (4 cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-[#101B35] text-white p-6 sm:p-8 rounded-2xl border-2 border-[#D99A35] shadow-2xl space-y-6">
              {/* Header */}
              <div className="border-b border-[#D99A35]/30 pb-4">
                <span className="text-xs text-[#F3B95F] font-semibold uppercase tracking-wider block">
                  Reserve Directly with Us
                </span>
                <div className="flex items-baseline justify-between mt-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-white font-serif">
                      ${room.pricePerNight}
                    </span>
                    <span className="text-xs text-[#EDE6D8]/70">/ night</span>
                  </div>
                  <span className="text-xs bg-[#D99A35]/20 text-[#F3B95F] px-2.5 py-1 rounded font-semibold border border-[#D99A35]/30">
                    Best Rate
                  </span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleProceedToBooking} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#D99A35] uppercase tracking-wider mb-1">
                    Check-In Date
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-[#0A1122] text-white border border-white/20 rounded-md p-2.5 text-xs focus:outline-none focus:border-[#D99A35]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#D99A35] uppercase tracking-wider mb-1">
                    Check-Out Date
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-[#0A1122] text-white border border-white/20 rounded-md p-2.5 text-xs focus:outline-none focus:border-[#D99A35]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#D99A35] uppercase tracking-wider mb-1">
                    Number of Guests
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full bg-[#0A1122] text-white border border-white/20 rounded-md p-2.5 text-xs focus:outline-none focus:border-[#D99A35]"
                  >
                    {[...Array(room.maxGuests)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i === 0 ? "Adult" : "Adults"}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Estimate Summary */}
                {nights > 0 && (
                  <div className="p-3 rounded-lg bg-[#0A1122] border border-[#D99A35]/30 space-y-1.5 text-xs">
                    <div className="flex justify-between text-[#EDE6D8]/80">
                      <span>${room.pricePerNight} × {nights} nights</span>
                      <span>${estimatedTotal}</span>
                    </div>
                    <div className="flex justify-between text-emerald-400 font-semibold">
                      <span>Rooftop Breakfast</span>
                      <span>FREE</span>
                    </div>
                    <div className="pt-2 border-t border-white/10 flex justify-between font-bold text-white text-sm">
                      <span>Estimated Total</span>
                      <span className="text-[#F3B95F]">${estimatedTotal} USD</span>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Proceed to Inquiry
                </Button>
              </form>

              {/* Direct WhatsApp Contact */}
              <div className="pt-2 border-t border-white/10 space-y-2">
                <a
                  href={`https://wa.me/${hotelInfo.whatsapp.replace(/\+/g, "")}?text=Hello%20Grand%20Cleopatra%20Hotel,%20I%20am%20inquiring%20about%20the%20${encodeURIComponent(room.name)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-md bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs tracking-wide transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Instant WhatsApp Inquiry</span>
                </a>

                <div className="text-center text-[11px] text-[#EDE6D8]/70 pt-2 space-y-1">
                  <p>✓ No instant payment charged</p>
                  <p>✓ Fast personal confirmation within minutes</p>
                  <p>✓ Free luggage storage & ferry advice</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Rooms Section */}
        {otherRooms.length > 0 && (
          <div className="mt-20 pt-16 border-t border-[#101B35]/15">
            <h3 className="text-2xl font-bold font-serif text-[#101B35] mb-8 text-center">
              Explore Our Other Accommodations
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {otherRooms.map((other) => (
                <div
                  key={other.id}
                  className="bg-white rounded-xl overflow-hidden border border-[#D99A35]/30 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={other.heroImage}
                      alt={other.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute bottom-3 right-3 bg-[#101B35]/90 text-white px-3 py-1 rounded text-xs font-bold">
                      from ${other.pricePerNight} / night
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h4 className="text-lg font-bold font-serif text-[#101B35]">
                      {other.name}
                    </h4>
                    <p className="text-xs text-[#101B35]/70 line-clamp-2">
                      {other.description}
                    </p>
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-xs text-[#D99A35] font-semibold">
                        {other.maxGuests} Guests • {other.sizeSqm} m²
                      </span>
                      <Button href={`/rooms/${other.slug}`} variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
