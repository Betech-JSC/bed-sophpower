<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class MediaFile extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'file_path',
        'file_type',
        'file_size',
    ];

    protected $appends = ['url'];

    /**
     * Get the absolute URL to the file.
     *
     * @return string
     */
    public function getUrlAttribute()
    {
        return Storage::disk('public')->url($this->file_path);
    }
}
