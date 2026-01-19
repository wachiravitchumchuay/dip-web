<template>
  <div class="w-full">
    <div v-if="loading" class="border border-[#D9D9D9] bg-white p-[16px]">กำลังโหลด...</div>
    <div v-else>
      <div class="flex app-bg-gray-3 py-[16px] pl-[60px]">
        <InfomationCircleIcon />
        <div class="pl-2">
          ข้อมูล สิทธิบัตร/สิทธิบัตรออกแบบ/อนุสิทธิบัตร ที่ตรวจค้น
          เป็นข้อมูลที่ประกาศโฆษณาแล้วเท่านั้น
        </div>
      </div>

      <div
        class="grid gap-[12px] mt-[12px]"
        :class="view === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'"
      >
        <div v-for="item in items" :key="item.id" class="border border-[#D9D9D9] bg-white p-[16px]">
          <div class="font-semibold text-[#B21F29]">เลขที่คำขอ : {{ item.appNo }}</div>

          <div class="mt-[10px] leading-relaxed text-[#333333]">
            <div><span class="text-[#666666]">เจ้าของ :</span> {{ item.owner }}</div>
            <div class="mt-[6px]">
              <span class="text-[#666666]">จำพวก :</span> {{ item.title }}
            </div>
            <div class="mt-[6px]">
              <span class="text-[#666666]">สถานะ :</span> {{ item.type }}
            </div>
          </div>

          <button type="button" class="app-button-fit">
            <div class="flex">
              <ViewIcon />
              <div class="pl-2">รายละเอียด</div>
            </div>
          </button>
        </div>
      </div>

      <div class="mt-[24px] flex justify-end">
        <Pagination
          :totalItems="totalItems"
          :itemsPerPage="itemsPerPage"
          v-model:currentPage="currentPageModel"
          @change="(p) => $emit('update:page', p)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Pagination from '@/components/ui/Pagination.vue'
import InfomationCircleIcon from '@/assets/icons/information-circle.svg'
import ViewIcon from '@/assets/icons/view.svg'

const props = defineProps<{
  loading: boolean
  view: 'grid' | 'list'
  items: Array<{
    id: string
    appNo: string
    owner: string
    title: string
    type: string
  }>
  totalItems: number
  itemsPerPage: number
  currentPage: number
}>()

const emit = defineEmits<{
  (e: 'update:page', v: number): void
}>()

const currentPageModel = computed({
  get: () => props.currentPage,
  set: (val) => emit('update:page', val)
})
</script>
