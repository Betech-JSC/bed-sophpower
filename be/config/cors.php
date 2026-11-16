<?php

/*
|--------------------------------------------------------------------------
| Cross-Origin Resource Sharing (CORS)
|--------------------------------------------------------------------------
|
| Chỉ áp dụng cho các request từ trình duyệt tới API (gọi cross-origin).
| Nếu UI Next.js được phục vụ ở domain khác domain API (vd: www.sophchem.com
| gọi https://api.sophchem.com/api) thì BẮT BUỘC phải có header
| Access-Control-Allow-Origin, nếu không trình duyệt sẽ chặn request
| (form liên hệ, giỏ mẫu thử, load dữ liệu phía client...).
|
| Khai báo danh sách origin được phép trong .env của backend:
|   CORS_ALLOWED_ORIGINS=https://sophchem.com,https://www.sophchem.com
|
| Không đặt dấu "/" ở cuối origin. Không dùng "*" ở production nếu sau này
| có request kèm cookie (supports_credentials = true).
|
*/

$origins = array_values(array_filter(array_map(
    'trim',
    explode(',', (string) env('CORS_ALLOWED_ORIGINS', ''))
)));

return [

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => $origins ?: ['*'],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    // Admin CMS là same-origin (chạy trên chính domain API) nên không cần cookie cross-origin.
    'supports_credentials' => false,

];
