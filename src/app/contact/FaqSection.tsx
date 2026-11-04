"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/data/hotel";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="bg-white rounded-xl border border-[#D99A35]/30 overflow-hidden shadow-sm transition-all"
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-[#101B35] font-serif hover:text-[#D99A35] transition-colors cursor-pointer"
            >
              <span className="text-sm sm:text-base">{faq.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-[#D99A35] shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#101B35]/75 leading-relaxed border-t border-[#101B35]/5 bg-[#F8F5EF]/40">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

