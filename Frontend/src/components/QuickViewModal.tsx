"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Product } from "@/components/ProductCard";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { language } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0); // Reset image index when modal opens
    }
  }, [isOpen, product]);

  if (!product) return null;

  const productName = language === "id" ? product.name_id : product.name_en;
  const productDescription = language === "id" ? product.description_id : product.description_en;

  const handleWhatsAppOrder = () => {
    const message = `Halo, saya tertarik dengan produk: ${productName}`;
    const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % (product.images?.length || 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + (product.images?.length || 1)) % (product.images?.length || 1));
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-sm md:max-w-2xl lg:max-w-4xl max-h-[95vh] mt-10 overflow-y-auto p-4 md:p-6">
        <DialogHeader>
          <DialogTitle className="font-playfair text-2xl text-wood-800">
            {productName}
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-wood-50 group">
              <Image
                src={product.images?.[currentImageIndex] || "/images/logonav.png"}
                alt={productName}
                fill
                className="object-cover w-full h-full"
              />

              {product.images && product.images.length > 1 && (
                <>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${index === currentImageIndex
                      ? "border-amber-500 ring-2 ring-amber-300"
                      : "border-wood-200 hover:border-wood-400"
                      }`}
                  >
                    <Image
                      src={image || "/images/logonav.png"}
                      alt={`${productName} ${index + 1}`}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex gap-2">
              {product.featured && (
                <Badge className="bg-amber-100 text-amber-800">Featured</Badge>
              )}
              <Badge
                variant={product.inStock ? "default" : "destructive"}
                className={product.inStock ? "bg-green-100 text-green-800" : ""}
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </Badge>
            </div>

            {/* Price */}
            <div className="text-3xl font-bold text-wood-800">
              {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.price)}
            </div>

            {/* Description */}
            <p className="text-wood-600 leading-relaxed">
              {productDescription}
            </p>

            {/* Specifications */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-wood-800">Usia:</span>
                  <div className="text-wood-600">{product.ageRange}</div>
                </div>
                <div>
                  <span className="font-medium text-wood-800">Berat:</span>
                  <div className="text-wood-600">{product.weight}g</div>
                </div>
              </div>

              <div>
                <span className="font-medium text-wood-800">Dimensi:</span>
                <div className="text-wood-600">
                  {product.dimensions?.length} × {product.dimensions?.width} × {product.dimensions?.height} cm
                </div>
              </div>

              {product.materials && product.materials.length > 0 && (
                <div>
                  <span className="font-medium text-wood-800">Bahan:</span>
                  <div className="text-wood-600">{product.materials.join(", ")}</div>
                </div>
              )}
            </div>

            {/* WhatsApp Button */}
            <Button
              onClick={handleWhatsAppOrder}
              className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white transition-all duration-300 hover:scale-105 active:scale-95 group"
              size="lg"
              disabled={!product.inStock}
            >
              <MessageCircle className="h-5 w-5 group-hover:animate-bounce" />
              Pesan via WhatsApp
            </Button>
            <Button
              onClick={() => window.open('https://shopee.co.id/nama-toko-anda', '_blank')}
              className="w-full gap-2 bg-orange-500 hover:bg-orange-600 text-white transition-all duration-300 hover:scale-105 active:scale-95 group"
              size="lg"
            >
              <Image src="/images/shopee.png" alt="Shopee" className="h-5 w-5 group-hover:animate-bounce" />
              Pesan via Shopee
            </Button>
            <Button
              onClick={() => window.open('https://www.etsy.com/shop/nama-toko-anda', '_blank')}
              className="w-full gap-2 bg-pink-500 hover:bg-pink-600 text-white transition-all duration-300 hover:scale-105 active:scale-95 group"
              size="lg"
            >
              <Image src="/images/etzy.png" alt="Etsy" className="h-20 w-20 group-hover:animate-bounce" />
              Pesan via Etsy
            </Button>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
