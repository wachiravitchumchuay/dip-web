<template>
  <div class="w-full">
    <!-- mode switch -->
    <div class="flex gap-[8px]">
      <button
        type="button"
        class="h-[40px] rounded-[8px] border border-[#D9D9D9] px-[12px]"
        :class="
          mode === 'keyword'
            ? 'bg-[#FFF3F3] text-[#B21F29] border-[#B21F29]'
            : 'bg-white text-black'
        "
        @click="mode = 'keyword'"
      >
        ค้นหาด้วยคำค้นหา
      </button>

      <button
        type="button"
        class="h-[40px] rounded-[8px] border border-[#D9D9D9] px-[12px]"
        :class="
          mode === 'image' ? 'bg-[#FFF3F3] text-[#B21F29] border-[#B21F29]' : 'bg-white text-black'
        "
        @click="mode = 'image'"
      >
        ค้นหาจากภาพที่ค้นหา
      </button>
    </div>

    <!-- form area -->
    <div class="mt-[12px] rounded-[12px] bg-white p-[12px]">
      <!-- เพิ่มเงื่อนไข -->
      <div class="flex items-center gap-[8px] text-18">
        <div class="font-semibold">เงื่อนไขคำ</div>
        <span
          class="flex h-[16px] w-[16px] items-center justify-center rounded-full bg-[#B21F29] text-white"
          >!</span
        >
      </div>

      <div class="mt-[12px] grid grid-cols-12 gap-[12px]">
        <div class="col-span-12 md:col-span-5">
          <div class="mb-[6px] flex items-center gap-[8px]">
            <div>เงื่อนไขคำคล้าย</div>
            <span
              class="flex h-[16px] w-[16px] items-center justify-center rounded-full bg-[#B21F29] text-white"
              >!</span
            >
          </div>

          <div class="relative">
            <select
              v-model="keywordCondition"
              class="h-[44px] w-full appearance-none rounded-[10px] border border-[#D9D9D9] bg-white px-[12px] pr-[40px]"
            >
              <option value="" disabled>เลือกเงื่อนไขคำค้นหา</option>
              <option value="contains">มีคำว่า</option>
              <option value="starts">ขึ้นต้นด้วย</option>
              <option value="ends">ลงท้ายด้วย</option>
              <option value="equals">เท่ากับ</option>
            </select>

            <div class="pointer-events-none absolute right-[12px] top-1/2 -translate-y-1/2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 10l5 5 5-5"
                  stroke="#6B7280"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="col-span-12 md:col-span-5">
          <div class="mb-[6px] flex items-center gap-[8px]">
            <div>คำเหมือนคล้าย</div>
            <span
              class="flex h-[16px] w-[16px] items-center justify-center rounded-full bg-[#B21F29] text-white"
              >!</span
            >
          </div>

          <input
            v-model="keywordValue"
            type="text"
            class="h-[44px] w-full rounded-[10px] border border-[#D9D9D9] bg-white px-[12px]"
            placeholder="กรอกคำเหมือนคล้าย"
          />
        </div>
      </div>

      <!-- เงื่อนไขเสียง -->
      <div class="mt-[18px] flex items-center gap-[8px] text-18">
        <div class="font-semibold">เงื่อนไขเสียง</div>
        <span
          class="flex h-[16px] w-[16px] items-center justify-center rounded-full bg-[#B21F29] text-white"
          >!</span
        >
      </div>

      <div class="mt-[12px] grid grid-cols-12 gap-[12px]">
        <div class="col-span-12 md:col-span-6">
          <div class="mb-[6px]">เงื่อนไขเสียง</div>
          <div class="relative">
            <select
              v-model="soundCondition"
              class="h-[44px] w-full appearance-none rounded-[10px] border border-[#D9D9D9] bg-white px-[12px] pr-[40px]"
            >
              <option value="" disabled>เลือกเงื่อนไขคำคล้าย</option>
              <option value="contains">มีคำว่า</option>
              <option value="equals">เท่ากับ</option>
            </select>
            <div class="pointer-events-none absolute right-[12px] top-1/2 -translate-y-1/2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 10l5 5 5-5"
                  stroke="#6B7280"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="col-span-12 md:col-span-6">
          <div class="mb-[6px]">เสียงคำพ้องแต่ละพยางค์</div>
          <input
            v-model="soundValue"
            type="text"
            class="h-[44px] w-full rounded-[10px] border border-[#D9D9D9] bg-white px-[12px]"
            placeholder="กรอกเสียงคำพ้องแต่ละพยางค์"
          />
        </div>
      </div>

      <!-- อักษรและเสียง -->
      <div class="mt-[18px] flex items-center gap-[8px] text-18">
        <div class="font-semibold">อักษรและเสียง</div>
        <span
          class="flex h-[16px] w-[16px] items-center justify-center rounded-full bg-[#B21F29] text-white"
          >!</span
        >
      </div>

      <div class="mt-[12px] grid grid-cols-12 gap-[12px]">
        <div class="col-span-12 md:col-span-6">
          <div class="mb-[6px]">อักษรแรก</div>
          <div class="relative">
            <select
              v-model="textCondition"
              class="h-[44px] w-full appearance-none rounded-[10px] border border-[#D9D9D9] bg-white px-[12px] pr-[40px]"
            >
              <option value="" disabled>เลือกอักษรแรก</option>
              <option value="contains">มีคำว่า</option>
              <option value="equals">เท่ากับ</option>
            </select>
            <div class="pointer-events-none absolute right-[12px] top-1/2 -translate-y-1/2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 10l5 5 5-5"
                  stroke="#6B7280"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="col-span-12 md:col-span-6">
          <div class="mb-[6px]">เสียงท้าย</div>
          <div class="relative">
            <select
              v-model="phoneticCondition"
              class="h-[44px] w-full appearance-none rounded-[10px] border border-[#D9D9D9] bg-white px-[12px] pr-[40px]"
            >
              <option value="" disabled>เลือกเสียงท้าย</option>
              <option value="contains">มีคำว่า</option>
              <option value="equals">เท่ากับ</option>
            </select>
            <div class="pointer-events-none absolute right-[12px] top-1/2 -translate-y-1/2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 10l5 5 5-5"
                  stroke="#6B7280"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="col-span-12 md:col-span-6">
          <div class="mb-[6px]">เสียงท้ายอื่น</div>
          <div class="relative">
            <select
              v-model="soundMatch"
              class="h-[44px] w-full appearance-none rounded-[10px] border border-[#D9D9D9] bg-white px-[12px] pr-[40px]"
            >
              <option value="" disabled>เลือกเสียงคำค้นหา</option>
              <option value="thai">ไทย</option>
              <option value="eng">อังกฤษ</option>
            </select>
            <div class="pointer-events-none absolute right-[12px] top-1/2 -translate-y-1/2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 10l5 5 5-5"
                  stroke="#6B7280"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- ประเภทเสียง -->
      <div class="mt-[18px] flex items-center gap-[8px] text-18">
        <div class="font-semibold">ประเภทเสียง</div>
        <span
          class="flex h-[16px] w-[16px] items-center justify-center rounded-full bg-[#B21F29] text-white"
          >!</span
        >
      </div>

      <div class="mt-[12px] grid grid-cols-12 gap-[12px]">
        <div class="col-span-12 md:col-span-6">
          <div class="mb-[6px]">อักษรแรก</div>
          <div class="grid grid-cols-12 gap-[8px]">
            <label
              class="col-span-9 flex h-[44px] items-center gap-[8px] rounded-[10px] border border-[#D9D9D9] px-[12px]"
            >
              <input v-model="typeText" type="checkbox" class="h-[16px] w-[16px]" />
              <span class="">เสียงคน</span>
            </label>

            <div class="col-span-3 relative">
              <select
                v-model="typeTextJoin"
                class="h-[44px] w-full appearance-none rounded-[10px] border border-[#D9D9D9] bg-white px-[10px] pr-[34px]"
              >
                <option value="and">และ</option>
                <option value="or">หรือ</option>
              </select>
              <div class="pointer-events-none absolute right-[10px] top-1/2 -translate-y-1/2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7 10l5 5 5-5"
                    stroke="#6B7280"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div class="col-span-12 md:col-span-6">
          <div class="mb-[6px]">อักษรแรก</div>
          <div class="grid grid-cols-12 gap-[8px]">
            <label
              class="col-span-9 flex h-[44px] items-center gap-[8px] rounded-[10px] border border-[#D9D9D9] px-[12px]"
            >
              <input v-model="typeSound" type="checkbox" class="h-[16px] w-[16px]" />
              <span class="">เสียงสัตว์</span>
            </label>

            <div class="col-span-3 relative">
              <select
                v-model="typeSoundJoin"
                class="h-[44px] w-full appearance-none rounded-[10px] border border-[#D9D9D9] bg-white px-[10px] pr-[34px]"
              >
                <option value="and">และ</option>
                <option value="or">หรือ</option>
              </select>
              <div class="pointer-events-none absolute right-[10px] top-1/2 -translate-y-1/2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7 10l5 5 5-5"
                    stroke="#6B7280"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div class="col-span-12 md:col-span-6">
          <div class="mb-[6px]">อักษรแรก</div>
          <div class="grid grid-cols-12 gap-[8px]">
            <label
              class="col-span-9 flex h-[44px] items-center gap-[8px] rounded-[10px] border border-[#D9D9D9] px-[12px]"
            >
              <input v-model="typeMusic" type="checkbox" class="h-[16px] w-[16px]" />
              <span class="">เสียงดนตรี / ประกอบดนตรี</span>
            </label>

            <div class="col-span-3 relative">
              <select
                v-model="typeMusicJoin"
                class="h-[44px] w-full appearance-none rounded-[10px] border border-[#D9D9D9] bg-white px-[10px] pr-[34px]"
              >
                <option value="and">และ</option>
                <option value="or">หรือ</option>
              </select>
              <div class="pointer-events-none absolute right-[10px] top-1/2 -translate-y-1/2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7 10l5 5 5-5"
                    stroke="#6B7280"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div class="col-span-12 md:col-span-6">
          <div class="mb-[6px]">อักษรแรก</div>
          <div class="grid grid-cols-12 gap-[8px]">
            <label
              class="col-span-9 flex h-[44px] items-center gap-[8px] rounded-[10px] border border-[#D9D9D9] px-[12px]"
            >
              <input v-model="typeOther" type="checkbox" class="h-[16px] w-[16px]" />
              <span class="">เสียงอื่นๆ</span>
            </label>

            <div class="col-span-3 relative">
              <select
                v-model="typeOtherJoin"
                class="h-[44px] w-full appearance-none rounded-[10px] border border-[#D9D9D9] bg-white px-[10px] pr-[34px]"
              >
                <option value="and">และ</option>
                <option value="or">หรือ</option>
              </select>
              <div class="pointer-events-none absolute right-[10px] top-1/2 -translate-y-1/2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7 10l5 5 5-5"
                    stroke="#6B7280"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- เครื่องหมายรูป -->
      <div class="mt-[18px] flex items-center gap-[8px] text-18">
        <div class="font-semibold">เครื่องหมายรูป</div>
        <span
          class="flex h-[16px] w-[16px] items-center justify-center rounded-full bg-[#B21F29] text-white"
          >!</span
        >
      </div>

      <div class="mt-[12px]">
        <button
          type="button"
          class="h-[44px] rounded-[10px] border border-[#D9D9D9] bg-white px-[14px]"
        >
          + เพิ่มกลุ่มเงื่อนไข
        </button>
      </div>

      <!-- actions -->
      <div class="mt-[18px] flex items-center justify-between">
        <button
          type="button"
          class="h-[44px] rounded-[10px] bg-[#F5A623] px-[18px] text-black"
          @click="onClear()"
        >
          ล้างเงื่อนไข
        </button>

        <button
          type="button"
          class="h-[44px] rounded-[10px] bg-[#1E8E6E] px-[18px] text-white"
          @click="onSubmit()"
        >
          ค้นหาข้อมูล
        </button>
      </div>
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
