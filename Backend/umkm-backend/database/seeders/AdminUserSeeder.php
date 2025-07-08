<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Admin Legowo',
            'email' => 'admin@legowo.com',
            'password' => Hash::make('rahasia123'),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
