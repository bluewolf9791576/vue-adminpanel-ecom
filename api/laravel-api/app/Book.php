<?php

namespace App;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * App\Book
 *
 * @property int $id
 * @property int $publisher_id
 * @property string|null $isbn
 * @property string $title
 * @property string $description
 * @property string $summary
 * @property string $author
 * @property float $price
 * @property Carbon $publication_date
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Review[] $reviews
 * @property-read int|null $reviews_count
 * @property-read \App\Publisher $publisher
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Book newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Book newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Book query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Book publishedAfter($date)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Book publishedBefore($date)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Book cheaperThan($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Book pricierThan($value)
 * @mixin \Eloquent
 */
class Book extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'isbn',
        'title',
        'description',
        'summary',
        'author',
        'price',
        'publication_date',
    ];

    protected $dates = [
        'publication_date'
    ];

    protected $casts = [
        'price' => 'float'
    ];

    public function publisher()
    {
        return $this->belongsTo(Publisher::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function scopePricierThan(Builder $query, $value): Builder
    {
        return $query->where('price', '>=', $value);
    }

    public function scopeCheaperThan(Builder $query, $value): Builder
    {
        return $query->where('price', '<=', $value);
    }

    public function scopePublishedBefore(Builder $query, $date): Builder
    {
        return $query->where('publication_date', '<=', Carbon::parse($date));
    }

    public function scopePublishedAfter(Builder $query, $date): Builder
    {
        return $query->where('publication_date', '>=', Carbon::parse($date));
    }
}
