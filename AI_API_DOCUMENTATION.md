# Cleopatra AI — API Specification
**Grand Cleopatra Hotel, Luxor, Egypt**

---

## 1. Overview & Base Endpoints

All API endpoints reside under `/api/ai/` and enforce JSON payloads, strict Zod validation, rate limiting, and prompt injection detection.

| Method | Endpoint | Description | Rate Limit |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/ai/health` | Subsystem health check & circuit breaker status | Unlimited / 60 req/min |
| `POST` | `/api/ai/chat` | Multi-turn hotel concierge chat interface | 20 requests / min / IP |
| `POST` | `/api/ai/planner` | Curated Luxor travel itinerary generator | 15 requests / min / IP |

---

## 2. Health Endpoint: `GET /api/ai/health`

### Response (200 OK)
```json
{
  "status": "healthy",
  "provider": {
    "status": "online",
    "providerName": "fallback_engine",
    "modelName": "grounded-hotel-knowledge-v1",
    "modelAvailable": true,
    "message": "Grounded fallback provider is operational with 100% verified knowledge base."
  },
  "circuitBreaker": {
    "state": "CLOSED",
    "primary": "ollama (http://localhost:11434)"
  },
  "database": {
    "hotelRecords": 19,
    "luxorAttractions": 10
  },
  "timestamp": "2026-11-04T18:40:00.000Z"
}
```

---

## 3. Concierge Chat Endpoint: `POST /api/ai/chat`

Handles multi-turn conversational inquiries regarding hotel facilities, rooms, policies, location, and bookings.

### Request Headers
```http
Content-Type: application/json
```

### Request Body Schema
```typescript
interface ChatRequest {
  message: string;             // Required: 1 to 1,000 characters
  conversationId?: string;     // Optional: Safe alphanumeric / UUID session key (8-64 chars)
  language?: "en" | "ar" | "de" | "fr" | "es" | "auto"; // Default: "auto"
}
```

### Example Request (English)
```json
{
  "message": "What room types are available and what is in the Deluxe Double Room?",
  "language": "auto"
}
```

### Successful Response (200 OK)
```json
{
  "success": true,
  "conversationId": "cleo-m3h9k1-04a2",
  "detectedLanguage": "en",
  "intent": "room_info",
  "response": "Welcome to Grand Cleopatra Hotel, Luxor. Based on our verified records:\n\nGrand Cleopatra Hotel offers three verified room categories: 1) Deluxe Double Room ($48/night, 28 m², max 2 guests, King or 2 Twin beds, en-suite bathroom), 2) Triple Room ($65/night, 36 m², max 3 guests, 3 beds, mountain views, en-suite bathroom), and 3) Single Room with Terrace ($38/night, 22 m², 1 guest, private outdoor sun terrace with hot air balloon views). All stays include complimentary rooftop Egyptian breakfast and free Wi-Fi.\n\nFor real-time availability, customized excursions, or direct inquiries, please reach out to our 24/7 front desk team on WhatsApp: +20 100 345 6789.",
  "source": "fallback_engine",
  "confidence": "high",
  "retrievedKnowledgeIds": [
    "hotel-rooms-overview",
    "room-deluxe-double",
    "room-triple"
  ],
  "requiresHumanConfirmation": false,
  "whatsappHandoff": {
    "phone": "+201003456789",
    "displayPhone": "+20 100 345 6789",
    "link": "https://wa.me/201003456789?text=Hello%20Grand%20Cleopatra%20Hotel...",
    "message": "Direct assistance from Grand Cleopatra front desk"
  }
}
```

### Example Follow-up Request (Preserving Context)
```json
{
  "message": "Does it have a private terrace?",
  "conversationId": "cleo-m3h9k1-04a2"
}
```

### Example Request (Arabic)
```json
{
  "message": "ما هي مواعيد تسجيل الوصول والمغادرة في فندق كليوباترا؟"
}
```

---

## 4. Travel Planner Endpoint: `POST /api/ai/planner`

Generates personalized, bank-grouped, heat-aware Luxor itineraries.

### Request Body Schema
```typescript
interface PlannerRequest {
  days: number;                // Required: Integer 1 to 7
  interests: string[];         // Required: Array of 1 to 10 interests (e.g. "ancient_history", "balloons", "photography")
  pace?: "relaxed" | "moderate" | "intensive"; // Default: "moderate"
  budget?: "budget" | "standard" | "luxury";   // Default: "standard"
  travelers?: number;          // Default: 2
  startingLocation?: string;   // Default: "Grand Cleopatra Hotel (West Bank, Luxor)"
  transportPreference?: "walking_ferry" | "private_driver" | "taxi" | "any";
  specialRequirements?: string;// Max 500 characters
  language?: "en" | "ar" | "de" | "fr" | "es" | "auto";
}
```

### Example Request (3-Day Moderate Itinerary)
```json
{
  "days": 3,
  "interests": ["ancient_history", "balloons", "photography"],
  "pace": "moderate",
  "budget": "standard",
  "travelers": 2,
  "language": "en"
}
```

### Successful Response (200 OK)
```json
{
  "success": true,
  "itinerary": {
    "itineraryId": "luxor-itin-m3h9kz-8f1b",
    "title": "3-Day Curated Luxor Itinerary - Grand Cleopatra Hotel",
    "destination": "Luxor, Egypt",
    "daysCount": 3,
    "pace": "moderate",
    "budget": "standard",
    "startingPoint": "Grand Cleopatra Hotel (West Bank, Luxor)",
    "days": [
      {
        "dayNumber": 1,
        "theme": "Theban Royal Tombs & West Bank Heritage",
        "bankFocus": "West Bank",
        "nileCrossings": 0,
        "heatAdvisory": "Midday Heat Notice: Upper Egypt sun is strongest between 11:30 AM and 03:30 PM...",
        "morning": {
          "id": "attraction-valley-of-the-kings",
          "name": "Valley of the Kings",
          "bank": "West Bank",
          "timeSlot": "07:00 AM - 10:30 AM",
          "estimatedDuration": "2.5 hours",
          "description": "The legendary royal necropolis of the New Kingdom pharaohs...",
          "practicalTip": "Standard general admission ticket includes entry to three open tombs...",
          "verified": true
        },
        "middayLunch": {
          "recommendation": "Grand Cleopatra rooftop shaded lounge or authentic West Bank garden eatery",
          "notes": "Enjoy fresh Egyptian mezze, local tagines, fresh seasonal fruits, and chilled karkadeh."
        },
        "afternoon": {
          "id": "attraction-medinet-habu",
          "name": "Medinet Habu",
          "bank": "West Bank",
          "timeSlot": "02:30 PM - 04:30 PM",
          "estimatedDuration": "2 hours",
          "verified": true
        },
        "sunsetEvening": {
          "id": "attraction-colossi-of-memnon",
          "name": "Colossi of Memnon",
          "bank": "West Bank",
          "timeSlot": "05:00 PM - 07:30 PM",
          "estimatedDuration": "0.5 hours",
          "verified": true
        },
        "logisticsAdvice": "All sites today are on the West Bank close to Grand Cleopatra Hotel..."
      },
      {
        "dayNumber": 2,
        "theme": "East Bank Wonders: Karnak & Illuminated Luxor Temple",
        "bankFocus": "East Bank",
        "nileCrossings": 2,
        "morning": { "id": "attraction-karnak-temple", "name": "Karnak Temple Complex" },
        "afternoon": { "id": "attraction-luxor-museum", "name": "Luxor Museum of Ancient Art" },
        "sunsetEvening": { "id": "attraction-luxor-temple", "name": "Luxor Temple" }
      },
      {
        "dayNumber": 3,
        "theme": "Sunrise Balloon Over Theban Hills & Hatshepsut",
        "bankFocus": "West Bank",
        "nileCrossings": 0,
        "morning": { "id": "attraction-hot-air-balloon", "name": "Luxor Sunrise Hot Air Balloon" },
        "afternoon": { "id": "attraction-hatshepsut-temple", "name": "Temple of Hatshepsut (Deir el-Bahari)" },
        "sunsetEvening": { "id": "attraction-nile-felucca", "name": "Traditional Nile Felucca Sunset Sail" }
      }
    ],
    "estimatedDurations": {
      "totalSightseeingHours": 18,
      "dailyAvgHours": 6
    },
    "travelNotes": [
      "Selected travel budget category: standard.",
      "Grand Cleopatra reception can arrange trusted private air-conditioned drivers for West Bank excursions."
    ],
    "uncertaintyFlags": [
      "Official monument entry fees are set by the Egyptian Ministry of Tourism and Antiquities (MoTA) and subject to official updates.",
      "Special tombs (King Tutankhamun, Seti I, Queen Nefertari) require separate supplemental tickets purchased on site."
    ],
    "budgetClassification": "Standard Category: Balanced combination of comfortable local West Bank transport and verified standard admissions.",
    "language": "en",
    "verificationStatus": "verified_attractions_grounded",
    "source": "cleopatra_travel_engine"
  }
}
```

---

## 5. Error Responses & Status Codes

All errors conform to a normalized JSON envelope:

```json
{
  "success": false,
  "error": "Human readable error description",
  "code": "ERROR_CODE",
  "retryAfterMs": 42000
}
```

| HTTP Status | Error Code | Trigger Condition |
| :--- | :--- | :--- |
| `400 Bad Request` | `AI_VALIDATION_ERROR` | Missing or invalid request parameters (e.g. days > 7, empty message). |
| `400 Bad Request` | `AI_INJECTION_DETECTED` | Prompt injection, jailbreak attempt, or directive override. |
| `400 Bad Request` | `EMPTY_MESSAGE` | Message contains only whitespace or stripped HTML tags. |
| `429 Too Many Requests` | `AI_RATE_LIMIT` | Request quota exceeded (Retry-After header returned). |
| `500 Server Error` | `INTERNAL_AI_ERROR` | Unexpected runtime error. |

