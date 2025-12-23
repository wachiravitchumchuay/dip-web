<template>
  <main class="px-23">
    <HeroBanner />
    <SerachSelector />
    <SearchFormHost />

  </main>
</template>

<script setup lang="ts">
import HeroBanner from '@/components/common/HeroBannerComponent.vue'
import SerachSelector from '@/components/search/SerachSelectorComponent.vue'
import SearchFormHost from '@/components/search/SearchFormHostComponent.vue'

</script>
