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
    ];
}
