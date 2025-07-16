"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import GetStartedButton from "@/components/animata/button/get-started-button";

export interface Product {
  id: string;
  name_id: string;
  name_en: string;
  description_id: string;
  description_en: string;
  images: string[];
  category: string;
  price: number;
  ageRange: string;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  materials: string[];
  weight: number;
  inStock: boolean;
  featured: boolean;
}

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  const productName = language === "id" ? product.name_id : product.name_en;
  const productDescription =
    language === "id" ? product.description_id : product.description_en;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`flex h-full flex-col overflow-hidden rounded-xl border border-wood-100 bg-white shadow-xs transition-all duration-300 ${
        isVisible ? "animate-fade-in-up" : "opacity-0"
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      <div className="group relative aspect-square overflow-hidden">
        <Image
          src={product.images?.[0] || "/images/logonav.png"}
          alt={productName || "tes"}
          fill
          className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-grow flex-col p-4">
        <div>
          <h3 className="font-playfair mb-2 text-lg font-semibold text-wood-800 line-clamp-2">
            {productName}
          </h3>

          <p className="mb-3 text-sm text-wood-600 line-clamp-2">
            {productDescription}
          </p>
        </div>

        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1"></div>
          </div>
          <div className="mt-4 flex justify-center">
            <div>
              <GetStartedButton className="tes" text="Get Startded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
