"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type Language = "en" | "id";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: typeof translations.en;
}

const translations = {
  en: {
    nav: {
      home: "Home",
      products: "Products",
      about: "About",
      contact: "Contact",
    },
    hero: {
      title: "Education Zyfini",
      subtitle:
        "UMKM Legowo is a local craftsman that offers a variety of educational products and children's furniture made from wood — ranging from indoor and outdoor play equipment, children's tables and chairs, business stands, to bookshelves and tables.",
      cta: "View Collection",
    },
    featuredProducts: {
      titlePart1: "Yuk kenalan dengan",
      brandName: "Zyifini Edukasi",
      titlePart2: "Tempatnya Mainan Anak yang",
      highlight: "Mendidik, Aman,",
      punctuation: "dan",
      titlePart3: "Penuh Warna.",
      viewAll: "View All",
    },
    baby : {
      title: "FUN FOR",
      ages: "ALL AGES",
      description: "Toys for kids of every age, stage, and ability!",
    },
    whyChooseUs: {
      title: " The Unique Appeal of Zyfini Edukasi Wooden Creations",
      description:
        "We are committed to providing the best quality products for our customers.",
    },
    cta: {
      title: "Ready to bring warmth and character to your home?",
      description:
        "Explore our collection and find the perfect piece for your space.",
      button: "Shop Now",
    },
    home: {
      featured: "Featured Products",
      categories: "Product Categories",
      story: "Our Story",
      storyText:
        "Born from a passion for traditional Indonesian craftsmanship, Zyfini Edukasi creates beautiful wooden pieces that tell stories of heritage and artistry.",
      values: "Our Values",
      newsletter: "Stay Updated",
      newsletterText:
        "Subscribe to get the latest updates on our new products and exclusive offers.",
    },
    products: {
      title: "Our Collection Of Products",
      search: "Search products...",
      filter: "Filter",
      category: "Category",
      priceRange: "Price Range",
      loadMore: "Load More",
      orderWhatsApp: "Order via WhatsApp",
      featured: "Featured",
      outofstock: "Out of Stock",
      quickview: "Quick View",
      order: "Order",
      age: "Age",
    },
    categories: {
      apeIndoor: "APE Indoor",
      apeOutdoor: "APE Outdoor",
      kursiMeja: "Kursi Meja",
      standUsaha: "Stand Usaha",
      rakBuku: "Rak Buku",
      papanData: "Papan Data",
    },
    about: {
      title: "About Zyfini Edukasi",
      vision: "Our Vision",
      mission: "Our Mission",
      story: "Our Story",
    },
    contact: {
      title: "Contact Us",
      form: {
        name: "Name",
        email: "Email",
        message: "Message",
        send: "Send Message",
      },
      address: "Our Address",
      whatsapp: "Contact via WhatsApp",
    },
    footer: {
      description:
        "Handcrafted wooden home decor and educational toys made with love in Sidoarjo, Indonesia.",
      quickLinks: "Quick Links",
      categories: "Categories",
      contact: "Contact Info",
      rights: "All rights reserved.",
    },
  },
  id: {
    nav: {
      home: "Beranda",
      products: "Produk",
      about: "Tentang",
      contact: "Kontak",
    },
    hero: {
      title: "Zyfini Edukasi",
      subtitle:
        "UMKM Legowo adalah pengrajin lokal yang menghadirkan berbagai produk edukatif dan furnitur anak-anak dari kayu — mulai dari APE Indoor, APE Outdoor, Meja Kursi Anak, Stand Usaha, hingga Rak Buku dan meja",
      cta: "Lihat Koleksi",
    },
    featuredProducts: {
      titlePart1: "Yuk kenalan dengan",
      brandName: "Zyfini Edukasi",
      titlePart2: "Tempatnya Mainan Anak yang",
      highlight: "Mendidik, Aman,",
      punctuation: "dan",
      titlePart3: "Penuh Warna.",
      viewAll: "Lihat Semua",
    },
    baby : {
      title: "MENYENANGKAN UNTUK",
      ages: "SEMUA USIA",
      description: "Mainan untuk anak-anak setiap usia, tahap, dan keterampilan!",
    },
    whyChooseUs: {
      title: "Mengapa Memilih Kami?",
      description:
        "Kami berkomitmen untuk menyediakan produk dengan kualitas terbaik untuk pelanggan kami.",
    },
    cta: {
      title: "Siap membawa kehangatan dan karakter ke rumah Anda?",
      description:
        "Jelajahi koleksi kami dan temukan potongan yang sempurna untuk ruangan Anda.",
      button: "Beli Sekarang",
    },
    home: {
      featured: "Produk Unggulan",
      categories: "Kategori Produk",
      story: "Cerita Kami",
      storyText:
        "Lahir dari passion terhadap kerajinan tradisional Indonesia, Zyfini Edukasi menciptakan karya kayu indah yang bercerita tentang warisan dan seni.",
      values: "Nilai-Nilai Kami",
      newsletter: "Tetap Terhubung",
      newsletterText:
        "Berlangganan untuk mendapatkan update terbaru produk dan penawaran eksklusif kami.",
    },
    products: {
      title: "Koleksi Produk Kami",
      search: "Cari produk...",
      filter: "Filter",
      category: "Kategori",
      priceRange: "Rentang Harga",
      loadMore: "Muat Lebih Banyak",
      orderWhatsApp: "Pesan via WhatsApp",
      featured: "Unggulan",
      outofstock: "Stok Habis",
      quickview: "Lihat Cepat",
      order: "Pesan",
      age: "Usia",
    },
    categories: {
      homeDecor: "Dekorasi Rumah",
      educationalToys: "Mainan Edukatif",
      furniture: "Furniture",
    },
    about: {
      title: "Tentang Zyfini Edukasi",
      vision: "Visi Kami",
      mission: "Misi Kami",
      story: "Cerita Kami",
    },
    contact: {
      title: "Hubungi Kami",
      form: {
        name: "Nama",
        email: "Email",
        message: "Pesan",
        send: "Kirim Pesan",
      },
      address: "Alamat Kami",
      whatsapp: "Hubungi via WhatsApp",
    },
    footer: {
      description:
        "Dekorasi rumah kayu dan mainan edukatif buatan tangan dengan cinta di Sidoarjo, Indonesia.",
      quickLinks: "Tautan Cepat",
      categories: "Kategori",
      contact: "Info Kontak",
      rights: "Hak cipta dilindungi.",
    },
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "id")) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "id" : "en";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  return (
    <LanguageContext.Provider
      value={{ language, toggleLanguage, t: translations[language] }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
