"use client";

import { useRef } from "react";
import { ShieldCheck, Leaf, Truck, Users } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function WhyChooseUs() {
  const containerRef = useRef<HTMLElement>(null);

  const reasons = [
    {
      icon: <Leaf size={32} />,
      title: "100% Organic Supply",
      desc: "Our products are grown naturally without harmful chemicals or pesticides, ensuring highest organic standards."
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Uncompromised Quality",
      desc: "Every batch undergoes rigorous lab testing to meet and exceed global food safety regulations."
    },
    {
      icon: <Truck size={32} />,
      title: "Fast Global Shipping",
      desc: "With established logistics networks, we guarantee timely delivery of your shipments across borders."
    },
    {
      icon: <Users size={32} />,
      title: "Trusted Partners",
      desc: "We build long-term relationships through transparency, reliability, and dedicated customer support."
    }
  ];

  useGSAP(() => {
    // Animate title and descriptions
    gsap.fromTo(
      ".wcu-header",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".wcu-section",
          start: "top 80%",
        }
      }
    );

    // Grid boxes animation
    gsap.fromTo(
      ".wcu-card",
      { y: 50, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".wcu-grid",
          start: "top 85%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="wcu-section py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="wcu-header inline-block font-medium text-secondary mb-2 tracking-wider uppercase text-sm">Why Choose Us</span>
          <h2 className="wcu-header font-heading text-4xl md:text-5xl font-bold text-primary mb-6">
            The Standard of Excellence
          </h2>
          <p className="wcu-header text-gray-600 text-lg leading-relaxed">
            We don't just export products; we export trust. Discover why businesses globally rely on us for their premium agricultural needs.
          </p>
        </div>

        <div className="wcu-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, idx) => (
            <div 
              key={idx} 
              className="wcu-card group border border-gray-100 rounded-2xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 bg-white"
            >
              <div className="w-16 h-16 bg-neutral-light rounded-xl flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors duration-300 mb-6">
                {reason.icon}
              </div>
              <h3 className="font-heading text-xl font-bold text-primary mb-3">
                {reason.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {reason.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
