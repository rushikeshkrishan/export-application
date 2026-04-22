"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function ProductsPreview() {
  const containerRef = useRef<HTMLElement>(null);
  const headline = "Our Best Sellers";
  const words = headline.split(" ");

  const bestSellers = [
    {
      id: "dry-red-chilli",
      title: "Dry Red Chilli",
      desc: "A burst of summer and colour, known for its vibrant red hue, strong aroma, and balanced pungency. Perfect for curries, sauces, and spice blends.",
      image: "https://plus.unsplash.com/premium_photo-1726862874540-531140b04f62?q=80&w=1170&auto=format&fit=crop",
      category: "Spice"
    },
    {
      id: "chilli-powder",
      title: "Chilli Powder",
      desc: "Finely ground premium chilli powder with bold colour and rich heat. Ideal for curry mixes, sauces, and spice applications.",
      image: "https://images.unsplash.com/photo-1756361946154-f0ef47a6da45?q=80&w=1074&auto=format&fit=crop",
      category: "Spice"
    },
    {
      id: "coriander-seeds",
      title: "Coriander Seeds",
      desc: "Fragrant coriander seeds with mild citrus notes, widely used in spice mixes and seasoning blends for enhanced flavor.",
      image: "https://images.unsplash.com/photo-1652209741060-041f95ad2abf?q=80&w=713&auto=format&fit=crop",
      category: "Seed"
    },
    {
      id: "turmeric-powder",
      title: "Turmeric Powder",
      desc: "Premium turmeric powder with rich golden colour and high curcumin content. Ideal for cooking, wellness, and medicinal use.",
      image: "https://images.unsplash.com/photo-1583949885751-23b7d1909378?q=80&w=1170&auto=format&fit=crop",
      category: "Spice"
    },
    {
      id: "turmeric-finger",
      title: "Turmeric Finger",
      desc: "Natural dried turmeric fingers with high purity and strong aroma, suitable for grinding, medicinal applications, and export.",
      image: "https://images.unsplash.com/photo-1741513599050-487ccfb86275?q=80&w=1228&auto=format&fit=crop",
      category: "Spice"
    }
  ];

  useGSAP(() => {
    // Masked Headline Slide-Up
    gsap.fromTo(
      ".prod-title-word",
      { y: "150%", rotation: 5, opacity: 0 },
      { 
        y: "0%", 
        rotation: 0, 
        opacity: 1, 
        duration: 1.2, 
        stagger: 0.1, 
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".prod-header-trigger",
          start: "top 80%",
        }
      }
    );

    const isMobile = window.innerWidth < 1024;
    
    if (isMobile) {
      gsap.fromTo(
        ".mobile-product-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".mobile-products-grid",
            start: "top 80%",
          }
        }
      );
    } else {
      // Desktop Scroll Down Pinned Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".desktop-slider-container",
          start: "top top",
          end: `+=${bestSellers.length * 100}%`,
          scrub: 1,
          pin: true,
        }
      });

      const images = gsap.utils.toArray<HTMLElement>(".product-image-layer");
      const texts = gsap.utils.toArray<HTMLElement>(".product-text-layer");

      images.forEach((img, i) => {
        if (i === 0) return; // First slide is already visible

        // Previous slide fades out slightly and moves left/right
        tl.to(images[i - 1], { xPercent: -20, opacity: 0, duration: 1 }, `slide${i}`)
          .to(texts[i - 1], { xPercent: 20, opacity: 0, duration: 1 }, `slide${i}`);

        // Current slide comes in (Image from left, text from right)
        tl.fromTo(img, 
          { xPercent: -100, opacity: 0 }, 
          { xPercent: 0, opacity: 1, duration: 1, ease: "power2.out" }, 
          `slide${i}`
        );
        tl.fromTo(texts[i], 
          { xPercent: 100, opacity: 0 }, 
          { xPercent: 0, opacity: 1, duration: 1, ease: "power2.out" }, 
          `slide${i}`
        );
      });
    }
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-white relative">
      <div className="container mx-auto px-4 md:px-6 py-24 prod-header-trigger">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-secondary font-bold uppercase tracking-wider text-sm mb-2 block">Export Area</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4 flex gap-x-3 overflow-hidden">
              {words.map((word, idx) => (
                <span key={idx} className="overflow-hidden inline-block pb-2">
                  <span className="prod-title-word inline-block origin-bottom-left">
                    {word}
                  </span>
                </span>
              ))}
            </h2>
            <p className="text-gray-600 text-lg">Discover our premium range of globally exported spices and agricultural products.</p>
          </div>
          <Link href="/products" className="group flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors whitespace-nowrap">
            View All Products
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </Link>
        </div>
      </div>

      {/* Desktop Slider */}
      <div className="hidden lg:block desktop-slider-container w-full h-screen relative bg-neutral-light overflow-hidden">
        {bestSellers.map((product, idx) => (
          <div key={idx} className="absolute inset-0 w-full h-full flex items-center overflow-hidden">
            
            {/* Image Layer - from left */}
            <div 
              className="product-image-layer absolute left-0 w-3/5 h-full z-10 p-12"
              style={{ zIndex: bestSellers.length - idx }}
            >
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-sm text-primary px-6 py-3 rounded-full font-bold flex items-center gap-2 shadow-xl z-20">
                  <Leaf size={20} className="text-secondary" />
                  {product.category}
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-transparent mix-blend-multiply" />
              </div>
            </div>

            {/* Text Layer - from right, overlapping the image */}
            <div 
              className="product-text-layer absolute right-0 w-1/2 h-full flex items-center justify-center p-12 z-30"
            >
              <div className="bg-white px-12 py-16 rounded-3xl shadow-2xl relative w-full -translate-x-12 transform">
                <div className="text-[120px] absolute -top-12 -right-8 font-heading font-black text-secondary/10 tracking-tighter mix-blend-difference pointer-events-none">
                  0{idx + 1}
                </div>
                
                {/* Mix blend mode added to make this heading invert colors against dark overlapping backgrounds, if any */}
                <h3 className="font-heading text-5xl font-bold text-primary mb-6 mix-blend-difference">
                  {product.title}
                </h3>
                
                <p className="text-gray-600 text-xl leading-relaxed mb-8 max-w-lg">{product.desc}</p>
                <div className="w-16 h-1 bg-secondary rounded-full mb-8"></div>
                <Link href={`/contact?product=${encodeURIComponent(product.title)}`} className="bg-secondary text-white px-10 py-4 rounded-full font-bold shadow-lg hover:bg-secondary/90 transition-all hover:scale-105 inline-block cursor-pointer">
                  Get Quote
                </Link>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Mobile Layout (Standard Cards) */}
      <div className="container mx-auto px-4 pb-24 mobile-products-grid lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-8">
        {bestSellers.map((product, idx) => (
          <div key={idx} className="mobile-product-card group relative bg-neutral-light rounded-2xl overflow-hidden shadow-sm">
            <div className="relative h-64 overflow-hidden bg-gray-200">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-primary px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <Leaf size={14} className="text-secondary" />
                {product.category}
              </div>
            </div>

            <div className="p-6 relative bg-white">
              <h3 className="font-heading text-xl font-bold text-primary mb-2">{product.title}</h3>
              <p className="text-gray-600 text-sm mb-6">{product.desc}</p>
              <Link href={`/contact?product=${encodeURIComponent(product.title)}`} className="inline-block bg-secondary text-white px-6 py-2 rounded-full font-medium text-sm">
                Get Quote
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
