"use client";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, Leaf, Award, Heart, Users, ArrowLeft } from "lucide-react";
import Link from "next/link";
import TestimonialsSection from "../components/TestimonialsSection";
import LoadingSkeleton from "../components/LoadingSkeleton";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ProductCard } from "../components/ProductCard";
import { Marquee } from "@/components/marquee";

const Index = () => {
  const { t, language } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const featuredProducts = [
    {
      id: "1",
      name: "Smart Learning Bricks",
      category: "Arabella",
      image: "/images/s31.png",
      price: "Rp 150.000",
    },
    {
      id: "2",
      name: "Wooden Busy Board House",
      category: "Deuter",
      image: "/images/s32.png",
      price: "Rp 250.000",
    },
    {
      id: "3",
      name: "Wooden Geometric Shapes",
      category: "Geometrical Blocks",
      image: "/images/s33.png",
      price: "Rp 180.000",
    },
    {
      id: "4",
      name: "Wooden Jigsaw Puzzle",
      category: "Deuter",
      image: "/images/s31.png",
      price: "Rp 120.000",
    },
  ];

  const values = [
    {
      iconUrl: "https://toytime-theme.myshopify.com/cdn/shop/files/Group_141026.png?v=1707983157&width=1420",
      title: "Curated Learning Furniture",
      titleId: "Ramah Lingkungan",
      desc: "Essential items like tables, chairs, and bookshelves designed to enrich children’s learning and play.",
      descId: "Bahan berkelanjutan",
    },
    {
      iconUrl: "https://toytime-theme.myshopify.com/cdn/shop/files/Group_141027.png?v=1707983157&width=1420",
      title: "Handcrafted from Solid Wood",
      titleId: "Kualitas Terjamin",
      desc: "Made from premium solid wood—durable, natural, and aesthetically pleasing.",
      descId: "Keunggulan buatan tangan",
    },
    {
      iconUrl: "https://toytime-theme.myshopify.com/cdn/shop/files/Layer_1_4818643e-2a05-4b26-8654-e6fab905dd6d.png?v=1707983157&width=1420",
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
            UMKM Legowo adalah pengrajin lokal yang menghadirkan berbagai produk
            edukatif dan furnitur anak-anak dari kayu — mulai dari APE Indoor,
            APE Outdoor, Meja Kursi Anak, Stand Usaha, hingga Rak Buku dan meja.
          </p>
          <Link
            href="/products"
            className="group relative inline-flex items-center px-6 md:px-8 py-2 bg-orange-500 rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {/* Efek putih membesar dari kanan */}
            <span className="absolute right-2 w-12 h-12 bg-white rounded-full z-0 transition-all duration-500 ease-in-out group-hover:w-53 group-hover:right-5"></span>

            {/* Teks tombol */}
            <span className="font-mochiyPopOne relative z-10 text-white font-semibold transition-colors duration-500 group-hover:text-orange-500">
              View Collection
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
            FUN FOR{" "}
            <span className="font-mochiyPopOne text-orange-500">ALL AGES</span>
          </h2>
          <p className="text-base md:text-lg text-gray-700 mb-10">
            Toys for kids of every age, stage, and ability!
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-center">
            {/* 0–12 months */}
            <div className="font-mochiyPopOne flex flex-col items-center group transition-transform duration-300 hover:-translate-y-1 cursor-pointer">
              <img
                src="/images/0-12.png"
                alt="0-12 months"
                className="w-35 h-35 object-contain mb-2"
              />
              <span className="bg-red-400 text-white px-4 py-2 rounded-full text-sm font-medium group-hover:opacity-90">
                0–12 months
              </span>
            </div>


            {/* 1–2 years */}
            <div className="font-mochiyPopOne flex flex-col items-center group transition-transform duration-300 hover:-translate-y-1 cursor-pointer">
              <img
                src="/images/1-2.png"
                alt="1-2 years"
                className="w-35 h-35 object-contain mb-2"
              />
              <span className="bg-orange-400 text-white px-4 py-2 rounded-full text-sm font-medium group-hover:opacity-90">
                1–2 years
              </span>
            </div>


            {/* 2–3 years */}
            <div
              className="font-mochiyPopOne flex flex-col items-center group transition-transform duration-300 hover:-translate-y-1 cursor-default"
            >
              <img
                src="/images/2-3.png"
                alt="2-3 years"
                className="font-mochiyPopOnew-35 h-35 object-contain mb-2"
              />
              <span className="bg-blue-400 text-white px-4 py-2 rounded-full text-sm font-medium group-hover:opacity-90">
                2–3 years
              </span>
            </div>

            {/* 3–5 years */}
            <div
              className="font-mochiyPopOne flex flex-col items-center group transition-transform duration-300 hover:-translate-y-1 cursor-default"
            >
              <img
                src="/images/3-5.png"
                alt="3-5 years"
                className="w-35 h-35 object-contain mb-2"
              />
              <span className="bg-amber-400 text-white px-4 py-2 rounded-full text-sm font-medium group-hover:opacity-90">
                3–5 years
              </span>
            </div>

            {/* 6–8 years */}
            <div
              className="font-mochiyPopOne flex flex-col items-center group transition-transform duration-300 hover:-translate-y-1 cursor-default"
            >
              <img
                src="/images/6-8.png"
                alt="6-8 years"
                className="w-35 h-35 object-contain mb-2"
              />
              <span className="bg-green-400 text-white px-4 py-2 rounded-full text-sm font-medium group-hover:opacity-90">
                6–8 years
              </span>
            </div>

          </div>
        </div>
      </section >
      {/* Featured Products Section */}
      <section className="py-16 px-10 bg-white" >
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

          {/* <p className="text-lg text-gray-600 text-center mb-10">
            {t.featuredProducts.description}
          </p> */}

          {/* PRODUCT CARD */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Navigation Arrows */}
          {/* <button className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition">
            <ArrowLeft className="h-6 w-6 text-gray-700" />
          </button>
          <button className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition">
            <ArrowRight className="h-6 w-6 text-gray-700" />
          </button> */}

          {/* BUTTON VIEW ALL */}
          {/* <div className="text-center mt-12">
            <Link
              href="/products"
              className="bg-orange-500 text-white font-semibold px-8 py-3 rounded-full hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl"
            >
              {t.featuredProducts.viewAll}
            </Link>
          </div> */}
        </div>
      </section >

      {/* Marquee Section */}
      <div className="w-full bg-gray-100 py-12 px-10" >
        <span className="flex justify-center mb-3">
          <h2 className="mx-12 text-center font-bold font-plusJakartaSans text-black/60 ">Our brand trusted partners</h2>
        </span>
        <Marquee
          pauseOnHover
          className="text-3xl font-bold font-mochiyPopOne text-orange-500/80 [--gap:5rem] [--duration:18s] flex justify-center"
        >
          <span className="mx-12">Zyfini Edukasi</span>
          <span className="mx-12">Propan</span>
        </Marquee>

      </div >

      {/* Why Choose Us Section */}
      <section className="bg-gray-50 py-10 px-10" >
        <div className="font-mochiyPopOne text-[#1c2957] max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div
            id="why-choose-us-image"

            data-animate
          >
            <img
              src="https://toytime-theme.myshopify.com/cdn/shop/files/Mask_group_3514798e-7d90-4144-a900-c6b97e546f20.png?v=1707983159"
              alt="Crafting furniture"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            id="why-choose-us-content"
            className="prose max-w-none"
            data-animate
          >
            <h2 className="text-3xl text-gray-800 mb-5">
              The Unique Appeal of <span className="text-orange-500 font-semibold">Zyfini Edukasi</span>  Wooden Creations
            </h2>

            <p className="text-gray-600 mb-6">{t.whyChooseUs.description}</p>
            <ul className="space-y-8">
              {values.map((value, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0">
                    <img src={value.iconUrl} alt={value.title} className="w-10 h-10 text-orange-500" />

                  </div>
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
      </section >

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
    </div >
  );
};

export default Index;
