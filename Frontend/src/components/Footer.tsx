
'use client';
import Link from 'next/link';

import { useLanguage } from '@/contexts/LanguageContext';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white/80 text-[#292f36]/200">
      <div className="max-w-7xl mx-auto px-20 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <img
                  src="/images/logonav.png" // ganti path ini sesuai dengan lokasi gambar Anda
                  alt="Logo Legowo"
                  className="object-contain w-full h-full"
                />
              </div>
              <span className="text-xl font-bold">Legowo</span>
            </div>
            <p className="text-[#292f36]/60 text-sm leading-relaxed">
              {t.footer.description}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-[#ff5b35]/80 hover:text-white transition-colors duration-200">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-[#ff5b35]/80 hover:text-white transition-colors duration-200">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-[#ff5b35]/80 hover:text-white transition-colors duration-200">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t.footer.quickLinks}</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-[#292f36]/60 hover:text-[#ff5b35]/80 transition-colors duration-200">{t.nav.home}</Link></li>
              <li><Link href="/products" className="text-[#292f36]/50 hover:text-[#ff5b35]/80 transition-colors duration-200">{t.nav.products}</Link></li>
              <li><Link href="/about" className="text-[#292f36]/50 hover:text-[#ff5b35]/80 transition-colors duration-200">{t.nav.about}</Link></li>
              <li><Link href="/contact" className="text-[#292f36]/50 hover:text-[#ff5b35]/80 transition-colors duration-200">{t.nav.contact}</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t.footer.categories}</h3>
            <ul className="space-y-2">
              <li>
                <a href="/products?kategori=APE%20Indoor" className="text-[#292f36]/50 hover:text-[#ff5b35]/80 transition-colors duration-200">
                  {t.categories.apeIndoor}
                </a>
              </li>
              <li>
                <a href="/products?kategori=APE%20Outdoor" className="text-[#292f36]/50 hover:text-[#ff5b35]/80 transition-colors duration-200">
                  {t.categories.apeOutdoor}
                </a>
              </li>
              <li>
                <a href="/products?kategori=Kursi%20Meja" className="text-[#292f36]/50 hover:text-[#ff5b35]/80 transition-colors duration-200">
                  {t.categories.kursiMeja}
                </a>
              </li>
              <li>
                <a href="/products?kategori=Stand%20Usaha" className="text-[#292f36]/50 hover:text-[#ff5b35]/80 transition-colors duration-200">
                  {t.categories.standUsaha}
                </a>
              </li>
              <li>
                <a href="/products?kategori=Rak%20Buku" className="text-[#292f36]/50 hover:text-[#ff5b35]/80 transition-colors duration-200">
                  {t.categories.rakBuku}
                </a>
              </li>
              <li>
                <a href="/products?kategori=Papan%20Data" className="text-[#292f36]/50 hover:text-[#ff5b35]/80 transition-colors duration-200">
                  {t.categories.papanData}
                </a>
              </li>
            </ul>
          </div>


          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t.footer.contact}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-[#ff5b35]/80" />
                <span className="text-[#292f36]/50 text-sm">Sidoarjo, Indonesia</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-[#ff5b35]/80" />
                <span className="text-[#292f36]/50 text-sm">+62 812-1767-4477</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-[#ff5b35]/80" />
                <span className="text-[#292f36]/50 text-sm">rusianaa965@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-amber-800 mt-8 pt-8 text-center">
          <p className="text-[#292f36]/50 text-sm">
            © 2025 Zyfini Edukasi. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
