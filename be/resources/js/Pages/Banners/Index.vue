<template>
  <CrmLayout title="Quản lý Banner Slider">
    <div class="bg-white p-6 rounded-xl border border-gray-150 shadow-xs space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <a-input-search
            v-model:value="search"
            placeholder="Tìm theo tiêu đề banner..."
            style="width: 260px"
            @search="handleSearch"
            allow-clear
          />
        </div>
        <a-button type="primary" class="bg-emerald-700 hover:bg-emerald-800 border-none flex items-center gap-1.5 h-10 font-bold" @click="goToCreate">
          <template #icon>
            <plus-outlined />
          </template>
          Thêm Banner mới
        </a-button>
      </div>

      <a-table
        :columns="columns"
        :data-source="banners.data"
        :row-key="record => record.id"
        :pagination="false"
        bordered
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'image'">
            <div class="w-24 h-12 rounded border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center">
              <img :src="record.image" alt="Banner Image" class="w-full h-full object-cover" />
            </div>
          </template>
          <template v-else-if="column.key === 'title'">
            <div class="font-bold text-gray-800">{{ record.title?.vi }}</div>
            <div class="text-xs text-gray-400 italic">{{ record.title?.en }}</div>
          </template>
          <template v-else-if="column.key === 'is_active'">
            <a-tag :color="record.is_active ? 'green' : 'red'">
              {{ record.is_active ? 'Hiển thị' : 'Ẩn' }}
            </a-tag>
          </template>
          <template v-else-if="column.key === 'action'">
            <a-space size="middle">
              <a-button type="link" class="text-emerald-700 hover:text-emerald-800 p-0 font-semibold" @click="editBanner(record)">
                Sửa
              </a-button>
              <a-popconfirm
                title="Bạn có chắc chắn muốn xóa banner này?"
                ok-text="Xóa"
                cancel-text="Hủy"
                @confirm="deleteBanner(record.id)"
              >
                <a-button type="link" danger class="p-0 font-semibold">Xóa</a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>

      <div class="flex justify-end pt-4" v-if="banners.total > 0">
        <a-pagination
          v-model:current="currentPage"
          v-model:pageSize="pageSize"
          :total="banners.total"
          :show-total="total => `Tổng cộng ${total} banner`"
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
  banners: Object,
  filters: Object,
});

const search = ref(props.filters.search || '');
const currentPage = ref(props.banners.current_page);
const pageSize = ref(props.banners.per_page);

const columns = [
  { title: 'Ảnh', key: 'image', width: '150px' },
  { title: 'Tiêu đề / Nội dung ngắn', key: 'title', dataIndex: 'title' },
  { title: 'Liên kết (Link)', key: 'link', dataIndex: 'link', width: '20%' },
  { title: 'Thứ tự', key: 'order', dataIndex: 'order', width: '10%' },
  { title: 'Trạng thái', key: 'is_active', dataIndex: 'is_active', width: '10%' },
  { title: 'Hành động', key: 'action', width: '12%', align: 'right' },
];

function handleSearch() {
  router.get('/admin/banners', { search: search.value }, { preserveState: true });
}

function handlePageChange(page) {
  router.get('/admin/banners', { search: search.value, page }, { preserveState: true });
}

function goToCreate() {
  router.get('/admin/banners/create');
}

function editBanner(record) {
  router.get(`/admin/banners/${record.id}/edit`);
}

function deleteBanner(id) {
  router.delete(`/admin/banners/${id}`);
}
</script>
