<template>
  <CrmLayout title="Nhật ký hoạt động hệ thống">
    <div class="bg-white p-6 rounded-xl border border-gray-150 shadow-xs space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <a-input-search
            v-model:value="search"
            placeholder="Tìm theo mô tả, hành động, IP..."
            style="width: 280px"
            @search="handleSearch"
            allow-clear
          />
        </div>
      </div>

      <a-table
        :columns="columns"
        :data-source="logs.data"
        :row-key="record => record.id"
        :pagination="false"
        bordered
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'user'">
            <div class="font-bold text-gray-800">{{ record.user?.name || 'Hệ thống' }}</div>
            <div class="text-[10px] text-gray-400 font-mono">{{ record.user?.email }}</div>
          </template>
          <template v-else-if="column.key === 'action'">
            <a-tag :color="actionColor(record.action)" class="font-mono text-xs">
              {{ record.action }}
            </a-tag>
          </template>
          <template v-else-if="column.key === 'created_at'">
            <span class="text-xs text-gray-500 font-medium">{{ formatDate(record.created_at) }}</span>
          </template>
          <template v-else-if="column.key === 'meta'">
            <div class="text-xs text-gray-650">
              <span class="font-semibold text-gray-500 block">IP: <span class="font-mono text-gray-800">{{ record.ip_address || 'N/A' }}</span></span>
              <span class="truncate block max-w-xs text-[10px] text-gray-400" :title="record.user_agent">UA: {{ record.user_agent || 'N/A' }}</span>
            </div>
          </template>
        </template>
      </a-table>

      <div class="flex justify-end pt-4" v-if="logs.total > 0">
        <a-pagination
          v-model:current="currentPage"
          v-model:pageSize="pageSize"
          :total="logs.total"
          :show-total="total => `Tổng cộng ${total} nhật ký`"
          @change="handlePageChange"
        />
      </div>
    </div>
  </CrmLayout>
</template>

<script setup>
import CrmLayout from '@/Layouts/CrmLayout.vue';
import { router } from '@inertiajs/vue3';
import { ref } from 'vue';

const props = defineProps({
  logs: Object,
  filters: Object,
});

const search = ref(props.filters.search || '');
const currentPage = ref(props.logs.current_page);
const pageSize = ref(props.logs.per_page);

const columns = [
  { title: 'Thời gian', key: 'created_at', width: '15%' },
  { title: 'Quản trị viên', key: 'user', width: '20%' },
  { title: 'Hành động', key: 'action', width: '15%' },
  { title: 'Mô tả hoạt động', key: 'description', dataIndex: 'description', width: '30%' },
  { title: 'Chi tiết thiết bị', key: 'meta', width: '20%' },
];

function handleSearch() {
  router.get('/admin/activity-logs', { search: search.value }, { preserveState: true });
}

function handlePageChange(page) {
  router.get('/admin/activity-logs', { search: search.value, page }, { preserveState: true });
}

function actionColor(action) {
  if (action.startsWith('create')) return 'green';
  if (action.startsWith('update')) return 'blue';
  if (action.startsWith('delete')) return 'red';
  return 'default';
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}
</script>
