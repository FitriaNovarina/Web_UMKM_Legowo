<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
   public function up()
{
    Schema::table('produks', function (Blueprint $table) {
        // $table->integer('stok')->default(0);
        $table->enum('status', ['PO', 'Ready'])->default('Ready');
    });
}

public function down()
{
    Schema::table('produks', function (Blueprint $table) {
        if (Schema::hasColumn('produks', 'stok')) {
            $table->dropColumn('stok');
        }
        if (Schema::hasColumn('produks', 'status')) {
            $table->dropColumn('status');
        }
    });
}



};
