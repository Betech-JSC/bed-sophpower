<template>
  <CrmLayout :title="isEdit ? 'Sửa danh mục bài viết' : 'Thêm danh mục bài viết mới'">
    <div class="bg-white p-8 rounded-xl border border-gray-150 shadow-xs max-w-3xl">
      <form @submit.prevent="submit" class="space-y-6">
        
        <!-- Common fields -->
        <div class="pb-6 border-b border-gray-100">
          <!-- Slug override -->
          <div class="max-w-md">
            <label class="block text-sm font-bold text-gray-700 mb-1">Đường dẫn thân thiện (Slug)</label>
            <a-input v-model:value="form.slug" placeholder="Để trống để tự động tạo từ tên Tiếng Việt..." size="large" />
            <p v-if="form.errors.slug" class="mt-1 text-xs text-red-650 font-semibold">{{ form.errors.slug }}</p>
          </div>
        </div>

        <!-- Tabs for Bilingual Inputs -->
        <a-tabs default-active-key="vi" class="mb-6">
          <!-- VIETNAMESE TAB -->
          <a-tab-pane key="vi" tab="Tiếng Việt">
            <div class="space-y-6 mt-4">
              <!-- Name VI -->
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Tên danh mục (VI) *</label>
                <a-input v-model:value="form.name.vi" placeholder="Nhập tên danh mục bằng Tiếng Việt..." size="large" />
                <p v-if="form.errors['name.vi']" class="mt-1 text-xs text-red-650 font-semibold">{{ form.errors['name.vi'] }}</p>
              </div>
            </div>
          </a-tab-pane>

          <!-- ENGLISH TAB -->
          <a-tab-pane key="en" tab="Tiếng Anh (English)">
            <div class="space-y-6 mt-4">
              <!-- Name EN -->
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Tên danh mục (EN)</label>
                <a-input v-model:value="form.name.en" placeholder="Nhập tên danh mục bằng Tiếng Anh (không bắt buộc)..." size="large" />
                <p v-if="form.errors['name.en']" class="mt-1 text-xs text-red-650 font-semibold">{{ form.errors['name.en'] }}</p>
              </div>
            </div>
          </a-tab-pane>
        </a-tabs>

        <!-- Form Actions -->
        <div class="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
          <a-button size="large" @click="cancel">
            Hủy bỏ
          </a-button>
          <a-button type="primary" html-type="submit" size="large" class="bg-emerald-700 hover:bg-emerald-800 border-none font-bold" :loading="form.processing">
            {{ isEdit ? 'Cập nhật danh mục' : 'Lưu danh mục' }}
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
import { router } from '@inertiajs/vue3';

const props = defineProps({
  category: Object,
});

const isEdit = computed(() => !!props.category);

const form = useForm({
  name: {
    vi: props.category?.name?.vi || '',
    en: props.category?.name?.en || '',
  },
  slug: props.category?.slug || '',
});

function submit() {
  if (isEdit.value) {
    form.put(`/admin/article-categories/${props.category.id}`);
  } else {
    form.post('/admin/article-categories');
  }
}

function cancel() {
  router.get('/admin/article-categories');
}
</script>
