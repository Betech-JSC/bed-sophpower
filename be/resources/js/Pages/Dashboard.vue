<template>
  <CrmLayout title="Tổng quan hệ thống">
    <!-- Top Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Products Card -->
      <div class="bg-white p-6 rounded-xl border border-gray-150 shadow-xs flex items-center justify-between">
        <div class="space-y-2">
          <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">Tổng sản phẩm</p>
          <h3 class="text-3xl font-extrabold text-gray-900 leading-none">{{ stats.total_products }}</h3>
          <p class="text-xs text-gray-500">
            <span class="text-emerald-700 font-bold">{{ stats.food_products }}</span> thực phẩm /
            <span class="text-emerald-700 font-bold">{{ stats.cosmetic_products }}</span> mỹ phẩm
          </p>
        </div>
        <div class="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
      </div>

      <!-- Articles Card -->
      <div class="bg-white p-6 rounded-xl border border-gray-150 shadow-xs flex items-center justify-between">
        <div class="space-y-2">
          <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">Bài viết tin tức</p>
          <h3 class="text-3xl font-extrabold text-gray-900 leading-none">{{ stats.total_articles }}</h3>
          <p class="text-xs text-gray-500">Tin tức thị trường & khoa học</p>
        </div>
        <div class="w-12 h-12 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
      </div>

      <!-- Jobs Card -->
      <div class="bg-white p-6 rounded-xl border border-gray-150 shadow-xs flex items-center justify-between">
        <div class="space-y-2">
          <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">Tin tuyển dụng</p>
          <h3 class="text-3xl font-extrabold text-gray-900 leading-none">{{ stats.total_jobs }}</h3>
          <p class="text-xs text-gray-500">Vị trí đang chiêu mộ</p>
        </div>
        <div class="w-12 h-12 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      </div>

      <!-- Pending Leads Card -->
      <div class="bg-white p-6 rounded-xl border border-gray-150 shadow-xs flex items-center justify-between">
        <div class="space-y-2">
          <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">Yêu cầu liên hệ mới</p>
          <h3 class="text-3xl font-extrabold text-gray-900 leading-none text-red-650">{{ stats.pending_leads }}</h3>
          <p class="text-xs text-gray-500">Cần xử lý liên hệ ngay</p>
        </div>
        <div class="w-12 h-12 rounded-lg bg-red-50 text-red-700 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Quick Links & Recent Leads Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Recent Leads (Table Card) -->
      <div class="bg-white rounded-xl border border-gray-150 shadow-xs p-6 lg:col-span-2 space-y-4">
        <div class="flex items-center justify-between border-b border-gray-150 pb-4">
          <h3 class="font-bold text-gray-900 text-base">Khách hàng liên hệ gần đây</h3>
          <Link href="/admin/leads" class="text-xs font-bold text-emerald-700 hover:text-emerald-800 uppercase tracking-wider">
            Xem tất cả
          </Link>
        </div>

        <div v-if="recentLeads.length === 0" class="py-8 text-center text-gray-400 text-sm">
          Chưa có yêu cầu liên hệ nào.
        </div>
        
        <div v-else class="overflow-x-auto">
          <table class="min-w-full text-sm divide-y divide-gray-150">
            <thead>
              <tr class="text-left text-gray-400 font-bold text-xs uppercase tracking-wider">
                <th class="py-3 pr-4">Khách hàng</th>
                <th class="py-3 px-4">Yêu cầu</th>
                <th class="py-3 px-4">Trạng thái</th>
                <th class="py-3 pl-4 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 text-gray-650">
              <tr v-for="lead in recentLeads" :key="lead.id" class="hover:bg-gray-50/50">
                <td class="py-3 pr-4 font-semibold text-gray-900">
                  <div>
                    <p class="font-bold text-gray-950">{{ lead.name }}</p>
                    <p class="text-xs text-gray-500 font-normal">{{ lead.email }}</p>
                  </div>
                </td>
                <td class="py-3 px-4 max-w-[200px] truncate" :title="lead.message">
                  {{ lead.message }}
                </td>
                <td class="py-3 px-4">
                  <span
                    :class="[
                      lead.status === 'pending' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100',
                      'px-2 py-0.5 text-xs font-bold rounded border uppercase tracking-wider'
                    ]"
                  >
                    {{ lead.status === 'pending' ? 'Chờ xử lý' : 'Đã xử lý' }}
                  </span>
                </td>
                <td class="py-3 pl-4 text-right">
                  <Link
                    href="/admin/leads"
                    :data="{ search: lead.email }"
                    class="text-xs font-bold text-emerald-700 hover:text-emerald-800"
                  >
                    Chi tiết
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white rounded-xl border border-gray-150 shadow-xs p-6 space-y-6">
        <h3 class="font-bold text-gray-900 text-base border-b border-gray-150 pb-4">Thao tác nhanh</h3>
        <div class="flex flex-col gap-3">
          <Link
            href="/admin/products/create"
            class="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-emerald-500 hover:bg-emerald-50/20 text-gray-700 hover:text-emerald-800 transition-all text-sm font-semibold"
          >
            <div class="w-8 h-8 rounded bg-emerald-50 text-emerald-700 flex items-center justify-center">
              +
            </div>
            Thêm sản phẩm mới
          </Link>
          <Link
            href="/admin/news/create"
            class="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50/20 text-gray-700 hover:text-blue-800 transition-all text-sm font-semibold"
          >
            <div class="w-8 h-8 rounded bg-blue-50 text-blue-700 flex items-center justify-center">
              +
            </div>
            Viết bài tin tức mới
          </Link>
          <Link
            href="/admin/jobs/create"
            class="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50/20 text-gray-700 hover:text-indigo-800 transition-all text-sm font-semibold"
          >
            <div class="w-8 h-8 rounded bg-indigo-50 text-indigo-700 flex items-center justify-center">
              +
            </div>
            Đăng tin tuyển dụng
          </Link>
        </div>
      </div>
    </div>
  </CrmLayout>
</template>

<script setup>
import CrmLayout from '@/Layouts/CrmLayout.vue';
import { Link } from '@inertiajs/vue3';

defineProps({
  stats: Object,
  recentLeads: Array,
});
</script>
