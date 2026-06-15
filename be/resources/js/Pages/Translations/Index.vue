<template>
  <CrmLayout title="Quản lý Nhãn dịch Tĩnh">
    <div class="bg-white p-6 rounded-xl border border-gray-150 shadow-xs space-y-6">
      <!-- Search & Filters -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="flex flex-wrap items-center gap-3">
          <!-- Search input -->
          <a-input-search
            v-model:value="search"
            placeholder="Tìm theo khóa hoặc nội dung..."
            style="width: 280px"
            @search="handleSearch"
            allow-clear
            size="large"
          />

          <!-- Group filter -->
          <a-select
            v-model:value="selectedGroup"
            style="width: 220px"
            placeholder="Lọc theo nhóm"
            @change="handleGroupChange"
            size="large"
          >
            <a-select-option value="all">Tất cả các nhóm</a-select-option>
            <a-select-option v-for="g in groups" :key="g" :value="g">
              {{ g }}
            </a-select-option>
          </a-select>
        </div>
      </div>

      <!-- Data Table -->
      <a-table
        :columns="columns"
        :data-source="translations.data"
        :row-key="record => record.id"
        :pagination="false"
        bordered
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'group'">
            <a-tag color="success" class="text-xs font-bold uppercase tracking-wider px-2 py-0.5 border-none bg-emerald-50 text-emerald-800">
              {{ record.group }}
            </a-tag>
          </template>
          <template v-else-if="column.key === 'key'">
            <code class="text-xs text-indigo-700 font-mono font-semibold bg-indigo-50/50 px-1.5 py-0.5 rounded border border-indigo-100">
              {{ record.key }}
            </code>
          </template>
          <template v-else-if="column.key === 'text_vi'">
            <div class="text-sm text-gray-800 font-medium line-clamp-2" :title="record.text?.vi">
              {{ record.text?.vi }}
            </div>
          </template>
          <template v-else-if="column.key === 'text_en'">
            <div class="text-xs text-gray-400 italic line-clamp-2" :title="record.text?.en">
              {{ record.text?.en }}
            </div>
          </template>
          <template v-else-if="column.key === 'action'">
            <a-space size="middle">
              <a-button type="link" class="text-emerald-700 hover:text-emerald-800 p-0 font-semibold" @click="editTranslation(record)">
                Chỉnh sửa dịch
              </a-button>
            </a-space>
          </template>
        </template>
      </a-table>

      <!-- Pagination -->
      <div class="flex justify-end pt-4" v-if="translations.total > 0">
        <a-pagination
          v-model:current="currentPage"
          v-model:pageSize="pageSize"
          :total="translations.total"
          :show-total="total => `Tổng cộng ${total} nhãn dịch`"
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
  translations: Object,
  groups: Array,
  filters: Object,
});

const search = ref(props.filters.search || '');
const selectedGroup = ref(props.filters.group || 'all');
const currentPage = ref(props.translations.current_page);
const pageSize = ref(props.translations.per_page);

const columns = [
  { title: 'Nhóm', key: 'group', width: '15%' },
  { title: 'Từ khóa (Key)', key: 'key', width: '20%' },
  { title: 'Tiếng Việt (VI)', key: 'text_vi', width: '30%' },
  { title: 'Tiếng Anh (EN)', key: 'text_en', width: '25%' },
  { title: 'Hành động', key: 'action', width: '10%', align: 'right' },
];

function handleSearch() {
  router.get('/admin/translations', {
    search: search.value,
    group: selectedGroup.value,
    page: 1
  }, { preserveState: true });
}

function handleGroupChange() {
  router.get('/admin/translations', {
    search: search.value,
    group: selectedGroup.value,
    page: 1
  }, { preserveState: true });
}

function handlePageChange(page) {
  router.get('/admin/translations', {
    search: search.value,
    group: selectedGroup.value,
    page: page
  }, { preserveState: true });
}

function editTranslation(record) {
  router.get(`/admin/translations/${record.id}/edit`);
}
</script>
