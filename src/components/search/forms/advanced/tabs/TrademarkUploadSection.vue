<template>
  <div class="w-full">
    <div class="bg-white">

      <div class="flex items-start gap-3 rounded-lg border border-[#FFC5C5] bg-[#FFECEB] px-[16px] py-[12px] text-[#D12E2E] mb-[24px]">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="shrink-0 mt-[2px]">
          <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/>
          <path d="M12 7V7.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M12 10V17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        <span class="font-medium">
          หมายเหตุ: กรณีเครื่องหมายการค้าประกอบด้วยคำ โปรดตรวจสอบความเหมือนคล้ายด้วยวิธีตรวจสอบความเหมือนคล้ายของเครื่องหมายอีกครั้ง
        </span>
      </div>

      <div
        class="rounded-xl border-[2px] border-dashed border-[#BDBDBD] bg-white px-[16px] py-[40px] hover:bg-gray-50 transition-colors relative cursor-pointer"
        @click="triggerFileInput"
      >
        <input
          ref="fileInputRef"
          type="file"
          accept=".jpg,.jpeg,.png"
          class="hidden"
          @change="onFileChanged"
        />

        <div class="flex flex-col items-center justify-center text-center">
          <div class="mb-4 relative">
             <div class="flex h-[64px] w-[64px] items-center justify-center rounded-full bg-[#FFECEB]">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="#FF5C39" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10Z" stroke="#FF5C39" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M21 15L16 10L5 21" stroke="#FF5C39" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
             </div>
          </div>

          <div class="mt-[12px] text-lg text-[#333] font-bold">
            ลากไฟล์ภาพมาวางที่นี่ หรือ
            <button type="button" class="text-[#B21F29] underline decoration-[#B21F29] underline-offset-2 hover:text-[#D14022]">
              เลือกไฟล์อัปโหลด
            </button>
          </div>

          <div class="mt-[8px] text-[#888] text-sm">
            นามสกุลของไฟล์แนะนำเป็น .JPG, .PNG ขนาดไฟล์ไม่เกิน 500KB
          </div>

          <div v-if="fileName" class="mt-[16px] inline-flex items-center gap-2 rounded-full bg-[#E8F5E9] px-4 py-1 text-[#1B8A6B] font-medium border border-[#1B8A6B]/20">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            ไฟล์พร้อมค้นหา: {{ fileName }}
          </div>
        </div>
      </div>
    </div>

    <ImageSearchModal
      ref="cropModalRef"
      @confirm="onCropConfirmed"
      @cancel="onCropCancelled"
    />

  </div>
</template>

<script setup lang="ts">
import ImageSearchModal from './ImageSearchModal.vue'
import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'file-selected', file: File | null, fileName: string): void
}>();

const fileInputRef = ref<HTMLInputElement | null>(null);
const fileName = ref('');
const cropModalRef = ref<any>(null); // อ้างอิงไปที่ตัว Modal

// 1. กดที่กล่อง -> เปิดหน้าต่างเลือกไฟล์
function triggerFileInput() {
  fileInputRef.value?.click();
}

// 2. เมื่อเลือกไฟล์เสร็จ -> เปิด Modal (ยังไม่ส่งค่าออกไป)
function onFileChanged(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (file) {
    fileName.value = file.name; // เก็บชื่อไว้โชว์
    // เปิด Modal พร้อมส่งไฟล์ไป
    cropModalRef.value?.openModal(file);

    // เคลียร์ input เพื่อให้เลือกไฟล์เดิมซ้ำได้
    input.value = '';
  }
}

// 3. เมื่อกด "ยืนยัน" ใน Modal -> รับ Blob กลับมา -> ส่งต่อไปทำงาน
function onCropConfirmed(blob: Blob) {
  // แปลง Blob กลับเป็น File Object
  const processedFile = new File([blob], fileName.value, { type: blob.type });

  // Emit ส่งค่าออกไปให้หน้าหลัก
  emit('file-selected', processedFile, fileName.value);
}

// 4. เมื่อกด "ยกเลิก" ใน Modal
function onCropCancelled() {
  fileName.value = ''; // ล้างชื่อไฟล์
  emit('file-selected', null, '');
}

// ฟังก์ชัน Clear (เผื่อหน้าหลักเรียกใช้)
function clear() {
  fileName.value = '';
  if (fileInputRef.value) fileInputRef.value.value = '';
  emit('file-selected', null, '');
}

defineExpose({ clear });
</script>
