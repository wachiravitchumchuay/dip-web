<template>
  <main class="max-w-[1200px] mx-auto px-4">
    <div class="w-full py-[40px]">
      <div class="mb-[32px]">
        <div class="text-[32px] font-semibold app-text-red mb-[12px]">
          บริการค้นหาข้อมูลทรัพย์สินทางปัญญา (IP SEARCH)
        </div>
        <div class="text-[18px] text-[#666]">
          บริการนี้เป็นบริการช่วยตรวจสอบหรือค้นหาเครื่องหมายการค้าที่ผู้ใช้งานสามารถเข้าถึงข้อมูลได้ด้วยตนเองจากกรม<br />
          ทรัพย์สินทางปัญญา
        </div>
      </div>

      <div class="mb-[32px]">
        <div class="text-[18px] font-semibold mb-[12px]">ค้นหาทั่วไปด้วยคำ</div>
        <div class="flex gap-[12px]">
          <input
            v-model="keyword"
            type="text"
            class="app-input flex-1 border border-gray-300 rounded-md px-4 py-2"
            placeholder="กรอกคำที่ต้องการค้นหาหรือเลือกไฟล์รูป"
          />
          <button
            type="button"
            class="app-button bg-[#B21F29] text-white px-8 py-2 rounded-md"
            @click="onQuickSearch"
          >
            ค้นหา
          </button>
        </div>
      </div>

      <div
        class="relative w-full rounded-[24px] overflow-hidden min-h-[680px] flex items-center justify-end p-[40px]"
        style="background-color: #B21F29;"
      >
        <div
          class="absolute inset-0 w-full h-full"
          style="
            background-image: url('/Banner.png');
            background-size: cover;
            background-position: right center;
            background-repeat: no-repeat;
          "
        ></div>

        <div class="relative z-10 w-[440px] flex flex-col gap-[16px]">
          <h2 class="text-white text-[36px] font-bold mb-1">เมนูการค้นหา</h2>

          <div class="bg-[#8B1F1F]/90 backdrop-blur-md rounded-[16px] p-[24px] text-white border border-white/10 shadow-xl">
            <div class="flex justify-between items-start mb-1">
              <span class="text-[22px] font-bold">ค้นหารูปแบบทั่วไป</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
            <p class="text-[14px] text-white/80 mb-5 leading-tight font-light">
              วิธีการตรวจสอบเบื้องต้นง่ายๆ และสะดวกรวดเร็ว<br/>โดยผลที่ได้จะไม่ละเอียดเท่ากับการค้นหาแบบอื่นๆ
            </p>
            <button @click="goToBasicSearch" class="w-full bg-white text-black rounded-[12px] py-2.5 flex items-center justify-center gap-2 font-bold hover:bg-gray-100 transition-colors">
              เริ่มการค้นหา
              <div class="w-5 h-5 rounded-full border border-black flex items-center justify-center text-[10px]">→</div>
            </button>
          </div>

          <div class="bg-white rounded-[16px] p-[24px] text-black shadow-xl">
            <div class="flex justify-between items-start mb-1">
              <span class="text-[22px] font-bold leading-tight">ตรวจสอบความเหมือนคล้าย<br/>ของเครื่องหมายการค้า</span>
              <div class="text-[#B21F29]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
              </div>
            </div>
            <p class="text-[14px] text-gray-400 mb-5 leading-tight font-light">
              วิธีการตรวจสอบโดยกำหนดเงื่อนไขที่มีความละเอียด<br/>เพิ่มมากขึ้นตามเงื่อนไขที่กำหนด
            </p>
            <button @click="goToSimilaritySearch" class="w-full bg-[#9B1C24] text-white rounded-[12px] py-2.5 flex items-center justify-center gap-2 font-bold hover:bg-[#80171d] transition-colors shadow-md">
              เริ่มการค้นหา
              <div class="w-5 h-5 rounded-full border border-white flex items-center justify-center text-[12px]">→</div>
            </button>
          </div>

          <div class="bg-white rounded-[16px] p-[24px] text-black shadow-xl">
            <div class="flex justify-between items-start mb-1">
              <span class="text-[22px] font-bold leading-tight">ตรวจสอบรูปเครื่องหมาย<br/>การค้า</span>
              <div class="text-[#B21F29]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
              </div>
            </div>
            <p class="text-[14px] text-gray-400 mb-5 leading-tight font-light">
              วิธีการตรวจสอบด้วยรูปภาพของเครื่องหมายการค้า<br/>เพียงอย่างเดียว
            </p>
            <button @click="goToTrademarkSearch" class="w-full bg-[#9B1C24] text-white rounded-[12px] py-2.5 flex items-center justify-center gap-2 font-bold hover:bg-[#80171d] transition-colors shadow-md">
              ค้นหาด้วยรูปภาพที่นี่
              <div class="w-5 h-5 rounded-full border border-white flex items-center justify-center text-[10px]">→</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const keyword = ref('')

function onQuickSearch() {
  if (keyword.value.trim()) {
    router.push({ path: '/search-detail', query: { q: keyword.value, mode: 'quick' } })
  }
}
function goToBasicSearch() { router.push({ path: '/search-detail', query: { mode: 'basic' } }) }
function goToSimilaritySearch() { router.push({ path: '/search-detail', query: { mode: 'similarity' } }) }
function goToTrademarkSearch() { router.push({ path: '/search-detail', query: { mode: 'trademark' } }) }
</script>

<style scoped>
.app-text-red { color: #B21F29; }
</style>
