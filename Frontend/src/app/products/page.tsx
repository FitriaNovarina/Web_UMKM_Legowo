"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ProductCard, Product } from "@/components/ProductCard"; // Import ProductCard and Product interface

// Updated dummyProducts to match the new Product interface
const dummyProducts: Product[] = Array.from({ length: 12 }, (_, i) => ({
  id: `${i + 1}`,
  name_id: `Mainan Puzzle Kayu ${i + 1}`,
  name_en: `Wooden Puzzle Toy ${i + 1}`,
  description_id:
    "Puzzle kayu edukatif untuk membantu perkembangan motorik anak.",
  description_en:
    "Educational wooden puzzle to help with child motor skill development.",
  images: [`/images/s3${(i % 3) + 1}.png`, "/images/apeindoor.png"],
  category: i % 2 === 0 ? "Educational Toys" : "Home Decor",
  price: 150000 + i * 10000,
  ageRange: "3-5 years",
  dimensions: { length: 20, width: 20, height: 2 },
  materials: ["Wood", "Non-toxic Paint"],
  weight: 0.5,
  inStock: i % 4 !== 0, // Make some items out of stock
  featured: i % 3 === 0, // Make some items featured
}));

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null
  ); // State for Quick View
  const itemsPerPage = 6;

  // Handler for Quick View
  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
    console.log("Quick View for:", product.name_en);
    // Here you would typically open a modal
  };

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = dummyProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(dummyProducts.length / itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
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
                In stock (23)
              </label>
              <label className="flex items-center mt-2">
                <input
                  type="checkbox"
                  className="accent-amber-500 mr-2"
                  checked={filters.includes("Out Of Stock")}
                  onChange={() => toggleFilter("Out Of Stock")}
                />
                Out of stock (14)
              </label>
            </div>

            <div className=" bg-red-100 p-4 rounded-2xl">
              <h3 className="text-lg font-bold mb-3">Price</h3>
              <p className="text-sm text-gray-700 mb-2">
                The highest price is $30.00
              </p>
              <div className="flex justify-between mb-1">
                <span>$0</span>
                <span>$30</span>
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
                Showing {indexOfFirstItem + 1}–
                {Math.min(indexOfLastItem, dummyProducts.length)} of{" "}
                {dummyProducts.length} Results
              </p>
              <div className="flex space-x-2 items-center">
                <span className="ml-4 text-gray-700 font-semibold">
                  Sort by:
                </span>
                <select className="ml-2 p-1">
                  <option>Alphabetically, A–Z</option>
                  <option>Alphabetically, A–Z</option>
                  <option>Alphabetically, A–Z</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {currentProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={handleQuickView}
                  index={index}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-3 pt-6">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-white font-semibold transition ${
                  currentPage === 1
                    ? "bg-orange-300 cursor-not-allowed"
                    : "bg-orange-500 hover:bg-orange-600"
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
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-white font-semibold transition ${
                      currentPage === page
                        ? "bg-orange-600"
                        : "bg-orange-500/70 hover:bg-orange-500"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-white font-semibold transition ${
                  currentPage === totalPages
                    ? "bg-orange-300 cursor-not-allowed"
                    : "bg-orange-500 hover:bg-orange-600"
                }`}
              >
                →
              </button>
            </div>
          </main>
        </div>
      </div>

      <Footer />

      {/* A simple placeholder for the quick view modal */}
      {quickViewProduct && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          onClick={() => setQuickViewProduct(null)}
        >
          <div
            className="bg-white p-8 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4">
              {quickViewProduct.name_en}
            </h2>
            <p>{quickViewProduct.description_en}</p>
            <button
              onClick={() => setQuickViewProduct(null)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
