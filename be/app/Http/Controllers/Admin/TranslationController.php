<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Translation;
use App\Helpers\ActivityLogger;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class TranslationController extends Controller
{
    public function index(Request $request)
    {
        $query = Translation::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('key', 'like', '%' . $search . '%')
                  ->orWhere('group', 'like', '%' . $search . '%')
                  ->orWhere('text->vi', 'like', '%' . $search . '%')
                  ->orWhere('text->en', 'like', '%' . $search . '%')
                  ->orWhere('text->zh', 'like', '%' . $search . '%')
                  ->orWhere('text->ja', 'like', '%' . $search . '%');
            });
        }

        if ($request->filled('group') && $request->group !== 'all') {
            $query->where('group', $request->group);
        }

        $translations = $query->orderBy('group')->orderBy('key')->paginate(20)->withQueryString();

        // Get unique groups for the filter dropdown
        $groups = Translation::select('group')->distinct()->pluck('group')->toArray();

        return Inertia::render('Translations/Index', [
            'translations' => $translations,
            'groups' => $groups,
            'filters' => $request->only(['search', 'group']),
        ]);
    }

    public function edit(Translation $translation)
    {
        return Inertia::render('Translations/Form', [
            'translation' => $translation,
        ]);
    }

    public function update(Request $request, Translation $translation)
    {
        $validated = $request->validate([
            'text' => ['required', 'array'],
            'text.vi' => ['required', 'string'],
            'text.en' => ['nullable', 'string'],
            'text.zh' => ['nullable', 'string'],
            'text.ja' => ['nullable', 'string'],
        ]);

        // Fallbacks if not provided
        if (empty($validated['text']['en'])) {
            $validated['text']['en'] = $validated['text']['vi'];
        }
        if (empty($validated['text']['zh'])) {
            $validated['text']['zh'] = $validated['text']['en'];
        }
        if (empty($validated['text']['ja'])) {
            $validated['text']['ja'] = $validated['text']['en'];
        }

        $translation->update($validated);

        // Clear translation cache
        Cache::forget('dynamic_translations');

        ActivityLogger::log('update_translation', "Cập nhật nhãn dịch [{$translation->group}.{$translation->key}]");

        return redirect()->route('admin.translations.index')
            ->with('success', "Cập nhật nhãn dịch {$translation->group}.{$translation->key} thành công!");
    }
}
