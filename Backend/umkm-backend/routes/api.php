<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProdukController;

Route::get('/produk', [ProdukController::class, 'index']);
Route::get('/kategori', [ProdukController::class, 'kategori']);

Route::get('/test', function () {
    return response()->json(['message' => 'API works!']);
});
