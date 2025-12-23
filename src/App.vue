<template>
  <router-view v-slot="{ Component }">
    <component :is="Layout">
      <component :is="Component" />
    </component>
  </router-view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

type LayoutKey = 'app' | 'auth'

const route = useRoute()

const Layout = computed(() => {
  const layout = (route.meta.layout as LayoutKey | undefined) ?? 'app'
  return layout === 'auth' ? AuthLayout : AppLayout
})
</script>