"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  FileSpreadsheet,
  Settings,
  TrendingUp,
  Mail,
  ShieldCheck,
  CheckCircle,
  Plus,
  Trash2,
  Edit2
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  contact: string;
  message: string;
  date: string;
  status: "new" | "processed";
}

interface Product {
  id: string;
  name: string;
  category: string;
  type: string;
}

export default function AdminDashboard() {
  const [activeSubTab, setActiveSubTab] = useState<"overview" | "leads" | "products" | "settings">("overview");

  // Mock Leads
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: "L1",
      name: "Nguyễn Văn A",
      contact: "nva@gmail.com | 0987654321",
      message: "Yêu cầu gửi báo giá 500kg Bột Beta-carotene 10% giao tại kho Bình Dương.",
      date: "2026-06-08 10:30",
      status: "new",
    },
    {
      id: "L2",
      name: "Trần Thị B",
      contact: "ttb@outlook.com",
      message: "Đăng ký nhận báo giá mẫu thử Tranexamic Acid cho sản phẩm dưỡng da sắp ra mắt.",
      date: "2026-06-07 15:45",
      status: "processed",
    },
  ]);

  // Mock Products
  const [products, setProducts] = useState<Product[]>([
    { id: "16", name: "Bột Beta-carotene", category: "Food Ingredients", type: "Chất tạo màu" },
    { id: "17", name: "Nhũ tương Beta-carotene", category: "Food Ingredients", type: "Chất tạo màu" },
    { id: "15", name: "Màu đỏ Carmine (E120)", category: "Food Ingredients", type: "Phụ gia thực phẩm" },
    { id: "3", name: "Niacinamide (Vitamin B3)", category: "Cosmetic Ingredients", type: "Hoạt chất da liễu" },
    { id: "4", name: "Panthenol", category: "Cosmetic Ingredients", type: "Phục hồi da" },
  ]);

  const handleMarkProcessed = (id: string) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, status: "processed" } : lead))
    );
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar navigation */}
      <aside className="w-64 bg-brand-blue text-white p-6 shrink-0 flex flex-col justify-between hidden md:flex">
        <div className="space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <LayoutDashboard className="h-6 w-6 text-brand-green" />
            <span className="font-extrabold tracking-wider text-lg">SOPHCHEM ADMIN</span>
          </div>

          {/* Navigation links */}
          <nav className="flex flex-col gap-2">
            <button
              onClick={() => setActiveSubTab("overview")}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                activeSubTab === "overview"
                  ? "bg-brand-green text-white"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <LayoutDashboard className="h-5 w-5" />
              Tổng Quan Dashboard
            </button>
            <button
              onClick={() => setActiveSubTab("leads")}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                activeSubTab === "leads"
                  ? "bg-brand-green text-white"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Users className="h-5 w-5" />
              Quản Lý Leads / Form
            </button>
            <button
              onClick={() => setActiveSubTab("products")}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                activeSubTab === "products"
                  ? "bg-brand-green text-white"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <FileSpreadsheet className="h-5 w-5" />
              Quản Lý Sản Phẩm
            </button>
            <button
              onClick={() => setActiveSubTab("settings")}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                activeSubTab === "settings"
                  ? "bg-brand-green text-white"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Settings className="h-5 w-5" />
              Cấu Hình & Bảo Mật
            </button>
          </nav>
        </div>

        {/* Footer info */}
        <div className="text-[10px] text-white/40">
          Powered by Next.js & Tailwind
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              TRANG QUẢN TRỊ ADMIN
            </h1>
            <p className="text-sm text-gray-500">
              Quản lý danh mục sản phẩm, phản hồi biểu mẫu liên hệ và bảo mật cổng thông tin.
            </p>
          </div>

          {/* Quick Mobile Navigation toggles */}
          <div className="flex md:hidden gap-1 bg-gray-200 p-1 rounded-lg">
            {(["overview", "leads", "products", "settings"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSubTab(tab)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold uppercase ${
                  activeSubTab === tab ? "bg-brand-green text-white" : "text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </header>

        {/* Tab 1: Overview */}
        {activeSubTab === "overview" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="rounded-2xl bg-white p-6 border border-gray-150 shadow-xs flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">TỔNG SẢN PHẨM</p>
                  <p className="text-3xl font-extrabold text-gray-900">{products.length}</p>
                </div>
                <div className="rounded-xl bg-brand-green/10 p-3 text-brand-green">
                  <FileSpreadsheet className="h-6 w-6" />
                </div>
              </div>

              <div className="rounded-2xl bg-white p-6 border border-gray-150 shadow-xs flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">TỔNG LEAD FORM</p>
                  <p className="text-3xl font-extrabold text-gray-900">{leads.length}</p>
                </div>
                <div className="rounded-xl bg-brand-blue/10 p-3 text-brand-blue">
                  <Users className="h-6 w-6" />
                </div>
              </div>

              <div className="rounded-2xl bg-white p-6 border border-gray-150 shadow-xs flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">TRUY CẬP HỆ THỐNG</p>
                  <p className="text-3xl font-extrabold text-gray-900">4,289</p>
                </div>
                <div className="rounded-xl bg-amber-500/10 p-3 text-amber-500">
                  <TrendingUp className="h-6 w-6" />
                </div>
              </div>

              <div className="rounded-2xl bg-white p-6 border border-gray-150 shadow-xs flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">BẢO MẬT HỆ THỐNG</p>
                  <p className="text-3xl font-extrabold text-gray-900">100%</p>
                </div>
                <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-500">
                  <ShieldCheck className="h-6 w-6" />
                </div>
              </div>
            </div>

            {/* Quick overview content tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent leads card */}
              <div className="rounded-2xl bg-white p-6 border border-gray-150 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <h3 className="font-bold text-gray-900 text-lg">Yêu Cầu Liên Hệ Mới</h3>
                  <span className="text-xs text-brand-green font-bold hover:underline cursor-pointer" onClick={() => setActiveSubTab("leads")}>
                    Xem tất cả
                  </span>
                </div>
                <div className="divide-y divide-gray-100">
                  {leads.map((lead) => (
                    <div key={lead.id} className="py-4 space-y-2 first:pt-0 last:pb-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-gray-800">{lead.name}</span>
                        <span className="text-[10px] text-gray-400">{lead.date}</span>
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-2">{lead.message}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* System info / logs card */}
              <div className="rounded-2xl bg-white p-6 border border-gray-150 shadow-xs space-y-4">
                <div className="border-b border-gray-100 pb-3">
                  <h3 className="font-bold text-gray-900 text-lg">Trạng Thái Máy Chủ</h3>
                </div>
                <ul className="space-y-4 text-sm text-gray-650">
                  <li className="flex items-center justify-between">
                    <span>Phiên bản CMS</span>
                    <strong className="text-gray-900">v2026.6.7</strong>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Hệ điều hành Hosting</span>
                    <strong className="text-gray-900">Linux Core 1 (Ubuntu 24)</strong>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Bộ nhớ RAM sử dụng</span>
                    <strong className="text-gray-900">22% / 2.0 GB</strong>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Bộ nhớ SSD trống</span>
                    <strong className="text-gray-900">47.8 GB / 50.0 GB</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Leads Management */}
        {activeSubTab === "leads" && (
          <div className="bg-white rounded-2xl border border-gray-150 shadow-xs overflow-hidden animate-in fade-in duration-200">
            <div className="p-6 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-lg">Danh Sách Form Yêu Cầu Gửi Leads</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 border-b border-gray-150">
                    <th className="px-6 py-4 font-bold text-xs uppercase">Họ Tên</th>
                    <th className="px-6 py-4 font-bold text-xs uppercase">Liên Hệ</th>
                    <th className="px-6 py-4 font-bold text-xs uppercase">Nội Dung</th>
                    <th className="px-6 py-4 font-bold text-xs uppercase">Ngày Gửi</th>
                    <th className="px-6 py-4 font-bold text-xs uppercase">Trạng Thái</th>
                    <th className="px-6 py-4 font-bold text-xs uppercase text-right">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50/50">
                      <td className="px-6 py-4 font-bold text-gray-900">{lead.name}</td>
                      <td className="px-6 py-4 text-xs text-gray-500 font-medium">{lead.contact}</td>
                      <td className="px-6 py-4 text-xs text-gray-600 max-w-xs truncate">{lead.message}</td>
                      <td className="px-6 py-4 text-xs text-gray-400">{lead.date}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-bold uppercase ${
                            lead.status === "new"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {lead.status === "new" ? "MỚI" : "ĐÃ XỬ LÝ"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {lead.status === "new" && (
                          <button
                            onClick={() => handleMarkProcessed(lead.id)}
                            className="inline-flex items-center gap-1 rounded bg-brand-green/10 px-2 py-1 text-xs font-bold text-brand-green hover:bg-brand-green hover:text-white transition-colors cursor-pointer"
                          >
                            <CheckCircle className="h-3.5 w-3.5" />
                            Đánh dấu xử lý
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Products Catalog Editor */}
        {activeSubTab === "products" && (
          <div className="bg-white rounded-2xl border border-gray-150 shadow-xs overflow-hidden animate-in fade-in duration-200">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-900 text-lg">Danh Mục Sản Phẩm</h3>
              <button className="inline-flex items-center gap-1.5 rounded-lg bg-brand-green px-4 py-2 text-xs font-bold text-white hover:bg-brand-green/90 transition-all cursor-pointer">
                <Plus className="h-4 w-4" />
                Thêm sản phẩm mới
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 border-b border-gray-150">
                    <th className="px-6 py-4 font-bold text-xs uppercase">ID</th>
                    <th className="px-6 py-4 font-bold text-xs uppercase">Tên Sản Phẩm</th>
                    <th className="px-6 py-4 font-bold text-xs uppercase">Phân Loại Hạng Mục</th>
                    <th className="px-6 py-4 font-bold text-xs uppercase">Loại Phụ Gia</th>
                    <th className="px-6 py-4 font-bold text-xs uppercase text-right">Hành Động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((prod) => (
                    <tr key={prod.id} className="hover:bg-gray-50/50">
                      <td className="px-6 py-4 text-xs font-mono text-gray-400">{prod.id}</td>
                      <td className="px-6 py-4 font-bold text-gray-900">{prod.name}</td>
                      <td className="px-6 py-4 text-xs text-gray-500 font-semibold">{prod.category}</td>
                      <td className="px-6 py-4 text-xs text-gray-500">{prod.type}</td>
                      <td className="px-6 py-4 text-right flex justify-end gap-2">
                        <button className="p-1.5 text-gray-400 hover:text-brand-blue cursor-pointer">
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(prod.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: System Settings & Config */}
        {activeSubTab === "settings" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-200">
            {/* SEO Config */}
            <div className="bg-white rounded-2xl border border-gray-150 p-6 space-y-6 shadow-xs">
              <h3 className="font-bold text-gray-900 text-lg border-b border-gray-100 pb-3">
                Cấu Hình SEO Hệ Thống
              </h3>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 block">META TITLE TRANG CHỦ</label>
                  <input
                    type="text"
                    defaultValue="Pioneer Herb Industrial Co., Ltd. - Sophpower Vietnam"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-900 focus:border-brand-green focus:outline-hidden"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 block">META DESCRIPTION</label>
                  <textarea
                    rows={3}
                    defaultValue="Sophpower là công ty thương mại đa quốc gia có trụ sở tại Việt Nam, cung cấp dải nguyên liệu phụ gia thực phẩm và mỹ phẩm chất lượng hàng đầu..."
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-900 focus:border-brand-green focus:outline-hidden resize-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 block">TỪ KHÓA SEO (KEYWORDS)</label>
                  <input
                    type="text"
                    defaultValue="Sophpower, Pioneer Herb, nguyên liệu mỹ phẩm, Beta-carotene"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-900 focus:border-brand-green focus:outline-hidden"
                  />
                </div>
                <button className="rounded-lg bg-brand-green px-5 py-2 text-xs font-bold text-white hover:bg-brand-green/90 transition-colors cursor-pointer">
                  Lưu cấu hình SEO
                </button>
              </div>
            </div>

            {/* Security Config */}
            <div className="bg-white rounded-2xl border border-gray-150 p-6 space-y-6 shadow-xs">
              <h3 className="font-bold text-gray-900 text-lg border-b border-gray-100 pb-3">
                Bảo Mật & Phân Quyền Admin
              </h3>
              <div className="space-y-4">
                <ul className="space-y-4 text-sm text-gray-650">
                  <li className="flex items-center justify-between">
                    <div>
                      <span className="block font-semibold text-gray-900">Bảo vệ chống XSS / CSRF</span>
                      <span className="text-xs text-gray-400">Tự động làm sạch các input form đầu vào.</span>
                    </div>
                    <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                      BẬT
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <div>
                      <span className="block font-semibold text-gray-900">Mã hóa mật khẩu CSDL</span>
                      <span className="text-xs text-gray-400">Bảo vệ thông tin tài khoản bằng thuật toán bcrypt.</span>
                    </div>
                    <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                      BẬT
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <div>
                      <span className="block font-semibold text-gray-900">Giới hạn IP truy cập Admin</span>
                      <span className="text-xs text-gray-400">Chỉ cho phép IP được phê duyệt đăng nhập.</span>
                    </div>
                    <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-bold text-gray-800">
                      TẮT
                    </span>
                  </li>
                </ul>

                <div className="h-px bg-gray-100" />
                <button className="rounded-lg bg-brand-blue px-5 py-2 text-xs font-bold text-white hover:bg-brand-blue/90 transition-colors cursor-pointer">
                  Thay đổi mật khẩu Admin
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
