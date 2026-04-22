"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Leaf, Package, Ship, RefreshCw } from "lucide-react";

export default function ExplodedViewProcess() {
  const containerRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    // Responsive adjustments
    const isMobile = window.innerWidth < 768;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=250%",
        scrub: 1,
        pin: true,
      }
    });

    // 1. Explode Phase
    tl.to(".exploded-item-1", { x: isMobile ? "-100%" : "-150%", y: "-120%", rotation: -10, scale: 1.1, duration: 1 }, 0)
      .to(".exploded-item-2", { x: isMobile ? "100%" : "150%", y: "-60%", rotation: 10, scale: 1.1, duration: 1 }, 0)
      .to(".exploded-item-3", { x: isMobile ? "-100%" : "-150%", y: "60%", rotation: -10, scale: 1.1, duration: 1 }, 0)
      .to(".exploded-item-4", { x: isMobile ? "100%" : "150%", y: "120%", rotation: 10, scale: 1.1, duration: 1 }, 0)
      .to(".center-element", { scale: 0.5, opacity: 0.2, duration: 1 }, 0);

    // 2. Lock Phase
    if (isMobile) {
      tl.to(".exploded-item-1", { x: 0, y: "-150%", rotation: 0, scale: 0.9, duration: 1 }, 1.5)
        .to(".exploded-item-2", { x: 0, y: "-50%", rotation: 0, scale: 0.9, duration: 1 }, 1.5)
        .to(".exploded-item-3", { x: 0, y: "50%", rotation: 0, scale: 0.9, duration: 1 }, 1.5)
        .to(".exploded-item-4", { x: 0, y: "150%", rotation: 0, scale: 0.9, duration: 1 }, 1.5);
    } else {
      tl.to(".exploded-item-1", { x: "-180%", y: 0, rotation: 0, scale: 0.9, duration: 1 }, 1.5)
        .to(".exploded-item-2", { x: "-60%", y: 0, rotation: 0, scale: 0.9, duration: 1 }, 1.5)
        .to(".exploded-item-3", { x: "60%", y: 0, rotation: 0, scale: 0.9, duration: 1 }, 1.5)
        .to(".exploded-item-4", { x: "180%", y: 0, rotation: 0, scale: 0.9, duration: 1 }, 1.5);
    }
    
    tl.to(".center-element", { scale: 0, opacity: 0, duration: 0.5 }, 1.5)
      .to(".connecting-line", { scaleX: 1, opacity: 1, duration: 0.8 }, 2);
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="h-screen bg-neutral-light flex flex-col items-center justify-center overflow-hidden relative">
      <div className="absolute top-16 md:top-24 text-center z-20 w-full px-4">
        <span className="text-secondary font-bold uppercase tracking-wider text-sm mb-2 block">How It Works</span>
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">The Assembly of Quality</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">Scroll to explore our end-to-end export process.</p>
      </div>

      <div className="relative w-full max-w-6xl h-full flex items-center justify-center mt-20">
        
        {/* Background Connecting Line (Final Layout) */}
        <div className="connecting-line absolute h-1 bg-secondary/30 w-3/4 opacity-0 hidden md:block origin-left z-0" />

        {/* Center Element */}
        <div className="center-element absolute w-32 h-32 md:w-48 md:h-48 bg-primary rounded-full flex items-center justify-center shadow-2xl z-20">
          <span className="text-white font-heading font-bold text-xl md:text-2xl">Export Flow</span>
        </div>

        {/* Exploding Components */}
        <div className="exploded-item exploded-item-1 absolute bg-white p-6 rounded-2xl shadow-xl w-56 md:w-64 text-center z-30">
          <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-secondary border border-secondary/20 shadow-inner">
            <Leaf size={32} />
          </div>
          <h3 className="font-heading font-bold text-xl text-primary mb-2">1. Sourcing</h3>
          <p className="text-gray-600 text-sm">Finest raw materials from trusted farms.</p>
        </div>

        <div className="exploded-item exploded-item-2 absolute bg-white p-6 rounded-2xl shadow-xl w-56 md:w-64 text-center z-30">
          <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-secondary border border-secondary/20 shadow-inner">
            <RefreshCw size={32} />
          </div>
          <h3 className="font-heading font-bold text-xl text-primary mb-2">2. Processing</h3>
          <p className="text-gray-600 text-sm">Advanced sorting and cleaning.</p>
        </div>

        <div className="exploded-item exploded-item-3 absolute bg-white p-6 rounded-2xl shadow-xl w-56 md:w-64 text-center z-30">
          <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-secondary border border-secondary/20 shadow-inner">
            <Package size={32} />
          </div>
          <h3 className="font-heading font-bold text-xl text-primary mb-2">3. Packaging</h3>
          <p className="text-gray-600 text-sm">Sealed for maximum freshness.</p>
        </div>

        <div className="exploded-item exploded-item-4 absolute bg-white p-6 rounded-2xl shadow-xl w-56 md:w-64 text-center z-30">
          <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-secondary border border-secondary/20 shadow-inner">
            <Ship size={32} />
          </div>
          <h3 className="font-heading font-bold text-xl text-primary mb-2">4. Shipping</h3>
          <p className="text-gray-600 text-sm">Global export logistics handled safely.</p>
        </div>
      </div>
    </section>
  );
}
