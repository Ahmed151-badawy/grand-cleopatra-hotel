import { z } from "zod";

export const ChatMessageSchema = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.string().min(1).max(2000),
  timestamp: z.string().optional(),
});

export const ChatRequestSchema = z.object({
  message: z.string().min(1, "Message cannot be empty").max(1000, "Message exceeds 1,000 characters limit"),
  language: z.enum(["en", "ar", "de", "fr", "es", "auto"]).default("auto"),
  history: z.array(ChatMessageSchema).max(20, "History cannot exceed 20 messages").default([]),
  sessionId: z.string().max(100).optional(),
  conversationId: z.string().max(100).optional(),
});

export type ChatRequest = z.infer<typeof ChatRequestSchema>;

export const PlannerRequestSchema = z.object({
  days: z.number().int().min(1, "Minimum 1 day").max(7, "Maximum 7 days"),
  interests: z.array(z.string()).min(1, "Select at least 1 interest").max(10),
  pace: z.enum(["relaxed", "moderate", "intensive"]).default("moderate"),
  budget: z.enum(["budget", "standard", "moderate", "luxury"]).default("standard"),
  travelers: z.number().int().min(1).max(15).default(2),
  startingLocation: z.string().max(100).default("Grand Cleopatra Hotel (West Bank, Luxor)"),
  startingPoint: z.string().max(100).optional(),
  travelPeriod: z.string().max(100).optional(),
  travelDate: z.string().max(100).optional(),
  transportPreference: z.enum(["walking_ferry", "private_driver", "taxi", "any"]).default("any"),
  specialRequirements: z.string().max(500).optional(),
  language: z.enum(["en", "ar", "de", "fr", "es", "auto"]).default("auto"),
});

export type PlannerRequest = z.infer<typeof PlannerRequestSchema>;

export const ItineraryAttractionSchema = z.object({
  id: z.string(),
  name: z.string(),
  bank: z.string(),
  timeSlot: z.string(), // e.g. "08:00 AM - 10:30 AM"
  estimatedDuration: z.string(),
  description: z.string(),
  practicalTip: z.string(),
  verified: z.boolean(),
});

export const ItineraryDaySchema = z.object({
  dayNumber: z.number().int().min(1),
  theme: z.string(),
  bankFocus: z.string().optional(),
  nileCrossings: z.number().int().min(0).max(4).default(0),
  heatAdvisory: z.string().optional(),
  morning: ItineraryAttractionSchema,
  middayLunch: z.object({
    recommendation: z.string(),
    notes: z.string(),
  }),
  afternoon: ItineraryAttractionSchema.optional(),
  sunsetEvening: ItineraryAttractionSchema.optional(),
  logisticsAdvice: z.string(),
});

export const ItineraryResponseSchema = z.object({
  itineraryId: z.string().optional(),
  title: z.string(),
  destination: z.literal("Luxor, Egypt"),
  daysCount: z.number().int(),
  pace: z.string(),
  budget: z.string().optional(),
  startingPoint: z.string(),
  days: z.array(ItineraryDaySchema),
  overallTips: z.array(z.string()),
  travelNotes: z.array(z.string()).optional(),
  uncertaintyFlags: z.array(z.string()).default([]),
  budgetClassification: z.string().optional(),
  estimatedDurations: z
    .object({
      totalSightseeingHours: z.number(),
      dailyAvgHours: z.number(),
    })
    .optional(),
  language: z.string().optional(),
  verificationStatus: z.string(),
  source: z.string(),
});

export type ItineraryResponse = z.infer<typeof ItineraryResponseSchema>;

