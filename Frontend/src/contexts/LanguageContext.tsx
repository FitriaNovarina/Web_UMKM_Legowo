
'use client';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'en' | 'id';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: typeof translations.en;
}

const translations = {
  en: {
    nav: {
      home: 'Home',
      products: 'Products',
      about: 'About',
      contact: 'Contact',
    },
    hero: {
      title: 'Crafting Comfort. Redefining Spaces.',
      subtitle: 'Handcrafted wooden home decor and educational toys that bring warmth and character to your living spaces.',
      cta: 'Explore Our Catalog',
    },
    home: {
      featured: 'Featured Products',
      categories: 'Product Categories',
      story: 'Our Story',
      storyText: 'Born from a passion for traditional Indonesian craftsmanship, Legowo creates beautiful wooden pieces that tell stories of heritage and artistry.',
      values: 'Our Values',
      newsletter: 'Stay Updated',
      newsletterText: 'Subscribe to get the latest updates on our new products and exclusive offers.',
    },
    products: {
      title: 'Our Collection Of Products',
      search: 'Search products...',
      filter: 'Filter',
      category: 'Category',
      priceRange: 'Price Range',
      loadMore: 'Load More',
      orderWhatsApp: 'Order via WhatsApp',
    },
    categories: {
      homeDecor: 'Home Decor',
      educationalToys: 'Educational Toys',
      furniture: 'Furniture',
    },
    about: {
      title: 'About Legowo',
      vision: 'Our Vision',
      mission: 'Our Mission',
      story: 'Our Story',
    },
    contact: {
      title: 'Contact Us',
      form: {
        name: 'Name',
        email: 'Email',
        message: 'Message',
        send: 'Send Message',
      },
      address: 'Our Address',
      whatsapp: 'Contact via WhatsApp',
    },
    footer: {
      description: 'Handcrafted wooden home decor and educational toys made with love in Yogyakarta, Indonesia.',
      quickLinks: 'Quick Links',
      categories: 'Categories',
      contact: 'Contact Info',
      rights: 'All rights reserved.',
    },
  },
  id: {
    nav: {
      home: 'Beranda',
      products: 'Produk',
      about: 'Tentang',
      contact: 'Kontak',
    },
    hero: {
      title: 'Menciptakan Kenyamanan. Mendefinisikan Ulang Ruang.',
      subtitle: 'Dekorasi rumah kayu dan mainan edukatif buatan tangan yang menghadirkan kehangatan dan karakter pada ruang hidup Anda.',
      cta: 'Jelajahi Katalog Kami',
    },
    home: {
      featured: 'Produk Unggulan',
      categories: 'Kategori Produk',
      story: 'Cerita Kami',
      storyText: 'Lahir dari passion terhadap kerajinan tradisional Indonesia, Legowo menciptakan karya kayu indah yang bercerita tentang warisan dan seni.',
      values: 'Nilai-Nilai Kami',
      newsletter: 'Tetap Terhubung',
      newsletterText: 'Berlangganan untuk mendapatkan update terbaru produk dan penawaran eksklusif kami.',
    },
    products: {
      title: 'Koleksi Produk Kami',
      search: 'Cari produk...',
      filter: 'Filter',
      category: 'Kategori',
      priceRange: 'Rentang Harga',
      loadMore: 'Muat Lebih Banyak',
      orderWhatsApp: 'Pesan via WhatsApp',
    },
    categories: {
      homeDecor: 'Dekorasi Rumah',
      educationalToys: 'Mainan Edukatif',
      furniture: 'Furniture',
    },
    about: {
      title: 'Tentang Legowo',
      vision: 'Visi Kami',
      mission: 'Misi Kami',
      story: 'Cerita Kami',
    },
    contact: {
      title: 'Hubungi Kami',
      form: {
        name: 'Nama',
        email: 'Email',
        message: 'Pesan',
        send: 'Kirim Pesan',
      },
      address: 'Alamat Kami',
      whatsapp: 'Hubungi via WhatsApp',
    },
    footer: {
      description: 'Dekorasi rumah kayu dan mainan edukatif buatan tangan dengan cinta di Yogyakarta, Indonesia.',
      quickLinks: 'Tautan Cepat',
      categories: 'Kategori',
      contact: 'Info Kontak',
      rights: 'Hak cipta dilindungi.',
    },
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'id')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'id' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
