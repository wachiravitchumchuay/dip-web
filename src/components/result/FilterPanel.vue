<template>
  <aside class="w-/12 rounded-[12px] bg-[#F3F3F3] p-[12px] text-[18px]">
    <div class="flex items-center justify-between">
      <div class="font-semibold">กรองการค้นหา</div>
      <button type="button" class="text-[14px] text-[#666666]" @click="$emit('clear')">
        ล้างการกรอง
      </button>
    </div>

    <div class="mt-[12px] flex flex-col gap-[10px]">
      <button
        v-for="x in items"
        :key="x"
        type="button"
        class="flex h-[48px] w-full items-center justify-between rounded-[10px] border border-[#D9D9D9] bg-white px-[12px] text-[16px]"
        @click="$emit('apply', x)"
      >
        <span>{{ x }}</span>
        <span class="text-[#999999]">›</span>
      </button>
    </div>
  </aside>
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