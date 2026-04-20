"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function ProductsPreview() {
  const containerRef = useRef<HTMLElement>(null);

  const bestSellers = [
    {
      id: "dry-red-chilli",
      title: "Dry Red Chilli",
      desc: "A burst of summer and colour, known for its vibrant red hue, strong aroma, and balanced pungency. Perfect for curries, sauces, and spice blends.",
      image: "https://plus.unsplash.com/premium_photo-1726862874540-531140b04f62?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Spice"
    },
    {
      id: "chilli-powder",
      title: "Chilli Powder",
      desc: "Finely ground premium chilli powder with bold colour and rich heat. Ideal for curry mixes, sauces, and spice applications.",
      image: "https://images.unsplash.com/photo-1756361946154-f0ef47a6da45?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Spice"
    },
    {
      id: "coriander-seeds",
      title: "Coriander Seeds",
      desc: "Fragrant coriander seeds with mild citrus notes, widely used in spice mixes and seasoning blends for enhanced flavor.",
      image: "https://images.unsplash.com/photo-1652209741060-041f95ad2abf?q=80&w=713&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Seed"
    },
    {
      id: "turmeric-powder",
      title: "Turmeric Powder",
      desc: "Premium turmeric powder with rich golden colour and high curcumin content. Ideal for cooking, wellness, and medicinal use.",
      image: "https://images.unsplash.com/photo-1583949885751-23b7d1909378?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Spice"
    },
    {
      id: "turmeric-finger",
      title: "Turmeric Finger",
      desc: "Natural dried turmeric fingers with high purity and strong aroma, suitable for grinding, medicinal applications, and export.",
      image: "https://images.unsplash.com/photo-1741513599050-487ccfb86275?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Spice"
    }
  ];

  useGSAP(() => {
    gsap.fromTo(
      ".product-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".products-grid",
          start: "top 80%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-secondary font-bold uppercase tracking-wider text-sm mb-2 block">Export Area</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">Our Best Sellers</h2>
            <p className="text-gray-600 text-lg">Discover our premium range of globally exported spices and agricultural products.</p>
          </div>
          <Link href="/products" className="group flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors whitespace-nowrap">
            View All Products
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </Link>
        </div>

        <div className="products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestSellers.map((product, idx) => (
            <div key={idx} className="product-card group relative bg-neutral-light rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300">
              <div className="relative h-64 overflow-hidden bg-gray-200">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Quick Action Button */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <Link href={`/contact?product=${encodeURIComponent(product.title)}`} className="bg-secondary text-white px-6 py-2 rounded-full font-medium text-sm whitespace-nowrap hover:bg-secondary/90">
                    Get Quote
                  </Link>
                </div>
              </div>

              <div className="p-6 relative bg-white z-10 transform transition-transform duration-300">
                <h3 className="font-heading text-xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors">{product.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">{product.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
