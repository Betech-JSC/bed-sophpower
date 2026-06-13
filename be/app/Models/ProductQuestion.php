<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductQuestion extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'customer_name',
        'customer_email',
        'customer_phone',
        'question',
        'answer',
        'status',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
