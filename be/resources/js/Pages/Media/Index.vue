<template>
  <CrmLayout title="Thư viện tệp tin & Media">
    <div class="space-y-6">
      
      <!-- Upload Section -->
      <div class="bg-white p-6 rounded-xl border border-gray-150 shadow-xs">
        <h3 class="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Tải lên tệp mới</h3>
        <a-upload-dragger
          name="file"
          :multiple="false"
          :show-upload-list="false"
          :before-upload="beforeUpload"
          @change="handleUploadChange"
          accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar"
          class="block border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:border-emerald-600 transition-colors"
        >
          <p class="ant-upload-drag-icon text-center mt-3 text-emerald-600">
            <InboxOutlined class="text-4xl" />
          </p>
          <p class="ant-upload-text text-sm font-bold text-gray-700">
            Kéo thả tệp tin vào đây hoặc click để chọn tệp
          </p>
          <p class="ant-upload-hint text-xs text-gray-400 mb-3">
            Hỗ trợ hình ảnh, PDF, Word, Excel, PowerPoint, Text, ZIP, RAR (Dung lượng tối đa 10MB)
          </p>
        </a-upload-dragger>
        
        <!-- Uploading Progress / State -->
        <div v-if="uploadForm.processing" class="mt-3 flex items-center justify-center gap-2 text-sm text-emerald-700 font-semibold">
          <a-spin size="small" />
          <span>Đang tải tệp lên máy chủ...</span>
        </div>
      </div>

      <!-- Filters & Media Grid -->
      <div class="bg-white p-6 rounded-xl border border-gray-150 shadow-xs space-y-6">
        
        <!-- Filters Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-5">
          <!-- Type Filter Tabs -->
          <div class="flex flex-wrap gap-1.5">
            <button
              v-for="tab in tabs"
              :key="tab.value"
              @click="handleTypeChange(tab.value)"
              class="rounded-lg px-4 py-2 text-xs font-bold tracking-wide transition-all cursor-pointer"
              :class="selectedType === tab.value
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white border border-gray-200 text-gray-650 hover:bg-gray-50 hover:text-emerald-700'"
            >
              {{ tab.label }}
            </button>
          </div>

          <!-- Search Input -->
          <div class="w-full md:w-72">
            <a-input-search
              v-model:value="search"
              placeholder="Tìm theo tên tệp..."
              @search="handleSearch"
              allow-clear
              size="large"
            />
          </div>
        </div>

        <!-- Files Grid -->
        <div v-if="files.data.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          <div
            v-for="file in files.data"
            :key="file.id"
            class="group flex flex-col rounded-xl bg-white border border-gray-200 overflow-hidden hover:border-emerald-600/30 hover:shadow-lg transition-all duration-300 relative"
          >
            <!-- File Thumbnail / Icon Container -->
            <div class="aspect-square bg-gray-50 flex items-center justify-center relative border-b border-gray-100 overflow-hidden shrink-0">
              <!-- If Image: Show Image -->
              <img
                v-if="isImage(file.file_type)"
                :src="file.url"
                :alt="file.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              <!-- If PDF: Show PDF Icon -->
              <FilePdfOutlined
                v-else-if="isPdf(file.file_type)"
                class="text-4xl text-red-500"
              />
              
              <!-- If Word Doc: Show Word Icon -->
              <FileWordOutlined
                v-else-if="isWord(file.file_type, file.name)"
                class="text-4xl text-blue-500"
              />

              <!-- If Excel Sheet: Show Excel Icon -->
              <FileExcelOutlined
                v-else-if="isExcel(file.file_type, file.name)"
                class="text-4xl text-emerald-600"
              />

              <!-- If Zip / Rar: Show Archive Icon -->
              <FileZipOutlined
                v-else-if="isArchive(file.file_type, file.name)"
                class="text-4xl text-amber-600"
              />
              
              <!-- Else: Generic File Icon -->
              <FileOutlined
                v-else
                class="text-4xl text-gray-400"
              />

              <!-- Action Overlays on Hover -->
              <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <a-button
                  type="primary"
                  shape="circle"
                  class="bg-emerald-700 hover:bg-emerald-800 border-none flex items-center justify-center"
                  title="Sao chép đường dẫn"
                  @click="copyUrl(file.url)"
                >
                  <CopyOutlined />
                </a-button>
                
                <a :href="file.url" target="_blank" download>
                  <a-button
                    type="primary"
                    shape="circle"
                    class="bg-blue-600 hover:bg-blue-700 border-none flex items-center justify-center"
                    title="Tải xuống tệp"
                  >
                    <DownloadOutlined />
                  </a-button>
                </a>

                <a-popconfirm
                  title="Bạn có chắc chắn muốn xóa tệp này?"
                  ok-text="Xóa"
                  cancel-text="Hủy"
                  ok-type="danger"
                  @confirm="deleteFile(file.id)"
                >
                  <a-button
                    type="primary"
                    danger
                    shape="circle"
                    class="flex items-center justify-center"
                    title="Xóa tệp"
                  >
                    <DeleteOutlined />
                  </a-button>
                </a-popconfirm>
              </div>
            </div>

            <!-- File Info -->
            <div class="p-3 space-y-1">
              <p 
                class="text-xs font-bold text-gray-800 truncate" 
                :title="file.name"
              >
                {{ file.name }}
              </p>
              <div class="flex items-center justify-between text-[10px] text-gray-400 font-semibold">
                <span>{{ formatBytes(file.file_size) }}</span>
                <span>{{ formatDate(file.created_at) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-16 text-gray-400 italic">
          Chưa có tệp tin nào được tải lên hoặc không tìm thấy kết quả phù hợp.
        </div>

        <!-- Pagination -->
        <div class="flex justify-end pt-4" v-if="files.total > 0">
          <a-pagination
            v-model:current="currentPage"
            v-model:pageSize="pageSize"
            :total="files.total"
            :show-total="total => `Tổng số: ${total} tệp tin`"
            @change="handlePageChange"
          />
        </div>

      </div>
    </div>
  </CrmLayout>
</template>

<script setup>
import CrmLayout from '@/Layouts/CrmLayout.vue';
import { 
  InboxOutlined, 
  CopyOutlined, 
  DeleteOutlined, 
  FileOutlined, 
  FilePdfOutlined, 
  FileWordOutlined, 
  FileExcelOutlined, 
  FileZipOutlined,
  DownloadOutlined
} from '@ant-design/icons-vue';
import { useForm, router } from '@inertiajs/vue3';
import { ref } from 'vue';
import { message } from 'ant-design-vue';

const props = defineProps({
  files: Object,
  filters: Object,
});

const search = ref(props.filters.search || '');
const selectedType = ref(props.filters.type || 'all');
const currentPage = ref(props.files.current_page);
const pageSize = ref(props.files.per_page);

const tabs = [
  { label: 'Tất cả tệp', value: 'all' },
  { label: 'Hình ảnh', value: 'image' },
  { label: 'Tài liệu', value: 'document' },
  { label: 'Khác', value: 'other' },
];

const uploadForm = useForm({
  file: null,
});

function beforeUpload(file) {
  // Validate file size (max 10MB)
  const isLt10M = file.size / 1024 / 1024 < 10;
  if (!isLt10M) {
    message.error('Dung lượng tệp tin vượt quá giới hạn cho phép (10MB)!');
    return false;
  }
  return true;
}

function handleUploadChange(info) {
  // Dragger change event
  if (info.file.status !== 'removed') {
    uploadForm.file = info.file.originFileObj || info.file;
    uploadForm.post('/admin/media', {
      forceFormData: true,
      onSuccess: () => {
        message.success(`Đã tải lên tệp tin '${uploadForm.file.name}' thành công!`);
        uploadForm.reset();
      },
      onError: (errors) => {
        message.error(errors.file || 'Tải lên tệp thất bại. Vui lòng thử lại.');
      }
    });
  }
}

function handleTypeChange(type) {
  selectedType.value = type;
  navigate();
}

function handleSearch() {
  navigate();
}

function handlePageChange(page) {
  currentPage.value = page;
  navigate();
}

function navigate() {
  router.get('/admin/media', {
    search: search.value,
    type: selectedType.value,
    page: currentPage.value
  }, { preserveState: true });
}

function deleteFile(id) {
  router.delete(`/admin/media/${id}`, {
    onSuccess: () => {
      message.success('Đã xóa tệp tin thành công!');
    },
    onError: () => {
      message.error('Không thể xóa tệp tin.');
    }
  });
}

function copyUrl(url) {
  navigator.clipboard.writeText(url).then(() => {
    message.success('Đã sao chép đường dẫn tệp vào bộ nhớ tạm!');
  }).catch((err) => {
    console.error('Copy failed:', err);
    message.error('Không thể sao chép đường dẫn tệp.');
  });
}

// File helper checks
function isImage(mimeType) {
  return mimeType && mimeType.startsWith('image/');
}

function isPdf(mimeType) {
  return mimeType === 'application/pdf';
}

function isWord(mimeType, filename) {
  if (!mimeType) return false;
  return mimeType.includes('msword') || 
         mimeType.includes('officedocument.wordprocessingml') || 
         filename.endsWith('.doc') || 
         filename.endsWith('.docx');
}

function isExcel(mimeType, filename) {
  if (!mimeType) return false;
  return mimeType.includes('excel') || 
         mimeType.includes('spreadsheet') || 
         mimeType.includes('officedocument.spreadsheetml') || 
         filename.endsWith('.xls') || 
         filename.endsWith('.xlsx');
}

function isArchive(mimeType, filename) {
  if (!mimeType) return false;
  return mimeType.includes('zip') || 
         mimeType.includes('x-rar') || 
         filename.endsWith('.zip') || 
         filename.endsWith('.rar') || 
         filename.endsWith('.tar');
}

// Formatter helpers
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  return `${day}/${month}/${year}`;
}
</script>

<style scoped>
/* Scoped styles if needed to customize dragger styles */
:deep(.ant-upload-drag) {
  border-color: #d9d9d9 !important;
  background-color: #fcfcfc !important;
}
:deep(.ant-upload-drag:hover) {
  border-color: #059669 !important; /* emerald-600 */
}
</style>
