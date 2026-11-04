"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, MessageCircle, Calendar, MapPin, Star } from "lucide-react";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import { hotelInfo } from "@/data/hotel";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Rooms & Suites", href: "/rooms" },
  { name: "Facilities", href: "/facilities" },
  { name: "Gallery", href: "/gallery" },
  { name: "Location", href: "/location" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";

  return (
    <>
      {/* Top Notification & Quick Contact Bar */}
      <div className="bg-[#101B35] text-white text-xs border-b border-[#D99A35]/20 py-2 hidden md:block">
        <Container>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6 text-[#EDE6D8]/80">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#D99A35]" />
                West Bank, Luxor, Egypt
              </span>
              <a
                href={`tel:${hotelInfo.phone}`}
                className="flex items-center gap-1.5 hover:text-[#D99A35] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#D99A35]" />
                {hotelInfo.phone}
              </a>
              <a
                href={`https://wa.me/${hotelInfo.whatsapp.replace(/\+/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp Direct
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <span className="flex items-center gap-1 bg-[#D99A35]/20 text-[#D99A35] px-2.5 py-0.5 rounded-full text-[11px] font-medium border border-[#D99A35]/30">
                <Star className="w-3 h-3 fill-[#D99A35]" />
                Booking.com 9.2 Superb Rating
              </span>
              <span className="text-[#EDE6D8]/60 text-[11px]">
                Best Rate Guaranteed with Direct Booking
              </span>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Navigation Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#101B35]/95 backdrop-blur-md shadow-lg py-3 text-white border-b border-[#D99A35]/20"
            : isHome
            ? "bg-[#101B35]/85 backdrop-blur-sm py-4 text-white border-b border-white/10"
            : "bg-[#101B35] py-4 text-white shadow-md border-b border-[#D99A35]/20"
        }`}
      >
        <Container>
          <div className="flex items-center justify-between">
            {/* Brand Logo & Title */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#D99A35] shadow-md group-hover:scale-105 transition-transform bg-[#101B35]">
                <Image
                  src="/images/brand/grand-cleopatra-seal.jpg"
                  alt="Grand Cleopatra Hotel Logo"
                  fill
                  className="object-cover"
                  sizes="44px"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg sm:text-xl tracking-wider text-white group-hover:text-[#F3B95F] transition-colors leading-tight font-serif">
                  GRAND CLEOPATRA
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#D99A35] font-semibold">
                  Hotel • Luxor, Egypt
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-2 text-sm font-medium tracking-wide transition-all rounded-md relative ${
                      isActive
                        ? "text-[#F3B95F] font-semibold"
                        : "text-white/85 hover:text-[#F3B95F] hover:bg-white/5"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#D99A35] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action: Reservation Button & Mobile Toggle */}
            <div className="flex items-center gap-3">
              <Button
                href="/reservation"
                variant="primary"
                size="sm"
                className="hidden sm:inline-flex"
                icon={<Calendar className="w-4 h-4" />}
                iconPosition="left"
              >
                Reservation Inquiry
              </Button>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-md text-white hover:text-[#D99A35] hover:bg-white/5 transition-colors focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#101B35] text-white p-6 shadow-2xl flex flex-col justify-between border-l border-[#D99A35]/30 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#D99A35]/20">
                <div className="flex items-center gap-2">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#D99A35]">
                    <Image
                      src="/images/brand/grand-cleopatra-seal.jpg"
                      alt="Grand Cleopatra"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="font-bold text-sm tracking-wide text-white">
                    GRAND CLEOPATRA
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 text-white/70 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="mt-6 flex flex-col space-y-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`px-4 py-3 rounded-md text-sm font-medium tracking-wide transition-colors ${
                        isActive
                          ? "bg-[#D99A35] text-[#101B35] font-bold"
                          : "text-white/80 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-[#D99A35]/20 space-y-3">
              <Button
                href="/reservation"
                variant="primary"
                fullWidth
                size="md"
                icon={<Calendar className="w-4 h-4" />}
                iconPosition="left"
              >
                Book a Room
              </Button>

              <a
                href={`https://wa.me/${hotelInfo.whatsapp.replace(/\+/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-md bg-emerald-700 hover:bg-emerald-600 text-white font-medium text-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>

              <div className="text-center text-xs text-[#EDE6D8]/60 pt-2">
                <p>Gezira El Bairat, West Bank, Luxor</p>
                <p className="mt-1 text-[#D99A35] font-semibold">Since 1975</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

