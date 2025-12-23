<template>
  <div class="text-[18px]">Form not implemented for: {{ datasetKey }}</div>
</template>

<script setup lang="ts">
defineProps<{
  datasetKey: string
}>()
</script>
