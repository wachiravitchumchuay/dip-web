<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
  >
    <div
      class="bg-white rounded-xl shadow-2xl w-full max-w-[800px] flex flex-col overflow-hidden animate-fade-in"
    >
      <div class="px-6 py-4 border-b flex justify-between items-center bg-white z-10">
        <h3 class="text-xl font-bold text-gray-800">แก้ไขรูปภาพ</h3>
        <button @click="closeModal" class="text-gray-400 hover:text-gray-600 transition-colors">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div
        class="relative bg-[#222] h-[400px] w-full flex items-center justify-center overflow-hidden"
      >
        <img ref="imageRef" :src="imageSrc" class="block max-w-full" style="opacity: 0" />
      </div>

      <div
        class="px-8 py-6 bg-white flex flex-col gap-6 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] z-10"
      >
        <div class="flex items-center justify-between gap-6">
          <button
            @click="resetCrop"
            class="flex flex-col items-center gap-1 text-gray-500 hover:text-[#FF5C39] transition-colors min-w-[60px]"
          >
            <div
              class="p-2 rounded-full bg-gray-50 hover:bg-[#FFF0ED] border border-transparent hover:border-[#FF5C39]/20"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 12" />
                <path d="M3 3v9h9" />
              </svg>
            </div>
            <span class="text-xs font-medium">คืนค่า</span>
          </button>

          <div
            class="flex-1 flex items-center gap-4 px-4 bg-gray-50 rounded-lg py-3 mx-2 border border-gray-100"
          >
            <svg
              class="text-gray-400"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>

            <input
              type="range"
              min="0.1"
              max="3.0"
              step="0.01"
              v-model.number="zoomValue"
              @input="onZoomChange"
              class="w-full custom-slider"
            />

            <svg
              class="text-gray-600"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>

          <button
            @click="rotateRight"
            class="flex flex-col items-center gap-1 text-gray-500 hover:text-[#FF5C39] transition-colors min-w-[60px]"
          >
            <div
              class="p-2 rounded-full bg-gray-50 hover:bg-[#FFF0ED] border border-transparent hover:border-[#FF5C39]/20"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M21 12a9 9 0 1 1-9-9 9.75 9.75 0 0 1 6.74 2.74L21 12" />
                <path d="M21 3v9h-9" />
              </svg>
            </div>
            <span class="text-xs font-medium">หมุนภาพ</span>
          </button>
        </div>

        <div class="flex items-center justify-between pt-4 border-t border-gray-100">
          <button
            @click="closeModal"
            class="px-6 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
          >
            ยกเลิก
          </button>

          <button
            @click="confirmCrop"
            class="px-8 py-2.5 bg-[#1B8A6B] hover:bg-[#157056] text-white rounded-lg font-medium shadow-sm hover:shadow-md flex items-center gap-2 transition-all"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            ใช้รูปภาพนี้
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import Cropper from 'cropperjs'
// import 'cropperjs/dist/cropper.css';

const emit = defineEmits(['confirm', 'cancel'])

const isVisible = ref(false)
const imageSrc = ref('')
const imageRef = ref(null)
const zoomValue = ref(0)
let cropper = null

const openModal = (file) => {
  if (!file) return
  imageSrc.value = URL.createObjectURL(file)
  isVisible.value = true
  zoomValue.value = 0

  nextTick(() => {
    initCropper()
  })
}

const initCropper = () => {
  if (cropper) cropper.destroy()

  cropper = new Cropper(imageRef.value, {
    aspectRatio: NaN,
    viewMode: 1,
    dragMode: 'move',
    autoCropArea: 1,
    restore: false,
    guides: true,
    center: true,
    highlight: false,
    cropBoxMovable: true,
    cropBoxResizable: true,
    toggleDragModeOnDblclick: false,
    background: false,

    ready() {
      // Ready
    },

    zoom: (event) => {
      zoomValue.value = event.detail.ratio
    },
  })
}

const onZoomChange = () => {
  if (cropper) {
    cropper.zoomTo(zoomValue.value)
  }
}

const rotateRight = () => {
  if (cropper) {
    cropper.rotate(90)
  }
}

const resetCrop = () => {
  if (cropper) {
    cropper.reset()
  }
}

const confirmCrop = () => {
  if (!cropper) return

  cropper.getCroppedCanvas().toBlob(
    (blob) => {
      emit('confirm', blob)
      closeModal()
    },
    'image/jpeg',
    0.95,
  )
}

const closeModal = () => {
  isVisible.value = false
  if (cropper) {
    cropper.destroy()
    cropper = null
  }
  emit('cancel')
}

defineExpose({ openModal })
</script>
