<template>
  <DialogBase :open="open" :show-close="false" size="xl" @close="emit('close')">
    <div class="flex flex-col items-center">
      <div class="flex h-[60px] w-[60px] items-center justify-center rounded-full! bg-[#F9DDE0]">
        <FileDownloadIcon class="app-text-red w-[48px] h-[48px]" />
      </div>

      <div class="mt-[18px] text-center font-semibold text-24">
        ดาวน์โหลดผลการค้นหาเป็นเอกสารอ้างอิง<br />
        เพื่อใช้การจดทะเบียนเครื่องหมายการค้า
      </div>

      <div class="mt-[28px] w-ful">
        <div class="font-semibold text-[#333]">อีเมล</div>

        <div class="mt-[10px] flex items-center gap-[14px]">
          <input v-model="email" type="email" class="app-input" placeholder="กรอกที่อยู่อีเมล" />

          <button
            type="button"
            class="app-button app-bg-red text-white"
            @click="emit('send', email)"
          >
            ส่งอีเมล
          </button>
        </div>

        <div class="mt-[22px] flex app-text-red">
          <Alert02Icon class="mr-2" />
          <div>
            ระบบจะส่งข้อมูลการค้นหาไปยัง “อีเมล” ที่ระบุไว้ ภายใน 2 -15 นาที ซึ่งระยะเวลาในการส่ง
            นี้ไม่เท่ากันขึ้นอยู่กับจำนวนของข้อมูลที่ต้องการ
          </div>
        </div>
      </div>

      <button
        type="button"
        class="mt-[30px] font-semibold text-[#B21F29] underline"
        @click="emit('close')"
      >
        ยกเลิกและปิดหน้าต่างนี้
      </button>
    </div>
  </DialogBase>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import DialogBase from '@/components/ui/DialogBase.vue'
import Alert02Icon from '@/assets/icons/alert-02.svg'
import FileDownloadIcon from '@/assets/icons/file-download.svg'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'send', email: string): void
}>()

const email = ref('')

watch(
  () => props.open,
  (v) => {
    if (v) email.value = ''
  },
)
</script>
