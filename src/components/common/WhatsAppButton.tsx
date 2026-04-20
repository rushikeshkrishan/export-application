"use client";

import { MessageCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function WhatsAppButton() {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (buttonRef.current) {
      // Pulse animation using GSAP
      gsap.to(buttonRef.current, {
        scale: 1.1,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "power1.inOut",
      });
    }
  }, []);

  // Replace with actual WhatsApp number
  const phoneNumber = "918668255064";
  const message = encodeURIComponent("Hello, I'm interested in your export products.");
  const waLink = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      ref={buttonRef}
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:bg-[#20bd5a] transition-colors flex items-center justify-center glow-effect"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
}
