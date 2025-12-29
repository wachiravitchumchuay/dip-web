<template>
  <div class="w-full border p-[24px] mt-[24px] text-18">
    <div class="font-semibold">ผลการค้นหา</div>

    <div class="mt-[12px] flex flex-wrap items-center justify-between gap-[12px]">
      <div class="flex flex-wrap items-center gap-[8px]">
        <button
          type="button"
          class="app-button-fit"
          :class="
            activeTab === 'all'
              ? 'border-[#B21F29] bg-[#FCE8EA] text-[#B21F29]'
              : 'border-[#D9D9D9] bg-white'
          "
          @click="$emit('update:activeTab', 'all')"
        >
          ทั้งหมด
        </button>

        <button type="button" class="app-button-fit" @click="$emit('update:activeTab', 'dataset')">
          สิทธิบัตรการประดิษฐ์ (219)
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
          เรียงตามวันที่
        </button>

        <button type="button" class="app-button-fit" @click="$emit('update:sort', 'name')">
          เรียงตามตัวอักษร
        </button>
      </div>

      <div class="flex items-center gap-[8px]">
        <div class="flex overflow-hidden border border-[#D9D9D9]">
          <button
            type="button"
            class="h-[40px] w-[44px]"
            :class="view === 'grid' ? 'bg-[#FCE8EA]' : 'bg-white'"
            @click="$emit('update:view', 'grid')"
            aria-label="Grid view"
          >
            ▦
          </button>
          <button
            type="button"
            class="h-[40px] w-[44px] border-l border-[#D9D9D9]"
            :class="view === 'list' ? 'bg-[#FCE8EA]' : 'bg-white'"
            @click="$emit('update:view', 'list')"
            aria-label="List view"
          >
            ≡
          </button>
          <button
            type="button"
            class="h-[40px] w-[44px] border-l border-[#D9D9D9]"
            :class="view === 'list' ? 'bg-[#FCE8EA]' : 'bg-white'"
            @click="$emit('update:view', 'list')"
            aria-label="List view"
          >
            ≡
          </button>
        </div>

        <button type="button" class="app-button bg-[#F16522] text-white" @click="$emit('download')">
          ดาวน์โหลด
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
import RequireLoginDialog from '@/components/result/dialogs/RequireLoginDialog.vue'
import EmailDownloadDialog from '@/components/result/dialogs/EmailDownloadDialog.vue'
import DownloadRequestedDialog from '@/components/result/dialogs/DownloadRequestedDialog.vue'

defineProps<{
  activeTab: string
  sort: string
  view: 'grid' | 'list'
}>()

defineEmits<{
  (e: 'update:activeTab', v: string): void
  (e: 'update:sort', v: string): void
  (e: 'update:view', v: 'grid' | 'list'): void
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
