"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  Calendar,
  Users,
  BedDouble,
  Check,
  CheckCircle2,
  Car,
  Flame,
  Compass,
  Ship,
  Utensils,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  DollarSign,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import Button from "@/components/common/Button";
import { rooms, Room } from "@/data/rooms";
import { hotelInfo } from "@/data/hotel";

interface Addon {
  id: string;
  name: string;
  desc: string;
  price: number;
  perPerson?: boolean;
  perNight?: boolean;
  icon: React.ReactNode;
}

const availableAddons: Addon[] = [
  {
    id: "airport-transfer",
    name: "Private Airport Transfer (LXR)",
    desc: "Personal chauffeur with name placard at arrivals, private air-conditioned vehicle to hotel.",
    price: 20,
    icon: <Car className="w-5 h-5" />,
  },
  {
    id: "hot-air-balloon",
    name: "Sunrise Hot Air Balloon Flight",
    desc: "45-60 min sunrise flight over Valley of the Kings & Theban hills, certificate & hotel pickup.",
    price: 45,
    perPerson: true,
    icon: <Flame className="w-5 h-5 text-amber-500" />,
  },
  {
    id: "temple-tour",
    name: "Valley of the Kings Guided Tour",
    desc: "Private air-conditioned car & licensed Egyptologist guide for West Bank highlights.",
    price: 35,
    perPerson: true,
    icon: <Compass className="w-5 h-5 text-[#1677B8]" />,
  },
  {
    id: "felucca-sunset",
    name: "Nile Sunset Felucca Sail",
    desc: "Traditional wooden sailboat cruise at golden hour with hot Egyptian mint tea and fruits.",
    price: 15,
    perPerson: true,
    icon: <Ship className="w-5 h-5 text-[#1677B8]" />,
  },
  {
    id: "half-board",
    name: "Rooftop Egyptian Dinner Package",
    desc: "Authentic multi-course Egyptian dinner every evening on the panoramic rooftop terrace.",
    price: 14,
    perPerson: true,
    perNight: true,
    icon: <Utensils className="w-5 h-5 text-emerald-600" />,
  },
];

export default function ReservationWizard() {
  const searchParams = useSearchParams();

  // Wizard Step: 1 = Dates/Room, 2 = Add-ons, 3 = Guest Details, 4 = Confirmation
  const [step, setStep] = useState(1);

  // Form State
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [selectedRoomSlug, setSelectedRoomSlug] = useState(rooms[0].slug);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  // Guest Details
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [flightNumber, setFlightNumber] = useState("");

  // Confirmation reference
  const [bookingRef, setBookingRef] = useState("");

  // Populate from query params
  useEffect(() => {
    const roomParam = searchParams.get("room");
    if (roomParam && rooms.some((r) => r.slug === roomParam)) {
      setSelectedRoomSlug(roomParam);
    }
    const checkInParam = searchParams.get("checkIn");
    if (checkInParam) setCheckIn(checkInParam);
    const checkOutParam = searchParams.get("checkOut");
    if (checkOutParam) setCheckOut(checkOutParam);
    const guestsParam = searchParams.get("guests");
    if (guestsParam) {
      const g = parseInt(guestsParam, 10);
      if (!isNaN(g) && g > 0) setAdults(g);
    }
  }, [searchParams]);

  const selectedRoom = rooms.find((r) => r.slug === selectedRoomSlug) || rooms[0];

  // Calculate nights
  let nights = 1;
  if (checkIn && checkOut) {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = end.getTime() - start.getTime();
    if (diff > 0) {
      nights = Math.max(1, Math.ceil(diff / (1000 * 3600 * 24)));
    }
  }

  // Calculate pricing
  const roomCost = selectedRoom.pricePerNight * nights;

  let addonsCost = 0;
  selectedAddons.forEach((addonId) => {
    const addon = availableAddons.find((a) => a.id === addonId);
    if (!addon) return;
    let cost = addon.price;
    if (addon.perPerson) cost *= adults;
    if (addon.perNight) cost *= nights;
    addonsCost += cost;
  });

  const totalEstimatedUSD = roomCost + addonsCost;
  const approxEGP = Math.round(totalEstimatedUSD * 48.5); // approximate conversion

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      alert("Please enter your name, email, and phone/WhatsApp number.");
      return;
    }

    const ref = `GC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(ref);
    setStep(4);
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Progress Stepper Bar */}
      <div className="mb-10 bg-white p-4 sm:p-6 rounded-2xl border border-[#D99A35]/30 shadow-md">
        <div className="grid grid-cols-4 gap-2 text-center text-xs font-semibold">
          <div
            className={`flex flex-col items-center gap-1.5 ${
              step >= 1 ? "text-[#D99A35]" : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                step >= 1
                  ? "bg-[#D99A35] text-[#101B35]"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              1
            </div>
            <span className="hidden sm:inline">Dates & Room</span>
          </div>

          <div
            className={`flex flex-col items-center gap-1.5 ${
              step >= 2 ? "text-[#D99A35]" : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                step >= 2
                  ? "bg-[#D99A35] text-[#101B35]"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              2
            </div>
            <span className="hidden sm:inline">Add-ons & Tours</span>
          </div>

          <div
            className={`flex flex-col items-center gap-1.5 ${
              step >= 3 ? "text-[#D99A35]" : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                step >= 3
                  ? "bg-[#D99A35] text-[#101B35]"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              3
            </div>
            <span className="hidden sm:inline">Guest Details</span>
          </div>

          <div
            className={`flex flex-col items-center gap-1.5 ${
              step >= 4 ? "text-[#D99A35]" : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                step >= 4
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              ✓
            </div>
            <span className="hidden sm:inline">Confirmation</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Interactive Wizard Form (8 cols) */}
        <div className="lg:col-span-8">
          {/* STEP 1: Dates & Room */}
          {step === 1 && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#D99A35]/30 shadow-xl space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#101B35]">
                  Step 1: Choose Dates & Room Category
                </h3>
                <p className="text-xs sm:text-sm text-[#101B35]/70 mt-1">
                  All direct reservations include our complimentary rooftop Egyptian breakfast.
                </p>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#101B35] uppercase tracking-wider mb-1.5">
                    Check-In Date *
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-[#F8F5EF] text-[#101B35] border border-[#101B35]/20 rounded-md p-3 text-sm focus:outline-none focus:border-[#D99A35]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#101B35] uppercase tracking-wider mb-1.5">
                    Check-Out Date *
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-[#F8F5EF] text-[#101B35] border border-[#101B35]/20 rounded-md p-3 text-sm focus:outline-none focus:border-[#D99A35]"
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#101B35] uppercase tracking-wider mb-1.5">
                    Adults
                  </label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full bg-[#F8F5EF] text-[#101B35] border border-[#101B35]/20 rounded-md p-3 text-sm focus:outline-none focus:border-[#D99A35]"
                  >
                    <option value={1}>1 Adult</option>
                    <option value={2}>2 Adults</option>
                    <option value={3}>3 Adults</option>
                    <option value={4}>4+ Adults (Group)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#101B35] uppercase tracking-wider mb-1.5">
                    Children (Under 12)
                  </label>
                  <select
                    value={children}
                    onChange={(e) => setChildren(Number(e.target.value))}
                    className="w-full bg-[#F8F5EF] text-[#101B35] border border-[#101B35]/20 rounded-md p-3 text-sm focus:outline-none focus:border-[#D99A35]"
                  >
                    <option value={0}>0 Children</option>
                    <option value={1}>1 Child</option>
                    <option value={2}>2 Children</option>
                  </select>
                </div>
              </div>

              {/* Room Cards Selector */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-semibold text-[#101B35] uppercase tracking-wider">
                  Select Room Category *
                </label>

                <div className="space-y-3">
                  {rooms.map((room) => {
                    const isSelected = selectedRoomSlug === room.slug;
                    return (
                      <div
                        key={room.id}
                        onClick={() => setSelectedRoomSlug(room.slug)}
                        className={`p-4 sm:p-5 rounded-xl border-2 transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                          isSelected
                            ? "border-[#D99A35] bg-[#D99A35]/10 shadow-md ring-1 ring-[#D99A35]"
                            : "border-gray-200 bg-white hover:border-[#D99A35]/50"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-black/10">
                            <Image
                              src={room.heroImage}
                              alt={room.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-base text-[#101B35] font-serif">
                                {room.name}
                              </h4>
                              {room.badge && (
                                <span className="text-[10px] bg-[#D99A35] text-[#101B35] font-bold px-2 py-0.5 rounded-full uppercase">
                                  {room.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-[#101B35]/70 mt-0.5">
                              {room.maxGuests} Guests • {room.sizeSqm} m² • {room.view}
                            </p>
                            <span className="text-[11px] text-emerald-600 font-semibold block mt-1">
                              ✓ Free Rooftop Breakfast Included
                            </span>
                          </div>
                        </div>

                        <div className="sm:text-right shrink-0">
                          <span className="text-xl font-black text-[#101B35]">
                            ${room.pricePerNight}
                          </span>
                          <span className="text-xs text-gray-500 block">/ night</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Continue Button */}
              <div className="pt-4 flex justify-end">
                <Button
                  onClick={() => setStep(2)}
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Continue to Add-ons & Tours
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: Add-ons & Experiences */}
          {step === 2 && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#D99A35]/30 shadow-xl space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#101B35]">
                  Step 2: Enhance Your Egyptian Experience
                </h3>
                <p className="text-xs sm:text-sm text-[#101B35]/70 mt-1">
                  Optional services and excursions arranged directly by our concierge.
                </p>
              </div>

              <div className="space-y-3">
                {availableAddons.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start justify-between gap-4 ${
                        isChecked
                          ? "border-[#D99A35] bg-[#D99A35]/10 shadow-sm"
                          : "border-gray-200 bg-white hover:border-[#D99A35]/40"
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="p-2.5 rounded-lg bg-[#F8F5EF] border border-[#D99A35]/20 mt-0.5">
                          {addon.icon}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-[#101B35] font-serif">
                            {addon.name}
                          </h4>
                          <p className="text-xs text-[#101B35]/70 mt-0.5 max-w-md leading-relaxed">
                            {addon.desc}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-base font-bold text-[#101B35]">
                          +${addon.price}
                        </span>
                        <span className="text-[11px] text-gray-500 block">
                          {addon.perPerson ? "per person" : "per car"}
                        </span>
                        <div
                          className={`mt-2 w-5 h-5 rounded-md flex items-center justify-center border ml-auto ${
                            isChecked
                              ? "bg-[#D99A35] border-[#D99A35] text-[#101B35]"
                              : "border-gray-300 bg-white"
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="pt-4 flex items-center justify-between">
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  icon={<ArrowLeft className="w-4 h-4" />}
                  iconPosition="left"
                >
                  Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  variant="primary"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Continue to Guest Details
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: Guest Details */}
          {step === 3 && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#D99A35]/30 shadow-xl space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#101B35]">
                  Step 3: Guest Details & Preferences
                </h3>
                <p className="text-xs sm:text-sm text-[#101B35]/70 mt-1">
                  We use this information to hold your room and confirm your reservation.
                </p>
              </div>

              <form onSubmit={handleCompleteBooking} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#101B35] mb-1">
                    Primary Guest Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Arthur Pendelton"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#F8F5EF] text-[#101B35] border border-[#101B35]/20 rounded-md p-3 text-sm focus:outline-none focus:border-[#D99A35]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#101B35] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. arthur@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#F8F5EF] text-[#101B35] border border-[#101B35]/20 rounded-md p-3 text-sm focus:outline-none focus:border-[#D99A35]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#101B35] mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +44 7123 456789"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#F8F5EF] text-[#101B35] border border-[#101B35]/20 rounded-md p-3 text-sm focus:outline-none focus:border-[#D99A35]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#101B35] mb-1">
                      Country of Residence
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. United Kingdom"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full bg-[#F8F5EF] text-[#101B35] border border-[#101B35]/20 rounded-md p-3 text-sm focus:outline-none focus:border-[#D99A35]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#101B35] mb-1">
                      Flight / Train Number (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. MS 342 arriving 14:30"
                      value={flightNumber}
                      onChange={(e) => setFlightNumber(e.target.value)}
                      className="w-full bg-[#F8F5EF] text-[#101B35] border border-[#101B35]/20 rounded-md p-3 text-sm focus:outline-none focus:border-[#D99A35]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#101B35] mb-1">
                    Special Requests / Dietary Needs / Bed Preferences
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. 1 King bed preferred, vegetarian breakfast options, late arrival..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full bg-[#F8F5EF] text-[#101B35] border border-[#101B35]/20 rounded-md p-3 text-sm focus:outline-none focus:border-[#D99A35]"
                  />
                </div>

                {/* Navigation */}
                <div className="pt-4 flex items-center justify-between">
                  <Button
                    type="button"
                    onClick={() => setStep(2)}
                    variant="outline"
                    icon={<ArrowLeft className="w-4 h-4" />}
                    iconPosition="left"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    icon={<CheckCircle2 className="w-5 h-5" />}
                  >
                    Confirm & Send Inquiry
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 4: Confirmation & Instant Dispatch */}
          {step === 4 && (
            <div className="bg-white p-8 sm:p-10 rounded-2xl border-2 border-[#D99A35] shadow-2xl space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="text-center space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#D99A35]">
                  Reservation Request Generated
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#101B35]">
                  Inquiry Reference #{bookingRef}
                </h3>
                <p className="text-sm text-[#101B35]/75 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-bold text-[#101B35]">{fullName}</span>! Your
                  booking request has been registered with Grand Cleopatra Hotel.
                </p>
              </div>

              {/* Booking Summary Box */}
              <div className="p-5 rounded-xl bg-[#F8F5EF] border border-[#D99A35]/30 space-y-2.5 text-xs text-[#101B35]">
                <div className="flex justify-between font-bold text-sm text-[#101B35] border-b border-[#101B35]/10 pb-2">
                  <span>{selectedRoom.name}</span>
                  <span className="text-[#D99A35]">${selectedRoom.pricePerNight} / night</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#101B35]/70">Dates:</span>
                  <span className="font-medium">
                    {checkIn || "Flexible"} to {checkOut || "Flexible"} ({nights} nights)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#101B35]/70">Guests:</span>
                  <span className="font-medium">
                    {adults} {adults === 1 ? "Adult" : "Adults"}
                    {children > 0 ? `, ${children} Children` : ""}
                  </span>
                </div>
                {selectedAddons.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-[#101B35]/70">Add-ons:</span>
                    <span className="font-medium">
                      {selectedAddons.length} services selected (${addonsCost})
                    </span>
                  </div>
                )}
                <div className="pt-2 border-t border-[#101B35]/10 flex justify-between font-black text-sm text-[#101B35]">
                  <span>Estimated Total:</span>
                  <span className="text-[#B67C21]">${totalEstimatedUSD} USD (~{approxEGP} EGP)</span>
                </div>
              </div>

              {/* WhatsApp Fast Dispatch */}
              {(() => {
                const waMessage = encodeURIComponent(
                  `*Grand Cleopatra Hotel Booking Inquiry*\n\n` +
                    `*Ref:* ${bookingRef}\n` +
                    `*Guest:* ${fullName}\n` +
                    `*Room:* ${selectedRoom.name}\n` +
                    `*Check-in:* ${checkIn || "Flexible"}\n` +
                    `*Check-out:* ${checkOut || "Flexible"} (${nights} nights)\n` +
                    `*Guests:* ${adults} Adults\n` +
                    `*Add-ons:* ${
                      selectedAddons.length > 0 ? selectedAddons.join(", ") : "None"
                    }\n` +
                    `*Total Estimate:* $${totalEstimatedUSD} USD\n` +
                    (flightNumber ? `*Flight/Train:* ${flightNumber}\n` : "") +
                    (specialRequests ? `*Notes:* ${specialRequests}\n` : "") +
                    `\nPlease confirm availability and payment on arrival.`
                );

                return (
                  <div className="space-y-3 pt-2">
                    <a
                      href={`https://wa.me/${hotelInfo.whatsapp.replace(/\+/g, "")}?text=${waMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-md bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>Send Direct WhatsApp to Reception Now</span>
                    </a>

                    <p className="text-center text-xs text-gray-500">
                      Sending via WhatsApp gives you instantaneous confirmation from our front desk!
                    </p>
                  </div>
                );
              })()}

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setBookingRef("");
                  }}
                  className="text-xs text-[#D99A35] hover:underline font-semibold"
                >
                  Create another reservation inquiry
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Sticky Summary Sidebar (4 cols) */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 bg-[#101B35] text-white p-6 rounded-2xl border-2 border-[#D99A35]/50 shadow-xl space-y-5">
            <h4 className="text-base font-bold font-serif text-white border-b border-[#D99A35]/30 pb-3 flex items-center justify-between">
              <span>Your Stay Summary</span>
              <span className="text-xs text-[#F3B95F] font-normal">Direct Booking</span>
            </h4>

            {/* Selected Room Preview */}
            <div className="flex items-center gap-3">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-[#D99A35]/40 shrink-0">
                <Image
                  src={selectedRoom.heroImage}
                  alt={selectedRoom.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h5 className="font-bold text-sm text-white font-serif">
                  {selectedRoom.name}
                </h5>
                <span className="text-xs text-[#F3B95F]">
                  ${selectedRoom.pricePerNight} / night
                </span>
                <span className="text-[11px] text-[#EDE6D8]/60 block">
                  {selectedRoom.view}
                </span>
              </div>
            </div>

            {/* Details breakdown */}
            <div className="space-y-2 text-xs text-[#EDE6D8]/80 border-t border-white/10 pt-3">
              <div className="flex justify-between">
                <span>Check-in:</span>
                <span className="font-medium text-white">{checkIn || "Select date"}</span>
              </div>
              <div className="flex justify-between">
                <span>Check-out:</span>
                <span className="font-medium text-white">{checkOut || "Select date"}</span>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <span className="font-medium text-white">{nights} {nights === 1 ? "night" : "nights"}</span>
              </div>
              <div className="flex justify-between">
                <span>Guests:</span>
                <span className="font-medium text-white">{adults} Adults {children > 0 ? `, ${children} Children` : ""}</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-semibold">
                <span>Rooftop Breakfast:</span>
                <span>INCLUDED (FREE)</span>
              </div>
            </div>

            {/* Price Calculations */}
            <div className="border-t border-[#D99A35]/30 pt-3 space-y-1.5 text-xs">
              <div className="flex justify-between text-[#EDE6D8]/70">
                <span>Room Subtotal ({nights} nights):</span>
                <span>${roomCost}</span>
              </div>
              {selectedAddons.length > 0 && (
                <div className="flex justify-between text-[#EDE6D8]/70">
                  <span>Add-on Services:</span>
                  <span>+${addonsCost}</span>
                </div>
              )}
              <div className="pt-2 border-t border-white/10 flex justify-between text-base font-bold text-white">
                <span>Estimated Total:</span>
                <span className="text-[#F3B95F]">${totalEstimatedUSD} USD</span>
              </div>
              <div className="text-[11px] text-[#EDE6D8]/60 text-right">
                Approx. {approxEGP.toLocaleString()} EGP (Pay on arrival)
              </div>
            </div>

            {/* Direct Booking Guarantees */}
            <div className="pt-3 border-t border-white/10 space-y-1 text-[11px] text-[#EDE6D8]/70">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Best Rate Guarantee</span>
              </div>
              <p>• Free cancellation up to 48 hours</p>
              <p>• Pay on arrival: USD, EUR, or EGP</p>
              <p>• 24/7 Front desk assistance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

