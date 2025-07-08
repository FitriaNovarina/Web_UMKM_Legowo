
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Package, Info, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { icon: Home, label: t.nav.home, path: '/' },
    { icon: Package, label: t.nav.products, path: '/products' },
    { icon: Info, label: t.nav.about, path: '/about' },
    { icon: MessageCircle, label: t.nav.contact, path: '/contact' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex-1 flex flex-col items-center py-2 px-1 transition-colors duration-200 ${
                isActive 
                  ? 'text-wood-600 bg-wood-50' 
                  : 'text-gray-600 hover:text-wood-600'
              }`}
            >
              <item.icon size={20} />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
