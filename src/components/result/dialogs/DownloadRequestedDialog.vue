<template>
  <DialogBase :open="open" :show-close="false" size="md" @close="emit('close')">
    <div class="flex flex-col items-center text-center app-green">
      <div class="flex h-[60px] w-[60px] items-center justify-center rounded-full! bg-[#D8FFF6]">
        <CheckMarkCircle02Icon />
      </div>

      <div class="mt-[18px] font-semibold text-24">
        <div>รับคำขอดาวน์โหลดเรียบร้อยแล้ว</div>
        <div>ข้อมูลจะถูกส่งไปยังอีเมลที่ท่านได้แจ้งไว้</div>
      </div>

      <button
        type="button"
        class="app-button-fit app-bg-green text-white mt-16"
        @click="emit('close')"
      >
        ปิดหน้าต่างนี้
      </button>
    </div>
  </DialogBase>
</template>

<script setup lang="ts">
import DialogBase from '@/components/ui/DialogBase.vue'
import CheckMarkCircle02Icon from '@/assets/icons/checkmark-circle-02.svg'

defineProps<{ open: boolean }>()

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>
