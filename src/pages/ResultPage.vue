<template>
  <main>
    <header class="w-full mb-[24px]">
      <div class="relative w-full overflow-hidden rounded-2xl">
        <img src="/Banner.png" class="h-[200px] w-full object-cover" alt="Banner" />
        <div
          class="absolute inset-0 flex items-center pl-[60px] md:pl-[97px] text-white bg-black/10"
        >
          <div class="flex-col">
            <div class="text-32 font-semibold pb-[8px]">บริการค้นหาข้อมูลทรัพย์สินทางปัญญา</div>
            <div class="text-18">
              <div>
                บริการนี้เป็นบริการช่วยตรวจสอบหรือค้นหาเครื่องหมายการค้าที่ผู้ใช้งาน<br
                  class="hidden md:block"
                />
                สามารถเข้าถึงข้อมูลได้ด้วยตนเองจากกรมทรัพย์สินทางปัญญา
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

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
import SearchSummaryBar from '@/components/result/SearchSummaryBar.vue'
import ResultToolbar from '@/components/result/ResultToolbar.vue'
import FilterPanel from '@/components/result/FilterPanel.vue'
import ResultList from '@/components/result/ResultList.vue'

import { useLoading } from '@/stores/loading'
import { onMounted } from 'vue'

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
