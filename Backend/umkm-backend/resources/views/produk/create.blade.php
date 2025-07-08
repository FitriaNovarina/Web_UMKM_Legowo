@extends('layouts.app')

@section('content')
    <div class="container max-w-3xl mx-auto py-8 px-6 bg-white rounded shadow">
        <h2 class="text-3xl font-bold text-gray-800 mb-6">Tambah Produk Baru</h2>

        <form method="POST" action="{{ route('produk-admin.store') }}" enctype="multipart/form-data" class="space-y-6">
            @csrf

            <div>
                <label class="block text-gray-700 font-medium mb-2">Nama Produk</label>
                <input type="text" name="nama"
                    class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required>
            </div>

            <div>
                <label class="block text-gray-700 font-medium mb-2">Kategori</label>
                <select name="kategori"
                    class="w-full border border-gray-300 rounded px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    required>
                    <option value="">-- Pilih Kategori --</option>
                    <option value="ape indoor">APE Indoor</option>
                    <option value="ape outdoor">APE Outdoor</option>
                    <option value="kursi meja">Kursi Meja</option>
                    <option value="stand usaha">Stand Usaha</option>
                    <option value="rak buku">Rak Buku</option>
                    <option value="papan data">Papan Data</option>

                </select>
            </div>

            <div>
                <label class="block text-gray-700 font-medium mb-2">Harga</label>
                <input type="number" name="harga"
                    class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required>
            </div>
            <div>
                <label class="block text-gray-700 font-medium mb-2">Stok</label>
                <input type="number" name="stok" value="{{ old('stok', $produk->stok ?? '') }}"
                    class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required>
            </div>
            <div>
                <label class="block font-medium">Status</label>
                <select name="status" required class="w-full border rounded px-4 py-2">
                    <option value="Ready">Ready</option>
                    <option value="PO">PO</option>
                </select>
            </div>
            <div>
                <label class="block text-gray-700 font-medium mb-2">Deskripsi</label>
                <textarea name="deskripsi" rows="4"
                    class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"></textarea>
            </div>

            <div>
                <label class="block text-gray-700 font-medium mb-2">Gambar Produk</label>
                <input type="file" name="gambar"
                    class="w-full border border-gray-300 rounded px-4 py-2 bg-white file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded file:bg-gray-100">
            </div>

            <div class="pt-4">
                <button type="submit"
                    class="bg-green-600 hover:bg-green-700 transition-colors text-white font-semibold px-6 py-2 rounded shadow">
                    Simpan Produk
                </button>
            </div>
        </form>
    </div>
@endsection
