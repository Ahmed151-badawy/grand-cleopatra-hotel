import React from "react";
import { Star, Quote, CheckCircle2 } from "lucide-react";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import { testimonials, hotelInfo } from "@/data/hotel";

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-white border-t border-[#EDE6D8]">
      <Container>
        <SectionHeading
          badge="Guest Stories"
          title="What Our Visitors Say"
          subtitle="Real reviews from international guests who experienced our authentic Egyptian hospitality in Luxor."
        />

        {/* Rating Summary Card */}
        <div className="max-w-2xl mx-auto mb-12 p-6 rounded-xl bg-[#F8F5EF] border border-[#D99A35]/30 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-[#101B35] text-[#F3B95F] flex flex-col items-center justify-center font-extrabold shadow-md border border-[#D99A35]/40">
              <span className="text-2xl leading-none">9.2</span>
              <span className="text-[10px] text-white/80 font-normal">/ 10</span>
            </div>
            <div>
              <div className="flex items-center gap-1 text-[#D99A35]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#D99A35]" />
                ))}
              </div>
              <h4 className="text-base font-bold text-[#101B35] mt-1">
                Superb Booking.com Score
              </h4>
              <p className="text-xs text-[#101B35]/70">
                Based on {hotelInfo.reviewCount}+ verified international travelers
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-100/80 px-3.5 py-2 rounded-full border border-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>100% Verified Guest Reviews</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-[#F8F5EF] rounded-xl p-8 border border-[#D99A35]/25 shadow-md hover:shadow-lg transition-shadow relative flex flex-col justify-between"
            >
              <Quote className="w-10 h-10 text-[#D99A35]/20 absolute top-6 right-6 pointer-events-none" />

              <div className="space-y-4">
                {/* Rating & Date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#D99A35]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D99A35]" />
                    ))}
                  </div>
                  <span className="text-xs text-[#101B35]/60 font-medium">
                    {item.date}
                  </span>
                </div>

                {/* Comment */}
                <p className="text-sm sm:text-base text-[#101B35]/85 italic leading-relaxed">
                  &ldquo;{item.comment}&rdquo;
                </p>
              </div>

              {/* Guest Profile & Room */}
              <div className="pt-6 mt-6 border-t border-[#101B35]/10 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-sm text-[#101B35] flex items-center gap-1.5">
                    <span>{item.flag}</span>
                    <span>{item.name}</span>
                  </h5>
                  <span className="text-xs text-[#101B35]/60">{item.country}</span>
                </div>

                <div className="text-right">
                  <span className="text-[11px] bg-[#D99A35]/15 text-[#B67C21] font-semibold px-2.5 py-1 rounded-full border border-[#D99A35]/30">
                    {item.roomType}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

