<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'content',
        'seo_title',
        'seo_desc',
        'seo_keywords',
        'meta_robots',
        'canonical_url',
        'og_image',
    ];

    protected $casts = [
        'title' => 'array',
        'content' => 'array',
        'seo_title' => 'array',
        'seo_desc' => 'array',
        'seo_keywords' => 'array',
    ];
}
