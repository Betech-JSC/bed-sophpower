<template>
  <CrmLayout title="Quản lý sản phẩm">
    <div class="bg-white p-6 rounded-xl border border-gray-150 shadow-xs space-y-6">
      <!-- Top Filters & Actions Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <!-- Search and Filter -->
        <div class="flex flex-wrap items-center gap-3">
          <a-input-search
            v-model:value="search"
            placeholder="Tìm theo tên sản phẩm..."
            style="width: 260px"
            @search="handleSearch"
            allow-clear
          />
          
          <a-select
            v-model:value="categoryId"
            placeholder="Lọc theo danh mục..."
            class="min-w-[240px] sm:min-w-[300px]"
            :dropdown-match-select-width="false"
            @change="handleFilterChange"
            allow-clear
          >
            <a-select-option v-for="cat in formattedCategories" :key="cat.id" :value="cat.id">
              {{ cat.label }}
            </a-select-option>
          </a-select>
        </div>

        <!-- Create Button -->
        <a-button type="primary" class="bg-emerald-700 hover:bg-emerald-800 border-none flex items-center gap-1.5 h-10 font-bold" @click="goToCreate">
          <template #icon>
            <plus-outlined />
          </template>
          Thêm sản phẩm mới
        </a-button>
      </div>

      <!-- Products Ant Design Table -->
      <a-table
        :columns="columns"
        :data-source="products.data"
        :row-key="record => record.id"
        :pagination="false"
        :loading="loading"
        bordered
      >
        <!-- Custom image column -->
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'image'">
            <div class="w-12 h-12 rounded border border-gray-200 overflow-hidden bg-gray-55 flex items-center justify-center">
              <img :src="record.image" alt="Product Image" class="w-full h-full object-cover" v-if="record.image" />
              <span class="text-xs text-gray-400" v-else>No img</span>
            </div>
          </template>

          <!-- Name Column -->
          <template v-else-if="column.key === 'name'">
            <div class="font-bold text-gray-800">{{ record.name?.vi || record.name }}</div>
            <div class="text-xs text-gray-400 italic">{{ record.name?.en }}</div>
          </template>

          <!-- Category Column -->
          <template v-else-if="column.key === 'category'">
            <div>{{ record.category?.vi || record.category }}</div>
            <div class="text-xs text-gray-400 italic">{{ record.category?.en }}</div>
          </template>

          <!-- Type Column -->
          <template v-else-if="column.key === 'type'">
            <a-tag :color="record.type === 'food' ? 'green' : 'blue'">
              {{ record.type === 'food' ? 'F&B Ingredients' : 'Cosmetics' }}
            </a-tag>
          </template>

          <!-- Specs Column -->
          <template v-else-if="column.key === 'specs'">
            <div class="space-y-1.5 max-w-xs py-1">
              <div v-if="record.specs?.vi && record.specs.vi.length" class="flex flex-wrap gap-1">
                <span class="text-[10px] font-bold text-gray-400 uppercase mr-1">VI:</span>
                <a-tag v-for="(spec, i) in record.specs.vi" :key="i" color="default" class="text-xs">
                  {{ spec }}
                </a-tag>
              </div>
              <div v-if="record.specs?.en && record.specs.en.length" class="flex flex-wrap gap-1">
                <span class="text-[10px] font-bold text-gray-400 uppercase mr-1">EN:</span>
                <a-tag v-for="(spec, i) in record.specs.en" :key="i" color="default" class="text-xs">
                  {{ spec }}
                </a-tag>
              </div>
              <div v-if="!record.specs?.vi && !record.specs?.en && Array.isArray(record.specs)" class="flex flex-wrap gap-1">
                <a-tag v-for="(spec, i) in record.specs" :key="i" color="default" class="text-xs">
                  {{ spec }}
                </a-tag>
              </div>
            </div>
          </template>

          <!-- Packaging Column -->
          <template v-else-if="column.key === 'packaging'">
            <div>{{ record.packaging?.vi || record.packaging }}</div>
            <div class="text-xs text-gray-400 italic">{{ record.packaging?.en }}</div>
          </template>

          <!-- Action Column -->
          <template v-else-if="column.key === 'action'">
            <a-space size="middle">
              <a-button type="link" class="text-emerald-700 hover:text-emerald-800 p-0 font-semibold" @click="editProduct(record)">
                Sửa
              </a-button>
              <a-popconfirm
                title="Bạn có chắc chắn muốn xóa sản phẩm này?"
                ok-text="Xóa"
                cancel-text="Hủy"
                @confirm="deleteProduct(record.id)"
              >
                <a-button type="link" danger class="p-0 font-semibold">Xóa</a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>

      <!-- Pagination Footer -->
      <div class="flex justify-end pt-4" v-if="products.total > 0">
        <a-pagination
          v-model:current="currentPage"
          v-model:pageSize="pageSize"
          :total="products.total"
          :show-total="total => `Tổng cộng ${total} sản phẩm`"
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
import { ref, computed, watch } from 'vue';

const props = defineProps({
  products: Object,
  categories: {
    type: Array,
    default: () => [],
  },
  filters: Object,
});

const search = ref(props.filters.search || '');
const categoryId = ref(props.filters.category_id ? Number(props.filters.category_id) : undefined);
const currentPage = ref(props.products.current_page);
const pageSize = ref(props.products.per_page);
const loading = ref(false);

const formattedCategories = computed(() => {
  const result = [];
  if (!props.categories) return result;

  props.categories.forEach(root => {
    result.push({
      id: root.id,
      label: `📁 ${root.name?.vi || root.name}`,
      isRoot: true,
    });

    if (root.children && root.children.length > 0) {
      root.children.forEach(child => {
        result.push({
          id: child.id,
          label: `├── 📂 ${child.name?.vi || child.name}`,
          isRoot: false,
        });

        if (child.children && child.children.length > 0) {
          child.children.forEach(subchild => {
            result.push({
              id: subchild.id,
              label: `│   └── 📄 ${subchild.name?.vi || subchild.name}`,
              isRoot: false,
            });
          });
        }
      });
    }
  });

  return result;
});

const columns = [
  {
    title: 'Hình ảnh',
    dataIndex: 'image',
    key: 'image',
    width: 80,
    align: 'center',
  },
  {
    title: 'Tên sản phẩm',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => (a.name?.vi || a.name || '').localeCompare(b.name?.vi || b.name || ''),
  },
  {
    title: 'Danh mục',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Phân loại',
    dataIndex: 'type',
    key: 'type',
    width: 140,
  },
  {
    title: 'Thông số kỹ thuật',
    dataIndex: 'specs',
    key: 'specs',
  },
  {
    title: 'Quy cách',
    dataIndex: 'packaging',
    key: 'packaging',
  },
  {
    title: 'Thao tác',
    key: 'action',
    width: 120,
    align: 'center',
  },
];

function goToCreate() {
  router.get('/admin/products/create');
}

function editProduct(product) {
  router.get(`/admin/products/${product.id}/edit`);
}

function deleteProduct(id) {
  router.delete(`/admin/products/${id}`);
}

function handleSearch(val) {
  loading.value = true;
  router.get(
    '/admin/products',
    { search: val, category_id: categoryId.value, page: 1 },
    {
      preserveState: true,
      onFinish: () => {
        loading.value = false;
      },
    }
  );
}

function handleFilterChange() {
  loading.value = true;
  router.get(
    '/admin/products',
    { search: search.value, category_id: categoryId.value, page: 1 },
    {
      preserveState: true,
      onFinish: () => {
        loading.value = false;
      },
    }
  );
}

function handlePageChange(page) {
  loading.value = true;
  router.get(
    '/admin/products',
    { search: search.value, category_id: categoryId.value, page: page },
    {
      onFinish: () => {
        loading.value = false;
      },
    }
  );
}

watch(
  () => props.products.current_page,
  (newPage) => {
    currentPage.value = newPage;
  }
);
</script>
