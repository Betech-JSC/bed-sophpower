<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MediaFile;
use App\Helpers\ActivityLogger;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MediaController extends Controller
{
    public function index(Request $request)
    {
        $query = MediaFile::query();

        // Search by name
        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Filter by file type
        if ($request->filled('type') && $request->type !== 'all') {
            $type = $request->type;
            if ($type === 'image') {
                $query->where(function($q) {
                    $q->where('file_type', 'like', 'image/%')
                      ->orWhere('name', 'like', '%.svg');
                });
            } elseif ($type === 'document') {
                $query->where(function($q) {
                    $q->where('file_type', 'like', 'application/pdf')
                      ->orWhere('file_type', 'like', 'application/msword')
                      ->orWhere('file_type', 'like', 'application/vnd.openxmlformats-officedocument%')
                      ->orWhere('file_type', 'like', 'text/%')
                      ->orWhere('name', 'like', '%.pdf')
                      ->orWhere('name', 'like', '%.doc')
                      ->orWhere('name', 'like', '%.docx')
                      ->orWhere('name', 'like', '%.xls')
                      ->orWhere('name', 'like', '%.xlsx')
                      ->orWhere('name', 'like', '%.txt');
                });
            } elseif ($type === 'other') {
                $query->where(function($q) {
                    $q->whereNot('file_type', 'like', 'image/%')
                      ->whereNot('file_type', 'like', 'application/pdf')
                      ->whereNot('file_type', 'like', 'application/msword')
                      ->whereNot('file_type', 'like', 'application/vnd.openxmlformats-officedocument%')
                      ->whereNot('file_type', 'like', 'text/%')
                      ->where('name', 'not like', '%.svg')
                      ->where('name', 'not like', '%.pdf')
                      ->where('name', 'not like', '%.doc')
                      ->where('name', 'not like', '%.docx')
                      ->where('name', 'not like', '%.xls')
                      ->where('name', 'not like', '%.xlsx')
                      ->where('name', 'not like', '%.txt');
                });
            }
        }

        $files = $query->orderBy('created_at', 'desc')->paginate(24)->withQueryString();

        return Inertia::render('Media/Index', [
            'files' => $files,
            'filters' => $request->only(['search', 'type']),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'file' => ['required', 'file', 'max:10240'], // Max 10MB
        ]);

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $originalName = $file->getClientOriginalName();
            
            // Create a subfolder structure like uploads/YYYY/MM
            $subFolder = 'uploads/' . date('Y') . '/' . date('m');
            
            // Store file with a sanitized, unique name to prevent naming collision
            $path = $file->store($subFolder, 'public');

            $mediaFile = MediaFile::create([
                'name' => $originalName,
                'file_path' => $path,
                'file_type' => $file->getClientMimeType() ?: $file->guessClientExtension() ?: 'application/octet-stream',
                'file_size' => $file->getSize(),
            ]);

            ActivityLogger::log('upload_media', "Tải lên tệp tin: {$mediaFile->name}");

            return redirect()->back()->with('success', "Tải lên tệp tin '{$originalName}' thành công!");
        }

        return redirect()->back()->with('error', "Không tìm thấy tệp tin để tải lên.");
    }

    public function destroy(MediaFile $media)
    {
        // Delete physical file from disk
        if (Storage::disk('public')->exists($media->file_path)) {
            Storage::disk('public')->delete($media->file_path);
        }

        $fileName = $media->name;
        $media->delete();

        ActivityLogger::log('delete_media', "Xóa tệp tin: {$fileName}");

        return redirect()->back()->with('success', "Xóa tệp tin '{$fileName}' thành công!");
    }

    public function listJson(Request $request)
    {
        $query = MediaFile::query();

        // Filter by file type
        if ($request->filled('type') && $request->type !== 'all') {
            $type = $request->type;
            if ($type === 'image') {
                $query->where(function($q) {
                    $q->where('file_type', 'like', 'image/%')
                      ->orWhere('name', 'like', '%.svg');
                });
            }
        }

        $files = $query->orderBy('created_at', 'desc')->get();

        return response()->json($files);
    }
}
