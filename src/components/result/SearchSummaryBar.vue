<template>
  <div class="w-full border border-[#D9D9D9] bg-white p-[16px] text-18">
    <div class="flex items-center justify-between gap-[12px]">
      <div>
        <div class="font-semibold">เงื่อนไขในการค้นหา</div>
        <div class="mt-[4px] text-[#666666]">
          ค้นหาด้วย : {{ datasetLabel }}<span v-if="keyword">, {{ keyword }}</span>
        </div>
      </div>

      <button
        type="button"
        class="h-[40px] border border-[#B21F29] px-[14px] text-[#B21F29]"
        @click="$emit('edit')"
      >
        แก้ไขเงื่อนไขการค้นหา
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  dataset?: string
  keyword?: string
}>()

defineEmits<{
  (e: 'edit'): void
}>()

const datasetLabel = props.dataset ?? 'ทั้งหมด'
</script>
