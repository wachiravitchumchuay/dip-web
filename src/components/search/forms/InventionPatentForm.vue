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
      <button
        type="button"
        class="app-button-fit app-border-orange app-bg-orange app-text-orange"
        @click="advancedOpen = !advancedOpen"
      >
        <div class="flex">
          <div>กำหนดเงื่อนไขการค้นหา</div>
          <div class="pl-[26px]">
            <CircleArrowUp01Icon v-if="advancedOpen" />
            <CircleArrowDown01Icon v-else />
          </div>
        </div>
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AdvancedSearchTabs from '@/components/search/forms/advanced/AdvancedSearchTabs.vue'
import { useRouter } from 'vue-router'
import { useLoading } from '@/stores/loading'
import CircleArrowUp01Icon from '@/assets/icons/circle-arrow-up-01.svg'
import CircleArrowDown01Icon from '@/assets/icons/circle-arrow-down-01.svg'

const loading = useLoading()

type AdvancedTabKey = 'basic' | 'similarity' | 'trademark-check' | 'high-patent' | 'thai-copyright'

const keyword = ref('')
const advancedOpen = ref(false)
const activeTab = ref<AdvancedTabKey>('basic')
const router = useRouter()

async function onQuickSearch() {
  loading.start()
  await router.push({ path: '/result', query: { q: keyword.value } })
}

function onAdvancedSubmit(payload: unknown) {
  console.log('advanced submit', payload)
}

function onAdvancedClear() {
  console.log('advanced clear')
}
</script>
