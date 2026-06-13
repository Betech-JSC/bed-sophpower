<template>
  <CrmLayout :title="isEdit ? 'Sửa câu hỏi FAQ' : 'Thêm câu hỏi FAQ mới'">
    <div class="bg-white p-8 rounded-xl border border-gray-150 shadow-xs max-w-3xl">
      <form @submit.prevent="submit" class="space-y-6">
        
        <!-- Category & Order (Common fields) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-gray-100">
          <!-- Order -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">Thứ tự hiển thị *</label>
            <a-input-number v-model:value="form.order" :min="0" class="w-full" size="large" />
            <p v-if="form.errors.order" class="mt-1 text-xs text-red-650 font-semibold">{{ form.errors.order }}</p>
          </div>
        </div>

        <!-- Tabs for Bilingual Inputs -->
        <a-tabs default-active-key="vi" class="mb-6">
          <!-- VIETNAMESE TAB -->
          <a-tab-pane key="vi" tab="Tiếng Việt">
            <div class="space-y-6 mt-4">
              <!-- Category VI -->
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Nhóm danh mục (VI) *</label>
                <a-input v-model:value="form.category.vi" placeholder="Ví dụ: Chứng nhận sản phẩm, Giao hàng & Thanh toán..." required size="large" />
                <p v-if="form.errors['category.vi']" class="mt-1 text-xs text-red-650 font-semibold">{{ form.errors['category.vi'] }}</p>
              </div>

              <!-- Question VI -->
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Câu hỏi (VI) *</label>
                <a-input v-model:value="form.question.vi" placeholder="Nhập câu hỏi bằng Tiếng Việt..." required size="large" />
                <p v-if="form.errors['question.vi']" class="mt-1 text-xs text-red-650 font-semibold">{{ form.errors['question.vi'] }}</p>
              </div>

              <!-- Answer VI -->
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Câu trả lời (VI) *</label>
                <a-textarea v-model:value="form.answer.vi" placeholder="Nhập câu trả lời chi tiết bằng Tiếng Việt..." :rows="6" required size="large" />
                <p v-if="form.errors['answer.vi']" class="mt-1 text-xs text-red-650 font-semibold">{{ form.errors['answer.vi'] }}</p>
              </div>
            </div>
          </a-tab-pane>

          <!-- ENGLISH TAB -->
          <a-tab-pane key="en" tab="Tiếng Anh (English)">
            <div class="space-y-6 mt-4">
              <!-- Category EN -->
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Nhóm danh mục (EN) *</label>
                <a-input v-model:value="form.category.en" placeholder="Ví dụ: Certifications, Shipping & Payment..." required size="large" />
                <p v-if="form.errors['category.en']" class="mt-1 text-xs text-red-650 font-semibold">{{ form.errors['category.en'] }}</p>
              </div>

              <!-- Question EN -->
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Câu hỏi (EN) *</label>
                <a-input v-model:value="form.question.en" placeholder="Nhập câu hỏi bằng Tiếng Anh..." required size="large" />
                <p v-if="form.errors['question.en']" class="mt-1 text-xs text-red-650 font-semibold">{{ form.errors['question.en'] }}</p>
              </div>

              <!-- Answer EN -->
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Câu trả lời (EN) *</label>
                <a-textarea v-model:value="form.answer.en" placeholder="Nhập câu trả lời chi tiết bằng Tiếng Anh..." :rows="6" required size="large" />
                <p v-if="form.errors['answer.en']" class="mt-1 text-xs text-red-650 font-semibold">{{ form.errors['answer.en'] }}</p>
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
            {{ isEdit ? 'Cập nhật FAQ' : 'Lưu FAQ' }}
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
  faq: Object,
});

const isEdit = computed(() => !!props.faq);

const form = useForm({
  question: {
    vi: props.faq?.question?.vi || '',
    en: props.faq?.question?.en || '',
  },
  answer: {
    vi: props.faq?.answer?.vi || '',
    en: props.faq?.answer?.en || '',
  },
  category: {
    vi: props.faq?.category?.vi || '',
    en: props.faq?.category?.en || '',
  },
  order: props.faq?.order ?? 0,
});

function submit() {
  if (isEdit.value) {
    form.put(`/admin/faqs/${props.faq.id}`);
  } else {
    form.post('/admin/faqs');
  }
}

function cancel() {
  router.get('/admin/faqs');
}
</script>
