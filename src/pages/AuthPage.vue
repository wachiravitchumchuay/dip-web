<template>
  <main class="min-h-screen w-full">
    <div class="relative min-h-screen w-full">
      <div
        class="absolute inset-0 bg-cover bg-center opacity-40"
        style="background-image: url('/auth-bg.png')"
      />
      <div
        class="relative mx-auto flex min-h-screen max-w-[1200px] items-center justify-center px-4"
      >
        <div
          class="flex w-full max-w-[980px] overflow-hidden bg-white shadow-[0_24px_80px_rgba(0,0,0,0.18)]"
        >
          <div class="w-1/2">
            <img src="/dip-auth.png" class="h-full w-full object-cover" alt="" />
          </div>

          <!-- Right (1/2) -->
          <div class="w-1/2">
            <div class="flex h-full flex-col px-[52px] pt-[60px]">
              <div class="text-center text-18 font-semibold text-[#333]">
                เข้าสู่ระบบผ่านช่องทาง Digital ID
              </div>

              <!-- Button row -->
              <div class="mt-[22px] flex justify-center">
                <button
                  type="button"
                  class="flex h-[60px] w-[320px] items-center justify-center gap-[10px] bg-[#1548D4] px-[16px] text-white rounded-[8px]"
                  @click="onThaIDLogin"
                >
                  <img src="/thaID-logo.png" class="h-[42px] w-[42px] object-contain" alt="ThaID" />
                  เข้าสู่ระบบด้วย ThaID
                </button>
              </div>

              <!-- Link under button -->
              <div class="mt-[36px] text-center">
                <a href="#" class="font-semibold text-[#2563EB] underline"> วิธีลงทะเบียน ThaID </a>
              </div>

              <!-- Text blocks -->
              <div class="mt-[24px] leading-relaxed text-[#444]">
                <div>การเข้าสู่ระบบด้วยแอปพลิเคชัน ThaID</div>
                <div>1. เลือก “เข้าสู่ระบบด้วย ThaID”</div>
                <div>2. ยืนยันตัวตนโดยใช้แอปพลิเคชัน ThaID สแกน QR Code ที่แสดงบนเว็บไซต์</div>
              </div>

              <div class="mt-[36px] leading-relaxed text-[#444]">
                <div>หากยังไม่มีแอปพลิเคชัน ThaID ให้ทำดังนี้</div>
                <div>1. ดาวน์โหลดแอปพลิเคชัน ThaID จาก Play Store หรือ App Store</div>
                <div>
                  2. ลงทะเบียนการใช้งาน ThaID ด้วยตนเองผ่านแอปพลิเคชัน หรือ ลงทะเบียนผ่านเจ้าหน้าที่
                  ณ สำนักงานเขตทั่วประเทศ
                </div>
              </div>

              <div class="mt-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function onThaIDLogin() {
  // placeholder: wire to real auth later
  console.log('ThaID login')
  // router.push('/auth/callback') // example
}
</script>
