@extends('layouts.app')

@section('content')
    <div class="container max-w-3xl mx-auto py-8 px-6 bg-white rounded shadow">
        <h2 class="text-3xl font-bold text-gray-800 mb-6">Edit Produk</h2>

        <form method="POST" action="{{ route('produk-admin.update', $produk->id) }}" enctype="multipart/form-data"
            class="space-y-6">
            @csrf
            @method('PUT')

            <div>
                <label class="block text-gray-700 font-medium mb-2">Nama Produk</label>
                <input type="text" name="nama" value="{{ $produk->nama }}"
                    class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <input type="number" name="harga" value="{{ $produk->harga }}"
                    class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    <option value="Ready" {{ $produk->status == 'Ready' ? 'selected' : '' }}>Ready</option>
                    <option value="PO" {{ $produk->status == 'PO' ? 'selected' : '' }}>PO</option>
                </select>
            </div>
            <div>
                <label class="block text-gray-700 font-medium mb-2">Deskripsi</label>
                <textarea name="deskripsi" rows="4"
                    class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">{{ $produk->deskripsi }}</textarea>
            </div>

            <div>
                <label class="block text-gray-700 font-medium mb-2">Gambar Baru (Opsional)</label>
                <input type="file" name="gambar"
                    class="w-full border border-gray-300 rounded px-4 py-2 bg-white file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded file:bg-gray-100">

                @if ($produk->gambar)
                    <p class="text-gray-600 mt-2">Gambar sekarang:</p>
                    <img src="{{ asset('uploads/' . $produk->gambar) }}" alt="Gambar produk"
                        class="w-24 h-24 rounded mt-1 object-cover border">
                @endif
            </div>

            <div class="pt-4">
                <button type="submit"
                    class="bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold px-6 py-2 rounded shadow">
                    Simpan Perubahan
                </button>
            </div>
        </form>
    </div>
@endsection
