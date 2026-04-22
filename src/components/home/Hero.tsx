"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const headline = "Finest Quality Spices, Delivered Worldwide.";
  const words = headline.split(" ");

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      ".hero-bg",
      { scale: 1.1, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out" }
    );

    // Masked Headline Slide-Up
    tl.fromTo(
      ".hero-headline-word",
      { y: "150%", rotation: 5, opacity: 0 },
      { 
        y: "0%", 
        rotation: 0, 
        opacity: 1, 
        duration: 1.2, 
        stagger: 0.1, 
        ease: "power4.out" 
      },
      "-=1.0"
    );

    tl.fromTo(
      ".hero-sub",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" },
      "-=0.8"
    );

    tl.fromTo(
      ".hero-btn",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.5)" },
      "-=0.6"
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div 
        className="hero-bg absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2670&auto=format&fit=crop')" }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-primary/90 to-primary/40 mix-blend-multiply" />

      <div className="container mx-auto px-4 relative z-10 text-white">
        <div ref={textRef} className="max-w-3xl">
          <span className="hero-sub inline-block font-medium text-secondary mb-4 tracking-wider uppercase text-sm md:text-base">
            Premium Global Exporter
          </span>
          <h1 className="font-heading text-5xl md:text-7xl font-bold leading-tight mb-6 flex flex-wrap gap-x-4 gap-y-2">
            {words.map((word, idx) => (
              <span key={idx} className="overflow-hidden inline-block pb-2">
                <span className="hero-headline-word inline-block origin-bottom-left">
                  {word}
                </span>
              </span>
            ))}
          </h1>
          <p className="hero-sub text-lg md:text-xl text-gray-200 mb-10 max-w-2xl leading-relaxed">
            We source, process, and export the highest quality cardamom, cumin, turmeric, and other agricultural products spanning the globe.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/products" 
              className="hero-btn group flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white px-8 py-4 rounded-full font-medium transition-all hover:-translate-y-1"
            >
              Explore Products
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
            <Link 
              href="/contact" 
              className="hero-btn group flex items-center gap-2 bg-transparent border-2 border-white hover:bg-white hover:text-primary text-white px-8 py-4 rounded-full font-medium transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
