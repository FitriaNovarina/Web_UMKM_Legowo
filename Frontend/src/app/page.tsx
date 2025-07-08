"use client";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
// import { products } from '@/data/products';
import { ArrowRight, Leaf, Award, Heart, Users } from "lucide-react";
import Link from "next/link";
// import ProductCard from '@/components/ProductCard';
import TestimonialsSection from "@/components/TestimonialsSection";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// import QuickViewModal from '@/components/QuickViewModal';
import { Truculenta, Fredoka } from 'next/font/google';


const poppins = Truculenta({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});
const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});


const Index = () => {
  const { t } = useLanguage();
  const [animatedElements, setAnimatedElements] = useState<Set<string>>(
    new Set()
  );
  const [isLoading, setIsLoading] = useState(true);
  // const [quickViewProduct, setQuickViewProduct] = useState<any>(null);
  // const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimatedElements((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [isLoading]);

  // const handleQuickView = (product: any) => {
  //   setQuickViewProduct(product);
  //   setIsQuickViewOpen(true);
  // };

  // const featuredProducts = products.slice(0, 3);
  const categories = [
    {
      id: "home-decor",
      name: t.categories.homeDecor,
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      count: "15+ Products",
    },
    {
      id: "educational-toys",
      name: t.categories.educationalToys,
      image:
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop",
      count: "12+ Products",
    },
    {
      id: "furniture",
      name: t.categories.furniture,
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      count: "8+ Products",
    },
  ];


  const values = [
    {
      icon: Leaf,
      title: "Eco-Friendly",
      titleId: "Ramah Lingkungan",
      desc: "Sustainable materials",
      descId: "Bahan berkelanjutan",
    },
    {
      icon: Award,
      title: "Quality Crafted",
      titleId: "Kualitas Terjamin",
      desc: "Handmade excellence",
      descId: "Keunggulan buatan tangan",
    },
    {
      icon: Heart,
      title: "Made with Love",
      titleId: "Dibuat dengan Cinta",
      desc: "Passion in every piece",
      descId: "Passion di setiap karya",
    },
    {
      icon: Users,
      title: "Family Business",
      titleId: "Bisnis Keluarga",
      desc: "Traditional heritage",
      descId: "Warisan tradisional",
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
          <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
            {t.hero.title}
          </h1>
          <p className="font-inter text-lg md:text-xl lg:text-2xl text-white/90 mb-8 animate-fade-in animation-delay-300 max-w-2xl mx-auto">
            UMKM Legowo adalah pengrajin lokal yang menghadirkan berbagai produk edukatif dan furnitur anak-anak dari kayu — mulai dari APE Indoor, APE Outdoor, Meja Kursi Anak, Stand Usaha, hingga Rak Buku.
          </p>
          <Link
            href="/products"
            className="group relative inline-flex items-center px-6 md:px-8 py-2 bg-orange-500 rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {/* Efek putih membesar dari kanan */}
            <span
              className="absolute right-2 w-12 h-12 bg-white rounded-full z-0 transition-all duration-500 ease-in-out group-hover:w-52 group-hover:right-2"
            ></span>

            {/* Teks tombol */}
            <span className="relative z-10 text-white font-semibold transition-colors duration-500 group-hover:text-orange-500">
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
      <section className="py-16 bg-[#f5f4f5]">
        <div className="max-w-7xl mx-auto px-50 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            FUN FOR <span className="italic text-indigo-700">ALL AGES</span>
          </h2>
          <p className="text-base md:text-lg text-gray-700 mb-10">
            Toys for kids of every age, stage, and ability!
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-center">
            {/* 0–12 months */}
            <Link
              href="/products?age=0-12"
              className="flex flex-col items-center group transition-transform duration-300 hover:-translate-y-1"
            >
              <img
                src="/images/0-12.png"
                alt="0-12 months"
                className="w-35 h-35 object-contain mb-2"
              />
              <span className="bg-red-400 text-white px-4 py-2 rounded-full text-sm font-medium group-hover:opacity-90">
                0–12 months
              </span>
            </Link>

            {/* 1–2 years */}
            <Link
              href="/products?age=1-2"
              className="flex flex-col items-center group transition-transform duration-300 hover:-translate-y-1"
            >
              <img
                src="/images/1-2.png"
                alt="1-2 years"
                className="w-35 h-35 object-contain mb-2"
              />
              <span className="bg-orange-400 text-white px-4 py-2 rounded-full text-sm font-medium group-hover:opacity-90">
                1–2 years
              </span>
            </Link>

            {/* 2–3 years */}
            <Link
              href="/products?age=2-3"
              className="flex flex-col items-center group transition-transform duration-300 hover:-translate-y-1"
            >
              <img
                src="/images/2-3.png"
                alt="2-3 years"
                className="w-35 h-35 object-contain mb-2"
              />
              <span className="bg-blue-400 text-white px-4 py-2 rounded-full text-sm font-medium group-hover:opacity-90">
                2–3 years
              </span>
            </Link>

            {/* 3–5 years */}
            <Link
              href="/products?age=3-5"
              className="flex flex-col items-center group transition-transform duration-300 hover:-translate-y-1"
            >
              <img
                src="/images/3-5.png"
                alt="3-5 years"
                className="w-35 h-35 object-contain mb-2"
              />
              <span className="bg-teal-400 text-white px-4 py-2 rounded-full text-sm font-medium group-hover:opacity-90">
                3–5 years
              </span>
            </Link>

            {/* 6–8 years */}
            <Link
              href="/products?age=6-8"
              className="flex flex-col items-center group transition-transform duration-300 hover:-translate-y-1"
            >
              <img
                src="/images/6-8.png"
                alt="6-8 years"
                className="w-35 h-35 object-contain mb-2"
              />
              <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium group-hover:opacity-90">
                6–8 years
              </span>
            </Link>
          </div>
        </div>
      </section>
      {/* We Believe In Section */}

      <section className=" bg-white py-0"> <div className="max-w-6xl mx-auto px-70 text-center"> <h2 className={`${poppins.className} text-3xl md:text-4xl font-bold text-blue-800 mb-12`}>WE BELIEVE IN</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Item 1 */}
          <div className="flex flex-col items-center">
            <img
              src="/images/s31.png"
              alt="Open-Ended Play"
              className="h-35 w-auto mb-6"
            />
            <p className={`${poppins.className} text-blue-800 font-semibold text-lg`}>Bermain Tanpa Batas</p>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col items-center">
            <img
              src="/images/s32.png"
              alt="Screen-Free Time"
              className="h-35 w-auto mb-6"
            />
            <p className={`${poppins.className} text-blue-800 font-semibold text-lg`}>Waktu Bebas Layar</p>
          </div>

          {/* Item 3 */}
          <div className="flex flex-col items-center">
            <img
              src="/images/s33.png"
              alt="Sustainably Made Toys"
              className="h-35 w-auto mb-6"
            />
            <p className={`${poppins.className} text-blue-800 font-semibold text-lg whitespace-nowrap`}>Produk Ramah Lingkungan</p>
          </div>
        </div>
      </div></section>
      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Produk Unggulan</h2>
            <p className="text-gray-600 text-base">Temukan produk terbaik dari koleksi kami</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                id: 1,
                name: "Puzzle Edukasi",
                image: "/images/product1.png",
                price: 35.0,
              },
              {
                id: 2,
                name: "Kursi Anak",
                image: "/images/product2.png",
                price: 29.5,
              },
              {
                id: 3,
                name: "Stand Jualan Mini",
                image: "/images/product3.png",
                price: 49.9,
              },
            ].map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow p-4 text-center hover:shadow-md transition">
                <img src={product.image} alt={product.name} className="w-full h-48 object-contain mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
                <p className="text-orange-600 font-bold text-md">Rp {product.price.toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/products"
              className="inline-block px-6 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition"
            >
              Lihat Semua Produk
            </Link>
          </div>
        </div>
      </section>


      {/* Featured Products */}
      {/* 
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            id="featured"
            data-animate
            className={`text-center mb-12 transition-all duration-1000 ${animatedElements.has('featured') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
          >
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.home.featured}</h2>
            <div className="w-24 h-1 bg-wood-600 mx-auto"></div>
          </div>

          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 delay-300 ${animatedElements.has('featured') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
          >
            {featuredProducts.map((product) => (
              <div key={product.id} className="group">
                <ProductCard product={product} onQuickView={() => handleQuickView(product)} />
              </div>
            ))}
          </div>
        </div>
      </section> */}


      {/* Categories */}
      <section className="py-16 md:py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            id="categories"
            data-animate
            className={`text-center mb-12 transition-all duration-1000 ${animatedElements.has("categories")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
              }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.home.categories}
            </h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
          </div>

          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 transition-all duration-1000 delay-300 ${animatedElements.has("categories")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
              }`}
          >
            {categories.map((category, index) => (
              <href
                key={category.id}
                to={`/products?category=${category.id}`}
                className="group relative h-48 md:h-64 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                  style={{ backgroundImage: `url('${category.image}')` }}
                ></div>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300"></div>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm opacity-90">{category.count}</p>
                </div>
              </href>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div
              id="story"
              data-animate
              className={`transition-all duration-1000 ${animatedElements.has("story")
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
                }`}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t.home.story}
              </h2>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
                {t.home.storyText}
              </p>
              <href
                to="/about"
                className="inline-flex items-center text-amber-600 hover:text-amber-700 font-semibold"
              >
                Learn More <ArrowRight className="ml-2" size={16} />
              </href>
            </div>
            <div
              className={`transition-all duration-1000 delay-300 ${animatedElements.has("story")
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
                }`}
            >
              <div className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-xl">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600&h=400&fit=crop')`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Values */}
      <section className="py-16 md:py-20 bg-amber-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            id="values"
            data-animate
            className={`text-center mb-12 transition-all duration-1000 ${animatedElements.has("values")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
              }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t.home.values}
            </h2>
            <div className="w-24 h-1 bg-amber-400 mx-auto"></div>
          </div>

          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 transition-all duration-1000 delay-300 ${animatedElements.has("values")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
              }`}
          >
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon size={32} />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">
                  {value.title}
                </h3>
                <p className="text-amber-100 text-sm md:text-base">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 md:py-20 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.home.newsletter}
          </h2>
          <p className="text-base md:text-lg text-gray-700 mb-8">
            {t.home.newsletterText}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors duration-200 whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>

      </section>


      <Footer />
      {/* Quick View Modal */}
      {/*
      <QuickViewModal
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
      */}
    </div>

  );
};

export default Index;
