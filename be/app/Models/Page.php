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
    ];

    protected $casts = [
        'title' => 'array',
        'content' => 'array',
        'seo_title' => 'array',
        'seo_desc' => 'array',
    ];
}
