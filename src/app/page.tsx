import Hero from "@/components/home/Hero";
import AboutPreview from "@/components/home/AboutPreview";
import JourneyTimeline from "@/components/home/JourneyTimeline";
import ProductsPreview from "@/components/home/ProductsPreview";
import Certificates from "@/components/home/Certificates";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import GlobalReach from "@/components/home/GlobalReach";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <div className="w-full relative">
      <Hero />
      <WhyChooseUs />
      <AboutPreview />
      <ProductsPreview />
      <GlobalReach />
      <Testimonials />
      <JourneyTimeline />
      <Certificates />
    </div>
  );
}

