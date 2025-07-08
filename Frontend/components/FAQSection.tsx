
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const FAQSection: React.FC = () => {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What materials do you use for your products?',
      questionId: 'Bahan apa yang digunakan untuk produk Anda?',
      answer: 'We use premium quality solid wood, primarily teak and mahogany, sourced sustainably from certified forests in Indonesia.',
      answerId: 'Kami menggunakan kayu solid berkualitas premium, terutama jati dan mahoni, yang bersumber berkelanjutan dari hutan bersertifikat di Indonesia.',
    },
    {
      question: 'How long does shipping take?',
      questionId: 'Berapa lama waktu pengiriman?',
      answer: 'Domestic shipping within Indonesia takes 3-7 business days. International shipping takes 7-14 business days depending on the destination.',
      answerId: 'Pengiriman domestik dalam Indonesia membutuhkan waktu 3-7 hari kerja. Pengiriman internasional membutuhkan waktu 7-14 hari kerja tergantung tujuan.',
    },
    {
      question: 'Do you offer custom designs?',
      questionId: 'Apakah menyediakan desain custom?',
      answer: 'Yes, we offer custom design services. Please contact us with your requirements and we will provide a quote within 24 hours.',
      answerId: 'Ya, kami menyediakan layanan desain custom. Silakan hubungi kami dengan kebutuhan Anda dan kami akan memberikan penawaran dalam 24 jam.',
    },
    {
      question: 'What is your return policy?',
      questionId: 'Bagaimana kebijakan pengembalian?',
      answer: 'We offer a 30-day return policy for unused items in original condition. Custom items are non-returnable.',
      answerId: 'Kami menawarkan kebijakan pengembalian 30 hari untuk barang yang tidak digunakan dalam kondisi asli. Barang custom tidak dapat dikembalikan.',
    },
    {
      question: 'How do I care for wooden products?',
      questionId: 'Bagaimana cara merawat produk kayu?',
      answer: 'Clean with a soft, dry cloth. Use wood polish monthly. Avoid direct sunlight and excessive moisture.',
      answerId: 'Bersihkan dengan kain lembut dan kering. Gunakan poles kayu setiap bulan. Hindari sinar matahari langsung dan kelembaban berlebih.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-craft-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className=" font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {language === 'en' ? 'Frequently Asked Questions' : 'Pertanyaan yang Sering Diajukan'}
          </h2>
          <div className="w-24 h-1 bg-wood-600 mx-auto"></div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
              >
                <h3 className="font-inter font-semibold text-gray-900">
                  {language === 'en' ? faq.question : faq.questionId}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="text-wood-600 flex-shrink-0" size={20} />
                ) : (
                  <ChevronDown className="text-gray-400 flex-shrink-0" size={20} />
                )}
              </button>

              {openIndex === index && (
                <div className="px-6 pb-4 animate-slide-up">
                  <p className="text-gray-700 leading-relaxed">
                    {language === 'en' ? faq.answer : faq.answerId}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
