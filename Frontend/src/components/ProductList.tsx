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

export default function ProductList() {
  const [products, setProducts] = useState<APIProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const kategori = 'Semua' // bisa diganti via button click nanti

        const url = kategori === 'Semua'
          ? '/api/produk' // Tanpa query param
          : `/api/produk?kategori=${encodeURIComponent(kategori)}`

        const res = await fetch(url)
        const data = await res.json()
        setProducts(data)
        setLoading(false)
      } catch (error) {
        console.error('Gagal fetch produk:', error)
      }
    }

    fetchData()
  }, [])

  if (loading) return <p>Loading katalog produk...</p>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product, index) => {
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