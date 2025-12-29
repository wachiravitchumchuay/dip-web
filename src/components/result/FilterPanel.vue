<template>
  <div class="w-/12 app-light-gray p-[12px] text-18">
    <div class="flex items-center justify-between">
      <div class="font-semibold">กรองการค้นหา</div>
      <button type="button" class="text-[#666666]" @click="$emit('clear')">ล้างการกรอง</button>
    </div>

    <div class="mt-[12px] flex flex-col gap-[10px]">
      <button
        v-for="x in items"
        :key="x"
        type="button"
        class="flex h-12 w-full items-center justify-between border border-[#D9D9D9] bg-white px-[12px]"
        @click="$emit('apply', x)"
      >
        <span>{{ x }}</span>
        <span class="text-[#999999]">›</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
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
