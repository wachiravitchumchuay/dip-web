<template>
  <section class="w-full rounded-[12px] border border-[#D9D9D9] p-[16px]">
    <div class="text-[18px] font-semibold">ค้นหาด้วยคำ</div>

    <div class="mt-[8px] flex flex-col gap-[8px] md:flex-row md:items-center">
      <input
        v-model="keyword"
        type="text"
        class="h-[44px] w-full rounded-[8px] border border-[#D9D9D9] px-[12px] text-[16px] outline-none"
        placeholder="กรอกคำที่ต้องการค้นหาหรือเลือกไฟล์รูป"
      />

      <button
        type="button"
        class="h-[44px] w-full rounded-[8px] bg-[#A50F19] px-[16px] text-[16px] text-white md:w-[140px]"
        @click="onQuickSearch"
      >
        ค้นหาด้วยคำ
      </button>
    </div>

    <div class="mt-[12px]">
      <button
        type="button"
        class="inline-flex h-[40px] items-center gap-[8px] rounded-[8px] border border-[#FE572F] bg-[#FFEFEB] px-[12px] text-[16px] text-[#FE572F]"
        @click="advancedOpen = !advancedOpen"
      >
        <span>กำหนดเงื่อนไขการค้นหา</span>
        <span
          class="inline-flex h-[20px] w-[20px] items-center justify-center rounded-full border border-[#FE572F]"
        >
          <span class="text-[12px] leading-none">{{ advancedOpen ? '▲' : '▼' }}</span>
        </span>
      </button>
    </div>

    <div v-if="advancedOpen" class="mt-[12px]">
      <AdvancedSearchTabs
        :tab="activeTab"
        :keyword="keyword"
        @tab-change="activeTab = $event"
        @submit="onAdvancedSubmit"
        @clear="onAdvancedClear"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AdvancedSearchTabs from '@/components/search/forms/advanced/AdvancedSearchTabs.vue'
import { useRouter } from 'vue-router'
import { useLoading } from '@/stores/loading'

const { start } = useLoading()

type AdvancedTabKey = 'basic' | 'similarity' | 'trademark-check' | 'high-patent' | 'thai-copyright'

const keyword = ref('')
const advancedOpen = ref(false)
const activeTab = ref<AdvancedTabKey>('basic')
const router = useRouter()

async function onQuickSearch() {
  start()
  await router.push({ path: '/result', query: { q: keyword.value } })
}

function onAdvancedSubmit(payload: unknown) {
  console.log('advanced submit', payload)
}

function onAdvancedClear() {
  console.log('advanced clear')
}
</script>
