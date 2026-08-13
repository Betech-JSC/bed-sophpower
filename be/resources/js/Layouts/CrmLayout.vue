<template>
  <div class="flex h-screen bg-gray-50 font-sans text-gray-800">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r border-gray-150 flex flex-col justify-between shrink-0 h-full overflow-hidden">
      <div class="flex flex-col overflow-hidden">
        <!-- Brand logo / title -->
        <div class="h-16 flex items-center px-6 border-b border-gray-150 bg-gray-50/50 shrink-0">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center text-white font-extrabold text-sm tracking-wider">
              SP
            </div>
            <span class="text-base font-bold text-gray-900 tracking-tight">SOPHCHEM</span>
            <span class="text-xs font-semibold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 uppercase tracking-wide border border-emerald-100">
              CMS
            </span>
          </div>
        </div>

        <!-- Navigation Menu -->
        <nav class="p-4 space-y-1 overflow-y-auto flex-1">
          <Link
            v-for="item in filteredMenuItems"
            :key="item.path"
            :href="item.path"
            :class="[
              isUrl(item.match)
                ? 'bg-emerald-50 text-emerald-800 font-semibold border-l-4 border-emerald-700'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent',
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150'
            ]"
          >
            <span v-html="item.icon" class="w-5 h-5 opacity-80" />
            {{ item.name }}
          </Link>
        </nav>
      </div>

      <!-- User Info & Logout -->
      <div class="p-4 border-t border-gray-150 bg-gray-50/50 shrink-0">
        <div class="flex items-center justify-between">
          <Link
            href="/admin/profile"
            class="flex items-center gap-2 hover:opacity-80 transition-all group flex-1 min-w-0"
            title="Xem thông tin cá nhân"
          >
            <div class="w-8 h-8 rounded-full border border-gray-200 overflow-hidden bg-emerald-150 flex items-center justify-center text-emerald-800 font-bold text-sm shrink-0 group-hover:bg-emerald-200 transition-colors">
              <img v-if="$page.props.auth.user && $page.props.auth.user.avatar" :src="$page.props.auth.user.avatar" alt="Avatar" class="w-full h-full object-cover" />
              <span v-else>{{ $page.props.auth.user ? $page.props.auth.user.name.charAt(0) : 'A' }}</span>
            </div>
            <div class="truncate flex-1">
              <p class="text-sm font-bold text-gray-950 truncate group-hover:text-emerald-800 transition-colors">{{ $page.props.auth.user ? $page.props.auth.user.name : 'Admin' }}</p>
              <p class="text-xs text-gray-500 truncate">{{ $page.props.auth.user ? $page.props.auth.user.email : 'admin@sophpower.com' }}</p>
            </div>
          </Link>
          <button
            @click="logout"
            class="p-1.5 rounded-md hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
            title="Đăng xuất"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Top navbar -->
      <header class="h-16 bg-white border-b border-gray-150 flex items-center justify-between px-8 shrink-0">
        <h2 class="text-lg font-bold text-gray-900 uppercase tracking-wide">
          {{ pageTitle }}
        </h2>
        <div class="flex items-center gap-4">
          <!-- Google Translate Widget Container -->
          <div id="google_translate_element" class="google-translate-dropdown"></div>

          <!-- Notification / Status Indicator -->
          <a
            href="https://sophpower.com"
            target="_blank"
            class="text-xs font-semibold text-emerald-800 hover:text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-150 transition-colors"
          >
            Xem website công cộng
          </a>
        </div>
      </header>

      <!-- Main Scrollable Section -->
      <main class="flex-1 overflow-y-auto p-8">
        <!-- Toast Messages -->
        <div
          v-if="flashMessage"
          :class="[
            flashMessage.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800',
            'mb-6 p-4 rounded-xl border flex items-center justify-between shadow-xs transition-all duration-300'
          ]"
        >
          <div class="flex items-center gap-2">
            <svg v-if="flashMessage.type === 'success'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-sm font-semibold">{{ flashMessage.text }}</span>
          </div>
          <button @click="clearFlash" class="text-gray-400 hover:text-gray-600 cursor-pointer">
            &times;
          </button>
        </div>

        <slot />
      </main>
    </div>
    <!-- AI Chat Assistant Widget -->
    <AiChatWidget />
  </div>
</template>

<script setup>
import { Link, router, usePage } from '@inertiajs/vue3';
import { computed, ref, watch, onMounted } from 'vue';
import AiChatWidget from '@/Components/AiChatWidget.vue';

const props = defineProps({
  title: String,
});

const page = usePage();

const pageTitle = computed(() => props.title || 'Hệ thống Quản trị');

const menuItems = [
  {
    name: 'Tổng quan',
    path: '/admin/dashboard',
    match: 'dashboard',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" /></svg>`
  },
  {
    name: 'Hướng dẫn sử dụng',
    path: '/admin/guide',
    match: 'guide',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>`
  },
  {
    name: 'Sản phẩm',
    path: '/admin/products',
    match: 'products',
    permission: 'products.view',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>`
  },
  {
    name: 'Danh mục Sản phẩm',
    path: '/admin/product-categories',
    match: 'product-categories',
    permission: 'product-categories.view',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h7" /></svg>`
  },
  {
    name: 'Tin tức & Bài viết',
    path: '/admin/news',
    match: 'news',
    permission: 'news.view',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>`
  },
  {
    name: 'Danh mục Bài viết',
    path: '/admin/article-categories',
    match: 'article-categories',
    permission: 'article-categories.view',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>`
  },
  {
    name: 'Tuyển dụng',
    path: '/admin/jobs',
    match: 'jobs',
    permission: 'jobs.view',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>`
  },
  {
    name: 'Yêu cầu liên hệ',
    path: '/admin/leads',
    match: 'leads',
    permission: 'leads.view',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>`
  },
  {
    name: 'Trang tĩnh',
    path: '/admin/pages',
    match: 'pages',
    permission: 'pages.view',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>`
  },
  {
    name: 'Banner Slider',
    path: '/admin/banners',
    match: 'banners',
    permission: 'banners.view',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>`
  },
  {
    name: 'Hỏi đáp FAQs',
    path: '/admin/faqs',
    match: 'faqs',
    permission: 'faqs.view',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`
  },
  {
    name: 'Hỏi đáp sản phẩm',
    path: '/admin/product-questions',
    match: 'product-questions',
    permission: 'product-questions.view',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>`
  },
  {
    name: 'SEO Redirects',
    path: '/admin/seo-redirects',
    match: 'seo-redirects',
    permission: 'seo-redirects.view',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>`
  },
  {
    name: 'Nhật ký hệ thống',
    path: '/admin/activity-logs',
    match: 'activity-logs',
    permission: 'activity_logs.view',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`
  },
  {
    name: 'Quản lý nhãn dịch',
    path: '/admin/translations',
    match: 'translations',
    permission: 'translations.view',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5c-.756 2.016-1.96 3.559-3.337 4.828a11.986 11.986 0 01-5.105-3.057M9.374 9.828c.618.63 1.488 1.118 2.457 1.417" /></svg>`
  },
  {
    name: 'Quản lý File',
    path: '/admin/media',
    match: 'media',
    permission: 'media.view',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>`
  },
  {
    name: 'Cấu hình chung',
    path: '/admin/settings',
    match: 'settings',
    permission: 'settings.manage',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>`
  },
  {
    name: 'Quản lý User',
    path: '/admin/users',
    match: 'users',
    permission: 'users.manage',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>`
  },
  {
    name: 'Vai trò & Quyền',
    path: '/admin/roles',
    match: 'roles',
    permission: 'roles.manage',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.952 11.952 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>`
  }
];

const filteredMenuItems = computed(() => {
  const userPermissions = page.props.auth.user?.permissions || [];
  const isSuperAdmin = userPermissions.includes('*');

  return menuItems.filter(item => {
    if (!item.permission) {
      return true;
    }
    if (isSuperAdmin) {
      return true;
    }
    return userPermissions.includes(item.permission);
  });
});

const flashMessage = ref(null);

watch(
  () => page.props.flash,
  (newFlash) => {
    if (newFlash && newFlash.success) {
      flashMessage.value = { type: 'success', text: newFlash.success };
      autoClear();
    } else if (newFlash && newFlash.error) {
      flashMessage.value = { type: 'error', text: newFlash.error };
      autoClear();
    } else {
      flashMessage.value = null;
    }
  },
  { immediate: true, deep: true }
);

function autoClear() {
  setTimeout(() => {
    clearFlash();
  }, 4000);
}

function clearFlash() {
  flashMessage.value = null;
  page.props.flash.success = null;
  page.props.flash.error = null;
}

function isUrl(match) {
  const currentUrl = page.url;
  return currentUrl.includes(match);
}

function logout() {
  router.post('/admin/logout');
}

onMounted(() => {
  // Re-initialize Google Translate Widget when the layout mounts/remounts on Inertia page transitions
  const initWidget = () => {
    const el = document.getElementById('google_translate_element');
    if (el) {
      el.innerHTML = ''; // Clear container
    }
    
    if (window.google && window.google.translate && window.google.translate.TranslateElement) {
      new window.google.translate.TranslateElement({
        pageLanguage: 'vi',
        includedLanguages: 'vi,en,zh-CN,ja',
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
      }, 'google_translate_element');
    }
  };

  // Run on mount
  initWidget();
  
  // Add a small delay/retry in case Google script is still loading on first load
  if (!window.google || !window.google.translate) {
    let retries = 0;
    const interval = setInterval(() => {
      retries++;
      if (window.google && window.google.translate) {
        initWidget();
        clearInterval(interval);
      } else if (retries > 10) {
        clearInterval(interval);
      }
    }, 500);
  }
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Custom styles for Google Translate Widget inside CMS */
.google-translate-dropdown :deep(.goog-te-gadget) {
  font-family: inherit !important;
  font-size: 13px !important;
}
.google-translate-dropdown :deep(.goog-te-gadget-simple) {
  background-color: #f0fdf4 !important; /* bg-emerald-50 */
  border: 1px solid #d1fae5 !important; /* border-emerald-150 */
  padding: 6px 10px !important;
  border-radius: 8px !important;
  cursor: pointer !important;
  display: inline-flex !important;
  align-items: center !important;
  font-weight: 600 !important;
  color: #064e3b !important; /* text-emerald-800 */
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !important;
  transition: all 0.2s !important;
}
.google-translate-dropdown :deep(.goog-te-gadget-simple:hover) {
  background-color: #d1fae5 !important;
  border-color: #a7f3d0 !important;
}
.google-translate-dropdown :deep(.goog-te-gadget-simple .goog-te-menu-value) {
  color: #064e3b !important;
  margin-right: 0 !important;
}
.google-translate-dropdown :deep(.goog-te-gadget-simple img) {
  display: none !important; /* Hide Google Translate logo icon */
}
.google-translate-dropdown :deep(.goog-te-menu-value span:nth-child(5)) {
  display: none !important; /* Hide default arrow down */
}
.google-translate-dropdown :deep(.goog-te-menu-value span:nth-child(3)) {
  display: none !important; /* Hide vertical separator bar */
}
.google-translate-dropdown :deep(.goog-te-menu-value span:first-child) {
  margin-right: 4px !important;
}
/* Append custom caret icon in CSS */
.google-translate-dropdown :deep(.goog-te-menu-value::after) {
  content: "";
  display: inline-block;
  width: 8px;
  height: 8px;
  border-right: 2px solid #064e3b;
  border-bottom: 2px solid #064e3b;
  transform: rotate(45deg);
  margin-left: 4px;
  margin-bottom: 3px;
  transition: transform 0.2s;
}
</style>
