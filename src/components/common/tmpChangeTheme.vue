<template>
  <div class="ml-auto flex items-center gap-2 text-sm border-2">
    temp: theme selector
    <select class="rounded-md border px-2 py-1" :value="theme" @change="onChange">
      <option value="yellow-black">yellow-black</option>
      <option value="black-yellow">black-yellow</option>
      <option value="black-white">black-white</option>
      <option value="white-black">white-black</option>
      <option value="white-red">white-red</option>
      <option value="red-white">red-white</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getTheme, setTheme, type AppTheme } from '@/utils/theme'

const theme = ref<AppTheme>(getTheme())

function onChange(e: Event) {
  const value = (e.target as HTMLSelectElement).value as AppTheme
  theme.value = value
  setTheme(value)
}
</script>
