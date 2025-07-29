"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { X, Loader2 } from "lucide-react";
import ProductList from "@/components/ProductList";

interface Category {
  id: number;
  name: string;
}

export default function ProductPageClient() {
  const searchParams = useSearchParams();
  const categoryFromURL = searchParams.get("kategori");

  const [filters, setFilters] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>('nama_asc');

  useEffect(() => {
    if (categoryFromURL) {
      setFilters([categoryFromURL]);
    } else {
      setFilters(["All"]);
    }
  }, [categoryFromURL]);

  const selectedCategory =
    filters.includes("All") || filters.length === 0 ? undefined : filters[0];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/kategori", {
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data)) {
            setCategories(data.map((name, id) => ({ id, name })));
        } else if (data && Array.isArray(data.data)) {
          setCategories(data.data);
        } else {
          throw new Error("Invalid categories format");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
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
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar Filter */}
      <aside className="space-y-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-mochiyPopOne text-xl font-bold">Filter:</h3>
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
          <h3 className="font-mochiyPopOne text-lg font-bold mb-3">Category</h3>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-4 space-y-2">
              <Loader2 className="animate-spin h-8 w-8 text-amber-500" />
              <p className="text-sm text-gray-600">Loading categories...</p>
            </div>
          ) : error ? (
            <p className="text-red-500">{error}</p>
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
            <select onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
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
  );
}