"use client";

import React, { useState } from "react";
import {
  Compass,
  Sparkles,
  Calendar,
  Users,
  Clock,
  Coins,
  Car,
  AlertCircle,
  RotateCcw,
  Check,
} from "lucide-react";
import ItineraryCard, { ItineraryDataUI } from "./ItineraryCard";
import LanguageSelector from "./LanguageSelector";
import { LanguageCode } from "@/lib/ai/types";

interface InterestItem {
  id: string;
  label: Record<"en" | "ar" | "de" | "fr" | "es", string>;
  icon: string;
}

const AVAILABLE_INTERESTS: InterestItem[] = [
  {
    id: "ancient_history",
    label: {
      en: "Ancient Egyptian History",
      ar: "تاريخ مصر القديمة",
      de: "Altägyptische Geschichte",
      fr: "Histoire de l'Égypte ancienne",
      es: "Historia del Antiguo Egipto",
    },
    icon: "📜",
  },
  {
    id: "tombs",
    label: {
      en: "Royal Tombs (Valley of Kings)",
      ar: "المقابر الملكية (وادي الملوك)",
      de: "Königsgräber (Tal der Könige)",
      fr: "Tombes royales (Vallée des Rois)",
      es: "Tumbas reales (Valle de los Reyes)",
    },
    icon: "👑",
  },
  {
    id: "temples",
    label: {
      en: "Colossal Temples (Karnak & Luxor)",
      ar: "المعابد الكبرى (الكرنك والأقصر)",
      de: "Monumentale Tempel",
      fr: "Temples colossaux",
      es: "Templos colosales",
    },
    icon: "🏛️",
  },
  {
    id: "balloons",
    label: {
      en: "Sunrise Hot Air Balloon",
      ar: "منطاد الهواء الساخن عند الشروق",
      de: "Heißluftballon zum Sonnenaufgang",
      fr: "Montgolfière au lever du soleil",
      es: "Globo aerostático al amanecer",
    },
    icon: "🎈",
  },
  {
    id: "felucca",
    label: {
      en: "Traditional Nile Felucca Sailing",
      ar: "إبحار فلوكة نيلية تقليدية",
      de: "Traditionelles Nil-Felukensegeln",
      fr: "Navigation en felouque traditionnelle",
      es: "Navegación en faluca tradicional",
    },
    icon: "⛵",
  },
  {
    id: "photography",
    label: {
      en: "Scenic Photography & Golden Hour",
      ar: "التصوير الفوتوغرافي وساعة الغروب",
      de: "Fotografie & Lichtstimmungen",
      fr: "Photographie & Heure dorée",
      es: "Fotografía y Hora dorada",
    },
    icon: "📸",
  },
  {
    id: "museums",
    label: {
      en: "Air-Conditioned Art Museums",
      ar: "المتاحف الفنية المكيفة",
      de: "Klimatisierte Museen",
      fr: "Musées d'art climatisés",
      es: "Museos de arte climatizados",
    },
    icon: "🏺",
  },
  {
    id: "relaxation",
    label: {
      en: "Relaxation & Rooftop Nile Vistas",
      ar: "الاسترخاء وإطلالات النيل والروف",
      de: "Entspannung & Nilpanorama",
      fr: "Détente & Vues sur le Nil",
      es: "Relajación y Vistas al Nilo",
    },
    icon: "🌴",
  },
];

export default function TravelPlanner() {
  const [days, setDays] = useState<number>(3);
  const [travelers, setTravelers] = useState<number>(2);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    "ancient_history",
    "tombs",
    "temples",
  ]);
  const [pace, setPace] = useState<"relaxed" | "moderate" | "intensive">("moderate");
  const [budget, setBudget] = useState<"budget" | "standard" | "luxury">("standard");
  const [transportPreference, setTransportPreference] = useState<
    "any" | "walking_ferry" | "private_driver" | "taxi"
  >("any");
  const [specialRequirements, setSpecialRequirements] = useState("");
  const [language, setLanguage] = useState<LanguageCode>("en");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [itineraryResult, setItineraryResult] = useState<ItineraryDataUI | null>(null);

  const isRTL = language === "ar";

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id)
        ? prev.length > 1
          ? prev.filter((item) => item !== id)
          : prev
        : [...prev, id]
    );
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai/planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          days,
          travelers,
          interests: selectedInterests,
          pace,
          budget,
          transportPreference,
          specialRequirements: specialRequirements.trim() || undefined,
          startingLocation: "Grand Cleopatra Hotel (West Bank, Luxor)",
          language,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to generate Luxor itinerary.");
      }

      setItineraryResult(data.itinerary);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error creating itinerary. Please retry.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="w-full">
      {/* If itinerary is generated, display result card */}
      {itineraryResult ? (
        <div>
          <div className="flex items-center justify-between mb-6">
            <button
              type="button"
              onClick={() => setItineraryResult(null)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#D99A35]/40 text-[#101B35] text-xs sm:text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm"
            >
              <RotateCcw className="w-4 h-4 text-[#D99A35]" />
              <span>{isRTL ? "تعديل التفضيلات وإنشاء جديد" : "Modify Preferences & Re-plan"}</span>
            </button>

            <LanguageSelector
              currentLanguage={language}
              onLanguageChange={setLanguage}
              compact
            />
          </div>

          <ItineraryCard itinerary={itineraryResult} language={language} />
        </div>
      ) : (
        /* Planner Configuration Form */
        <form
          onSubmit={handleGenerate}
          className="rounded-3xl border border-[#D99A35]/30 bg-white p-6 sm:p-10 shadow-xl"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101B35] text-[#D99A35] text-xs font-bold font-serif uppercase tracking-wider mb-2">
                <Compass className="w-3.5 h-3.5" />
                {isRTL ? "المخطط الذكي لرحلات الأقصر" : "Intelligent Luxor Travel Planner"}
              </div>
              <h2 className="font-serif font-extrabold text-2xl sm:text-3xl text-[#101B35]">
                {isRTL
                  ? "صمم برنامجك السياحي المثالي في الأقصر"
                  : "Curate Your Personalized Luxor Itinerary"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {isRTL
                  ? "برامج دقيقة تراعي تقسيم الضفتين وتجنب حرارة الظهيرة وتفادي عبور النيل المجهد، انطلاقاً من فندق جراند كليوباترا."
                  : "Grounding in authentic geography: West/East Bank separation, heat-aware pacing, and zero unnecessary Nile crossings from Grand Cleopatra Hotel."}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs text-slate-500 font-medium">
                {isRTL ? "اللغة:" : "Language:"}
              </span>
              <LanguageSelector
                currentLanguage={language}
                onLanguageChange={setLanguage}
              />
            </div>
          </div>

          <div className="space-y-8">
            {/* 1. Trip Scope (Days & Travelers) */}
            <div>
              <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-[#101B35] mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#D99A35]" />
                <span>{isRTL ? "1. عدد أيام الإقامة في الأقصر" : "1. Number of Days in Luxor"}</span>
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 sm:gap-3">
                {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDays(d)}
                    className={`py-3 px-2 rounded-xl text-center font-bold text-sm sm:text-base transition-all border ${
                      days === d
                        ? "bg-[#101B35] text-[#F3B95F] border-[#D99A35] shadow-md scale-105"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:border-[#D99A35]/50"
                    }`}
                  >
                    <div>{d}</div>
                    <div className="text-[10px] font-medium opacity-80 uppercase tracking-tighter">
                      {isRTL ? (d === 1 ? "يوم" : d === 2 ? "يومان" : "أيام") : d === 1 ? "Day" : "Days"}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Travelers & Pace */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Travelers */}
              <div>
                <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-[#101B35] mb-2.5 flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#D99A35]" />
                  <span>{isRTL ? "عدد المسافرين" : "Travelers"}</span>
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setTravelers(num)}
                      className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-colors ${
                        travelers === num
                          ? "bg-[#101B35] text-[#F3B95F] border-[#D99A35]"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {num} {num === 1 ? (isRTL ? "فرد" : "Guest") : isRTL ? "أفراد" : "Guests"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pace */}
              <div>
                <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-[#101B35] mb-2.5 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#D99A35]" />
                  <span>{isRTL ? "وتيرة البرنامج اليومي" : "Daily Sightseeing Pace"}</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "relaxed", label: isRTL ? "هادئة (مزاران)" : "Relaxed (2 sites)" },
                    { id: "moderate", label: isRTL ? "معتدلة (3 مزارات)" : "Moderate (2-3 sites)" },
                    { id: "intensive", label: isRTL ? "مكثفة (4 مزارات)" : "Intensive (3-4 sites)" },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPace(p.id as any)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all text-center ${
                        pace === p.id
                          ? "bg-[#101B35] text-[#F3B95F] border-[#D99A35]"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Interests Multi-select */}
            <div>
              <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-[#101B35] mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D99A35]" />
                <span>{isRTL ? "2. اهتماماتك المفضلة (اختر ما يناسبك)" : "2. Your Sightseeing Interests"}</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                {AVAILABLE_INTERESTS.map((item) => {
                  const isSelected = selectedInterests.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleInterest(item.id)}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                        isSelected
                          ? "bg-[#101B35] text-white border-[#D99A35] shadow-sm"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:border-[#D99A35]/50"
                      }`}
                    >
                      <span className="text-base flex-shrink-0" aria-hidden="true">{item.icon}</span>
                      <span className="flex-1 leading-snug">
                        {item.label[language as "en" | "ar" | "de" | "fr" | "es"] || item.label.en}
                      </span>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-[#F3B95F] flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Budget & Transport */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Budget */}
              <div>
                <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-[#101B35] mb-2.5 flex items-center gap-2">
                  <Coins className="w-4 h-4 text-[#D99A35]" />
                  <span>{isRTL ? "فئة الميزانية المرغوبة" : "Budget Level"}</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "budget", label: isRTL ? "اقتصادي (معدية)" : "Budget (Ferry)" },
                    { id: "standard", label: isRTL ? "معتدل (سيارة)" : "Standard (Car)" },
                    { id: "luxury", label: isRTL ? "فاخر (VIP)" : "Luxury (VIP & Guide)" },
                  ].map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setBudget(b.id as any)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all text-center ${
                        budget === b.id
                          ? "bg-[#101B35] text-[#F3B95F] border-[#D99A35]"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Transport Preference */}
              <div>
                <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-[#101B35] mb-2.5 flex items-center gap-2">
                  <Car className="w-4 h-4 text-[#D99A35]" />
                  <span>{isRTL ? "وسيلة التنقل المفضلة" : "Transport Preference"}</span>
                </label>
                <select
                  value={transportPreference}
                  onChange={(e) => setTransportPreference(e.target.value as any)}
                  className="w-full py-2.5 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#D99A35]"
                >
                  <option value="any">{isRTL ? "الترتيب الأنسب حسب اليوم (موصى به)" : "Best Match per Day (Recommended)"}</option>
                  <option value="private_driver">{isRTL ? "سائق خاص وسيارة مكيفة طوال الرحلة" : "Private Air-Conditioned Driver"}</option>
                  <option value="walking_ferry">{isRTL ? "معدية النيل العامة وسير على الأقدام" : "Local Public Ferry & Walking"}</option>
                  <option value="taxi">{isRTL ? "تاكسي محلي عند الطلب" : "Local Taxi on Demand"}</option>
                </select>
              </div>
            </div>

            {/* Special Requests (Optional) */}
            <div>
              <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-[#101B35] mb-2">
                {isRTL ? "طلبات خاصة أو ملاحظات (اختياري)" : "Special Requirements or Accessibility Needs (Optional)"}
              </label>
              <input
                type="text"
                value={specialRequirements}
                onChange={(e) => setSpecialRequirements(e.target.value.slice(0, 500))}
                placeholder={
                  isRTL
                    ? "مثال: معنا أطفال صغار، أو تفضيل مسارات مظللة وكراسي متحركة..."
                    : "e.g., Traveling with elderly family, seeking shaded routes or wheelchair accessibility..."
                }
                className="w-full py-2.5 px-4 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D99A35]"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D99A35] via-[#E2A645] to-[#B67C21] text-white text-sm sm:text-base font-bold shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-100 disabled:opacity-50 transition-all font-serif tracking-wider"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{isRTL ? "جارٍ تصميم البرنامج الأثري..." : "Designing Grounded Itinerary..."}</span>
                </>
              ) : (
                <>
                  <Compass className="w-5 h-5 text-white" />
                  <span>{isRTL ? "صمم برنامج الأقصر الذكي الآن" : "Generate My Luxor Itinerary"}</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
