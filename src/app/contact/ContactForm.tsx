"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, CheckCircle2, MessageCircle, AlertCircle } from "lucide-react";
import Button from "@/components/common/Button";
import { hotelInfo } from "@/data/hotel";

const contactSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(6, "Please provide a valid phone or WhatsApp number"),
  subject: z.string().min(1, "Please select an inquiry subject"),
  message: z.string().min(10, "Please provide details with at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<ContactFormData | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      subject: "Room Booking Inquiry",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    // Simulate server submission
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmitted(true);
    setSubmittedData(data);
    reset();
  };

  if (submitted && submittedData) {
    const waText = encodeURIComponent(
      `Hello Grand Cleopatra Hotel,\nName: ${submittedData.fullName}\nEmail: ${submittedData.email}\nSubject: ${submittedData.subject}\nMessage: ${submittedData.message}`
    );

    return (
      <div className="bg-white p-8 sm:p-10 rounded-2xl border border-[#D99A35]/40 shadow-xl space-y-6 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-bold font-serif text-[#101B35]">
            Thank You, {submittedData.fullName}!
          </h3>
          <p className="text-sm text-[#101B35]/75 max-w-md mx-auto leading-relaxed">
            Your message has been received by our front desk team. We will reply to your email (
            <span className="font-semibold text-[#101B35]">{submittedData.email}</span>) within a
            few hours.
          </p>
        </div>

        <div className="pt-4 border-t border-[#101B35]/10 space-y-3">
          <p className="text-xs text-[#101B35]/60">Need an immediate answer right now?</p>
          <a
            href={`https://wa.me/${hotelInfo.whatsapp.replace(/\+/g, "")}?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-sm transition-colors shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Forward Message to WhatsApp Front Desk</span>
          </a>
        </div>

        <button
          onClick={() => setSubmitted(false)}
          className="text-xs text-[#D99A35] hover:underline font-semibold block mx-auto pt-2"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 sm:p-10 rounded-2xl border border-[#D99A35]/30 shadow-xl">
      <h3 className="text-2xl font-bold font-serif text-[#101B35] mb-2">
        Send Us a Message
      </h3>
      <p className="text-sm text-[#101B35]/70 mb-6">
        Fill out the form below and our team will get back to you promptly.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#101B35] mb-1.5">
            Full Name *
          </label>
          <input
            type="text"
            placeholder="e.g. Sarah Jenkins"
            {...register("fullName")}
            className={`w-full bg-[#F8F5EF] text-[#101B35] border rounded-md px-4 py-3 text-sm focus:outline-none transition-colors ${
              errors.fullName
                ? "border-red-500 focus:border-red-500"
                : "border-[#101B35]/20 focus:border-[#D99A35]"
            }`}
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email & Phone Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#101B35] mb-1.5">
              Email Address *
            </label>
            <input
              type="email"
              placeholder="e.g. sarah@example.com"
              {...register("email")}
              className={`w-full bg-[#F8F5EF] text-[#101B35] border rounded-md px-4 py-3 text-sm focus:outline-none transition-colors ${
                errors.email
                  ? "border-red-500 focus:border-red-500"
                  : "border-[#101B35]/20 focus:border-[#D99A35]"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#101B35] mb-1.5">
              Phone / WhatsApp *
            </label>
            <input
              type="tel"
              placeholder="e.g. +44 7123 456789"
              {...register("phone")}
              className={`w-full bg-[#F8F5EF] text-[#101B35] border rounded-md px-4 py-3 text-sm focus:outline-none transition-colors ${
                errors.phone
                  ? "border-red-500 focus:border-red-500"
                  : "border-[#101B35]/20 focus:border-[#D99A35]"
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        {/* Subject */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#101B35] mb-1.5">
            Inquiry Subject *
          </label>
          <select
            {...register("subject")}
            className="w-full bg-[#F8F5EF] text-[#101B35] border border-[#101B35]/20 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#D99A35] transition-colors"
          >
            <option value="Room Booking Inquiry">Room Booking Inquiry</option>
            <option value="Airport / Station Transfer Request">Airport / Station Transfer Request</option>
            <option value="Valley of the Kings / Excursions">Valley of the Kings / Excursions</option>
            <option value="Hot Air Balloon Reservation">Hot Air Balloon Reservation</option>
            <option value="Rooftop Dining & Events">Rooftop Dining & Events</option>
            <option value="General Question">General Question</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#101B35] mb-1.5">
            Your Message / Dates / Requirements *
          </label>
          <textarea
            rows={4}
            placeholder="Tell us about your planned arrival date, number of nights, or specific questions..."
            {...register("message")}
            className={`w-full bg-[#F8F5EF] text-[#101B35] border rounded-md px-4 py-3 text-sm focus:outline-none transition-colors ${
              errors.message
                ? "border-red-500 focus:border-red-500"
                : "border-[#101B35]/20 focus:border-[#D99A35]"
            }`}
          />
          {errors.message && (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.message.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          size="lg"
          disabled={isSubmitting}
          icon={<Send className="w-4 h-4" />}
        >
          {isSubmitting ? "Sending Inquiry..." : "Submit Message"}
        </Button>
      </form>
    </div>
  );
}
