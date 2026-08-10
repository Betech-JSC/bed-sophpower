<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'type',
        'parent_id',
        'sort_order',
    ];

    protected $casts = [
        'name' => 'array',
    ];

    public function parent()
    {
        return $this->belongsTo(ProductCategory::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(ProductCategory::class, 'parent_id')
            ->orderBy('sort_order', 'asc')
            ->orderBy('id', 'asc')
            ->with('children');
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
