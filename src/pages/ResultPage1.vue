<template>
  <main>
    <header class="w-full mb-[24px]">
      <div class="relative w-full overflow-hidden rounded-2xl">
        <img src="/Banner.png" class="h-[200px] w-full object-cover" alt="Banner" />
        <div class="absolute inset-0 flex items-center pl-[60px] md:pl-[97px] text-white bg-black/10">
          <div class="flex-col">
            <div class="text-32 font-semibold pb-[8px]">บริการค้นหาข้อมูลทรัพย์สินทางปัญญา</div>
            <div class="text-18 ">
              <div>
                บริการนี้เป็นบริการช่วยตรวจสอบหรือค้นหาเครื่องหมายการค้าที่ผู้ใช้งาน<br class="hidden md:block" />
                สามารถเข้าถึงข้อมูลได้ด้วยตนเองจากกรมทรัพย์สินทางปัญญา
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <CustomSearchSummaryBar
      dataset="สถานะ"
      keyword="รับจดทะเบียน(Register) | เครื่องหมายการค้า : 2058 รายการ"
      @edit="() => {}"
    />

    <div class="mt-[12px]">
      <CustomResultToolbar
        :activeTab="currentTab"
        :sort="currentSort"
        :view="currentView"
        @update:activeTab="(val) => currentTab = val"
        @update:sort="(val) => currentSort = val"
        @update:view="(val) => currentView = val"
        @download="() => {}"
      />

      <div class="mt-[12px] flex gap-[12px]">
        <CustomFilterPanel class="w-[280px]" @apply="() => {}" @clear="() => {}" />

        <div class="flex-1">
          <CustomResultList
             :loading="false"
             :view="currentView === 'table' ? 'list' : currentView"
             :items="mock"
             :totalItems="100"
             :itemsPerPage="10"
             :currentPage="1"
             @update:page="() => {}"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
// --- ส่วน Import: เปลี่ยนไปเรียกไฟล์ใหม่ที่มี Prefix (Custom...) ---
// เช็ค Path ให้ตรงกับที่คุณวางไฟล์นะครับ (ในตัวอย่างสมมติว่าวางที่เดียวกับ ResultPage1.vue)

import CustomSearchSummaryBar from '@/components/result/CustomSearchSummaryBar.vue'
import CustomResultToolbar from '@/components/result/CustomResultToolbar.vue'
import CustomFilterPanel from '@/components/result/CustomFilterPanel.vue'
import CustomResultList from '@/components/result/CustomResultList.vue'

import { useLoading } from '@/stores/loading'
import { onMounted, ref } from 'vue'

// Logic การโหลดข้อมูล (คงเดิม)
const loadingStore = useLoading()

// [เพิ่ม] ตัวแปรสำหรับควบคุมสถานะปุ่ม (State)
const currentTab = ref('dataset') // เริ่มต้นที่ dataset ตามที่ต้องการ
const currentSort = ref('date')
const currentView = ref<'grid' | 'list' | 'table'>('grid')

onMounted(() => {
  // จำลองการโหลดข้อมูล
  window.setTimeout(() => loadingStore.stop(), 2000)
})

// ข้อมูลจำลอง (Mock Data)
const mock = [
  {
    id: '1',
    appNo: '230116107',
    owner: 'นิฮอน อิเมโมโตะ...',
    title: '3',
    type: 'ได้รับการคุ้มครอง',
  },
  {
    id: '2',
    appNo: '533402',
    owner: 'บริษัท ซุปเปอร์แม๊กซ์',
    title: '3',
    type: 'อยู่ระหว่างพิจารณา',
  },
  {
    id: '3',
    appNo: '230100470',
    owner: 'อินดัสเทรีย เดอดิซีโน...',
    title: '25,3,9,18,21,24',
    type: 'ได้รับการคุ้มครอง',
  },
  {
    id: '4',
    appNo: '200115948',
    owner: 'นิปปอน โคชูฮาสตีล...',
    title: '6,4',
    type: 'ไม่ได้รับการคุ้มครอง',
  },
  {
    id: '5',
    appNo: '769314',
    owner: 'บริษัท ทอยส์ วัน จำกัด',
    title: '9',
    type: 'ได้รับการคุ้มครอง',
  },
  {
    id: '6',
    appNo: '220125',
    owner: 'บริษัท อินทลเล็คชวลดีไซน์...',
    title: '9',
    type: 'อยู่ระหว่างพิจารณา',
  },
]
</script>
