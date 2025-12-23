<template>
  <section
    v-if="datasetKey"
    class="mt-[16px] w-full rounded-[12px] border border-[#D9D9D9] p-[16px]"
  >
    <component :is="FormComponent" :dataset-key="datasetKey" />
  </section>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import type { Component } from 'vue'
import { useRoute } from 'vue-router'
import { parseDatasetKey } from '@/types/search'
import type { DatasetKey } from '@/types/search'

const route = useRoute()

const datasetKey = computed<DatasetKey | null>(() => parseDatasetKey(route.query.dataset))

const NotImplementedForm = defineAsyncComponent(
  () => import('@/components/search/forms/NotImplementedFormComponent.vue'),
)

const formRegistry: Partial<Record<DatasetKey, Component>> = {
  'dataset-01': defineAsyncComponent(() => import('@/components/search/forms/Dataset01Form.vue')),
  'dataset-02': defineAsyncComponent(() => import('@/components/search/forms/Dataset02FormComponent.vue')),
  'dataset-08': defineAsyncComponent(() => import('@/components/search/forms/Dataset08Form.vue')),
}

const FormComponent = computed<Component>(() => {
  if (!datasetKey.value) return NotImplementedForm
  return formRegistry[datasetKey.value] ?? NotImplementedForm
})
</script>
