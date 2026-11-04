export interface RoomAmenity {
  name: string;
  icon: string;
}

export interface Room {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  pricePerNight: number;
  originalPrice?: number;
  currency: string;
  sizeSqm: number;
  sizeSqft: number;
  maxGuests: number;
  bedType: string;
  view: string;
  floor: string;
  heroImage: string;
  images: string[];
  description: string;
  longDescription: string;
  features: string[];
  amenities: RoomAmenity[];
  highlights: string[];
  badge?: string;
  popular?: boolean;
}

export const rooms: Room[] = [
  {
    id: "deluxe-double",
    slug: "deluxe-double-room",
    name: "Deluxe Double Room",
    tagline: "Elegance & Serene Comfort for Couples & Companions",
    pricePerNight: 48,
    originalPrice: 60,
    currency: "USD",
    sizeSqm: 28,
    sizeSqft: 301,
    maxGuests: 2,
    bedType: "1 Extra-Large Double Bed (King) or 2 Twin Beds",
    view: "Nile River & Lush Palm Garden View",
    floor: "1st & 2nd Floors",
    heroImage: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=85",
    ],
    description:
      "Crafted with refined Egyptian warmth, the Deluxe Double Room boasts plush bedding, an elegant private ensuite bathroom, and gentle breezes from the West Bank gardens.",
    longDescription:
      "Our signature Deluxe Double Room is tailored for travelers seeking tranquility after an inspiring day wandering the Valley of the Kings and Karnak. Thoughtfully furnished with traditional Egyptian wooden accents and modern comforts, this room features your choice of an extra-large king bed or two twin beds dressed in high-thread-count Egyptian cotton linens. Enjoy a sparkling en-suite bathroom with walk-in rain shower, silent climate control, a stocked minibar, and views across the tranquil green gardens of Al Bairat.",
    popular: true,
    badge: "Most Popular",
    features: [
      "Egyptian cotton linens & luxury pillows",
      "Private en-suite bathroom with walk-in rain shower",
      "Silent individual climate control (A/C & heating)",
      "Flat-screen satellite television",
      "Electric kettle with complimentary tea & coffee selection",
      "Stocked minibar refrigerator",
      "Laptop-friendly workspace desk & vanity mirror",
      "Soundproofing for a restful night's sleep",
    ],
    amenities: [
      { name: "Free High-Speed Wi-Fi", icon: "Wifi" },
      { name: "Air Conditioning", icon: "AirVent" },
      { name: "Private En-Suite Bath", icon: "Bath" },
      { name: "Flat-Screen TV", icon: "Tv" },
      { name: "Tea & Coffee Maker", icon: "Coffee" },
      { name: "Daily Housekeeping", icon: "Sparkles" },
      { name: "Free Toiletries & Towels", icon: "CheckCircle" },
      { name: "Room Service", icon: "Bell" },
    ],
    highlights: [
      "Signature Egyptian cotton sheets",
      "Peaceful garden & Nile glimpse views",
      "Complimentary Egyptian rooftop breakfast included",
      "Flexible bedding: 1 King or 2 Twins",
    ],
  },
  {
    id: "triple-room",
    slug: "triple-room",
    name: "Triple Room",
    tagline: "Spacious Sanctuary for Families & Small Groups",
    pricePerNight: 65,
    originalPrice: 80,
    currency: "USD",
    sizeSqm: 36,
    sizeSqft: 388,
    maxGuests: 3,
    bedType: "3 Single Beds or 1 Double Bed + 1 Single Bed",
    view: "Theban Mountains & Scenic Village View",
    floor: "1st & 2nd Floors",
    heroImage: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=85",
    ],
    description:
      "A generous layout designed for friends and family travelling together, offering three comfortable beds, a cozy sitting nook, and sweeping vistas toward the ancient Theban hills.",
    longDescription:
      "The Triple Room provides ample space and comfort for groups and families exploring Luxor together. Spanning over 36 square meters, it comfortably accommodates three guests with versatile bedding configurations. The bright, naturally lit space features large windows overlooking the peaceful rural West Bank landscape with the dramatic silhouette of the Theban Necropolis in the distance. Complete with a large modern bathroom, wardrobe storage, and complimentary breakfast on our rooftop.",
    badge: "Family Favorite",
    features: [
      "Generous 36 m² floor plan with sitting area",
      "Comfortable arrangement of 3 beds or 1 double + 1 single",
      "Spacious en-suite bathroom with hot water around the clock",
      "Spacious wardrobe and luggage storage",
      "Individual air conditioning and heating",
      "Complimentary bottled water replenished daily",
      "Electric kettle with tea, Nescafé, and herbal infusions",
      "Hairdryer and plush bath towels",
    ],
    amenities: [
      { name: "Free High-Speed Wi-Fi", icon: "Wifi" },
      { name: "Air Conditioning", icon: "AirVent" },
      { name: "Private En-Suite Bath", icon: "Bath" },
      { name: "Seating Area", icon: "Armchair" },
      { name: "Wardrobe / Closet", icon: "Folder" },
      { name: "Tea & Coffee Maker", icon: "Coffee" },
      { name: "Daily Housekeeping", icon: "Sparkles" },
      { name: "Hairdryer & Linens", icon: "Wind" },
    ],
    highlights: [
      "Extra room for 3 adults or family with child",
      "Stunning views of the Theban Mountain silhouette",
      "Complimentary Egyptian rooftop breakfast included",
      "Luggage storage and laundry service available",
    ],
  },
  {
    id: "single-terrace",
    slug: "single-room-with-terrace",
    name: "Single Room with Terrace",
    tagline: "Private Rooftop Solitude & Panoramic Vistas",
    pricePerNight: 38,
    originalPrice: 48,
    currency: "USD",
    sizeSqm: 22,
    sizeSqft: 237,
    maxGuests: 1,
    bedType: "1 Large Single Bed (Super Single)",
    view: "Panoramic West Bank Terrace & Mountain View",
    floor: "Top Floor",
    heroImage: "https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=85",
    ],
    description:
      "A peaceful private sanctuary featuring an exclusive walk-out sun terrace overlooking the date palms, village rooftops, and the sunset over the West Bank of Luxor.",
    longDescription:
      "Cherished by solo adventurers, writers, and cultural travelers, our Single Room with Terrace is a gem of tranquility. Situated on the upper floor, its standout feature is the private open-air terrace furnished with traditional outdoor seating and table. Sit here at sunrise to watch colorful hot air balloons float quietly across the morning sky, or unwind under the Luxor stars with fresh mint tea. Inside, you'll find an exceptionally cozy single bed, dedicated work desk, en-suite bathroom, and fast Wi-Fi.",
    badge: "Solo Gem",
    features: [
      "Private outdoor sun terrace with table & seating",
      "Breathtaking view of morning hot air balloons & sunset",
      "Plush single bed with premium Egyptian cotton bedding",
      "En-suite private bathroom with hot shower",
      "Silent individual climate control (A/C)",
      "Dedicated writing desk with reading light",
      "Electric kettle with complimentary tea & coffee",
      "Full privacy on the upper hotel level",
    ],
    amenities: [
      { name: "Private Outdoor Terrace", icon: "Sun" },
      { name: "Free High-Speed Wi-Fi", icon: "Wifi" },
      { name: "Air Conditioning", icon: "AirVent" },
      { name: "Private En-Suite Bath", icon: "Bath" },
      { name: "Hot Air Balloon View", icon: "Compass" },
      { name: "Writing Desk", icon: "Laptop" },
      { name: "Tea & Coffee Maker", icon: "Coffee" },
      { name: "Daily Housekeeping", icon: "Sparkles" },
    ],
    highlights: [
      "Exclusive private terrace with outdoor seating",
      "Perfect vantage point for morning hot air balloon flights",
      "Complimentary Egyptian rooftop breakfast included",
      "Ideal for solo travelers, researchers, and remote workers",
    ],
  },
];

export function getRoomBySlug(slug: string): Room | undefined {
  return rooms.find((room) => room.slug === slug);
}

