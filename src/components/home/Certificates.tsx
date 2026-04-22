"use client";

import { useRef } from "react";
import { Award, ShieldCheck, CheckCircle, Target } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function Certificates() {
  const containerRef = useRef<HTMLElement>(null);
  const headline = "Certified for Excellence";
  const words = headline.split(" ");

  const certificates = [
    { icon: <ShieldCheck size={40} className="text-secondary" />, title: "ISO 9001:2015", desc: "Quality Management" },
    { icon: <Award size={40} className="text-secondary" />, title: "HACCP Certified", desc: "Food Safety" },
    { icon: <CheckCircle size={40} className="text-secondary" />, title: "FDA Approved", desc: "US Market Standard" },
    { icon: <Target size={40} className="text-secondary" />, title: "Halal Certified", desc: "Global Trading" },
  ];

  useGSAP(() => {
    // Masked Headline Slide-Up
    gsap.fromTo(
      ".cert-title-word",
      { y: "150%", rotation: 5, opacity: 0 },
      { 
        y: "0%", 
        rotation: 0, 
        opacity: 1, 
        duration: 1.2, 
        stagger: 0.1, 
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".cert-header",
          start: "top 80%",
        }
      }
    );

    // Floating parallax effect for certificates grid
    gsap.fromTo(
      ".cert-card",
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".cert-grid",
          start: "top 85%",
        }
      }
    );

    // Subtle continuous floating
    gsap.utils.toArray(".cert-card").forEach((card: any, index) => {
      gsap.to(card, {
        y: -10,
        duration: 2 + (index % 2),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.2,
      });
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 bg-primary text-white relative overflow-hidden">
      {/* Background Graphics */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 cert-header">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 flex justify-center gap-x-3 overflow-hidden">
            {words.map((word, idx) => (
              <span key={idx} className="overflow-hidden inline-block pb-2">
                <span className="cert-title-word inline-block origin-bottom-left">
                  {word}
                </span>
              </span>
            ))}
          </h2>
          <p className="text-white/80 text-lg">Our commitment to quality is backed by globally recognized certifications and standards.</p>
        </div>

        <div className="cert-grid grid grid-cols-1 sm:grid-cols-2 text-center lg:grid-cols-4 gap-6">
          {certificates.map((cert, idx) => (
            <div key={idx} className="cert-card bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl hover:bg-white/20 transition-colors duration-300 flex flex-col items-center">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6">
                {cert.icon}
              </div>
              <h3 className="font-heading text-xl font-bold mb-2">{cert.title}</h3>
              <p className="text-white/70">{cert.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
