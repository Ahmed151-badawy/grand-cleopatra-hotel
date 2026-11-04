import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Star,
  ShieldCheck,
  Coffee,
  Clock,
  ArrowRight,
} from "lucide-react";
import Container from "@/components/common/Container";
import { hotelInfo } from "@/data/hotel";
import { rooms } from "@/data/rooms";

export default function Footer() {
  return (
    <footer className="bg-[#0A1122] text-[#EDE6D8] border-t-2 border-[#D99A35]/30 pt-16 pb-10">
      {/* Direct Booking Benefit Strip */}
      <div className="border-b border-[#D99A35]/20 pb-12 mb-12">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="flex items-center gap-4 bg-[#101B35]/60 p-4 rounded-lg border border-[#D99A35]/20">
              <div className="w-12 h-12 rounded-full bg-[#D99A35]/15 flex items-center justify-center shrink-0 text-[#D99A35]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  Best Rate Guarantee
                </h4>
                <p className="text-xs text-[#EDE6D8]/70 mt-0.5">
                  Direct inquiry gets the most competitive rate.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-[#101B35]/60 p-4 rounded-lg border border-[#D99A35]/20">
              <div className="w-12 h-12 rounded-full bg-[#D99A35]/15 flex items-center justify-center shrink-0 text-[#D99A35]">
                <Coffee className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  Rooftop Breakfast
                </h4>
                <p className="text-xs text-[#EDE6D8]/70 mt-0.5">
                  Fresh traditional Egyptian breakfast daily.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-[#101B35]/60 p-4 rounded-lg border border-[#D99A35]/20">
              <div className="w-12 h-12 rounded-full bg-[#D99A35]/15 flex items-center justify-center shrink-0 text-[#D99A35]">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  24/7 Front Desk
                </h4>
                <p className="text-xs text-[#EDE6D8]/70 mt-0.5">
                  Warm Egyptian hospitality around the clock.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-[#101B35]/60 p-4 rounded-lg border border-[#D99A35]/20">
              <div className="w-12 h-12 rounded-full bg-[#D99A35]/15 flex items-center justify-center shrink-0 text-[#D99A35]">
                <Star className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  9.2 / 10 Superb
                </h4>
                <p className="text-xs text-[#EDE6D8]/70 mt-0.5">
                  Certified guest reviews on Booking.com.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Footer Columns */}
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#D99A35] bg-[#101B35] shrink-0">
                <Image
                  src="/images/brand/grand-cleopatra-seal.jpg"
                  alt="Grand Cleopatra Hotel"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-serif font-extrabold text-xl text-white tracking-wider">
                  GRAND CLEOPATRA
                </h3>
                <p className="text-xs uppercase tracking-[0.2em] text-[#D99A35] font-semibold">
                  Hotel • Luxor, Egypt
                </p>
              </div>
            </div>

            <p className="text-sm text-[#EDE6D8]/75 leading-relaxed max-w-md">
              A serene haven on the West Bank of Luxor, welcoming explorers and dreamers
              since 1975. Nestled between the timeless River Nile and the majestic Theban
              mountains, offering authentic Egyptian warmth and unforgettable rooftop vistas.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <div className="relative w-20 h-10 overflow-hidden rounded bg-black/40 border border-[#D99A35]/30 p-1 flex items-center justify-center">
                <Image
                  src="/images/brand/cleopatra-hotel-vintage.png"
                  alt="Cleopatra Hotel Since 1975"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-xs text-[#EDE6D8]/60">
                <span className="font-semibold text-white block">Heritage Hospitality</span>
                West Bank Sanctuary Since 1975
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest border-b border-[#D99A35]/30 pb-2">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-[#EDE6D8]/80">
              <li>
                <Link href="/" className="hover:text-[#D99A35] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#D99A35]" /> Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#D99A35] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#D99A35]" /> About Our Hotel
                </Link>
              </li>
              <li>
                <Link href="/rooms" className="hover:text-[#D99A35] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#D99A35]" /> Rooms & Suites
                </Link>
              </li>
              <li>
                <Link href="/facilities" className="hover:text-[#D99A35] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#D99A35]" /> Facilities & Dining
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#D99A35] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#D99A35]" /> Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/location" className="hover:text-[#D99A35] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#D99A35]" /> West Bank Location
                </Link>
              </li>
              <li>
                <Link href="/reservation" className="hover:text-[#D99A35] transition-colors flex items-center gap-1.5 text-[#F3B95F] font-semibold">
                  <ArrowRight className="w-3 h-3 text-[#D99A35]" /> Reservation Inquiry
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Rooms */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest border-b border-[#D99A35]/30 pb-2">
              Rooms & Suites
            </h4>
            <ul className="space-y-2 text-sm text-[#EDE6D8]/80">
              {rooms.map((room) => (
                <li key={room.id}>
                  <Link
                    href={`/rooms/${room.slug}`}
                    className="hover:text-[#D99A35] transition-colors block"
                  >
                    <span className="font-medium text-white">{room.name}</span>
                    <span className="block text-xs text-[#D99A35]">From ${room.pricePerNight} / night</span>
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/reservation"
                  className="text-xs bg-[#D99A35]/20 text-[#F3B95F] hover:bg-[#D99A35]/30 px-3 py-1.5 rounded inline-block transition-colors border border-[#D99A35]/40"
                >
                  Check Availability &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest border-b border-[#D99A35]/30 pb-2">
              Contact & Visit
            </h4>
            <div className="space-y-3 text-sm text-[#EDE6D8]/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D99A35] shrink-0 mt-1" />
                <span className="text-xs leading-relaxed">
                  {hotelInfo.address.full}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D99A35] shrink-0" />
                <a
                  href={`tel:${hotelInfo.phone}`}
                  className="text-xs hover:text-[#D99A35] transition-colors"
                >
                  {hotelInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${hotelInfo.whatsapp.replace(/\+/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-400 hover:underline"
                >
                  WhatsApp: +20 100 345 6789
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D99A35] shrink-0" />
                <a
                  href={`mailto:${hotelInfo.email}`}
                  className="text-xs hover:text-[#D99A35] transition-colors"
                >
                  {hotelInfo.email}
                </a>
              </div>
              <div className="pt-2">
                <span className="text-[11px] text-[#EDE6D8]/60 block mb-1">Official Domain</span>
                <span className="text-xs text-[#F3B95F] font-mono">grandcleopatrahotelux.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#EDE6D8]/60 gap-4">
          <p>
            © 2026 Grand Cleopatra Hotel Luxor. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <Link href="/about" className="hover:text-white transition-colors">
              About
            </Link>
            <Link href="/rooms" className="hover:text-white transition-colors">
              Rooms
            </Link>
            <Link href="/location" className="hover:text-white transition-colors">
              Map & Location
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
