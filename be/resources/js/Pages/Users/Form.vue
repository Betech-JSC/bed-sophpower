<template>
  <CrmLayout :title="isEdit ? 'Cập nhật quản trị viên' : 'Thêm quản trị viên mới'">
    <div class="max-w-2xl bg-white p-6 rounded-xl border border-gray-150 shadow-xs space-y-6">
      <div class="flex items-center justify-between border-b border-gray-100 pb-4">
        <h3 class="text-base font-bold text-gray-900">
          {{ isEdit ? 'Chỉnh sửa tài khoản quản trị' : 'Tạo tài khoản quản trị mới' }}
        </h3>
        <a-button type="link" class="text-gray-500 hover:text-gray-700 p-0 font-semibold" @click="goBack">
          Quay lại danh sách
        </a-button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-5">
        <!-- Họ và tên -->
        <div>
          <label class="block text-sm font-bold text-gray-750 mb-1">Họ và tên <span class="text-red-500">*</span></label>
          <a-input
            v-model:value="form.name"
            placeholder="Nhập họ và tên quản trị viên..."
            size="large"
            :status="form.errors.name ? 'error' : ''"
          />
          <span v-if="form.errors.name" class="text-xs text-red-500 mt-1 block font-medium">{{ form.errors.name }}</span>
        </div>

        <!-- Email đăng nhập -->
        <div>
          <label class="block text-sm font-bold text-gray-750 mb-1">Email đăng nhập <span class="text-red-500">*</span></label>
          <a-input
            v-model:value="form.email"
            placeholder="Nhập địa chỉ email..."
            size="large"
            type="email"
            :status="form.errors.email ? 'error' : ''"
            :disabled="isEdit"
          />
          <span v-if="form.errors.email" class="text-xs text-red-500 mt-1 block font-medium">{{ form.errors.email }}</span>
          <span v-if="isEdit" class="text-[10px] text-gray-400 mt-0.5 block italic">Không thể thay đổi email đăng nhập của tài khoản đã tồn tại.</span>
        </div>

        <!-- Mật khẩu -->
        <div>
          <label class="block text-sm font-bold text-gray-750 mb-1">
            Mật khẩu <span v-if="!isEdit" class="text-red-500">*</span>
          </label>
          <a-input-password
            v-model:value="form.password"
            placeholder="Nhập mật khẩu..."
            size="large"
            :status="form.errors.password ? 'error' : ''"
          />
          <span v-if="form.errors.password" class="text-xs text-red-500 mt-1 block font-medium">{{ form.errors.password }}</span>
          <span v-if="isEdit" class="text-[10px] text-gray-400 mt-0.5 block italic">Để trống nếu bạn không muốn thay đổi mật khẩu hiện tại. Mật khẩu phải chứa ít nhất 6 ký tự.</span>
        </div>

        <!-- Vai trò / Nhóm quyền -->
        <div>
          <label class="block text-sm font-bold text-gray-750 mb-1">Vai trò hệ thống <span class="text-red-500">*</span></label>
          <a-select
            v-model:value="form.role_id"
            placeholder="Chọn vai trò..."
            size="large"
            class="w-full"
            :status="form.errors.role_id ? 'error' : ''"
          >
            <a-select-option v-for="role in roles" :key="role.id" :value="role.id">
              {{ role.name }}
            </a-select-option>
          </a-select>
          <span v-if="form.errors.role_id" class="text-xs text-red-500 mt-1 block font-medium">{{ form.errors.role_id }}</span>
        </div>

        <!-- Submit Button -->
        <div class="flex items-center gap-3 pt-4 border-t border-gray-100">
          <a-button
            type="primary"
            html-type="submit"
            class="bg-emerald-700 hover:bg-emerald-800 border-none h-11 px-6 font-bold flex items-center justify-center"
            :loading="form.processing"
          >
            {{ isEdit ? 'Lưu thay đổi' : 'Tạo tài khoản' }}
          </a-button>
          <a-button size="large" class="h-11 px-6 font-semibold" @click="goBack" :disabled="form.processing">
            Hủy bỏ
          </a-button>
        </div>
      </form>
    </div>
  </CrmLayout>
</template>

<script setup>
import CrmLayout from '@/Layouts/CrmLayout.vue';
import { useForm } from '@inertiajs/vue3';
import { ref } from 'vue';

const props = defineProps({
  user: Object,
  roles: Array,
  isEdit: Boolean,
});

const form = useForm({
  name: props.user?.name || '',
  email: props.user?.email || '',
  password: '',
  role_id: props.user?.role_id || undefined,
});

function goBack() {
  window.history.back();
}

function handleSubmit() {
  if (props.isEdit) {
    form.post(`/admin/users/${props.user.id}`, {
      onSuccess: () => {},
    });
  } else {
    form.post('/admin/users', {
      onSuccess: () => {},
    });
  }
}
</script>
