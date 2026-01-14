<template>
  <main class="max-w-[1440px] mx-auto px-4 md:px-10 py-8 relative">

    <header class="w-full mb-[32px]">
      <div class="relative w-full overflow-hidden rounded-2xl">
        <img src="/Banner.png" class="h-[200px] w-full object-cover" alt="Banner" />
        <div class="absolute inset-0 flex items-center pl-[60px] md:pl-[97px] text-white bg-black/20">
          <div class="flex-col">
            <div class="text-32 font-semibold pb-[8px]">บริการค้นหาข้อมูลทรัพย์สินทางปัญญา</div>
            <div class="text-18">
              <div>
                บริการนี้เป็นบริการช่วยตรวจสอบหรือค้นหาเครื่องหมายการค้าที่ผู้ใช้งาน<br class="hidden md:block" />
                สามารถเข้าถึงข้อมูลได้ด้วยตนเองจากกรมทรัพย์สินทางปัญญา
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="w-full pb-[40px]">
      <div class="mb-[32px]">
        <div class="text-18 font-bold mb-[12px] text-[#333]">ค้นหาทั่วไปด้วยคำ</div>
        <div class="flex gap-[12px]">
          <input
            v-model="keyword"
            type="text"
            class="flex-1 border border-[#E0E0E0] rounded-lg px-4 py-3 text-[#333] placeholder-gray-400 focus:outline-none focus:border-[#FF5C39]"
            placeholder="กรอกคำที่ต้องการค้นหาข้อมูลทั้งหมด"
          />
          <button
            type="button"
            class="bg-[#FF5C39] hover:bg-[#E04F30] text-white px-8 py-3 rounded-lg flex items-center gap-2 font-medium transition-colors"
            @click="onQuickSearch"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M21 21L16.65 16.65" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            ค้นหา
          </button>
        </div>
      </div>

      <div class="mb-[32px]">
        <div class="text-24 font-bold mb-[24px] text-[#333]">กำหนดเงื่อนไขค้นหา</div>

        <div class="flex gap-[8px] mb-0 border-b border-[#E0E0E0] pb-0 overflow-x-auto">
          <button
            type="button"
            class="px-[24px] py-[12px] rounded-t-lg flex items-center gap-2 transition-all relative top-[1px] whitespace-nowrap"
            :class="
              activeTab === 'basic'
                ? 'bg-[#FFECEB] text-[#FF5C39] font-bold border-b-4 border-[#FF5C39]'
                : 'bg-transparent text-[#888] hover:bg-gray-50'
            "
            @click="activeTab = 'basic'"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 6H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8 12H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M3 6H3.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M3 12H3.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M3 18H3.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            ค้นหารูปแบบทั่วไป
          </button>

          <button
            type="button"
            class="px-[24px] py-[12px] rounded-t-lg flex items-center gap-2 transition-all relative top-[1px] whitespace-nowrap"
            :class="
              activeTab === 'similarity'
                ? 'bg-[#FFECEB] text-[#FF5C39] font-bold border-b-4 border-[#FF5C39]'
                : 'bg-transparent text-[#888] hover:bg-gray-50'
            "
            @click="activeTab = 'similarity'"
          >
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
              <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
              <path d="M21 15L16 10L5 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            ตรวจสอบความเหมือนคล้ายของเครื่องหมาย
          </button>

          <button
            type="button"
            class="px-[24px] py-[12px] rounded-t-lg flex items-center gap-2 transition-all relative top-[1px] whitespace-nowrap"
            :class="
              activeTab === 'trademark'
                ? 'bg-[#FFECEB] text-[#FF5C39] font-bold border-b-4 border-[#FF5C39]'
                : 'bg-transparent text-[#888] hover:bg-gray-50'
            "
            @click="activeTab = 'trademark'"
          >
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
              <path d="M8 10V8H16V10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 8V16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            ตรวจสอบรูปเครื่องหมายการค้า
          </button>
        </div>

        <div class="border border-[#E0E0E0] rounded-b-xl rounded-tr-xl p-[32px] bg-white shadow-sm mb-[32px]">

          <div v-show="activeTab !== 'trademark'">
            <div class="flex items-center gap-[8px] mb-[24px] border-b border-[#E0E0E0] pb-4">
              <span class="text-18 font-bold text-[#333]">เครื่องหมายการค้า</span>
              <span class="flex h-[18px] w-[18px] items-center justify-center rounded-full border border-[#999] font-serif text-[12px] font-black leading-none text-[#999] cursor-help" title="ข้อมูลเพิ่มเติม">i</span>
            </div>

            <div v-for="(group, gIndex) in conditionGroups" :key="gIndex">

              <div v-if="gIndex > 0" class="relative py-8">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-[#E0E0E0]"></div>
                </div>
                <div class="relative flex justify-center">
                  <span class="bg-[#F5A623] text-white px-10 py-2 rounded-md text-sm font-medium shadow-sm">
                    {{ group.groupOperator }}
                  </span>
                </div>
              </div>

              <div v-if="gIndex > 0" class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-bold text-[#333]">กลุ่มเงื่อนไขที่ - {{ gIndex + 1 }}</h3>
                <button
                  type="button"
                  class="bg-[#FFECEB] text-[#FF5C39] hover:bg-[#FFD1CD] px-4 py-2 rounded-md text-sm flex items-center gap-2 border border-[#FF5C39]/20"
                  @click="removeGroup(gIndex)"
                >
                  ลบกลุ่มเงื่อนไขนี้
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>

              <div class="bg-[#F8F9FA] rounded-lg p-6 mb-6">
                <SearchConditionItem
                  v-for="(condition, index) in group.items"
                  :key="index"
                  :condition="condition"
                  :can-remove="group.items.length > 1"
                  :is-last="index === group.items.length - 1"
                  @add-condition="(op) => handleAddCondition(gIndex, index, op)"
                  @remove="removeCondition(gIndex, index)"
                />
              </div>
            </div>

            <div class="mb-4 relative">
              <button
                type="button"
                class="flex items-center gap-2 text-[#FF5C39] hover:text-[#D14022] font-medium transition-colors"
                @click="toggleGroupDropdown"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="11" stroke="currentColor" stroke-width="1.5"/>
                  <path d="M12 7V17M7 12H17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>เพิ่มกลุ่มเงื่อนไข</span>
              </button>

              <div v-if="showGroupDropdown" class="absolute left-0 top-full mt-2 w-[160px] bg-white border border-[#E0E0E0] rounded-lg shadow-lg z-10 overflow-hidden py-1">
                <button type="button" class="w-full text-left px-4 py-2 text-sm text-[#333] hover:bg-gray-100" @click="addNewGroup('และ')">และ</button>
                <button type="button" class="w-full text-left px-4 py-2 text-sm text-[#333] hover:bg-gray-100" @click="addNewGroup('หรือ')">หรือ</button>
                <button type="button" class="w-full text-left px-4 py-2 text-sm text-[#333] hover:bg-gray-100" @click="addNewGroup('ไม่เอา')">ไม่เอา</button>
              </div>
            </div>
          </div>

          <div v-show="activeTab === 'trademark'">
            <TrademarkUploadSection ref="uploadSectionRef" @file-selected="onFileSelected" />
          </div>
        </div>

        <div class="flex justify-between items-center">
          <button
            type="button"
            class="flex items-center gap-2 text-gray-500 hover:text-gray-700 px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            @click="clearAllConditions"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>
            <span v-if="activeTab === 'trademark'">ล้างเงื่อนไข</span>
            <span v-else>ล้างการค้นหา</span>
          </button>

          <button
            type="button"
            class="bg-[#E03A3E] hover:bg-[#C0272D] text-white px-10 py-3 rounded-lg flex items-center gap-2 font-medium shadow-sm transition-colors"
            @click="onSearch"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <span>ค้นหาข้อมูล</span>
          </button>
        </div>
      </div>
    </div>

    <LoadingOverlay :show="isSearching" />

  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SearchConditionItem from './SearchConditionItem.vue'
import TrademarkUploadSection from '../components/search/forms/advanced/tabs/TrademarkUploadSection.vue' // Import ไฟล์ใหม่เข้ามาแทน
import LoadingOverlay from '../components/ui/LoadingOverlay.vue'

const route = useRoute()
const router = useRouter()

const keyword = ref('')
const activeTab = ref<'basic' | 'similarity' | 'trademark'>('basic')
const showGroupDropdown = ref(false)
const isSearching = ref(false)

// เปลี่ยนชื่อ Ref ให้สื่อความหมายถึงไฟล์ใหม่
const uploadSectionRef = ref<InstanceType<typeof TrademarkUploadSection> | null>(null)

// ตัวแปรสำหรับ Image Search
const selectedFile = ref<File | null>(null)
const selectedFileName = ref('')

// Data Structure
const conditionGroups = ref([
  {
    groupOperator: '',
    items: [{ type: '', value: '', operator: 'like', startDate: '', endDate: '', connective: '' }]
  }
])

onMounted(() => {
  if (route.query.q) keyword.value = route.query.q as string
  if (route.query.mode) activeTab.value = route.query.mode as any
})

function onQuickSearch() {
   if (keyword.value.trim()) router.push({ path: '/result', query: { q: keyword.value } })
}

// รับค่าจาก Component ลูก (Logic เดิม)
function onFileSelected(file: File | null, fileName: string) {
  selectedFile.value = file
  selectedFileName.value = fileName
}

function handleAddCondition(gIndex: number, iIndex: number, option: string) {
  conditionGroups.value[gIndex].items[iIndex].connective = option
  conditionGroups.value[gIndex].items.push({ type: '', value: '', operator: 'like', startDate: '', endDate: '', connective: '' })
}

function removeCondition(gIndex: number, iIndex: number) {
  const group = conditionGroups.value[gIndex]
  if (group.items.length > 1) {
    group.items.splice(iIndex, 1)
    if (iIndex === group.items.length && iIndex > 0) {
       group.items[iIndex - 1].connective = ''
    }
  }
}

function addNewGroup(operator: string) {
  conditionGroups.value.push({
    groupOperator: operator,
    items: [{ type: '', value: '', operator: 'like', startDate: '', endDate: '', connective: '' }]
  })
  showGroupDropdown.value = false
}

function removeGroup(index: number) {
  conditionGroups.value.splice(index, 1)
}

function clearAllConditions() {
  if (activeTab.value === 'trademark') {
    // สั่งให้ Component ใหม่เคลียร์ค่า
    uploadSectionRef.value?.clear()
    selectedFile.value = null
    selectedFileName.value = ''
  } else {
    conditionGroups.value = [{ groupOperator: '', items: [{ type: '', value: '', operator: 'like', startDate: '', endDate: '', connective: '' }] }]
  }
}

function toggleGroupDropdown() {
  showGroupDropdown.value = !showGroupDropdown.value
}

function onSearch() {
  isSearching.value = true

  setTimeout(() => {
    const conditions = JSON.stringify(conditionGroups.value)

    const queryParams: any = {
      mode: activeTab.value,
      data: conditions
    }

    // ถ้าเป็นโหมดรูปภาพ ส่งชื่อไฟล์ไปด้วย
    if (activeTab.value === 'trademark' && selectedFileName.value) {
      queryParams.fileName = selectedFileName.value
    }

    router.push({
      path: '/result',
      query: queryParams
    })

    isSearching.value = false
  }, 2000)
}
</script>

<style scoped>
.text-24 { font-size: 24px; }
.text-32 { font-size: 32px; }
.text-14 { font-size: 14px; }
.text-18 { font-size: 18px; }
</style>
