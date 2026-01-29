<template>
  <button class="theme-toggle" type="button" @click="toggleTheme">
    <span class="label">{{ themeLabel }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

const theme = ref<Theme>('light')

const themeLabel = computed(() => {
  return theme.value === 'dark' ? 'โหมดผู้พิการทางสายตา' : 'โหมดปกติ'
})

function readThemeFromLocalStorage(): Theme | null {
  const value = localStorage.getItem(STORAGE_KEY)

  if (value === 'dark') return 'dark'
  if (value === 'light') return 'light'

  return null
}

function saveThemeToLocalStorage(value: Theme): void {
  localStorage.setItem(STORAGE_KEY, value)
}

function applyThemeClassToHtml(value: Theme): void {
  const html = document.documentElement

  if (value === 'dark') {
    html.classList.add('dark')
    return
  }

  html.classList.remove('dark')
}

function toggleTheme(): void {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}

onMounted(() => {
  const storedTheme = readThemeFromLocalStorage()
  theme.value = storedTheme ?? 'light'
  applyThemeClassToHtml(theme.value)
})

watch(theme, (newTheme) => {
  saveThemeToLocalStorage(newTheme)
  applyThemeClassToHtml(newTheme)
})
</script>

<style scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid var(--border-color, #d8d8d8);
  background: var(--card-bg, #f6f6f6);
  color: var(--text-color, #111);
  cursor: pointer;
  transition: all 0.3s ease;
}

.theme-toggle:hover {
  opacity: 0.8;
}

.label {
  font-size: 14px;
  font-weight: 600;
}
</style>
