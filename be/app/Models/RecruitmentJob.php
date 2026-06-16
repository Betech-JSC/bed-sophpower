<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecruitmentJob extends Model
{
    use HasFactory;

    protected $table = 'recruitment_jobs';

    protected $fillable = [
        'title',
        'slug',
        'department',
        'location',
        'salary',
        'deadline',
        'summary',
        'requirements',
        'responsibilities',
        'benefits',
        'seo_title',
        'seo_desc',
        'seo_keywords',
        'meta_robots',
        'canonical_url',
        'og_image',
    ];

    protected $casts = [
        'title' => 'array',
        'department' => 'array',
        'location' => 'array',
        'salary' => 'array',
        'summary' => 'array',
        'requirements' => 'array',
        'responsibilities' => 'array',
        'benefits' => 'array',
        'deadline' => 'date',
        'seo_title' => 'array',
        'seo_desc' => 'array',
        'seo_keywords' => 'array',
    ];
}
