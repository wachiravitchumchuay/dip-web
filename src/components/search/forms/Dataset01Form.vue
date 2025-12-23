<template>
  <div class="text-[18px]">Dataset 01 form {{ datasetKey }}</div>
</template>

<script setup lang="ts">
defineProps<{
  datasetKey: string
}>()
</script>
