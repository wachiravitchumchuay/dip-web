<template>
  <div class="min-h-screen flex flex-col">
    <NavBar v-if="!isAuth" />

    <main class="flex-1">
      <router-view />
    </main>

    <Footer v-if="!isAuth" />

    <LoadingOverlay v-if="isLoading" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from '@/components/common/NavBar.vue'
import Footer from '@/components/common/Footer.vue'
import LoadingOverlay from '@/components/ui/LoadingOverlay.vue'
import { useLoading } from '@/stores/loading'

const route = useRoute()
const isAuth = computed(() => route.meta.layout === 'auth')

const { isLoading } = useLoading()
</script>