<template>
  <CrmLayout :title="isEdit ? 'Sửa bài viết' : 'Viết bài viết mới'">
    <div class="bg-white p-8 rounded-xl border border-gray-150 shadow-xs max-w-4xl">
      <form @submit.prevent="submit" class="space-y-6">
        
        <!-- Common Fields (Author, Date, Category) -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-gray-100 pb-6">
          <!-- Author -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">Tác giả *</label>
            <a-input v-model:value="form.author" placeholder="Ví dụ: Sophpower R&D" size="large" />
            <p v-if="form.errors.author" class="mt-1 text-xs text-red-650 font-semibold">{{ form.errors.author }}</p>
          </div>

          <!-- Date -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">Ngày xuất bản *</label>
            <a-input v-model:value="form.date" type="date" size="large" />
            <p v-if="form.errors.date" class="mt-1 text-xs text-red-650 font-semibold">{{ form.errors.date }}</p>
          </div>

          <!-- Category -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">Danh mục bài viết *</label>
            <a-select
              v-model:value="form.article_category_id"
              placeholder="Chọn danh mục..."
              class="w-full"
              size="large"
              show-search
              option-filter-prop="label"
            >
              <a-select-option
                v-for="cat in categories"
                :key="cat.id"
                :value="cat.id"
                :label="cat.name?.vi"
              >
                {{ cat.name?.vi }} ({{ cat.name?.en }})
              </a-select-option>
            </a-select>
            <p v-if="form.errors.article_category_id" class="mt-1 text-xs text-red-655 font-semibold">{{ form.errors.article_category_id }}</p>
          </div>
        </div>

        <!-- Custom Slug -->
        <div class="border-b border-gray-100 pb-6">
          <label class="block text-sm font-bold text-gray-700 mb-1">Đường dẫn thân thiện (Custom URL Slug)</label>
          <a-input v-model:value="form.slug" placeholder="Ví dụ: tin-tuc-san-pham-moi (Mặc định tự sinh từ Tiêu đề tiếng Việt)" size="large" />
          <p v-if="form.errors.slug" class="mt-1 text-xs text-red-655 font-semibold">{{ form.errors.slug }}</p>
        </div>

        <!-- Tabs for Bilingual Inputs -->
        <a-tabs default-active-key="vi" class="mb-6">
          <!-- VIETNAMESE TAB -->
          <a-tab-pane key="vi" tab="Tiếng Việt">
            <div class="space-y-6 mt-4">
              <!-- Title VI -->
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Tiêu đề bài viết (VI) *</label>
                <a-input v-model:value="form.title.vi" placeholder="Nhập tiêu đề tin tức bằng tiếng Việt..." size="large" />
                <p v-if="form.errors['title.vi']" class="mt-1 text-xs text-red-650 font-semibold">{{ form.errors['title.vi'] }}</p>
              </div>



              <!-- Summary VI -->
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Tóm tắt ngắn (VI) *</label>
                <RichTextEditor v-model:value="form.summary.vi" placeholder="Nhập tóm tắt bài viết bằng tiếng Việt..." />
                <p v-if="form.errors['summary.vi']" class="mt-1 text-xs text-red-655 font-semibold">{{ form.errors['summary.vi'] }}</p>
              </div>

              <!-- Content VI -->
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Nội dung chi tiết (VI) *</label>
                <RichTextEditor v-model:value="form.content.vi" placeholder="Nhập nội dung bài viết bằng tiếng Việt..." />
                <p v-if="form.errors['content.vi']" class="mt-1 text-xs text-red-655 font-semibold">{{ form.errors['content.vi'] }}</p>
              </div>
            </div>
          </a-tab-pane>

          <!-- ENGLISH TAB -->
          <a-tab-pane key="en" tab="Tiếng Anh (English)">
            <div class="space-y-6 mt-4">
              <!-- Title EN -->
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Tiêu đề bài viết (EN) *</label>
                <a-input v-model:value="form.title.en" placeholder="Enter news title in English..." size="large" />
                <p v-if="form.errors['title.en']" class="mt-1 text-xs text-red-650 font-semibold">{{ form.errors['title.en'] }}</p>
              </div>



              <!-- Summary EN -->
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Tóm tắt ngắn (EN) *</label>
                <RichTextEditor v-model:value="form.summary.en" placeholder="Enter short summary in English..." />
                <p v-if="form.errors['summary.en']" class="mt-1 text-xs text-red-655 font-semibold">{{ form.errors['summary.en'] }}</p>
              </div>

              <!-- Content EN -->
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Nội dung chi tiết (EN) *</label>
                <RichTextEditor v-model:value="form.content.en" placeholder="Enter detailed content in English..." />
                <p v-if="form.errors['content.en']" class="mt-1 text-xs text-red-655 font-semibold">{{ form.errors['content.en'] }}</p>
              </div>
            </div>
          </a-tab-pane>
        </a-tabs>

        <!-- SEO Overrides -->
        <div class="border-t border-gray-150 pt-6">
          <div class="border border-gray-200 rounded-xl p-5 bg-gray-50/50 shadow-2xs">
            <div class="flex items-center justify-between cursor-pointer select-none" @click="showAdvancedSeo = !showAdvancedSeo">
              <div class="flex flex-col">
                <span class="text-sm font-bold text-gray-800 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Cấu hình SEO Nâng cao (SEO Overrides)
                </span>
                <span class="text-[11px] text-gray-400 mt-0.5">Tùy chỉnh từ khóa, robots, canonical URL và ảnh chia sẻ mạng xã hội</span>
              </div>
              <span class="text-gray-500 transition-transform duration-250" :class="{ 'rotate-180': showAdvancedSeo }">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
              </span>
            </div>

            <div v-show="showAdvancedSeo" class="mt-5 pt-5 border-t border-gray-200/80 space-y-6">
              <a-tabs default-active-key="seo_vi" type="card">
                <!-- SEO VI -->
                <a-tab-pane key="seo_vi" tab="SEO Tiếng Việt">
                  <div class="space-y-4 mt-3">
                    <div>
                      <label class="block text-xs font-bold text-gray-700 mb-1">Thẻ tiêu đề SEO (VI)</label>
                      <a-input v-model:value="form.seo_title.vi" placeholder="Mặc định lấy theo tiêu đề bài viết..." size="large" />
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-gray-700 mb-1">Thẻ mô tả SEO (VI)</label>
                      <a-textarea v-model:value="form.seo_desc.vi" placeholder="Mặc định lấy theo tóm tắt bài viết..." :rows="3" size="large" />
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-gray-700 mb-1">Từ khóa SEO (Keywords - VI)</label>
                      <a-input v-model:value="form.seo_keywords.vi" placeholder="Ví dụ: tin tức sophpower, nguyen lieu my pham, công nghệ mới (phân cách bằng dấu phẩy)" size="large" />
                    </div>
                  </div>
                </a-tab-pane>

                <!-- SEO EN -->
                <a-tab-pane key="seo_en" tab="SEO Tiếng Anh">
                  <div class="space-y-4 mt-3">
                    <div>
                      <label class="block text-xs font-bold text-gray-700 mb-1">Thẻ tiêu đề SEO (EN)</label>
                      <a-input v-model:value="form.seo_title.en" placeholder="Mặc định lấy theo tiêu đề bài viết..." size="large" />
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-gray-700 mb-1">Thẻ mô tả SEO (EN)</label>
                      <a-textarea v-model:value="form.seo_desc.en" placeholder="Mặc định lấy theo tóm tắt bài viết..." :rows="3" size="large" />
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-gray-700 mb-1">Từ khóa SEO (Keywords - EN)</label>
                      <a-input v-model:value="form.seo_keywords.en" placeholder="e.g., sophpower news, cosmetic ingredients, new technology (separated by commas)" size="large" />
                    </div>
                  </div>
                </a-tab-pane>
              </a-tabs>

              <!-- Common SEO Settings -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Thẻ Meta Robots (Robots Tag)</label>
                  <a-select v-model:value="form.meta_robots" class="w-full" size="large">
                    <a-select-option value="">Mặc định (index, follow)</a-select-option>
                    <a-select-option value="index, follow">index, follow</a-select-option>
                    <a-select-option value="noindex, follow">noindex, follow</a-select-option>
                    <a-select-option value="noindex, nofollow">noindex, nofollow</a-select-option>
                  </a-select>
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Canonical URL (Đường dẫn chuẩn hóa)</label>
                  <a-input v-model:value="form.canonical_url" placeholder="Mặc định tự sinh theo liên kết trang..." size="large" />
                </div>
              </div>

              <!-- OG Image Settings -->
              <div class="pt-2">
                <label class="block text-xs font-bold text-gray-700 mb-1">Ảnh Open Graph tùy chỉnh (og:image)</label>
                <p class="text-[11px] text-gray-400 mb-3">Tải ảnh lên để thay thế ảnh bài viết mặc định khi chia sẻ liên kết này lên mạng xã hội.</p>
                <div class="flex items-start gap-4">
                  <!-- Upload Box -->
                  <div class="relative w-24 h-24 border-2 border-dashed border-gray-300 hover:border-emerald-500 rounded-lg overflow-hidden flex flex-col items-center justify-center bg-gray-55 text-gray-500 cursor-pointer transition-colors">
                    <input
                      type="file"
                      ref="ogFileInput"
                      class="absolute inset-0 opacity-0 cursor-pointer"
                      accept="image/*"
                      @change="handleOgImageChange"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span class="text-[10px] font-semibold mt-1">Tải ảnh lên</span>
                  </div>

                  <!-- Library Select Box -->
                  <div @click="showOgMediaModal = true" class="w-24 h-24 border-2 border-dashed border-gray-300 hover:border-emerald-500 rounded-lg overflow-hidden flex flex-col items-center justify-center bg-gray-55 text-gray-500 cursor-pointer transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span class="text-[10px] font-semibold mt-1">Từ thư viện</span>
                  </div>

                  <!-- Preview OG Image -->
                  <div v-if="ogImagePreview || form.og_image" class="w-24 h-24 rounded-lg border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center relative group shadow-2xs">
                    <img :src="ogImagePreview || form.og_image" alt="OG Preview" class="w-full h-full object-cover" />
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <button type="button" @click="removeOgImage" class="p-1 rounded-full bg-white text-red-650 hover:bg-red-50 transition-colors shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <p class="text-[10px] text-gray-400 mt-2">Định dạng hỗ trợ: JPG, PNG, WEBP. Tỷ lệ khuyên dùng 1200x630. Dung lượng tối đa: 2MB.</p>
                <p v-if="form.errors.og_image_file" class="mt-1 text-xs text-red-655 font-semibold">{{ form.errors.og_image_file }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Image Upload (Common Field) -->
        <div class="border-t border-gray-150 pt-6">
          <label class="block text-sm font-bold text-gray-700 mb-1">Hình ảnh bìa</label>
          <div class="flex items-start gap-4">
            <!-- Upload Box -->
            <div class="relative w-40 h-28 border-2 border-dashed border-gray-300 hover:border-emerald-500 rounded-lg overflow-hidden flex flex-col items-center justify-center bg-gray-55 text-gray-500 cursor-pointer">
              <input
                type="file"
                ref="fileInput"
                class="absolute inset-0 opacity-0 cursor-pointer"
                accept="image/*"
                @change="handleImageChange"
              />
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              <span class="text-xs font-semibold mt-1">Tải ảnh lên</span>
            </div>

            <!-- Library Select Box -->
            <div @click="showMediaModal = true" class="w-40 h-28 border-2 border-dashed border-gray-300 hover:border-emerald-500 rounded-lg overflow-hidden flex flex-col items-center justify-center bg-gray-55 text-gray-500 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span class="text-xs font-semibold mt-1">Chọn từ thư viện</span>
            </div>

            <!-- Preview Image -->
            <div v-if="imagePreview || form.image" class="w-40 h-28 rounded-lg border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center relative group">
              <img :src="imagePreview || form.image" alt="Preview" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <button type="button" @click="removeImage" class="p-1.5 rounded-full bg-white text-red-650 hover:bg-red-50 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <p class="text-xs text-gray-400 mt-2">Kích thước khuyên dùng: 800x600 px. Dung lượng tối đa: 2MB.</p>
          <p v-if="form.errors.image_file" class="mt-1 text-xs text-red-655 font-semibold">{{ form.errors.image_file }}</p>
        </div>

        <MediaSelectorModal
          :open="showMediaModal"
          @close="showMediaModal = false"
          @select="handleMediaSelect"
        />

        <MediaSelectorModal
          :open="showOgMediaModal"
          @close="showOgMediaModal = false"
          @select="handleOgMediaSelect"
        />

        <!-- Buttons -->
        <div class="flex items-center gap-3 border-t border-gray-150 pt-6">
          <a-button size="large" class="rounded-lg font-bold" @click="goBack">Hủy bỏ</a-button>
          <a-button type="primary" size="large" class="bg-emerald-700 hover:bg-emerald-800 border-none font-bold rounded-lg" :loading="form.processing" html-type="submit">
            {{ isEdit ? 'Cập nhật bài viết' : 'Đăng bài viết' }}
          </a-button>
        </div>
      </form>
    </div>
  </CrmLayout>
</template>

<script setup>
import CrmLayout from '@/Layouts/CrmLayout.vue';
import RichTextEditor from '@/Components/RichTextEditor.vue';
import MediaSelectorModal from '@/Components/MediaSelectorModal.vue';
import { useForm } from '@inertiajs/vue3';
import { computed, ref } from 'vue';

const props = defineProps({
  article: Object,
  categories: Array,
});

const isEdit = computed(() => !!props.article);
const fileInput = ref(null);
const imagePreview = ref(null);
const showMediaModal = ref(false);

const showAdvancedSeo = ref(false);
const showOgMediaModal = ref(false);
const ogFileInput = ref(null);
const ogImagePreview = ref(null);

// Format date to YYYY-MM-DD for input type="date"
const formattedDate = computed(() => {
  if (!props.article?.date) return '';
  const d = new Date(props.article.date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
});

const form = useForm({
  title: {
    vi: props.article?.title?.vi || (typeof props.article?.title === 'string' ? props.article.title : ''),
    en: props.article?.title?.en || '',
  },
  slug: props.article?.slug || '',
  summary: {
    vi: props.article?.summary?.vi || (typeof props.article?.summary === 'string' ? props.article.summary : ''),
    en: props.article?.summary?.en || '',
  },
  content: {
    vi: props.article?.content?.vi || (typeof props.article?.content === 'string' ? props.article.content : ''),
    en: props.article?.content?.en || '',
  },
  date: formattedDate.value || '',
  image: props.article?.image || '',
  image_file: null,
  article_category_id: props.article?.article_category_id || null,
  author: props.article?.author || '',
  seo_title: {
    vi: props.article?.seo_title?.vi || '',
    en: props.article?.seo_title?.en || '',
  },
  seo_desc: {
    vi: props.article?.seo_desc?.vi || '',
    en: props.article?.seo_desc?.en || '',
  },
  seo_keywords: {
    vi: props.article?.seo_keywords?.vi || '',
    en: props.article?.seo_keywords?.en || '',
  },
  meta_robots: props.article?.meta_robots || '',
  canonical_url: props.article?.canonical_url || '',
  og_image: props.article?.og_image || '',
  og_image_file: null,
});

function handleImageChange(e) {
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

function handleOgImageChange(e) {
  const file = e.target.files[0];
  if (file) {
    form.og_image_file = file;
    const reader = new FileReader();
    reader.onload = (event) => {
      ogImagePreview.value = event.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function removeOgImage() {
  form.og_image_file = null;
  form.og_image = '';
  ogImagePreview.value = null;
  if (ogFileInput.value) {
    ogFileInput.value.value = '';
  }
}

function handleOgMediaSelect(file) {
  form.og_image = '/storage/' + file.file_path;
  form.og_image_file = null;
  ogImagePreview.value = null;
  showOgMediaModal.value = false;
}

function goBack() {
  window.history.back();
}

function submit() {
  if (isEdit.value) {
    form.post(`/admin/news/${props.article.id}`, {
      forceFormData: true,
    });
  } else {
    form.post('/admin/news');
  }
}
</script>
