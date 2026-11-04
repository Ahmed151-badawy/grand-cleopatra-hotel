export interface HotelInfo {
  name: string;
  tagline: string;
  established: number;
  rating: number;
  reviewCount: number;
  bookingScore: string;
  phone: string;
  whatsapp: string;
  email: string;
  reservationEmail: string;
  address: {
    street: string;
    district: string;
    city: string;
    country: string;
    postalCode: string;
    full: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  social: {
    facebook: string;
    instagram: string;
    tripadvisor: string;
    booking: string;
  };
}

export const hotelInfo: HotelInfo = {
  name: "Grand Cleopatra Hotel",
  tagline: "Authentic Egyptian Hospitality on the West Bank of Luxor",
  established: 1975,
  rating: 4.8,
  reviewCount: 342,
  bookingScore: "9.2 / 10 Superb",
  phone: "+20 100 345 6789",
  whatsapp: "+201003456789",
  email: "info@grandcleopatrahotelux.com",
  reservationEmail: "reservations@grandcleopatrahotelux.com",
  address: {
    street: "Gezira El Bairat, West Bank",
    district: "Al Qarna",
    city: "Luxor",
    country: "Egypt",
    postalCode: "85951",
    full: "Gezira El Bairat, West Bank, Luxor 85951, Egypt",
  },
  coordinates: {
    lat: 25.6989,
    lng: 32.6321,
  },
  social: {
    facebook: "https://facebook.com/grandcleopatrahotel",
    instagram: "https://instagram.com/grandcleopatrahotel",
    tripadvisor: "https://tripadvisor.com",
    booking: "https://booking.com",
  },
};

export interface Testimonial {
  id: string;
  name: string;
  country: string;
  flag: string;
  rating: number;
  date: string;
  roomType: string;
  comment: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Clara & Sebastian Moreau",
    country: "France",
    flag: "🇫🇷",
    rating: 5,
    date: "February 2026",
    roomType: "Deluxe Double Room",
    comment:
      "Staying at Grand Cleopatra was the highlight of our 2-week journey across Egypt! The peaceful West Bank location is paradise compared to the hustle of the city center. Watching the hot air balloons rise over the Valley of the Kings from the rooftop while enjoying fresh Egyptian breakfast was unforgettable.",
  },
  {
    id: "2",
    name: "David H. Sterling",
    country: "United Kingdom",
    flag: "🇬🇧",
    rating: 5,
    date: "January 2026",
    roomType: "Single Room with Terrace",
    comment:
      "As a solo traveler, the Single Room with Terrace was perfection. The private terrace has sweeping views of the date palms and the Theban mountains. The hosts arranged an early morning private car to Medinet Habu and the Valley of the Queens. Hospitality at its finest!",
  },
  {
    id: "3",
    name: "Elena Rostova",
    country: "Germany",
    flag: "🇩🇪",
    rating: 5,
    date: "December 2025",
    roomType: "Triple Room",
    comment:
      "We traveled with our daughter and stayed in the Triple Room. Incredibly spacious, sparkling clean, and comfortable beds after long days exploring Luxor's ancient wonders. The rooftop dinner featuring authentic Egyptian tagines was delicious. Highly recommend!",
  },
  {
    id: "4",
    name: "Marcus & Jennifer Wright",
    country: "United States",
    flag: "🇺🇸",
    rating: 5,
    date: "March 2026",
    roomType: "Deluxe Double Room",
    comment:
      "From the airport pickup in a cool, comfortable car to the sweet mint tea on arrival, we were treated like royalty. The local ferry is just a short stroll away for visiting Luxor Temple across the Nile. Outstanding value and genuine warmth.",
  },
];

export interface Landmark {
  name: string;
  distance: string;
  timeByCar: string;
  description: string;
  icon: string;
}

export const nearbyLandmarks: Landmark[] = [
  {
    name: "Valley of the Kings",
    distance: "5.8 km",
    timeByCar: "12 mins",
    description: "The royal burial ground of pharaohs including Tutankhamun and Ramesses II.",
    icon: "Crown",
  },
  {
    name: "Colossi of Memnon",
    distance: "2.4 km",
    timeByCar: "5 mins",
    description: "Two monumental statues representing Pharaoh Amenhotep III.",
    icon: "Columns",
  },
  {
    name: "Temple of Hatshepsut (Deir el-Bahari)",
    distance: "6.1 km",
    timeByCar: "10 mins",
    description: "A masterpiece of ancient architecture cut dramatically into the cliffs.",
    icon: "Landmark",
  },
  {
    name: "Medinet Habu (Temple of Ramesses III)",
    distance: "3.5 km",
    timeByCar: "7 mins",
    description: "One of Egypt's best-preserved temple complexes with vivid painted reliefs.",
    icon: "Shield",
  },
  {
    name: "Local Nile Ferry (Al Bairat)",
    distance: "250 m",
    timeByCar: "3 min walk",
    description: "Quick 5-minute traditional ferry crossing to East Bank & Luxor Temple.",
    icon: "Ship",
  },
  {
    name: "Luxor International Airport (LXR)",
    distance: "26 km",
    timeByCar: "30 mins",
    description: "Direct seamless airport transfer service provided by the hotel.",
    icon: "Plane",
  },
];

export interface FAQ {
  question: string;
  answer: string;
  category: "General" | "Booking" | "Location" | "Tours";
}

export const faqs: FAQ[] = [
  {
    category: "Location",
    question: "Where is Grand Cleopatra Hotel located in Luxor?",
    answer:
      "We are situated in Gezira El Bairat on the peaceful West Bank of Luxor. This serene location places you just minutes from all major Pharaonic tombs and temples (Valley of the Kings, Hatshepsut, Memnon) while only a 3-minute stroll from the local ferry connecting to the East Bank (Luxor Temple, Karnak, train station).",
  },
  {
    category: "Booking",
    question: "What are the check-in and check-out times?",
    answer:
      "Standard check-in begins at 14:00 (2:00 PM), and check-out is by 12:00 (noon). We offer complimentary luggage storage. If you arrive early or have a late departure, we do our best to accommodate flexible timing based on availability.",
  },
  {
    category: "Tours",
    question: "Can the hotel arrange hot air balloon rides and temple tours?",
    answer:
      "Yes! Our dedicated concierge can organize early sunrise Hot Air Balloon flights over the Valley of the Kings, licensed Egyptologist tour guides, private air-conditioned cars, and tranquil Nile sunset felucca sails at preferred guest rates.",
  },
  {
    category: "General",
    question: "Is breakfast included in our stay?",
    answer:
      "Yes, all direct reservations include our signature Egyptian & Continental breakfast served every morning on our panoramic rooftop terrace with views across the Nile and the Theban mountains.",
  },
  {
    category: "General",
    question: "Do you offer airport or train station transfers?",
    answer:
      "Absolutely. We offer private, comfortable pick-up and drop-off services for Luxor International Airport (LXR) and the Luxor Railway Station. Simply provide your travel details during reservation or message us directly on WhatsApp.",
  },
  {
    category: "Booking",
    question: "What payment methods are accepted?",
    answer:
      "We accept major credit cards (Visa, MasterCard), cash in Egyptian Pounds (EGP), US Dollars (USD), and Euros (EUR). We also support direct reservations via our website and Booking.com.",
  },
];
