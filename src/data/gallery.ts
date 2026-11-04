export interface GalleryItem {
  id: string;
  title: string;
  category: "rooms" | "dining" | "views" | "luxor";
  categoryLabel: string;
  image: string;
  description: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Deluxe Double Room Interior",
    category: "rooms",
    categoryLabel: "Rooms & Suites",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85",
    description: "Crisp Egyptian cotton linens and peaceful ambiance in our Deluxe Double Room.",
  },
  {
    id: "gal-2",
    title: "Panoramic Rooftop Terrace at Dusk",
    category: "dining",
    categoryLabel: "Rooftop & Dining",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85",
    description: "Relaxing with Egyptian mint tea as twilight descends over ancient Thebes.",
  },
  {
    id: "gal-3",
    title: "Sunrise Hot Air Balloons over the Valley",
    category: "views",
    categoryLabel: "Views & Sunsets",
    image: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=1200&q=85",
    description: "Breathtaking view of morning hot air balloons visible right from our upper terrace.",
  },
  {
    id: "gal-4",
    title: "Triple Room Comfort",
    category: "rooms",
    categoryLabel: "Rooms & Suites",
    image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=85",
    description: "Spacious layout with multiple comfortable beds ideal for families and friends.",
  },
  {
    id: "gal-5",
    title: "Traditional Egyptian Breakfast Spread",
    category: "dining",
    categoryLabel: "Rooftop & Dining",
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1200&q=85",
    description: "Fresh falafel, ful medames, local baladi bread, cheeses, and fruits served daily.",
  },
  {
    id: "gal-6",
    title: "Single Room Private Sun Terrace",
    category: "rooms",
    categoryLabel: "Rooms & Suites",
    image: "https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=1200&q=85",
    description: "Private outdoor sun terrace with panoramic vistas over the West Bank date palms.",
  },
  {
    id: "gal-7",
    title: "The Pillars of Karnak Temple",
    category: "luxor",
    categoryLabel: "Ancient Luxor & Nile",
    image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1200&q=85",
    description: "The awe-inspiring Great Hypostyle Hall of Karnak, easily reached via our tour desk.",
  },
  {
    id: "gal-8",
    title: "Sailing the Nile on a Traditional Felucca",
    category: "luxor",
    categoryLabel: "Ancient Luxor & Nile",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85",
    description: "Peaceful afternoon sail down the Nile River arranged directly from our private dock.",
  },
  {
    id: "gal-9",
    title: "Golden Sunset over the Theban Mountains",
    category: "views",
    categoryLabel: "Views & Sunsets",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=85",
    description: "The sunset glow over the limestone peaks guarding the tombs of the Pharaohs.",
  },
  {
    id: "gal-10",
    title: "Colossi of Memnon Monumental Statues",
    category: "luxor",
    categoryLabel: "Ancient Luxor & Nile",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=85",
    description: "Located just 5 minutes from Grand Cleopatra Hotel on the West Bank.",
  },
  {
    id: "gal-11",
    title: "En-suite Bathroom & Modern Amenities",
    category: "rooms",
    categoryLabel: "Rooms & Suites",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85",
    description: "Immaculate private en-suite bathrooms equipped with hot showers and fresh towels.",
  },
  {
    id: "gal-12",
    title: "Evening Candlelit Dining on the Rooftop",
    category: "dining",
    categoryLabel: "Rooftop & Dining",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85",
    description: "Enjoy flavorful Egyptian dinners and friendly hospitality under the starry desert sky.",
  },
];

