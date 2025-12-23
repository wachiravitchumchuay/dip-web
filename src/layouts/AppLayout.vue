<template>
  <div class="min-h-screen flex flex-col">
    <NavBar />
    <main class="flex-1 px-20">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/common/NavBar.vue'
import Footer from '@/components/common/Footer.vue'
</script>
