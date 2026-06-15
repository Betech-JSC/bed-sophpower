<template>
  <CrmLayout title="Thông tin cá nhân">
    <div class="max-w-2xl bg-white p-6 rounded-xl border border-gray-150 shadow-xs space-y-6">
      <div class="border-b border-gray-100 pb-4">
        <h3 class="text-base font-bold text-gray-900">
          Cập nhật thông tin tài khoản
        </h3>
        <p class="text-xs text-gray-400 mt-1">
          Quản lý thông tin hiển thị và cấu hình mật khẩu đăng nhập của bạn.
        </p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-5">
        <!-- Avatar Upload Section -->
        <div class="flex items-center gap-6 p-4 rounded-xl bg-gray-50 border border-gray-150">
          <div class="relative w-20 h-20 rounded-full overflow-hidden border border-gray-200 bg-white flex items-center justify-center shrink-0">
            <img v-if="props.user.avatar" :src="props.user.avatar" alt="Avatar" class="w-full h-full object-cover" />
            <div v-else class="w-full h-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-extrabold text-2xl uppercase">
              {{ form.name.charAt(0) }}
            </div>
          </div>
          <div class="space-y-2">
            <label class="block text-sm font-bold text-gray-700">Ảnh đại diện tài khoản</label>
            <input
              type="file"
              @change="onAvatarChange"
              accept="image/*"
              class="text-xs text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer"
            />
            <p class="text-[10px] text-gray-400">Hỗ trợ JPG, JPEG, PNG. Dung lượng tối đa 1MB.</p>
            <span v-if="form.errors.avatar_file" class="text-xs text-red-500 block font-medium">{{ form.errors.avatar_file }}</span>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <!-- Họ và tên -->
          <div>
            <label class="block text-sm font-bold text-gray-750 mb-1">Họ và tên <span class="text-red-500">*</span></label>
            <a-input
              v-model:value="form.name"
              placeholder="Nhập họ và tên của bạn..."
              size="large"
              :status="form.errors.name ? 'error' : ''"
            />
            <span v-if="form.errors.name" class="text-xs text-red-500 mt-1 block font-medium">{{ form.errors.name }}</span>
          </div>

          <!-- Số điện thoại -->
          <div>
            <label class="block text-sm font-bold text-gray-750 mb-1">Số điện thoại</label>
            <a-input
              v-model:value="form.phone"
              placeholder="Nhập số điện thoại..."
              size="large"
              :status="form.errors.phone ? 'error' : ''"
            />
            <span v-if="form.errors.phone" class="text-xs text-red-500 mt-1 block font-medium">{{ form.errors.phone }}</span>
          </div>
        </div>

        <!-- Email đăng nhập -->
        <div>
          <label class="block text-sm font-bold text-gray-750 mb-1">Địa chỉ Email <span class="text-red-500">*</span></label>
          <a-input
            v-model:value="form.email"
            placeholder="Nhập địa chỉ email đăng nhập..."
            size="large"
            type="email"
            :status="form.errors.email ? 'error' : ''"
          />
          <span v-if="form.errors.email" class="text-xs text-red-500 mt-1 block font-medium">{{ form.errors.email }}</span>
        </div>

        <!-- Tiểu sử -->
        <div>
          <label class="block text-sm font-bold text-gray-750 mb-1">Tiểu sử / Giới thiệu</label>
          <a-textarea
            v-model:value="form.bio"
            placeholder="Viết một vài dòng giới thiệu ngắn về bản thân..."
            :rows="3"
            size="large"
            :status="form.errors.bio ? 'error' : ''"
          />
          <span v-if="form.errors.bio" class="text-xs text-red-500 mt-1 block font-medium">{{ form.errors.bio }}</span>
        </div>

        <div class="border-t border-gray-100 pt-5 mt-5">
          <h4 class="text-sm font-bold text-gray-800 mb-4">Thay đổi mật khẩu đăng nhập</h4>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <!-- Mật khẩu mới -->
            <div>
              <label class="block text-sm font-bold text-gray-750 mb-1">Mật khẩu mới</label>
              <a-input-password
                v-model:value="form.password"
                placeholder="••••••••"
                size="large"
                :status="form.errors.password ? 'error' : ''"
              />
              <span v-if="form.errors.password" class="text-xs text-red-500 mt-1 block font-medium">{{ form.errors.password }}</span>
            </div>

            <!-- Xác nhận mật khẩu mới -->
            <div>
              <label class="block text-sm font-bold text-gray-750 mb-1">Xác nhận mật khẩu mới</label>
              <a-input-password
                v-model:value="form.password_confirmation"
                placeholder="••••••••"
                size="large"
                :status="form.errors.password_confirmation ? 'error' : ''"
              />
              <span v-if="form.errors.password_confirmation" class="text-xs text-red-500 mt-1 block font-medium">{{ form.errors.password_confirmation }}</span>
            </div>
          </div>
          <span class="text-[10px] text-gray-400 mt-2 block italic">Để trống phần này nếu bạn không muốn thay đổi mật khẩu hiện tại. Mật khẩu mới tối thiểu phải chứa 6 ký tự.</span>
        </div>

        <!-- Submit Button -->
        <div class="flex items-center gap-3 pt-5 border-t border-gray-100">
          <a-button
            type="primary"
            html-type="submit"
            class="bg-emerald-700 hover:bg-emerald-800 border-none h-11 px-6 font-bold flex items-center justify-center"
            :loading="form.processing"
          >
            Lưu thay đổi
          </a-button>
        </div>
      </form>
    </div>
  </CrmLayout>
</template>

<script setup>
import CrmLayout from '@/Layouts/CrmLayout.vue';
import { useForm } from '@inertiajs/vue3';

const props = defineProps({
  user: Object,
});

const form = useForm({
  _method: 'PUT',
  name: props.user.name || '',
  email: props.user.email || '',
  phone: props.user.phone || '',
  bio: props.user.bio || '',
  avatar_file: null,
  password: '',
  password_confirmation: '',
});

function onAvatarChange(e) {
  form.avatar_file = e.target.files[0];
}

function handleSubmit() {
  form.post('/admin/profile', {
    onSuccess: () => {
      form.reset('password', 'password_confirmation');
    },
  });
}
</script>
