'use client'

import { useEffect, useState } from 'react'
import { ProductCard, Product as ProductCardType } from '@/components/ProductCard'

interface APIProduct {
  id: number
  nama: string
  kategori: string
  harga: number
  stok: number
  status: string
  deskripsi: string
  gambar: string
}

interface ProductListProps {
  selectedCategory?: string;
  sortOption?: string;
  searchQuery?: string | null;
}

export default function ProductList({ selectedCategory, sortOption, searchQuery }: ProductListProps) {
  const [products, setProducts] = useState<APIProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams();
        if (selectedCategory && selectedCategory !== 'Semua') {
          params.append('kategori', selectedCategory);
        }
        if (searchQuery) {
          params.append('search', searchQuery);
        }

        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/produk?${params.toString()}`;
        const res = await fetch(url, { cache: 'no-store' });
        const data = await res.json();

        if (Array.isArray(data)) {
          const sorted = data.sort((a, b) => b.id - a.id); // Default: produk terbaru di atas
          setProducts(sorted);
        } else {
          setProducts([]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Gagal fetch produk:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory, searchQuery]);

  if (loading) return <p>Loading katalog produk...</p>;

  const sortedProducts = [...products];

  if (sortOption === "harga_asc") {
    sortedProducts.sort((a, b) => a.harga - b.harga);
  } else if (sortOption === "harga_desc") {
    sortedProducts.sort((a, b) => b.harga - a.harga);
  } else if (sortOption === "nama_asc") {
    sortedProducts.sort((a, b) => a.nama.localeCompare(b.nama));
  } else if (sortOption === "nama_desc") {
    sortedProducts.sort((a, b) => b.nama.localeCompare(a.nama));
  } else if (sortOption === "terbaru") {
    sortedProducts.sort((a, b) => b.id - a.id);
  }

  const totalItems = sortedProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        {paginatedProducts.map((product, index) => {
          const mapped: ProductCardType = {
            id: String(product.id),
            name_id: product.nama,
            name_en: product.nama,
            description_id: product.deskripsi,
            description_en: product.deskripsi,
            images: [`http://127.0.0.1:8000/uploads/${product.gambar}`],
            category: product.kategori,
            price: product.harga,
            ageRange: '',
            dimensions: { length: 0, width: 0, height: 0 },
            materials: [],
            weight: 0,
            inStock: product.stok > 0,
            featured: false,
          };

          return <ProductCard key={mapped.id} product={mapped} index={index} />;
        })}
      </div>

      {/* Paginasi */}
      <div className="flex justify-center gap-4">
        <button
          className="px-4 py-2 border rounded disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          Sebelumnya
        </button>
        <span className="py-2">Halaman {currentPage} dari {totalPages}</span>
        <button
          className="px-4 py-2 border rounded disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Berikutnya
        </button>
      </div>
    </div>
  );
}
