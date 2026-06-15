<template>
  <div class="rich-text-editor-container">
    <div ref="editorElement" class="min-h-[250px] bg-white text-gray-800"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';

const props = defineProps({
  value: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Nhập nội dung...',
  }
});

const emit = defineEmits(['update:value']);

const editorElement = ref(null);
let quill = null;

onMounted(() => {
  if (typeof window !== 'undefined' && window.Quill) {
    quill = new window.Quill(editorElement.value, {
      theme: 'snow',
      placeholder: props.placeholder,
      modules: {
        toolbar: [
          [{ 'header': [1, 2, 3, 4, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'align': [] }],
          ['link', 'image', 'clean']
        ]
      }
    });

    // Set initial content
    if (props.value) {
      quill.root.innerHTML = props.value;
    }

    // Listen to changes and emit
    quill.on('text-change', () => {
      let html = quill.root.innerHTML;
      if (html === '<p><br></p>') html = ''; // Normalize empty content
      emit('update:value', html);
    });

    // Watch for external value changes (only if it differs from current content to avoid cursor jumping)
    watch(() => props.value, (newVal) => {
      if (quill && newVal !== quill.root.innerHTML) {
        quill.root.innerHTML = newVal || '';
      }
    });
  } else {
    console.error("Quill editor is not loaded from CDN.");
  }
});
</script>

<style>
/* Custom Quill Editor Styles to fit CMS premium styling */
.ql-toolbar.ql-snow {
  border: 1px solid #e5e7eb !important;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  background-color: #f9fafb;
  padding: 8px 12px;
}
.ql-container.ql-snow {
  border: 1px solid #e5e7eb !important;
  border-top: none !important;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  font-family: inherit;
  font-size: 0.875rem;
}
.ql-editor {
  min-height: 250px;
  max-height: 500px;
  overflow-y: auto;
  line-height: 1.6;
}
.ql-editor.ql-blank::before {
  font-style: normal;
  color: #9ca3af;
  left: 15px;
}
</style>
