import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Utensils,
  Coffee,
  Compass,
  Flame,
  Ship,
  Car,
  Wifi,
  Bike,
  ArrowRight,
} from "lucide-react";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import Button from "@/components/common/Button";

const highlights = [
  {
    icon: Utensils,
    title: "Panoramic Rooftop Restaurant",
    desc: "Savor authentic Egyptian tagines and grilled specialties with 360° views over the Nile and Theban peaks.",
    tag: "Dining",
  },
  {
    icon: Coffee,
    title: "Fresh Egyptian Breakfast",
    desc: "Hot falafel, fresh ful medames, local baladi bread, cheeses, and mint tea included with every stay.",
    tag: "Included",
  },
  {
    icon: Flame,
    title: "Hot Air Balloon Sunrise Flights",
    desc: "Float above Luxor's ancient temples and the desert at dawn with our safety-certified partners.",
    tag: "Excursions",
  },
  {
    icon: Compass,
    title: "Valley of the Kings Private Tours",
    desc: "Bespoke tours with licensed Egyptologist guides to tombs, Hatshepsut, and Karnak Temple.",
    tag: "Tour Desk",
  },
  {
    icon: Ship,
    title: "Nile Sunset Felucca Cruises",
    desc: "Peaceful traditional sailboat journeys down the River Nile directly from our riverside dock.",
    tag: "Experience",
  },
  {
    icon: Car,
    title: "Airport & Railway Transfers",
    desc: "Chauffeured, air-conditioned private pickups from Luxor International Airport (LXR) 24/7.",
    tag: "Transport",
  },
  {
    icon: Bike,
    title: "Bicycle Countryside Rentals",
    desc: "Pedal along palm-lined village paths to the Colossi of Memnon and nearby temples.",
    tag: "Activities",
  },
  {
    icon: Wifi,
    title: "High-Speed Wi-Fi Everywhere",
    desc: "Reliable fiber internet throughout all rooms, rooftop terrace, and public areas.",
    tag: "Free Service",
  },
];

export default function FacilitiesHighlight() {
  return (
    <section className="py-20 lg:py-28 bg-[#101B35] text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#1677B8]/10 rounded-full blur-[120px] pointer-events-none" />

      <Container>
        <SectionHeading
          badge="Exceptional Hotel Services"
          title="Amenities & Experiences"
          subtitle="Everything you need for an unforgettable stay in Luxor, from rooftop dining to personalized ancient temple explorations."
          light
        />

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#0A1122]/70 backdrop-blur-sm border border-[#D99A35]/20 hover:border-[#D99A35]/60 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[#D99A35]/15 border border-[#D99A35]/30 flex items-center justify-center text-[#D99A35] group-hover:scale-110 group-hover:bg-[#D99A35] group-hover:text-[#101B35] transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/10 text-[#F3B95F]">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-[#F3B95F] transition-colors mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-[#EDE6D8]/70 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Banner with CTA to full facilities page */}
        <div className="mt-14 p-8 rounded-2xl bg-gradient-to-r from-[#0A1122] via-[#1677B8]/30 to-[#0A1122] border border-[#D99A35]/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl font-bold text-white font-serif">
              Looking for a custom excursion or airport pickup?
            </h4>
            <p className="text-sm text-[#EDE6D8]/80 max-w-xl">
              Our front desk concierge is available 24/7 to plan your Luxor itinerary, organize
              private transportation, and answer any travel inquiries.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Button href="/facilities" variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
              All Services & Dining
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

