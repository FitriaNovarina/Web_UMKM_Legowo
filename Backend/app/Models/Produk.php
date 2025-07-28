<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Produk extends Model
{
    protected $table = 'produks'; // <- WAJIB ditambahkan

    protected $fillable = [
    'nama', 'kategori', 'harga', 'deskripsi', 'gambar', 'stok', 'status'
];

}
