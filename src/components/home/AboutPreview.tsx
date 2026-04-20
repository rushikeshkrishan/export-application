"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

export default function AboutPreview() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        end: "bottom 80%",
      }
    });

    tl.fromTo(
      ".about-title",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
    );

    tl.fromTo(
      ".about-content",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      "-=0.4"
    );

    gsap.fromTo(
      imgRef.current,
      { x: 50, opacity: 0 },
      { 
        x: 0, opacity: 1, duration: 1, ease: "power2.out",
        scrollTrigger: {
          trigger: imgRef.current,
          start: "top 80%",
        }
      }
    );

    // Parallax effect on image
    gsap.to(".parallax-img", {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: imgRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

  }, { scope: containerRef });

  const features = [
    "100% Organic & Natural",
    "ISO Certified Processing",
    "Global Distribution Network",
    "Premium Quality Assurance",
  ];

  return (
    <section ref={containerRef} className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div ref={textRef} className="max-w-xl">
            <h2 className="about-title font-heading text-4xl md:text-5xl font-bold text-primary mb-6">
              Rooted in Quality, <br /> Dedicated to Excellence
            </h2>
            <p className="about-content text-gray-600 text-lg mb-6 leading-relaxed">
              With over two decades of heritage in the spice trade, we have established ourselves as a premier exporter of the finest agricultural products. We believe in delivering purity, aroma, and authentic flavor to every corner of the world.
            </p>
            <p className="about-content text-gray-600 text-lg mb-8 leading-relaxed">
              Our sustainable sourcing models ensure fair trade practices while maintaining rigorous quality checks at every step of processing. 
            </p>

            <ul className="about-content grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-gray-800 font-medium">
                  <CheckCircle className="text-secondary" size={20} />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="about-content">
              <Link 
                href="/about" 
                className="inline-flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors group"
              >
                Learn More About Our Journey
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
            </div>
          </div>

          <div ref={imgRef} className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            {/* Parallax Wrapper */}
            <div className="parallax-img absolute -inset-[15%] w-[130%] h-[130%]">
              <img 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1500&auto=format&fit=crop" 
                alt="Spice processing" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Overlay Elements */}
            <div className="absolute bottom-6 left-6 bg-white p-6 rounded-xl shadow-xl max-w-xs transform hover:-translate-y-2 transition-transform duration-300">
              <div className="text-secondary font-bold text-4xl mb-1 mt-1">20+</div>
              <div className="text-gray-800 font-medium">Years of Excellence in Global Spice Trade</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
