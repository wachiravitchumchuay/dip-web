<template>
  <header class="w-full">
    <div class="app-text-red py-5 text-32">บริการค้นหาข้อมูลทรัพย์สินทางปัญญา (IP SEARCH)</div>

    <div
      class="relative w-full cursor-pointer hover:opacity-90 transition-opacity"
      @click="goToMainSearchMenu"
    >
      <img src="/Banner.png" class="h-[200px] w-full rounded-2xl" alt="Banner" />

      <div class="absolute inset-0 flex items-center pl-[97px] text-white">
        <div class="flex-col">
          <div class="text-32 font-semibold pb-[8px]">บริการค้นหาข้อมูลทรัพย์สินทางปัญญา</div>
          <div class="text-18">
            <div>
              บริการนี้เป็นบริการช่วยตรวจสอบหรือค้นหาเครื่องหมายการค้าที่ผู้ใช้งาน<br />
              สามารถเข้าถึงข้อมูลได้ด้วยตนเองจากกรมทรัพย์สินทางปัญหา
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goToMainSearchMenu() {
  router.push('/main-search-menu')
}
</script>
