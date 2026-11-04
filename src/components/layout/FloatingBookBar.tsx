"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, MessageCircle } from "lucide-react";
import { hotelInfo } from "@/data/hotel";

export default function FloatingBookBar() {
  const pathname = usePathname();

  // Don't show on reservation page itself
  if (pathname === "/reservation") return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-[#101B35]/95 backdrop-blur-md border-t border-[#D99A35]/30 p-3 sm:hidden shadow-2xl">
      <div className="grid grid-cols-2 gap-2">
        <a
          href={`https://wa.me/${hotelInfo.whatsapp.replace(/\+/g, "")}?text=Hello%20Grand%20Cleopatra%20Hotel,%20I%20would%20like%20to%20inquire%20about%20a%20reservation.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-md bg-emerald-700 text-white text-xs font-semibold shadow hover:bg-emerald-600 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp</span>
        </a>

        <Link
          href="/reservation"
          className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-md bg-gradient-to-r from-[#D99A35] to-[#B67C21] text-white text-xs font-bold uppercase tracking-wider shadow hover:from-[#E6AD4B] hover:to-[#C68A2F] transition-all"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Room</span>
        </Link>
      </div>
    </div>
  );
}

