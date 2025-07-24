// app/components/ProductList.tsx
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
}

export default function ProductList({ selectedCategory }: ProductListProps) {
  const [products, setProducts] = useState<APIProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = selectedCategory && selectedCategory !== 'Semua'
          ? `/api/produk?kategori=${encodeURIComponent(selectedCategory)}`
          : '/api/produk';

        const res = await fetch(url, { cache: 'no-store' })
        const data = await res.json()
        setProducts(data)
        setLoading(false)
      } catch (error) {
        console.error('Gagal fetch produk:', error)
      }
    }

    fetchData()
  }, [selectedCategory])

  if (loading) return <p>Loading katalog produk...</p>

  // Ensure products is always an array
  const productList = Array.isArray(products) ? products : [];

  if (productList.length === 0) {
    return <p className="text-center py-8">Tidak ada produk yang tersedia</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {productList.map((product, index) => {
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