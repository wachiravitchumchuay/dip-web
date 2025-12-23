<template>
  <div class="text-[16px]">High patent tab (placeholder)</div>
</template>

<script setup lang="ts">
defineProps<{ keyword: string }>()
defineEmits<{ (e: 'submit', payload: unknown): void; (e: 'clear'): void }>()
</script>
