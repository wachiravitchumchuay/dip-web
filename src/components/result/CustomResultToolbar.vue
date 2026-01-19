<template>
  <div class="w-full border p-[24px] mt-[24px] text-18">
    <div class="font-semibold">ผลการค้นหา</div>

    <div class="mt-[12px] flex flex-wrap items-center justify-between gap-[12px]">
      <div class="flex flex-wrap items-center gap-[8px]">

        <button
          type="button"
          class="app-button-fit border-[#D9D9D9] bg-white"
          @click="$emit('update:activeTab', 'all')"
        >
          ทั้งหมด
        </button>

        <button
          type="button"
          class="app-button-fit border-[#B21F29] bg-[#FCE8EA] text-[#B21F29]"
          @click="$emit('update:activeTab', 'dataset')"
          >
            เครื่องหมายการค้า (2058)
          </button>
      </div>

      <div class="flex items-center gap-[8px]">
        <button type="button" class="app-button-fit">ย่อการแสดง</button>
      </div>
    </div>
    <div class="w-full h-[1px] border app-border-gray mt-4"></div>
    <div class="mt-[12px] flex flex-wrap items-center justify-between gap-[12px]">
      <div class="flex flex-wrap gap-[8px]">
        <button type="button" class="app-button-fit" @click="$emit('update:sort', 'date')">
          <div class="flex">
            <div class="pr-2">เรียงตามวันที่</div>
            <CircleArrowDown01Icon />
          </div>
        </button>

        <button type="button" class="app-button-fit" @click="$emit('update:sort', 'name')">
          <div class="flex">
            <div class="pr-2">เรียงตามตัวอักษร</div>
            <CircleArrowDown01Icon />
          </div>
        </button>
      </div>

      <div class="flex items-center gap-[8px]">
        <div class="flex overflow-hidden border border-[#D9D9D9] rounded-[15px] w-fit">
          <button
            type="button"
            class="h-[50px] w-[65px] flex items-center justify-center transition-all"
            :class="view === 'grid' ? 'bg-[#FF542B] text-white' : 'bg-white text-[#555]'"
            @click="$emit('update:view', 'grid')"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"></rect><rect x="14" y="3" width="7" height="7" rx="1.5"></rect><rect x="14" y="14" width="7" height="7" rx="1.5"></rect><rect x="3" y="14" width="7" height="7" rx="1.5"></rect></svg>
          </button>

          <button
            type="button"
            class="h-[50px] w-[65px] border-l border-[#D9D9D9] flex items-center justify-center transition-all"
            :class="view === 'list' ? 'bg-[#FF542B] text-white' : 'bg-white text-[#555]'"
            @click="$emit('update:view', 'list')"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
          </button>

          <button
            type="button"
            class="h-[50px] w-[65px] border-l border-[#D9D9D9] flex items-center justify-center transition-all"
            :class="view === 'table' ? 'bg-[#FF542B] text-white' : 'bg-white text-[#555]'"
            @click="$emit('update:view', 'table')"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line><path d="M11 12h2"></path></svg>
          </button>
        </div>

        <button type="button" class="app-button bg-[#F16522] text-white" @click="$emit('download')">
          <div class="flex pl-4">
            <FileDownloadIcon class="h-[24px] w-[24px]" />
            <div class="pl-2">ดาวน์โหลด</div>
          </div>
        </button>
      </div>
    </div>
  </div>
  <button class="rounded bg-black px-3 py-2 text-white" @click="open1 = true">not login</button>
  <button class="ml-2 rounded bg-black px-3 py-2 text-white" @click="open2 = true">login</button>
  <button class="ml-2 rounded bg-black px-3 py-2 text-white" @click="open3 = true">Success</button>

  <RequireLoginDialog :open="open1" @close="open1 = false" @go-login="goLogin" />
  <EmailDownloadDialog :open="open2" @close="open2 = false" @send="onSendEmail" />
  <DownloadRequestedDialog :open="open3" @close="open3 = false" />
</template>

<script setup lang="ts">
// [แก้ไข] เปลี่ยน Import ให้เรียกไฟล์ Custom ที่อยู่ในโฟลเดอร์เดียวกัน
import RequireLoginDialog from '@/components/result/dialogs/CustomRequireLoginDialog.vue'
import EmailDownloadDialog from '@/components/result/dialogs/CustomEmailDownloadDialog.vue'
import DownloadRequestedDialog from '@/components/result/dialogs/CustomDownloadRequestedDialog.vue'

import FileDownloadIcon from '@/assets/icons/file-download.svg'
import CircleArrowDown01Icon from '@/assets/icons/circle-arrow-down-01.svg'

defineProps<{
  activeTab: string
  sort: string
  // [แก้ไข] เพิ่ม 'table' เข้าไปใน Type เพื่อรองรับปุ่มที่ 3
  view: 'grid' | 'list' | 'table'
}>()

defineEmits<{
  (e: 'update:activeTab', v: string): void
  (e: 'update:sort', v: string): void
  // [แก้ไข] เพิ่ม 'table' ใน emit ด้วย
  (e: 'update:view', v: 'grid' | 'list' | 'table'): void
  (e: 'download'): void
}>()

import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const open1 = ref(false)
const open2 = ref(false)
const open3 = ref(false)

function goLogin() {
  open1.value = false
  router.push('/auth')
}

function onSendEmail(email: string) {
  console.log('send email', email)
  open2.value = false
  open3.value = true
}
</script>
