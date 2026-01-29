<template>
  <div
    class="flex items-center justify-between border app-border-gray-2 app-bg-gray-2 mt-[24px] p-[24px]"
  >
    <div>
      <div class="font-semibold">เงื่อนไขในการค้นหา</div>
      <div>
        ค้นหาด้วย : {{ datasetLabel }}<span v-if="keyword"> / {{ keyword }}</span>
      </div>
    </div>

    <button
      type="button"
      class="app-button-fit app-text-red app-bg-red-2 app-border-red"
      @click="$emit('edit')"
    >
      <div class="flex pl-2">
        <Exchange01Icon />
        <div class="pl-2">แก้ไขเงื่อนไขการค้นหา</div>
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
import Exchange01Icon from '@/assets/icons/exchange-01.svg'
const props = defineProps<{
  dataset?: string
  keyword?: string
}>()

defineEmits<{
  (e: 'edit'): void
}>()

const datasetLabel = props.dataset ?? 'ทั้งหมด'
</script>
