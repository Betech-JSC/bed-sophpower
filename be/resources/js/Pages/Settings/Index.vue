<template>
  <CrmLayout title="Cấu hình hệ thống">
    <div class="bg-white p-8 rounded-xl border border-gray-150 shadow-xs max-w-4xl">
      <form @submit.prevent="submit" class="space-y-6">
        
        <a-tabs default-active-key="contact" class="mb-6">
          
          <!-- TAB 1: CONTACT INFO -->
          <a-tab-pane key="contact" tab="Thông tin liên hệ">
            <div class="space-y-6 mt-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Phone -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-1">Số điện thoại liên hệ</label>
                  <a-input v-model:value="form.contact_phone" placeholder="Ví dụ: +84 28 3824 0000" size="large" />
                </div>
                <!-- Email -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-1">Email liên hệ</label>
                  <a-input v-model:value="form.contact_email" placeholder="Ví dụ: info@sophpower.com" size="large" />
                </div>
              </div>

              <!-- Address VI -->
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Địa chỉ văn phòng (VI)</label>
                <a-input v-model:value="form.contact_address_vi" placeholder="Nhập địa chỉ bằng tiếng Việt..." size="large" />
              </div>

              <!-- Address EN -->
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Địa chỉ văn phòng (EN)</label>
                <a-input v-model:value="form.contact_address_en" placeholder="Nhập địa chỉ bằng tiếng Anh..." size="large" />
              </div>
            </div>
          </a-tab-pane>

          <!-- TAB 2: META SEO -->
          <a-tab-pane key="seo" tab="Cấu hình SEO">
            <div class="space-y-6 mt-4">
              <a-tabs default-active-key="seo_vi" type="card">
                <!-- SEO VI -->
                <a-tab-pane key="seo_vi" tab="Tiếng Việt">
                  <div class="space-y-4 mt-3">
                    <div>
                      <label class="block text-xs font-bold text-gray-700 mb-1">META TITLE (VI)</label>
                      <a-input v-model:value="form.meta_title_vi" placeholder="Meta title tiếng Việt..." size="large" />
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-gray-700 mb-1">META DESCRIPTION (VI)</label>
                      <a-textarea v-model:value="form.meta_desc_vi" placeholder="Meta description tiếng Việt..." :rows="3" size="large" />
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-gray-700 mb-1">META KEYWORDS (VI)</label>
                      <a-input v-model:value="form.meta_keywords_vi" placeholder="Từ khóa ngăn cách bằng dấu phẩy..." size="large" />
                    </div>
                  </div>
                </a-tab-pane>

                <!-- SEO EN -->
                <a-tab-pane key="seo_en" tab="Tiếng Anh (English)">
                  <div class="space-y-4 mt-3">
                    <div>
                      <label class="block text-xs font-bold text-gray-700 mb-1">META TITLE (EN)</label>
                      <a-input v-model:value="form.meta_title_en" placeholder="Meta title tiếng Anh..." size="large" />
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-gray-700 mb-1">META DESCRIPTION (EN)</label>
                      <a-textarea v-model:value="form.meta_desc_en" placeholder="Meta description tiếng Anh..." :rows="3" size="large" />
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-gray-700 mb-1">META KEYWORDS (EN)</label>
                      <a-input v-model:value="form.meta_keywords_en" placeholder="Keywords separated by commas..." size="large" />
                    </div>
                  </div>
                </a-tab-pane>
              </a-tabs>
            </div>
          </a-tab-pane>

          <!-- TAB 3: SMTP MAIL -->
          <a-tab-pane key="smtp" tab="Cấu hình gửi Mail (SMTP)">
            <div class="space-y-6 mt-4">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Host -->
                <div class="md:col-span-2">
                  <label class="block text-sm font-bold text-gray-700 mb-1">SMTP Host</label>
                  <a-input v-model:value="form.smtp_host" placeholder="Ví dụ: smtp.gmail.com" size="large" />
                </div>
                <!-- Port -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-1">SMTP Port</label>
                  <a-input v-model:value="form.smtp_port" placeholder="Ví dụ: 465 hoặc 587" size="large" />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Username -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-1">SMTP Username</label>
                  <a-input v-model:value="form.smtp_username" placeholder="Tên đăng nhập mail" size="large" />
                </div>
                <!-- Password -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-1">SMTP Password</label>
                  <a-input-password v-model:value="form.smtp_password" placeholder="Mật khẩu mail" size="large" />
                </div>
                <!-- Encryption -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-1">Mã hóa (Encryption)</label>
                  <a-select v-model:value="form.smtp_encryption" placeholder="Chọn mã hóa" class="w-full" size="large">
                    <a-select-option value="ssl">SSL (Port 465)</a-select-option>
                    <a-select-option value="tls">TLS (Port 587)</a-select-option>
                    <a-select-option value="none">None</a-select-option>
                  </a-select>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- From address -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-1">Địa chỉ Email người gửi</label>
                  <a-input v-model:value="form.smtp_from_address" placeholder="Ví dụ: noreply@sophpower.com" size="large" />
                </div>
                <!-- From name -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-1">Tên hiển thị người gửi</label>
                  <a-input v-model:value="form.smtp_from_name" placeholder="Ví dụ: Sophpower Việt Nam" size="large" />
                </div>
              </div>
            </div>
          </a-tab-pane>

          <!-- TAB 4: SCRIPTS INCLUDE -->
          <a-tab-pane key="scripts" tab="Chèn mã Scripts">
            <div class="space-y-6 mt-4">
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Mã chèn trong Header (Ví dụ: Google Analytics, Google Tag Manager...)</label>
                <a-textarea v-model:value="form.header_scripts" placeholder="<script>...</script>" :rows="8" size="large" class="font-mono text-xs" />
              </div>
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Mã chèn trong Footer (Ví dụ: Chat Widget, Facebook Pixel...)</label>
                <a-textarea v-model:value="form.footer_scripts" placeholder="<!-- scripts -->" :rows="8" size="large" class="font-mono text-xs" />
              </div>
            </div>
          </a-tab-pane>

        </a-tabs>

        <!-- Form Actions -->
        <div class="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
          <a-button type="primary" html-type="submit" size="large" class="bg-emerald-700 hover:bg-emerald-800 border-none font-bold" :loading="form.processing">
            Lưu tất cả thay đổi
          </a-button>
        </div>

      </form>
    </div>
  </CrmLayout>
</template>

<script setup>
import CrmLayout from '@/Layouts/CrmLayout.vue';
import { useForm } from '@inertiajs/vue3';

const props = defineProps({
  settings: Object,
});

const form = useForm({
  smtp_host: props.settings.smtp_host || '',
  smtp_port: props.settings.smtp_port || '',
  smtp_username: props.settings.smtp_username || '',
  smtp_password: props.settings.smtp_password || '',
  smtp_encryption: props.settings.smtp_encryption || 'tls',
  smtp_from_address: props.settings.smtp_from_address || '',
  smtp_from_name: props.settings.smtp_from_name || '',

  meta_title_vi: props.settings.meta_title_vi || '',
  meta_title_en: props.settings.meta_title_en || '',
  meta_desc_vi: props.settings.meta_desc_vi || '',
  meta_desc_en: props.settings.meta_desc_en || '',
  meta_keywords_vi: props.settings.meta_keywords_vi || '',
  meta_keywords_en: props.settings.meta_keywords_en || '',

  contact_phone: props.settings.contact_phone || '',
  contact_email: props.settings.contact_email || '',
  contact_address_vi: props.settings.contact_address_vi || '',
  contact_address_en: props.settings.contact_address_en || '',

  header_scripts: props.settings.header_scripts || '',
  footer_scripts: props.settings.footer_scripts || '',
});

function submit() {
  form.post('/admin/settings');
}
</script>
