<template>
  <main class="max-w-[2000px] mx-auto px-10">
    <header class="w-full">
      <div class="relative w-full overflow-hidden mb-[32px]">
        <img src="/Banner.png" class="h-[200px] w-full rounded-2xl object-cover" alt="Banner" />
        <div class="absolute inset-0 flex items-center pl-[97px] text-white bg-black/10 rounded-2xl">
          <div class="flex-col">
            <div class="text-32 font-semibold pb-[8px]">บริการค้นหาข้อมูลทรัพย์สินทางปัญญา</div>
            <div class="text-18 font-light">
              <div>
                บริการนี้เป็นบริการช่วยตรวจสอบหรือค้นหาเครื่องหมายการค้าที่ผู้ใช้งาน<br />
                สามารถเข้าถึงข้อมูลได้ด้วยตนเองจากกรมทรัพย์สินทางปัญญา
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="w-full pb-[40px]">
      <div class="mb-[32px]">
        <div class="text-18 font-semibold mb-[12px]">ค้นหาทั่วไปด้วยคำ</div>
        <div class="flex gap-[12px]">
          <input
            v-model="keyword"
            type="text"
            class="app-input flex-1 border border-[#D9D9D9] rounded-md px-4"
            placeholder="กรอกคำที่ต้องการค้นหาหรือเลือกไฟล์รูป"
          />
          <button type="button" class="app-button app-bg-red text-white px-8 py-2" @click="onQuickSearch">
            ค้นหา
          </button>
        </div>
      </div>

      <div class="mb-[32px]">
        <div class="text-24 font-semibold mb-[16px]">กำหนดเงื่อนไขค้นหา</div>

        <div class="flex gap-[8px] mb-[24px]">
          <button
            type="button"
            class="px-[24px] py-[12px] rounded-[12px] border-2 transition-all"
            :class="
              activeTab === 'basic'
                ? 'bg-[#FCE8EA] border-[#B21F29] app-text-red font-semibold'
                : 'bg-white border-[#D9D9D9] text-[#333]'
            "
            @click="activeTab = 'basic'"
          >
            ค้นหารูปแบบทั่วไป
          </button>

          <button
            type="button"
            class="px-[24px] py-[12px] rounded-[12px] border-2 transition-all"
            :class="
              activeTab === 'similarity'
                ? 'bg-[#FCE8EA] border-[#B21F29] app-text-red font-semibold'
                : 'bg-white border-[#D9D9D9] text-[#333]'
            "
            @click="activeTab = 'similarity'"
          >
            ตรวจสอบความเหมือนคล้ายของเครื่องหมาย
          </button>

          <button
            type="button"
            class="px-[24px] py-[12px] rounded-[12px] border-2 transition-all"
            :class="
              activeTab === 'trademark'
                ? 'bg-[#FCE8EA] border-[#B21F29] app-text-red font-semibold'
                : 'bg-white border-[#D9D9D9] text-[#333]'
            "
            @click="activeTab = 'trademark'"
          >
            ตรวจสอบรูปเครื่องหมายการค้า
          </button>
        </div>

        <div class="border-2 border-[#D9D9D9] rounded-[12px] p-[32px] bg-white shadow-sm mb-[32px]">
          <div class="flex items-center gap-[8px] mb-[24px]">
            <span class="text-18 font-semibold">เครื่องหมายการค้า</span>
            <span
              class="flex h-[18px] w-[18px] items-center justify-center rounded-full border-[2px] border-[#666] font-serif text-[13px] font-black leading-none text-[#666] cursor-help"
              title="ข้อมูลเพิ่มเติม"
            >
              i
            </span>
          </div>

          <div v-for="(condition, index) in conditions" :key="index" class="mb-[20px]">
            <div class="grid grid-cols-12 gap-[16px] items-end">
              <div class="col-span-4">
                <label class="block mb-[8px] text-[#333]">เงื่อนไข</label>
                <div class="relative">
                  <select
                    v-model="condition.type"
                    class="app-select appearance-none w-full border border-[#D9D9D9] rounded-md px-3 py-2"
                    :class="{ 'text-gray-400': !condition.type }"
                  >
                    <option value="" disabled selected hidden>กรุณาข้อมูล</option>
                    <option value="app_no">เลขที่คำขอ</option>
                    <option value="owner_name">ชื่อเจ้าของ</option>
                    <option value="mark_name">ชื่อเครื่องหมาย</option>
                    <option value="reg_no">เลขที่ทะเบียน</option>
                    <option value="irn_no">เลขคำขอระหว่างประเทศ (IRN No.)</option>
                    <option value="status">สถานะ</option>
                    <option value="reg_date">วันที่จดทะเบียน</option>
                    <option value="publish_date">วันที่ประกาศ</option>
                    <option value="apply_date">วันที่ยื่นคำขอ</option>
                    <option value="expire_date">วันที่หมดอายุ</option>
                    <option value="category">จำพวก</option>
                    <option value="goods">รายการสินค้า</option>
                  </select>
                </div>
              </div>

              <div class="col-span-4">
                <label class="block mb-[8px] text-[#333]">คำค้นหา</label>
                <input
                  v-model="condition.value"
                  type="text"
                  class="app-input w-full border border-[#D9D9D9] rounded-md px-3 py-2"
                  placeholder="กรอกคำที่คำค้นหา"
                />
              </div>

              <div class="col-span-4 relative">
                <button
                  type="button"
                  class="app-button border border-[#D9D9D9] bg-white w-full h-[42px] hover:bg-gray-50 transition-colors"
                  @click="toggleRowDropdown(index)"
                >
                  <div class="flex items-center gap-[8px] justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>เพิ่มเงื่อนไข</span>
                  </div>
                </button>

                <div v-if="activeDropdownIndex === index" class="absolute left-0 top-full mt-1 w-full bg-white border border-[#D9D9D9] rounded-lg shadow-lg z-20 overflow-hidden py-1">
                   <button
                    type="button"
                    class="w-full text-left px-4 py-2 text-[#333] hover:bg-[#10B981] hover:text-white transition-colors"
                    @click="selectRowOption('และ', index)"
                  >
                    และ
                  </button>
                  <button
                    type="button"
                    class="w-full text-left px-4 py-2 text-[#333] hover:bg-[#10B981] hover:text-white transition-colors"
                    @click="selectRowOption('หรือ', index)"
                  >
                    หรือ
                  </button>
                  <button
                    type="button"
                    class="w-full text-left px-4 py-2 text-[#333] hover:bg-[#10B981] transition-colors"
                    @click="selectRowOption('ไม่เอา', index)"
                  >
                    ไม่เอา
                  </button>
                </div>
              </div>
              </div>

            <div v-if="conditions.length > 1" class="mt-[12px] flex justify-end">
              <button
                type="button"
                class="text-[#C0272D] flex items-center gap-[8px] hover:underline text-sm"
                @click="removeCondition(index)"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 6H5H21M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>ลบเงื่อนไข</span>
              </button>
            </div>
          </div>

          <div class="mt-[20px] relative">
            <button
              type="button"
              class="app-button border border-[#FF4D4F] text-[#FF4D4F] bg-white rounded-md px-4 py-2 w-auto hover:bg-red-50 transition-colors"
              @click="toggleGroupDropdown"
            >
              <div class="flex items-center gap-[8px] justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>เพิ่มเงื่อนไข</span>
              </div>
            </button>

            <div v-if="showGroupDropdown" class="absolute left-0 top-full mt-2 w-[160px] bg-white border border-[#D9D9D9] rounded-lg shadow-lg z-10 overflow-hidden py-1">
              <button
                type="button"
                class="w-full text-left px-4 py-2 text-[#333] hover:bg-[#F59E0B] hover:text-white transition-colors"
                @click="selectGroupOption('และ')"
              >
                และ
              </button>
              <button
                type="button"
                class="w-full text-left px-4 py-2 text-[#333] hover:bg-[#F59E0B] hover:text-white transition-colors"
                @click="selectGroupOption('หรือ')"
              >
                หรือ
              </button>
              <button
                type="button"
                class="w-full text-left px-4 py-2 text-[#333] hover:bg-[#F59E0B] transition-colors"
                @click="selectGroupOption('ไม่เอา')"
              >
                ไม่เอา
              </button>
            </div>
          </div>
          </div>

        <div class="flex items-center justify-between mb-[40px]">
          <button
            type="button"
            class="app-button border border-[#D9D9D9] bg-white flex items-center gap-[8px] px-6 py-2"
            @click="clearAllConditions"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 4V10H7M23 20V14H17M20.49 9C19.9828 7.56678 19.1209 6.28536 17.9845 5.27542C16.8482 4.26548 15.4745 3.55976 13.9917 3.22426C12.5089 2.88876 10.9652 2.93434 9.50481 3.35677C8.04437 3.77921 6.71475 4.56471 5.64 5.64L1 10M23 14L18.36 18.36C17.2853 19.4353 15.9556 20.2208 14.4952 20.6432C13.0348 21.0657 11.4911 21.1112 10.0083 20.7757C8.52547 20.4402 7.1518 19.7345 6.01547 18.7246C4.87913 17.7146 4.01717 16.4332 3.51 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>ล้างการค้นหา</span>
          </button>

          <button
            type="button"
            class="app-button app-bg-red text-white flex items-center gap-[8px] px-10 py-2"
            @click="onSearch"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M21 21L16.65 16.65" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>ค้นหาข้อมูล</span>
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const keyword = ref('')
const activeTab = ref<'basic' | 'similarity' | 'trademark'>('basic')

// State สำหรับ Dropdown ของปุ่มใหม่ (ข้างล่าง)
const showGroupDropdown = ref(false)

// State สำหรับ Dropdown ของปุ่มเดิม (ในแถว)
const activeDropdownIndex = ref<number | null>(null)

interface Condition {
  type: string
  value: string
}

const conditions = ref<Condition[]>([
  { type: '', value: '' }
])

onMounted(() => {
  if (route.query.q) {
    keyword.value = route.query.q as string
  }
  if (route.query.mode) {
    const mode = route.query.mode as string
    if (mode === 'basic' || mode === 'similarity' || mode === 'trademark') {
      activeTab.value = mode
    }
  }
})

function onQuickSearch() {
  if (keyword.value.trim()) {
    router.push({ path: '/result', query: { q: keyword.value } })
  }
}

// ฟังก์ชันเปิด/ปิด Dropdown ของปุ่มเดิมในแต่ละแถว
function toggleRowDropdown(index: number) {
  if (activeDropdownIndex.value === index) {
    activeDropdownIndex.value = null
  } else {
    activeDropdownIndex.value = index
  }
}

// ฟังก์ชันเมื่อเลือกตัวเลือกจากปุ่มเดิม (และ/หรือ/ไม่เอา) -> เพิ่มแถวใหม่
function selectRowOption(option: string, index: number) {
  // ตรงนี้คุณอาจจะเอาค่า option ไปใช้ต่อได้ แต่ตอนนี้ผมสั่งให้เพิ่มเงื่อนไขเหมือนเดิม
  console.log(`Selected option for row ${index}: ${option}`)
  addCondition()
  activeDropdownIndex.value = null
}

function addCondition() {
  conditions.value.push({ type: '', value: '' })
}

function removeCondition(index: number) {
  if (conditions.value.length > 1) {
    conditions.value.splice(index, 1)
  }
}

function clearAllConditions() {
  conditions.value = [{ type: '', value: '' }]
}

// ฟังก์ชันเปิด/ปิด Dropdown ของปุ่มใหม่ (กลุ่มเงื่อนไข)
function toggleGroupDropdown() {
  showGroupDropdown.value = !showGroupDropdown.value
}

// ฟังก์ชันเมื่อเลือกตัวเลือกจากปุ่มใหม่
function selectGroupOption(option: string) {
  console.log('Selected group option:', option)
  showGroupDropdown.value = false
}

function onSearch() {
  const query: Record<string, string> = {}
  if (keyword.value.trim()) {
    query.q = keyword.value
  }
  const validConditions = conditions.value.filter(c => c.type && c.value.trim())
  if (validConditions.length > 0) {
    query.conditions = JSON.stringify(validConditions)
  }
  query.mode = activeTab.value
  router.push({ path: '/result', query })
}
</script>

<style scoped>
.app-text-red { color: #B21F29; }
.app-bg-red { background-color: #B21F29; }
.text-32 { font-size: 32px; }
.text-18 { font-size: 18px; }
.text-24 { font-size: 24px; }
.text-14 { font-size: 14px; }
</style>
