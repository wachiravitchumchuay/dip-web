<template>
  <div class="w-full">
    <div class="flex flex-wrap gap-[8px] bg-[#E6E6E6] p-[8px]">
      <button
        type="button"
        class="app-button-fit h-[48px] border-none"
        :class="tab === 'basic' ? 'bg-[#A50F19] text-white' : ''"
        @click="setTab('basic')"
      >
        เงื่อนไขแบบทั่วไป
      </button>

      <button
        type="button"
        class="app-button-fit h-[48px] border-none"
        :class="tab === 'similarity' ? 'bg-[#A50F19] text-white' : ''"
        @click="setTab('similarity')"
      >
        ตรวจสอบความเหมือนคล้ายของเครื่องหมาย
      </button>

      <button
        type="button"
        class="app-button-fit h-[48px] border-none"
        :class="tab === 'trademark-check' ? 'bg-[#A50F19] text-white' : ''"
        @click="setTab('trademark-check')"
      >
        ตรวจสอบเครื่องหมายการค้า
      </button>

      <button
        type="button"
        class="app-button-fit h-[48px] border-none"
        :class="tab === 'high-patent' ? 'bg-[#A50F19] text-white' : ''"
        @click="setTab('high-patent')"
      >
        ค้นหาสิทธิบัตรขั้นสูง
      </button>

      <button
        type="button"
        class="app-button-fit h-[48px] border-none"
        :class="tab === 'thai-copyright' ? 'bg-[#A50F19] text-white' : ''"
        @click="setTab('thai-copyright')"
      >
        สืบค้นสิทธิบัตรไทย
      </button>
    </div>

    <div class="mt-[12px] app-gray">
      <component
        :is="ActiveTabComponent"
        :keyword="keyword"
        @submit="emit('submit', $event)"
        @clear="emit('clear')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BasicTab from '@/components/search/forms/advanced/tabs/basictab/BasicTab.vue'
import SimilarityTab from '@/components/search/forms/advanced/tabs/SimilarityTab.vue'
import TrademarkCheckTab from '@/components/search/forms/advanced/tabs/TrademarkCheckTab.vue'
import HighPatentTab from '@/components/search/forms/advanced/tabs/HighPatentTab.vue'
import ThaiCopyrightTab from '@/components/search/forms/advanced/tabs/ThaiCopyrightTab.vue'

type AdvancedTabKey = 'basic' | 'similarity' | 'trademark-check' | 'high-patent' | 'thai-copyright'

const props = defineProps<{
  tab: AdvancedTabKey
  keyword: string
}>()

const emit = defineEmits<{
  (e: 'tab-change', v: AdvancedTabKey): void
  (e: 'submit', payload: unknown): void
  (e: 'clear'): void
}>()

function setTab(v: AdvancedTabKey) {
  emit('tab-change', v)
}

const ActiveTabComponent = computed(() => {
  if (props.tab === 'basic') return BasicTab
  if (props.tab === 'similarity') return SimilarityTab
  if (props.tab === 'trademark-check') return TrademarkCheckTab
  if (props.tab === 'high-patent') return HighPatentTab
  return ThaiCopyrightTab
})
</script>
