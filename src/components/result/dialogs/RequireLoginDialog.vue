<template>
  <DialogBase :open="open" :show-close="false" @close="emit('close')">
    <div class="flex flex-col items-center text-center">
      <div class="flex h-[84px] w-[84px] items-center justify-center rounded-full bg-[#F9DDE0]">
        <div
          class="flex h-[58px] w-[58px] items-center justify-center rounded-full border-[4px] border-[#B21F29]"
        >
          <span class="text-[28px] font-semibold text-[#B21F29]">!</span>
        </div>
      </div>

      <div class="mt-[18px] text-[44px] font-semibold leading-[1.15] text-[#333]">
        เพื่อความปลอดภัยของข้อมูล<br />

        กรุณาเข้าสู่ระบบก่อนดาวน์โหลด
      </div>

      <button
        type="button"
        class="mt-[42px] flex h-[90px] w-[520px] items-center justify-center gap-[14px] rounded-[18px] bg-[#A50F19] text-[28px] font-semibold text-white"
        @click="emit('go-login')"
      >
        ไปยังหน้าเข้าสู่ระบบ
        <span
          class="inline-flex h-[30px] w-[30px] items-center justify-center rounded-[8px] border-2 border-white"
        >
          <svg
            viewBox="0 0 24 24"
            class="h-[18px] w-[18px]"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M14 3h7v7" />
            <path d="M10 14L21 3" />
            <path d="M21 14v7h-7" />
            <path d="M3 10V3h7" />
          </svg>
        </span>
      </button>

      <button
        type="button"
        class="mt-[26px] text-[30px] font-semibold text-[#B21F29] underline"
        @click="emit('close')"
      >
        ยกเลิกและปิดหน้าต่างนี้
      </button>
    </div>
  </DialogBase>
</template>

<script setup lang="ts">
import DialogBase from '@/components/ui/DialogBase.vue'

defineProps<{ open: boolean }>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'go-login'): void
}>()
</script>
