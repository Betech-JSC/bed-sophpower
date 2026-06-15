<template>
  <CrmLayout title="Quản lý vai trò & Phân quyền">
    <div class="bg-white p-6 rounded-xl border border-gray-150 shadow-xs space-y-6">
      <!-- Top Actions Bar -->
      <div class="flex items-center justify-end">
        <a-button type="primary" class="bg-emerald-700 hover:bg-emerald-800 border-none flex items-center gap-1.5 h-10 font-bold" @click="goToCreate">
          <template #icon>
            <plus-outlined />
          </template>
          Thêm vai trò mới
        </a-button>
      </div>

      <!-- Roles Table -->
      <a-table
        :columns="columns"
        :data-source="roles.data"
        :row-key="record => record.id"
        :pagination="false"
        bordered
      >
        <template #bodyCell="{ column, record }">
          <!-- Name Column -->
          <template v-if="column.key === 'name'">
            <div class="font-bold text-gray-800">{{ record.name }}</div>
          </template>

          <!-- Description Column -->
          <template v-else-if="column.key === 'description'">
            <span class="text-gray-600 text-sm">{{ record.description || 'Không có mô tả' }}</span>
          </template>

          <!-- Action Column -->
          <template v-else-if="column.key === 'action'">
            <a-space size="middle">
              <a-button type="link" class="text-emerald-700 hover:text-emerald-800 p-0 font-semibold" @click="editRole(record)">
                Thiết lập quyền
              </a-button>
              <a-popconfirm
                v-if="record.id !== 1 && record.name !== 'Super Admin'"
                title="Bạn có chắc chắn muốn xóa vai trò này?"
                ok-text="Xóa"
                cancel-text="Hủy"
                @confirm="deleteRole(record.id)"
              >
                <a-button type="link" danger class="p-0 font-semibold">Xóa</a-button>
              </a-popconfirm>
              <span v-else class="text-xs text-gray-400 italic">Mặc định hệ thống</span>
            </a-space>
          </template>
        </template>
      </a-table>

      <!-- Pagination Footer -->
      <div class="flex justify-end pt-4" v-if="roles.total > 0">
        <a-pagination
          v-model:current="currentPage"
          v-model:pageSize="pageSize"
          :total="roles.total"
          :show-total="total => `Tổng cộng ${total} vai trò`"
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
  roles: Object,
});

const currentPage = ref(props.roles.current_page);
const pageSize = ref(props.roles.per_page);

const columns = [
  {
    title: 'Tên vai trò',
    dataIndex: 'name',
    key: 'name',
    width: 220,
  },
  {
    title: 'Mô tả vai trò',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Thao tác',
    key: 'action',
    width: 180,
    align: 'center',
  },
];

function goToCreate() {
  router.get('/admin/roles/create');
}

function editRole(role) {
  router.get(`/admin/roles/${role.id}/edit`);
}

function deleteRole(id) {
  router.delete(`/admin/roles/${id}`);
}

function handlePageChange(page) {
  router.get('/admin/roles', { page: page });
}

watch(
  () => props.roles.current_page,
  (newPage) => {
    currentPage.value = newPage;
  }
);
</script>
