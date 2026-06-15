<template>
  <CrmLayout title="Hỏi đáp sản phẩm">
    <div class="bg-white p-6 rounded-xl border border-gray-150 shadow-xs space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <a-input-search
            v-model:value="search"
            placeholder="Tìm theo khách hàng hoặc câu hỏi..."
            style="width: 260px"
            @search="handleSearch"
            allow-clear
          />
          <a-select
            v-model:value="status"
            placeholder="Trạng thái"
            style="width: 150px"
            @change="handleFilterChange"
            allow-clear
          >
            <a-select-option value="pending">Chờ duyệt</a-select-option>
            <a-select-option value="approved">Đã duyệt hiển thị</a-select-option>
            <a-select-option value="replied">Đã trả lời</a-select-option>
          </a-select>
        </div>
      </div>

      <a-table
        :columns="columns"
        :data-source="questions.data"
        :row-key="record => record.id"
        :pagination="false"
        bordered
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'product'">
            <div class="font-bold text-gray-800">{{ record.product?.name?.vi || 'Sản phẩm đã xóa' }}</div>
            <div class="text-[10px] text-gray-400 font-mono">ID: {{ record.product_id }}</div>
          </template>
          <template v-else-if="column.key === 'customer'">
            <div class="font-semibold text-gray-900">{{ record.customer_name }}</div>
            <div class="text-xs text-gray-500">{{ record.customer_email }}</div>
            <div class="text-xs text-gray-400" v-if="record.customer_phone">{{ record.customer_phone }}</div>
          </template>
          <template v-else-if="column.key === 'question'">
            <div class="text-sm text-gray-700 font-medium">{{ record.question }}</div>
            <div v-if="record.answer" class="mt-2 pl-3 border-l-2 border-emerald-600 bg-gray-50 py-1.5 rounded text-xs text-gray-650">
              <strong class="text-emerald-700 block text-[10px] uppercase tracking-wide">Trả lời từ Admin:</strong>
              {{ record.answer }}
            </div>
          </template>
          <template v-else-if="column.key === 'status'">
            <a-tag :color="statusColor(record.status)">
              {{ statusLabel(record.status) }}
            </a-tag>
          </template>
          <template v-else-if="column.key === 'action'">
            <a-space size="middle">
              <a-button type="link" class="text-emerald-700 hover:text-emerald-800 p-0 font-semibold" @click="openReplyModal(record)">
                Trả lời / Duyệt
              </a-button>
              <a-popconfirm
                title="Bạn có chắc chắn muốn xóa câu hỏi này?"
                ok-text="Xóa"
                cancel-text="Hủy"
                @confirm="deleteQuestion(record.id)"
              >
                <a-button type="link" danger class="p-0 font-semibold">Xóa</a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>

      <div class="flex justify-end pt-4" v-if="questions.total > 0">
        <a-pagination
          v-model:current="currentPage"
          v-model:pageSize="pageSize"
          :total="questions.total"
          :show-total="total => `Tổng cộng ${total} câu hỏi`"
          @change="handlePageChange"
        />
      </div>
    </div>

    <!-- Reply / Approve Modal -->
    <a-modal
      v-model:open="isModalOpen"
      title="Phê duyệt & Trả lời thắc mắc sản phẩm"
      ok-text="Cập nhật"
      cancel-text="Hủy bỏ"
      @ok="handleReplySubmit"
      :confirm-loading="form.processing"
    >
      <div class="space-y-4 py-3">
        <div>
          <span class="block text-xs font-bold text-gray-400 uppercase">Khách hàng</span>
          <strong class="text-gray-900">{{ currentRecord?.customer_name }}</strong> ({{ currentRecord?.customer_email }})
        </div>
        <div>
          <span class="block text-xs font-bold text-gray-400 uppercase">Sản phẩm thắc mắc</span>
          <span class="text-gray-800">{{ currentRecord?.product?.name?.vi }}</span>
        </div>
        <div>
          <span class="block text-xs font-bold text-gray-400 uppercase">Nội dung câu hỏi</span>
          <p class="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-150">{{ currentRecord?.question }}</p>
        </div>

        <div>
          <label class="block text-sm font-bold text-gray-750 mb-1">Nội dung trả lời từ Admin</label>
          <a-textarea v-model:value="form.answer" placeholder="Nhập nội dung phản hồi khách hàng..." :rows="4" />
        </div>

        <div>
          <label class="block text-sm font-bold text-gray-750 mb-1">Trạng thái duyệt</label>
          <a-select v-model:value="form.status" class="w-full">
            <a-select-option value="pending">Chờ duyệt (Ẩn)</a-select-option>
            <a-select-option value="approved">Duyệt hiển thị (Chưa trả lời)</a-select-option>
            <a-select-option value="replied">Đã trả lời & Duyệt hiển thị</a-select-option>
          </a-select>
        </div>
      </div>
    </a-modal>

  </CrmLayout>
</template>

<script setup>
import CrmLayout from '@/Layouts/CrmLayout.vue';
import { useForm, router } from '@inertiajs/vue3';
import { ref } from 'vue';

const props = defineProps({
  questions: Object,
  filters: Object,
});

const search = ref(props.filters.search || '');
const status = ref(props.filters.status || undefined);
const currentPage = ref(props.questions.current_page);
const pageSize = ref(props.questions.per_page);

const isModalOpen = ref(false);
const currentRecord = ref(null);

const columns = [
  { title: 'Sản phẩm', key: 'product', width: '20%' },
  { title: 'Khách hàng', key: 'customer', width: '25%' },
  { title: 'Nội dung câu hỏi & Trả lời', key: 'question', width: '35%' },
  { title: 'Trạng thái', key: 'status', width: '10%' },
  { title: 'Hành động', key: 'action', width: '10%', align: 'right' },
];

const form = useForm({
  answer: '',
  status: 'pending',
});

function handleSearch() {
  router.get('/admin/product-questions', { search: search.value, status: status.value }, { preserveState: true });
}

function handleFilterChange() {
  handleSearch();
}

function handlePageChange(page) {
  router.get('/admin/product-questions', { search: search.value, status: status.value, page }, { preserveState: true });
}

function statusColor(s) {
  if (s === 'pending') return 'orange';
  if (s === 'approved') return 'blue';
  return 'green';
}

function statusLabel(s) {
  if (s === 'pending') return 'Chờ duyệt';
  if (s === 'approved') return 'Đã duyệt';
  return 'Đã trả lời';
}

function openReplyModal(record) {
  currentRecord.value = record;
  form.answer = record.answer || '';
  form.status = record.status || 'pending';
  isModalOpen.value = true;
}

function handleReplySubmit() {
  form.put(`/admin/product-questions/${currentRecord.value.id}`, {
    onSuccess: () => {
      isModalOpen.value = false;
      currentRecord.value = null;
    }
  });
}

function deleteQuestion(id) {
  router.delete(`/admin/product-questions/${id}`);
}
</script>
