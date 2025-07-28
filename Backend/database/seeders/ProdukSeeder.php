<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProdukSeeder extends Seeder
{
    public function run()
    {
        DB::table('produks')->insert([
            [
                'nama' => 'Puzzle Kayu Alfabet',
                'deskripsi' => 'Mainan edukasi untuk belajar huruf.',
                'kategori' => 'Mainan Edukasi',
                'harga' => 45000,
                'gambar' => 'puzzle.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
