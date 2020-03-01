<?php

use App\Publisher;
use Illuminate\Database\Seeder;

class PublisherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();

        factory(Publisher::class, 10)->create()->each(function (Publisher $publisher) use ($faker) {
            $publisher->addMedia(DatabaseSeeder::randomMedia($faker, 'logos', 1, 'png'))
                ->preservingOriginal()
                ->toMediaCollection('logos');

            for ($i = 0; $i < $faker->numberBetween(3, 6); $i++) {
                $publisher->addMedia(DatabaseSeeder::randomMedia($faker, 'office', 9, 'jpg'))
                    ->preservingOriginal()
                    ->toMediaCollection('images');
            }
        });
    }
}
