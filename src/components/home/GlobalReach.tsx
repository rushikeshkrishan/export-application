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
      direction: "up",
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
      direction: "left",
      details: [
        { name: "USA", flag: "🇺🇸", desc: "High demand for premium, packaged, and organic spice products." },
        { name: "Canada", flag: "🇨🇦", desc: "Growing market for health-focused and natural ingredients." }
      ]
    },
    {
      id: "africa",
      title: "Africa",
      icon: "🌍",
      direction: "right",
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

    const isMobile = window.innerWidth < 1024;

    if (!isMobile) {
      // Pinned Scroll Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".global-section",
          start: "top top",
          end: "+=250%",
          scrub: 1,
          pin: true,
        }
      });

      // Show Main Country Globe first (already visible, maybe scale it up slightly initially)
      tl.fromTo(".central-globe-container", { scale: 1 }, { scale: 0.6, opacity: 0.3, duration: 1 }, 0);
      tl.to(".global-title", { y: -20, opacity: 0.8, duration: 1 }, 0);

      // Now bring in the internal regions
      regions.forEach((region) => {
        let xOffset = 0;
        let yOffset = 0;
        if (region.direction === "left") xOffset = -150;
        if (region.direction === "right") xOffset = 150;
        if (region.direction === "up") yOffset = 150;

        tl.fromTo(`.${region.id}-section`, 
          { xPercent: xOffset, yPercent: yOffset, opacity: 0, scale: 0.9 },
          { xPercent: 0, yPercent: 0, opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
          0.5
        );
      });
    } else {
      // Mobile staggered animation (no pinning)
      gsap.fromTo(
        ".central-globe-container",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1, scale: 1, duration: 1,
          scrollTrigger: {
            trigger: ".global-title",
            start: "top 80%",
          }
        }
      );

      regions.forEach((region) => {
        gsap.fromTo(
          `.${region.id}-section`,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 0.8,
            scrollTrigger: {
              trigger: `.${region.id}-section`,
              start: "top 85%",
            }
          }
        );
      });
    }

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="global-section relative w-full h-screen lg:h-[100vh] overflow-hidden bg-primary text-white flex flex-col justify-center">
      {/* Dynamic Background Image */}
      <div 
        className="global-bg-img absolute inset-0 -z-20 bg-cover bg-center opacity-10 mix-blend-screen"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2670&auto=format&fit=crop')" }}
      />
      
      {/* Background Overlay */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/80 via-primary/95 to-primary"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 w-full h-full flex flex-col pt-20">
        
        <div className="text-center max-w-4xl mx-auto mb-10 global-title z-30">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white leading-tight">
            Global Export Presence
          </h2>
          <p className="text-white/80 text-lg md:text-xl leading-relaxed">
            We proudly export premium-quality spices and agricultural products across key global markets.
          </p>
        </div>

        {/* Central Globe Element */}
        <div className="central-globe-container absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div className="text-[200px] md:text-[350px] opacity-20 filter blur-sm">
            🌍
          </div>
        </div>

        {/* Regions Container */}
        <div className="flex-1 overflow-y-auto lg:overflow-visible no-scrollbar pb-20">
          <div className="relative w-full h-full lg:flex lg:flex-wrap lg:items-center lg:justify-center gap-6 xl:gap-10">
            {regions.map((region) => (
              <div 
                key={region.id} 
                className={`${region.id}-section w-full lg:w-[45%] xl:w-[30%] bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl mb-6 lg:mb-0`}
              >
                <div className="mb-6 text-left">
                  <h3 className="font-heading text-2xl font-bold text-secondary mb-3 flex items-center gap-3">
                    <span className="text-3xl bg-white/10 p-2 rounded-xl shadow-lg border border-white/20">{region.icon}</span> 
                    {region.title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {region.details.map((detail, idx) => (
                    <div 
                      key={idx}
                      className="bg-primary/40 border border-white/10 p-4 rounded-2xl hover:bg-white/15 transition-all duration-300 group hover:-translate-y-1"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-heading text-base font-bold text-white group-hover:text-secondary transition-colors">
                          {detail.name}
                        </h4>
                        <span className="text-xl drop-shadow-md">{detail.flag}</span>
                      </div>
                      <p className="text-white/70 leading-relaxed text-xs">
                        {detail.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
