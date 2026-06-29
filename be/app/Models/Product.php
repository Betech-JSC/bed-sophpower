<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'product_category_id',
        'category',
        'desc',
        'image',
        'status',
        'specs',
        'applications',
        'packaging',
        'type',
        'seo_title',
        'seo_desc',
        'seo_keywords',
        'meta_robots',
        'canonical_url',
        'og_image',
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
        'seo_keywords' => 'array',
    ];

    public function productCategory()
    {
        return $this->belongsTo(ProductCategory::class);
    }

    public function toArray()
    {
        $array = parent::toArray();
        if ($this->relationLoaded('productCategory') && $this->productCategory) {
            $array['category'] = $this->productCategory->name;
        } elseif (isset($array['product_category']) && $array['product_category']) {
            $array['category'] = $array['product_category']['name'] ?? null;
        }
        return $array;
    }

    public function questions()
    {
        return $this->hasMany(ProductQuestion::class);
    }
}
