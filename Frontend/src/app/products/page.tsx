'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const dummyProducts = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  name: 'Alphabet Puzzle Toy',
  image: `/images/product${(i % 3) + 1}.png`,
  price: 29.99,
  category: 'Educational',
}));

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const toggleFilter = (filter: string) => {
    setFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const removeFilter = (filter: string) => {
    setFilters((prev) => prev.filter((f) => f !== filter));
  };

  const clearAll = () => setFilters([]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = dummyProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(dummyProducts.length / itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="text-gray-800 bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      <div className="max-w-7xl mx-auto flex-grow px-6 md:px-8 lg:px-15 py-25">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Filter */}
          <aside className="space-y-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-bold">Filter:</h3>
              {filters.length > 0 && (
                <button onClick={clearAll} className="text-sm text-black hover:underline">
                  Remove all
                </button>
              )}
            </div>

            {filters.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {filters.map((f) => (
                  <span
                    key={f}
                    className="bg-white border border-gray-300 rounded-full px-3 py-1 flex items-center text-sm"
                  >
                    {f}
                    <button onClick={() => removeFilter(f)} className="ml-2 text-gray-500 hover:text-black">
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}

            <div className="bg-red-100 p-4 rounded-2xl">
              <h3 className="text-lg font-bold mb-3">Availability</h3>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="accent-amber-500 mr-2"
                  checked={filters.includes('In Stock')}
                  onChange={() => toggleFilter('In Stock')}
                />
                In stock (23)
              </label>
              <label className="flex items-center mt-2">
                <input
                  type="checkbox"
                  className="accent-amber-500 mr-2"
                  checked={filters.includes('Out Of Stock')}
                  onChange={() => toggleFilter('Out Of Stock')}
                />
                Out of stock (14)
              </label>
            </div>

            <div className=" bg-red-100 p-4 rounded-2xl">
              <h3 className="text-lg font-bold mb-3">Price</h3>
              <p className="text-sm text-gray-700 mb-2">The highest price is $30.00</p>
              <div className="flex justify-between mb-1">
                <span>$0</span>
                <span>$30</span>
              </div>
              <input type="range" min="0" max="30" className="w-full accent-orange-500" />
            </div>

            {/* Category Filter */}
            <div className="bg-red-100 p-4 rounded-2xl">
              <h3 className="text-lg font-bold mb-3">Category</h3>
              {['APE Indoor', 'APE Outdoor', 'Meja Kursi', 'Stand Usaha', 'Rak Buku', 'Papan Data'].map((cat) => (
                <label key={cat} className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    className="accent-amber-500 mr-2"
                    checked={filters.includes(cat)}
                    onChange={() => toggleFilter(cat)}
                  />
                  {cat}
                </label>
              ))}
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-6">
            <div className="flex flex-wrap justify-between items-center bg-red-100 px-6 py-4 rounded-2xl">
              <p className="text-md text-gray-800 font-semibold">
                Showing {indexOfFirstItem + 1}–{Math.min(indexOfLastItem, dummyProducts.length)} of {dummyProducts.length} Results
              </p>
              <div className="flex space-x-2 items-center">
                <span className="ml-4 text-gray-700 font-semibold">Sort by:</span>
                <select className="ml-2 p-1">
                  <option>Alphabetically, A–Z</option>
                  <option>Alphabetically, A–Z</option>
                  <option>Alphabetically, A–Z</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {currentProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-xl p-4 shadow-md">
                  <div className="bg-white rounded overflow-hidden mb-3">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="rounded object-contain"
                    />
                  </div>
                  <h3 className="text-md font-semibold text-gray-800 mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.category}</p>
                  <p className="text-lg font-bold text-orange-600 mt-1">${product.price.toFixed(2)}</p>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-3 pt-6">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-white font-semibold transition ${currentPage === 1 ? 'bg-orange-300 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'
                  }`}
              >
                ←
              </button>

              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-white font-semibold transition ${currentPage === page ? 'bg-orange-600' : 'bg-orange-500/70 hover:bg-orange-500'
                      }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-white font-semibold transition ${currentPage === totalPages ? 'bg-orange-300 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'
                  }`}
              >
                →
              </button>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
