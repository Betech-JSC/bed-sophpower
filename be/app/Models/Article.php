<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'summary',
        'content',
        'date',
        'image',
        'status',
        'article_category_id',
        'category',
        'author',
        'seo_title',
        'seo_desc',
        'seo_keywords',
        'meta_robots',
        'canonical_url',
        'og_image',
    ];

    protected $casts = [
        'title' => 'array',
        'summary' => 'array',
        'content' => 'array',
        'category' => 'array',
        'date' => 'date',
        'seo_title' => 'array',
        'seo_desc' => 'array',
        'seo_keywords' => 'array',
    ];

    public function articleCategory()
    {
        return $this->belongsTo(ArticleCategory::class);
    }

    public function toArray()
    {
        $array = parent::toArray();
        if ($this->relationLoaded('articleCategory') && $this->articleCategory) {
            $array['category'] = $this->articleCategory->name;
        } elseif (isset($array['article_category']) && $array['article_category']) {
            $array['category'] = $array['article_category']['name'] ?? null;
        }
        return $array;
    }
}
