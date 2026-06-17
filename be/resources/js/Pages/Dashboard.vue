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
      <!-- Leads Analytics Chart Card -->
      <div class="bg-white rounded-xl border border-gray-150 shadow-xs p-6 lg:col-span-2 flex flex-col justify-between relative">
        <div>
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 border-b border-gray-100 pb-4">
            <div>
              <h3 class="font-bold text-gray-900 text-base">Phân tích yêu cầu liên hệ</h3>
              <p class="text-xs text-gray-400">Xem tiến độ gửi biểu mẫu liên hệ của khách hàng</p>
            </div>
            
            <!-- Tab Controls -->
            <div class="flex bg-gray-100 p-0.5 rounded-lg">
              <button 
                type="button" 
                class="px-3 py-1 text-xs font-bold rounded-md transition-all"
                :class="activeLeadsTab === 'daily' ? 'bg-white text-emerald-800 shadow-xs' : 'text-gray-500 hover:text-gray-900'"
                @click="activeLeadsTab = 'daily'"
              >
                30 ngày qua
              </button>
              <button 
                type="button" 
                class="px-3 py-1 text-xs font-bold rounded-md transition-all"
                :class="activeLeadsTab === 'monthly' ? 'bg-white text-emerald-800 shadow-xs' : 'text-gray-500 hover:text-gray-900'"
                @click="activeLeadsTab = 'monthly'"
              >
                6 tháng gần đây
              </button>
            </div>
          </div>

          <!-- Tab Content 1: Daily Line Chart -->
          <div v-if="activeLeadsTab === 'daily'" class="relative w-full overflow-hidden pt-2">
            <svg viewBox="0 0 600 220" class="w-full h-auto select-none" xmlns="http://www.w3.org/2000/svg" @mousemove="handleLineMouseMove" @mouseleave="hoveredPoint = null">
              <defs>
                <linearGradient id="lineAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#106d38" stop-opacity="0.18" />
                  <stop offset="100%" stop-color="#106d38" stop-opacity="0.0" />
                </linearGradient>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="#34d399" />
                  <stop offset="100%" stop-color="#106d38" />
                </linearGradient>
              </defs>
              
              <!-- Grid Lines -->
              <line x1="45" y1="30" x2="575" y2="30" stroke="#f3f4f6" stroke-width="1" />
              <line x1="45" y1="75" x2="575" y2="75" stroke="#f3f4f6" stroke-width="1" />
              <line x1="45" y1="120" x2="575" y2="120" stroke="#f3f4f6" stroke-width="1" />
              <line x1="45" y1="165" x2="575" y2="165" stroke="#f3f4f6" stroke-width="1" />
              
              <!-- Baseline -->
              <line x1="45" y1="170" x2="575" y2="170" stroke="#e5e7eb" stroke-width="1.5" />

              <!-- Y Axis Labels -->
              <text x="35" y="34" text-anchor="end" class="text-[9px] fill-gray-400 font-bold">{{ Math.round(maxDailyValue) }}</text>
              <text x="35" y="102" text-anchor="end" class="text-[9px] fill-gray-400 font-bold">{{ Math.round(maxDailyValue / 2) }}</text>
              <text x="35" y="174" text-anchor="end" class="text-[9px] fill-gray-400 font-bold">0</text>

              <!-- Line Chart Paths -->
              <path :d="areaPath" fill="url(#lineAreaGrad)" />
              <path :d="linePath" fill="none" stroke="url(#lineGrad)" stroke-width="3" stroke-linecap="round" />

              <!-- Interactive Hover Vertical Guide Line -->
              <line 
                v-if="hoveredPoint"
                :x1="hoveredPoint.x"
                y1="30"
                :x2="hoveredPoint.x"
                y2="170"
                stroke="#106d38"
                stroke-opacity="0.3"
                stroke-width="1.5"
                stroke-dasharray="3 3"
              />

              <!-- Daily Vertices / Data Points -->
              <g v-for="(pt, idx) in dailyPoints" :key="idx">
                <circle 
                  :cx="pt.x" 
                  :cy="pt.y" 
                  r="3.5" 
                  fill="#ffffff" 
                  stroke="#106d38" 
                  stroke-width="2" 
                  class="transition-all duration-150 cursor-pointer"
                  :class="{ 'r-5 stroke-[3px]': hoveredPoint?.index === idx }"
                />
              </g>

              <!-- Date Label ticks (sampled to avoid overlap) -->
              <g v-for="(pt, idx) in dailyPoints" :key="'lbl-' + idx">
                <text 
                  v-if="idx % 5 === 0 || idx === dailyPoints.length - 1"
                  :x="pt.x" 
                  y="190" 
                  text-anchor="middle" 
                  class="text-[9px] fill-gray-400 font-bold"
                >
                  {{ pt.label }}
                </text>
              </g>
            </svg>

            <!-- Floating Tooltip Box -->
            <div 
              v-if="hoveredPoint"
              class="absolute z-10 bg-gray-900/95 text-white text-xs font-bold rounded-lg px-2.5 py-1.5 shadow-lg border border-gray-800 transition-all pointer-events-none transform -translate-x-1/2 -translate-y-full mb-2"
              :style="{ left: hoveredPoint.left + 'px', top: (hoveredPoint.top + 45) + 'px' }"
            >
              <p class="text-[9px] text-gray-400 font-normal">Ngày {{ hoveredPoint.label }}</p>
              <p class="text-sm font-extrabold text-emerald-400">{{ hoveredPoint.value }} leads</p>
            </div>
          </div>

          <!-- Tab Content 2: Monthly Bar Chart -->
          <div v-else class="relative w-full overflow-hidden pt-2">
            <svg viewBox="0 0 600 220" class="w-full h-auto select-none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#106d38" />
                  <stop offset="100%" stop-color="#34d399" />
                </linearGradient>
              </defs>
              
              <!-- Y Axis Lines -->
              <line x1="50" y1="30" x2="560" y2="30" stroke="#f3f4f6" stroke-dasharray="3 3" stroke-width="1.5" />
              <line x1="50" y1="75" x2="560" y2="75" stroke="#f3f4f6" stroke-dasharray="3 3" stroke-width="1.5" />
              <line x1="50" y1="120" x2="560" y2="120" stroke="#f3f4f6" stroke-dasharray="3 3" stroke-width="1.5" />
              
              <!-- Baseline -->
              <line x1="50" y1="165" x2="560" y2="165" stroke="#e5e7eb" stroke-width="2" />

              <!-- Y Axis Labels -->
              <text x="35" y="34" text-anchor="end" class="text-[9px] fill-gray-400 font-bold">{{ Math.round(maxLeadsValue) }}</text>
              <text x="35" y="102" text-anchor="end" class="text-[9px] fill-gray-400 font-bold">{{ Math.round(maxLeadsValue / 2) }}</text>
              <text x="35" y="169" text-anchor="end" class="text-[9px] fill-gray-400 font-bold">0</text>

              <!-- Columns Loop -->
              <g v-for="(item, idx) in monthlyLeads" :key="idx">
                <rect 
                  :x="60 + idx * 80" 
                  y="20" 
                  width="60" 
                  height="145" 
                  fill="#f9fafb" 
                  opacity="0" 
                  class="hover:opacity-100 transition-opacity duration-150 cursor-pointer"
                />

                <rect 
                  :x="75 + idx * 80" 
                  :y="165 - (item.value / maxLeadsValue) * 130" 
                  width="30" 
                  :height="(item.value / maxLeadsValue) * 130" 
                  fill="url(#barGrad)" 
                  rx="4" 
                  class="transition-all duration-500 ease-out cursor-pointer hover:brightness-105"
                />

                <text 
                  :x="90 + idx * 80" 
                  :y="155 - (item.value / maxLeadsValue) * 130" 
                  text-anchor="middle" 
                  class="text-[10px] fill-emerald-800 font-extrabold"
                >
                  {{ item.value }}
                </text>

                <text 
                  :x="90 + idx * 80" 
                  y="182" 
                  text-anchor="middle" 
                  class="text-[10px] fill-gray-500 font-bold"
                >
                  {{ item.label }}
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>

      <!-- Breakdown & Performance Gauge Card -->
      <div class="bg-white rounded-xl border border-gray-150 shadow-xs p-6 flex flex-col justify-between">
        <div>
          <h3 class="font-bold text-gray-900 text-base mb-1">Cơ cấu & Giải quyết</h3>
          <p class="text-xs text-gray-400 mb-6">Đo lường tỷ lệ dữ liệu sản phẩm và hỏi đáp</p>

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

            <!-- Product Questions Doughnut Chart Gauge -->
            <div class="flex items-center gap-4">
              <div class="relative flex-shrink-0">
                <svg viewBox="0 0 120 120" class="w-24 h-24">
                  <!-- Outer circle track -->
                  <circle cx="60" cy="60" r="45" fill="none" stroke="#f3f4f6" stroke-width="10" />
                  <!-- Replied stroke -->
                  <circle 
                    cx="60" 
                    cy="60" 
                    r="45" 
                    fill="none" 
                    stroke="#106d38" 
                    stroke-width="10" 
                    stroke-linecap="round"
                    :stroke-dasharray="repliedDashArray"
                    transform="rotate(-90 60 60)"
                    class="transition-all duration-500 ease-out"
                  />
                  <!-- Center details -->
                  <text x="60" y="62" text-anchor="middle" class="text-sm font-extrabold fill-gray-900 leading-none">
                    {{ questionReplyRate }}%
                  </text>
                  <text x="60" y="76" text-anchor="middle" class="text-[8px] font-bold fill-gray-400 uppercase tracking-wider">
                    Phản hồi
                  </text>
                </svg>
              </div>
              <div class="flex-1 space-y-1">
                <span class="text-xs font-bold text-gray-700 uppercase block mb-1">Hỏi đáp sản phẩm</span>
                <div class="text-[11px] font-semibold text-gray-500 space-y-1">
                  <div class="flex items-center justify-between">
                    <span class="flex items-center gap-1.5 text-emerald-700">
                      <span class="w-2 h-2 bg-emerald-600 rounded-full"></span>
                      Đã trả lời:
                    </span>
                    <span class="font-bold text-gray-800">{{ stats.replied_questions }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="flex items-center gap-1.5 text-amber-600">
                      <span class="w-2 h-2 bg-amber-500 rounded-full"></span>
                      Chờ trả lời:
                    </span>
                    <span class="font-bold text-gray-800">{{ stats.pending_questions }}</span>
                  </div>
                  <div class="text-[10px] text-gray-400 mt-2 border-t border-gray-100 pt-1 flex justify-between">
                    <span>Tổng số câu hỏi:</span>
                    <span class="font-bold text-gray-600">{{ stats.total_questions }}</span>
                  </div>
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
            Hệ thống đang hoạt động ổn định. Đã phản hồi <span class="font-semibold text-gray-900">{{ stats.replied_questions }}</span> câu hỏi của khách hàng về sản phẩm.
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
import { computed, ref } from 'vue';

const props = defineProps({
  stats: Object,
  recentLeads: Array,
  monthlyLeads: Array,
  dailyLeads: Array,
});

const activeLeadsTab = ref('daily');
const hoveredPoint = ref(null);

const maxLeadsValue = computed(() => {
  if (!props.monthlyLeads || props.monthlyLeads.length === 0) return 10;
  const values = props.monthlyLeads.map(d => d.value);
  return Math.max(...values, 10);
});

// Daily leads calculations
const maxDailyValue = computed(() => {
  if (!props.dailyLeads || props.dailyLeads.length === 0) return 5;
  const values = props.dailyLeads.map(d => d.value);
  return Math.max(...values, 5);
});

const dailyPoints = computed(() => {
  if (!props.dailyLeads || props.dailyLeads.length === 0) return [];
  const width = 530;
  const height = 130;
  const step = width / (props.dailyLeads.length - 1);
  return props.dailyLeads.map((d, idx) => {
    const x = 45 + idx * step;
    const y = 160 - (d.value / maxDailyValue.value) * height;
    return { x, y, label: d.label, value: d.value };
  });
});

const linePath = computed(() => {
  const pts = dailyPoints.value;
  if (pts.length === 0) return '';
  return pts.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ');
});

const areaPath = computed(() => {
  const pts = dailyPoints.value;
  if (pts.length === 0) return '';
  const first = pts[0];
  const last = pts[pts.length - 1];
  return `${linePath.value} L ${last.x} 170 L ${first.x} 170 Z`;
});

function handleLineMouseMove(e) {
  const svg = e.currentTarget;
  const rect = svg.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  
  const pts = dailyPoints.value;
  if (pts.length === 0) return;
  
  let closest = pts[0];
  let minDiff = Math.abs(pts[0].x - (mouseX / rect.width) * 600);
  let closestIdx = 0;
  
  for (let i = 1; i < pts.length; i++) {
    const diff = Math.abs(pts[i].x - (mouseX / rect.width) * 600);
    if (diff < minDiff) {
      minDiff = diff;
      closest = pts[i];
      closestIdx = i;
    }
  }
  
  if (minDiff < 25) {
    hoveredPoint.value = {
      ...closest,
      index: closestIdx,
      left: (closest.x / 600) * rect.width,
      top: (closest.y / 220) * rect.height,
    };
  } else {
    hoveredPoint.value = null;
  }
}

// Product category ratios
const totalProducts = computed(() => props.stats.total_products || 1);
const foodPct = computed(() => Math.round((props.stats.food_products / totalProducts.value) * 100));
const cosmeticPct = computed(() => 100 - foodPct.value);

// Lead resolution ratios
const totalLeads = computed(() => props.stats.total_leads || 1);
const processedLeadsCount = computed(() => Math.max(0, props.stats.total_leads - props.stats.pending_leads));
const resolutionPct = computed(() => Math.round((processedLeadsCount.value / totalLeads.value) * 100));

// Doughnut chart calculation for questions
const repliedDashArray = computed(() => {
  const total = props.stats.total_questions || 0;
  if (total === 0) return '0 283';
  const pct = props.stats.replied_questions / total;
  const strokeLength = pct * 282.7;
  return `${strokeLength} 283`;
});

const questionReplyRate = computed(() => {
  const total = props.stats.total_questions || 0;
  if (total === 0) return 0;
  return Math.round((props.stats.replied_questions / total) * 100);
});
</script>
