<?php

// app/Http/Controllers/Api/ProdukController.php
namespace App\Http\Controllers\Api;

use App\Models\Produk;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProdukController extends Controller
{
    /**
     * Menampilkan daftar produk, dapat difilter berdasarkan kategori.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $kategori = $request->query('kategori');

        $validKategori = [
            'APE Indoor',
            'APE Outdoor',
            'Kursi Meja',
            'Papan Data',
            'Rak Buku',
            'Stand Usaha',
        ];


        $query = Produk::query();

        if ($kategori && $kategori !== 'Semua') {
            if (!in_array($kategori, $validKategori)){
                return response()->json(['error' => 'kategori tidak valid'], 400);
            }
            $query->where('kategori', $kategori);
        }

        return response()->json($query->get());
    }

    public function kategori()
{
    return response()->json([
        'APE Indoor',
            'APE Outdoor',
            'Kursi Meja',
            'Papan Data',
            'Rak Buku',
            'Stand Usaha'

    ]);
}

    /**
     * Menyimpan produk baru ke database.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required',
            'kategori' => 'required',
            'harga' => 'required|integer',
            'deskripsi' => 'nullable',
            'gambar' => 'nullable|image',
        ]);

        if ($request->hasFile('gambar')) {
            $file = $request->file('gambar');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads'), $filename);
            $validated['gambar'] = $filename;
        }

        $produk = Produk::create($validated);
        return response()->json($produk, 201);
    }

    /**
     * Menampilkan detail produk berdasarkan ID.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        return response()->json(Produk::findOrFail($id));
    }

    /**
     * Memperbarui data produk berdasarkan ID.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $produk = Produk::findOrFail($id);
        $produk->update($request->all());
        return response()->json($produk);
    }

    /**
     * Menghapus produk berdasarkan ID.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $produk = Produk::findOrFail($id);
        $produk->delete();
        return response()->json(null, 204);
    }
}
