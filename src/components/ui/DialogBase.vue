<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-[1000] flex items-center justify-center px-[16px]"
      role="dialog"
      aria-modal="true"
    >
      <div class="absolute inset-0 bg-black/30" @click="emit('close')" />

      <div class="relative w-full max-w-[980px] bg-white p-[32px] shadow-xl">
        <button
          v-if="showClose"
          type="button"
          class="absolute right-[18px] top-[18px] leading-none text-[#111]"
          aria-label="Close dialog"
          @click="emit('close')"
        >
          ×
        </button>

        <slot />
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  open: boolean
  showClose?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>
