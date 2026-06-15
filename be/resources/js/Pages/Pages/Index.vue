<template>
  <CrmLayout title="Quản lý Trang tĩnh">
    <div class="bg-white p-6 rounded-xl border border-gray-150 shadow-xs space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <a-input-search
            v-model:value="search"
            placeholder="Tìm theo tiêu đề hoặc slug..."
            style="width: 260px"
            @search="handleSearch"
            allow-clear
          />
        </div>
        <a-button type="primary" class="bg-emerald-700 hover:bg-emerald-800 border-none flex items-center gap-1.5 h-10 font-bold" @click="goToCreate">
          <template #icon>
            <plus-outlined />
          </template>
          Thêm trang tĩnh mới
        </a-button>
      </div>

      <a-table
        :columns="columns"
        :data-source="pages.data"
        :row-key="record => record.id"
        :pagination="false"
        bordered
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'title'">
            <div class="font-bold text-gray-800">{{ record.title?.vi }}</div>
            <div class="text-xs text-gray-400 italic">{{ record.title?.en }}</div>
          </template>
          <template v-else-if="column.key === 'slug'">
            <a-tag color="blue" class="font-mono">{{ record.slug }}</a-tag>
          </template>
          <template v-else-if="column.key === 'action'">
            <a-space size="middle">
              <a-button type="link" class="text-emerald-700 hover:text-emerald-800 p-0 font-semibold" @click="editPage(record)">
                Sửa
              </a-button>
              <a-popconfirm
                title="Bạn có chắc chắn muốn xóa trang tĩnh này?"
                ok-text="Xóa"
                cancel-text="Hủy"
                @confirm="deletePage(record.id)"
              >
                <a-button type="link" danger class="p-0 font-semibold">Xóa</a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>

      <div class="flex justify-end pt-4" v-if="pages.total > 0">
        <a-pagination
          v-model:current="currentPage"
          v-model:pageSize="pageSize"
          :total="pages.total"
          :show-total="total => `Tổng cộng ${total} trang`"
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
  pages: Object,
  filters: Object,
});

const search = ref(props.filters.search || '');
const currentPage = ref(props.pages.current_page);
const pageSize = ref(props.pages.per_page);

const columns = [
  { title: 'Tiêu đề trang', key: 'title', dataIndex: 'title' },
  { title: 'Đường dẫn (Slug)', key: 'slug', dataIndex: 'slug', width: '25%' },
  { title: 'Hành động', key: 'action', width: '15%', align: 'right' },
];

function handleSearch() {
  router.get('/admin/pages', { search: search.value }, { preserveState: true });
}

function handlePageChange(page) {
  router.get('/admin/pages', { search: search.value, page }, { preserveState: true });
}

function goToCreate() {
  router.get('/admin/pages/create');
}

function editPage(record) {
  router.get(`/admin/pages/${record.id}/edit`);
}

function deletePage(id) {
  router.delete(`/admin/pages/${id}`);
}
</script>
