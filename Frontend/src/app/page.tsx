"use client";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import TestimonialsSection from "../components/TestimonialsSection";
import LoadingSkeleton from "../components/LoadingSkeleton";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  ProductCard,
  Product as ProductCardType,
} from "../components/ProductCard";
import { Marquee } from "@/components/marquee";

// Define the structure of the product data coming from the API
interface APIProduct {
  id: number;
  nama: string;
  kategori: string;
  harga: number;
  stok: number;
  deskripsi: string;
  gambar: string;
}

const Index = () => {
  const { t, language } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  // Provide the correct type for the state
  const [featuredProducts, setFeaturedProducts] = useState<ProductCardType[]>(
    []
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(4);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const maxSlides = Math.max(0, featuredProducts.length - itemsPerSlide);
  const [fetchError, setFetchError] = useState(false);

  // Handle responsive items per slide
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerSlide(1); // Mobile: 1 item
      } else if (window.innerWidth < 1024) {
        setItemsPerSlide(2); // Tablet: 2 items
      } else {
        setItemsPerSlide(4); // Desktop: 4 items
      }
      setCurrentSlide(0); // Reset slide when changing items per slide
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlides));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  // Touch handlers for swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0); // Reset touchEnd
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentSlide < maxSlides) {
      nextSlide();
    }
    if (isRightSwipe && currentSlide > 0) {
      prevSlide();
    }
  };

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/produk`);
        if (!response.ok) throw new Error("Server error");
        const allProducts = await response.json();
        const mappedProducts: ProductCardType[] = allProducts
          .slice(0, 8)
          .map((product: APIProduct) => ({
            id: String(product.id),
            name: product.nama, // Assuming ProductCard uses 'name'
            category: product.kategori,
            images: [`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/uploads/${product.gambar}`],
            price: product.harga,
            inStock: product.stok > 0,
            // Add other fields required by ProductCardType if necessary
            name_id: product.nama,
            name_en: product.nama,
            description_id: product.deskripsi,
            description_en: product.deskripsi,
            ageRange: "",
            dimensions: { length: 0, width: 0, height: 0 },
            materials: [],
            weight: 0,
            featured: false,
          }));
        setFeaturedProducts(mappedProducts);
        setFetchError(false);
      } catch (error) {
        setFetchError(true);
        setFeaturedProducts([]);
        console.error("Failed to fetch featured products:", error);
      } finally {
        setIsLoading(false); // Stop loading after fetching
      }
    };
    fetchFeaturedProducts();
  }, []);

  const values = [
    {
      iconUrl:
        "https://toytime-theme.myshopify.com/cdn/shop/files/Group_141026.png?v=1707983157&width=1420",
      title: "Curated Learning Furniture",
      titleId: "Ramah Lingkungan",
      desc: "Essential items like tables, chairs, and bookshelves designed to enrich children’s learning and play.",
      descId: "Bahan berkelanjutan",
    },
    {
      iconUrl:
        "https://toytime-theme.myshopify.com/cdn/shop/files/Group_141027.png?v=1707983157&width=1420",
      title: "Handcrafted from Solid Wood",
      titleId: "Kualitas Terjamin",
      desc: "Made from premium solid wood—durable, natural, and aesthetically pleasing.",
      descId: "Keunggulan buatan tangan",
    },
    {
      iconUrl:
        "https://toytime-theme.myshopify.com/cdn/shop/files/Layer_1_4818643e-2a05-4b26-8654-e6fab905dd6d.png?v=1707983157&width=1420",
      title: " Free & Reliable Delivery",
      titleId: "Dibuat dengan Cinta",
      desc: "Free shipping with secure packaging to ensure safe and timely arrival.",
      descId: "Passion di setiap karya",
    },
  ];

  if (isLoading) {
    return (
      <div className="w-full">
        {/* Hero Skeleton */}
        <div className="min-h-screen bg-gray-200 animate-pulse"></div>

        {/* Featured Products Skeleton */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <LoadingSkeleton key={i} type="card" />
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="text-gray-800 min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-wood-50 to-craft-100 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/60"></div>
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('https://codingbee.id/wp-content/uploads/2023/11/mainan-edukasi-untuk-anak.jpg')`,
            }}
          ></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 py-20">
          <h1 className=" justify-around font-mochiyPopOne text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
            {t.hero.title}
          </h1>
          <p className="font-inter text-sm md:text-md lg:text-lg text-white/90 mb-8 animate-fade-in animation-delay-300 max-w-2xl mx-auto">
            {t.hero.subtitle}
          </p>
          <Link
            href="/products"
            className="group relative inline-flex items-center px-6 md:px-8 py-2 bg-orange-500 rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {/* Efek putih membesar dari kanan */}
            <span className="absolute right-2 w-12 h-12 bg-white rounded-full z-0 transition-all duration-500 ease-in-out group-hover:w-54 group-hover:right-4"></span>

            {/* Teks tombol */}
            <span className="font-mochiyPopOne relative z-10 text-white font-semibold transition-colors duration-500 group-hover:text-orange-500">
              {t.hero.cta}
            </span>

            {/* Ikon panah di kanan */}
            <span className="relative z-10 ml-0 flex items-center justify-center w-10 h-10 translate-x-[18px]">
              <ArrowRight className="text-orange-500" size={20} />
            </span>
          </Link>
        </div>
      </section>
      {/* Age Group Section */}
      <section className="py-16 px-10 bg-[#f5f4f5]">
        <div className="max-w-7xl mx-auto px-50 text-center">
          <h2 className="text-3xl font-mochiyPopOne md:text-4xl font-bold text-[#1c2957] mb-4">
            {t.baby.title}{" "}
            <span className="font-mochiyPopOne text-orange-500">
              {t.baby.ages}
            </span>
          </h2>
          <p className="text-base md:text-lg text-gray-700 mb-10">
            {t.baby.description}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-center">
            {/* 0–12 months */}
            <div className="font-mochiyPopOne flex flex-col items-center group transition-transform duration-300 hover:-translate-y-1 cursor-pointer">
              <Image
                src="/images/0-12.png"
                alt="0-12 months"
                width={140}
                height={140}
                className="object-contain mb-2"
              />
              <span className="bg-red-400 text-white px-4 py-2 rounded-full text-sm font-medium group-hover:opacity-90">
                0–12 months
              </span>
            </div>

            {/* 1–2 years */}
            <div className="font-mochiyPopOne flex flex-col items-center group transition-transform duration-300 hover:-translate-y-1 cursor-pointer">
              <Image
                src="/images/1-2.png"
                alt="1-2 years"
                width={140}
                height={140}
                className="object-contain mb-2"
              />
              <span className="bg-orange-400 text-white px-4 py-2 rounded-full text-sm font-medium group-hover:opacity-90">
                1–2 years
              </span>
            </div>

            {/* 2–3 years */}
            <div className="font-mochiyPopOne flex flex-col items-center group transition-transform duration-300 hover:-translate-y-1 cursor-default">
              <Image
                src="/images/2-3.png"
                alt="2-3 years"
                width={140}
                height={140}
                className="object-contain mb-2"
              />
              <span className="bg-blue-400 text-white px-4 py-2 rounded-full text-sm font-medium group-hover:opacity-90">
                2–3 years
              </span>
            </div>

            {/* 3–5 years */}
            <div className="font-mochiyPopOne flex flex-col items-center group transition-transform duration-300 hover:-translate-y-1 cursor-default">
              <Image
                src="/images/3-5.png"
                alt="3-5 years"
                width={115}
                height={115}
                className="object-contain mb-2"
              />
              <span className="bg-amber-400 text-white px-4 py-2 rounded-full text-sm font-medium group-hover:opacity-90">
                3–5 years
              </span>
            </div>

            {/* 6–8 years */}
            <div className="font-mochiyPopOne flex flex-col items-center group transition-transform duration-300 hover:-translate-y-1 cursor-default">
              <Image
                src="/images/6-8.png"
                alt="6-8 years"
                width={130}
                height={130}
                className="object-contain mb-2"
              />
              <span className="bg-green-400 text-white px-4 py-2 rounded-full text-sm font-medium group-hover:opacity-90">
                6–8 years
              </span>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Products Section */}
      <section className="py-16 px-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 relative">
          <h2 className="text-3xl md:text-2xl font-mochiyPopOne mb-15 flex flex-wrap items-center gap-2 whitespace-nowrap font-bold ">
            <div className="max-w-1/2 flex flex-wrap items-center gap-2 whitespace-nowrap ">
              <span className="text-[#1c2957]">
                {t.featuredProducts.titlePart1}
              </span>
              <span className="text-orange-500">
                {t.featuredProducts.brandName}
              </span>
              <span className="text-[#1c2957]">
                {t.featuredProducts.titlePart2}
              </span>
              <span className="text-green-600">
                {t.featuredProducts.highlight}
              </span>{" "}
              <span className="text-[#1c2957]">
                {t.featuredProducts.punctuation}
              </span>
              <span className="text-orange-500">
                {t.featuredProducts.titlePart3}
              </span>
            </div>
          </h2>
          {/* Pesan error atau stok kosong */}
          {fetchError || featuredProducts.length === 0 ? (
            <div className="w-full text-center py-12">
              <p className="text-xl text-red-500 font-bold">Stok kosong</p>
            </div>
          ) : (
            <div className="relative">
              {/* Carousel Container */}
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{
                    transform: `translateX(-${currentSlide * (100 / itemsPerSlide)
                      }%)`,
                  }}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {featuredProducts.map((product, index) => {
                    const widthClass =
                      itemsPerSlide === 1
                        ? "w-full"
                        : itemsPerSlide === 2
                          ? "w-1/2"
                          : "w-1/4";
                    return (
                      <div
                        key={product.id}
                        className={`${widthClass} flex-shrink-0 px-4`}
                      >
                        <ProductCard product={product} index={index} />
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Navigation Arrows */}
              {featuredProducts.length > itemsPerSlide && (
                <>
                  <button
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                    className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft className="h-6 w-6 text-gray-700" />
                  </button>
                  <button
                    onClick={nextSlide}
                    disabled={currentSlide >= maxSlides}
                    className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowRight className="h-6 w-6 text-gray-700" />
                  </button>
                </>
              )}
              {/* Dots Indicator */}
              {featuredProducts.length > itemsPerSlide && (
                <div className="flex justify-center mt-6 space-x-2">
                  {Array.from({ length: maxSlides + 1 }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${currentSlide === index ? "bg-orange-500" : "bg-gray-300"
                        }`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
          {/* BUTTON VIEW ALL */}
          <div className="text-center mt-12">
            <Link
              href="/products"
              className="bg-orange-500 text-white font-semibold px-8 py-3 rounded-full hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl"
            >
              {t.featuredProducts.viewAll}
            </Link>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <div className="w-full bg-gray-100 py-12 px-10">
        <span className="flex justify-center mb-3">
          <h2 className="mx-12 text-center font-bold font-plusJakartaSans text-black/60 ">
            Our brand trusted partners
          </h2>
        </span>
        <Marquee
          pauseOnHover
          className="text-3xl font-bold font-mochiyPopOne text-orange-500/80 [--gap:5rem] [--duration:18s] flex justify-center"
        >
          <span className="mx-12">Zyfini Edukasi</span>
          <span className="mx-12">Propan</span>
        </Marquee>
      </div>

      {/* Why Choose Us Section */}
      <section className="bg-gray-50 py-10 px-10">
        <div className="font-mochiyPopOne text-[#1c2957] max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div id="why-choose-us-image" data-animate className="relative w-full h-full">
            <Image
              src="/images/shopee.png"
              alt="Crafting furniture"
              fill
              className="object-cover"
            />
          </div>
          <div
            id="why-choose-us-content"
            className="prose max-w-none"
            data-animate
          >
            <h2 className="text-3xl text-gray-800 mb-5">
              The Unique Appeal of{" "}
              <span className="text-orange-500 font-semibold">
                Zyfini Edukasi
              </span>{" "}
              Wooden Creations
            </h2>

            <p className="text-gray-600 mb-6">{t.whyChooseUs.description}</p>
            <ul className="space-y-8">
              {values.map((value, index) => (
                <li key={index} className="flex items-start">

                  <div className="ml-4 ">
                    <h4 className="px-3 text-lg text-gray-800">
                      {language === "en" ? value.title : value.titleId}
                    </h4>
                    <p className="px-3 text-gray-600">
                      {language === "en" ? value.desc : value.descId}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* Call to Action */}
      <section className="font-mochiyPopOne bg-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">{t.cta.title}</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            {t.cta.description}
          </p>
          <Link
            href="/contact"
            className="bg-white text-orange-500 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {t.cta.button}
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
