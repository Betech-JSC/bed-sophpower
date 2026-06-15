<template>
  <CrmLayout :title="isEdit ? 'Sửa trang tĩnh' : 'Thêm trang tĩnh mới'">
    <div class="bg-white p-8 rounded-xl border border-gray-150 shadow-xs max-w-4xl">
      <form @submit.prevent="submit" class="space-y-6">
        
        <!-- Slug -->
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-1">Đường dẫn tĩnh (Slug) *</label>
          <a-input v-model:value="form.slug" placeholder="Ví dụ: ve-chung-toi, dieu-khoan-su-dung" size="large" :disabled="isEdit" />
          <p class="text-xs text-gray-400 mt-1">Định danh duy nhất viết liền không dấu, ngăn cách bằng dấu gạch ngang.</p>
          <p v-if="form.errors.slug" class="mt-1 text-xs text-red-650 font-semibold">{{ form.errors.slug }}</p>
        </div>

        <!-- Tabs for Bilingual Inputs -->
        <a-tabs default-active-key="vi" class="mb-6">
          <!-- VIETNAMESE TAB -->
          <a-tab-pane key="vi" tab="Tiếng Việt">
            <div class="space-y-6 mt-4">
              <!-- Title VI -->
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Tiêu đề (VI) *</label>
                <a-input v-model:value="form.title.vi" placeholder="Nhập tiêu đề trang bằng Tiếng Việt..." size="large" />
                <p v-if="form.errors['title.vi']" class="mt-1 text-xs text-red-650 font-semibold">{{ form.errors['title.vi'] }}</p>
              </div>

              <!-- Content VI -->
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Nội dung trang (VI) *</label>
                <RichTextEditor v-model:value="form.content.vi" placeholder="Nhập nội dung chi tiết bằng Tiếng Việt..." />
                <p v-if="form.errors['content.vi']" class="mt-1 text-xs text-red-650 font-semibold">{{ form.errors['content.vi'] }}</p>
              </div>
            </div>
          </a-tab-pane>

          <!-- ENGLISH TAB -->
          <a-tab-pane key="en" tab="Tiếng Anh (English)">
            <div class="space-y-6 mt-4">
              <!-- Title EN -->
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Tiêu đề (EN) *</label>
                <a-input v-model:value="form.title.en" placeholder="Nhập tiêu đề trang bằng Tiếng Anh..." size="large" />
                <p v-if="form.errors['title.en']" class="mt-1 text-xs text-red-650 font-semibold">{{ form.errors['title.en'] }}</p>
              </div>

              <!-- Content EN -->
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Nội dung trang (EN) *</label>
                <RichTextEditor v-model:value="form.content.en" placeholder="Nhập nội dung chi tiết bằng Tiếng Anh..." />
                <p v-if="form.errors['content.en']" class="mt-1 text-xs text-red-650 font-semibold">{{ form.errors['content.en'] }}</p>
              </div>
            </div>
          </a-tab-pane>
        </a-tabs>

        <!-- SEO Overrides -->
        <div class="border-t border-gray-150 pt-6">
          <label class="block text-sm font-bold text-gray-700 mb-2">Cấu hình SEO nâng cao (SEO Overrides)</label>
          <p class="text-xs text-gray-400 mb-4">Để trống nếu bạn muốn tự động lấy theo Tiêu đề trang và Nội dung trang.</p>
          
          <a-tabs default-active-key="seo_vi" type="card">
            <!-- SEO VI -->
            <a-tab-pane key="seo_vi" tab="SEO Tiếng Việt">
              <div class="space-y-4 mt-3">
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Thẻ tiêu đề SEO (VI)</label>
                  <a-input v-model:value="form.seo_title.vi" placeholder="Mặc định lấy theo tiêu đề trang..." size="large" />
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Thẻ mô tả SEO (VI)</label>
                  <a-textarea v-model:value="form.seo_desc.vi" placeholder="Mặc định lấy theo nội dung trang..." :rows="3" size="large" />
                </div>
              </div>
            </a-tab-pane>

            <!-- SEO EN -->
            <a-tab-pane key="seo_en" tab="SEO Tiếng Anh">
              <div class="space-y-4 mt-3">
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Thẻ tiêu đề SEO (EN)</label>
                  <a-input v-model:value="form.seo_title.en" placeholder="Mặc định lấy theo tiêu đề trang..." size="large" />
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Thẻ mô tả SEO (EN)</label>
                  <a-textarea v-model:value="form.seo_desc.en" placeholder="Mặc định lấy theo nội dung trang..." :rows="3" size="large" />
                </div>
              </div>
            </a-tab-pane>
          </a-tabs>
        </div>

        <!-- Form Actions -->
        <div class="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
          <a-button size="large" @click="cancel">
            Hủy bỏ
          </a-button>
          <a-button type="primary" html-type="submit" size="large" class="bg-emerald-700 hover:bg-emerald-800 border-none font-bold" :loading="form.processing">
            {{ isEdit ? 'Cập nhật trang' : 'Lưu trang tĩnh' }}
          </a-button>
        </div>

      </form>
    </div>
  </CrmLayout>
</template>

<script setup>
import CrmLayout from '@/Layouts/CrmLayout.vue';
import RichTextEditor from '@/Components/RichTextEditor.vue';
import { useForm, router } from '@inertiajs/vue3';
import { computed } from 'vue';

const props = defineProps({
  page: Object,
});

const isEdit = computed(() => !!props.page);

const form = useForm({
  slug: props.page?.slug || '',
  title: {
    vi: props.page?.title?.vi || '',
    en: props.page?.title?.en || '',
  },
  content: {
    vi: props.page?.content?.vi || '',
    en: props.page?.content?.en || '',
  },
  seo_title: {
    vi: props.page?.seo_title?.vi || '',
    en: props.page?.seo_title?.en || '',
  },
  seo_desc: {
    vi: props.page?.seo_desc?.vi || '',
    en: props.page?.seo_desc?.en || '',
  },
});

function submit() {
  if (isEdit.value) {
    form.put(`/admin/pages/${props.page.id}`);
  } else {
    form.post('/admin/pages');
  }
}

function cancel() {
  router.get('/admin/pages');
}
</script>
