<template>
  <main>
    <HeroBannerComponent />
    <SearchSummaryBar dataset="สิทธิบัตรการประดิษฐ์" keyword="บ้าน" @edit="() => {}" />

    <div class="mt-[12px]">
      <ResultToolbar
        activeTab="all"
        sort="date"
        view="grid"
        @update:activeTab="() => {}"
        @update:sort="() => {}"
        @update:view="() => {}"
        @download="() => {}"
      />

      <div class="mt-[12px] flex gap-[12px]">
        <FilterPanel class="w-[280px]" @apply="() => {}" @clear="() => {}" />

        <div class="flex-1">
          <ResultList :loading="false" view="grid" :items="mock" />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import HeroBannerComponent from '@/components/common/HeroBanner.vue'
import SearchSummaryBar from '@/components/result/SearchSummaryBar.vue'
import ResultToolbar from '@/components/result/ResultToolbar.vue'
import FilterPanel from '@/components/result/FilterPanel.vue'
import ResultList from '@/components/result/ResultList.vue'

import { useLoading } from '@/stores/loading'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'



const route = useRoute()
const loading = useLoading()

onMounted(() => {
  window.setTimeout(() => loading.stop(), 2000)
})

const mock = [
  {
    id: '1',
    appNo: '0501003205',
    owner: 'นายสมศัก บุญเกิด,นางสาวอรุณรัตน์ คงว่า',
    title: 'ระบบมาตรฐานสำหรับสิ่งพึ่งพิงหรือสิ่งไร้(บ้าน)',
    type: 'ประดิษฐ์(Patent)',
  },
  {
    id: '2',
    appNo: '8701000230',
    owner: 'ออร์แกน-ไฟต์เซอร์ เทคโนโลยี คอร์พอเรชั่น ร.ว.',
    title: 'กระบวนการและอุปกรณ์สำหรับจัดการรองเท้าของท่าน...',
    type: 'ประดิษฐ์(Patent)',
  },
]
</script>
