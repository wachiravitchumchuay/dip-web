<template>
  <DialogBase :open="open" :show-close="false" @close="emit('close')">
    <div class="flex flex-col items-center text-center">
      <div class="flex h-[84px] w-[84px] items-center justify-center rounded-full bg-[#D9F3EA]">
        <div
          class="flex h-[58px] w-[58px] items-center justify-center rounded-full border-[4px] border-[#1B8A6B]"
        >
          <svg
            viewBox="0 0 24 24"
            class="h-[30px] w-[30px]"
            fill="none"
            stroke="#1B8A6B"
            stroke-width="3"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
      </div>

      <div class="mt-[18px] font-semibold leading-[1.15] text-[#1B8A6B]">
        รับคำขอดาวน์โหลดเรียบร้อยแล้ว<br />
        ข้อมูลจะถูกส่งไปยังอีเมลที่ท่านได้แจ้งไว้
      </div>

      <button
        type="button"
        class="mt-[46px] h-[90px] w-[420px] rounded-[18px] bg-[#1B8A6B] font-semibold text-white"
        @click="emit('close')"
      >
        ปิดหน้าต่างนี้
      </button>
    </div>
  </DialogBase>
</template>

<script setup lang="ts">
import DialogBase from '@/components/ui/DialogBase.vue'

defineProps<{ open: boolean }>()

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>
