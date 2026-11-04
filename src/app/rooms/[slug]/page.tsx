import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  Users,
  Maximize,
  BedDouble,
  MapPin,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Coffee,
  Sparkles,
  ArrowRight,
  Wifi,
  AirVent,
  Tv,
  Bath,
  Bell,
  Sun,
  Laptop,
} from "lucide-react";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import RoomDetailInteractive from "./RoomDetailInteractive";
import { rooms, getRoomBySlug } from "@/data/rooms";
import { hotelInfo } from "@/data/hotel";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return rooms.map((room) => ({
    slug: room.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoomBySlug(slug);

  if (!room) {
    return {
      title: "Room Not Found | Grand Cleopatra Hotel Luxor",
    };
  }

  return {
    title: `${room.name} | Grand Cleopatra Hotel Luxor`,
    description: room.description,
    openGraph: {
      title: `${room.name} - Grand Cleopatra Hotel Luxor`,
      description: room.description,
      images: [room.heroImage],
    },
  };
}

export default async function RoomDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const room = getRoomBySlug(slug);

  if (!room) {
    notFound();
  }

  const otherRooms = rooms.filter((r) => r.slug !== slug);

  return (
    <>
      {/* Breadcrumb & Title Section */}
      <section className="bg-[#101B35] text-white pt-24 pb-12 border-b border-[#D99A35]/20">
        <Container>
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#EDE6D8]/70 mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/rooms" className="hover:text-white transition-colors">
              Rooms & Suites
            </Link>
            <span>/</span>
            <span className="text-[#F3B95F] font-semibold">{room.name}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#D99A35]/20 text-[#F3B95F] border border-[#D99A35]/30 mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{room.floor} • {room.view}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif text-white tracking-tight">
                {room.name}
              </h1>
              <p className="text-base text-[#EDE6D8]/80 mt-2 max-w-2xl">
                {room.tagline}
              </p>
            </div>

            {/* Price badge */}
            <div className="bg-[#0A1122]/90 border border-[#D99A35]/40 rounded-xl p-4 lg:text-right shrink-0">
              <span className="text-xs text-[#EDE6D8]/60 uppercase tracking-wider block">
                Starting from
              </span>
              <div className="flex items-baseline lg:justify-end gap-1.5 mt-0.5">
                <span className="text-3xl font-black text-[#F3B95F]">
                  ${room.pricePerNight}
                </span>
                <span className="text-sm text-[#EDE6D8]/80">/ night</span>
              </div>
              <span className="text-[11px] text-emerald-400 font-semibold block mt-1">
                ✓ Free Rooftop Breakfast Included
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Interactive Main Body with Client Component for Photo Gallery & Quick Booking */}
      <RoomDetailInteractive room={room} otherRooms={otherRooms} />
    </>
  );
}

