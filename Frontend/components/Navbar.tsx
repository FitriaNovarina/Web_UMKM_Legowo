"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Menu, X, Globe, ChevronDown, Search } from "lucide-react";
import { Truculenta, Fredoka } from 'next/font/google';

const poppins = Truculenta({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const fredoka = Fredoka({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

const Navbar = () => {
  const pathname = usePathname(); // <== Tambahkan ini
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    if (pathname !== "/") return; // <== Hanya jalankan scroll effect di halaman index

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Navbar background logic
  const navBg =
    pathname === "/"
      ? isScrolled
        ? "bg-[#ff5b35]/80 backdrop-blur-md shadow-md"
        : "bg-transparent"
      : "bg-[#ff5b35] shadow-md"; // <== Tetap oranye di halaman non-home

  const navItems = [
    { href: "/products", label: t.nav.products },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  const categories = ["APE Indoor", "Ape Outdoor", "Meja Kursi", "Stand Usaha", "Rak Buku", "Papan Data"];

  return (
    <nav className={`fixed w-full z-90 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-10">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden">
              <img src="/images/logonav.png" alt="Logo Legowo" className="object-contain w-full h-full" />
            </div>
            <span className={`${fredoka.className} text-4xl font-bold text-white mb-2`}>Legowo</span>
          </Link>

          {/* Search + Category Dropdown */}
          <div
            className={`hidden md:flex items-center w-[40%] rounded-full ${isScrolled
              ? "bg-white/10 backdrop-blur-md shadow-md border border-transparent"
              : "bg-transparent backdrop-blur-0 shadow-none border-[1px] border-white/90"
              }`}
          >



            {/* All Categories Button */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center h-full px-3 py-2 rounded-l-full font-semibold transition-all duration-300 ${fredoka.className} ${isScrolled
                  ? "bg-white text-amber-800 border border-white"
                  : "bg-transparent text-white border border-transparent"
                  }`}
              >
                All Categories <ChevronDown size={16} className="ml-1" />
              </button>


              {isDropdownOpen && (
                <div className="absolute top-12 left-0 bg-white text-black rounded-lg shadow-lg py-4 px-6 z-50 w-[600px] grid grid-cols-3 gap-6">
                  {[
                    { title: "APE Indoor", slug: "ape-indoor", image: "/images/apeindoor.png" },
                    { title: "APE Outdoor", slug: "ape-outdoor", image: "/images/apeoutdoor.png" },
                    { title: "Meja Kursi", slug: "meja-kursi", image: "/images/mejakursi.jpg" },
                    { title: "Stand Usaha", slug: "stand-usaha", image: "/images/standusaha.jpg" },
                    { title: "Rak Buku", slug: "rak-buku", image: "/images/rakbuku.png" },
                    { title: "Papan Data", slug: "papan-data", image: "/images/papandata.png" },
                  ].map((item) => (
                    <Link
                      key={item.slug}
                      href={`/category/${item.slug}`}
                      className="flex flex-col items-center hover:bg-gray-100 rounded-md p-3 transition"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 object-contain mb-2"
                      />
                      <span className={`text-center text-sm font-medium ${fredoka.className}`}>
                        {item.title}
                      </span>
                    </Link>
                  ))}

                </div>
              )}

            </div>

            {/* Search Input */}
            <input
              type="text"
              placeholder="Search"
              className={`flex-grow px-4 py-2 bg-transparent text-white placeholder-white focus:outline-none ${fredoka.className}`}
              style={{ border: "none", boxShadow: "none" }}
            />

            {/* Search Icon Button */}
            <button
              className="rounded-full p-2 hover:bg-white/10 transition"
              style={{ backgroundColor: "transparent", border: "none" }}
            >
              <Search size={18} color="white" />
            </button>
          </div>


          {/* Navigation Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={`${fredoka.className} text-xl font-medium text-white mb-1`}>
                {item.label}
              </Link>
            ))}
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-3 py-1 rounded-full bg-amber-100 hover:bg-amber-200 transition-colors duration-200"
            >
              <Globe size={16} />
              <span className="text-sm font-medium">
                {language.toUpperCase()}
              </span>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-amber-800 hover:bg-gray-50 rounded-md transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-2 px-3 py-2 text-base font-medium text-gray-700 hover:text-amber-800 hover:bg-gray-50 rounded-md transition-colors duration-200 w-full"
              >
                <Globe size={20} />
                <span>
                  {language === "en" ? "English" : "Bahasa Indonesia"}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
