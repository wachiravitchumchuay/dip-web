<template>
  <div v-if="show" class="fixed inset-0 z-[9999] bg-white">
    <div class="flex h-full w-full items-center justify-center">
      <div class="flex flex-col items-center gap-[16px]">
        <img src="/book-open-02.svg" class="h-15 w-15" alt="" />

        <div class="h-[2px] w-[420px] overflow-hidden rounded bg-[#D9D9D9]">
          <div
            class="h-full bg-[#B21F29] transition-[width] duration-[2000ms] ease-linear"
            :style="{ width: barWidth }"
          />
        </div>

        <div class="font-semibold text-[#B21F29]">TRADE MARKS CHECKER</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'

const props = defineProps<{ show: boolean }>()

const barWidth = ref('0%')

watch(
  () => props.show,
  async (isShow) => {
    if (!isShow) {
      barWidth.value = '0%'
      return
    }

    barWidth.value = '0%'
    await nextTick()
    requestAnimationFrame(() => {
      barWidth.value = '100%'
    })
  },
  { immediate: true },
)
</script>
