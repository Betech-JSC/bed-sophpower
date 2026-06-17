<template>
  <CrmLayout :title="isEdit ? 'Sửa tin tuyển dụng' : 'Đăng tin tuyển dụng mới'">
    <div class="bg-white p-8 rounded-xl border border-gray-150 shadow-xs max-w-4xl">
      <form @submit.prevent="submit" class="space-y-6">
        
        <!-- Common Fields (Deadline, Slug) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-gray-100 pb-6">
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">Hạn nộp hồ sơ *</label>
            <a-input v-model:value="form.deadline" type="date" size="large" />
            <p v-if="form.errors.deadline" class="mt-1 text-xs text-red-655 font-semibold">{{ form.errors.deadline }}</p>
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">Đường dẫn thân thiện (Custom URL Slug)</label>
            <a-input v-model:value="form.slug" placeholder="Ví dụ: nhan-vien-kinh-doanh-b2b (Mặc định tự sinh từ Chức danh tiếng Việt)" size="large" />
            <p v-if="form.errors.slug" class="mt-1 text-xs text-red-655 font-semibold">{{ form.errors.slug }}</p>
          </div>
        </div>

        <!-- Tabs for Bilingual Inputs -->
        <a-tabs default-active-key="vi" class="mb-6">
          <!-- VIETNAMESE TAB -->
          <a-tab-pane key="vi" tab="Tiếng Việt">
            <div class="space-y-6 mt-4">
              <!-- Title VI -->
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Chức danh / Vị trí tuyển dụng (VI) *</label>
                <a-input v-model:value="form.title.vi" placeholder="Ví dụ: Nhân viên kinh doanh B2B" size="large" />
                <p v-if="form.errors['title.vi']" class="mt-1 text-xs text-red-655 font-semibold">{{ form.errors['title.vi'] }}</p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Department VI -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-1">Bộ phận tuyển dụng (VI) *</label>
                  <a-input v-model:value="form.department.vi" placeholder="Ví dụ: Phòng Kinh Doanh" size="large" />
                  <p v-if="form.errors['department.vi']" class="mt-1 text-xs text-red-655 font-semibold">{{ form.errors['department.vi'] }}</p>
                </div>

                <!-- Location VI -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-1">Địa điểm làm việc (VI) *</label>
                  <a-input v-model:value="form.location.vi" placeholder="Ví dụ: TP. Hồ Chí Minh" size="large" />
                  <p v-if="form.errors['location.vi']" class="mt-1 text-xs text-red-655 font-semibold">{{ form.errors['location.vi'] }}</p>
                </div>

                <!-- Salary VI -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-1">Mức lương (VI) *</label>
                  <a-input v-model:value="form.salary.vi" placeholder="Ví dụ: Thỏa thuận" size="large" />
                  <p v-if="form.errors['salary.vi']" class="mt-1 text-xs text-red-655 font-semibold">{{ form.errors['salary.vi'] }}</p>
                </div>
              </div>

              <!-- Summary VI -->
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Tóm tắt công việc (VI) *</label>
                <RichTextEditor v-model:value="form.summary.vi" placeholder="Nhập tóm tắt công việc bằng tiếng Việt..." />
                <p v-if="form.errors['summary.vi']" class="mt-1 text-xs text-red-655 font-semibold">{{ form.errors['summary.vi'] }}</p>
              </div>

              <!-- Responsibilities VI (Array) -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <label class="block text-sm font-bold text-gray-700">Nhiệm vụ chính (VI)</label>
                  <a-button type="dashed" size="small" class="flex items-center gap-1" @click="addItem('responsibilities', 'vi')">
                    + Thêm nhiệm vụ (VI)
                  </a-button>
                </div>
                <div class="space-y-2">
                  <div v-for="(item, index) in form.responsibilities.vi" :key="index" class="flex items-center gap-2">
                    <a-input v-model:value="form.responsibilities.vi[index]" placeholder="Ví dụ: Tiếp cận khách hàng, đàm phán hợp đồng..." class="flex-1" />
                    <a-button type="link" danger class="p-0 font-bold" @click="removeItem('responsibilities', 'vi', index)">Xóa</a-button>
                  </div>
                </div>
              </div>

              <!-- Requirements VI (Array) -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <label class="block text-sm font-bold text-gray-700">Yêu cầu ứng viên (VI)</label>
                  <a-button type="dashed" size="small" class="flex items-center gap-1" @click="addItem('requirements', 'vi')">
                    + Thêm yêu cầu (VI)
                  </a-button>
                </div>
                <div class="space-y-2">
                  <div v-for="(item, index) in form.requirements.vi" :key="index" class="flex items-center gap-2">
                    <a-input v-model:value="form.requirements.vi[index]" placeholder="Ví dụ: Tốt nghiệp đại học..." class="flex-1" />
                    <a-button type="link" danger class="p-0 font-bold" @click="removeItem('requirements', 'vi', index)">Xóa</a-button>
                  </div>
                </div>
              </div>

              <!-- Benefits VI (Array) -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <label class="block text-sm font-bold text-gray-700">Quyền lợi được hưởng (VI)</label>
                  <a-button type="dashed" size="small" class="flex items-center gap-1" @click="addItem('benefits', 'vi')">
                    + Thêm quyền lợi (VI)
                  </a-button>
                </div>
                <div class="space-y-2">
                  <div v-for="(item, index) in form.benefits.vi" :key="index" class="flex items-center gap-2">
                    <a-input v-model:value="form.benefits.vi[index]" placeholder="Ví dụ: Lương cứng hấp dẫn..." class="flex-1" />
                    <a-button type="link" danger class="p-0 font-bold" @click="removeItem('benefits', 'vi', index)">Xóa</a-button>
                  </div>
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
              <!-- Title EN -->
              <div>
                <div class="flex items-center justify-between mb-1">
                  <label class="block text-sm font-bold text-gray-700">Chức danh / Vị trí tuyển dụng (EN) *</label>
                  <a-button type="link" size="small" class="p-0 text-xs font-semibold text-emerald-600 hover:text-emerald-750 flex items-center gap-1" :loading="translatingFields['title']" @click="translateField('title')">
                    Dịch tự động
                  </a-button>
                </div>
                <a-input v-model:value="form.title.en" placeholder="Ví dụ: B2B Sales Executive" size="large" />
                <p v-if="form.errors['title.en']" class="mt-1 text-xs text-red-655 font-semibold">{{ form.errors['title.en'] }}</p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Department EN -->
                <div>
                  <div class="flex items-center justify-between mb-1">
                    <label class="block text-sm font-bold text-gray-700">Bộ phận tuyển dụng (EN) *</label>
                    <a-button type="link" size="small" class="p-0 text-xs font-semibold text-emerald-600 hover:text-emerald-750" :loading="translatingFields['department']" @click="translateField('department')">
                      Dịch tự động
                    </a-button>
                  </div>
                  <a-input v-model:value="form.department.en" placeholder="Ví dụ: Sales Department" size="large" />
                  <p v-if="form.errors['department.en']" class="mt-1 text-xs text-red-655 font-semibold">{{ form.errors['department.en'] }}</p>
                </div>

                <!-- Location EN -->
                <div>
                  <div class="flex items-center justify-between mb-1">
                    <label class="block text-sm font-bold text-gray-700">Địa điểm làm việc (EN) *</label>
                    <a-button type="link" size="small" class="p-0 text-xs font-semibold text-emerald-600 hover:text-emerald-750" :loading="translatingFields['location']" @click="translateField('location')">
                      Dịch tự động
                    </a-button>
                  </div>
                  <a-input v-model:value="form.location.en" placeholder="Ví dụ: Ho Chi Minh City" size="large" />
                  <p v-if="form.errors['location.en']" class="mt-1 text-xs text-red-655 font-semibold">{{ form.errors['location.en'] }}</p>
                </div>

                <!-- Salary EN -->
                <div>
                  <div class="flex items-center justify-between mb-1">
                    <label class="block text-sm font-bold text-gray-700">Mức lương (EN) *</label>
                    <a-button type="link" size="small" class="p-0 text-xs font-semibold text-emerald-600 hover:text-emerald-750" :loading="translatingFields['salary']" @click="translateField('salary')">
                      Dịch tự động
                    </a-button>
                  </div>
                  <a-input v-model:value="form.salary.en" placeholder="Ví dụ: Negotiable" size="large" />
                  <p v-if="form.errors['salary.en']" class="mt-1 text-xs text-red-655 font-semibold">{{ form.errors['salary.en'] }}</p>
                </div>
              </div>

              <!-- Summary EN -->
              <div>
                <div class="flex items-center justify-between mb-1">
                  <label class="block text-sm font-bold text-gray-700">Tóm tắt công việc (EN) *</label>
                  <a-button type="link" size="small" class="p-0 text-xs font-semibold text-emerald-600 hover:text-emerald-750" :loading="translatingFields['summary']" @click="translateField('summary')">
                    Dịch tự động
                  </a-button>
                </div>
                <RichTextEditor v-model:value="form.summary.en" placeholder="Enter short job summary in English..." />
                <p v-if="form.errors['summary.en']" class="mt-1 text-xs text-red-655 font-semibold">{{ form.errors['summary.en'] }}</p>
              </div>

              <!-- Responsibilities EN (Array) -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <label class="block text-sm font-bold text-gray-700">Nhiệm vụ chính (EN)</label>
                  <a-button type="dashed" size="small" class="flex items-center gap-1" @click="addItem('responsibilities', 'en')">
                    + Thêm nhiệm vụ (EN)
                  </a-button>
                </div>
                <div class="space-y-2">
                  <div v-for="(item, index) in form.responsibilities.en" :key="index" class="flex items-center gap-2">
                    <a-input v-model:value="form.responsibilities.en[index]" placeholder="Ví dụ: Pitch clients, negotiate contracts..." class="flex-1" />
                    <a-button type="link" size="small" class="p-0 text-xs font-semibold text-emerald-600 hover:text-emerald-750" :loading="translatingFields[`responsibilities_${index}`]" @click="translateField('responsibilities', index)">
                      Dịch
                    </a-button>
                    <a-button type="link" danger class="p-0 font-bold" @click="removeItem('responsibilities', 'en', index)">Xóa</a-button>
                  </div>
                </div>
              </div>

              <!-- Requirements EN (Array) -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <label class="block text-sm font-bold text-gray-700">Yêu cầu ứng viên (EN)</label>
                  <a-button type="dashed" size="small" class="flex items-center gap-1" @click="addItem('requirements', 'en')">
                    + Thêm yêu cầu (EN)
                  </a-button>
                </div>
                <div class="space-y-2">
                  <div v-for="(item, index) in form.requirements.en" :key="index" class="flex items-center gap-2">
                    <a-input v-model:value="form.requirements.en[index]" placeholder="Ví dụ: Bachelor's degree in Chemistry..." class="flex-1" />
                    <a-button type="link" size="small" class="p-0 text-xs font-semibold text-emerald-600 hover:text-emerald-750" :loading="translatingFields[`requirements_${index}`]" @click="translateField('requirements', index)">
                      Dịch
                    </a-button>
                    <a-button type="link" danger class="p-0 font-bold" @click="removeItem('requirements', 'en', index)">Xóa</a-button>
                  </div>
                </div>
              </div>

              <!-- Benefits EN (Array) -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <label class="block text-sm font-bold text-gray-700">Quyền lợi được hưởng (EN)</label>
                  <a-button type="dashed" size="small" class="flex items-center gap-1" @click="addItem('benefits', 'en')">
                    + Thêm quyền lợi (EN)
                  </a-button>
                </div>
                <div class="space-y-2">
                  <div v-for="(item, index) in form.benefits.en" :key="index" class="flex items-center gap-2">
                    <a-input v-model:value="form.benefits.en[index]" placeholder="Ví dụ: Competitive salary, health coverage..." class="flex-1" />
                    <a-button type="link" size="small" class="p-0 text-xs font-semibold text-emerald-600 hover:text-emerald-750" :loading="translatingFields[`benefits_${index}`]" @click="translateField('benefits', index)">
                      Dịch
                    </a-button>
                    <a-button type="link" danger class="p-0 font-bold" @click="removeItem('benefits', 'en', index)">Xóa</a-button>
                  </div>
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
                      <a-input v-model:value="form.seo_title.vi" placeholder="Mặc định lấy theo vị trí tuyển dụng..." size="large" />
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-gray-700 mb-1">Thẻ mô tả SEO (VI)</label>
                      <a-textarea v-model:value="form.seo_desc.vi" placeholder="Mặc định lấy theo tóm tắt công việc..." :rows="3" size="large" />
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-gray-700 mb-1">Từ khóa SEO (Keywords - VI)</label>
                      <a-input v-model:value="form.seo_keywords.vi" placeholder="Ví dụ: tuyển dụng sophpower, việc làm hóa chất, tuyển dụng kỹ sư (phân cách bằng dấu phẩy)" size="large" />
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
                      <a-input v-model:value="form.seo_title.en" placeholder="Mặc định lấy theo vị trí tuyển dụng..." size="large" />
                    </div>
                    <div>
                      <div class="flex items-center justify-between mb-1">
                        <label class="block text-xs font-bold text-gray-700">Thẻ mô tả SEO (EN)</label>
                        <a-button type="link" size="small" class="p-0 text-xs font-semibold text-emerald-600 hover:text-emerald-750" :loading="translatingFields['seo_desc']" @click="translateField('seo_desc')">
                          Dịch tự động
                        </a-button>
                      </div>
                      <a-textarea v-model:value="form.seo_desc.en" placeholder="Mặc định lấy theo tóm tắt công việc..." :rows="3" size="large" />
                    </div>
                    <div>
                      <div class="flex items-center justify-between mb-1">
                        <label class="block text-xs font-bold text-gray-700">Từ khóa SEO (Keywords - EN)</label>
                        <a-button type="link" size="small" class="p-0 text-xs font-semibold text-emerald-600 hover:text-emerald-750" :loading="translatingFields['seo_keywords']" @click="translateField('seo_keywords')">
                          Dịch tự động
                        </a-button>
                      </div>
                      <a-input v-model:value="form.seo_keywords.en" placeholder="e.g., sophpower recruitment, chemical engineering jobs (separated by commas)" size="large" />
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
                <p class="text-[11px] text-gray-400 mb-3">Tải ảnh lên để thay thế ảnh tin tuyển dụng mặc định khi chia sẻ liên kết này lên mạng xã hội.</p>
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

        <MediaSelectorModal
          :open="showOgMediaModal"
          @close="showOgMediaModal = false"
          @select="handleOgMediaSelect"
        />

        <!-- Buttons -->
        <div class="flex items-center gap-3 border-t border-gray-150 pt-6">
          <a-button size="large" class="rounded-lg font-bold" @click="goBack">Hủy bỏ</a-button>
          <a-button type="primary" size="large" class="bg-emerald-700 hover:bg-emerald-800 border-none font-bold rounded-lg" :loading="form.processing" html-type="submit">
            {{ isEdit ? 'Cập nhật tin tuyển dụng' : 'Đăng tuyển dụng' }}
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
import { translateSingle, translateHtml } from '@/Utils/translator';

const props = defineProps({
  job: Object,
});

const isEdit = computed(() => !!props.job);
const showAdvancedSeo = ref(false);
const showOgMediaModal = ref(false);
const ogFileInput = ref(null);
const ogImagePreview = ref(null);

const translatingFields = ref({});
const translatingAll = ref(false);

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
        if (field === 'summary') {
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
    const textFields = ['title', 'department', 'location', 'salary', 'seo_title', 'seo_desc', 'seo_keywords'];
    for (const field of textFields) {
      if (form[field] && form[field].vi) {
        form[field].en = await translateSingle(form[field].vi);
      }
    }
    if (form.summary && form.summary.vi) {
      form.summary.en = await translateHtml(form.summary.vi);
    }
    const arrayFields = ['responsibilities', 'requirements', 'benefits'];
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

// Format date to YYYY-MM-DD for input type="date"
const formattedDeadline = computed(() => {
  if (!props.job?.deadline) return '';
  const d = new Date(props.job.deadline);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
});

const form = useForm({
  title: {
    vi: props.job?.title?.vi || (typeof props.job?.title === 'string' ? props.job.title : ''),
    en: props.job?.title?.en || '',
  },
  slug: props.job?.slug || '',
  department: {
    vi: props.job?.department?.vi || (typeof props.job?.department === 'string' ? props.job.department : ''),
    en: props.job?.department?.en || '',
  },
  location: {
    vi: props.job?.location?.vi || (typeof props.job?.location === 'string' ? props.job.location : ''),
    en: props.job?.location?.en || '',
  },
  salary: {
    vi: props.job?.salary?.vi || (typeof props.job?.salary === 'string' ? props.job.salary : ''),
    en: props.job?.salary?.en || '',
  },
  deadline: formattedDeadline.value || '',
  summary: {
    vi: props.job?.summary?.vi || (typeof props.job?.summary === 'string' ? props.job.summary : ''),
    en: props.job?.summary?.en || '',
  },
  requirements: {
    vi: props.job?.requirements?.vi ? [...props.job.requirements.vi] : (Array.isArray(props.job?.requirements) ? [...props.job.requirements] : ['']),
    en: props.job?.requirements?.en ? [...props.job.requirements.en] : [''],
  },
  responsibilities: {
    vi: props.job?.responsibilities?.vi ? [...props.job.responsibilities.vi] : (Array.isArray(props.job?.responsibilities) ? [...props.job.responsibilities] : ['']),
    en: props.job?.responsibilities?.en ? [...props.job.responsibilities.en] : [''],
  },
  benefits: {
    vi: props.job?.benefits?.vi ? [...props.job.benefits.vi] : (Array.isArray(props.job?.benefits) ? [...props.job.benefits] : ['']),
    en: props.job?.benefits?.en ? [...props.job.benefits.en] : [''],
  },
  seo_title: {
    vi: props.job?.seo_title?.vi || '',
    en: props.job?.seo_title?.en || '',
  },
  seo_desc: {
    vi: props.job?.seo_desc?.vi || '',
    en: props.job?.seo_desc?.en || '',
  },
  seo_keywords: {
    vi: props.job?.seo_keywords?.vi || '',
    en: props.job?.seo_keywords?.en || '',
  },
  meta_robots: props.job?.meta_robots || '',
  canonical_url: props.job?.canonical_url || '',
  og_image: props.job?.og_image || '',
  og_image_file: null,
});

function addItem(key, lang) {
  form[key][lang].push('');
}

function removeItem(key, lang, index) {
  form[key][lang].splice(index, 1);
}

function goBack() {
  window.history.back();
}

function submit() {
  // Filter out empty items
  form.requirements.vi = form.requirements.vi.filter(item => item.trim() !== '');
  form.requirements.en = form.requirements.en.filter(item => item.trim() !== '');
  form.responsibilities.vi = form.responsibilities.vi.filter(item => item.trim() !== '');
  form.responsibilities.en = form.responsibilities.en.filter(item => item.trim() !== '');
  form.benefits.vi = form.benefits.vi.filter(item => item.trim() !== '');
  form.benefits.en = form.benefits.en.filter(item => item.trim() !== '');

  if (isEdit.value) {
    form.transform((data) => ({
      ...data,
      _method: 'PUT'
    })).post(`/admin/jobs/${props.job.id}`, {
      forceFormData: true
    });
  } else {
    form.post('/admin/jobs');
  }
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
</script>
