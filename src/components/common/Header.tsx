"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll(); // Check on mount
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]); // Re-check when pathname changes

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary text-white flex items-center justify-center rounded-lg font-heading font-bold text-xl">
            EA
          </div>
          <span className={`font-heading font-bold text-xl ${isScrolled ? "text-primary" : "text-white"}`}>
            Export App
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`font-medium transition-colors hover:text-secondary ${
                pathname === link.href
                  ? "text-secondary"
                  : isScrolled
                  ? "text-neutral-dark"
                  : "text-white/90"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/contact"
            className="bg-secondary hover:bg-secondary/90 text-white px-5 py-2 rounded-full transition-transform hover:scale-105 font-medium"
          >
            Get a Quote
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden p-2 ${isScrolled ? "text-primary" : "text-white"}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 px-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`font-medium py-2 border-b border-gray-100 ${
                pathname === link.href ? "text-secondary" : "text-neutral-dark"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
