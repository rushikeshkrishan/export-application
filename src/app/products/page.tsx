"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Link from "next/link";
import { ShoppingCart, Leaf } from "lucide-react";

export default function ProductsPage() {
  const containerRef = useRef<HTMLElement>(null);

  const headline = "Export Area";
  const words = headline.split(" ");

  const products = [
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
    // Header Parallax
    gsap.to(".prod-hero-bg", {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: ".prod-hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

    // Masked Headline Slide-Up
    gsap.fromTo(
      ".prod-headline-word",
      { y: "150%", rotation: 5, opacity: 0 },
      { 
        y: "0%", 
        rotation: 0, 
        opacity: 1, 
        duration: 1.2, 
        stagger: 0.1, 
        ease: "power4.out" 
      }
    );

    gsap.fromTo(
      ".prod-sub-text",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.4, ease: "power3.out" }
    );

    // Staggered grid reveal
    gsap.fromTo(
      ".product-item",
      { opacity: 0, y: 60, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".products-grid",
          start: "top 80%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="bg-neutral-light min-h-screen">
      {/* Hero Section */}
      <section className="prod-hero relative h-[40vh] flex items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 -z-20">
          <img
            src="https://images.unsplash.com/photo-1592457711340-2412dc07b733?q=80&w=666&auto=format&fit=crop"
            alt="Export Products"
            className="prod-hero-bg w-full h-[130%] object-cover -translate-y-[15%]"
          />
        </div>
        <div className="absolute inset-0 bg-primary/70 -z-10 mix-blend-multiply" />
        <div className="text-center text-white p-4 pt-20 relative z-10 flex flex-col items-center">
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-4 flex gap-x-4">
            {words.map((word, idx) => (
              <span key={idx} className="overflow-hidden inline-block pb-2">
                <span className="prod-headline-word inline-block origin-bottom-left">
                  {word}
                </span>
              </span>
            ))}
          </h1>
          <p className="prod-sub-text text-xl max-w-2xl mx-auto text-white/90">Premium quality products sourced sustainably for the global market.</p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="products-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                id={product.id}
                className="product-item group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
              >
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-primary px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
                    <Leaf size={14} className="text-secondary" />
                    {product.category}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-heading text-2xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 mb-6 flex-grow">
                    {product.desc}
                  </p>

                  <div className="mt-auto">
                    <Link
                      href={`/contact?product=${encodeURIComponent(product.title)}`}
                      className="w-full flex items-center justify-center gap-2 bg-neutral-light hover:bg-secondary hover:text-white text-primary font-medium px-4 py-3 rounded-lg transition-colors border border-gray-200"
                    >
                      <ShoppingCart size={18} />
                      Request Quote
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
