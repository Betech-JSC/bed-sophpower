<template>
  <CrmLayout title="Quản lý tin tức & bài viết">
    <div class="bg-white p-6 rounded-xl border border-gray-150 shadow-xs space-y-6">
      <!-- Top Filters & Actions Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <!-- Search and Filter -->
        <div class="flex items-center gap-3">
          <a-input-search
            v-model:value="search"
            placeholder="Tìm bài viết..."
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
          Viết bài viết mới
        </a-button>
      </div>

      <!-- Articles Ant Design Table -->
      <a-table
        :columns="columns"
        :data-source="articles.data"
        :row-key="record => record.id"
        :pagination="false"
        :loading="loading"
        bordered
      >
        <!-- Custom image column -->
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'image'">
            <div class="w-16 h-12 rounded border border-gray-200 overflow-hidden bg-gray-55 flex items-center justify-center">
              <img :src="record.image" alt="Article Image" class="w-full h-full object-cover" v-if="record.image" />
              <span class="text-xs text-gray-400" v-else>No img</span>
            </div>
          </template>

          <!-- Title Column -->
          <template v-else-if="column.key === 'title'">
            <div class="font-bold text-gray-850">{{ record.title?.vi || record.title }}</div>
            <div class="text-xs text-gray-450 italic mt-0.5">{{ record.title?.en }}</div>
          </template>

          <!-- Category Column -->
          <template v-else-if="column.key === 'category'">
            <a-tag color="cyan" class="mb-1">{{ record.category?.vi || record.category }}</a-tag>
            <div class="text-[11px] text-gray-400 italic">{{ record.category?.en }}</div>
          </template>

          <!-- Date Column -->
          <template v-else-if="column.key === 'date'">
            <span>{{ formatDate(record.date) }}</span>
          </template>

          <!-- Action Column -->
          <template v-else-if="column.key === 'action'">
            <a-space size="middle">
              <a-button type="link" class="text-emerald-700 hover:text-emerald-800 p-0 font-semibold" @click="editArticle(record)">
                Sửa
              </a-button>
              <a-popconfirm
                title="Bạn có chắc chắn muốn xóa bài viết này?"
                ok-text="Xóa"
                cancel-text="Hủy"
                @confirm="deleteArticle(record.id)"
              >
                <a-button type="link" danger class="p-0 font-semibold">Xóa</a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>

      <!-- Pagination Footer -->
      <div class="flex justify-end pt-4" v-if="articles.total > 0">
        <a-pagination
          v-model:current="currentPage"
          v-model:pageSize="pageSize"
          :total="articles.total"
          :show-total="total => `Tổng cộng ${total} bài viết`"
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
  articles: Object,
  filters: Object,
});

const search = ref(props.filters.search || '');
const currentPage = ref(props.articles.current_page);
const pageSize = ref(props.articles.per_page);
const loading = ref(false);

const columns = [
  {
    title: 'Hình ảnh',
    dataIndex: 'image',
    key: 'image',
    width: 100,
    align: 'center',
  },
  {
    title: 'Tiêu đề bài viết',
    dataIndex: 'title',
    key: 'title',
    sorter: (a, b) => (a.title?.vi || a.title || '').localeCompare(b.title?.vi || b.title || ''),
  },
  {
    title: 'Danh mục',
    dataIndex: 'category',
    key: 'category',
    width: 180,
  },
  {
    title: 'Tác giả',
    dataIndex: 'author',
    key: 'author',
    width: 140,
  },
  {
    title: 'Ngày xuất bản',
    dataIndex: 'date',
    key: 'date',
    width: 140,
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
  router.get('/admin/news/create');
}

function editArticle(article) {
  router.get(`/admin/news/${article.id}/edit`);
}

function deleteArticle(id) {
  router.delete(`/admin/news/${id}`);
}

function handleSearch(val) {
  loading.value = true;
  router.get(
    '/admin/news',
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
    '/admin/news',
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

watch(
  () => props.articles.current_page,
  (newPage) => {
    currentPage.value = newPage;
  }
);
</script>
