<template>
  <CrmLayout :title="isEdit ? 'Cấu hình vai trò' : 'Thêm vai trò mới'">
    <div class="max-w-4xl bg-white p-6 rounded-xl border border-gray-150 shadow-xs space-y-6">
      <div class="flex items-center justify-between border-b border-gray-100 pb-4">
        <h3 class="text-base font-bold text-gray-900">
          {{ isEdit ? 'Thiết lập quyền hạn vai trò' : 'Tạo vai trò và thiết lập quyền hạn' }}
        </h3>
        <a-button type="link" class="text-gray-500 hover:text-gray-700 p-0 font-semibold" @click="goBack">
          Quay lại danh sách
        </a-button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Tên vai trò -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label class="block text-sm font-bold text-gray-750 mb-1">Tên vai trò <span class="text-red-500">*</span></label>
            <a-input
              v-model:value="form.name"
              placeholder="Ví dụ: Biên tập viên, Kỹ thuật..."
              size="large"
              :status="form.errors.name ? 'error' : ''"
              :disabled="isSuperAdminRole"
            />
            <span v-if="form.errors.name" class="text-xs text-red-500 mt-1 block font-medium">{{ form.errors.name }}</span>
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-750 mb-1">Mô tả vai trò</label>
            <a-input
              v-model:value="form.description"
              placeholder="Nhập mô tả ngắn về vai trò này..."
              size="large"
              :disabled="isSuperAdminRole"
            />
          </div>
        </div>

        <!-- Bảng phân quyền -->
        <div class="space-y-4">
          <div class="flex items-center justify-between border-b border-gray-100 pb-2">
            <h4 class="text-sm font-bold text-gray-900">Danh sách quyền hạn hệ thống</h4>
            <div class="flex gap-2" v-if="!isSuperAdminRole">
              <a-button size="small" class="text-xs" @click="selectAllPermissions">Chọn tất cả</a-button>
              <a-button size="small" class="text-xs" @click="deselectAllPermissions">Bỏ chọn tất cả</a-button>
            </div>
          </div>

          <!-- Super Admin warning -->
          <div v-if="isSuperAdminRole" class="p-4 rounded-xl bg-red-50 border border-red-150 text-red-800 text-sm font-medium">
            ⚠️ Vai trò **Super Admin** mặc định có toàn bộ quyền hạn hệ thống (`*`) và không thể chỉnh sửa phân quyền.
          </div>

          <!-- Permissions Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="(group, groupKey) in permissionsGrouped"
              :key="groupKey"
              class="border border-gray-150 rounded-xl p-4 bg-gray-55/30 space-y-3 shadow-2xs"
            >
              <h5 class="font-bold text-gray-800 border-b border-gray-100 pb-2 text-xs uppercase tracking-wider flex items-center justify-between">
                {{ group.title }}
                <span class="text-[9px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 uppercase font-mono font-bold">{{ groupKey }}</span>
              </h5>

              <div class="flex flex-col gap-2.5">
                <div
                  v-for="(label, key) in group.permissions"
                  :key="key"
                  class="flex items-start gap-2.5"
                >
                  <a-checkbox
                    :checked="isSuperAdminRole || form.permissions.includes(key)"
                    :disabled="isSuperAdminRole"
                    @change="e => togglePermission(key, e.target.checked)"
                    class="mt-0.5 select-none"
                  >
                    <span class="text-sm font-semibold text-gray-750 block select-none cursor-pointer leading-tight">{{ label }}</span>
                    <span class="text-[9px] font-mono text-gray-400 block mt-0.5 select-none">{{ key }}</span>
                  </a-checkbox>
                </div>
              </div>
            </div>
          </div>
          <span v-if="form.errors.permissions" class="text-xs text-red-500 mt-1 block font-medium">{{ form.errors.permissions }}</span>
        </div>

        <!-- Submit Button -->
        <div class="flex items-center gap-3 pt-4 border-t border-gray-100">
          <a-button
            type="primary"
            html-type="submit"
            class="bg-emerald-700 hover:bg-emerald-800 border-none h-11 px-6 font-bold flex items-center justify-center"
            :loading="form.processing"
            v-if="!isSuperAdminRole"
          >
            {{ isEdit ? 'Lưu thay đổi' : 'Tạo vai trò' }}
          </a-button>
          <a-button size="large" class="h-11 px-6 font-semibold" @click="goBack" :disabled="form.processing">
            {{ isSuperAdminRole ? 'Quay lại' : 'Hủy bỏ' }}
          </a-button>
        </div>
      </form>
    </div>
  </CrmLayout>
</template>

<script setup>
import CrmLayout from '@/Layouts/CrmLayout.vue';
import { useForm } from '@inertiajs/vue3';
import { computed } from 'vue';

const props = defineProps({
  role: Object,
  permissionsGrouped: Object,
  isEdit: Boolean,
});

const isSuperAdminRole = computed(() => props.role?.id === 1 || props.role?.name === 'Super Admin');

// Initialize form
const form = useForm({
  name: props.role?.name || '',
  description: props.role?.description || '',
  permissions: props.role?.permissions || [],
});

function goBack() {
  window.history.back();
}

function togglePermission(key, checked) {
  if (checked) {
    if (!form.permissions.includes(key)) {
      form.permissions.push(key);
    }
  } else {
    form.permissions = form.permissions.filter(k => k !== key);
  }
}

function selectAllPermissions() {
  const allKeys = [];
  Object.values(props.permissionsGrouped).forEach(group => {
    Object.keys(group.permissions).forEach(key => {
      allKeys.push(key);
    });
  });
  form.permissions = allKeys;
}

function deselectAllPermissions() {
  form.permissions = [];
}

function handleSubmit() {
  if (isSuperAdminRole.value) return;

  if (props.isEdit) {
    form.post(`/admin/roles/${props.role.id}`, {
      _method: 'PUT',
      onSuccess: () => {},
    });
  } else {
    form.post('/admin/roles', {
      onSuccess: () => {},
    });
  }
}
</script>
