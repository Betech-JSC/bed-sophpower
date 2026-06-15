<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'category',
        'desc',
        'image',
        'specs',
        'applications',
        'packaging',
        'type',
        'seo_title',
        'seo_desc',
    ];

    protected $casts = [
        'name' => 'array',
        'category' => 'array',
        'desc' => 'array',
        'specs' => 'array',
        'applications' => 'array',
        'packaging' => 'array',
        'seo_title' => 'array',
        'seo_desc' => 'array',
    ];

    public function questions()
    {
        return $this->hasMany(ProductQuestion::class);
    }
}
