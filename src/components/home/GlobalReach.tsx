"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function GlobalReach() {
  const containerRef = useRef<HTMLElement>(null);

  const regions = [
    {
      id: "middle-east",
      title: "Middle East",
      icon: "🌐",
      direction: "left",
      details: [
        { name: "UAE", flag: "🇦🇪", desc: "Major trading hub, high demand for bulk spices and re-export quality." },
        { name: "Saudi Arabia", flag: "🇸🇦", desc: "Focus on premium-grade spices for retail and wholesale markets." },
        { name: "Oman & Qatar", flag: "🇴🇲 🇶🇦", desc: "Growing demand for hygienically packed and certified products." },
        { name: "Bahrain & Kuwait", flag: "🇧🇭 🇰🇼", desc: "Preference for high-quality, aroma-rich spices." }
      ]
    },
    {
      id: "asia",
      title: "Asia",
      icon: "🌏",
      direction: "right",
      details: [
        { name: "China", flag: "🇨🇳", desc: "Bulk imports for processing and food manufacturing." },
        { name: "Japan", flag: "🇯🇵", desc: "High-quality standards, focus on purity and packaging." },
        { name: "South Korea", flag: "🇰🇷", desc: "Demand for processed and ready-to-use spice products." },
        { name: "Malaysia", flag: "🇲🇾", desc: "Strong consumption of blended spices and seeds." }
      ]
    },
    {
      id: "europe",
      title: "Europe",
      icon: "🇪🇺",
      direction: "left",
      details: [
        { name: "Germany", flag: "🇩🇪", desc: "Strong demand for organic and certified spices." },
        { name: "France", flag: "🇫🇷", desc: "Focus on gourmet and high-quality ingredients." },
        { name: "United Kingdom", flag: "🇬🇧", desc: "Large ethnic food market and spice consumption." },
        { name: "Italy", flag: "🇮🇹", desc: "Use in culinary and food processing industries." }
      ]
    },
    {
      id: "north-america",
      title: "North America",
      icon: "🌎",
      direction: "right",
      details: [
        { name: "USA", flag: "🇺🇸", desc: "High demand for premium, packaged, and organic spice products." },
        { name: "Canada", flag: "🇨🇦", desc: "Growing market for health-focused and natural ingredients." }
      ]
    },
    {
      id: "africa",
      title: "Africa",
      icon: "🌍",
      direction: "left",
      details: [
        { name: "South Africa", flag: "🇿🇦", desc: "Expanding demand for imported spices and seeds." },
        { name: "Egypt", flag: "🇪🇬", desc: "Strong trade links and growing agricultural imports." }
      ]
    }
  ];

  useGSAP(() => {
    // Parallax background
    gsap.to(".global-bg-img", {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: ".global-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    // Intro Title Animaion
    gsap.fromTo(
      ".global-title",
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".global-section",
          start: "top 75%",
        }
      }
    );

    // Left and Right animations based on the direction property
    regions.forEach((region) => {
      const isLeft = region.direction === "left";
      
      // Animate Section Title
      gsap.fromTo(
        `.${region.id}-header`,
        { opacity: 0, x: isLeft ? -100 : 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: `.${region.id}-section`,
            start: "top 80%",
          }
        }
      );

      // Animate Individual Cards Staggered
      gsap.fromTo(
        `.${region.id}-card`,
        { opacity: 0, x: isLeft ? -100 : 100, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `.${region.id}-grid`,
            start: "top 85%",
          }
        }
      );
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="global-section relative py-32 overflow-hidden bg-primary text-white overflow-x-hidden">
      {/* Dynamic Background Image */}
      <div 
        className="global-bg-img absolute inset-0 -z-20 bg-cover bg-center opacity-10 mix-blend-screen"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2670&auto=format&fit=crop')" }}
      />
      
      {/* Background Overlay */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/80 via-primary/95 to-primary"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-20 global-title">
          <div className="flex items-center justify-center gap-2 text-secondary mb-4 text-3xl">
            🌍
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
            Global Export Presence
          </h2>
          <p className="text-white/80 text-lg md:text-xl leading-relaxed">
            We proudly export premium-quality spices and agricultural products across key global markets, ensuring quality compliance, consistency, and reliable delivery.
          </p>
        </div>

        <div className="space-y-20">
          {regions.map((region) => (
            <div key={region.id} className={`${region.id}-section`}>
              <div className={`${region.id}-header mb-10 text-center md:text-left`}>
                <h3 className="font-heading text-3xl md:text-4xl font-bold text-secondary mb-3 flex items-center justify-center md:justify-start gap-4">
                  <span className="text-5xl bg-white/10 p-3 rounded-2xl shadow-lg border border-white/20">{region.icon}</span> 
                  {region.title}
                </h3>
              </div>

              <div className={`${region.id}-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6`}>
                {region.details.map((detail, idx) => (
                  <div 
                    key={idx}
                    className={`${region.id}-card bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl hover:bg-white/15 transition-all duration-300 hover:border-secondary/50 group hover:-translate-y-2`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-heading text-xl font-bold text-white group-hover:text-secondary transition-colors">
                        {detail.name}
                      </h4>
                      <span className="text-3xl drop-shadow-md">{detail.flag}</span>
                    </div>
                    <p className="text-white/80 leading-relaxed text-sm">
                      {detail.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
