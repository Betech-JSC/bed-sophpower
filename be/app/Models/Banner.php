<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'desc',
        'image',
        'link',
        'is_home_slider',
        'page_key',
        'order',
        'is_active',
    ];

    protected $casts = [
        'title' => 'array',
        'desc' => 'array',
        'is_home_slider' => 'boolean',
        'is_active' => 'boolean',
    ];
}
