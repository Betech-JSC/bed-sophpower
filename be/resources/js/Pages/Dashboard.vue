<template>
  <CrmLayout title="Tổng quan hệ thống">
    <!-- Top Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Products Card -->
      <div class="bg-white p-6 rounded-xl border border-gray-150 shadow-xs flex items-center justify-between transition-all hover:shadow-md">
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
      <div class="bg-white p-6 rounded-xl border border-gray-150 shadow-xs flex items-center justify-between transition-all hover:shadow-md">
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
      <div class="bg-white p-6 rounded-xl border border-gray-150 shadow-xs flex items-center justify-between transition-all hover:shadow-md">
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
      <div class="bg-white p-6 rounded-xl border border-gray-150 shadow-xs flex items-center justify-between transition-all hover:shadow-md">
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

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      <!-- Leads Bar Chart Card -->
      <div class="bg-white rounded-xl border border-gray-150 shadow-xs p-6 lg:col-span-2 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="font-bold text-gray-900 text-base">Yêu cầu liên hệ theo tháng</h3>
              <p class="text-xs text-gray-400">Xu hướng gửi biểu mẫu liên hệ trong 6 tháng gần nhất</p>
            </div>
            <span class="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full">
              Tổng số: {{ stats.total_leads }} leads
            </span>
          </div>

          <!-- SVG Bar Chart -->
          <div class="relative w-full overflow-hidden pt-2">
            <svg viewBox="0 0 600 240" class="w-full h-auto select-none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#106d38" />
                  <stop offset="100%" stop-color="#34d399" />
                </linearGradient>
              </defs>
              
              <!-- Y Axis Lines -->
              <line x1="50" y1="30" x2="560" y2="30" stroke="#f3f4f6" stroke-dasharray="3 3" stroke-width="1.5" />
              <line x1="50" y1="80" x2="560" y2="80" stroke="#f3f4f6" stroke-dasharray="3 3" stroke-width="1.5" />
              <line x1="50" y1="130" x2="560" y2="130" stroke="#f3f4f6" stroke-dasharray="3 3" stroke-width="1.5" />
              <line x1="50" y1="180" x2="560" y2="180" stroke="#f3f4f6" stroke-dasharray="3 3" stroke-width="1.5" />
              
              <!-- Baseline -->
              <line x1="50" y1="200" x2="560" y2="200" stroke="#e5e7eb" stroke-width="2" />

              <!-- Y Axis Labels -->
              <text x="35" y="34" text-anchor="end" class="text-[10px] fill-gray-400 font-bold">{{ Math.round(maxLeadsValue) }}</text>
              <text x="35" y="119" text-anchor="end" class="text-[10px] fill-gray-400 font-bold">{{ Math.round(maxLeadsValue / 2) }}</text>
              <text x="35" y="204" text-anchor="end" class="text-[10px] fill-gray-400 font-bold">0</text>

              <!-- Columns Loop -->
              <g v-for="(item, idx) in monthlyLeads" :key="idx">
                <!-- Hover highlight background column -->
                <rect 
                  :x="60 + idx * 80" 
                  y="20" 
                  width="60" 
                  height="180" 
                  fill="#f9fafb" 
                  opacity="0" 
                  class="hover:opacity-100 transition-opacity duration-150 cursor-pointer"
                />

                <!-- Actual Bar -->
                <rect 
                  :x="75 + idx * 80" 
                  :y="200 - (item.value / maxLeadsValue) * 160" 
                  width="30" 
                  :height="(item.value / maxLeadsValue) * 160" 
                  fill="url(#barGrad)" 
                  rx="6" 
                  class="transition-all duration-500 ease-out cursor-pointer hover:brightness-105"
                />

                <!-- Value text on top of bar (always visible, style optimized) -->
                <text 
                  :x="90 + idx * 80" 
                  :y="190 - (item.value / maxLeadsValue) * 160" 
                  text-anchor="middle" 
                  class="text-[11px] fill-emerald-800 font-extrabold"
                >
                  {{ item.value }}
                </text>

                <!-- Month text label -->
                <text 
                  :x="90 + idx * 80" 
                  y="218" 
                  text-anchor="middle" 
                  class="text-[11px] fill-gray-500 font-bold"
                >
                  {{ item.label }}
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>

      <!-- Breakdown / Share Card -->
      <div class="bg-white rounded-xl border border-gray-150 shadow-xs p-6 flex flex-col justify-between">
        <div>
          <h3 class="font-bold text-gray-900 text-base mb-1">Cơ cấu & Hiệu suất</h3>
          <p class="text-xs text-gray-400 mb-6">Trực quan hóa tỷ lệ sản phẩm và hiệu suất liên hệ</p>

          <div class="space-y-6">
            <!-- Product Category Share Gauge -->
            <div>
              <div class="flex justify-between items-center mb-2">
                <span class="text-xs font-bold text-gray-700 uppercase">Cơ cấu nguyên liệu</span>
                <span class="text-xs text-gray-500 font-semibold">
                  {{ stats.food_products }} thực phẩm / {{ stats.cosmetic_products }} mỹ phẩm
                </span>
              </div>
              <div class="w-full h-4 bg-gray-100 rounded-full overflow-hidden flex">
                <div 
                  class="h-full bg-emerald-600 transition-all duration-500" 
                  :style="{ width: foodPct + '%' }"
                  title="Thực phẩm"
                ></div>
                <div 
                  class="h-full bg-teal-400 transition-all duration-500" 
                  :style="{ width: cosmeticPct + '%' }"
                  title="Mỹ phẩm"
                ></div>
              </div>
              <div class="flex justify-between items-center mt-2 text-[11px] font-bold">
                <div class="flex items-center gap-1.5 text-emerald-700">
                  <span class="w-2.5 h-2.5 bg-emerald-600 rounded-xs"></span>
                  Thực phẩm ({{ foodPct }}%)
                </div>
                <div class="flex items-center gap-1.5 text-teal-600">
                  <span class="w-2.5 h-2.5 bg-teal-400 rounded-xs"></span>
                  Mỹ phẩm ({{ cosmeticPct }}%)
                </div>
              </div>
            </div>

            <hr class="border-gray-100" />

            <!-- Leads Resolution Share Gauge -->
            <div>
              <div class="flex justify-between items-center mb-2">
                <span class="text-xs font-bold text-gray-700 uppercase">Hiệu suất xử lý liên hệ</span>
                <span class="text-xs font-bold" :class="resolutionPct >= 80 ? 'text-emerald-700' : 'text-amber-700'">
                  Đã giải quyết: {{ resolutionPct }}%
                </span>
              </div>
              <div class="w-full h-4 bg-red-100 rounded-full overflow-hidden flex">
                <div 
                  class="h-full bg-emerald-600 transition-all duration-500" 
                  :style="{ width: resolutionPct + '%' }"
                  title="Đã xử lý"
                ></div>
              </div>
              <div class="flex justify-between items-center mt-2 text-[11px] font-bold">
                <div class="flex items-center gap-1.5 text-emerald-700">
                  <span class="w-2.5 h-2.5 bg-emerald-600 rounded-xs"></span>
                  Đã xử lý ({{ processedLeadsCount }})
                </div>
                <div class="flex items-center gap-1.5 text-red-650">
                  <span class="w-2.5 h-2.5 bg-red-150 rounded-xs"></span>
                  Đang chờ ({{ stats.pending_leads }})
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Metric Quote -->
        <div class="mt-6 p-4 rounded-lg bg-gray-50 border border-gray-100 flex items-start gap-3">
          <div class="w-6 h-6 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 text-xs font-bold">
            i
          </div>
          <p class="text-xs text-gray-500 leading-relaxed">
            Hệ thống đang lưu trữ <span class="font-semibold text-gray-900">{{ stats.total_products }}</span> nguyên liệu cùng <span class="font-semibold text-gray-900">{{ stats.total_articles }}</span> tin bài để cung cấp dữ liệu động hiển thị trên Next.js storefront.
          </p>
        </div>
      </div>
    </div>

    <!-- Quick Links & Recent Leads Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Recent Leads (Table Card) -->
      <div class="bg-white rounded-xl border border-gray-150 shadow-xs p-6 lg:col-span-2 space-y-4 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between border-b border-gray-150 pb-4 mb-4">
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
      </div>

      <!-- Quick Actions -->
      <div class="bg-white rounded-xl border border-gray-150 shadow-xs p-6 space-y-6">
        <h3 class="font-bold text-gray-900 text-base border-b border-gray-150 pb-4">Thao tác nhanh</h3>
        <div class="flex flex-col gap-3">
          <Link
            href="/admin/products/create"
            class="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-emerald-500 hover:bg-emerald-50/20 text-gray-700 hover:text-emerald-800 transition-all text-sm font-semibold"
          >
            <div class="w-8 h-8 rounded bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-lg">
              +
            </div>
            Thêm sản phẩm mới
          </Link>
          <Link
            href="/admin/news/create"
            class="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50/20 text-gray-700 hover:text-blue-800 transition-all text-sm font-semibold"
          >
            <div class="w-8 h-8 rounded bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-lg">
              +
            </div>
            Viết bài tin tức mới
          </Link>
          <Link
            href="/admin/jobs/create"
            class="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50/20 text-gray-700 hover:text-indigo-800 transition-all text-sm font-semibold"
          >
            <div class="w-8 h-8 rounded bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-lg">
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
import { computed } from 'vue';

const props = defineProps({
  stats: Object,
  recentLeads: Array,
  monthlyLeads: Array,
});

const maxLeadsValue = computed(() => {
  if (!props.monthlyLeads || props.monthlyLeads.length === 0) return 10;
  const values = props.monthlyLeads.map(d => d.value);
  return Math.max(...values, 10);
});

// Product category ratios
const totalProducts = computed(() => props.stats.total_products || 1);
const foodPct = computed(() => Math.round((props.stats.food_products / totalProducts.value) * 100));
const cosmeticPct = computed(() => 100 - foodPct.value);

// Lead resolution ratios
const totalLeads = computed(() => props.stats.total_leads || 1);
const processedLeadsCount = computed(() => Math.max(0, props.stats.total_leads - props.stats.pending_leads));
const resolutionPct = computed(() => Math.round((processedLeadsCount.value / totalLeads.value) * 100));
</script>
