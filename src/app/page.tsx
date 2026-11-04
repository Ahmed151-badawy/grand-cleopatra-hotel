import Hero from "@/components/home/Hero";
import HotelIntro from "@/components/home/HotelIntro";
import FeaturedRooms from "@/components/home/FeaturedRooms";
import FacilitiesHighlight from "@/components/home/FacilitiesHighlight";
import GalleryPreview from "@/components/home/GalleryPreview";
import Testimonials from "@/components/home/Testimonials";
import AIPlannerBanner from "@/components/home/AIPlannerBanner";
import LocationPreview from "@/components/home/LocationPreview";
import CtaBanner from "@/components/home/CtaBanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HotelIntro />
      <FeaturedRooms />
      <FacilitiesHighlight />
      <GalleryPreview />
      <AIPlannerBanner />
      <Testimonials />
      <LocationPreview />
      <CtaBanner />
    </>
  );
}
