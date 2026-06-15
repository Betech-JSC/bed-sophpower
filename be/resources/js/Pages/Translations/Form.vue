<template>
  <CrmLayout title="Chỉnh sửa nhãn dịch">
    <div class="bg-white p-8 rounded-xl border border-gray-150 shadow-xs max-w-3xl">
      <form @submit.prevent="submit" class="space-y-6">
        
        <!-- Key details (Readonly) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-gray-100">
          <div>
            <label class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Nhóm (Group)</label>
            <div class="text-sm font-semibold text-gray-800">
              <a-tag color="success" class="text-xs font-bold uppercase tracking-wider px-2 py-0.5 border-none bg-emerald-50 text-emerald-800">
                {{ translation.group }}
              </a-tag>
            </div>
          </div>
          <div>
            <label class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Từ khóa (Key)</label>
            <div class="text-sm font-semibold text-gray-800">
              <code class="text-xs text-indigo-700 font-mono font-semibold bg-indigo-50/50 px-1.5 py-0.5 rounded border border-indigo-100">
                {{ translation.key }}
              </code>
            </div>
          </div>
        </div>

        <!-- Language Translation Tabs -->
        <a-tabs default-active-key="vi" class="mb-6">
          <!-- VIETNAMESE TAB -->
          <a-tab-pane key="vi" tab="Tiếng Việt (VI) *">
            <div class="space-y-4 mt-4">
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Nội dung dịch (Tiếng Việt) *</label>
                <a-textarea 
                  v-model:value="form.text.vi" 
                  placeholder="Nhập nội dung dịch Tiếng Việt..." 
                  :rows="5" 
                  size="large" 
                />
                <p v-if="form.errors['text.vi']" class="mt-1 text-xs text-red-650 font-semibold">{{ form.errors['text.vi'] }}</p>
              </div>
            </div>
          </a-tab-pane>

          <!-- ENGLISH TAB -->
          <a-tab-pane key="en" tab="Tiếng Anh (EN)">
            <div class="space-y-4 mt-4">
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Nội dung dịch (Tiếng Anh)</label>
                <a-textarea 
                  v-model:value="form.text.en" 
                  placeholder="Nhập nội dung dịch Tiếng Anh..." 
                  :rows="5" 
                  size="large" 
                />
                <p v-if="form.errors['text.en']" class="mt-1 text-xs text-red-650 font-semibold">{{ form.errors['text.en'] }}</p>
              </div>
            </div>
          </a-tab-pane>

          <!-- CHINESE TAB -->
          <a-tab-pane key="zh" tab="Tiếng Trung (ZH)">
            <div class="space-y-4 mt-4">
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Nội dung dịch (Tiếng Trung)</label>
                <a-textarea 
                  v-model:value="form.text.zh" 
                  placeholder="Nhập nội dung dịch Tiếng Trung..." 
                  :rows="5" 
                  size="large" 
                />
                <p v-if="form.errors['text.zh']" class="mt-1 text-xs text-red-650 font-semibold">{{ form.errors['text.zh'] }}</p>
              </div>
            </div>
          </a-tab-pane>

          <!-- JAPANESE TAB -->
          <a-tab-pane key="ja" tab="Tiếng Nhật (JA)">
            <div class="space-y-4 mt-4">
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Nội dung dịch (Tiếng Nhật)</label>
                <a-textarea 
                  v-model:value="form.text.ja" 
                  placeholder="Nhập nội dung dịch Tiếng Nhật..." 
                  :rows="5" 
                  size="large" 
                />
                <p v-if="form.errors['text.ja']" class="mt-1 text-xs text-red-650 font-semibold">{{ form.errors['text.ja'] }}</p>
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
            Cập nhật bản dịch
          </a-button>
        </div>

      </form>
    </div>
  </CrmLayout>
</template>

<script setup>
import CrmLayout from '@/Layouts/CrmLayout.vue';
import { useForm } from '@inertiajs/vue3';
import { router } from '@inertiajs/vue3';

const props = defineProps({
  translation: Object,
});

const form = useForm({
  text: {
    vi: props.translation?.text?.vi || '',
    en: props.translation?.text?.en || '',
    zh: props.translation?.text?.zh || '',
    ja: props.translation?.text?.ja || '',
  },
});

function submit() {
  form.put(`/admin/translations/${props.translation.id}`);
}

function cancel() {
  router.get('/admin/translations');
}
</script>
