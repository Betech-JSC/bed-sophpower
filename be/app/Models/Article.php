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
        'article_category_id',
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

    public function articleCategory()
    {
        return $this->belongsTo(ArticleCategory::class);
    }

    public function toArray()
    {
        $array = parent::toArray();
        if ($this->relationLoaded('articleCategory')) {
            $array['category'] = $this->articleCategory ? $this->articleCategory->name : null;
        } elseif (isset($array['article_category'])) {
            $array['category'] = $array['article_category']['name'] ?? null;
        }
        return $array;
    }
}
