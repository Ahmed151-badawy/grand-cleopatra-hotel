"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, X } from "lucide-react";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import Button from "@/components/common/Button";
import { galleryItems, GalleryItem } from "@/data/gallery";

export default function GalleryPreview() {
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  const previewPhotos = galleryItems.slice(0, 6);

  return (
    <section className="py-20 lg:py-28 bg-[#F8F5EF]">
      <Container>
        <SectionHeading
          badge="Visual Journey"
          title="Moments at Grand Cleopatra"
          subtitle="Explore the serene atmosphere, warm Egyptian interiors, rooftop Nile vistas, and wonders of Luxor awaiting you."
        />

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className="group relative h-72 rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 border border-[#D99A35]/20"
            >
              <Image
                src={photo.image}
                alt={photo.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Caption */}
              <div className="absolute bottom-0 inset-x-0 p-5 text-white transform translate-y-1 group-hover:translate-y-0 transition-transform">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#D99A35] block mb-1">
                  {photo.categoryLabel}
                </span>
                <h4 className="text-base font-bold font-serif leading-snug">
                  {photo.title}
                </h4>
                <p className="text-xs text-[#EDE6D8]/80 mt-1 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {photo.description}
                </p>
              </div>

              {/* View Overlay Icon */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-4 h-4 text-[#F3B95F]" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer Link */}
        <div className="mt-12 text-center">
          <Button href="/gallery" variant="secondary" icon={<ArrowRight className="w-4 h-4" />}>
            View Full Photo Gallery ({galleryItems.length} Photos)
          </Button>
        </div>
      </Container>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#101B35] rounded-xl overflow-hidden shadow-2xl border border-[#D99A35]/40"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:text-[#D99A35] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative h-[65vh] w-full">
              <Image
                src={activePhoto.image}
                alt={activePhoto.title}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>

            <div className="p-6 bg-[#0A1122] border-t border-[#D99A35]/30">
              <span className="text-xs uppercase font-bold text-[#D99A35] tracking-wider">
                {activePhoto.categoryLabel}
              </span>
              <h3 className="text-lg font-bold text-white mt-1 font-serif">
                {activePhoto.title}
              </h3>
              <p className="text-sm text-[#EDE6D8]/80 mt-1">
                {activePhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

