<template>
  <div class="app-bg-gray-3 p-[12px] text-18 h-fit">
    <div class="flex items-center justify-between">
      <div class="font-semibold">กรองการค้นหา</div>
      <button type="button" class="text-[#666666]" @click="$emit('clear')">ล้างการกรอง</button>
    </div>

    <div class="border app-border-gray-2 my-[20px]"></div>

    <div class="mt-[12px] flex flex-col gap-[10px]">
      <button
        v-for="x in items"
        :key="x"
        type="button"
        class="flex h-12 w-full items-center justify-between px-[12px]"
        @click="$emit('apply', x)"
      >
        <span>{{ x }}</span>
        <span class="text-[#999999]"><CircleArrowRight01Icon /></span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import CircleArrowRight01Icon from '@/assets/icons/circle-arrow-right-01.svg'
defineEmits<{
  (e: 'apply', payload: unknown): void
  (e: 'clear'): void
}>()

const items = [
  'วัน/เดือน/ปี',
  'เจ้าของเครื่องหมาย',
  'จำพวกสินค้าและบริการ',
  'สถานะ',
  'ประเภทที่จดทะเบียน',
]
</script>
