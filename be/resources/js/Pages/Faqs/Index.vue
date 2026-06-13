<template>
  <CrmLayout title="Quản lý Hỏi đáp FAQs">
    <div class="bg-white p-6 rounded-xl border border-gray-150 shadow-xs space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <a-input-search
            v-model:value="search"
            placeholder="Tìm theo câu hỏi hoặc danh mục..."
            style="width: 260px"
            @search="handleSearch"
            allow-clear
          />
        </div>
        <a-button type="primary" class="bg-emerald-700 hover:bg-emerald-800 border-none flex items-center gap-1.5 h-10 font-bold" @click="goToCreate">
          <template #icon>
            <plus-outlined />
          </template>
          Thêm câu hỏi mới
        </a-button>
      </div>

      <a-table
        :columns="columns"
        :data-source="faqs.data"
        :row-key="record => record.id"
        :pagination="false"
        bordered
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'question'">
            <div class="font-bold text-gray-800">{{ record.question?.vi }}</div>
            <div class="text-xs text-gray-400 italic">{{ record.question?.en }}</div>
          </template>
          <template v-else-if="column.key === 'answer'">
            <div class="text-sm text-gray-600 line-clamp-2">{{ record.answer?.vi }}</div>
            <div class="text-xs text-gray-400 italic line-clamp-1">{{ record.answer?.en }}</div>
          </template>
          <template v-else-if="column.key === 'category'">
            <a-tag color="blue">{{ record.category?.vi || record.category }}</a-tag>
          </template>
          <template v-else-if="column.key === 'action'">
            <a-space size="middle">
              <a-button type="link" class="text-emerald-700 hover:text-emerald-800 p-0 font-semibold" @click="editFaq(record)">
                Sửa
              </a-button>
              <a-popconfirm
                title="Bạn có chắc chắn muốn xóa câu hỏi FAQ này?"
                ok-text="Xóa"
                cancel-text="Hủy"
                @confirm="deleteFaq(record.id)"
              >
                <a-button type="link" danger class="p-0 font-semibold">Xóa</a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>

      <div class="flex justify-end pt-4" v-if="faqs.total > 0">
        <a-pagination
          v-model:current="currentPage"
          v-model:pageSize="pageSize"
          :total="faqs.total"
          :show-total="total => `Tổng cộng ${total} câu hỏi`"
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
  faqs: Object,
  filters: Object,
});

const search = ref(props.filters.search || '');
const currentPage = ref(props.faqs.current_page);
const pageSize = ref(props.faqs.per_page);

const columns = [
  { title: 'Câu hỏi', key: 'question', width: '30%' },
  { title: 'Câu trả lời', key: 'answer', width: '35%' },
  { title: 'Phân loại nhóm', key: 'category', width: '15%' },
  { title: 'Thứ tự', key: 'order', dataIndex: 'order', width: '8%' },
  { title: 'Hành động', key: 'action', width: '12%', align: 'right' },
];

function handleSearch() {
  router.get('/admin/faqs', { search: search.value }, { preserveState: true });
}

function handlePageChange(page) {
  router.get('/admin/faqs', { search: search.value, page }, { preserveState: true });
}

function goToCreate() {
  router.get('/admin/faqs/create');
}

function editFaq(record) {
  router.get(`/admin/faqs/${record.id}/edit`);
}

function deleteFaq(id) {
  router.delete(`/admin/faqs/${id}`);
}
</script>
