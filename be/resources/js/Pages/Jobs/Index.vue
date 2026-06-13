<template>
  <CrmLayout title="Quản lý tin tuyển dụng">
    <div class="bg-white p-6 rounded-xl border border-gray-150 shadow-xs space-y-6">
      <!-- Top Filters & Actions Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <!-- Search -->
        <div class="flex items-center gap-3">
          <a-input-search
            v-model:value="search"
            placeholder="Tìm theo chức danh hoặc phòng ban..."
            style="width: 320px"
            @search="handleSearch"
            allow-clear
          />
        </div>

        <!-- Create Button -->
        <a-button type="primary" class="bg-emerald-700 hover:bg-emerald-800 border-none flex items-center gap-1.5 h-10 font-bold" @click="goToCreate">
          <template #icon>
            <plus-outlined />
          </template>
          Đăng tin tuyển dụng mới
        </a-button>
      </div>

      <!-- Jobs Ant Design Table -->
      <a-table
        :columns="columns"
        :data-source="jobs.data"
        :row-key="record => record.id"
        :pagination="false"
        :loading="loading"
        bordered
      >
        <!-- Custom body rendering -->
        <template #bodyCell="{ column, record }">
          <!-- Title Column -->
          <template v-if="column.key === 'title'">
            <div class="font-bold text-gray-800">{{ record.title?.vi || record.title }}</div>
            <div class="text-xs text-gray-400 italic mt-0.5">{{ record.title?.en }}</div>
          </template>

          <!-- Department Column -->
          <template v-else-if="column.key === 'department'">
            <a-tag color="blue" class="mb-1">{{ record.department?.vi || record.department }}</a-tag>
            <div class="text-[11px] text-gray-400 italic">{{ record.department?.en }}</div>
          </template>

          <!-- Location Column -->
          <template v-else-if="column.key === 'location'">
            <div>{{ record.location?.vi || record.location }}</div>
            <div class="text-xs text-gray-400 italic">{{ record.location?.en }}</div>
          </template>

          <!-- Salary Column -->
          <template v-else-if="column.key === 'salary'">
            <div>{{ record.salary?.vi || record.salary }}</div>
            <div class="text-xs text-gray-400 italic">{{ record.salary?.en }}</div>
          </template>

          <!-- Deadline Column -->
          <template v-else-if="column.key === 'deadline'">
            <span :class="{'text-red-600 font-semibold': isExpired(record.deadline)}">
              {{ formatDate(record.deadline) }}
              <a-tag v-if="isExpired(record.deadline)" color="red" class="ml-1 text-[10px] uppercase font-bold tracking-wider">Hết hạn</a-tag>
            </span>
          </template>

          <!-- Action Column -->
          <template v-else-if="column.key === 'action'">
            <a-space size="middle">
              <a-button type="link" class="text-emerald-700 hover:text-emerald-800 p-0 font-semibold" @click="editJob(record)">
                Sửa
              </a-button>
              <a-popconfirm
                title="Bạn có chắc chắn muốn xóa tin tuyển dụng này?"
                ok-text="Xóa"
                cancel-text="Hủy"
                @confirm="deleteJob(record.id)"
              >
                <a-button type="link" danger class="p-0 font-semibold">Xóa</a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>

      <!-- Pagination Footer -->
      <div class="flex justify-end pt-4" v-if="jobs.total > 0">
        <a-pagination
          v-model:current="currentPage"
          v-model:pageSize="pageSize"
          :total="jobs.total"
          :show-total="total => `Tổng cộng ${total} vị trí`"
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
import { ref, watch } from 'vue';

const props = defineProps({
  jobs: Object,
  filters: Object,
});

const search = ref(props.filters.search || '');
const currentPage = ref(props.jobs.current_page);
const pageSize = ref(props.jobs.per_page);
const loading = ref(false);

const columns = [
  {
    title: 'Vị trí tuyển dụng',
    dataIndex: 'title',
    key: 'title',
    sorter: (a, b) => (a.title?.vi || a.title || '').localeCompare(b.title?.vi || b.title || ''),
  },
  {
    title: 'Bộ phận',
    dataIndex: 'department',
    key: 'department',
    width: 200,
  },
  {
    title: 'Địa điểm',
    dataIndex: 'location',
    key: 'location',
    width: 150,
  },
  {
    title: 'Mức lương',
    dataIndex: 'salary',
    key: 'salary',
    width: 200,
  },
  {
    title: 'Hạn nộp hồ sơ',
    dataIndex: 'deadline',
    key: 'deadline',
    width: 160,
    align: 'center',
  },
  {
    title: 'Thao tác',
    key: 'action',
    width: 120,
    align: 'center',
  },
];

function goToCreate() {
  router.get('/admin/jobs/create');
}

function editJob(job) {
  router.get(`/admin/jobs/${job.id}/edit`);
}

function deleteJob(id) {
  router.delete(`/admin/jobs/${id}`);
}

function handleSearch(val) {
  loading.value = true;
  router.get(
    '/admin/jobs',
    { search: val, page: 1 },
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
    '/admin/jobs',
    { search: search.value, page: page },
    {
      onFinish: () => {
        loading.value = false;
      },
    }
  );
}

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function isExpired(dateString) {
  if (!dateString) return false;
  const deadline = new Date(dateString);
  const today = new Date();
  // Clear times to compare dates only
  deadline.setHours(23, 59, 59, 999);
  return today > deadline;
}

watch(
  () => props.jobs.current_page,
  (newPage) => {
    currentPage.value = newPage;
  }
);
</script>
