"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Users, Globe2, ShieldCheck, Leaf } from "lucide-react";
import JourneyTimeline from "@/components/home/JourneyTimeline";

export default function AboutPage() {
  const containerRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    // Parallax effect on header background
    gsap.to(".about-hero-bg", {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: ".about-hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

    // Fade in text blocks
    gsap.utils.toArray(".fade-up").forEach((el: any) => {
      gsap.fromTo(el, 
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          scrollTrigger: {
            trigger: el,
            start: "top 80%"
          }
        }
      );
    });
  }, { scope: containerRef });

  const values = [
    { icon: <Leaf size={32} />, title: "Sustainable Farming", desc: "We support fair trade and sustainable agriculture." },
    { icon: <ShieldCheck size={32} />, title: "Quality Focus", desc: "Rigorous checks ensure only the best reaches you." },
    { icon: <Globe2 size={32} />, title: "Global Reach", desc: "Exporting across 50+ countries smoothly." },
    { icon: <Users size={32} />, title: "Customer First", desc: "Dedicated support and clear communication." },
  ];

  return (
    <main ref={containerRef} className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="about-hero relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div 
          className="about-hero-bg absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=2670&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-primary/80 -z-10" />
        <div className="text-center text-white p-4 pt-20">
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-4">About Us</h1>
          <p className="text-xl max-w-2xl mx-auto text-white/80">Bridging the gap between rich, traditional agriculture and global market demands.</p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="fade-up relative rounded-2xl overflow-hidden shadow-2xl h-[500px]">
              <img 
                src="https://images.unsplash.com/photo-1509358271058-acd22cc93898?q=80&w=1500&auto=format&fit=crop" 
                alt="Turmeric Processing" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="fade-up font-heading text-4xl font-bold text-primary mb-6">Who We Are</h2>
              <p className="fade-up text-gray-600 text-lg mb-6 leading-relaxed">
                Founded with a vision to deliver unparalleled quality in spices and agricultural products, our company has evolved into a leading exporter trusted by international buyers. Our deep-rooted relationships with farmers ensure we source only the most authentic ingredients.
              </p>
              <p className="fade-up text-gray-600 text-lg mb-6 leading-relaxed">
                From the lush fields to our state-of-the-art processing units, and finally to your ports, we maintain complete transparency and rigorous quality control. 
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-neutral-light">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 fade-up">
            <h2 className="font-heading text-4xl font-bold text-primary mb-4">Our Core Values</h2>
            <p className="text-gray-600">The principles that drive our operations and ensure your satisfaction.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => (
              <div key={idx} className="fade-up bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  {val.icon}
                </div>
                <h3 className="font-heading text-xl font-bold text-primary mb-3">{val.title}</h3>
                <p className="text-gray-600">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reuse the timeline component for unified look */}
      <JourneyTimeline />
    </main>
  );
}
