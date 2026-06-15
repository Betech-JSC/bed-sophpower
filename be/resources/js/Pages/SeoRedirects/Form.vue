<template>
  <CrmLayout :title="isEdit ? 'Sửa quy tắc chuyển hướng SEO' : 'Thêm quy tắc chuyển hướng SEO mới'">
    <div class="bg-white p-8 rounded-xl border border-gray-150 shadow-xs max-w-2xl">
      <form @submit.prevent="submit" class="space-y-6">
        
        <!-- Source URL -->
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-1">Đường dẫn nguồn (Source URL) *</label>
          <a-input v-model:value="form.source_url" placeholder="Ví dụ: /list_2 hoặc /tin-tuc-cu..." required size="large" />
          <p class="text-xs text-gray-400 mt-1">Đường dẫn bắt đầu bằng dấu gạch chéo `/` cần chuyển hướng.</p>
          <p v-if="form.errors.source_url" class="mt-1 text-xs text-red-650 font-semibold">{{ form.errors.source_url }}</p>
        </div>

        <!-- Target URL -->
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-1">Đường dẫn / URL đích (Target URL) *</label>
          <a-input v-model:value="form.target_url" placeholder="Ví dụ: /nguyen-lieu-thuc-pham hoặc URL đầy đủ https://..." required size="large" />
          <p class="text-xs text-gray-400 mt-1">Nơi người dùng sẽ tự động chuyển hướng tới.</p>
          <p v-if="form.errors.target_url" class="mt-1 text-xs text-red-650 font-semibold">{{ form.errors.target_url }}</p>
        </div>

        <!-- HTTP Code -->
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-1">Mã phản hồi HTTP (Redirect Type) *</label>
          <a-select v-model:value="form.http_code" placeholder="Chọn HTTP code" class="w-full" size="large">
            <a-select-option value="301">301 - Chuyển hướng vĩnh viễn (Tốt cho SEO)</a-select-option>
            <a-select-option value="302">302 - Chuyển hướng tạm thời</a-select-option>
          </a-select>
          <p v-if="form.errors.http_code" class="mt-1 text-xs text-red-650 font-semibold">{{ form.errors.http_code }}</p>
        </div>

        <!-- Form Actions -->
        <div class="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
          <a-button size="large" @click="cancel">
            Hủy bỏ
          </a-button>
          <a-button type="primary" html-type="submit" size="large" class="bg-emerald-700 hover:bg-emerald-800 border-none font-bold" :loading="form.processing">
            {{ isEdit ? 'Cập nhật quy tắc' : 'Lưu quy tắc' }}
          </a-button>
        </div>

      </form>
    </div>
  </CrmLayout>
</template>

<script setup>
import CrmLayout from '@/Layouts/CrmLayout.vue';
import { useForm, router } from '@inertiajs/vue3';
import { computed } from 'vue';

const props = defineProps({
  redirect: Object,
});

const isEdit = computed(() => !!props.redirect);

const form = useForm({
  source_url: props.redirect?.source_url || '',
  target_url: props.redirect?.target_url || '',
  http_code: props.redirect?.http_code ? String(props.redirect.http_code) : '301',
});

function submit() {
  if (isEdit.value) {
    form.put(`/admin/seo-redirects/${props.redirect.id}`);
  } else {
    form.post('/admin/seo-redirects');
  }
}

function cancel() {
  router.get('/admin/seo-redirects');
}
</script>
