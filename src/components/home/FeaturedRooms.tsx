import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Users, Maximize, BedDouble, Eye, ArrowRight, Check } from "lucide-react";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import Button from "@/components/common/Button";
import { rooms } from "@/data/rooms";

export default function FeaturedRooms() {
  return (
    <section className="py-20 lg:py-28 bg-white border-y border-[#EDE6D8]">
      <Container>
        <SectionHeading
          badge="Luxor Accommodations"
          title="Comfortable Rooms & Suites"
          subtitle="Designed with warm Egyptian tones, silent air conditioning, plush bedding, and serene views of the West Bank and Theban mountains."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="bg-[#F8F5EF] rounded-xl overflow-hidden border border-[#D99A35]/20 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Room Image Container */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={room.heroImage}
                  alt={room.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Badge if available */}
                {room.badge && (
                  <div className="absolute top-4 left-4 bg-[#D99A35] text-[#101B35] font-bold text-xs uppercase px-3 py-1 rounded-full shadow-md tracking-wider">
                    {room.badge}
                  </div>
                )}

                {/* Price Tag */}
                <div className="absolute bottom-4 right-4 bg-[#101B35]/90 backdrop-blur-sm border border-[#D99A35]/40 text-white px-3.5 py-1.5 rounded-lg shadow-lg">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-[#EDE6D8]/70">from</span>
                    <span className="text-xl font-extrabold text-[#F3B95F]">
                      ${room.pricePerNight}
                    </span>
                    <span className="text-xs text-[#EDE6D8]/70">/ night</span>
                  </div>
                </div>
              </div>

              {/* Room Details Body */}
              <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-[#101B35] group-hover:text-[#1677B8] transition-colors font-serif">
                    {room.name}
                  </h3>
                  <p className="text-xs text-[#D99A35] font-semibold mt-1">
                    {room.view}
                  </p>
                  <p className="text-sm text-[#101B35]/70 mt-2.5 line-clamp-2 leading-relaxed">
                    {room.description}
                  </p>
                </div>

                {/* Key Spec Badges */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#101B35]/10 text-xs text-[#101B35]/80">
                  <div className="flex flex-col items-center justify-center p-2 rounded bg-white/70 text-center">
                    <Users className="w-4 h-4 text-[#D99A35] mb-1" />
                    <span className="font-semibold">{room.maxGuests} Guests</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-2 rounded bg-white/70 text-center">
                    <Maximize className="w-4 h-4 text-[#D99A35] mb-1" />
                    <span className="font-semibold">{room.sizeSqm} m² / {room.sizeSqft} ft²</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-2 rounded bg-white/70 text-center">
                    <BedDouble className="w-4 h-4 text-[#D99A35] mb-1" />
                    <span className="font-semibold truncate w-full">{room.slug === "single-room-with-terrace" ? "Single Bed" : room.slug === "triple-room" ? "3 Beds" : "King / Twin"}</span>
                  </div>
                </div>

                {/* Highlights List */}
                <ul className="space-y-1.5 text-xs text-[#101B35]/80">
                  {room.highlights.slice(0, 2).map((highlight, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#D99A35] shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Button
                    href={`/rooms/${room.slug}`}
                    variant="outline"
                    size="sm"
                    fullWidth
                    icon={<Eye className="w-3.5 h-3.5" />}
                  >
                    Details
                  </Button>
                  <Button
                    href={`/reservation?room=${room.slug}`}
                    variant="primary"
                    size="sm"
                    fullWidth
                    icon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    Inquire
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all rooms footer note */}
        <div className="mt-12 text-center">
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#101B35] hover:text-[#D99A35] transition-colors group"
          >
            <span>Compare all room amenities and specifications</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#D99A35]" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

