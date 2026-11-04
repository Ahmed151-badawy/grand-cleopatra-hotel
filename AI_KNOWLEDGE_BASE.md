# Cleopatra AI — Knowledge Base Specification
**Grand Cleopatra Hotel, Luxor, Egypt**

---

## 1. Grounding Philosophy

Cleopatra AI enforces a **strict non-hallucination policy**:
- Every hotel fact must originate from [`src/data/ai/hotel-knowledge.json`](file:///f:/Grand%20Cleoptra/src/data/ai/hotel-knowledge.json).
- Every tourist monument fact must originate from [`src/data/ai/luxor-attractions.json`](file:///f:/Grand%20Cleoptra/src/data/ai/luxor-attractions.json).
- The AI never invents room availability, dynamic seasonal prices, fictitious monuments, or custom group confirmations.
- Any request requiring owner confirmation automatically triggers an explicit disclaimer and hands off to the front desk WhatsApp (`+20 100 345 6789`).

---

## 2. Knowledge Schema Specification

### 2.1 Hotel Knowledge Record
```typescript
interface KnowledgeRecord {
  id: string;                               // Unique identifier (e.g. "room-deluxe-double")
  category: "identity" | "location" | "rooms" | "dining" | "services" | "policies";
  title: string;                            // Descriptive topic title
  content: string;                          // Verified factual statement
  language: string;                         // Canonical language of content ("en")
  keywords: string[];                       // Multilingual retrieval triggers (EN, AR, DE, FR, ES)
  source: "hotel_records" | "official_booking_listing";
  verificationStatus: "verified" | "unverified" | "owner_confirmation_required";
  lastVerified: string;                     // ISO Date string (YYYY-MM-DD)
  ownerConfirmationRequired: boolean;       // Flag triggering mandatory management warning banner
}
```

### 2.2 Luxor Attraction Record
```typescript
interface AttractionRecord {
  id: string;                               // Unique identifier (e.g. "attraction-valley-of-the-kings")
  category: "attraction";
  name: string;                             // Official monument name
  bank: "West Bank" | "East Bank" | "West Bank / East Bank River";
  distanceFromHotelKm: number;              // Distance from Grand Cleopatra Hotel
  travelTimeFromHotel: string;              // Typical transit time
  suggestedDurationHours: number;           // Recommended on-site visit time
  bestTimeOfDay: string;                    // Pacing advice (e.g. "Early Morning 06:00 - 08:30 AM")
  description: string;                      // Verified archaeological and historical summary
  practicalTips: string;                    // Ticketing and visit guidance
  keywords: string[];                       // Multilingual search keywords
  source: "egyptian_ministry_tourism";
  verificationStatus: "verified";
  lastVerified: string;
  ownerConfirmationRequired: boolean;
}
```

---

## 3. Audited Hotel Records Inventory (19 Records)

| Record ID | Category | Title | Verification Status | Source | Owner Confirmation |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `hotel-identity` | `identity` | Hotel Name, Heritage & Brand | `verified` | `hotel_records` | No |
| `hotel-contact-reception` | `identity` | Reception & Contact Details | `verified` | `hotel_records` | No |
| `hotel-location-ferry` | `location` | West Bank Location & Nile Ferry Access | `verified` | `official_booking_listing` | No |
| `hotel-location-monuments` | `location` | Proximity to Ancient Theban Monuments | `verified` | `official_booking_listing` | No |
| `hotel-rooms-overview` | `rooms` | Available Room Types & Suites Overview | `verified` | `official_booking_listing` | No |
| `room-deluxe-double` | `rooms` | Deluxe Double Room ($48/night base) | `verified` | `official_booking_listing` | No |
| `room-triple` | `rooms` | Triple Room ($65/night base) | `verified` | `official_booking_listing` | No |
| `room-single-terrace` | `rooms` | Single Room with Terrace ($38/night base) | `verified` | `official_booking_listing` | No |
| `amenity-breakfast` | `dining` | Rooftop Complimentary Egyptian Breakfast | `verified` | `hotel_records` | No |
| `amenity-rooftop-terrace` | `dining` | Panoramic Nile & Theban Mountain Rooftop Terrace | `verified` | `hotel_records` | No |
| `amenity-garden-courtyard` | `facilities` | Traditional Palm Garden Courtyard | `verified` | `hotel_records` | No |
| `amenity-swimming-pool` | `facilities` | Explicit Policy: NO Swimming Pool on Site | `verified` | `hotel_records` | No |
| `amenity-wifi` | `facilities` | Complimentary High-Speed Wi-Fi | `verified` | `hotel_records` | No |
| `services-transfers` | `services` | Airport & Railway Station Private Transfers ($20 USD) | `verified` | `official_booking_listing` | No |
| `services-tours` | `services` | Local Sightseeing & Hot Air Balloon Coordination | `verified` | `hotel_records` | No |
| `policies-checkin-checkout` | `policies` | Check-in (14:00) & Check-out (12:00) Times | `verified` | `hotel_records` | No |
| `policies-pets-smoking` | `policies` | No Pets & Non-Smoking Room Policy | `verified` | `hotel_records` | No |
| `policies-groups-events` | `policies` | Group Bookings, Private Hire & Rooftop Events | `owner_confirmation_required` | `hotel_records` | **YES** |
| `reservation-live-availability` | `policies` | Real-Time Availability & Booking Guardrail | `verified` | `hotel_records` | No |

---

## 4. Audited Luxor Attractions Inventory (10 Records)

| Attraction ID | Name | Bank | Distance from Hotel | Suggested Duration | Best Time to Visit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `attraction-valley-of-the-kings` | Valley of the Kings | West Bank | 5.8 km | 2.5 hrs | Early Morning (06:00 - 08:30 AM) |
| `attraction-hatshepsut-temple` | Temple of Hatshepsut (Deir el-Bahari) | West Bank | 6.1 km | 1.5 hrs | Morning (07:30 - 09:30 AM) |
| `attraction-colossi-of-memnon` | Colossi of Memnon | West Bank | 2.4 km | 0.5 hrs | Morning or Late Afternoon (Free 24/7) |
| `attraction-medinet-habu` | Medinet Habu (Ramesses III) | West Bank | 3.5 km | 2.0 hrs | Morning or Late Afternoon (Vivid Colors) |
| `attraction-valley-of-the-queens` | Valley of the Queens | West Bank | 4.8 km | 1.5 hrs | Morning (08:00 - 11:00 AM) |
| `attraction-karnak-temple` | Karnak Temple Complex | East Bank | 4.8 km | 3.0 hrs | Early Morning or Late Afternoon |
| `attraction-luxor-temple` | Luxor Temple | East Bank | 1.8 km | 2.0 hrs | Sunset & Evening (Open until 22:00) |
| `attraction-luxor-museum` | Luxor Museum of Ancient Art | East Bank | 2.5 km | 2.0 hrs | Midday (10:00 - 13:00, Air-conditioned) |
| `attraction-hot-air-balloon` | Luxor Sunrise Hot Air Balloon | West Bank | 1.2 km (launch pad) | 2.0 hrs | Dawn (04:30 - 06:00 AM departure) |
| `attraction-nile-felucca` | Traditional Nile Felucca Sunset Sail | West / East Bank | 0.25 km (hotel dock) | 1.5 hrs | Late Afternoon / Golden Hour Sunset |

---

## 5. Maintenance & Update Protocols

### Updating Hotel Room Rates
When modifying base room rates in `hotel-knowledge.json`:
1. Update `content` in the respective room record (`room-deluxe-double`, `room-triple`, `room-single-terrace`).
2. Update the corresponding summary in `hotel-rooms-overview`.
3. Update `lastVerified` to the current date.
4. Run `npm run test:ai` and `npm run test:ai:phases` to confirm all tests pass.

### Adding New Records
- Ensure `ownerConfirmationRequired` is set to `true` if management approval is needed for the requested service.
- Add relevant keywords in English, Arabic, German, French, and Spanish to ensure high multilingual retrieval scores.
- Never add unverifiable claims (e.g. "beach access", "heated pool", "free international flights").
