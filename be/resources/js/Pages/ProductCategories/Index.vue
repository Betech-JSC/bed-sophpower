<template>
  <CrmLayout title="Quản lý Danh mục Sản phẩm">
    <div class="bg-white p-6 rounded-xl border border-gray-150 shadow-xs space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="flex flex-wrap items-center gap-3">
          <a-input-search
            v-model:value="search"
            placeholder="Tìm theo tên hoặc slug..."
            style="width: 260px"
            @search="handleSearch"
            allow-clear
          />
          <a-select
            v-model:value="selectedType"
            placeholder="Lọc theo loại"
            style="width: 180px"
            @change="handleSearch"
            allow-clear
          >
            <a-select-option value="food">Thực phẩm (Food)</a-select-option>
            <a-select-option value="cosmetic">Mỹ phẩm (Cosmetic)</a-select-option>
          </a-select>
        </div>
        <a-button type="primary" class="bg-emerald-700 hover:bg-emerald-800 border-none flex items-center gap-1.5 h-10 font-bold" @click="goToCreate">
          <template #icon>
            <plus-outlined />
          </template>
          Thêm danh mục mới
        </a-button>
      </div>

      <a-table
        :columns="columns"
        :data-source="categories.data"
        :row-key="record => record.id"
        :pagination="false"
        bordered
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <div class="font-bold text-gray-800">{{ record.name?.vi }}</div>
            <div class="text-xs text-gray-400 italic">{{ record.name?.en }}</div>
          </template>
          <template v-else-if="column.key === 'type'">
            <a-tag :color="record.type === 'food' ? 'green' : 'orange'">
              {{ record.type === 'food' ? 'Thực phẩm' : 'Mỹ phẩm' }}
            </a-tag>
          </template>
          <template v-else-if="column.key === 'action'">
            <a-space size="middle">
              <a-button type="link" class="text-emerald-700 hover:text-emerald-800 p-0 font-semibold" @click="editCategory(record)">
                Sửa
              </a-button>
              <a-popconfirm
                title="Bạn có chắc chắn muốn xóa danh mục này? Các sản phẩm thuộc danh mục này sẽ chuyển sang không có danh mục."
                ok-text="Xóa"
                cancel-text="Hủy"
                @confirm="deleteCategory(record.id)"
              >
                <a-button type="link" danger class="p-0 font-semibold">Xóa</a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>

      <div class="flex justify-end pt-4" v-if="categories.total > 0">
        <a-pagination
          v-model:current="currentPage"
          v-model:pageSize="pageSize"
          :total="categories.total"
          :show-total="total => `Tổng cộng ${total} danh mục`"
          @change="handlePageChange"
        />
      </div>
    </div>
  </CrmLayout>
</template>

<script setup>
import CrmLayout from '@/Layouts/CrmLayout.vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import { router } from '@inertiajs/vue3';
import { ref } from 'vue';

const props = defineProps({
  categories: Object,
  filters: Object,
});

const search = ref(props.filters.search || '');
const selectedType = ref(props.filters.type || undefined);
const currentPage = ref(props.categories.current_page);
const pageSize = ref(props.categories.per_page);

const columns = [
  { title: 'Tên danh mục', key: 'name', width: '35%' },
  { title: 'Slug', dataIndex: 'slug', key: 'slug', width: '30%' },
  { title: 'Loại sản phẩm', key: 'type', width: '20%' },
  { title: 'Hành động', key: 'action', width: '15%', align: 'right' },
];

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
