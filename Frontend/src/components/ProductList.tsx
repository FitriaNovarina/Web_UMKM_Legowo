// app/components/ProductList.tsx
'use client'

import { useEffect, useState } from 'react'

interface Product {
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
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/produk')
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map(product => (
        <div key={product.id} className="border p-4 rounded-xl shadow">
          <img
            src={`http://127.0.0.1:8000/uploads/${product.gambar}`}
            alt={product.nama}
            className="w-full h-48 object-cover rounded"
          />
          <h3 className="font-bold text-xl mt-2">{product.nama}</h3>
          <p className="text-sm text-gray-500">{product.kategori}</p>
          <p className="text-orange-500 font-bold mt-1">Rp {product.harga.toLocaleString()}</p>
          <p className="text-sm text-gray-700">Stok: {product.stok}</p>
          <p className={`text-sm font-medium ${product.status === 'Ready' ? 'text-green-600' : 'text-red-500'}`}>
            {product.status}
          </p>
          <p className="text-sm mt-2">{product.deskripsi}</p>
        </div>
      ))}
    </div>
  )
}