import { Suspense } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductPageClient from '@/components/ProductPageClient';

export default function ProductsPage() {
  return (
    <div className="text-gray-800 bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      <div className="max-w-7xl mx-auto flex-grow px-6 md:px-8 lg:px-15 py-25">
        <Suspense fallback={<div>Loading...</div>}>
          <ProductPageClient />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}