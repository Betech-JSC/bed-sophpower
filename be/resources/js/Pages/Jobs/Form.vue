<template>
  <CrmLayout :title="isEdit ? 'Sửa tin tuyển dụng' : 'Đăng tin tuyển dụng mới'">
    <div class="bg-white p-8 rounded-xl border border-gray-150 shadow-xs max-w-4xl">
      <form @submit.prevent="submit" class="space-y-6">
        
        <!-- Common Field (Deadline) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-gray-100 pb-6">
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">Hạn nộp hồ sơ *</label>
            <a-input v-model:value="form.deadline" type="date" size="large" />
            <p v-if="form.errors.deadline" class="mt-1 text-xs text-red-655 font-semibold">{{ form.errors.deadline }}</p>
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
                <a-textarea v-model:value="form.summary.vi" placeholder="Nhập tóm tắt công việc bằng tiếng Việt..." :rows="3" size="large" />
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
            <div class="space-y-6 mt-4">
              <!-- Title EN -->
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Chức danh / Vị trí tuyển dụng (EN) *</label>
                <a-input v-model:value="form.title.en" placeholder="Ví dụ: B2B Sales Executive" size="large" />
                <p v-if="form.errors['title.en']" class="mt-1 text-xs text-red-655 font-semibold">{{ form.errors['title.en'] }}</p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Department EN -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-1">Bộ phận tuyển dụng (EN) *</label>
                  <a-input v-model:value="form.department.en" placeholder="Ví dụ: Sales Department" size="large" />
                  <p v-if="form.errors['department.en']" class="mt-1 text-xs text-red-655 font-semibold">{{ form.errors['department.en'] }}</p>
                </div>

                <!-- Location EN -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-1">Địa điểm làm việc (EN) *</label>
                  <a-input v-model:value="form.location.en" placeholder="Ví dụ: Ho Chi Minh City" size="large" />
                  <p v-if="form.errors['location.en']" class="mt-1 text-xs text-red-655 font-semibold">{{ form.errors['location.en'] }}</p>
                </div>

                <!-- Salary EN -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-1">Mức lương (EN) *</label>
                  <a-input v-model:value="form.salary.en" placeholder="Ví dụ: Negotiable" size="large" />
                  <p v-if="form.errors['salary.en']" class="mt-1 text-xs text-red-655 font-semibold">{{ form.errors['salary.en'] }}</p>
                </div>
              </div>

              <!-- Summary EN -->
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Tóm tắt công việc (EN) *</label>
                <a-textarea v-model:value="form.summary.en" placeholder="Enter short job summary in English..." :rows="3" size="large" />
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
                    <a-button type="link" danger class="p-0 font-bold" @click="removeItem('benefits', 'en', index)">Xóa</a-button>
                  </div>
                </div>
              </div>
            </div>
          </a-tab-pane>
        </a-tabs>

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
import { useForm } from '@inertiajs/vue3';
import { computed } from 'vue';

const props = defineProps({
  job: Object,
});

const isEdit = computed(() => !!props.job);

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
    form.put(`/admin/jobs/${props.job.id}`);
  } else {
    form.post('/admin/jobs');
  }
}
</script>
