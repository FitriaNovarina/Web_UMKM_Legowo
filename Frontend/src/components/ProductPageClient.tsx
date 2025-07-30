"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { X, Loader2 } from "lucide-react";
import ProductList from "@/components/ProductList";

interface Category {
  id: number;
  name: string;
}

export default function ProductPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryFromURL = searchParams.get("kategori");
  const searchQuery = searchParams.get("search");


  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>('nama_asc');
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(Number(searchParams.get('per_page')) || 25);

  const selectedCategory = categoryFromURL && categoryFromURL !== 'All' ? categoryFromURL : undefined;

  useEffect(() => {
    setCurrentPage(Number(searchParams.get('page')) || 1);
    setPerPage(Number(searchParams.get('per_page')) || 25);
  }, [searchParams]);

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

  const handleFilterChange = (type: 'kategori' | 'search', value: string | null) => {
    const params = new URLSearchParams(window.location.search);

    if (type === 'kategori') {
      // When a category is selected, always clear the search
      params.delete('search');
      if (value && value !== 'All') {
        params.set('kategori', value);
      } else {
        // If 'All' is selected or the current category is removed, delete the param
        params.delete('kategori');
      }
    } else if (type === 'search') {
      // When search is cleared
      if (value === null) {
        params.delete('search');
      }
    }
    router.push(`/products?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set('page', page.toString());
    router.push(`/products?${params.toString()}`);
  };

  const handlePerPageChange = (value: number) => {
    setPerPage(value);
    const params = new URLSearchParams(window.location.search);
    params.set('per_page', value.toString());
    params.set('page', '1'); // Reset to first page
    router.push(`/products?${params.toString()}`);
  };



  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar Filter */}
      <aside className="space-y-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-mochiyPopOne text-xl font-bold">Filter:</h3>
          {(categoryFromURL || searchQuery) && (
            <button
              onClick={() => router.push('/products')}
              className="text-sm text-black hover:underline"
            >
              Remove all
            </button>
          )}
        </div>

        {(categoryFromURL || searchQuery) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {searchQuery && (
              <span className="bg-white border border-gray-300 rounded-full px-3 py-1 flex items-center text-sm">
                {`Search: "${searchQuery}"`}
                <button
                  onClick={() => handleFilterChange('search', null)}
                  className="ml-2 text-gray-500 hover:text-black"
                >
                  <X size={12} />
                </button>
              </span>
            )}
            {categoryFromURL && categoryFromURL !== 'All' && (
              <span
                key={categoryFromURL}
                className="bg-white border border-gray-300 rounded-full px-3 py-1 flex items-center text-sm"
              >
                {categoryFromURL}
                <button
                  onClick={() => handleFilterChange('kategori', null)} // Set to null to remove
                  className="ml-2 text-gray-500 hover:text-black"
                >
                  <X size={12} />
                </button>
              </span>
            )}
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
                  checked={!categoryFromURL || categoryFromURL === 'All'}
                  onChange={() => handleFilterChange('kategori', 'All')}
                />
                All
              </label>
              {categories.map((category) => (
                <label key={category.id} className="flex items-center mt-2">
                  <input
                    type="radio"
                    name="category"
                    className="accent-amber-500 mr-2"
                    checked={categoryFromURL === category.name}
                    onChange={() => handleFilterChange('kategori', category.name)}
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

        <ProductList 
          selectedCategory={selectedCategory} 
          sortOption={sortOption} 
          searchQuery={searchQuery} 
          currentPage={currentPage}
          perPage={perPage}
          setTotalPages={setTotalPages}
        />

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-6">
          <div>
            <span className="mr-2">Items per page:</span>
            <select onChange={(e) => handlePerPageChange(Number(e.target.value))} value={perPage}>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
          <div className="flex items-center">
            <button 
              onClick={() => handlePageChange(currentPage - 1)} 
              disabled={currentPage <= 1}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4">Page {currentPage} of {totalPages}</span>
            <button 
              onClick={() => handlePageChange(currentPage + 1)} 
              disabled={currentPage >= totalPages}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}