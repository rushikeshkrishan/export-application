import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-white/20 pb-12">
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-secondary text-white flex items-center justify-center rounded-lg font-heading font-bold text-xl">
                EA
              </div>
              <span className="font-heading font-bold text-2xl">Export App</span>
            </Link>
            <p className="text-white/70 mt-2 leading-relaxed">
              Premium quality agriculture and spice exports meeting global standards. Delivering excellence worldwide.
            </p>
            <div className="flex gap-4 mt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors">
                <FaFacebookF size={16} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors">
                <FaTwitter size={16} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors">
                <FaInstagram size={16} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors">
                <FaLinkedinIn size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-xl mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-1 after:bg-secondary">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3">
              <li><Link href="/" className="text-white/70 hover:text-secondary transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-white/70 hover:text-secondary transition-colors">About Us</Link></li>
              <li><Link href="/products" className="text-white/70 hover:text-secondary transition-colors">Our Products</Link></li>
              <li><Link href="/contact" className="text-white/70 hover:text-secondary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-heading font-semibold text-xl mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-1 after:bg-secondary">
              Top Products
            </h3>
            <ul className="flex flex-col gap-3">
              <li><Link href="/products#green-cardamom" className="text-white/70 hover:text-secondary transition-colors">Green Cardamom</Link></li>
              <li><Link href="/products#cumin-seeds" className="text-white/70 hover:text-secondary transition-colors">Cumin Seeds</Link></li>
              <li><Link href="/products#turmeric" className="text-white/70 hover:text-secondary transition-colors">Turmeric</Link></li>
              <li><Link href="/products#basmati-rice" className="text-white/70 hover:text-secondary transition-colors">Basmati Rice</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-xl mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-1 after:bg-secondary">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-secondary shrink-0 mt-1" size={20} />
                <span className="text-white/70">123 Export Avenue, Global Business Park, City, Country</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-secondary shrink-0" size={20} />
                <span className="text-white/70">+1 234 567 8900</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-secondary shrink-0" size={20} />
                <span className="text-white/70">info@exportapp.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center text-white/50 text-sm">
          <p>&copy; {new Date().getFullYear()} Export App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
