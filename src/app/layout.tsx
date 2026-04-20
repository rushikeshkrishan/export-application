import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import PopupInquiryForm from "@/components/common/PopupInquiryForm";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Premium Exporters | Quality Spices & Agriculture",
  description: "Global leaders in exporting premium quality spices like green cardamom, cumin seeds, turmeric, and basmati rice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} antialiased min-h-screen flex flex-col font-sans`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <PopupInquiryForm />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
