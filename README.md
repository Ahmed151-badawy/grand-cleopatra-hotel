# Grand Cleopatra Hotel – Luxor, Egypt

A bespoke, production-ready luxury hotel web application built for **Grand Cleopatra Hotel**, situated on the serene West Bank of Luxor, Egypt.

Official Domain: [https://grandcleopatrahotelux.com](https://grandcleopatrahotelux.com)

---

## 🏛️ Project Overview

The **Grand Cleopatra Hotel** website delivers an authentic Egyptian hospitality experience crafted with modern web architecture. Located in Gezira El Bairat, minutes from the world-renowned Valley of the Kings, Temple of Hatshepsut, and Colossi of Memnon, the hotel offers a tranquil sanctuary away from the city bustle of Luxor's East Bank.

This project is built from scratch as a portfolio-grade, production-ready full-stack web application suitable for deployment on Vercel, Netlify, or custom cloud infrastructure.

---

## ✨ Key Features & Pages

1. **Homepage (`/`)**:
   - Immersive hero section with panoramic Luxor imagery and dynamic booking availability search bar.
   - Hotel heritage narrative (welcoming global travelers since 1975).
   - Featured rooms showcase with pricing, specifications, and amenity highlights.
   - Amenities & facilities preview (rooftop dining, breakfast, Nile boat trips, excursions).
   - Interactive photo gallery preview with modal lightbox.
   - Verified guest testimonials with international flags and 9.2/10 Booking.com score.
   - West Bank location preview with proximity to ancient monuments.
   - Direct booking incentives and reservation CTA banner.

2. **About Us (`/about`)**:
   - The story of Grand Cleopatra Hotel and decades of hospitality on the West Bank.
   - The West Bank advantage: peaceful village atmosphere, date palm orchards, and close proximity to royal tombs.
   - Core hotel values: Guest-first care, cleanliness, authentic home cooking, and 24/7 reception.

3. **Rooms & Suites (`/rooms`)**:
   - Comprehensive overview of all room categories from the hotel's Booking.com listing:
     - **Deluxe Double Room** ($48/night, 28 m², 2 guests, King or 2 Twin beds, en-suite bath).
     - **Triple Room** ($65/night, 36 m², 3 guests, versatile bedding, mountain views).
     - **Single Room with Terrace** ($38/night, 22 m², 1 guest, private outdoor sun terrace with hot air balloon views).
   - Side-by-side room comparison table.
   - Direct booking benefits and cancellation policies.

4. **Room Details (`/rooms/[slug]`)**:
   - Dynamic pages for `/rooms/deluxe-double-room`, `/rooms/triple-room`, and `/rooms/single-room-with-terrace`.
   - Interactive photo gallery switcher with thumbnail selection.
   - Full floor area, capacity, bed types, and in-room amenities.
   - Sticky live reservation inquiry calculator with instant nightly rate and total calculation.
   - Direct WhatsApp inquiry button pre-filled with the room title.
   - Related rooms carousel.

5. **Facilities & Services (`/facilities`)**:
   - In-depth presentation of hotel offerings:
     - Panoramic Rooftop Restaurant & Café (360° views of Nile & Theban mountains).
     - Complimentary Egyptian & Continental Breakfast (ful medames, falafel, fresh bread).
     - Luxor Tours & Private Excursions Desk (licensed Egyptologist guides).
     - Sunrise Hot Air Balloon flight arrangements.
     - Nile Sunset Felucca sailboat cruises.
     - Airport (LXR) & Railway Station private transfers.
     - Bicycle and countryside rentals.
     - 24/7 concierge, luggage storage, and high-speed Wi-Fi.

6. **Photo Gallery (`/gallery`)**:
   - Categorized filter tabs: *All Photos*, *Rooms & Suites*, *Rooftop & Dining*, *Views & Sunsets*, *Ancient Luxor & Nile*.
   - Interactive full-screen lightbox modal with image counter, captions, and keyboard navigation (`←`, `→`, `Esc`).

7. **Location & Area Guide (`/location`)**:
   - Detailed West Bank guide and exact coordinates (25.6989° N, 32.6321° E).
   - Exact travel distances to Colossi of Memnon (5 mins), Medinet Habu (7 mins), Hatshepsut (10 mins), Valley of the Kings (12 mins), and local ferry (3-minute walk).
   - Arrival directions from Luxor Airport, Railway Station, and Nile Cruise piers.
   - Google Maps navigation link.

8. **Contact Us (`/contact`)**:
   - Contact channels: 24/7 direct telephone, instant WhatsApp link, and reservations email.
   - Form built with React Hook Form and validated with Zod.
   - Interactive accordion FAQ answering guest questions regarding transfers, visas, currency, and dietary options.

9. **Reservation Inquiry Wizard (`/reservation`)**:
   - Multi-step interactive booking wizard:
     - **Step 1**: Dates, guest counts (adults, children), and room selection.
     - **Step 2**: Add-on experiences (airport pickup, sunrise balloon, guided tour, felucca, half-board dinner).
     - **Step 3**: Primary guest contact information and special requests.
     - **Step 4**: Instant summary with generated booking reference (`#GC-2026-XXXX`), estimated totals in USD & EGP, and one-click WhatsApp dispatch to the front desk.

---

## 🎨 Brand Identity & Design System

- **Color Palette**:
  - Deep Navy: `#101B35`
  - Royal Blue: `#1677B8`
  - Gold: `#D99A35` (Accents: `#F3B95F`, `#B67C21`)
  - Ivory / Sand: `#F8F5EF` / `#EDE6D8`
  - Crisp White: `#FFFFFF`
- **Typography**:
  - Primary Body & Headings: `Montserrat` (Google Fonts)
  - Display Serifs: `Cinzel` (Google Fonts)
- **Authentic Brand Assets**:
  - `grand-cleopatra-seal.jpg`: Official circular brand seal.
  - `grand-cleopatra-logo.jpg`: Full emblem with Cleopatra, pyramids, obelisk, and ankhs.
  - `cleopatra-hotel-vintage.png`: Vintage heritage badge ("Cleopatra Hotel Since 1975").

---

## 🛠️ Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack, Partial Prerendering)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation & Transitions**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Form Management**: [React Hook Form](https://react-hook-form.com/)
- **Schema Validation**: [Zod](https://zod.dev/)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17+ or 20+ (tested on Node v24.12.0)
- npm or pnpm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/grand-cleopatra-hotel.git

# Enter the project directory
cd grand-cleopatra-hotel

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Production Build

```bash
npm run build
npm run start
```

---

## 📄 License & Attribution

Designed and engineered for **Grand Cleopatra Hotel**, Luxor, Egypt.  
© 2026 Grand Cleopatra Hotel Luxor. All rights reserved.
