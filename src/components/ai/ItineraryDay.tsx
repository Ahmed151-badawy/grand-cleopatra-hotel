"use client";

import React from "react";
import {
  Sun,
  Clock,
  MapPin,
  Utensils,
  Lightbulb,
  ShieldCheck,
  Sailboat,
  Compass,
} from "lucide-react";
import { LanguageCode } from "@/lib/ai/types";

export interface ActivitySlot {
  id: string;
  name: string;
  bank: string;
  timeSlot: string;
  estimatedDuration: string;
  description: string;
  practicalTip: string;
  verified: boolean;
}

export interface DayPlanUI {
  dayNumber: number;
  theme: string;
  bankFocus?: string;
  nileCrossings: number;
  heatAdvisory?: string;
  morning: ActivitySlot;
  middayLunch: {
    recommendation: string;
    notes: string;
  };
  afternoon?: ActivitySlot;
  sunsetEvening?: ActivitySlot;
  logisticsAdvice: string;
}

interface ItineraryDayProps {
  day: DayPlanUI;
  language: LanguageCode;
}

export default function ItineraryDay({ day, language }: ItineraryDayProps) {
  const isRTL = language === "ar";
  const isEastBank = day.bankFocus?.includes("East");

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="rounded-2xl border border-[#D99A35]/30 bg-white p-5 sm:p-7 shadow-md mb-6 transition-all"
    >
      {/* Day Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 rounded-full bg-[#101B35] text-[#F3B95F] text-xs font-bold font-serif uppercase tracking-wider">
              {isRTL ? `اليوم ${day.dayNumber}` : `Day ${day.dayNumber}`}
            </span>

            {/* Bank Focus Badge */}
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                isEastBank
                  ? "bg-blue-50 text-blue-800 border border-blue-200"
                  : "bg-emerald-50 text-emerald-800 border border-emerald-200"
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              {day.bankFocus || (isEastBank ? "East Bank" : "West Bank")}
            </span>

            {/* Nile Crossing Badge */}
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
              <Sailboat className="w-3 h-3 text-[#D99A35]" />
              {day.nileCrossings === 0
                ? isRTL ? "0 عبور للنيل (الضفة الغربية)" : "0 Nile Crossings (West Bank)"
                : isRTL ? `${day.nileCrossings} عبور للنيل بالمعدية` : `${day.nileCrossings} Nile Crossings (Ferry)`}
            </span>
          </div>

          <h3 className="font-serif font-bold text-lg sm:text-xl text-[#101B35]">
            {day.theme}
          </h3>
        </div>
      </div>

      {/* Heat Advisory Callout */}
      {day.heatAdvisory && (
        <div className="mb-6 p-4 rounded-xl bg-amber-50/90 border border-amber-200/90 text-amber-950 text-xs sm:text-sm flex items-start gap-3 shadow-sm">
          <Sun className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5 animate-pulse" />
          <div className="leading-relaxed font-medium">{day.heatAdvisory}</div>
        </div>
      )}

      {/* Activities Timeline */}
      <div className="space-y-4">
        {/* 1. Morning Slot */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-[#D99A35]/40 pb-4">
          <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#D99A35] border-2 border-white shadow" />
          <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 shadow-sm hover:border-[#D99A35]/60 transition-colors">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#D99A35] bg-[#D99A35]/10 px-2 py-0.5 rounded">
                  {isRTL ? "الفترة الصباحية" : "Morning"}
                </span>
                <h4 className="font-bold text-sm sm:text-base text-[#101B35]">
                  {day.morning.name}
                </h4>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#D99A35]" />
                  {day.morning.timeSlot} ({day.morning.estimatedDuration})
                </span>
                <span className="flex items-center gap-1 text-emerald-700 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {isRTL ? "موثق" : "Verified"}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
              {day.morning.description}
            </p>

            {day.morning.practicalTip && (
              <div className="flex items-start gap-2 text-xs bg-white p-2.5 rounded-lg border border-slate-200/80 text-slate-700">
                <Lightbulb className="w-4 h-4 text-[#D99A35] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  <strong>{isRTL ? "نصيحة عملية:" : "Tip:"}</strong> {day.morning.practicalTip}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 2. Midday Lunch Break */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-emerald-400/50 pb-4">
          <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white shadow" />
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
            <div className="flex items-center gap-2 mb-1.5 text-xs font-bold text-emerald-900">
              <Utensils className="w-4 h-4 text-emerald-700" />
              <span>{isRTL ? "استراحة الغداء والظل (12:30 - 02:00 عصراً)" : "Midday Lunch & Shaded Rest (12:30 PM - 02:00 PM)"}</span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-[#101B35] mb-1">
              {day.middayLunch.recommendation}
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              {day.middayLunch.notes}
            </p>
          </div>
        </div>

        {/* 3. Afternoon Slot (Optional) */}
        {day.afternoon && (
          <div className="relative pl-6 sm:pl-8 border-l-2 border-[#D99A35]/40 pb-4">
            <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#D99A35] border-2 border-white shadow" />
            <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 shadow-sm hover:border-[#D99A35]/60 transition-colors">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {isRTL ? "فترة بعد الظهر" : "Afternoon"}
                  </span>
                  <h4 className="font-bold text-sm sm:text-base text-[#101B35]">
                    {day.afternoon.name}
                  </h4>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#D99A35]" />
                    {day.afternoon.timeSlot} ({day.afternoon.estimatedDuration})
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                {day.afternoon.description}
              </p>

              {day.afternoon.practicalTip && (
                <div className="flex items-start gap-2 text-xs bg-white p-2.5 rounded-lg border border-slate-200/80 text-slate-700">
                  <Lightbulb className="w-4 h-4 text-[#D99A35] flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>{isRTL ? "نصيحة عملية:" : "Tip:"}</strong> {day.afternoon.practicalTip}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 4. Sunset / Evening Slot (Optional) */}
        {day.sunsetEvening && (
          <div className="relative pl-6 sm:pl-8 border-l-2 border-[#101B35]/30">
            <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#101B35] border-2 border-[#D99A35] shadow" />
            <div className="rounded-xl border border-[#101B35]/20 bg-slate-50/80 p-4 shadow-sm hover:border-[#D99A35]/60 transition-colors">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-800 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                    {isRTL ? "وقت الغروب / المساء" : "Sunset / Evening"}
                  </span>
                  <h4 className="font-bold text-sm sm:text-base text-[#101B35]">
                    {day.sunsetEvening.name}
                  </h4>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#D99A35]" />
                    {day.sunsetEvening.timeSlot} ({day.sunsetEvening.estimatedDuration})
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                {day.sunsetEvening.description}
              </p>

              {day.sunsetEvening.practicalTip && (
                <div className="flex items-start gap-2 text-xs bg-white p-2.5 rounded-lg border border-slate-200/80 text-slate-700">
                  <Lightbulb className="w-4 h-4 text-[#D99A35] flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>{isRTL ? "نصيحة عملية:" : "Tip:"}</strong> {day.sunsetEvening.practicalTip}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Logistics Advice */}
      <div className="mt-5 p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-700 flex items-start gap-2.5">
        <MapPin className="w-4 h-4 text-[#D99A35] flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed font-medium">
          <strong>{isRTL ? "إرشادات التنقل والمواصلات:" : "Transit & Logistics:"}</strong> {day.logisticsAdvice}
        </div>
      </div>
    </div>
  );
}

