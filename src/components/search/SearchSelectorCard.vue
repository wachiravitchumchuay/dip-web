<template>
  <button
    type="button"
    class="h-[140px] w-full border border-[#B21F29] p-[8px] text-left items-start"
    :class="selected ? 'custom-red-bg text-white' : 'bg-white text-custom-red'"
    @click="emit('click')"
  >
    <div class="flex flex-col gap-[8px] pl-4">
      <div class="flex h-[48px] w-[48px] items-center justify-center rounded-full! bg-[#B21F29]">
        <img :src="iconSrc" class="h-[32px] w-[32px]" alt="" />
      </div>

      <div class="text-18 leading-tight">{{ label }}</div>
    </div>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  selected: boolean
  iconSrc: string
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>
