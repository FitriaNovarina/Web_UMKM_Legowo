
'use client';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Eye, Heart } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  nameId: string;
  price: number;
  image: string;
  category: string;
  badge?: 'bestseller' | 'new';
  slug: string;
}

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

const ProductCard = ({ product, onQuickView }: ProductCardProps) => {
  const { language, t } = useLanguage();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    const productName = language === 'en' ? product.name : product.nameId;
    const message = encodeURIComponent(`Hello! I'm interested in ordering: ${productName} - ${formatPrice(product.price)}`);
    window.open(`https://wa.me/6281234567890?text=${message}`, '_blank');
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group">
      <Link to={`/products/${product.slug}`}>
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={language === 'en' ? product.name : product.nameId}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
          
          {/* Overlay with actions */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
              <button
                onClick={handleQuickView}
                className="bg-white text-gray-800 p-2 rounded-full shadow-lg hover:bg-wood-100 transition-colors duration-200"
                aria-label="Quick view"
              >
                <Eye size={18} />
              </button>
              <button
                className="bg-white text-gray-800 p-2 rounded-full shadow-lg hover:bg-red-100 transition-colors duration-200"
                aria-label="Add to wishlist"
              >
                <Heart size={18} />
              </button>
            </div>
          </div>
          
          {product.badge && (
            <div className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full shadow-md ${
              product.badge === 'bestseller' 
                ? 'bg-wood-500 text-white' 
                : 'bg-green-500 text-white'
            }`}>
              {product.badge === 'bestseller' ? 'Best Seller' : 'New'}
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-6">
        <Link to={`/products/${product.slug}`}>
          <h3 className="font-playfair font-semibold text-gray-900 mb-2 hover:text-wood-700 transition-colors duration-200 text-lg">
            {language === 'en' ? product.name : product.nameId}
          </h3>
        </Link>
        <p className="font-inter text-sm text-gray-600 mb-3">{product.category}</p>
        <div className="flex items-center justify-between">
          <span className="font-playfair text-xl font-bold text-wood-700">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={handleWhatsAppOrder}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            {t.products.orderWhatsApp}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
