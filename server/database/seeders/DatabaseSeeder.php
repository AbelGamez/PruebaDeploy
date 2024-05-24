<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\User;
use App\Models\Product;
use App\Models\Stock;

class DatabaseSeeder extends Seeder {

    /**
     * Seed the application's database.
     */
    public function run(): void {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    
        $categories = ['Pistols', 'Rifles', 'Heavy', 'SMGs', 'Gloves', 'Knives'];

        foreach ($categories as $category) {
            $products = Product::where('category', $category)->take(5)->get();

            foreach ($products as $product) {
                Stock::create([
                    'stattrak' => rand(0, 1), // Valor booleano aleatorio
                    'float' => round(mt_rand() / mt_getrandmax(), 3), // Valor flotante aleatorio entre 0 y 1
                    'unit_price' => mt_rand(0, 10000), // Valor entero aleatorio entre 0 y 10000
                    'units' => 1,
                    'product_id' => $product->id,
                    'available' => 1
                ]);
            }
        }
    }
}
