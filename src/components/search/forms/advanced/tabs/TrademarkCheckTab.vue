<template>
  <div class="w-full">
    <div class="border border-[#D9D9D9] bg-white p-[16px]">
      <div class="border border-[#E08A8A] bg-[#F8D7DA] px-[12px] py-[10px] text-[#B21F29]">
        หมายเหตุ: กรณีเครื่องหมายการค้าประกอบด้วยคำ
        โปรดตรวจสอบความเหมือนคล้ายด้วยวิธีตรวจสอบความเหมือนคล้ายของเครื่องหมายอีกครั้ง
      </div>

      <div class="mt-[16px] border border-dashed border-[#D9D9D9] bg-white px-[16px] py-[26px]">
        <input
          ref="fileInput"
          type="file"
          accept=".jpg,.jpeg,.png"
          class="hidden"
          @change="onPickFile"
        />

        <div class="flex flex-col items-center justify-center text-center">
          <div class="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#F8D7DA]">
            <span class="text-[#B21F29]">＋</span>
          </div>

          <div class="mt-[12px] text-black">
            ลากไฟล์ภาพมาวางที่นี่ หรือ
            <button type="button" class="text-[#B21F29] underline" @click="openFilePicker">
              เลือกไฟล์อัปโหลด
            </button>
          </div>

          <div class="mt-[6px] text-black">
            นามสกุลของไฟล์แนะนำเป็น .JPG, .PNG, ขนาดไฟล์ไม่เกิน 10MB และขนาดรูปภาพไม่น้อยกว่า 250 x
            250 px
          </div>

          <div v-if="fileName" class="mt-[12px] text-[#1B8A6B]">ไฟล์ที่เลือก: {{ fileName }}</div>
        </div>
      </div>

      <div class="mt-[16px] flex items-center justify-between">
        <button type="button" class="h-15 bg-[#F5A623] px-[18px] text-black" @click="onClear">
          ล้างเงื่อนไข
        </button>

        <button type="button" class="h-15 bg-[#1B8A6B] px-[18px] text-white" @click="onSubmit">
          ค้นหาข้อมูล
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  keyword: string
}>()

const emit = defineEmits<{
  (e: 'submit', payload: unknown): void
  (e: 'clear'): void
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const file = ref<File | null>(null)
const fileName = ref('')

function openFilePicker() {
  fileInput.value?.click()
}

function onPickFile(e: Event) {
  const input = e.target as HTMLInputElement
  const f = input.files?.[0] ?? null
  file.value = f
  fileName.value = f?.name ?? ''
}

function onClear() {
  file.value = null
  fileName.value = ''
  if (fileInput.value) fileInput.value.value = ''
  emit('clear')
}

function onSubmit() {
  emit('submit', {
    mode: 'trademark-check',
    keyword: props.keyword,
    fileName: fileName.value,
  })
}
</script>
