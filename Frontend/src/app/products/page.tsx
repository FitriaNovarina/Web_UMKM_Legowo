"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { X, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductList from "@/components/ProductList";

interface Category {
  id: number;
  name: string;
}

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryFromURL = searchParams.get("kategori");


  const [filters, setFilters] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>('name_asc');


  // Set default selected category from URL (only once on first mount)
  useEffect(() => {
    if (categoryFromURL) {
      setFilters([categoryFromURL]);
    } else {
      setFilters(["All"]);
    }
  }, [categoryFromURL]);

  // Get the selected category
  const selectedCategory =
    filters.includes("All") || filters.length === 0 ? undefined : filters[0];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log("Fetching categories from:", "/api/kategori");
        const response = await fetch("/api/kategori", {
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store", // Prevent caching issues
        });

        console.log("Response status:", response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error response:", errorText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Received categories data:", data);

        if (Array.isArray(data)) {
          if (typeof data[0] === "string") {
            setCategories(data.map((name, id) => ({ id, name })));
          } else if (data[0] && typeof data[0] === "object" && "name" in data[0]) {
            setCategories(data);
          } else {
            throw new Error("Unexpected category format in array");
          }
        } else if (data && Array.isArray(data.data)) {
          setCategories(data.data);
        } else if (data && Array.isArray(data.categories)) {
          setCategories(data.categories);
        } else {
          console.error("Unexpected categories format:", data);
          throw new Error("Invalid categories format received from API");
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
        console.error("Error in fetchCategories:", errorMessage);
        setError(`Failed to load categories: ${errorMessage}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

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

            {/* Category Filter */}
            <div className="bg-red-100 p-4 rounded-2xl">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-bold">Category</h3>
                <button
                  onClick={() => window.location.reload()}
                  className="text-sm text-amber-700 hover:underline"
                >
                  Refresh
                </button>
              </div>
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-4 space-y-2">
                  <Loader2 className="animate-spin h-8 w-8 text-amber-500" />
                  <p className="text-sm text-gray-600">Loading categories...</p>
                </div>
              ) : error ? (
                <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
                  <p className="text-red-700 text-sm">{error}</p>
                  <p className="text-xs text-red-600 mt-1">
                    Please check your console for more details.
                  </p>
                </div>
              ) : (
                <>
                  <label className="flex items-center mt-2">
                    <input
                      type="radio"
                      name="category"
                      className="accent-amber-500 mr-2"
                      checked={filters.length === 0 || filters.includes("All")}
                      onChange={() => setFilters(["All"])}
                    />
                    All
                  </label>
                  {categories.map((category) => (
                    <label key={category.id} className="flex items-center mt-2">
                      <input
                        type="radio"
                        name="category"
                        className="accent-amber-500 mr-2"
                        checked={filters[0] === category.name}
                        onChange={() => setFilters([category.name])}
                      />
                      {category.name}
                    </label>
                  ))}
                </>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-6">
            <div className="flex flex-wrap justify-between items-center bg-red-100 px-6 py-4 rounded-2xl">
              <p className="text-md text-gray-800 font-semibold">
                Showing Products
              </p>
              <div className="flex space-x-2 items-center">
                <span className="ml-4 text-gray-700 font-semibold">
                  Sort by:
                </span>
                <select onChange={(e) => setSortOption(e.target.value)}>
                  <option value="harga_asc">Price: Low to High</option>
                  <option value="harga_desc">Price: High to Low</option>
                  <option value="nama_asc">Alphabetically, A–Z</option>
                  <option value="nama_desc">Alphabetically, Z–A</option>
                </select>

              </div>
            </div>

            <ProductList selectedCategory={selectedCategory} sortOption={sortOption} />

          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
