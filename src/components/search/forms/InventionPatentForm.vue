<template>
  <div class="w-full p-[16px]">
    <div class="text-18 font-semibold">ค้นหาด้วยคำ</div>

    <div class="mt-[8px] flex gap-4 items-center">
      <input
        v-model="keyword"
        type="text"
        class="app-input"
        placeholder="กรอกคำที่ต้องการค้นหาหรือเลือกไฟล์รูป"
      />

      <button type="button" class="app-button bg-[#A50F19] text-white" @click="onQuickSearch">
        ค้นหาด้วยคำ
      </button>
    </div>

    <div class="mt-[12px]">
      <div
        type="button"
        class="inline-flex h-[60px] items-center gap-[8px] border border-[#FE572F] bg-[#FFEFEB] px-[12px] text-[#FE572F]"
        @click="advancedOpen = !advancedOpen"
      >
        <span>กำหนดเงื่อนไขการค้นหา</span>
        <span
          class="inline-flex h-[20px] w-[20px] items-center justify-center rounded-full border border-[#FE572F]"
        >
          <span class="leading-none">{{ advancedOpen ? '▲' : '▼' }}</span>
        </span>
      </div>
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
  </div>
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
