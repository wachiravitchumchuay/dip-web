<template>
  <div class="text-[16px]">Thai copyright tab (placeholder)</div>
</template>

<script setup lang="ts">
defineProps<{ keyword: string }>()
defineEmits<{ (e: 'submit', payload: unknown): void; (e: 'clear'): void }>()
</script>
