import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import Container from "@/components/common/Container";
import GalleryInteractive from "./GalleryInteractive";
import CtaBanner from "@/components/home/CtaBanner";
import { galleryItems } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Photo Gallery | Grand Cleopatra Hotel Luxor",
  description:
    "Explore high-definition photos of Grand Cleopatra Hotel in Luxor, Egypt: rooms, suites, panoramic rooftop dining, Egyptian breakfast, sunset Nile views, and ancient Theban monuments.",
};

export default function GalleryPage() {
  return (
    <>
      {/* Header Banner */}
      <section className="relative py-24 sm:py-32 bg-[#101B35] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=85"
            alt="Grand Cleopatra Rooftop"
            fill
            priority
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101B35] via-[#101B35]/70 to-[#101B35]/80" />
        </div>

        <Container className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#D99A35]/40 text-[#F3B95F] text-xs font-semibold tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Visual Tour</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-serif tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Hotel Photo Gallery
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#EDE6D8]/85 max-w-2xl mx-auto leading-relaxed">
            Immerse yourself in the tranquility of our rooms, rooftop views overlooking the
            Nile and Theban mountains, and the wonders of Luxor surrounding us.
          </p>
        </Container>
      </section>

      {/* Interactive Gallery Component */}
      <section className="py-20 bg-[#F8F5EF]">
        <Container>
          <GalleryInteractive items={galleryItems} />
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}

