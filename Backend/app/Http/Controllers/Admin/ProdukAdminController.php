<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Produk;
use Illuminate\Http\Request;

class ProdukAdminController extends Controller
{
    public function index(Request $request)
    {
        $query = Produk::query();

        if ($request->has('kategori')) {
            $kategori = strtolower(trim($request->kategori));
            $query->whereRaw('LOWER(kategori) = ?', [$kategori]);
        }

        $produk = $query->latest()->get();

        return view('produk.index', compact('produk'));
    }

    // ✅ Menampilkan form tambah produk
    public function create()
    {
        return view('produk.create');
    }

    // ✅ Menyimpan produk baru
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string',
            'kategori' => 'required|string',
            'harga' => 'required|numeric',
            'deskripsi' => 'nullable|string',
            'gambar' => 'nullable|image',
            'stok' => 'required|integer|min:0',
             'status' => 'required|in:Ready,PO',

        ]);

        if ($request->hasFile('gambar')) {
            $file = $request->file('gambar');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads'), $filename);
            $validated['gambar'] = $filename;
        }

        Produk::create($validated);
        return redirect()->route('produk-admin.index')->with('success', 'Produk berhasil ditambahkan!');
    }

    // ✅ Menampilkan form edit
    public function edit($id)
    {
        $produk = Produk::findOrFail($id);
        return view('produk.edit', compact('produk'));
    }

    // ✅ Menyimpan hasil edit
    public function update(Request $request, $id)
    {
        $produk = Produk::findOrFail($id);

        $validated = $request->validate([
            'nama' => 'required|string',
            'kategori' => 'required|string',
            'harga' => 'required|numeric',
            'deskripsi' => 'nullable|string',
            'gambar' => 'nullable|image',
            'stok' => 'required|integer|min:0',
             'status' => 'required|in:Ready,PO',

        ]);

        if ($request->hasFile('gambar')) {
            $file = $request->file('gambar');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads'), $filename);
            $validated['gambar'] = $filename;
        }

        $produk->update($validated);
        return redirect()->route('produk-admin.index')->with('success', 'Produk berhasil diperbarui!');
    }

    // ✅ Menghapus produk
    public function destroy($id)
    {
        $produk = Produk::findOrFail($id);
        $produk->delete();

        return redirect()->route('produk-admin.index')->with('success', 'Produk berhasil dihapus!');
    }
}
