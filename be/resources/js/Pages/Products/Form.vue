<template>
  <CrmLayout :title="isEdit ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'">
    <div class="bg-white p-8 rounded-xl border border-gray-150 shadow-xs max-w-4xl">
      <form @submit.prevent="submit" class="space-y-6">
        
        <!-- Product Category & Status (Common Fields) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-gray-100 pb-6">
          <!-- Product Category -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">Danh mục sản phẩm *</label>
            <a-select
              v-model:value="form.product_category_id"
              placeholder="Chọn danh mục sản phẩm..."
              class="w-full"
              size="large"
              show-search
              option-filter-prop="label"
            >
              <a-select-option
                v-for="cat in props.categories"
                :key="cat.id"
                :value="cat.id"
                :label="cat.name?.vi"
              >
                {{ cat.parent_id ? '└── ' : '🌐 ' }}{{ cat.name?.vi }} ({{ cat.name?.en }})
              </a-select-option>
            </a-select>
            <p v-if="form.errors.product_category_id" class="mt-1 text-xs text-red-655 font-semibold">{{ form.errors.product_category_id }}</p>
          </div>

          <!-- Status -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">Trạng thái sản phẩm *</label>
            <a-select
              v-model:value="form.status"
              placeholder="Chọn trạng thái..."
              class="w-full"
              size="large"
            >
              <a-select-option value="published">Đã xuất bản (Published)</a-select-option>
              <a-select-option value="draft">Bản nháp (Draft)</a-select-option>
            </a-select>
            <p v-if="form.errors.status" class="mt-1 text-xs text-red-650 font-semibold">{{ form.errors.status }}</p>
          </div>
        </div>

          <!-- Custom Slug -->
          <div class="pt-2">
            <label class="block text-sm font-bold text-gray-700 mb-1">Đường dẫn thân thiện (Custom URL Slug)</label>
            <a-input v-model:value="form.slug" placeholder="Ví dụ: tinh-chat-tra-xanh (Mặc định tự sinh từ Tên sản phẩm tiếng Việt)" size="large" />
            <p v-if="form.errors.slug" class="mt-1 text-xs text-red-655 font-semibold">{{ form.errors.slug }}</p>
          </div>

        <!-- Tabs for Bilingual Inputs -->
        <a-tabs default-active-key="vi" class="mb-6">
          <!-- VIETNAMESE TAB -->
          <a-tab-pane key="vi" tab="Tiếng Việt">
            <div class="space-y-6 mt-4">
              <div class="grid grid-cols-1 gap-6">
                <!-- Name VI -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-1">Tên sản phẩm (VI) *</label>
                  <a-input v-model:value="form.name.vi" placeholder="Ví dụ: Bột Beta-carotene" size="large" />
                  <p v-if="form.errors['name.vi']" class="mt-1 text-xs text-red-650 font-semibold">{{ form.errors['name.vi'] }}</p>
                </div>
              </div>

              <!-- Packaging VI -->
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Quy cách đóng gói (VI) *</label>
                <a-input v-model:value="form.packaging.vi" placeholder="Ví dụ: Thùng 20kg hoặc đóng gói theo yêu cầu" size="large" />
                <p v-if="form.errors['packaging.vi']" class="mt-1 text-xs text-red-650 font-semibold">{{ form.errors['packaging.vi'] }}</p>
              </div>

              <!-- Description VI -->
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Mô tả sản phẩm (VI) *</label>
                <RichTextEditor v-model:value="form.desc.vi" placeholder="Nhập mô tả sản phẩm..." />
                <p v-if="form.errors['desc.vi']" class="mt-1 text-xs text-red-650 font-semibold">{{ form.errors['desc.vi'] }}</p>
              </div>

              <!-- Specifications VI -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <label class="block text-sm font-bold text-gray-700">Thông số kỹ thuật (VI)</label>
                  <a-button type="dashed" size="small" class="flex items-center gap-1" @click="addSpec('vi')">
                    + Thêm thông số
                  </a-button>
                </div>
                <div class="space-y-2">
                  <div v-for="(spec, index) in form.specs.vi" :key="index" class="flex items-center gap-2">
                    <a-input v-model:value="form.specs.vi[index]" placeholder="Ví dụ: Hàm lượng: 10%" class="flex-1" />
                    <a-button type="link" danger class="p-0 font-bold" @click="removeSpec('vi', index)">Xóa</a-button>
                  </div>
                  <p v-if="form.specs.vi.length === 0" class="text-xs text-gray-400 italic">Chưa có thông số nào. Nhấn Thêm thông số để thiết lập.</p>
                </div>
              </div>

              <!-- Applications VI -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <label class="block text-sm font-bold text-gray-700">Ứng dụng thực tế (VI)</label>
                  <a-button type="dashed" size="small" class="flex items-center gap-1" @click="addApp('vi')">
                    + Thêm ứng dụng
                  </a-button>
                </div>
                <div class="space-y-2">
                  <div v-for="(app, index) in form.applications.vi" :key="index" class="flex items-center gap-2">
                    <a-input v-model:value="form.applications.vi[index]" placeholder="Ví dụ: Sản xuất nước quả, nước ngọt giải khát" class="flex-1" />
                    <a-button type="link" danger class="p-0 font-bold" @click="removeApp('vi', index)">Xóa</a-button>
                  </div>
                  <p v-if="form.applications.vi.length === 0" class="text-xs text-gray-400 italic">Chưa có ứng dụng nào. Nhấn Thêm ứng dụng để thiết lập.</p>
                </div>
              </div>
            </div>
          </a-tab-pane>

          <!-- ENGLISH TAB -->
          <a-tab-pane key="en" tab="Tiếng Anh (English)">
            <div class="flex justify-end mb-4">
              <a-button type="primary" size="small" class="bg-emerald-600 hover:bg-emerald-750 border-none font-bold rounded-md flex items-center gap-1.5 shadow-sm" :loading="translatingAll" @click="translateAllFields">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5c-.313 1.562-.977 3.062-1.92 4.414" /></svg>
                Dịch tất cả các trường (VI ➔ EN)
              </a-button>
            </div>

            <div class="space-y-6 mt-4">
              <div class="grid grid-cols-1 gap-6">
                <!-- Name EN -->
                <div>
                  <div class="flex items-center justify-between mb-1">
                    <label class="block text-sm font-bold text-gray-700">Tên sản phẩm (EN) *</label>
                    <a-button type="link" size="small" class="p-0 text-xs font-semibold text-emerald-600 hover:text-emerald-750 flex items-center gap-1" :loading="translatingFields['name']" @click="translateField('name')">
                      Dịch tự động
                    </a-button>
                  </div>
                  <a-input v-model:value="form.name.en" placeholder="Ví dụ: Beta-carotene Powder" size="large" />
                  <p v-if="form.errors['name.en']" class="mt-1 text-xs text-red-650 font-semibold">{{ form.errors['name.en'] }}</p>
                </div>
              </div>

              <!-- Packaging EN -->
              <div>
                <div class="flex items-center justify-between mb-1">
                  <label class="block text-sm font-bold text-gray-700">Quy cách đóng gói (EN) *</label>
                  <a-button type="link" size="small" class="p-0 text-xs font-semibold text-emerald-600 hover:text-emerald-750" :loading="translatingFields['packaging']" @click="translateField('packaging')">
                    Dịch tự động
                  </a-button>
                </div>
                <a-input v-model:value="form.packaging.en" placeholder="Ví dụ: 20kg drum or custom packaging" size="large" />
                <p v-if="form.errors['packaging.en']" class="mt-1 text-xs text-red-650 font-semibold">{{ form.errors['packaging.en'] }}</p>
              </div>

              <!-- Description EN -->
              <div>
                <div class="flex items-center justify-between mb-1">
                  <label class="block text-sm font-bold text-gray-700">Mô tả sản phẩm (EN) *</label>
                  <a-button type="link" size="small" class="p-0 text-xs font-semibold text-emerald-600 hover:text-emerald-750" :loading="translatingFields['desc']" @click="translateField('desc')">
                    Dịch tự động
                  </a-button>
                </div>
                <RichTextEditor v-model:value="form.desc.en" placeholder="Nhập mô tả sản phẩm bằng tiếng Anh..." />
                <p v-if="form.errors['desc.en']" class="mt-1 text-xs text-red-650 font-semibold">{{ form.errors['desc.en'] }}</p>
              </div>

              <!-- Specifications EN -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <label class="block text-sm font-bold text-gray-700">Thông số kỹ thuật (EN)</label>
                  <a-button type="dashed" size="small" class="flex items-center gap-1" @click="addSpec('en')">
                    + Thêm thông số (EN)
                  </a-button>
                </div>
                <div class="space-y-2">
                  <div v-for="(spec, index) in form.specs.en" :key="index" class="flex items-center gap-2">
                    <a-input v-model:value="form.specs.en[index]" placeholder="Ví dụ: Content: 10%" class="flex-1" />
                    <a-button type="link" size="small" class="p-0 text-xs font-semibold text-emerald-600 hover:text-emerald-750" :loading="translatingFields[`specs_${index}`]" @click="translateField('specs', index)">
                      Dịch
                    </a-button>
                    <a-button type="link" danger class="p-0 font-bold" @click="removeSpec('en', index)">Xóa</a-button>
                  </div>
                  <p v-if="form.specs.en.length === 0" class="text-xs text-gray-400 italic">Chưa có thông số nào. Nhấn Thêm thông số để thiết lập.</p>
                </div>
              </div>

              <!-- Applications EN -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <label class="block text-sm font-bold text-gray-700">Ứng dụng thực tế (EN)</label>
                  <a-button type="dashed" size="small" class="flex items-center gap-1" @click="addApp('en')">
                    + Thêm ứng dụng (EN)
                  </a-button>
                </div>
                <div class="space-y-2">
                  <div v-for="(app, index) in form.applications.en" :key="index" class="flex items-center gap-2">
                    <a-input v-model:value="form.applications.en[index]" placeholder="Ví dụ: Production of soft drinks" class="flex-1" />
                    <a-button type="link" size="small" class="p-0 text-xs font-semibold text-emerald-600 hover:text-emerald-750" :loading="translatingFields[`applications_${index}`]" @click="translateField('applications', index)">
                      Dịch
                    </a-button>
                    <a-button type="link" danger class="p-0 font-bold" @click="removeApp('en', index)">Xóa</a-button>
                  </div>
                  <p v-if="form.applications.en.length === 0" class="text-xs text-gray-400 italic">Chưa có ứng dụng nào. Nhấn Thêm ứng dụng để thiết lập.</p>
                </div>
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
                      <a-input v-model:value="form.seo_title.vi" placeholder="Mặc định lấy theo tên sản phẩm..." size="large" />
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-gray-700 mb-1">Thẻ mô tả SEO (VI)</label>
                      <a-textarea v-model:value="form.seo_desc.vi" placeholder="Mặc định lấy theo mô tả sản phẩm..." :rows="3" size="large" />
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-gray-700 mb-1">Từ khóa SEO (Keywords - VI)</label>
                      <a-input v-model:value="form.seo_keywords.vi" placeholder="Ví dụ: bột nghệ, tinh bột nghệ, curcumin (phân cách bằng dấu phẩy)" size="large" />
                    </div>
                  </div>
                </a-tab-pane>

                <!-- SEO EN -->
                <a-tab-pane key="seo_en" tab="SEO Tiếng Anh">
                  <div class="space-y-4 mt-3">
                    <div>
                      <div class="flex items-center justify-between mb-1">
                        <label class="block text-xs font-bold text-gray-700">Thẻ tiêu đề SEO (EN)</label>
                        <a-button type="link" size="small" class="p-0 text-xs font-semibold text-emerald-600 hover:text-emerald-750" :loading="translatingFields['seo_title']" @click="translateField('seo_title')">
                          Dịch tự động
                        </a-button>
                      </div>
                      <a-input v-model:value="form.seo_title.en" placeholder="Mặc định lấy theo tên sản phẩm..." size="large" />
                    </div>
                    <div>
                      <div class="flex items-center justify-between mb-1">
                        <label class="block text-xs font-bold text-gray-700">Thẻ mô tả SEO (EN)</label>
                        <a-button type="link" size="small" class="p-0 text-xs font-semibold text-emerald-600 hover:text-emerald-750" :loading="translatingFields['seo_desc']" @click="translateField('seo_desc')">
                          Dịch tự động
                        </a-button>
                      </div>
                      <a-textarea v-model:value="form.seo_desc.en" placeholder="Mặc định lấy theo mô tả sản phẩm..." :rows="3" size="large" />
                    </div>
                    <div>
                      <div class="flex items-center justify-between mb-1">
                        <label class="block text-xs font-bold text-gray-700">Từ khóa SEO (Keywords - EN)</label>
                        <a-button type="link" size="small" class="p-0 text-xs font-semibold text-emerald-600 hover:text-emerald-750" :loading="translatingFields['seo_keywords']" @click="translateField('seo_keywords')">
                          Dịch tự động
                        </a-button>
                      </div>
                      <a-input v-model:value="form.seo_keywords.en" placeholder="e.g., turmeric powder, starch, curcumin (separated by commas)" size="large" />
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
                <p class="text-[11px] text-gray-400 mb-3">Tải ảnh lên để thay thế ảnh sản phẩm mặc định khi chia sẻ liên kết này lên mạng xã hội.</p>
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
                      <button type="button" @click="removeOgImage" class="p-1 rounded-full bg-white text-red-655 hover:bg-red-50 transition-colors shadow-sm">
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
        <div class="border-t border-gray-100 pt-6">
          <label class="block text-sm font-bold text-gray-700 mb-1">Hình ảnh sản phẩm</label>
          <div class="flex items-start gap-4">
            <!-- Upload Box -->
            <div class="relative w-32 h-32 border-2 border-dashed border-gray-300 hover:border-emerald-500 rounded-lg overflow-hidden flex flex-col items-center justify-center bg-gray-55 text-gray-500 cursor-pointer">
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
            <div @click="showMediaModal = true" class="w-32 h-32 border-2 border-dashed border-gray-300 hover:border-emerald-500 rounded-lg overflow-hidden flex flex-col items-center justify-center bg-gray-55 text-gray-500 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span class="text-xs font-semibold mt-1">Chọn từ thư viện</span>
            </div>

            <!-- Preview Image -->
            <div v-if="imagePreview || form.image" class="w-32 h-32 rounded-lg border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center relative group">
              <img :src="imagePreview || form.image" alt="Preview" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <button type="button" @click="removeImage" class="p-1.5 rounded-full bg-white text-red-655 hover:bg-red-50 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <p class="text-xs text-gray-400 mt-2">Định dạng hỗ trợ: JPG, PNG, WEBP. Dung lượng tối đa: 2MB.</p>
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

        <!-- QUICK CATEGORY MODAL -->
        <a-modal
          v-model:open="quickCategoryModalVisible"
          title="✨ Tạo Danh Mục Sản Phẩm Mới Nhanh"
          width="550px"
          :footer="null"
          destroyOnClose
          centered
        >
          <div class="py-4 space-y-5">
            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1">Tên danh mục (Tiếng Việt) *</label>
              <a-input v-model:value="quickCatForm.name.vi" placeholder="Ví dụ: Phụ gia thực phẩm, Chất bảo quản..." size="large" />
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1">Tên danh mục (Tiếng Anh)</label>
              <a-input v-model:value="quickCatForm.name.en" placeholder="Ví dụ: Food Additives..." size="large" />
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1">Danh mục cha (Tùy chọn):</label>
              <a-select v-model:value="quickCatForm.parent_id" placeholder="Mặc định là Danh mục Gốc (Cấp 1)" class="w-full" allow-clear size="large">
                <a-select-option v-for="cat in localCategories" :key="cat.id" :value="cat.id">
                  {{ cat.parent_id ? '└── ' : '📁 ' }}{{ cat.name?.vi }}
                </a-select-option>
              </a-select>
            </div>

            <div class="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <a-button @click="quickCategoryModalVisible = false">Hủy</a-button>
              <a-button type="primary" class="bg-emerald-700 hover:bg-emerald-800 border-none font-bold" :loading="quickCatSubmitting" @click="submitQuickCategory">
                Tạo & Chọn Danh Mục Này
              </a-button>
            </div>
          </div>
        </a-modal>

        <!-- Buttons -->
        <div class="flex items-center justify-between border-t border-gray-150 pt-6">
          <div class="flex items-center gap-3">
            <a-button size="large" class="rounded-lg font-bold" @click="goBack">Hủy bỏ</a-button>
            <a-button type="primary" size="large" class="bg-emerald-700 hover:bg-emerald-800 border-none font-bold rounded-lg" :loading="form.processing" html-type="submit">
              {{ isEdit ? 'Cập nhật sản phẩm' : 'Lưu sản phẩm' }}
            </a-button>
          </div>
          <div v-if="isEdit">
            <a-button type="default" size="large" class="border-emerald-600 text-emerald-700 hover:text-emerald-850 hover:border-emerald-750 font-bold rounded-lg flex items-center gap-2" @click="handlePreview">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Xem trước
            </a-button>
          </div>
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
import { translateSingle, translateHtml } from '@/Utils/translator';
import axios from 'axios';
import { message } from 'ant-design-vue';

const props = defineProps({
  product: Object,
  categories: Array,
});

const isEdit = computed(() => !!props.product);
const fileInput = ref(null);
const imagePreview = ref(null);
const showMediaModal = ref(false);

const showAdvancedSeo = ref(false);
const showOgMediaModal = ref(false);
const ogFileInput = ref(null);
const ogImagePreview = ref(null);

const translatingFields = ref({});
const translatingAll = ref(false);

const form = useForm({
  name: {
    vi: props.product?.name?.vi || (typeof props.product?.name === 'string' ? props.product.name : ''),
    en: props.product?.name?.en || '',
  },
  slug: props.product?.slug || '',
  product_category_id: props.product?.product_category_id || null,
  desc: {
    vi: props.product?.desc?.vi || (typeof props.product?.desc === 'string' ? props.product.desc : ''),
    en: props.product?.desc?.en || '',
  },
  image: props.product?.image || '',
  image_file: null,
  specs: {
    vi: props.product?.specs?.vi ? [...props.product.specs.vi] : (Array.isArray(props.product?.specs) ? [...props.product.specs] : ['']),
    en: props.product?.specs?.en ? [...props.product.specs.en] : [''],
  },
  applications: {
    vi: props.product?.applications?.vi ? [...props.product.applications.vi] : (Array.isArray(props.product?.applications) ? [...props.product.applications] : ['']),
    en: props.product?.applications?.en ? [...props.product.applications.en] : [''],
  },
  packaging: {
    vi: props.product?.packaging?.vi || (typeof props.product?.packaging === 'string' ? props.product.packaging : ''),
    en: props.product?.packaging?.en || '',
  },
  type: props.product?.type || 'food',
  status: props.product?.status || 'published',
  seo_title: {
    vi: props.product?.seo_title?.vi || '',
    en: props.product?.seo_title?.en || '',
  },
  seo_desc: {
    vi: props.product?.seo_desc?.vi || '',
    en: props.product?.seo_desc?.en || '',
  },
  seo_keywords: {
    vi: props.product?.seo_keywords?.vi || '',
    en: props.product?.seo_keywords?.en || '',
  },
  meta_robots: props.product?.meta_robots || '',
  canonical_url: props.product?.canonical_url || '',
  og_image: props.product?.og_image || '',
  og_image_file: null,
});

async function translateField(field, index = null) {
  const loadingKey = index !== null ? `${field}_${index}` : field;
  translatingFields.value[loadingKey] = true;
  try {
    if (index !== null) {
      const viVal = form[field].vi[index];
      if (viVal) {
        form[field].en[index] = await translateSingle(viVal);
      }
    } else {
      const viVal = form[field].vi;
      if (viVal) {
        if (field === 'desc') {
          form[field].en = await translateHtml(viVal);
        } else {
          form[field].en = await translateSingle(viVal);
        }
      }
    }
  } catch (error) {
    console.error(`Translation error for field ${field}:`, error);
  } finally {
    translatingFields.value[loadingKey] = false;
  }
}

async function translateAllFields() {
  translatingAll.value = true;
  try {
    const textFields = ['name', 'packaging', 'seo_title', 'seo_desc', 'seo_keywords'];
    for (const field of textFields) {
      if (form[field] && form[field].vi) {
        form[field].en = await translateSingle(form[field].vi);
      }
    }
    if (form.desc && form.desc.vi) {
      form.desc.en = await translateHtml(form.desc.vi);
    }
    const arrayFields = ['specs', 'applications'];
    for (const field of arrayFields) {
      if (form[field] && form[field].vi) {
        form[field].en = await Promise.all(
          form[field].vi.map(async (viItem) => {
            return await translateSingle(viItem);
          })
        );
      }
    }
  } catch (error) {
    console.error('Translate all error:', error);
  } finally {
    translatingAll.value = false;
  }
}

const localCategories = ref([...(props.categories || [])]);

const filteredCategories = computed(() => {
  return localCategories.value ? localCategories.value.filter(c => c.type === form.type) : [];
});

const quickCategoryModalVisible = ref(false);
const quickCatSubmitting = ref(false);
const quickCatForm = ref({
  name: { vi: '', en: '' },
  type: form.type,
  parent_id: null,
});

function openQuickCategoryModal() {
  quickCatForm.value = {
    name: { vi: '', en: '' },
    type: form.type,
    parent_id: null,
  };
  quickCategoryModalVisible.value = true;
}

async function submitQuickCategory() {
  if (!quickCatForm.value.name.vi || !quickCatForm.value.name.vi.trim()) {
    message.warning('Vui lòng nhập tên danh mục Tiếng Việt!');
    return;
  }

  quickCatSubmitting.value = true;
  try {
    const res = await axios.post('/admin/product-categories', {
      name: quickCatForm.value.name,
      type: form.type,
      parent_id: quickCatForm.value.parent_id,
    }, {
      headers: {
        'Accept': 'application/json'
      }
    });

    quickCatSubmitting.value = false;
    quickCategoryModalVisible.value = false;
    message.success('Đã tạo và chọn danh mục mới thành công!');

    if (res.data && res.data.category) {
      localCategories.value.push(res.data.category);
      form.product_category_id = res.data.category.id;
    }
  } catch (error) {
    quickCatSubmitting.value = false;
    const msg = error.response?.data?.message || 'Có lỗi xảy ra khi tạo danh mục.';
    message.error(msg);
  }
}

function handleTypeChange() {
  form.product_category_id = null;
}

function addSpec(lang) {
  form.specs[lang].push('');
}

function removeSpec(lang, index) {
  form.specs[lang].splice(index, 1);
}

function addApp(lang) {
  form.applications[lang].push('');
}

function removeApp(lang, index) {
  form.applications[lang].splice(index, 1);
}

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

function handlePreview() {
  const storefrontUrl = 'http://localhost:3000';
  const path = props.product.type === 'food' ? 'nguyen-lieu-thuc-pham' : 'nguyen-lieu-my-pham';
  const previewUrl = `${storefrontUrl}/${path}/${props.product.slug || props.product.id}?preview=true&secret=SophpowerPreview2026`;
  window.open(previewUrl, '_blank');
}

function goBack() {
  window.history.back();
}

function submit() {
  // Filter out empty specs and apps for both locales
  form.specs.vi = form.specs.vi.filter(s => s.trim() !== '');
  form.specs.en = form.specs.en.filter(s => s.trim() !== '');
  form.applications.vi = form.applications.vi.filter(a => a.trim() !== '');
  form.applications.en = form.applications.en.filter(a => a.trim() !== '');

  if (isEdit.value) {
    form.post(`/admin/products/${props.product.id}`, {
      forceFormData: true,
    });
  } else {
    form.post('/admin/products');
  }
}
</script>
