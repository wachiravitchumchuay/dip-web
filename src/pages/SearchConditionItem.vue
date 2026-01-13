<template>
  <div class="mb-[16px] last:mb-0">
    <div class="flex flex-col md:flex-row gap-4 items-end">

      <div class="w-full" :class="condition.type === 'reg_date' ? 'md:w-[30%]' : 'md:w-[35%]'">
        <label class="block mb-[6px] text-sm font-semibold text-[#333]">เงื่อนไข</label>
        <div class="relative bg-white rounded-md">
          <select
            v-model="condition.type"
            class="appearance-none w-full border border-[#E0E0E0] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF5C39]"
            :class="{ 'text-gray-400': !condition.type }"
          >
            <option value="" disabled selected hidden>กรุณาเลือกข้อมูล</option>
            <option value="app_no">เลขที่คำขอ</option>
            <option value="owner_name">ชื่อเจ้าของ</option>
            <option value="mark_name">ชื่อเครื่องหมาย</option>
            <option value="reg_no">เลขที่ทะเบียน</option>
            <option value="status">สถานะ</option> <option value="reg_date">วันที่จดทะเบียน</option>
            <option value="publish_date">วันที่ประกาศ</option>
            <option value="apply_date">วันที่ยื่นคำขอ</option>
            <option value="expire_date">วันที่หมดอายุ</option>
            <option value="category">จำพวก</option>
            <option value="goods">รายการสินค้า</option>
          </select>
          <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
          </div>
        </div>
      </div>

      <template v-if="condition.type === 'reg_date'">
        <div class="w-full md:flex-1">
          <label class="block mb-[6px] text-sm font-semibold text-[#333]">วันที่เริ่ม</label>
          <div class="relative">
            <input
              v-model="condition.startDate"
              type="date"
              class="w-full border border-[#E0E0E0] rounded-md px-3 py-2.5 text-sm text-[#333] focus:outline-none focus:border-[#FF5C39]"
            />
          </div>
        </div>
        <div class="w-full md:flex-1">
          <label class="block mb-[6px] text-sm font-semibold text-[#333]">วันที่สิ้นสุด</label>
          <div class="relative">
            <input
              v-model="condition.endDate"
              type="date"
              class="w-full border border-[#E0E0E0] rounded-md px-3 py-2.5 text-sm text-[#333] focus:outline-none focus:border-[#FF5C39]"
            />
          </div>
        </div>
      </template>

      <template v-else-if="condition.type === 'status'">
        <div class="w-full md:flex-1">
          <label class="block mb-[6px] text-sm font-semibold text-[#333]">สถานะ</label>
          <div class="relative bg-white rounded-md">
            <select
              v-model="condition.value"
              class="appearance-none w-full border border-[#E0E0E0] rounded-md px-3 py-2.5 text-sm text-[#333] focus:outline-none focus:border-[#FF5C39]"
            >
              <option value="" disabled selected hidden>เลือกสถานะ</option>
              <option value="Register">รับจดทะเบียน (Register)</option>
              <option value="Pending">รอดำเนินการ (Pending)</option>
              <option value="Reject">ปฏิเสธ (Reject)</option>
              <option value="Cancel">ยกเลิก (Cancel)</option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
            </div>
          </div>
        </div>
      </template>

      <template v-else>
        <div v-if="condition.type === 'app_no'" class="w-full md:w-[15%]">
          <label class="block mb-[6px] text-sm font-semibold text-transparent select-none">Op</label>
          <div class="relative bg-white rounded-md">
            <select
              v-model="condition.operator"
              class="appearance-none w-full border border-[#E0E0E0] rounded-md px-3 py-2.5 text-sm text-[#333] focus:outline-none focus:border-[#FF5C39] text-center"
            >
              <option value="like">like</option>
              <option value=">=">&gt;=</option>
              <option value="<=">&lt;=</option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
            </div>
          </div>
        </div>

        <div class="w-full md:flex-1">
          <label class="block mb-[6px] text-sm font-semibold text-[#333]">คำค้นหา</label>
          <input
            v-model="condition.value"
            type="text"
            class="w-full border border-[#E0E0E0] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF5C39]"
            placeholder="กรุณาใส่คำค้นหา"
          />
        </div>
      </template>

      <div class="relative" ref="dropdownRef">

        <button
          v-if="!isLast && condition.connective"
          type="button"
          class="bg-[#10B981] hover:bg-[#059669] text-white rounded-md h-[42px] px-6 flex items-center gap-2 transition-colors min-w-[120px] justify-between"
          @click="toggleDropdown"
        >
          <span>{{ condition.connective }}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
        </button>

        <button
          v-else
          type="button"
          class="bg-[#B0B0B0] hover:bg-[#999] text-white rounded-md h-[42px] px-4 flex items-center gap-2 transition-colors min-w-[120px] justify-center"
          @click="toggleDropdown"
        >
          <span>เพิ่มเงื่อนไข</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5V19M5 12H19"/></svg>
        </button>

        <div v-if="isOpen" class="absolute right-0 top-full mt-1 w-[120px] bg-white border border-[#E0E0E0] rounded-lg shadow-lg z-20 overflow-hidden py-0">
          <button
            type="button"
            class="w-full text-left px-4 py-3 text-sm text-[#333] hover:bg-[#10B981] hover:text-white transition-colors border-b border-gray-100 last:border-0"
            @click="selectOption('และ')"
          >และ</button>
          <button
            type="button"
            class="w-full text-left px-4 py-3 text-sm text-[#333] hover:bg-[#10B981] hover:text-white transition-colors border-b border-gray-100 last:border-0"
            @click="selectOption('หรือ')"
          >หรือ</button>
          <button
            type="button"
            class="w-full text-left px-4 py-3 text-sm text-[#333] hover:bg-[#10B981] hover:text-white transition-colors"
            @click="selectOption('ไม่เอา')"
          >ไม่เอา</button>
        </div>
      </div>
    </div>

    <div v-if="canRemove" class="mt-2 flex justify-end">
      <button type="button" class="text-red-500 text-xs hover:underline flex items-center gap-1" @click="$emit('remove')">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
        ลบเงื่อนไข
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  condition: any
  canRemove: boolean
  isLast?: boolean // เพิ่ม Prop นี้เพื่อเช็คปุ่ม
}>()

const emit = defineEmits(['add-condition', 'remove'])

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function selectOption(option: string) {
  // Update UI Local State ทันทีเพื่อให้ปุ่มเปลี่ยนสี/เปลี่ยนข้อความ
  props.condition.connective = option

  // ส่งค่ากลับไปแม่
  emit('add-condition', option)
  isOpen.value = false
}

function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => { document.addEventListener('click', handleClickOutside) })
onUnmounted(() => { document.removeEventListener('click', handleClickOutside) })
</script>
