<template>
  <div class="w-full">
    <div class="flex gap-[8px]">
      <button
        type="button"
        class="inline-flex h-[60px] items-center gap-[8px] rounded-[12px] border px-[12px]"
        :class="
          mode === 'keyword'
            ? 'border-[#FE572F] bg-[#FFEFEB] text-[#FE572F]'
            : 'border-[#D9D9D9] bg-white text-black'
        "
        @click="mode = 'keyword'"
      >
        <span>ค้นหาด้วยคำค้นหา</span>
      </button>

      <button
        type="button"
        class="inline-flex h-[60px] items-center gap-[8px] rounded-[12px] border px-[12px]"
        :class="
          mode === 'image'
            ? 'border-[#FE572F] bg-[#FFEFEB] text-[#FE572F]'
            : 'border-[#D9D9D9] bg-white text-black'
        "
        @click="mode = 'image'"
      >
        <span>ค้นหาจากภาพที่ค้นหา</span>
      </button>
    </div>

    <!-- form area -->
    <div class="mt-[12px] app-bg-gray-2 p-[12px]">
      <!-- เพิ่มเงื่อนไข -->
      <div>
        <div class="flex items-center gap-[8px] text-18">
          <div class="font-semibold">เงื่อนไขคำ</div>
          <span
            class="flex h-[16px] w-[16px] items-center justify-center rounded-full bg-[#B21F29] text-white"
            >!</span
          >
        </div>

        <div class="mt-[12px] grid grid-cols-2 gap-[12px]">
          <div class="grid-cols-1">
            <div class="mb-[6px] flex items-center">
              <div>เงื่อนไขคำคล้าย</div>
              <span
                class="flex h-[16px] w-[16px] items-center justify-center rounded-full bg-[#B21F29] text-white"
                >!</span
              >
            </div>

            <select v-model="keywordCondition" class="app-select appearance-none">
              <option value="" disabled>เลือกเงื่อนไขคำค้นหา</option>
              <option value="contains">มีคำว่า</option>
              <option value="starts">ขึ้นต้นด้วย</option>
              <option value="ends">ลงท้ายด้วย</option>
              <option value="equals">เท่ากับ</option>
            </select>
          </div>

          <div class="grid-cols-1">
            <div class="mb-[6px] flex items-center">
              <div>คำเหมือนคล้าย</div>
              <span
                class="flex h-[16px] w-[16px] items-center justify-center rounded-full bg-[#B21F29] text-white"
                >!</span
              >
            </div>

            <input
              v-model="keywordValue"
              type="text"
              class="app-input"
              placeholder="กรอกคำเหมือนคล้าย"
            />
          </div>
        </div>
      </div>

      <!-- เงื่อนไขเสียง -->
      <div>
        <div class="mt-[18px] flex items-center gap-[8px] text-18">
          <div class="font-semibold">เงื่อนไขเสียง</div>
          <span
            class="flex h-[16px] w-[16px] items-center justify-center rounded-full bg-[#B21F29] text-white"
            >!</span
          >
        </div>

        <div class="mt-[12px] grid grid-cols-2 gap-[12px]">
          <div class="grid-cols-1">
            <div class="mb-[6px]">เงื่อนไขเสียง</div>
            <select v-model="soundCondition" class="app-select appearance-none">
              <option value="" disabled>เลือกเงื่อนไขคำคล้าย</option>
              <option value="contains">มีคำว่า</option>
              <option value="equals">เท่ากับ</option>
            </select>
          </div>

          <div class="grid-cols-1">
            <div class="mb-[6px]">เสียงคำพ้องแต่ละพยางค์</div>
            <input
              v-model="soundValue"
              type="text"
              class="app-input"
              placeholder="กรอกเสียงคำพ้องแต่ละพยางค์"
            />
          </div>
        </div>
      </div>

      <!-- อักษรและเสียง -->
      <div>
        <div class="mt-[18px] flex items-center gap-[8px] text-18">
          <div class="font-semibold">อักษรและเสียง</div>
          <span
            class="flex h-[16px] w-[16px] items-center justify-center rounded-full bg-[#B21F29] text-white"
            >!</span
          >
        </div>

        <div class="mt-[12px] grid grid-cols-2 gap-[12px]">
          <div class="grid-cols-1">
            <div class="mb-[6px]">อักษรแรก</div>
            <select v-model="textCondition" class="app-select appearance-none">
              <option value="" disabled>เลือกอักษรแรก</option>
              <option value="contains">มีคำว่า</option>
              <option value="equals">เท่ากับ</option>
            </select>
          </div>

          <div class="grid-cols-1">
            <div class="mb-[6px]">เสียงท้าย</div>
            <select v-model="phoneticCondition" class="app-select appearance-none">
              <option value="" disabled>เลือกเสียงท้าย</option>
              <option value="contains">มีคำว่า</option>
              <option value="equals">เท่ากับ</option>
            </select>
          </div>

          <div class="grid-cols-1">
            <div class="mb-[6px]">เสียงท้ายอื่น</div>
            <select v-model="soundMatch" class="app-select appearance-none">
              <option value="" disabled>เลือกเสียงคำค้นหา</option>
              <option value="thai">ไทย</option>
              <option value="eng">อังกฤษ</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <div class="mt-[18px] flex items-center gap-[8px] text-18">
          <div class="font-semibold">ประเภทเสียง</div>
          <span
            class="flex h-[16px] w-[16px] items-center justify-center rounded-full bg-[#B21F29] text-white"
            >!</span
          >
        </div>

        <div class="mt-[12px] grid grid-cols-12 gap-[12px]">
          <!-- Left big column -->
          <div class="col-span-6 space-y-[12px]">
            <!-- Row 1 -->
            <div>
              <div class="mb-[6px]">อักษรแรก</div>
              <div class="grid grid-cols-6 gap-[8px]">
                <div
                  class="col-span-5 min-w-0 flex h-15 items-center gap-[8px] border px-[12px] rounded-[12px]"
                >
                  <input v-model="typeText" type="checkbox" class="h-[16px] w-[16px]" />
                  <span>เสียงคน</span>
                </div>

                <div class="col-span-1">
                  <select v-model="typeTextJoin" class="app-select appearance-none w-full">
                    <option value="and">และ</option>
                    <option value="or">หรือ</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Row 2 -->
            <div>
              <div class="mb-[6px]">อักษรแรก</div>
              <div class="grid grid-cols-6 gap-[8px]">
                <div
                  class="col-span-5 min-w-0 flex h-15 items-center gap-[8px] border px-[12px] rounded-[12px]"
                >
                  <input v-model="typeMusic" type="checkbox" class="h-[16px] w-[16px]" />
                  <span>เสียงดนตรี / ประกอบดนตรี</span>
                </div>

                <div class="col-span-1">
                  <select v-model="typeMusicJoin" class="app-select appearance-none w-full">
                    <option value="and">และ</option>
                    <option value="or">หรือ</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Right big column -->
          <div class="col-span-6 space-y-[12px]">
            <!-- Row 1 -->
            <div>
              <div class="mb-[6px]">อักษรแรก</div>
              <div class="grid grid-cols-6 gap-[8px]">
                <div
                  class="col-span-5 min-w-0 flex h-15 items-center gap-[8px] border px-[12px] rounded-[12px]"
                >
                  <input v-model="typeSound" type="checkbox" class="h-[16px] w-[16px]" />
                  <span>เสียงสัตว์</span>
                </div>

                <div class="col-span-1">
                  <select v-model="typeSoundJoin" class="app-select appearance-none w-full">
                    <option value="and">และ</option>
                    <option value="or">หรือ</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Row 2 -->
            <div>
              <div class="mb-[6px]">อักษรแรก</div>
              <div class="grid grid-cols-6 gap-[8px]">
                <div
                  class="col-span-5 min-w-0 flex h-15 items-center gap-[8px] border px-[12px] rounded-[12px]"
                >
                  <input v-model="typeOther" type="checkbox" class="h-[16px] w-[16px]" />
                  <span>เสียงอื่นๆ</span>
                </div>

                <div class="col-span-1">
                  <select v-model="typeOtherJoin" class="app-select appearance-none w-full">
                    <option value="and">และ</option>
                    <option value="or">หรือ</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- เครื่องหมายรูป -->
      <div>
        <div class="mt-[18px] flex items-center gap-[8px] text-18">
          <div class="font-semibold">เครื่องหมายรูป</div>
          <span
            class="flex h-[16px] w-[16px] items-center justify-center rounded-full bg-[#B21F29] text-white"
            >!</span
          >
        </div>

        <div class="mt-[12px]">
          <button type="button" class="app-button border app-bg-gray">+ เพิ่มกลุ่มเงื่อนไข</button>
        </div>
      </div>
    </div>

    <div class="mt-[18px] flex items-center justify-between">
      <button type="button" class="app-button app-bg-yellow" @click="onClear()">
        ล้างเงื่อนไข
      </button>

      <button type="button" class="app-button app-bg-green text-white" @click="onSubmit()">
        ค้นหาข้อมูล
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type Mode = 'keyword' | 'image'

defineProps<{
  keyword: string
}>()

const emit = defineEmits<{
  (e: 'submit', payload: unknown): void
  (e: 'clear'): void
}>()

const mode = ref<Mode>('keyword')

const keywordCondition = ref<string>('')
const keywordValue = ref<string>('')

const soundCondition = ref<string>('')
const soundValue = ref<string>('')

const textCondition = ref<string>('')
const phoneticCondition = ref<string>('')
const soundMatch = ref<string>('')

const typeText = ref<boolean>(false)
const typeTextJoin = ref<'and' | 'or'>('and')

const typeSound = ref<boolean>(false)
const typeSoundJoin = ref<'and' | 'or'>('and')

const typeMusic = ref<boolean>(false)
const typeMusicJoin = ref<'and' | 'or'>('and')

const typeOther = ref<boolean>(false)
const typeOtherJoin = ref<'and' | 'or'>('and')

function addCondition() {
  // UI-only for now (you’ll wire this later)
}

function onClear() {
  keywordCondition.value = ''
  keywordValue.value = ''
  soundCondition.value = ''
  soundValue.value = ''
  textCondition.value = ''
  phoneticCondition.value = ''
  soundMatch.value = ''
  typeText.value = false
  typeSound.value = false
  typeMusic.value = false
  typeOther.value = false
  typeTextJoin.value = 'and'
  typeSoundJoin.value = 'and'
  typeMusicJoin.value = 'and'
  typeOtherJoin.value = 'and'
  emit('clear')
}

function onSubmit() {
  emit('submit', {
    tab: 'similarity',
    mode: mode.value,
    keyword: { condition: keywordCondition.value, value: keywordValue.value },
    sound: { condition: soundCondition.value, value: soundValue.value },
    text: { condition: textCondition.value },
    phonetic: { condition: phoneticCondition.value, match: soundMatch.value },
    soundTypes: {
      text: { checked: typeText.value, join: typeTextJoin.value },
      sound: { checked: typeSound.value, join: typeSoundJoin.value },
      music: { checked: typeMusic.value, join: typeMusicJoin.value },
      other: { checked: typeOther.value, join: typeOtherJoin.value },
    },
  })
}
</script>
