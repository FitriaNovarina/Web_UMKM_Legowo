
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const BreadcrumbNav: React.FC = () => {
  const location = useLocation();
  const { t } = useLanguage();
  
  const pathnames = location.pathname.split('/').filter((x) => x);
  
  if (pathnames.length === 0) return null;

  const breadcrumbMap: Record<string, { en: string; id: string }> = {
    'products': { en: 'Products', id: 'Produk' },
    'about': { en: 'About', id: 'Tentang' },
    'contact': { en: 'Contact', id: 'Kontak' },
  };

  return (
    <nav className="bg-gray-50 py-3 px-4 border-b">
      <div className="max-w-7xl mx-auto">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link 
              to="/" 
              className="flex items-center text-gray-600 hover:text-wood-600 transition-colors duration-200"
            >
              <Home size={16} />
              <span className="ml-1">{t.nav.home}</span>
            </Link>
          </li>
          
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            const displayName = breadcrumbMap[name] ? 
              (breadcrumbMap[name].en) : 
              name.charAt(0).toUpperCase() + name.slice(1);

            return (
              <li key={name} className="flex items-center">
                <ChevronRight size={16} className="text-gray-400 mx-2" />
                {isLast ? (
                  <span className="text-wood-700 font-medium">{displayName}</span>
                ) : (
                  <Link 
                    to={routeTo}
                    className="text-gray-600 hover:text-wood-600 transition-colors duration-200"
                  >
                    {displayName}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default BreadcrumbNav;
