import type { Metadata } from "next";
import { Montserrat, Cinzel } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingBookBar from "@/components/layout/FloatingBookBar";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://grandcleopatrahotelux.com"),
  title: {
    default: "Grand Cleopatra Hotel | Authentic Luxury on the West Bank, Luxor, Egypt",
    template: "%s | Grand Cleopatra Hotel Luxor",
  },
  description:
    "Experience authentic Egyptian hospitality at Grand Cleopatra Hotel in Luxor, Egypt. Spectacular views of the Nile and Theban Hills, rooftop dining, comfortable rooms & suites, minutes from Valley of the Kings.",
  keywords: [
    "Grand Cleopatra Hotel",
    "Grand Cleopatra Luxor",
    "Hotel in Luxor",
    "Luxor West Bank Hotel",
    "Valley of the Kings Hotel",
    "Luxor Egypt Accommodation",
    "Deluxe Double Room Luxor",
    "Egypt boutique hotel",
  ],
  authors: [{ name: "Grand Cleopatra Hotel Luxor" }],
  openGraph: {
    title: "Grand Cleopatra Hotel | Luxury on the West Bank, Luxor",
    description:
      "Stay in the heart of ancient Thebes with tranquil Nile views, authentic Egyptian cuisine, and personalized excursions.",
    url: "https://grandcleopatrahotelux.com",
    siteName: "Grand Cleopatra Hotel Luxor",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/images/brand/grand-cleopatra-seal.jpg",
    apple: "/images/brand/grand-cleopatra-seal.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${cinzel.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-ivory text-navy antialiased selection:bg-gold selection:text-white">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <FloatingBookBar />
      </body>
    </html>
  );
}
