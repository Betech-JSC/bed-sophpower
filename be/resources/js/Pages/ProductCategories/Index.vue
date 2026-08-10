<template>
  <CrmLayout title="Quản lý Danh mục Sản phẩm">
    <div class="space-y-6">
      
      <!-- Chú thích hướng dẫn người dùng -->
      <div class="bg-gradient-to-r from-emerald-900 to-teal-900 text-white p-5 rounded-2xl shadow-xl flex items-start gap-4 border border-emerald-800/50">
        <div class="p-3 bg-white/10 rounded-xl text-2xl shrink-0">🌐</div>
        <div class="space-y-1 flex-1">
          <div class="flex items-center gap-2">
            <h3 class="text-sm font-bold uppercase tracking-wider text-emerald-300">Quản lý Danh mục Sản phẩm Gốc</h3>
            <span class="text-[10px] font-extrabold bg-emerald-400/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-400/30">HỆ THỐNG ĐỘNG</span>
          </div>
          <p class="text-xs text-emerald-100/90 leading-relaxed">
            Danh sách dưới đây liệt kê các <strong>Danh mục Gốc Cấp 1</strong> sẽ tự động xuất hiện làm nút <strong>Menu chính trên thanh Header Website</strong>. 
            Để xem hoặc thêm bớt các danh mục con (Cấp 2 & Cấp 3), hãy nhấp vào nút <span class="bg-white/20 text-white px-2 py-0.5 rounded font-bold">📂 Quản lý danh mục con</span> trên từng dòng tương ứng.
          </p>
        </div>
      </div>

      <!-- Main Container -->
      <div class="bg-white p-6 rounded-2xl border border-gray-150 shadow-xs space-y-6">
        <!-- Top Toolbar -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex flex-wrap items-center gap-3">
            <a-input-search
              v-model:value="search"
              placeholder="Tìm theo tên danh mục..."
              style="width: 280px"
              @search="handleSearch"
              allow-clear
              size="large"
            />
          </div>

          <a-button type="primary" class="bg-emerald-700 hover:bg-emerald-800 border-none flex items-center gap-1.5 h-11 font-bold px-5" @click="goToCreate">
            <template #icon>
              <plus-outlined />
            </template>
            Tạo Danh mục Gốc Mới (Header)
          </a-button>
        </div>

        <!-- BẢNG GỌN GÀNG SẠCH SẼ (CLEAN TABLE) -->
        <a-table
          :columns="columns"
          :data-source="categories.data"
          :row-key="record => record.id"
          :pagination="false"
          bordered
        >
          <template #bodyCell="{ column, record }">
            <!-- Cột 1: Tên Danh mục Gốc Cấp 1 -->
            <template v-if="column.key === 'name'">
              <div class="flex items-center gap-3 py-1">
                <span class="text-2xl">🌐</span>
                <div>
                  <div class="font-bold text-gray-900 text-base">{{ record.name?.vi }}</div>
                  <div class="text-xs text-gray-400 italic">{{ record.name?.en }}</div>
                </div>
              </div>
            </template>

            <!-- Cột 3: Thứ tự hiển thị -->
            <template v-else-if="column.key === 'sort_order'">
              <div class="flex items-center justify-center">
                <a-input-number 
                  v-model:value="record.sort_order" 
                  :min="0" 
                  style="width: 75px" 
                  size="small"
                  @change="updateSortOrder(record)"
                />
              </div>
            </template>

            <!-- Cột 4: Quản lý Danh mục Con -->
            <template v-else-if="column.key === 'children_summary'">
              <div class="flex items-center gap-3">
                <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200 whitespace-nowrap shrink-0">
                  📂 {{ getChildrenCount(record) }} danh mục con
                </span>

                <a-button 
                  size="small" 
                  class="text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border-emerald-300 flex items-center gap-1.5 h-8 px-3 whitespace-nowrap shrink-0"
                  @click="openManageModal(record)"
                >
                  <span>📂 Quản lý & Thêm danh mục con</span>
                </a-button>
              </div>
            </template>

            <!-- Cột 5: Hành động -->
            <template v-else-if="column.key === 'action'">
              <div class="flex items-center justify-end gap-3">
                <a-button type="link" class="text-emerald-700 hover:text-emerald-800 font-bold p-0" @click="editCategory(record)">
                  Sửa
                </a-button>
                <span class="text-gray-200">|</span>
                <a-popconfirm
                  title="Xóa danh mục gốc này sẽ hủy toàn bộ danh mục con bên trong. Bạn có chắc chắn muốn xóa?"
                  ok-text="Xóa"
                  cancel-text="Hủy"
                  @confirm="deleteCategory(record.id)"
                >
                  <a-button type="link" danger class="font-bold p-0">Xóa</a-button>
                </a-popconfirm>
              </div>
            </template>
          </template>
        </a-table>

        <!-- Pagination -->
        <div class="flex justify-end pt-4" v-if="categories.total > 0">
          <a-pagination
            v-model:current="currentPage"
            v-model:pageSize="pageSize"
            :total="categories.total"
            :show-total="total => `Tổng cộng ${total} danh mục gốc`"
            @change="handlePageChange"
          />
        </div>
      </div>

      <!-- MODAL QUẢN LÝ CÂY DANH MỤC CON (CẤP 2 & CẤP 3) -->
      <a-modal
        v-model:open="manageModalVisible"
        :title="`Cây Danh mục Con của '${activeParentCategory?.name?.vi}'`"
        width="800px"
        :footer="null"
        destroyOnClose
        centered
      >
        <div class="py-4 space-y-6">
          <div class="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <div class="space-y-0.5">
              <h4 class="text-sm font-bold text-emerald-950">Danh mục Gốc: {{ activeParentCategory?.name?.vi }}</h4>
              <p class="text-xs text-emerald-800">Quản lý trực quan các danh mục Cấp 2 và Cấp 3 dưới đây.</p>
            </div>
            <a-button 
              type="primary" 
              class="bg-emerald-700 hover:bg-emerald-800 border-none font-bold text-xs flex items-center gap-1"
              @click="openBulkModal(activeParentCategory, 2)"
            >
              <plus-outlined /> Thêm danh mục Cấp 2
            </a-button>
          </div>

          <!-- Tree List inside Modal -->
          <div class="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            <div v-if="activeParentCategory?.children && activeParentCategory.children.length > 0" class="space-y-3">
              <div 
                v-for="child in activeParentCategory.children" 
                :key="child.id"
                class="p-4 rounded-xl border border-gray-200 bg-slate-50/80 space-y-3 hover:border-blue-300 transition-colors"
              >
                <!-- Level 2 Card Header -->
                <div class="flex items-center justify-between border-b border-gray-200/80 pb-2">
                  <div class="flex items-center gap-2">
                    <span class="text-blue-600 font-bold text-base">📂</span>
                    <span class="font-bold text-gray-900 text-sm">{{ child.name?.vi }}</span>
                    <span class="text-[10px] font-extrabold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">CẤP 2</span>
                  </div>

                  <div class="flex items-center gap-2">
                    <a-button 
                      size="small"
                      class="text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border-purple-200 flex items-center gap-1"
                      @click="openBulkModal(child, 3, activeParentCategory)"
                    >
                      <plus-outlined /> Thêm Cấp 3
                    </a-button>

                    <a-button type="link" class="text-blue-600 font-bold p-0 text-xs" @click="editCategory(child)">Sửa</a-button>
                    <span class="text-gray-300">|</span>
                    <a-popconfirm title="Xóa danh mục Cấp 2 này?" ok-text="Xóa" cancel-text="Hủy" @confirm="deleteCategory(child.id)">
                      <a-button type="link" danger class="font-bold p-0 text-xs">Xóa</a-button>
                    </a-popconfirm>
                  </div>
                </div>

                <!-- Level 3 Subchildren Grid -->
                <div class="pl-4 border-l-2 border-purple-200 space-y-2">
                  <div className="text-[11px] font-bold text-purple-700 uppercase tracking-wider">Danh mục Cấp 3 thuộc "{{ child.name?.vi }}":</div>
                  
                  <div v-if="child.children && child.children.length > 0" class="flex flex-wrap gap-2">
                    <div 
                      v-for="subChild in child.children" 
                      :key="subChild.id"
                      class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-purple-900 border border-purple-200 shadow-2xs group"
                    >
                      <span>📄 {{ subChild.name?.vi }}</span>
                      <div class="flex items-center gap-1 ml-1 opacity-80 group-hover:opacity-100">
                        <button type="button" @click="editCategory(subChild)" class="text-purple-600 hover:text-purple-900 text-[11px] font-bold cursor-pointer">✎</button>
                        <button type="button" @click="deleteCategory(subChild.id)" class="text-red-400 hover:text-red-600 text-[11px] font-bold cursor-pointer">✕</button>
                      </div>
                    </div>
                  </div>

                  <div v-else class="text-xs text-gray-400 italic">
                    Chưa có danh mục Cấp 3. Nhấp nút "+ Thêm Cấp 3" ở trên để thêm.
                  </div>
                </div>
              </div>
            </div>

            <div v-else class="py-8 text-center text-gray-400 space-y-2">
              <p class="text-sm font-semibold">Chưa có danh mục con Cấp 2 nào.</p>
              <a-button 
                type="primary" 
                class="bg-emerald-700 hover:bg-emerald-800 border-none font-bold text-xs"
                @click="openBulkModal(activeParentCategory, 2)"
              >
                + Thêm danh mục Cấp 2 đầu tiên
              </a-button>
            </div>
          </div>

          <div class="flex justify-end pt-4 border-t border-gray-100">
            <a-button @click="manageModalVisible = false">Đóng</a-button>
          </div>
        </div>
      </a-modal>

      <!-- MODAL THÊM HÀNG LOẠT DANH MỤC CON / PHỤ -->
      <a-modal
        v-model:open="bulkModalVisible"
        :title="bulkTargetLevel === 3 ? `Thêm danh mục Cấp 3 cho '${selectedParentCategory?.name?.vi}'` : `Thêm danh mục Cấp 2 cho '${selectedParentCategory?.name?.vi}'`"
        width="750px"
        :footer="null"
        destroyOnClose
        centered
      >
        <div class="py-4 space-y-6">
          
          <!-- Path Indicator Box -->
          <div class="p-3.5 rounded-xl border flex items-center gap-2 text-xs font-semibold" :class="bulkTargetLevel === 3 ? 'bg-purple-50 border-purple-200 text-purple-900' : 'bg-blue-50 border-blue-200 text-blue-900'">
            <span>Vị trí phân cấp:</span>
            <span class="font-bold text-emerald-700">🌐 {{ rootParentCategory ? rootParentCategory.name?.vi : selectedParentCategory?.name?.vi }}</span>
            <template v-if="bulkTargetLevel === 3">
              <span>›</span>
              <span class="font-bold text-blue-700">📂 {{ selectedParentCategory?.name?.vi }}</span>
            </template>
            <span>›</span>
            <span class="font-black underline decoration-2" :class="bulkTargetLevel === 3 ? 'text-purple-700 decoration-purple-500' : 'text-blue-700 decoration-blue-500'">
              [Nhập các danh mục Cấp {{ bulkTargetLevel }} mới]
            </span>
          </div>

          <!-- List of Child Item Inputs -->
          <div class="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
            <div 
              v-for="(item, index) in bulkForm.items" 
              :key="index"
              class="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-3 relative group hover:border-emerald-400 transition-colors"
            >
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold uppercase" :class="bulkTargetLevel === 3 ? 'text-purple-700' : 'text-blue-700'">
                  Danh mục Cấp {{ bulkTargetLevel }} #{{ index + 1 }}
                </span>
                <button 
                  v-if="bulkForm.items.length > 1"
                  type="button" 
                  @click="removeBulkRow(index)"
                  class="text-xs text-red-500 hover:text-red-700 font-semibold cursor-pointer"
                >
                  ✕ Xóa dòng này
                </button>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Tên Tiếng Việt *</label>
                  <a-input v-model:value="item.name.vi" :placeholder="bulkTargetLevel === 3 ? 'Ví dụ: Chất bảo quản, Chất tạo màu...' : 'Ví dụ: Phụ gia thực phẩm, Bột trái cây...'" />
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Tên Tiếng Anh</label>
                  <a-input v-model:value="item.name.en" placeholder="Ví dụ: Preservatives..." />
                </div>
              </div>
            </div>
          </div>

          <!-- Add Row Button -->
          <div class="flex justify-start">
            <a-button type="dashed" class="w-full border-emerald-300 text-emerald-700 hover:text-emerald-800 font-bold" @click="addBulkRow">
              + Thêm một dòng danh mục Cấp {{ bulkTargetLevel }} mới
            </a-button>
          </div>

          <!-- Modal Footer Actions -->
          <div class="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <a-button @click="bulkModalVisible = false">Hủy bỏ</a-button>
            <a-button type="primary" class="bg-emerald-700 hover:bg-emerald-800 border-none font-bold" :loading="bulkSubmitting" @click="submitBulkChildren(false)">
              Lưu toàn bộ danh mục Cấp {{ bulkTargetLevel }}
            </a-button>
          </div>
        </div>
      </a-modal>

      <!-- MODAL POPUP CẢNH BÁO TRÙNG LẶP (CONFLICT WARNING MODAL) -->
      <a-modal
        v-model:open="conflictModalVisible"
        title="⚠️ Phát hiện Danh mục bị Trùng lặp!"
        width="600px"
        :footer="null"
        centered
      >
        <div class="py-4 space-y-5">
          <div class="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
            <h4 class="text-sm font-bold text-amber-900">Một số danh mục bạn vừa nhập đã tồn tại dưới danh mục cha khác:</h4>
            <p class="text-xs text-amber-800">
              Để tránh làm nhiễu dữ liệu hiển thị trên Website, vui lòng kiểm tra các danh mục trùng dưới đây:
            </p>
          </div>

          <!-- Conflict List -->
          <div class="space-y-2 max-h-48 overflow-y-auto">
            <div 
              v-for="c in conflictList" 
              :key="c.index"
              class="p-3 bg-red-50/60 border border-red-200 rounded-lg flex items-center justify-between text-xs"
            >
              <div>
                <span class="font-bold text-red-900">"{{ c.name_vi }}"</span>
              </div>
              <div class="text-gray-600 font-medium">
                Đã tồn tại trong: <span class="font-bold text-blue-700">{{ c.existing_parent_name }}</span>
              </div>
            </div>
          </div>

          <div class="text-xs text-gray-500 italic">
            Bạn muốn quay lại sửa tên hay Bỏ qua dòng bị trùng để tiếp tục lưu các dòng khác?
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <a-button @click="conflictModalVisible = false">
              Quay lại sửa tên
            </a-button>
            <a-button type="primary" class="bg-amber-600 hover:bg-amber-700 border-none font-bold text-white" @click="submitBulkChildren(true)">
              Bỏ qua trùng & Tiếp tục lưu các dòng hợp lệ
            </a-button>
          </div>
        </div>
      </a-modal>

    </div>
  </CrmLayout>
</template>

<script setup>
import CrmLayout from '@/Layouts/CrmLayout.vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import { router } from '@inertiajs/vue3';
import { ref } from 'vue';
import axios from 'axios';
import { message } from 'ant-design-vue';

const props = defineProps({
  categories: Object,
  filters: Object,
});

const search = ref(props.filters.search || '');
const selectedType = ref(props.filters.type || undefined);
const currentPage = ref(props.categories.current_page);
const pageSize = ref(props.categories.per_page);

const columns = [
  { title: 'Danh mục Gốc (Menu Header)', key: 'name', width: '35%' },
  { title: 'Thứ tự (Header)', key: 'sort_order', width: '15%', align: 'center' },
  { title: 'Danh mục con & phụ', key: 'children_summary', width: '35%' },
  { title: 'Hành động', key: 'action', width: '15%', align: 'right' },
];

async function updateSortOrder(record) {
  try {
    await axios.patch(`/admin/product-categories/${record.id}/sort-order`, {
      sort_order: record.sort_order,
    });
    message.success(`Đã cập nhật thứ tự hiển thị của '${record.name?.vi}'!`);
  } catch (error) {
    message.error('Có lỗi khi cập nhật thứ tự hiển thị.');
  }
}

// Manage Modal State
const manageModalVisible = ref(false);
const activeParentCategory = ref(null);

function openManageModal(record) {
  activeParentCategory.value = record;
  manageModalVisible.value = true;
}

function getChildrenCount(record) {
  if (!record.children) return 0;
  let total = record.children.length;
  record.children.forEach(c => {
    if (c.children) total += c.children.length;
  });
  return total;
}

// Bulk Modal State
const bulkModalVisible = ref(false);
const selectedParentCategory = ref(null);
const rootParentCategory = ref(null);
const bulkTargetLevel = ref(2);
const bulkSubmitting = ref(false);
const bulkForm = ref({
  items: [
    { name: { vi: '', en: '' }, slug: '' }
  ]
});

// Conflict Warning Modal State
const conflictModalVisible = ref(false);
const conflictList = ref([]);

function openBulkModal(parentCategory, targetLevel = 2, rootParent = null) {
  selectedParentCategory.value = parentCategory;
  rootParentCategory.value = rootParent;
  bulkTargetLevel.value = targetLevel;
  bulkForm.value = {
    items: [
      { name: { vi: '', en: '' }, slug: '' },
      { name: { vi: '', en: '' }, slug: '' }
    ]
  };
  bulkModalVisible.value = true;
}

function addBulkRow() {
  bulkForm.value.items.push({ name: { vi: '', en: '' }, slug: '' });
}

function removeBulkRow(index) {
  bulkForm.value.items.splice(index, 1);
}

async function submitBulkChildren(forceSave = false) {
  if (!selectedParentCategory.value) return;

  // Filter out empty rows
  const validRows = bulkForm.value.items.filter(row => row.name.vi && row.name.vi.trim().length > 0);
  if (validRows.length === 0) {
    message.warning('Vui lòng nhập ít nhất 1 tên danh mục Tiếng Việt!');
    return;
  }

  bulkSubmitting.value = true;

  try {
    const res = await axios.post(`/admin/product-categories/${selectedParentCategory.value.id}/bulk-children`, {
      items: validRows,
      force_save: forceSave,
    });

    bulkSubmitting.value = false;
    bulkModalVisible.value = false;
    conflictModalVisible.value = false;
    message.success(`Đã thêm thành công các danh mục Cấp ${bulkTargetLevel.value}!`);
    router.reload({ preserveState: true });
  } catch (error) {
    bulkSubmitting.value = false;
    if (error.response && error.response.status === 422 && error.response.data.has_conflicts) {
      conflictList.value = error.response.data.conflicts;
      conflictModalVisible.value = true;
    } else {
      const msg = error.response?.data?.message || 'Có lỗi xảy ra khi lưu danh mục.';
      message.error(msg);
    }
  }
}

function handleSearch() {
  router.get('/admin/product-categories', {
    search: search.value,
    type: selectedType.value
  }, { preserveState: true });
}

function handlePageChange(page) {
  router.get('/admin/product-categories', {
    search: search.value,
    type: selectedType.value,
    page
  }, { preserveState: true });
}

function goToCreate() {
  router.get('/admin/product-categories/create');
}

function editCategory(record) {
  router.get(`/admin/product-categories/${record.id}/edit`);
}

function deleteCategory(id) {
  router.delete(`/admin/product-categories/${id}`);
}
</script>
