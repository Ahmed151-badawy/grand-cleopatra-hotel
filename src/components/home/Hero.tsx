"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Calendar, Users, BedDouble, ArrowRight, Star, ShieldCheck } from "lucide-react";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import { rooms } from "@/data/rooms";

export default function Hero() {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [roomType, setRoomType] = useState("all");
  const [guests, setGuests] = useState("2");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (checkIn) query.set("checkIn", checkIn);
    if (checkOut) query.set("checkOut", checkOut);
    if (roomType !== "all") query.set("room", roomType);
    if (guests) query.set("guests", guests);

    router.push(`/reservation?${query.toString()}`);
  };

  return (
    <div className="relative min-h-[92vh] flex flex-col justify-between pt-16 pb-12 overflow-hidden bg-[#101B35]">
      {/* Background Photography with Luxury Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=2000&q=85"
          alt="Sunset over Nile and Luxor West Bank"
          fill
          priority
          className="object-cover object-center opacity-40 scale-105 animate-pulse duration-[8000ms]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101B35] via-[#101B35]/60 to-[#101B35]/70" />
      </div>

      {/* Floating Egyptian decorative motifs (CSS) */}
      <div className="absolute top-1/4 right-8 w-96 h-96 bg-[#D99A35]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-8 w-80 h-80 bg-[#1677B8]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 my-auto">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            {/* Rating & Heritage Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#D99A35]/40 text-[#F3B95F] text-xs font-semibold tracking-wider uppercase">
              <Star className="w-3.5 h-3.5 fill-[#D99A35] text-[#D99A35]" />
              <span>West Bank, Luxor • Since 1975 • Booking.com 9.2 Superb</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15] font-serif">
              Timeless Egyptian Hospitality on the{" "}
              <span className="gold-gradient-text block mt-1">West Bank of Luxor</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-[#EDE6D8]/85 font-normal max-w-2xl mx-auto leading-relaxed">
              Wake to hot air balloons floating over the Valley of the Kings. Relax on our
              panoramic rooftop above the River Nile and experience genuine Egyptian warmth.
            </p>

            {/* Fast Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Button
                href="/rooms"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Explore Rooms & Suites
              </Button>
              <Button
                href="/about"
                variant="white"
                size="lg"
              >
                Discover Our Story
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* Embedded Availability Search Bar */}
      <div className="relative z-10 mt-10">
        <Container>
          <div className="bg-[#0A1122]/90 backdrop-blur-md border border-[#D99A35]/40 p-4 sm:p-6 rounded-xl shadow-2xl max-w-5xl mx-auto">
            <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Check In */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#D99A35] mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Check-In
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-[#101B35] text-white border border-white/20 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#D99A35] transition-colors"
                />
              </div>

              {/* Check Out */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#D99A35] mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Check-Out
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-[#101B35] text-white border border-white/20 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#D99A35] transition-colors"
                />
              </div>

              {/* Room Choice */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#D99A35] mb-1.5 flex items-center gap-1.5">
                  <BedDouble className="w-3.5 h-3.5" /> Room Category
                </label>
                <select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="w-full bg-[#101B35] text-white border border-white/20 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#D99A35] transition-colors"
                >
                  <option value="all">All Room Types</option>
                  {rooms.map((room) => (
                    <option key={room.id} value={room.slug}>
                      {room.name} (${room.pricePerNight})
                    </option>
                  ))}
                </select>
              </div>

              {/* Guests */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#D99A35] mb-1.5 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" /> Guests
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full bg-[#101B35] text-white border border-white/20 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#D99A35] transition-colors"
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4+ Guests (Group)</option>
                </select>
              </div>

              {/* Search Button */}
              <div className="flex items-end sm:col-span-2 lg:col-span-1">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#D99A35] to-[#B67C21] hover:from-[#E6AD4B] hover:to-[#C68A2F] text-white font-bold py-2.5 px-4 rounded-md text-sm uppercase tracking-wider transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer h-[42px]"
                >
                  <span>Check Rates</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Direct Booking Guarantee Ticker */}
            <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-[#EDE6D8]/70 gap-2">
              <span className="flex items-center gap-1 text-[#F3B95F]">
                <ShieldCheck className="w-3.5 h-3.5" /> Guaranteed Best Price on Direct Bookings
              </span>
              <span>✓ Complimentary Rooftop Egyptian Breakfast</span>
              <span>✓ Free Cancellation Flexibility</span>
              <span>✓ 2-Minute Stroll to Local Nile Ferry</span>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
