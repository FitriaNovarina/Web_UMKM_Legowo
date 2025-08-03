// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const kategori = searchParams.get('kategori');
  const search = searchParams.get('search');

  const params = new URLSearchParams();
  if (kategori) {
    params.append('kategori', kategori);
  }
  if (search) {
    params.append('search', search);
  }
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const apiUrl = `${baseUrl}/produk?${params.toString()}`;

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
