<template>
  <CrmLayout :title="isEdit ? 'Sửa Banner Slider' : 'Thêm Banner Slider mới'">
    <div class="bg-white p-8 rounded-xl border border-gray-150 shadow-xs max-w-3xl">
      <form @submit.prevent="submit" class="space-y-6">
        
        <!-- Image Upload -->
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-1">Ảnh banner Slider *</label>
          <div class="space-y-3">
            <div v-if="imagePreview || form.image" class="w-full h-48 rounded-lg overflow-hidden border border-gray-200 bg-gray-55 flex items-center justify-center relative group">
              <img :src="imagePreview || form.image" alt="Preview Image" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <a-button type="primary" class="bg-emerald-700 hover:bg-emerald-800 border-none" @click="triggerFileInput">Đổi ảnh (Tải lên)</a-button>
                <a-button type="primary" class="bg-sky-700 hover:bg-sky-800 border-none" @click="showMediaModal = true">Chọn từ thư viện</a-button>
                <a-button type="primary" danger @click="removeImage">Xóa</a-button>
              </div>
            </div>
            <div v-else class="w-full h-48 rounded-lg border-2 border-dashed border-gray-300 hover:border-emerald-600 transition-colors flex flex-col items-center justify-center gap-3 bg-gray-55">
              <picture-outlined class="text-3xl text-gray-400" />
              <div class="flex gap-4">
                <a-button type="dashed" @click="triggerFileInput" class="hover:border-emerald-600 hover:text-emerald-700">Tải ảnh lên</a-button>
                <a-button type="dashed" @click="showMediaModal = true" class="hover:border-emerald-600 hover:text-emerald-700">Chọn từ thư viện</a-button>
              </div>
              <span class="text-[10px] text-gray-400">Hỗ trợ JPG, PNG (tối đa 2MB)</span>
            </div>
            <input ref="fileInput" type="file" class="hidden" accept="image/*" @change="onFileChange" />
            <p v-if="form.errors.image_file" class="mt-1 text-xs text-red-650 font-semibold">{{ form.errors.image_file }}</p>
          </div>
        </div>

        <MediaSelectorModal
          :open="showMediaModal"
          @close="showMediaModal = false"
          @select="handleMediaSelect"
        />

        <!-- Order & Status (Side-by-side) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Order -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">Thứ tự hiển thị *</label>
            <a-input-number v-model:value="form.order" :min="0" class="w-full" size="large" />
            <p v-if="form.errors.order" class="mt-1 text-xs text-red-650 font-semibold">{{ form.errors.order }}</p>
          </div>
          <!-- Status -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Trạng thái kích hoạt</label>
            <a-switch v-model:checked="form.is_active" checked-children="Hiển thị" un-checked-children="Ẩn" />
            <p v-if="form.errors.is_active" class="mt-1 text-xs text-red-650 font-semibold">{{ form.errors.is_active }}</p>
          </div>
        </div>

        <!-- Target Link -->
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-1">Đường dẫn liên kết (Link) - Tùy chọn</label>
          <a-input v-model:value="form.link" placeholder="Ví dụ: /nguyen-lieu-thuc-pham hoặc URL ngoài..." size="large" />
          <p v-if="form.errors.link" class="mt-1 text-xs text-red-650 font-semibold">{{ form.errors.link }}</p>
        </div>

        <!-- Tabs for Bilingual Inputs -->
        <a-tabs default-active-key="vi" class="mb-6">
          <!-- VIETNAMESE TAB -->
          <a-tab-pane key="vi" tab="Tiếng Việt">
            <div class="space-y-6 mt-4">
              <!-- Title VI -->
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Tiêu đề Banner (VI) *</label>
                <a-input v-model:value="form.title.vi" placeholder="Ví dụ: Nguyên liệu Thực phẩm chất lượng cao" size="large" />
                <p v-if="form.errors['title.vi']" class="mt-1 text-xs text-red-650 font-semibold">{{ form.errors['title.vi'] }}</p>
              </div>
            </div>
          </a-tab-pane>

          <!-- ENGLISH TAB -->
          <a-tab-pane key="en" tab="Tiếng Anh (English)">
            <div class="space-y-6 mt-4">
              <!-- Title EN -->
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Tiêu đề Banner (EN) *</label>
                <a-input v-model:value="form.title.en" placeholder="Ví dụ: Premium Food Ingredients" size="large" />
                <p v-if="form.errors['title.en']" class="mt-1 text-xs text-red-650 font-semibold">{{ form.errors['title.en'] }}</p>
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
            {{ isEdit ? 'Cập nhật Banner' : 'Lưu Banner' }}
          </a-button>
        </div>

      </form>
    </div>
  </CrmLayout>
</template>

<script setup>
import CrmLayout from '@/Layouts/CrmLayout.vue';
import MediaSelectorModal from '@/Components/MediaSelectorModal.vue';
import { PictureOutlined } from '@ant-design/icons-vue';
import { useForm, router } from '@inertiajs/vue3';
import { computed, ref } from 'vue';

const props = defineProps({
  banner: Object,
});

const isEdit = computed(() => !!props.banner);
const fileInput = ref(null);
const imagePreview = ref(null);
const showMediaModal = ref(false);

const form = useForm({
  title: {
    vi: props.banner?.title?.vi || '',
    en: props.banner?.title?.en || '',
  },
  image: props.banner?.image || '',
  image_file: null,
  link: props.banner?.link || '',
  order: props.banner?.order ?? 0,
  is_active: props.banner?.is_active ?? true,
});

function triggerFileInput() {
  if (fileInput.value) {
    fileInput.value.click();
  }
}

function onFileChange(e) {
  const file = e.target.files[0];
  if (file) {
    form.image_file = file;
    const reader = new FileReader();
    reader.onload = (event) => {
      imagePreview.value = event.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function removeImage() {
  form.image_file = null;
  form.image = '';
  imagePreview.value = null;
  if (fileInput.value) {
    fileInput.value.value = '';
  }
}

function handleMediaSelect(file) {
  form.image = '/storage/' + file.file_path;
  form.image_file = null;
  imagePreview.value = null;
  showMediaModal.value = false;
}

function submit() {
  if (isEdit.value) {
    form.post(`/admin/banners/${props.banner.id}`, {
      forceFormData: true,
    });
  } else {
    form.post('/admin/banners', {
      forceFormData: true,
    });
  }
}

function cancel() {
  router.get('/admin/banners');
}
</script>
