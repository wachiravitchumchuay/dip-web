<template>
  <DialogBase :open="open" :show-close="false" size="md" @close="emit('close')">
    <div class="flex flex-col items-center text-center">
      <div class="flex h-[48px] w-[48px] items-center justify-center rounded-full! bg-[#F9DDE0]">
        <AlertDiamondIcon />
      </div>

      <div class="mt-[18px] font-semibold text-24">
        <div>เพื่อความปลอดภัยของข้อมูล</div>
        <div>กรุณาเข้าสู่ระบบก่อนดาวน์โหลด</div>
      </div>

      <button
        type="button"
        class="app-button-fit text-white app-bg-red mt-24"
        @click="emit('go-login')"
      >
        <div class="flex">
          <div class="pr-2">ไปยังหน้าเข้าสู่ระบบ</div>
          <LinkSquare01Icon />
        </div>
      </button>

      <button type="button" class="mt-[26px] font-semibold app-text-red" @click="emit('close')">
        ยกเลิกและปิดหน้าต่างนี้
      </button>
    </div>
  </DialogBase>
</template>

<script setup lang="ts">
import DialogBase from '@/components/ui/DialogBase.vue'
import LinkSquare01Icon from '@/assets/icons/link-square-01.svg'
import AlertDiamondIcon from '@/assets/icons/alert-diamond.svg'
import { setDevtoolsHook } from 'vue'

defineProps<{ open: boolean }>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'go-login'): void
}>()
</script>
