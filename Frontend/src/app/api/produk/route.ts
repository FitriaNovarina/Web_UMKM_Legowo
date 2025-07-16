export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const kategori = searchParams.get('kategori')
  
    const apiUrl = kategori
      ? `http://127.0.0.1:8000/api/produk?kategori=${encodeURIComponent(kategori)}`
      : 'http://127.0.0.1:8000/api/produk'
  
    try {
      const res = await fetch(apiUrl)
      const data = await res.json()
      return Response.json(data)
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Gagal ambil data' }), {
        status: 500,
      })
    }
  }