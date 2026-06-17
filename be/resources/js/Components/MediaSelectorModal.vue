<template>
  <a-modal
    :open="open"
    title="Chọn ảnh từ Thư viện File"
    @cancel="handleCancel"
    @ok="handleOk"
    width="850px"
    ok-text="Xác nhận"
    cancel-text="Hủy"
    :ok-button-props="{ disabled: !selectedFile }"
  >
    <div class="my-4">
      <a-tabs v-model:activeKey="activeTab">
        <!-- LIBRARY TAB -->
        <a-tab-pane key="library" tab="Thư viện ảnh">
          <div class="space-y-4 pt-2">
            <!-- Search Input -->
            <div class="flex gap-2">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Tìm kiếm file ảnh theo tên..."
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
            <div v-else class="grid grid-cols-4 sm:grid-cols-5 gap-3 max-h-[380px] overflow-y-auto p-1">
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
        </a-tab-pane>

        <!-- UPLOAD & CROP TAB -->
        <a-tab-pane key="upload" tab="Tải lên ảnh mới">
          <div class="space-y-6 pt-2">
            <!-- Cropper Mode -->
            <div v-if="imageToCrop" class="space-y-4">
              <div class="border rounded-xl overflow-hidden bg-gray-50 flex flex-col items-center p-4">
                <p class="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Điều chỉnh khu vực cắt ảnh (Tỷ lệ 4:3)</p>
                <div class="relative max-w-full overflow-hidden border border-gray-200 rounded-lg shadow-sm">
                  <canvas ref="cropCanvas" class="max-w-full h-auto bg-gray-100"></canvas>
                </div>
              </div>

              <!-- Cropper Controls -->
              <div class="bg-gray-50 p-4 rounded-xl border border-gray-150 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label class="block text-xs font-bold text-gray-500 mb-1">Thu phóng (Zoom): {{ cropScale }}x</label>
                  <input 
                    type="range" 
                    min="0.5" 
                    max="3" 
                    step="0.05" 
                    v-model.number="cropScale" 
                    class="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" 
                  />
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-500 mb-1">Dịch ngang (Offset X): {{ cropX }}px</label>
                  <input 
                    type="range" 
                    min="-400" 
                    max="400" 
                    step="2" 
                    v-model.number="cropX" 
                    class="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" 
                  />
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-500 mb-1">Dịch dọc (Offset Y): {{ cropY }}px</label>
                  <input 
                    type="range" 
                    min="-400" 
                    max="400" 
                    step="2" 
                    v-model.number="cropY" 
                    class="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" 
                  />
                </div>
              </div>

              <div class="flex justify-end gap-3">
                <a-button @click="resetCrop" class="font-bold">Hủy bỏ</a-button>
                <a-button type="primary" class="bg-emerald-700 hover:bg-emerald-800 border-none font-bold rounded-lg flex items-center gap-1.5" @click="confirmCropAndUpload">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                  Cắt & Tải lên
                </a-button>
              </div>
            </div>

            <!-- Standard Drop Zone -->
            <div v-else>
              <div 
                class="border-2 border-dashed border-gray-300 hover:border-emerald-600 rounded-xl p-10 text-center bg-gray-50/50 cursor-pointer transition-all flex flex-col items-center justify-center min-h-[220px]"
                @dragover.prevent="dragOver = true"
                @dragleave.prevent="dragOver = false"
                @drop.prevent="handleDrop"
                @click="triggerFileInput"
                :class="{ 'border-emerald-600 bg-emerald-50/30': dragOver }"
              >
                <input type="file" ref="fileInput" class="hidden" accept="image/*" @change="handleFileChange" />
                <svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-14 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p class="text-sm font-bold text-gray-700">Kéo và thả file ảnh vào đây, hoặc click để chọn tệp</p>
                <p class="text-xs text-gray-400 mt-1">Định dạng hỗ trợ: JPG, PNG, WEBP, GIF. Dung lượng tối đa: 5MB.</p>
              </div>

              <!-- Uploading state & progress bar -->
              <div v-if="uploading" class="mt-6 space-y-2 bg-gray-50 p-4 rounded-xl border border-gray-150">
                <div class="flex justify-between items-center text-xs text-gray-500 font-bold">
                  <span class="truncate max-w-[80%]">Đang tải tệp: {{ uploadFileName }}</span>
                  <span>{{ uploadProgress }}%</span>
                </div>
                <div class="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div class="bg-emerald-600 h-full transition-all duration-300" :style="{ width: uploadProgress + '%' }"></div>
                </div>
              </div>
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </a-modal>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';
import axios from 'axios';
import { message } from 'ant-design-vue';

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['close', 'select']);

const activeTab = ref('library');
const files = ref([]);
const filteredFiles = ref([]);
const searchQuery = ref('');
const loading = ref(false);
const selectedFile = ref(null);

// Drag & Drop / Upload state
const dragOver = ref(false);
const fileInput = ref(null);
const uploading = ref(false);
const uploadProgress = ref(0);
const uploadFileName = ref('');

// Crop state
const imageToCrop = ref(null);
const cropCanvas = ref(null);
const cropScale = ref(1);
const cropX = ref(0);
const cropY = ref(0);

let imgElement = null;
const targetWidth = 800;
const targetHeight = 600;

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
    message.error('Không thể tải danh sách tệp tin.');
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

// Upload Triggering
function triggerFileInput() {
  if (fileInput.value) {
    fileInput.value.click();
  }
}

function handleFileChange(e) {
  const file = e.target.files[0];
  processSelectedFile(file);
}

function handleDrop(e) {
  dragOver.value = false;
  const file = e.dataTransfer.files[0];
  processSelectedFile(file);
}

function processSelectedFile(file) {
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    message.error('Vui lòng chỉ tải lên định dạng hình ảnh!');
    return;
  }
  if (file.size / 1024 / 1024 > 5) {
    message.error('Dung lượng ảnh tối đa là 5MB!');
    return;
  }

  // Load image to cropper first
  uploadFileName.value = file.name;
  const reader = new FileReader();
  reader.onload = (event) => {
    imageToCrop.value = event.target.result;
    nextTick(() => {
      initCropper(event.target.result);
    });
  };
  reader.readAsDataURL(file);
}

function initCropper(dataUrl) {
  imgElement = new Image();
  imgElement.onload = () => {
    cropScale.value = 1.0;
    cropX.value = 0;
    cropY.value = 0;
    drawCroppedImage();
  };
  imgElement.src = dataUrl;
}

function drawCroppedImage() {
  const canvas = cropCanvas.value;
  if (!canvas || !imgElement) return;
  
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d');
  
  // Fill background
  ctx.fillStyle = '#f9fafb';
  ctx.fillRect(0, 0, targetWidth, targetHeight);
  
  const w = imgElement.width;
  const h = imgElement.height;
  
  // Base scale to fit
  const baseScale = Math.max(targetWidth / w, targetHeight / h);
  const scale = baseScale * cropScale.value;
  
  const drawW = w * scale;
  const drawH = h * scale;
  
  const x = (targetWidth - drawW) / 2 + cropX.value;
  const y = (targetHeight - drawH) / 2 + cropY.value;
  
  ctx.drawImage(imgElement, x, y, drawW, drawH);
}

watch([cropScale, cropX, cropY], () => {
  drawCroppedImage();
});

function resetCrop() {
  imageToCrop.value = null;
  imgElement = null;
}

function confirmCropAndUpload() {
  const canvas = cropCanvas.value;
  if (!canvas) return;
  
  canvas.toBlob((blob) => {
    if (blob) {
      // Get base original filename and change extension to webp
      let originalName = uploadFileName.value || 'upload.jpg';
      const lastDot = originalName.lastIndexOf('.');
      if (lastDot !== -1) {
        originalName = originalName.substring(0, lastDot);
      }
      uploadFile(blob, `${originalName}_cropped.webp`);
    }
  }, 'image/webp', 0.92);
}

async function uploadFile(fileBlob, filename) {
  uploading.value = true;
  uploadProgress.value = 0;
  
  const formData = new FormData();
  formData.append('file', fileBlob, filename);
  
  try {
    const response = await axios.post('/admin/media', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        uploadProgress.value = percentCompleted;
      },
    });
    
    message.success(`Tải ảnh mới thành công!`);
    resetCrop();
    
    // Switch to library tab and refresh files
    activeTab.value = 'library';
    await fetchFiles();
    
    // Auto-select the newly uploaded file (first element since we fetch sorted by created_at desc)
    if (files.value.length > 0) {
      selectedFile.value = files.value[0];
    }
  } catch (error) {
    console.error('Failed to upload media:', error);
    message.error('Lỗi khi tải ảnh lên máy chủ.');
  } finally {
    uploading.value = false;
  }
}

// Fetch files when modal is opened
watch(() => props.open, (newVal) => {
  if (newVal) {
    searchQuery.value = '';
    activeTab.value = 'library';
    resetCrop();
    fetchFiles();
  }
});
</script>
