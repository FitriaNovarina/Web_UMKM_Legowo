import React from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import BackToTop from "@/components/BackToTop";
import BottomNavigation from "@/components/BottomNavigation";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col font-inter">
      <LanguageProvider>
        <Navbar />
        <BreadcrumbNav />
        <main className="flex-1 pt-0 pb-16 md:pb-0">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <BackToTop />
        <BottomNavigation />
      </LanguageProvider>
    </div>
  );
}
