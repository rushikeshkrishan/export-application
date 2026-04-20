"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { toast } from "sonner";

function ContactForm() {
  const searchParams = useSearchParams();
  const productInterest = searchParams.get("product") || "";
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      product: formData.get("product"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Message sent successfully! We will contact you soon.");
        (e.target as HTMLFormElement).reset();
      } else {
        toast.error("Failed to send message. Please try again later.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <h2 className="font-heading text-3xl font-bold text-primary mb-6">Send an Inquiry</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
          <input required type="text" id="name" name="name" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all" placeholder="John Doe" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
          <input required type="email" id="email" name="email" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input type="tel" id="phone" name="phone" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all" placeholder="+1 234 567 8900" />
        </div>
        <div>
          <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-2">Product of Interest</label>
          <input defaultValue={productInterest} type="text" id="product" name="product" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all" placeholder="e.g. Green Cardamom" />
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Your Message *</label>
        <textarea required id="message" name="message" rows={5} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all resize-none" placeholder="Tell us about your requirements..."></textarea>
      </div>

      <button disabled={isSubmitting} type="submit" className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-70">
        <Send size={20} />
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

export default function ContactPage() {
  return (
    <main className="bg-neutral-light min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-heading text-5xl font-bold text-primary mb-4">Get In Touch</h1>
          <p className="text-gray-600 text-lg">Have a question or looking for a quote? We're here to help.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="bg-primary text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <h3 className="font-heading text-2xl font-bold mb-8 relative z-10">Contact Information</h3>
              
              <ul className="flex flex-col gap-6 relative z-10">
                <li className="flex items-start gap-4">
                  <div className="bg-secondary/20 p-3 rounded-full text-secondary shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <strong className="block text-lg mb-1">Our Location</strong>
                    <span className="text-white/80 leading-relaxed">123 Export Avenue, Global Business Park, City, Country</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-secondary/20 p-3 rounded-full text-secondary shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <strong className="block text-lg mb-1">Phone Number</strong>
                    <span className="text-white/80">+1 234 567 8900</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-secondary/20 p-3 rounded-full text-secondary shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <strong className="block text-lg mb-1">Email Address</strong>
                    <span className="text-white/80">info@exportapp.com</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-secondary/20 p-3 rounded-full text-secondary shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <strong className="block text-lg mb-1">Working Hours</strong>
                    <span className="text-white/80">Mon - Fri: 9:00 AM - 6:00 PM<br/>Sat: 9:00 AM - 1:00 PM</span>
                  </div>
                </li>
              </ul>
            </div>
            
            {/* Embedded Map Placeholder */}
            <div className="bg-gray-200 h-64 rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex items-center justify-center relative">
               <div className="absolute inset-0 opacity-50 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center" />
               <div className="bg-white/90 backdrop-blur px-6 py-3 rounded-lg font-medium text-primary shadow-sm z-10">
                 Interactive Map View
               </div>
            </div>
          </div>

          {/* Form Area */}
          <div className="lg:col-span-2">
            <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading form...</div>}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
