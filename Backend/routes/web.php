<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\ProdukAdminController;

// Redirect root URL to dashboard
Route::get('/', function () {
    return redirect('/dashboard');
});

// Dashboard (protected by auth & verified middleware)
Route::get('/dashboard', [ProdukAdminController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// Routes for authenticated users
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('produk-admin', ProdukAdminController::class);
});

require __DIR__.'/auth.php';