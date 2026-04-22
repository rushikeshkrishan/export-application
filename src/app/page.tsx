import Hero from "@/components/home/Hero";
import AboutPreview from "@/components/home/AboutPreview";
import JourneyTimeline from "@/components/home/JourneyTimeline";
import ProductsPreview from "@/components/home/ProductsPreview";
import Certificates from "@/components/home/Certificates";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import GlobalReach from "@/components/home/GlobalReach";
import Testimonials from "@/components/home/Testimonials";
import ExplodedViewProcess from "@/components/home/ExplodedViewProcess";

export default function Home() {
  return (
    <div className="w-full relative">
      <Hero />
      <WhyChooseUs />
      <ExplodedViewProcess />
      <AboutPreview />
      <ProductsPreview />
      <GlobalReach />
      <Testimonials />
      <JourneyTimeline />
      <Certificates />
    </div>
  );
}
