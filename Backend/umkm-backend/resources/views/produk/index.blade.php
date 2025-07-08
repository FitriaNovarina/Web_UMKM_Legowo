@extends('layouts.app')

@section('content')
    <div class="container py-10 px-4 md:px-20 mx-auto">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <h2 class="text-3xl font-bold text-gray-800">Daftar Produk UMKM</h2>
            <a href="{{ route('produk-admin.create') }}"
                class="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-5 py-2.5 rounded-xl shadow hover:shadow-lg hover:brightness-110 transition-all font-semibold">
                + Tambah Produk
            </a>
        </div>

        {{-- Filter Kategori --}}
        <div class="mb-8">
            <h3 class="font-semibold text-gray-700 mb-3">🗂️ Filter Kategori:</h3>
            <div class="flex flex-wrap gap-2">
                @php
                    $kategoriList = [
                        'ape indoor' => 'APE Indoor',
                        'ape outdoor' => 'APE Outdoor',
                        'kursi meja' => 'Kursi Meja',
                        'papan data' => 'Papan Data',
                        'stand usaha' => 'Stand Usaha',
                        'rak buku' => 'Rak Buku',
                    ];
                @endphp

                @foreach ($kategoriList as $key => $label)
                    <a href="{{ route('produk-admin.index', ['kategori' => $key]) }}"
                        class="px-4 py-2 rounded-full border text-sm transition
                        {{ request('kategori') == $key
                            ? 'bg-orange-500 text-white shadow'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200' }}">
                        {{ $label }}
                    </a>
                @endforeach

                <a href="{{ route('produk-admin.index') }}"
                    class="px-4 py-2 rounded-full border text-sm transition
                    {{ request('kategori') == null
                        ? 'bg-orange-500 text-white shadow'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200' }}">
                    Semua
                </a>
            </div>
        </div>

        {{-- Pesan sukses --}}
        @if (session('success'))
            <div class="bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded-lg shadow-sm mb-6">
                {{ session('success') }}
            </div>
        @endif

        {{-- Tabel Produk --}}
        <div class="overflow-x-auto rounded-xl shadow border bg-white">
            <table class="min-w-full text-sm text-left text-gray-800">
                <thead class="bg-gradient-to-r from-orange-100 to-amber-100 text-gray-700 uppercase text-xs">
                    <tr>
                        <th class="px-6 py-4">Gambar</th>
                        <th class="px-6 py-4">Nama</th>
                        <th class="px-6 py-4">Kategori</th>
                        <th class="px-6 py-4">Harga</th>
                        <th class="px-6 py-4">Stok</th>
                        <th class="px-6 py-4">Status</th>
                        <th class="px-6 py-4 text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    @forelse ($produk as $item)
                        <tr class="hover:bg-orange-50/40 transition">
                            <td class="px-6 py-4 text-center">
                                <img src="{{ asset('uploads/' . $item->gambar) }}" alt="gambar produk"
                                    class="w-14 h-14 rounded-lg object-cover border border-gray-200 shadow-sm">
                            </td>
                            <td class="px-6 py-4 font-semibold">
                                {{ $item->nama }}
                            </td>
                            <td class="px-6 py-4">
                                <span
                                    class="bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full capitalize">
                                    {{ $item->kategori }}
                                </span>
                            </td>
                            <td class="px-6 py-4 text-orange-600 font-bold">
                                Rp {{ number_format($item->harga, 0, ',', '.') }}
                            </td>
                            <td class="px-6 py-4 text-center font-medium">
                                {{ $item->stok }}
                            </td>
                            <td class="px-6 py-4 text-center">
                                <span
                                    class="text-xs font-semibold px-3 py-1 rounded-full
                                    {{ $item->status === 'Ready' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700' }}">
                                    {{ $item->status }}
                                </span>
                            </td>
                            <td class="px-6 py-4 text-center space-x-2">
                                <a href="{{ route('produk-admin.edit', $item->id) }}"
                                    class="inline-block text-blue-600 hover:text-blue-800 font-medium transition">
                                    ✏️ Edit
                                </a>
                                <form action="{{ route('produk-admin.destroy', $item->id) }}" method="POST"
                                    class="inline">
                                    @csrf
                                    @method('DELETE')
                                    <button onclick="return confirm('Yakin ingin menghapus produk ini?')"
                                        class="text-red-600 hover:text-red-800 font-medium transition">
                                        🗑️ Hapus
                                    </button>
                                </form>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="7" class="text-center text-gray-500 py-6 italic">
                                Belum ada produk yang ditambahkan.
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
@endsection
