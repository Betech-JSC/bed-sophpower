<template>
  <CrmLayout title="Quản lý quản trị viên">
    <div class="bg-white p-6 rounded-xl border border-gray-150 shadow-xs space-y-6">
      <!-- Top Filters & Actions Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <!-- Search -->
        <div class="flex items-center gap-3">
          <a-input-search
            v-model:value="search"
            placeholder="Tìm theo tên hoặc email..."
            style="width: 280px"
            @search="handleSearch"
            allow-clear
          />
        </div>

        <!-- Create Button -->
        <a-button type="primary" class="bg-emerald-700 hover:bg-emerald-800 border-none flex items-center gap-1.5 h-10 font-bold" @click="goToCreate">
          <template #icon>
            <plus-outlined />
          </template>
          Thêm quản trị viên
        </a-button>
      </div>

      <!-- Users Table -->
      <a-table
        :columns="columns"
        :data-source="users.data"
        :row-key="record => record.id"
        :pagination="false"
        :loading="loading"
        bordered
      >
        <template #bodyCell="{ column, record }">
          <!-- Name Column -->
          <template v-if="column.key === 'name'">
            <div class="font-bold text-gray-800">{{ record.name }}</div>
          </template>

          <!-- Email Column -->
          <template v-else-if="column.key === 'email'">
            <span class="text-gray-600">{{ record.email }}</span>
          </template>

          <!-- Role Column -->
          <template v-else-if="column.key === 'role'">
            <a-tag :color="record.role_id === 1 ? 'red' : 'blue'" class="font-semibold uppercase tracking-wider px-2.5 py-0.5 border-none">
              {{ record.role ? record.role.name : 'Chưa phân vai trò' }}
            </a-tag>
          </template>

          <!-- Created At Column -->
          <template v-else-if="column.key === 'created_at'">
            <span class="text-xs text-gray-400">{{ formatDate(record.created_at) }}</span>
          </template>

          <!-- Action Column -->
          <template v-else-if="column.key === 'action'">
            <a-space size="middle">
              <a-button type="link" class="text-emerald-700 hover:text-emerald-800 p-0 font-semibold" @click="editUser(record)">
                Sửa
              </a-button>
              <a-popconfirm
                v-if="record.id !== currentUserId"
                title="Bạn có chắc chắn muốn xóa quản trị viên này?"
                ok-text="Xóa"
                cancel-text="Hủy"
                @confirm="deleteUser(record.id)"
              >
                <a-button type="link" danger class="p-0 font-semibold">Xóa</a-button>
              </a-popconfirm>
              <span v-else class="text-xs text-gray-400 italic">Đang đăng nhập</span>
            </a-space>
          </template>
        </template>
      </a-table>

      <!-- Pagination Footer -->
      <div class="flex justify-end pt-4" v-if="users.total > 0">
        <a-pagination
          v-model:current="currentPage"
          v-model:pageSize="pageSize"
          :total="users.total"
          :show-total="total => `Tổng cộng ${total} quản trị viên`"
          @change="handlePageChange"
        />
      </div>
    </div>
  </CrmLayout>
</template>

<script setup>
import CrmLayout from '@/Layouts/CrmLayout.vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import { router, usePage } from '@inertiajs/vue3';
import { ref, watch, computed } from 'vue';

const props = defineProps({
  users: Object,
  filters: Object,
});

const pageProps = usePage().props;
const currentUserId = computed(() => pageProps.auth.user?.id);

const search = ref(props.filters.search || '');
const currentPage = ref(props.users.current_page);
const pageSize = ref(props.users.per_page);
const loading = ref(false);

const columns = [
  {
    title: 'Họ và tên',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: 'Email đăng nhập',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Vai trò',
    key: 'role',
    width: 180,
    align: 'center',
  },
  {
    title: 'Thời gian tạo',
    key: 'created_at',
    width: 180,
    align: 'center',
  },
  {
    title: 'Thao tác',
    key: 'action',
    width: 140,
    align: 'center',
  },
];

function goToCreate() {
  router.get('/admin/users/create');
}

function editUser(user) {
  router.get(`/admin/users/${user.id}/edit`);
}

function deleteUser(id) {
  router.delete(`/admin/users/${id}`);
}

function handleSearch(val) {
  loading.value = true;
  router.get(
    '/admin/users',
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
    '/admin/users',
    { search: search.value, page: page },
    {
      onFinish: () => {
        loading.value = false;
      },
    }
  );
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

watch(
  () => props.users.current_page,
  (newPage) => {
    currentPage.value = newPage;
  }
);
</script>
