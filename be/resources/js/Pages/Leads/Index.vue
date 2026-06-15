<template>
  <CrmLayout title="Quản lý yêu cầu liên hệ">
    <div class="bg-white p-6 rounded-xl border border-gray-150 shadow-xs space-y-6">
      <!-- Top Filters Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <!-- Search and Filter -->
        <div class="flex flex-wrap items-center gap-3">
          <a-input-search
            v-model:value="search"
            placeholder="Tìm theo tên, email hoặc SĐT..."
            style="width: 300px"
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
            <a-select-option value="pending">Chờ xử lý</a-select-option>
            <a-select-option value="processed">Đã xử lý</a-select-option>
          </a-select>
        </div>
      </div>

      <!-- Leads Ant Design Table -->
      <a-table
        :columns="columns"
        :data-source="leads.data"
        :row-key="record => record.id"
        :pagination="false"
        :loading="loading"
        bordered
      >
        <!-- Custom body cell rendering -->
        <template #bodyCell="{ column, record }">
          <!-- Status Column -->
          <template v-if="column.key === 'status'">
            <a-tag :color="record.status === 'pending' ? 'red' : 'green'">
              {{ record.status === 'pending' ? 'Chờ xử lý' : 'Đã xử lý' }}
            </a-tag>
          </template>

          <!-- Created At Column -->
          <template v-else-if="column.key === 'created_at'">
            <span>{{ formatDateTime(record.created_at) }}</span>
          </template>

          <!-- Message Column -->
          <template v-else-if="column.key === 'message'">
            <div class="max-w-xs truncate" :title="record.message">
              {{ record.message }}
            </div>
          </template>

          <!-- Action Column -->
          <template v-else-if="column.key === 'action'">
            <a-space size="middle">
              <a-button type="link" class="text-emerald-700 hover:text-emerald-800 p-0 font-semibold" @click="showDetail(record)">
                Chi tiết
              </a-button>
              <a-popconfirm
                title="Bạn có chắc muốn xóa yêu cầu liên hệ này?"
                ok-text="Xóa"
                cancel-text="Hủy"
                @confirm="deleteLead(record.id)"
              >
                <a-button type="link" danger class="p-0 font-semibold">Xóa</a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>

      <!-- Pagination Footer -->
      <div class="flex justify-end pt-4" v-if="leads.total > 0">
        <a-pagination
          v-model:current="currentPage"
          v-model:pageSize="pageSize"
          :total="leads.total"
          :show-total="total => `Tổng cộng ${total} yêu cầu`"
          @change="handlePageChange"
        />
      </div>
    </div>

    <!-- Detail Modal -->
    <a-modal
      v-model:open="modalOpen"
      title="Chi tiết yêu cầu liên hệ"
      :footer="null"
      width="600px"
    >
      <div v-if="activeLead" class="space-y-4 mt-4 text-sm sm:text-base leading-relaxed">
        <div class="grid grid-cols-2 gap-4 border-b border-gray-100 pb-4">
          <div>
            <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">Họ và tên</p>
            <p class="font-bold text-gray-900 mt-0.5">{{ activeLead.name }}</p>
          </div>
          <div>
            <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">Thời gian gửi</p>
            <p class="text-gray-700 mt-0.5">{{ formatDateTime(activeLead.created_at) }}</p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 border-b border-gray-100 pb-4">
          <div>
            <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">Email</p>
            <a :href="`mailto:${activeLead.email}`" class="text-emerald-700 font-semibold hover:underline mt-0.5 block">
              {{ activeLead.email }}
            </a>
          </div>
          <div>
            <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">Số điện thoại</p>
            <a :href="`tel:${activeLead.phone}`" class="text-emerald-700 font-semibold hover:underline mt-0.5 block" v-if="activeLead.phone">
              {{ activeLead.phone }}
            </a>
            <p class="text-gray-500 italic mt-0.5" v-else>Chưa cung cấp</p>
          </div>
        </div>

        <div class="border-b border-gray-100 pb-4">
          <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">Trạng thái hiện tại</p>
          <div class="mt-1 flex items-center gap-2">
            <a-tag :color="activeLead.status === 'pending' ? 'red' : 'green'">
              {{ activeLead.status === 'pending' ? 'Chờ xử lý' : 'Đã xử lý' }}
            </a-tag>
            
            <a-button
              size="small"
              class="rounded text-xs"
              :type="activeLead.status === 'pending' ? 'primary' : 'default'"
              :class="activeLead.status === 'pending' ? 'bg-emerald-700 hover:bg-emerald-800 border-none' : ''"
              @click="toggleStatus(activeLead)"
              :loading="statusLoading"
            >
              {{ activeLead.status === 'pending' ? 'Đánh dấu đã xử lý' : 'Đánh dấu chưa xử lý' }}
            </a-button>
          </div>
        </div>

        <div>
          <p class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Nội dung tin nhắn</p>
          <div class="bg-gray-50 p-4 rounded-lg border border-gray-200 text-gray-750 whitespace-pre-wrap min-h-[100px]">
            {{ activeLead.message }}
          </div>
        </div>
      </div>
    </a-modal>
  </CrmLayout>
</template>

<script setup>
import CrmLayout from '@/Layouts/CrmLayout.vue';
import { router } from '@inertiajs/vue3';
import { ref, watch } from 'vue';

const props = defineProps({
  leads: Object,
  filters: Object,
});

const search = ref(props.filters.search || '');
const status = ref(props.filters.status || undefined);
const currentPage = ref(props.leads.current_page);
const pageSize = ref(props.leads.per_page);
const loading = ref(false);

const modalOpen = ref(false);
const activeLead = ref(null);
const statusLoading = ref(false);

const columns = [
  {
    title: 'Khách hàng',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone',
    key: 'phone',
    width: 140,
  },
  {
    title: 'Tin nhắn',
    dataIndex: 'message',
    key: 'message',
  },
  {
    title: 'Thời gian gửi',
    dataIndex: 'created_at',
    key: 'created_at',
    width: 165,
    align: 'center',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    width: 110,
    align: 'center',
  },
  {
    title: 'Thao tác',
    key: 'action',
    width: 120,
    align: 'center',
  },
];

function showDetail(lead) {
  activeLead.value = lead;
  modalOpen.value = true;
}

function toggleStatus(lead) {
  statusLoading.value = true;
  const newStatus = lead.status === 'pending' ? 'processed' : 'pending';
  
  router.patch(
    `/admin/leads/${lead.id}/status`,
    { status: newStatus },
    {
      preserveScroll: true,
      onSuccess: () => {
        // Update local modal state
        if (activeLead.value && activeLead.value.id === lead.id) {
          activeLead.value.status = newStatus;
        }
      },
      onFinish: () => {
        statusLoading.value = false;
      },
    }
  );
}

function deleteLead(id) {
  router.delete(`/admin/leads/${id}`, {
    onSuccess: () => {
      if (activeLead.value && activeLead.value.id === id) {
        modalOpen.value = false;
        activeLead.value = null;
      }
    }
  });
}

function handleSearch(val) {
  loading.value = true;
  router.get(
    '/admin/leads',
    { search: val, status: status.value, page: 1 },
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
    '/admin/leads',
    { search: search.value, status: status.value, page: 1 },
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
    '/admin/leads',
    { search: search.value, status: status.value, page: page },
    {
      onFinish: () => {
        loading.value = false;
      },
    }
  );
}

function formatDateTime(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes} ${day}/${month}/${year}`;
}

watch(
  () => props.leads.current_page,
  (newPage) => {
    currentPage.value = newPage;
  }
);
</script>
