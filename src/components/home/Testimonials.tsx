"use client";

import { useRef } from "react";
import { Star, Quote } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function Testimonials() {
  const containerRef = useRef<HTMLElement>(null);

  const reviews = [
    {
      name: "Ahmed Al-Maktoum",
      company: "Middle East distribution LLC",
      review: "The quality of green cardamom and cumin seeds we receive is consistently outstanding. Their packaging ensures freshness mapping all across the borders.",
      rating: 5,
    },
    {
      name: "Sarah Jenkins",
      company: "Global Organics UK",
      review: "Export App has revolutionized our supply chain. Their transparency and organic certifications give us the confidence to cater to our premium market.",
      rating: 5,
    },
    {
      name: "Rajesh Kumar",
      company: "Spices Trader Connect",
      review: "Reliable, fast, and uncompromised quality. Their turmeric has the perfect curcumin percentage we've been struggling to find elsewhere.",
      rating: 5,
    }
  ];

  useGSAP(() => {
    gsap.fromTo(
      ".testi-content",
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".testi-section",
          start: "top 80%",
        }
      }
    );

    gsap.fromTo(
      ".testi-card",
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".testi-grid",
          start: "top 85%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="testi-section py-24 bg-neutral-light overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="lg:w-1/3 text-left">
            <span className="testi-content inline-block font-medium text-secondary mb-2 tracking-wider uppercase text-sm">Client Reviews</span>
            <h2 className="testi-content font-heading text-4xl md:text-5xl font-bold text-primary mb-6">
              Hear From Our Partners
            </h2>
            <p className="testi-content text-gray-600 text-lg mb-8 leading-relaxed">
              Don't just take our word for it. Join hundreds of satisfied businesses importing from us globally.
            </p>
            
            <div className="testi-content flex items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 max-w-sm">
              <div className="text-5xl font-bold text-primary tracking-tighter">4.9</div>
              <div>
                <div className="flex gap-1 text-secondary mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                <div className="text-gray-600 font-medium">From 200+ global buyers</div>
              </div>
            </div>
          </div>

          <div className="lg:w-2/3 w-full testi-grid grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review, idx) => (
              <div 
                key={idx} 
                className={`testi-card bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 relative ${idx === 2 ? 'md:col-span-2 md:w-1/2 md:mx-auto' : ''}`}
              >
                <div className="absolute top-6 right-6 text-gray-100">
                  <Quote size={40} fill="currentColor" />
                </div>
                <div className="flex gap-1 text-secondary mb-6 relative z-10">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-gray-700 italic mb-6 relative z-10 leading-relaxed">
                  "{review.review}"
                </p>
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-lg font-heading">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-primary font-heading">{review.name}</div>
                    <div className="text-gray-500 text-sm">{review.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
