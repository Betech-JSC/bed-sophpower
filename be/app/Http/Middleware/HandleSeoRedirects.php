<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\SeoRedirect;
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
        
        // Check if there is a redirect rule for this path
        $redirect = SeoRedirect::where('source_url', $path)->first();
        
        if ($redirect) {
            return redirect()->to($redirect->target_url, $redirect->http_code);
        }

        return $next($request);
    }
}
