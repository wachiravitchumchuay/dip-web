<template>
  <div
    class="h-max-[140px] w-full border border-[#B21F29] p-[8px] text-left items-start"
    :class="selected ? 'app-bg-red text-white' : 'bg-white app-text-red'"
    @click="emit('click')"
  >
    <div class="flex flex-col gap-[8px] p-4">
      <div class="flex h-12 w-12 items-center justify-center rounded-full! bg-[#B21F29]">
        <img :src="iconSrc" class="h-8 w-8" alt="" />
      </div>

      <div class="text-18 leading-tight">{{ label }}</div>
    </div>
  </div>
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
