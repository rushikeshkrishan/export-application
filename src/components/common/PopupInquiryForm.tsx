"use client";

import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { toast } from "sonner";

export default function PopupInquiryForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasTriggered) return;

    // Trigger after 5 seconds
    const timer = setTimeout(() => {
      openPopup();
    }, 5000);

    // Trigger on 50% scroll
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollY / docHeight) * 100;
      
      if (scrollPercent > 50 && !hasTriggered) {
        openPopup();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasTriggered]);

  const openPopup = () => {
    setIsOpen(true);
    setHasTriggered(true);
  };

  useEffect(() => {
    if (isOpen && popupRef.current && overlayRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      gsap.fromTo(
        popupRef.current,
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)" }
      );
    }
  }, [isOpen]);

  const closePopup = () => {
    if (popupRef.current && overlayRef.current) {
      gsap.to(popupRef.current, {
        y: 50,
        opacity: 0,
        scale: 0.95,
        duration: 0.3,
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => setIsOpen(false),
      });
    } else {
      setIsOpen(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create form data payload
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Inquiry sent successfully! We'll get back to you soon.");
        closePopup();
      } else {
        toast.error("Failed to send inquiry. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closePopup}
      />
      <div 
        ref={popupRef}
        className="relative bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden z-10 border border-gray-100"
      >
        <button 
          onClick={closePopup}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
        >
          <X size={18} />
        </button>
        
        <div className="bg-primary px-6 py-8 text-white relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary opacity-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <h3 className="font-heading font-bold text-2xl relative z-10">Request a Quote</h3>
          <p className="text-white/80 mt-2 text-sm relative z-10">Get the best prices for premium export products.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div>
            <label htmlFor="popup-name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input 
              required 
              type="text" 
              id="popup-name" 
              name="name"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-gray-400"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label htmlFor="popup-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              required 
              type="email" 
              id="popup-email" 
              name="email"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-gray-400"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label htmlFor="popup-phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input 
              type="tel" 
              id="popup-phone" 
              name="phone"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-gray-400"
              placeholder="+1 234 567 8900"
            />
          </div>
          <div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-secondary hover:bg-secondary/90 text-white font-medium py-3 rounded-lg transition-transform hover:-translate-y-1 mt-2 disabled:opacity-70 disabled:hover:translate-y-0 relative overflow-hidden group"
            >
              <span className="relative z-10">{isSubmitting ? "Sending..." : "Submit Inquiry"}</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
