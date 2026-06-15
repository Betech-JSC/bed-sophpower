<template>
  <a-modal
    :open="open"
    title="Chọn ảnh từ Thư viện File"
    @cancel="handleCancel"
    @ok="handleOk"
    width="800px"
    ok-text="Xác nhận"
    cancel-text="Hủy"
    :ok-button-props="{ disabled: !selectedFile }"
  >
    <div class="space-y-4 my-4">
      <!-- Search Input -->
      <div class="flex gap-2">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Tìm kiếm file ảnh..."
          class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600"
          @input="filterFiles"
        />
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-700"></div>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredFiles.length === 0" class="text-center py-12 text-gray-500 text-sm">
        Không tìm thấy file ảnh nào trong thư viện.
      </div>

      <!-- Grid list -->
      <div v-else class="grid grid-cols-4 sm:grid-cols-5 gap-3 max-h-[400px] overflow-y-auto p-1">
        <div
          v-for="file in filteredFiles"
          :key="file.id"
          @click="selectFile(file)"
          @dblclick="confirmSelect(file)"
          class="border rounded-lg overflow-hidden cursor-pointer hover:border-emerald-600 transition-all flex flex-col relative group"
          :class="selectedFile?.id === file.id ? 'border-emerald-600 ring-2 ring-emerald-500/20' : 'border-gray-200'"
        >
          <!-- Thumbnail -->
          <div class="aspect-square bg-gray-50 flex items-center justify-center overflow-hidden border-b border-gray-100">
            <img :src="file.url" :alt="file.name" class="w-full h-full object-cover" />
          </div>
          <!-- Label -->
          <div class="p-2 text-xs truncate font-medium text-gray-700" :title="file.name">
            {{ file.name }}
          </div>
          
          <!-- Checked Badge -->
          <div v-if="selectedFile?.id === file.id" class="absolute top-1.5 right-1.5 bg-emerald-600 text-white rounded-full p-0.5 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['close', 'select']);

const files = ref([]);
const filteredFiles = ref([]);
const searchQuery = ref('');
const loading = ref(false);
const selectedFile = ref(null);

// Fetch files from admin media JSON endpoint
async function fetchFiles() {
  loading.value = true;
  selectedFile.value = null;
  try {
    const response = await axios.get('/admin/media/json?type=image');
    files.value = response.data;
    filterFiles();
  } catch (error) {
    console.error('Failed to fetch media files:', error);
  } finally {
    loading.value = false;
  }
}

// Filter files based on search input
function filterFiles() {
  if (!searchQuery.value) {
    filteredFiles.value = files.value;
  } else {
    const query = searchQuery.value.toLowerCase();
    filteredFiles.value = files.value.filter(file =>
      file.name.toLowerCase().includes(query)
    );
  }
}

function selectFile(file) {
  selectedFile.value = file;
}

function handleCancel() {
  emit('close');
}

function handleOk() {
  if (selectedFile.value) {
    emit('select', selectedFile.value);
  }
}

function confirmSelect(file) {
  selectedFile.value = file;
  emit('select', file);
}

// Fetch files when modal is opened
watch(() => props.open, (newVal) => {
  if (newVal) {
    searchQuery.value = '';
    fetchFiles();
  }
});
</script>
