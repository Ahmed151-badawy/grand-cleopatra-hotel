"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Eye, X, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { GalleryItem } from "@/data/gallery";

interface GalleryInteractiveProps {
  items: GalleryItem[];
}

const categories = [
  { id: "all", label: "All Photos" },
  { id: "rooms", label: "Rooms & Suites" },
  { id: "dining", label: "Rooftop & Dining" },
  { id: "views", label: "Views & Sunsets" },
  { id: "luxor", label: "Ancient Luxor & Nile" },
];

export default function GalleryInteractive({ items }: GalleryInteractiveProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredItems =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category === activeCategory);

  const handleOpenLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const handleCloseLightbox = () => {
    setSelectedIndex(null);
  };

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! + 1) % filteredItems.length);
  }, [selectedIndex, filteredItems.length]);

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length);
  }, [selectedIndex, filteredItems.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") handleCloseLightbox();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handleNext, handlePrev]);

  const activePhoto = selectedIndex !== null ? filteredItems[selectedIndex] : null;

  return (
    <div className="space-y-10">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setActiveCategory(cat.id);
                setSelectedIndex(null);
              }}
              className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all cursor-pointer ${
                isActive
                  ? "bg-[#101B35] text-[#F3B95F] shadow-md border-2 border-[#D99A35]"
                  : "bg-white text-[#101B35]/80 hover:bg-[#D99A35]/15 hover:text-[#101B35] border border-[#101B35]/10"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Photo Count Info */}
      <div className="text-center text-xs text-[#101B35]/60">
        Showing {filteredItems.length} {filteredItems.length === 1 ? "photo" : "photos"}
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((photo, index) => (
          <div
            key={photo.id}
            onClick={() => handleOpenLightbox(index)}
            className="group relative h-80 rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 border border-[#D99A35]/30 bg-white"
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
            <div className="absolute bottom-0 inset-x-0 p-5 text-white">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#D99A35] block mb-1">
                {photo.categoryLabel}
              </span>
              <h4 className="text-base font-bold font-serif leading-snug">
                {photo.title}
              </h4>
              <p className="text-xs text-[#EDE6D8]/80 mt-1 line-clamp-2">
                {photo.description}
              </p>
            </div>

            {/* Hover Eye Badge */}
            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#101B35]/70 backdrop-blur-sm border border-[#D99A35]/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <Eye className="w-5 h-5 text-[#F3B95F]" />
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={handleCloseLightbox}
        >
          {/* Close Button */}
          <button
            onClick={handleCloseLightbox}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Controls */}
          {filteredItems.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Modal Container */}
          <div
            className="relative max-w-5xl w-full bg-[#101B35] rounded-2xl overflow-hidden shadow-2xl border border-[#D99A35]/40 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Container */}
            <div className="relative h-[65vh] sm:h-[72vh] w-full bg-black/40">
              <Image
                src={activePhoto.image}
                alt={activePhoto.title}
                fill
                priority
                className="object-contain"
                sizes="100vw"
              />
            </div>

            {/* Caption & Counter Bar */}
            <div className="p-5 sm:p-6 bg-[#0A1122] border-t border-[#D99A35]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-white">
              <div>
                <span className="text-xs uppercase font-bold text-[#D99A35] tracking-wider">
                  {activePhoto.categoryLabel}
                </span>
                <h3 className="text-lg font-bold font-serif text-white mt-0.5">
                  {activePhoto.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#EDE6D8]/80 mt-1 max-w-2xl">
                  {activePhoto.description}
                </p>
              </div>

              <div className="shrink-0 text-xs text-[#EDE6D8]/60 bg-white/10 px-3 py-1.5 rounded-full border border-white/15">
                Photo {(selectedIndex || 0) + 1} of {filteredItems.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

