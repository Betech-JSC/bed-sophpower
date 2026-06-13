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
        'order',
        'is_active',
    ];

    protected $casts = [
        'title' => 'array',
        'desc' => 'array',
        'is_active' => 'boolean',
    ];
}
