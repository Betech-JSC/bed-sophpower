<template>
  <CrmLayout :title="isEdit ? 'Chỉnh sửa Danh mục Sản phẩm' : 'Tạo Danh mục Sản phẩm Mới'">
    <div class="max-w-5xl mx-auto space-y-6 pb-12">
      
      <!-- BREADCRUMB BACK TO PARENT LINK -->
      <div v-if="form.parent_id && selectedParentName" class="flex items-center gap-2">
        <button 
          type="button" 
          @click="cancel"
          class="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 px-3.5 py-2 rounded-xl border border-emerald-200 transition-colors cursor-pointer"
        >
          ‹ Quay lại danh mục cha "{{ selectedParentName }}"
        </button>
      </div>
      
      <!-- DANH MỤC CON HIỆN CÓ & QUICK ACTIONS PANEL -->
      <div v-if="isEdit" class="bg-white rounded-2xl p-6 border border-gray-200 shadow-md space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <div class="flex items-center gap-2">
            <span class="text-2xl">📂</span>
            <div>
              <h3 class="text-base font-bold text-gray-900 flex items-center gap-2">
                <span>Danh mục Con thuộc "{{ category?.name?.vi }}"</span>
                <span class="text-xs font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  {{ category?.children?.length || 0 }} danh mục
                </span>
              </h3>
              <p class="text-xs text-gray-500">Quản lý và thêm nhanh các danh mục con xếp bên dưới danh mục này.</p>
            </div>
          </div>

          <a-button 
            type="primary" 
            class="bg-emerald-700 hover:bg-emerald-800 border-none font-bold text-xs flex items-center gap-1.5 h-10 px-4"
            @click="openSingleChildModal"
          >
            + Thêm 1 danh mục con
          </a-button>
        </div>

        <!-- List of existing children -->
        <div v-if="category?.children && category.children.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div 
            v-for="child in category.children" 
            :key="child.id"
            class="p-3.5 rounded-xl border border-gray-200 bg-slate-50/70 hover:bg-white hover:border-blue-300 hover:shadow-sm transition-all duration-200 flex items-center justify-between"
          >
            <div class="space-y-0.5">
              <div class="flex items-center gap-2 font-bold text-sm text-gray-900">
                <span class="text-blue-600">📁</span>
                <span>{{ child.name?.vi }}</span>
                <span v-if="child.children && child.children.length > 0" class="text-[10px] font-bold bg-purple-100 text-purple-700 px-1.5 py-0.2 rounded">
                  {{ child.children.length }} cấp 3
                </span>
              </div>
              <div class="text-xs text-gray-400 italic pl-6">{{ child.name?.en }}</div>
            </div>

            <div class="flex items-center gap-2">
              <a-button type="link" class="text-blue-600 font-bold p-0 text-xs" @click="goToEditChild(child.id)">Sửa</a-button>
              <span class="text-gray-300">|</span>
              <a-popconfirm title="Xóa danh mục con này?" ok-text="Xóa" cancel-text="Hủy" @confirm="deleteChildCategory(child.id)">
                <a-button type="link" danger class="font-bold p-0 text-xs">Xóa</a-button>
              </a-popconfirm>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-6 bg-gray-50/80 rounded-xl border border-dashed border-gray-200 space-y-2">
          <p class="text-xs text-gray-400 italic">Chưa có danh mục con nào xếp dưới danh mục này.</p>
          <a-button 
            type="dashed" 
            class="border-emerald-300 text-emerald-700 font-bold hover:text-emerald-800 text-xs"
            @click="openSingleChildModal"
          >
            + Tạo danh mục con đầu tiên
          </a-button>
        </div>
      </div>

      <!-- MAIN FORM CONTAINER -->
      <div class="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
        <form @submit.prevent="submit" class="p-8 space-y-6">

          <!-- Type & Parent Select Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Mảng sản phẩm -->
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Mảng sản phẩm *</label>
              <a-select 
                v-model:value="form.type" 
                class="w-full" 
                size="large"
                @change="setProductType"
              >
                <a-select-option value="food">🥗 Nguyên liệu Thực phẩm (Food)</a-select-option>
                <a-select-option value="cosmetic">💄 Nguyên liệu Mỹ phẩm (Cosmetic)</a-select-option>
              </a-select>
              <p v-if="form.errors.type" class="mt-1 text-xs text-red-650 font-semibold">{{ form.errors.type }}</p>
            </div>

            <!-- Danh mục Cha -->
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Danh mục Cha (Tùy chọn)</label>
              <a-select 
                v-model:value="form.parent_id" 
                placeholder="-- Là Danh mục Gốc (Cấp 1) --" 
                class="w-full" 
                size="large"
                allow-clear
              >
                <a-select-option v-for="pCat in formattedParentCategories" :key="pCat.id" :value="pCat.id">
                  {{ pCat.parent_id ? '└── ' : '📁 ' }}{{ pCat.name?.vi }}
                </a-select-option>
              </a-select>
              <p class="mt-1 text-[11px] text-gray-400">Bỏ trống nếu muốn tạo làm Danh mục Gốc (Cấp 1) hiển thị trên Header.</p>
            </div>
          </div>

          <!-- Tên danh mục VI & EN -->
          <div class="space-y-4 pt-4 border-t border-gray-100">

            <a-tabs default-active-key="vi" class="mb-2">
              <a-tab-pane key="vi" tab="🇻🇳 Tiếng Việt">
                <div class="mt-2">
                  <label class="block text-sm font-bold text-gray-700 mb-1">Tên danh mục (Tiếng Việt) *</label>
                  <a-input v-model:value="form.name.vi" placeholder="Ví dụ: Phụ gia thực phẩm, Bột trái cây..." size="large" />
                  <p v-if="form.errors['name.vi']" class="mt-1 text-xs text-red-650 font-semibold">{{ form.errors['name.vi'] }}</p>
                </div>
              </a-tab-pane>

              <a-tab-pane key="en" tab="🇬🇧 Tiếng Anh (English)">
                <div class="mt-2">
                  <label class="block text-sm font-bold text-gray-700 mb-1">Tên danh mục (Tiếng Anh)</label>
                  <a-input v-model:value="form.name.en" placeholder="Ví dụ: Food Additives, Fruit Powders..." size="large" />
                  <p v-if="form.errors['name.en']" class="mt-1 text-xs text-red-650 font-semibold">{{ form.errors['name.en'] }}</p>
                </div>
              </a-tab-pane>
            </a-tabs>

            <!-- Slug Input -->
            <div class="pt-2">
              <label class="block text-sm font-bold text-gray-700 mb-1">Đường dẫn URL liên kết (Slug)</label>
              <a-input v-model:value="form.slug" placeholder="Hệ thống tự động tạo từ tên tiếng Việt..." size="large" />
              <p class="mt-1 text-[11px] text-gray-400">Đường dẫn URL thân thiện cho SEO. Để trống nếu muốn hệ thống tự tạo.</p>
              <p v-if="form.errors.slug" class="mt-1 text-xs text-red-650 font-semibold">{{ form.errors.slug }}</p>
            </div>
          </div>

          <!-- FORM ACTIONS -->
          <div class="flex items-center justify-end gap-4 pt-6 border-t border-gray-100">
            <a-button size="large" @click="cancel">
              Hủy bỏ
            </a-button>
            <a-button type="primary" html-type="submit" size="large" class="bg-emerald-700 hover:bg-emerald-800 border-none font-bold px-8 h-11" :loading="form.processing">
              {{ isEdit ? 'Cập nhật Danh Mục' : 'Lưu Danh Mục Mới' }}
            </a-button>
          </div>

        </form>
      </div>

      <!-- MODAL THÊM 1 DANH MỤC CON ĐƠN TRONG TRANG CHI TIẾT -->
      <a-modal
        v-model:open="singleChildModalVisible"
        :title="`Thêm 1 danh mục con cho '${form.name.vi}'`"
        width="600px"
        :footer="null"
        destroyOnClose
        centered
      >
        <div class="py-4 space-y-5">
          <div class="p-3.5 rounded-xl border bg-emerald-50 border-emerald-200 text-emerald-900 flex items-center gap-2 text-xs font-semibold">
            <span>Danh mục Cha:</span>
            <span class="font-bold text-emerald-700">📁 {{ form.name.vi }}</span>
            <span>›</span>
            <span class="font-black underline text-emerald-800">[Nhập 1 danh mục con mới]</span>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1">Tên danh mục con (Tiếng Việt) *</label>
              <a-input v-model:value="singleChildForm.name.vi" placeholder="Ví dụ: Phụ gia thực phẩm, Chất bảo quản..." size="large" />
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1">Tên danh mục con (Tiếng Anh)</label>
              <a-input v-model:value="singleChildForm.name.en" placeholder="Ví dụ: Food Additives..." size="large" />
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1">Đường dẫn URL Slug (Tùy chọn)</label>
              <a-input v-model:value="singleChildForm.slug" placeholder="Để trống để tự tạo tự động..." size="large" />
            </div>
          </div>

          <div class="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <a-button @click="singleChildModalVisible = false">Hủy bỏ</a-button>
            <a-button type="primary" class="bg-emerald-700 hover:bg-emerald-800 border-none font-bold px-6" :loading="singleChildSubmitting" @click="submitSingleChild">
              Lưu danh mục con
            </a-button>
          </div>
        </div>
      </a-modal>

    </div>
  </CrmLayout>
</template>

<script setup>
import CrmLayout from '@/Layouts/CrmLayout.vue';
import { useForm, router } from '@inertiajs/vue3';
import { computed, ref } from 'vue';

const props = defineProps({
  category: Object,
  parentCategories: {
    type: Array,
    default: () => [],
  },
});

const isEdit = computed(() => !!props.category);

const form = useForm({
  name: {
    vi: props.category?.name?.vi || '',
    en: props.category?.name?.en || '',
  },
  type: props.category?.type || 'food',
  parent_id: props.category?.parent_id || null,
  slug: props.category?.slug || '',
});

const formattedParentCategories = computed(() => {
  return props.parentCategories.filter(cat => cat.type === form.type);
});

const selectedParentName = computed(() => {
  if (!form.parent_id) return null;
  const parent = props.parentCategories.find(c => c.id === form.parent_id);
  return parent ? parent.name?.vi : null;
});

const selectedParentType = computed(() => {
  if (!form.parent_id) return form.type;
  const parent = props.parentCategories.find(c => c.id === form.parent_id);
  return parent ? parent.type : form.type;
});

function setProductType(type) {
  form.type = type;
  // Reset parent_id if incompatible
  if (form.parent_id) {
    const parent = props.parentCategories.find(c => c.id === form.parent_id);
    if (parent && parent.type !== type) {
      form.parent_id = null;
    }
  }
}

function selectFirstChildParent() {
  const available = formattedParentCategories.value;
  if (available.length > 0) {
    form.parent_id = available[0].id;
  } else {
    form.parent_id = null;
  }
}

function goToEditChild(childId) {
  router.get(`/admin/product-categories/${childId}/edit`);
}

function deleteChildCategory(childId) {
  router.delete(`/admin/product-categories/${childId}`, {
    preserveState: true,
  });
}

import axios from 'axios';
import { message } from 'ant-design-vue';

const singleChildModalVisible = ref(false);
const singleChildSubmitting = ref(false);
const singleChildForm = ref({
  name: { vi: '', en: '' },
  slug: '',
});

function openSingleChildModal() {
  singleChildForm.value = {
    name: { vi: '', en: '' },
    slug: '',
  };
  singleChildModalVisible.value = true;
}

async function submitSingleChild() {
  if (!singleChildForm.value.name.vi || !singleChildForm.value.name.vi.trim()) {
    message.warning('Vui lòng nhập tên danh mục con (Tiếng Việt)!');
    return;
  }

  singleChildSubmitting.value = true;
  try {
    await axios.post('/admin/product-categories', {
      name: singleChildForm.value.name,
      slug: singleChildForm.value.slug,
      type: form.type,
      parent_id: props.category?.id || null,
    }, {
      headers: { Accept: 'application/json' }
    });

    singleChildSubmitting.value = false;
    singleChildModalVisible.value = false;
    message.success('Đã thêm 1 danh mục con thành công!');
    router.reload({ preserveState: true });
  } catch (error) {
    singleChildSubmitting.value = false;
    const msg = error.response?.data?.message || 'Có lỗi xảy ra khi tạo danh mục con.';
    message.error(msg);
  }
}

function submit() {
  if (isEdit.value) {
    form.put(`/admin/product-categories/${props.category.id}`);
  } else {
    form.post('/admin/product-categories');
  }
}

function cancel() {
  if (form.parent_id) {
    router.get(`/admin/product-categories/${form.parent_id}/edit`);
  } else {
    router.get('/admin/product-categories');
  }
}
</script>
