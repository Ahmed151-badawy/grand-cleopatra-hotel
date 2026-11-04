export interface Facility {
  id: string;
  title: string;
  category: "Dining" | "Excursions" | "Services" | "Comfort";
  shortDescription: string;
  fullDescription: string;
  features: string[];
  image: string;
  icon: string;
  timing?: string;
  highlight?: string;
}

export const facilities: Facility[] = [
  {
    id: "rooftop-restaurant",
    title: "Panoramic Rooftop Restaurant & Café",
    category: "Dining",
    shortDescription:
      "Dine under Egyptian skies with sweeping 360° views across the River Nile and the Theban mountain range.",
    fullDescription:
      "Our crowning glory is our rooftop terrace restaurant, open from dawn till late evening. Wake up to freshly prepared Egyptian breakfast as morning hot air balloons drift silently over the horizon. In the evening, savor homemade authentic dishes—succulent tagines, grilled meats, fragrant spiced rice, and fresh salads—accompanied by hot Egyptian mint tea or freshly squeezed mango juice under a canopy of desert stars.",
    features: [
      "Open for breakfast, lunch, sunset tea, and dinner",
      "Authentic Egyptian home-style cooking using local Luxor produce",
      "Spectacular view of sunrise balloons and Nile river boats",
      "Cozy oriental cushions, traditional wooden tables, and shade canopies",
      "Vegetarian, vegan, and gluten-free dietary options available",
    ],
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85",
    icon: "Utensils",
    timing: "06:30 AM – 11:00 PM Daily",
    highlight: "Sunset Views & Mint Tea",
  },
  {
    id: "traditional-breakfast",
    title: "Complimentary Egyptian & Continental Breakfast",
    category: "Dining",
    shortDescription:
      "A hearty, fresh daily breakfast included with every stay to fuel your Pharaonic adventures.",
    fullDescription:
      "Every morning at Grand Cleopatra begins with a generous spread prepared fresh to order. Enjoy traditional Egyptian warm fava beans (ful medames) with olive oil and cumin, crispy hot falafel (taameya), fresh local baladi bread, eggs cooked your way, white cheese with tomatoes, fresh cucumber, black honey with tahini, fruit, and piping hot coffee or Egyptian mint tea.",
    features: [
      "Freshly prepared hot falafel and seasoned ful medames",
      "Eggs made to order (omelets, scrambled, or sunny-side up)",
      "Traditional Egyptian baladi bread warm from the local oven",
      "Local cheeses, fresh jams, tahina, and seasonal fruits",
      "Takeaway breakfast boxes prepared for early 04:00 AM balloon trips",
    ],
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1200&q=85",
    icon: "Coffee",
    timing: "06:30 AM – 10:30 AM (Early boxes on request)",
    highlight: "Included with All Stays",
  },
  {
    id: "tours-and-excursions",
    title: "Luxor Tours & Private Excursions Desk",
    category: "Excursions",
    shortDescription:
      "Custom private tours with certified Egyptologist guides to the Valley of the Kings, Karnak, and beyond.",
    fullDescription:
      "Let us bring ancient Thebes to life. Our front desk concierge organizes bespoke, hassle-free excursions tailored to your interests and pace. Whether you wish to explore the royal tombs of Tutankhamun and Seti I, visit the majestic mortuary temple of Queen Hatshepsut, wander the colossal hypostyle hall of Karnak, or sail the Nile on a private felucca at golden hour, we arrange air-conditioned private transportation and expert English, French, or German speaking guides.",
    features: [
      "Valley of the Kings, Valley of the Queens & Medinet Habu private tours",
      "Karnak Temple & Luxor Temple East Bank day trips",
      "Dendera & Abydos day tours by private air-conditioned car",
      "Official licensed Egyptologist guides",
      "Skip-the-line guidance and transparent pricing",
    ],
    image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1200&q=85",
    icon: "Compass",
    timing: "Concierge open 24/7",
    highlight: "Expert Egyptologists",
  },
  {
    id: "hot-air-balloon",
    title: "Hot Air Balloon Flight Arrangements",
    category: "Excursions",
    shortDescription:
      "Drift high over the temples and desert cliffs of Luxor at dawn for a once-in-a-lifetime perspective.",
    fullDescription:
      "Luxor is celebrated globally as one of the best hot air balloon destinations on Earth. We partner exclusively with fully certified, safety-first balloon operators. Our team arranges your early morning pick-up right from the hotel, safety briefing, light refreshments, and a serene 45-to-60 minute flight over the Colossi of Memnon, Hatshepsut Temple, and the green Nile agricultural ribbon.",
    features: [
      "Direct hotel door pick-up and drop-off",
      "Sunrise departure with breathtaking aerial vistas",
      "Flight certificate and celebratory toast",
      "Special discount rates exclusively for hotel guests",
      "Early breakfast box prepared for your flight",
    ],
    image: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=1200&q=85",
    icon: "Flame",
    timing: "Daily departures at dawn (approx. 04:30 AM)",
    highlight: "Guest-Exclusive Discount",
  },
  {
    id: "nile-boat-felucca",
    title: "Nile Sunset Felucca & Motorboat Sails",
    category: "Excursions",
    shortDescription:
      "Glide peacefully along the eternal River Nile on a traditional wooden sailboat at golden hour.",
    fullDescription:
      "Nothing matches the serene rhythm of sailing down the Nile with the wind in a traditional white canvas sail. Just a 3-minute walk from our doorstep is our private boat mooring. We arrange relaxing 1-to-2 hour sunset cruises to Banana Island, complete with fresh mint tea and seasonal fruits on board while the sun sinks behind the West Bank peaks.",
    features: [
      "Traditional Egyptian felucca or motorized launch options",
      "Sunset and afternoon tea sailing trips",
      "Visits to Banana Island & local riverside date orchards",
      "Private charter for couples and families",
    ],
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85",
    icon: "Ship",
    timing: "Available morning, afternoon & sunset",
    highlight: "Golden Hour on the Nile",
  },
  {
    id: "airport-transfers",
    title: "Airport & Railway Station Private Transfers",
    category: "Services",
    shortDescription:
      "Smooth, comfortable private transfers from Luxor International Airport (LXR) and Luxor Train Station.",
    fullDescription:
      "Arrive in Luxor with absolute peace of mind. Our friendly driver meets you inside or immediately outside the terminal holding a personalized sign with your name. Travel in modern, clean, air-conditioned vehicles directly to our hotel on the West Bank, avoiding taxi haggling and confusion.",
    features: [
      "Meet & greet with name placard at arrivals hall",
      "Modern air-conditioned sedans and passenger vans",
      "Flight tracking for delayed or early arrivals",
      "Fixed, honest rates with zero hidden surprises",
      "Available 24 hours a day, 7 days a week",
    ],
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=85",
    icon: "Car",
    timing: "24/7 on reservation",
    highlight: "Stress-Free Arrival",
  },
  {
    id: "bike-rentals",
    title: "Bicycle & Electric Scooter Rentals",
    category: "Services",
    shortDescription:
      "Pedal through the charming sugar cane fields and quiet village paths directly to nearby temples.",
    fullDescription:
      "The West Bank of Luxor is flat, scenic, and ideal for bicycle exploration. Ride along peaceful village lanes flanked by palm trees, visit local pottery workshops, and cycle directly to the Colossi of Memnon and Medinet Habu temple at your own leisurely pace.",
    features: [
      "Well-maintained multi-speed hybrid bicycles and city cruisers",
      "Locks, helmets, and customized local West Bank route maps provided",
      "Half-day, full-day, and multi-day rental rates",
      "Eco-friendly, authentic way to experience local rural life",
    ],
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1200&q=85",
    icon: "Bike",
    timing: "07:00 AM – 07:00 PM",
    highlight: "Scenic Countryside Routes",
  },
  {
    id: "concierge-and-wifi",
    title: "24/7 Concierge, Free Fast Wi-Fi & Services",
    category: "Comfort",
    shortDescription:
      "Attentive family-style support, high-speed fiber internet, luggage storage, and laundry services.",
    fullDescription:
      "At Grand Cleopatra Hotel, our team is committed to making you feel genuinely at home. Whether you need an Egyptian SIM card set up, restaurant recommendations across the river, laundry washed and pressed, or luggage safely stored while you take a day trip to Aswan, our 24-hour reception is always ready with a smile.",
    features: [
      "High-speed complimentary Wi-Fi across all rooms and public spaces",
      "24-hour reception and night security",
      "Quick turn-around laundry and pressing service",
      "Secure complimentary luggage holding",
      "Currency exchange assistance & local ATM guidance",
    ],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85",
    icon: "ShieldCheck",
    timing: "24 Hours / 7 Days",
    highlight: "24/7 Dedicated Care",
  },
];
