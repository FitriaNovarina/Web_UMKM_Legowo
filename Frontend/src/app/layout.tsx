import type { Metadata } from "next";
import {
  Mochiy_Pop_One,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import BackToTop from "@/components/BackToTop";
import WhatsAppFloat from "@/components/WhatsAppFloat";



const mochiyPopOne = Mochiy_Pop_One({
  variable: "--font-mochiy-pop-one",
  subsets: ["latin"],
  weight: "400",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Legowo - Mainan Edukatif",
  description:
    "Legowo adalah platform yang menyediakan mainan edukatif untuk anak-anak. Mainan edukatif ini dirancang untuk membantu anak-anak dalam proses belajar dan mengembangkan keterampilan mereka.",
  keywords: [
    "Legowo",
    "Mainan Edukatif",
    "Mainan Edukatif untuk Anak-anak",
    "Home Decoration",
    "Home Decoration untuk Anak-anak",
  ],
  authors: [{ name: "Iqbal Raihan Faturrahman Rahardjo" }],
  icons: {
    icon: [{ url: "/app/favicon.ico", sizes: "any" }],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#a855f7" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${mochiyPopOne.variable} ${plusJakartaSans.variable} antialiased`}
      >
        <LanguageProvider>
          {children}
          <BackToTop />
          <WhatsAppFloat />
        </LanguageProvider>
      </body>
    </html>
  );
}
