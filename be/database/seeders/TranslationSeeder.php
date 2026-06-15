<?php

namespace Database\Seeders;

use App\Models\Translation;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class TranslationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jsonPath = database_path('seeders/initial_translations.json');

        if (!File::exists($jsonPath)) {
            $this->command->error("File initial_translations.json not found!");
            return;
        }

        $json = File::get($jsonPath);
        $data = json_decode($json, true);

        if (empty($data)) {
            $this->command->error("Translations JSON is empty or invalid!");
            return;
        }

        $this->command->info("Seeding " . count($data) . " translations...");

        // Disable query logs for performance
        \Illuminate\Support\Facades\DB::connection()->disableQueryLog();

        foreach ($data as $item) {
            Translation::updateOrCreate(
                [
                    'group' => $item['group'],
                    'key' => $item['key'],
                ],
                [
                    'text' => $item['text'],
                ]
            );
        }

        $this->command->info("Seeded translations successfully!");
    }
}
