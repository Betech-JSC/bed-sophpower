<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'summary',
        'content',
        'date',
        'image',
        'category',
        'author',
        'seo_title',
        'seo_desc',
    ];

    protected $casts = [
        'title' => 'array',
        'summary' => 'array',
        'content' => 'array',
        'category' => 'array',
        'date' => 'date',
        'seo_title' => 'array',
        'seo_desc' => 'array',
    ];
}
