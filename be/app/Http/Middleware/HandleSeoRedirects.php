<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\SeoRedirect;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;

class HandleSeoRedirects
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $path = '/' . ltrim($request->getPathInfo(), '/');
        
        // Retrieve cached redirects list, or load from DB and cache it forever
        $redirects = Cache::rememberForever('seo_redirects_list', function () {
            return SeoRedirect::select(['source_url', 'target_url', 'http_code'])->get()->toArray();
        });
        
        // Find match (checking for direct match and slash variations)
        $match = collect($redirects)->first(function ($r) use ($path) {
            return $r['source_url'] === $path || $r['source_url'] === $path . '/';
        });
        
        if ($match) {
            return redirect()->to($match['target_url'], $match['http_code']);
        }

        return $next($request);
    }
}
