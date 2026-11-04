"use client";

import React, { useState } from "react";
import {
  Compass,
  Clock,
  MapPin,
  AlertTriangle,
  Info,
  MessageCircle,
  Calendar,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import ItineraryDay, { DayPlanUI } from "./ItineraryDay";
import { LanguageCode } from "@/lib/ai/types";

export interface ItineraryDataUI {
  itineraryId?: string;
  title: string;
  destination: string;
  daysCount: number;
  pace: string;
  budget?: string;
  startingPoint: string;
  days: DayPlanUI[];
  overallTips: string[];
  travelNotes?: string[];
  uncertaintyFlags: string[];
  budgetClassification?: string;
  estimatedDurations?: {
    totalSightseeingHours: number;
    dailyAvgHours: number;
  };
  language?: string;
  source: string;
}

interface ItineraryCardProps {
  itinerary: ItineraryDataUI;
  language?: LanguageCode;
}

export default function ItineraryCard({
  itinerary,
  language = "en",
}: ItineraryCardProps) {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [viewAll, setViewAll] = useState(false);
  const isRTL = language === "ar";

  const rawPhone = "201003456789";
  const whatsappText = encodeURIComponent(
    `Hello Grand Cleopatra Hotel, I created a custom ${itinerary.daysCount}-day Luxor itinerary on your website ("${itinerary.title}") and would like assistance with arrangements.`
  );
  const whatsappUrl = `https://wa.me/${rawPhone}?text=${whatsappText}`;

  const currentDayPlan = itinerary.days.find((d) => d.dayNumber === selectedDay) || itinerary.days[0];

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="rounded-3xl border border-[#D99A35]/30 bg-gradient-to-b from-[#FAF8F5] to-white p-6 sm:p-9 shadow-xl"
    >
      {/* Top Banner / Summary */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-200/80 pb-6 mb-7">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#101B35] text-[#D99A35] text-xs font-bold font-serif uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              {isRTL ? "برنامج معتمد ومخصص" : "Curated & Grounded"}
            </span>

            <span className="px-3 py-1 rounded-full bg-[#D99A35]/15 text-[#966316] text-xs font-bold border border-[#D99A35]/30 capitalize">
              {itinerary.pace} {isRTL ? "الوتيرة" : "Pace"}
            </span>

            {itinerary.budget && (
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold capitalize border border-slate-200">
                {itinerary.budget} {isRTL ? "الميزانية" : "Budget"}
              </span>
            )}
          </div>

          <h2 className="font-serif font-extrabold text-2xl sm:text-3xl text-[#101B35] tracking-tight">
            {itinerary.title}
          </h2>

          <div className="flex items-center gap-2 mt-2 text-xs sm:text-sm text-slate-500 font-medium">
            <MapPin className="w-4 h-4 text-[#D99A35]" />
            <span>
              {isRTL ? "نقطة الانطلاق:" : "Starting from:"} {itinerary.startingPoint}
            </span>
          </div>
        </div>

        {/* Stats Summary Cards */}
        {itinerary.estimatedDurations && (
          <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex-shrink-0">
            <div className="text-center px-3 border-r border-slate-100">
              <div className="text-lg sm:text-xl font-extrabold text-[#101B35]">
                {itinerary.daysCount}
              </div>
              <div className="text-[10px] uppercase font-bold text-slate-400">
                {isRTL ? "أيام" : "Days"}
              </div>
            </div>

            <div className="text-center px-3 border-r border-slate-100">
              <div className="text-lg sm:text-xl font-extrabold text-[#D99A35]">
                ~{itinerary.estimatedDurations.totalSightseeingHours}h
              </div>
              <div className="text-[10px] uppercase font-bold text-slate-400">
                {isRTL ? "إجمالي الجولات" : "Total Sightseeing"}
              </div>
            </div>

            <div className="text-center px-3">
              <div className="text-lg sm:text-xl font-extrabold text-slate-700">
                ~{itinerary.estimatedDurations.dailyAvgHours}h
              </div>
              <div className="text-[10px] uppercase font-bold text-slate-400">
                {isRTL ? "معدل يومي" : "Daily Avg"}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Budget Classification Banner */}
      {itinerary.budgetClassification && (
        <div className="mb-6 p-4 rounded-2xl bg-[#101B35]/5 border border-[#101B35]/10 text-xs sm:text-sm text-[#101B35] flex items-start gap-2.5">
          <Info className="w-4 h-4 text-[#D99A35] flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed font-medium">
            {itinerary.budgetClassification}
          </div>
        </div>
      )}

      {/* Day Selector Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {itinerary.days.map((d) => {
            const isActive = selectedDay === d.dayNumber && !viewAll;
            return (
              <button
                key={d.dayNumber}
                type="button"
                onClick={() => {
                  setSelectedDay(d.dayNumber);
                  setViewAll(false);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-[#101B35] text-[#F3B95F] shadow-md border border-[#D99A35]/40"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {isRTL ? `اليوم ${d.dayNumber}` : `Day ${d.dayNumber}`}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => setViewAll(true)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              viewAll
                ? "bg-[#101B35] text-[#F3B95F] shadow-md border border-[#D99A35]/40"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {isRTL ? "عرض كل الأيام" : "View All Days"}
          </button>
        </div>
      </div>

      {/* Render Day Plans */}
      {viewAll ? (
        itinerary.days.map((d) => (
          <ItineraryDay key={d.dayNumber} day={d} language={language} />
        ))
      ) : (
        currentDayPlan && <ItineraryDay day={currentDayPlan} language={language} />
      )}

      {/* Practical Travel Notes & Tips */}
      {itinerary.overallTips && itinerary.overallTips.length > 0 && (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
          <h4 className="font-serif font-bold text-base text-[#101B35] mb-3 flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#D99A35]" />
            {isRTL ? "إرشادات عامة لزيارة آثار الأقصر:" : "Essential Luxor Exploration Guidelines:"}
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
            {itinerary.overallTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#D99A35] font-bold text-base leading-none">•</span>
                <span className="leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Grounding & Uncertainty Disclaimers */}
      {itinerary.uncertaintyFlags && itinerary.uncertaintyFlags.length > 0 && (
        <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50/70 p-4 sm:p-5 text-xs text-amber-950">
          <div className="flex items-center gap-2 font-bold mb-2 text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>{isRTL ? "تنويهات رسمية وضمان الدقة الأثرية:" : "Official Notice & Grounding Disclaimers:"}</span>
          </div>
          <ul className="space-y-1.5 pl-5 list-disc leading-relaxed text-amber-900/90">
            {itinerary.uncertaintyFlags.map((flag, idx) => (
              <li key={idx}>{flag}</li>
            ))}
          </ul>
        </div>
      )}

      {/* WhatsApp Concierge Action Card */}
      <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#101B35] via-[#16274D] to-[#101B35] border border-[#D99A35]/30 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="font-bold text-sm sm:text-base text-[#F8F5EF]">
              {isRTL ? "هل ترغب في تنظيم هذه الرحلة مع سائق موثوق؟" : "Want to organize this itinerary with trusted transport?"}
            </div>
            <div className="text-xs text-[#EDE6D8]/70">
              {isRTL
                ? "فريق استقبال فندق جراند كليوباترا يساعدك في ترتيب الجولات والسيارات المكيفة والمنطاد الطائر 24/7."
                : "Grand Cleopatra front desk coordinates private drivers, balloon flights, and felucca sunset sails 24/7."}
            </div>
          </div>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-lg transition-all flex-shrink-0 w-full sm:w-auto justify-center"
        >
          <span>{isRTL ? "تواصل معنا عبر واتساب" : "WhatsApp Front Desk"}</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
