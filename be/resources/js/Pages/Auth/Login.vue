<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 font-sans">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl border border-gray-150 shadow-sm">
      <div class="text-center">
        <!-- Logo -->
        <div class="mx-auto w-12 h-12 rounded-xl bg-emerald-700 flex items-center justify-center text-white font-extrabold text-lg tracking-wider mb-4">
          SP
        </div>
        <h2 class="text-2xl font-extrabold text-gray-900 tracking-tight">
          Sophpower Vietnam
        </h2>
        <p class="mt-2 text-sm text-gray-500">
          Đăng nhập vào hệ thống quản trị nội dung (CMS)
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="submit">
        <div class="space-y-4">
          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm font-bold text-gray-700 mb-1">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-emerald-500 focus:border-emerald-500 placeholder-gray-400"
              placeholder="admin@sophpower.com"
            />
            <p v-if="form.errors.email" class="mt-1 text-xs text-red-650 font-semibold">{{ form.errors.email }}</p>
          </div>

          <!-- Password Field -->
          <div>
            <label for="password" class="block text-sm font-bold text-gray-700 mb-1">Mật khẩu</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-emerald-500 focus:border-emerald-500 placeholder-gray-450"
              placeholder="••••••••"
            />
            <p v-if="form.errors.password" class="mt-1 text-xs text-red-650 font-semibold">{{ form.errors.password }}</p>
          </div>
        </div>

        <div class="flex items-center justify-between text-sm">
          <div class="flex items-center">
            <input
              id="remember"
              v-model="form.remember"
              type="checkbox"
              class="h-4 w-4 text-emerald-700 focus:ring-emerald-500 border-gray-300 rounded cursor-pointer"
            />
            <label for="remember" class="ml-2 block text-sm text-gray-600 cursor-pointer">
              Ghi nhớ đăng nhập
            </label>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="form.processing"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-emerald-700 hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors disabled:opacity-50 cursor-pointer"
          >
            <span v-if="form.processing">Đang xác thực...</span>
            <span v-else>Đăng nhập</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useForm } from '@inertiajs/vue3';

const form = useForm({
  email: '',
  password: '',
  remember: false,
});

function submit() {
  form.post('/admin/login', {
    onFinish: () => form.reset('password'),
  });
}
</script>
