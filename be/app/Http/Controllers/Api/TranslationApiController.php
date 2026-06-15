<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Translation;
use Illuminate\Support\Facades\Cache;

class TranslationApiController extends Controller
{
    public function index()
    {
        // Cache the formatted translations forever.
        // It will be cleared when any translation is updated in the CMS.
        $formatted = Cache::rememberForever('dynamic_translations', function () {
            $translations = Translation::all();
            
            $locales = ['vi', 'en', 'zh', 'ja'];
            $data = [
                'site' => [],
                'docs' => [],
            ];
            
            foreach ($locales as $locale) {
                $data['site'][$locale] = [];
                $data['docs'][$locale] = [];
            }
            
            foreach ($translations as $t) {
                $group = $t->group;
                $key = $t->key;
                
                foreach ($locales as $locale) {
                    $val = isset($t->text[$locale]) ? $t->text[$locale] : '';
                    
                    if (str_starts_with($group, 'docs_')) {
                        $realGroup = substr($group, 5); // strip 'docs_'
                        if (!isset($data['docs'][$locale][$realGroup])) {
                            $data['docs'][$locale][$realGroup] = [];
                        }
                        $data['docs'][$locale][$realGroup][$key] = $val;
                    } else {
                        if (!isset($data['site'][$locale][$group])) {
                            $data['site'][$locale][$group] = [];
                        }
                        $data['site'][$locale][$group][$key] = $val;
                    }
                }
            }
            
            return $data;
        });

        return response()->json($formatted);
    }
}
