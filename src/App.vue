<template>
  <router-view v-slot="{ Component }">
    <component :is="Layout">
      <component :is="Component" />
    </component>
  </router-view>
  <LoadingOverlay :show="loading.isLoading.value" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useLoading } from '@/stores/loading'
import AppLayout from '@/layouts/AppLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import LoadingOverlay from '@/components/ui/LoadingOverlay.vue'

type LayoutKey = 'app' | 'auth'

const route = useRoute()
const loading = useLoading()

const Layout = computed(() => {
  const layout = (route.meta.layout as LayoutKey | undefined) ?? 'app'
  return layout === 'auth' ? AuthLayout : AppLayout
})
</script>
