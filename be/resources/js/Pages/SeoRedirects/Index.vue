<template>
  <CrmLayout title="SEO Redirects (Chuyển hướng liên kết)">
    <div class="bg-white p-6 rounded-xl border border-gray-150 shadow-xs space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <a-input-search
            v-model:value="search"
            placeholder="Tìm theo URL nguồn hoặc đích..."
            style="width: 260px"
            @search="handleSearch"
            allow-clear
          />
        </div>
        <a-button type="primary" class="bg-emerald-700 hover:bg-emerald-800 border-none flex items-center gap-1.5 h-10 font-bold" @click="goToCreate">
          <template #icon>
            <plus-outlined />
          </template>
          Thêm quy tắc chuyển hướng
        </a-button>
      </div>

      <a-table
        :columns="columns"
        :data-source="redirects.data"
        :row-key="record => record.id"
        :pagination="false"
        bordered
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'source_url'">
            <span class="font-mono text-xs text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-100">{{ record.source_url }}</span>
          </template>
          <template v-else-if="column.key === 'target_url'">
            <span class="font-mono text-xs text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-150">{{ record.target_url }}</span>
          </template>
          <template v-else-if="column.key === 'http_code'">
            <a-tag :color="record.http_code == 301 ? 'green' : 'orange'">
              {{ record.http_code }} ({{ record.http_code == 301 ? 'Permanent' : 'Temporary' }})
            </a-tag>
          </template>
          <template v-else-if="column.key === 'action'">
            <a-space size="middle">
              <a-button type="link" class="text-emerald-700 hover:text-emerald-800 p-0 font-semibold" @click="editRedirect(record)">
                Sửa
              </a-button>
              <a-popconfirm
                title="Bạn có chắc chắn muốn xóa quy tắc chuyển hướng này?"
                ok-text="Xóa"
                cancel-text="Hủy"
                @confirm="deleteRedirect(record.id)"
              >
                <a-button type="link" danger class="p-0 font-semibold">Xóa</a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>

      <div class="flex justify-end pt-4" v-if="redirects.total > 0">
        <a-pagination
          v-model:current="currentPage"
          v-model:pageSize="pageSize"
          :total="redirects.total"
          :show-total="total => `Tổng cộng ${total} quy tắc`"
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
  redirects: Object,
  filters: Object,
});

const search = ref(props.filters.search || '');
const currentPage = ref(props.redirects.current_page);
const pageSize = ref(props.redirects.per_page);

const columns = [
  { title: 'Đường dẫn nguồn (Source Path)', key: 'source_url', dataIndex: 'source_url', width: '35%' },
  { title: 'Đường dẫn đích (Target Path / URL)', key: 'target_url', dataIndex: 'target_url', width: '35%' },
  { title: 'HTTP Code', key: 'http_code', dataIndex: 'http_code', width: '15%' },
  { title: 'Hành động', key: 'action', width: '15%', align: 'right' },
];

function handleSearch() {
  router.get('/admin/seo-redirects', { search: search.value }, { preserveState: true });
}

function handlePageChange(page) {
  router.get('/admin/seo-redirects', { search: search.value, page }, { preserveState: true });
}

function goToCreate() {
  router.get('/admin/seo-redirects/create');
}

function editRedirect(record) {
  router.get(`/admin/seo-redirects/${record.id}/edit`);
}

function deleteRedirect(id) {
  router.delete(`/admin/seo-redirects/${id}`);
}
</script>
