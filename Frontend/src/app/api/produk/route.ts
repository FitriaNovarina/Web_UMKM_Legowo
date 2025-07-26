// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const kategori = searchParams.get('kategori');

  const apiUrl = kategori
    ? `http://127.0.0.1:8000/api/produk?kategori=${encodeURIComponent(kategori)}`
    : 'http://127.0.0.1:8000/api/produk';

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching produk:', error);
    return NextResponse.json(
      { error: 'Gagal ambil data produk' },
      { status: 500 }
    );
  }
}
