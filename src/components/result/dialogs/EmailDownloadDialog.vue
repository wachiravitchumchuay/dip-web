<template>
  <DialogBase :open="open" :show-close="false" @close="emit('close')">
    <div class="flex flex-col items-center">
      <div class="flex h-[84px] w-[84px] items-center justify-center rounded-full bg-[#F9DDE0]">
        <svg
          viewBox="0 0 24 24"
          class="h-[44px] w-[44px]"
          fill="none"
          stroke="#B21F29"
          stroke-width="2"
        >
          <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M12 12v6" />
          <path d="M9.5 15.5L12 18l2.5-2.5" />
        </svg>
      </div>

      <div class="mt-[18px] text-center text-[44px] font-semibold leading-[1.15] text-[#333]">
        ดาวน์โหลดผลการค้นหาเป็นเอกสารอ้างอิง<br />
        เพื่อใช้การจดทะเบียนเครื่องหมายการค้า
      </div>

      <div class="mt-[28px] w-full max-w-[860px]">
        <div class="text-[28px] font-semibold text-[#333]">อีเมล</div>

        <div class="mt-[10px] flex items-center gap-[14px]">
          <input
            v-model="email"
            type="email"
            class="h-[86px] w-full rounded-[14px] border border-[#D9D9D9] px-[18px] text-[26px] outline-none"
            placeholder="กรอกที่อยู่อีเมล"
          />

          <button
            type="button"
            class="h-[86px] w-[220px] rounded-[14px] bg-[#A50F19] text-[28px] font-semibold text-white"
            @click="emit('send', email)"
          >
            ส่งอีเมล
          </button>
        </div>

        <div class="mt-[22px] flex items-start gap-[12px] text-[22px] text-[#B21F29]">
          <div
            class="mt-[4px] flex h-[28px] w-[28px] items-center justify-center rounded-full border-2 border-[#B21F29]"
          >
            <span class="text-[18px] font-semibold">!</span>
          </div>
          <div>
            ระบบจะส่งข้อมูลการค้นหาไปยัง “อีเมล” ที่ระบุไว้ ภายใน 2 -15 นาที ซึ่งระยะเวลาในการส่ง
            นี้ไม่เท่ากันขึ้นอยู่กับจำนวนของข้อมูลที่ต้องการ
          </div>
        </div>
      </div>

      <button
        type="button"
        class="mt-[30px] text-[30px] font-semibold text-[#B21F29] underline"
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
