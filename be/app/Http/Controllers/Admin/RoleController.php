<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoleController extends Controller
{
    public static $permissionsGrouped = [
        'dashboard' => [
            'title' => 'Bảng điều khiển',
            'permissions' => [
                'dashboard.view' => 'Xem bảng điều khiển & thống kê',
            ]
        ],
        'products' => [
            'title' => 'Quản lý Sản phẩm',
            'permissions' => [
                'products.view' => 'Xem danh sách sản phẩm',
                'products.manage' => 'Thêm, Sửa, Xóa sản phẩm',
            ]
        ],
        'product-categories' => [
            'title' => 'Danh mục Sản phẩm',
            'permissions' => [
                'product-categories.view' => 'Xem danh mục sản phẩm',
                'product-categories.manage' => 'Thêm, Sửa, Xóa danh mục sản phẩm',
            ]
        ],
        'news' => [
            'title' => 'Tin tức & Bài viết',
            'permissions' => [
                'news.view' => 'Xem danh sách tin bài',
                'news.manage' => 'Thêm, Sửa, Xóa tin bài',
            ]
        ],
        'article-categories' => [
            'title' => 'Danh mục Bài viết',
            'permissions' => [
                'article-categories.view' => 'Xem danh mục bài viết',
                'article-categories.manage' => 'Thêm, Sửa, Xóa danh mục bài viết',
            ]
        ],
        'jobs' => [
            'title' => 'Tuyển dụng',
            'permissions' => [
                'jobs.view' => 'Xem tin tuyển dụng',
                'jobs.manage' => 'Thêm, Sửa, Xóa tuyển dụng',
            ]
        ],
        'leads' => [
            'title' => 'Yêu cầu liên hệ',
            'permissions' => [
                'leads.view' => 'Xem danh sách yêu cầu liên hệ',
                'leads.manage' => 'Cập nhật trạng thái, Xóa liên hệ',
            ]
        ],
        'faqs' => [
            'title' => 'FAQs & Hỏi đáp',
            'permissions' => [
                'faqs.view' => 'Xem FAQs',
                'faqs.manage' => 'Thêm, Sửa, Xóa FAQs',
                'product-questions.view' => 'Xem câu hỏi sản phẩm',
                'product-questions.manage' => 'Trả lời & duyệt câu hỏi',
            ]
        ],
        'seo' => [
            'title' => 'Cấu hình SEO & Trang',
            'permissions' => [
                'pages.view' => 'Xem danh sách trang tĩnh',
                'pages.manage' => 'Thêm, Sửa, Xóa trang tĩnh',
                'seo-redirects.view' => 'Xem chuyển hướng SEO',
                'seo-redirects.manage' => 'Thêm, Sửa, Xóa chuyển hướng',
            ]
        ],
        'system' => [
            'title' => 'Hệ thống & Cài đặt',
            'permissions' => [
                'settings.manage' => 'Thay đổi cài đặt chung, footer, robots.txt',
                'translations.view' => 'Xem danh sách nhãn dịch tĩnh',
                'translations.manage' => 'Chỉnh sửa nhãn dịch tĩnh',
                'media.view' => 'Xem thư viện file',
                'media.manage' => 'Tải lên & Xóa file trong thư viện',
                'activity_logs.view' => 'Xem nhật ký hoạt động hệ thống',
            ]
        ],
        'users' => [
            'title' => 'Quản trị viên & Phân quyền',
            'permissions' => [
                'users.manage' => 'Quản lý tài khoản quản trị viên',
                'roles.manage' => 'Quản lý vai trò & Phân quyền',
            ]
        ]
    ];

    public function index()
    {
        $roles = Role::latest()->paginate(15);

        return Inertia::render('Roles/Index', [
            'roles' => $roles,
        ]);
    }

    public function create()
    {
        return Inertia::render('Roles/Form', [
            'permissionsGrouped' => self::$permissionsGrouped,
            'isEdit' => false,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:roles',
            'description' => 'nullable|string|max:255',
            'permissions' => 'required|array',
        ], [
            'name.unique' => 'Tên vai trò này đã tồn tại.',
            'permissions.required' => 'Bạn phải chọn ít nhất một quyền.',
        ]);

        Role::create([
            'name' => $request->name,
            'description' => $request->description,
            'permissions' => $request->permissions,
        ]);

        return redirect('/admin/roles')->with('success', 'Tạo vai trò mới thành công.');
    }

    public function edit(Role $role)
    {
        return Inertia::render('Roles/Form', [
            'role' => $role,
            'permissionsGrouped' => self::$permissionsGrouped,
            'isEdit' => true,
        ]);
    }

    public function update(Request $request, Role $role)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:roles,name,' . $role->id,
            'description' => 'nullable|string|max:255',
            'permissions' => 'required|array',
        ], [
            'name.unique' => 'Tên vai trò này đã tồn tại.',
            'permissions.required' => 'Bạn phải chọn ít nhất một quyền.',
        ]);

        // Super Admin permissions should remain '*'
        if ($role->id === 1 || $role->name === 'Super Admin') {
            $role->update([
                'name' => $request->name,
                'description' => $request->description,
                'permissions' => ['*'], // force * for Super Admin
            ]);
        } else {
            $role->update([
                'name' => $request->name,
                'description' => $request->description,
                'permissions' => $request->permissions,
            ]);
        }

        return redirect('/admin/roles')->with('success', 'Cập nhật vai trò thành công.');
    }

    public function destroy(Role $role)
    {
        if ($role->id === 1 || $role->name === 'Super Admin') {
            return back()->with('error', 'Không thể xóa vai trò quản trị tối cao (Super Admin).');
        }

        if ($role->users()->exists()) {
            return back()->with('error', 'Không thể xóa vai trò này vì đang được gán cho một hoặc nhiều quản trị viên.');
        }

        $role->delete();

        return redirect('/admin/roles')->with('success', 'Xóa vai trò thành công.');
    }
}
