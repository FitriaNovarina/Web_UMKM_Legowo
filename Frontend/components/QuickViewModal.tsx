
import React from 'react';
import { X, Heart, ShoppingCart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Product {
  id: string;
  name: string;
  nameId: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  descriptionId?: string;
}

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, isOpen, onClose }) => {
  const { language, t } = useLanguage();

  if (!isOpen || !product) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleWhatsAppOrder = () => {
    const productName = language === 'en' ? product.name : product.nameId;
    const message = encodeURIComponent(`Hello! I'm interested in ordering: ${productName} - ${formatPrice(product.price)}`);
    window.open(`https://wa.me/6281234567890?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="font-playfair text-xl font-semibold">Quick View</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          <div>
            <img
              src={product.image}
              alt={language === 'en' ? product.name : product.nameId}
              className="w-full h-64 md:h-80 object-cover rounded-lg"
            />
          </div>
          
          <div className="space-y-4">
            <div>
              <h1 className="font-playfair text-2xl font-bold text-gray-900 mb-2">
                {language === 'en' ? product.name : product.nameId}
              </h1>
              <p className="text-gray-600">{product.category}</p>
            </div>
            
            <div className="text-3xl font-bold text-wood-600">
              {formatPrice(product.price)}
            </div>
            
            <div className="text-gray-700">
              <p>
                {product.description || 'Handcrafted with premium quality materials. Each piece is unique and made with love by our skilled artisans.'}
              </p>
            </div>
            
            <div className="flex space-x-4 pt-4">
              <button
                onClick={handleWhatsAppOrder}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <ShoppingCart size={20} />
                <span>{t.products.orderWhatsApp}</span>
              </button>
              
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <Heart size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
