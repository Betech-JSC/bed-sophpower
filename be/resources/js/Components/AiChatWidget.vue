<template>
  <div class="relative">
    <!-- Float Chat Bubble Button -->
    <button
      @click="toggleChat"
      class="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer focus:outline-none"
      title="Trợ lý AI Sophpower"
    >
      <span v-if="isOpen">
        <!-- Close Icon -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </span>
      <span v-else class="relative flex items-center justify-center">
        <!-- AI/Robot Icon -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        <!-- Pulse ring for attention -->
        <span class="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border border-white"></span>
        </span>
      </span>
    </button>

    <!-- Chat Popup Window -->
    <div
      v-if="isOpen"
      class="fixed bottom-24 right-6 z-50 w-96 h-[520px] bg-white rounded-2xl shadow-2xl border border-gray-150 flex flex-col overflow-hidden animate-fade-in"
    >
      <!-- Chat Header -->
      <div class="bg-emerald-700 text-white p-4 flex items-center justify-between shrink-0 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-full bg-emerald-600/50 flex items-center justify-center text-white border border-emerald-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h3 class="text-sm font-bold tracking-tight">Trợ lý AI Sophpower</h3>
            <p class="text-[10px] text-emerald-250 flex items-center gap-1">
              <span class="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Trực tuyến • Gemini AI
            </p>
          </div>
        </div>
        <button
          @click="toggleChat"
          class="text-emerald-100 hover:text-white hover:bg-emerald-600/30 p-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
      </div>

      <!-- Chat Messages Area -->
      <div class="flex-1 overflow-y-auto p-4 space-y-3.5 bg-gray-50/50" ref="messageBox">
        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="[
            msg.role === 'user' ? 'justify-end' : 'justify-start',
            'flex w-full items-start gap-2.5'
          ]"
        >
          <!-- Robot Icon for AI responses -->
          <div
            v-if="msg.role !== 'user'"
            class="w-7 h-7 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center text-xs shrink-0 border border-emerald-100"
          >
            AI
          </div>

          <!-- Message bubble -->
          <div
            :class="[
              msg.role === 'user'
                ? 'bg-emerald-700 text-white rounded-t-xl rounded-bl-xl ml-auto'
                : 'bg-white text-gray-800 rounded-t-xl rounded-br-xl border border-gray-150 mr-auto',
              'p-3 max-w-[80%] text-[13px] leading-relaxed shadow-2xs'
            ]"
          >
            <div v-html="formatContent(msg.content)"></div>
          </div>
        </div>

        <!-- Loading / Typing Indicator -->
        <div v-if="isLoading" class="flex w-full items-start gap-2.5 justify-start">
          <div class="w-7 h-7 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center text-xs shrink-0 border border-emerald-100">
            AI
          </div>
          <div class="bg-white border border-gray-150 rounded-t-xl rounded-br-xl p-3 w-16 shadow-2xs flex items-center justify-center gap-1">
            <span class="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0ms"></span>
            <span class="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 150ms"></span>
            <span class="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 300ms"></span>
          </div>
        </div>
      </div>

      <!-- Quick Suggestions Bar -->
      <div class="px-3 py-2 border-t border-gray-100 bg-white flex gap-1.5 overflow-x-auto shrink-0 select-none no-scrollbar">
        <button
          v-for="sug in suggestions"
          :key="sug.text"
          @click="useSuggestion(sug.prompt)"
          class="shrink-0 text-[11px] font-bold text-gray-700 bg-gray-100 hover:bg-emerald-50 hover:text-emerald-800 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-emerald-200 transition-all cursor-pointer focus:outline-none"
        >
          {{ sug.text }}
        </button>
      </div>

      <!-- Chat Input Area -->
      <form @submit.prevent="sendMessage" class="p-3 border-t border-gray-150 bg-white flex items-center gap-2 shrink-0">
        <input
          v-model="inputMessage"
          type="text"
          placeholder="Nhập nội dung yêu cầu dịch, soạn thảo..."
          class="flex-1 border border-gray-200 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 rounded-xl px-3.5 py-2 text-xs focus:outline-none bg-gray-50/50"
          :disabled="isLoading"
          ref="chatInput"
        />
        <button
          type="submit"
          class="bg-emerald-700 hover:bg-emerald-800 text-white w-9 h-9 rounded-xl flex items-center justify-center transition-colors cursor-pointer shrink-0 disabled:opacity-50"
          :disabled="!inputMessage.trim() || isLoading"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { nextTick, ref } from 'vue';
import axios from 'axios';

const isOpen = ref(false);
const isLoading = ref(false);
const inputMessage = ref('');
const messageBox = ref(null);
const chatInput = ref(null);

const messages = ref([
  {
    role: 'model',
    content: 'Xin chào! Tôi là Trợ lý AI của Sophpower. Tôi có thể giúp bạn dịch thuật nội dung Việt-Anh, soạn thảo mô tả sản phẩm, viết bài tuyển dụng hoặc tối ưu các thẻ SEO bài viết. Bạn cần tôi hỗ trợ việc gì hôm nay?',
  }
]);

const suggestions = [
  { text: '🇻🇳 Dịch Việt -> Anh', prompt: 'Dịch đoạn văn bản sau từ tiếng Việt sang tiếng Anh chuyên ngành (văn phong chuyên nghiệp, chuẩn xác):\n\n' },
  { text: '🇬🇧 Dịch Anh -> Việt', prompt: 'Dịch đoạn văn bản sau từ tiếng Anh sang tiếng Việt (mượt mà, tự nhiên, chuẩn kỹ thuật):\n\n' },
  { text: '📦 Viết mô tả Sản phẩm', prompt: 'Viết một bài mô tả sản phẩm chi tiết cho nguyên liệu sau (nêu công dụng, ứng dụng và định dạng bài viết chuẩn hóa):\n\nTên nguyên liệu: ' },
  { text: '🔍 Đề xuất từ khóa & SEO', prompt: 'Đọc nội dung sau và đề xuất 1 tiêu đề SEO (dưới 60 ký tự), 1 thẻ mô tả SEO (dưới 160 ký tự) cùng danh sách 5 từ khóa chính:\n\n' },
];

function toggleChat() {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    nextTick(() => {
      scrollToBottom();
      if (chatInput.value) chatInput.value.focus();
    });
  }
}

function useSuggestion(promptText) {
  inputMessage.value = promptText;
  if (chatInput.value) chatInput.value.focus();
}

function scrollToBottom() {
  if (messageBox.value) {
    messageBox.value.scrollTop = messageBox.value.scrollHeight;
  }
}

async function sendMessage() {
  const text = inputMessage.value.trim();
  if (!text || isLoading.value) return;

  // Append user message
  messages.value.push({ role: 'user', content: text });
  inputMessage.value = '';
  isLoading.value = true;
  
  nextTick(() => {
    scrollToBottom();
  });

  try {
    const response = await axios.post('/admin/ai/chat', {
      messages: messages.value.map(m => ({
        role: m.role,
        content: m.content
      }))
    });

    if (response.data && response.data.content) {
      messages.value.push({
        role: response.data.role || 'model',
        content: response.data.content
      });
    } else {
      messages.value.push({
        role: 'model',
        content: 'Xin lỗi, tôi gặp lỗi khi nhận dữ liệu phản hồi từ máy chủ AI.'
      });
    }
  } catch (error) {
    console.error('AI chat widget error:', error);
    const errMsg = error.response?.data?.content || 'Không thể kết nối với máy chủ AI. Vui lòng kiểm tra lại kết nối mạng hoặc thử lại sau.';
    messages.value.push({
      role: 'model',
      content: errMsg
    });
  } finally {
    isLoading.value = false;
    nextTick(() => {
      scrollToBottom();
      if (chatInput.value) chatInput.value.focus();
    });
  }
}

function formatContent(text) {
  if (!text) return '';
  
  // Escape HTML entities to prevent XSS, but preserve formatting we inject
  let formatted = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Render headers
  formatted = formatted.replace(/^### (.*?)$/gm, '<h5 class="font-bold text-gray-900 text-xs mt-2 mb-1">$1</h5>');
  formatted = formatted.replace(/^## (.*?)$/gm, '<h4 class="font-bold text-gray-900 text-sm mt-3 mb-1.5">$1</h4>');
  formatted = formatted.replace(/^# (.*?)$/gm, '<h3 class="font-bold text-gray-900 text-base mt-4 mb-2">$1</h3>');

  // Bold text **word**
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-emerald-850">$1</strong>');
  
  // Bullet lists
  formatted = formatted.replace(/^\* (.*?)$/gm, '<div class="pl-3 flex items-start gap-1 mb-1"><span>•</span><span>$1</span></div>');
  formatted = formatted.replace(/^- (.*?)$/gm, '<div class="pl-3 flex items-start gap-1 mb-1"><span>•</span><span>$1</span></div>');

  // Convert double newlines to paragraph gaps, single newlines to br
  formatted = formatted.replace(/\n\n/g, '<div class="h-2"></div>');
  formatted = formatted.replace(/\n/g, '<br/>');

  return formatted;
}
</script>

<style scoped>
.animate-fade-in {
  animation: slideUpFade 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideUpFade {
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Light styling for scroll inside popup message box */
div::-webkit-scrollbar {
  width: 5px;
}
div::-webkit-scrollbar-track {
  background: transparent;
}
div::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 99px;
}
div::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.18);
}
</style>
