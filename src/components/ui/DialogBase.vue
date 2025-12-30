<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-[1000] flex items-center justify-center px-[16px]"
      role="dialog"
      aria-modal="true"
    >
      <div class="absolute inset-0 bg-black/30" @click="emit('close')" />

      <div :class="['relative w-full bg-white p-[32px] shadow-xl', sizeClass, contentClass]">
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
import { computed } from 'vue'

type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

const props = withDefaults(
  defineProps<{
    open: boolean
    showClose?: boolean
    size?: DialogSize
    contentClass?: string
  }>(),
  {
    showClose: true,
    size: 'md',
    contentClass: '',
  },
)

const emit = defineEmits<{
  (e: 'close'): void
}>()

const sizeClass = computed(() => {
  if (props.size === 'sm') return 'max-w-[360px]'
  if (props.size === 'md') return 'max-w-[480px]'
  if (props.size === 'lg') return 'max-w-[640px]'
  if (props.size === 'xl') return 'max-w-[800px]'
  return 'max-w-[95vw]'
})
</script>
