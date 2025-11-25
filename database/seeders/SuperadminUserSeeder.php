<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SuperadminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $superadmin = User::create([
            "name" => "Superadmin",
            "email" => "superadmin@erp.com",
            "password" => Hash::make("superadmin1234"),
        ]);

        $superadmin->assignRole("superadmin");
    }
}
