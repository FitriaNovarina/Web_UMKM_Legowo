"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductList from "@/components/ProductList";

export default function ProductsPage() {
  const [filters, setFilters] = useState<string[]>([]);

  const toggleFilter = (filter: string) => {
    setFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const removeFilter = (filter: string) => {
    setFilters((prev) => prev.filter((f) => f !== filter));
  };

  const clearAll = () => setFilters([]);



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
                <button
                  onClick={clearAll}
                  className="text-sm text-black hover:underline"
                >
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
                    <button
                      onClick={() => removeFilter(f)}
                      className="ml-2 text-gray-500 hover:text-black"
                    >
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
                  checked={filters.includes("In Stock")}
                  onChange={() => toggleFilter("In Stock")}
                />
                In stock
              </label>
              <label className="flex items-center mt-2">
                <input
                  type="checkbox"
                  className="accent-amber-500 mr-2"
                  checked={filters.includes("Out Of Stock")}
                  onChange={() => toggleFilter("Out Of Stock")}
                />
                Out of stock
              </label>
            </div>

            <div className=" bg-red-100 p-4 rounded-2xl">
              <h3 className="text-lg font-bold mb-3">Price</h3>
              <p className="text-sm text-gray-700 mb-2">
                Price range
              </p>
              <div className="flex justify-between mb-1">
                <span>Min</span>
                <span>Max</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                className="w-full accent-orange-500"
              />
            </div>

            {/* Category Filter */}
            <div className="bg-red-100 p-4 rounded-2xl">
              <h3 className="text-lg font-bold mb-3">Category</h3>
              {[
                "APE Indoor",
                "APE Outdoor",
                "Meja Kursi",
                "Stand Usaha",
                "Rak Buku",
                "Papan Data",
              ].map((cat) => (
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
                {/* TODO: Show accurate product count after implementing pagination */}
                Showing Products
              </p>
              <div className="flex space-x-2 items-center">
                <span className="ml-4 text-gray-700 font-semibold">
                  Sort by:
                </span>
                <select className="ml-2 p-1">
                  <option value="name_asc">Alphabetically, A–Z</option>
                  <option value="name_desc">Alphabetically, Z–A</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            <ProductList />

            {/* Pagination will be handled by ProductList component */}
          </main>
        </div>
      </div>

      <Footer />


    </div>
  );
}
