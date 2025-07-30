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

        const url = `/api/produk?${params.toString()}`;
        const res = await fetch(url, { cache: 'no-store' });
        const data = await res.json();
        // Ensure data is an array before setting state
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          // If API returns something else (e.g., on no results), set an empty array
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

  if (loading) return <p>Loading katalog produk...</p>

  const sortedProducts = [...products]

  if (sortOption === 'harga_asc') {
    sortedProducts.sort((a, b) => a.harga - b.harga)
  } else if (sortOption === 'harga_desc') {
    sortedProducts.sort((a, b) => b.harga - a.harga)
  } else if (sortOption === 'nama_asc') {
    sortedProducts.sort((a, b) => a.nama.localeCompare(b.nama))
  } else if (sortOption === 'nama_desc') {
    sortedProducts.sort((a, b) => b.nama.localeCompare(a.nama))
  }

  if (sortedProducts.length === 0) {
    return <p className="text-center py-8">Tidak ada produk yang tersedia</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {sortedProducts.map((product, index) => {
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
        }

        return <ProductCard key={mapped.id} product={mapped} index={index} />
      })}
    </div>
  )
}