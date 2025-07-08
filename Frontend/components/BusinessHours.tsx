
import React from 'react';
import { Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const BusinessHours: React.FC = () => {
  const { language } = useLanguage();

  const getCurrentTime = () => {
    const now = new Date();
    const jakartaTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Jakarta"}));
    return jakartaTime;
  };

  const isBusinessOpen = () => {
    const now = getCurrentTime();
    const currentHour = now.getHours();
    const currentDay = now.getDay(); // 0 = Sunday, 6 = Saturday
    
    // Business hours: Monday-Saturday 8:00-17:00
    if (currentDay === 0) return false; // Closed on Sunday
    return currentHour >= 8 && currentHour < 17;
  };

  const isOpen = isBusinessOpen();

  return (
    <div className="flex items-center space-x-2 text-sm">
      <Clock size={16} />
      <div className="flex items-center space-x-2">
        <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-500' : 'bg-red-500'}`}></span>
        <span className="font-medium">
          {isOpen 
            ? (language === 'en' ? 'Open Now' : 'Buka Sekarang')
            : (language === 'en' ? 'Closed' : 'Tutup')
          }
        </span>
      </div>
      <span className="text-gray-600">
        {language === 'en' ? 'Mon-Sat 8:00-17:00' : 'Sen-Sab 8:00-17:00'}
      </span>
    </div>
  );
};

export default BusinessHours;
