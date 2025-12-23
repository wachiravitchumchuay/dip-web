<template>
  <main class="min-h-screen w-full">
    <!-- Background -->
    <div class="relative min-h-screen w-full">
      <!-- background image / tint -->
      <div class="absolute inset-0 bg-[#F3F3F3]" />
      <div
        class="absolute inset-0 bg-cover bg-center opacity-40"
        style="background-image: url('/auth-bg.png')"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-white/70 to-white/70" />

      <!-- Center card -->
      <div
        class="relative mx-auto flex min-h-screen max-w-[1200px] items-center justify-center px-4"
      >
        <section
          class="flex w-full max-w-[980px] overflow-hidden rounded-[16px] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.18)]"
        >
          <!-- Left (1/2) -->
          <div class="w-1/2 bg-[#7D1B1E] text-white">
            <div class="flex h-full flex-col p-[40px]">
              <div class="text-[52px] font-bold leading-none">DIP</div>

              <div class="mt-[10px] text-[14px] leading-tight opacity-90">
                กรมทรัพย์สินทางปัญญา<br />
                DEPARTMENT OF INTELLECTUAL PROPERTY
              </div>

              <div class="mt-[16px] text-[16px] font-semibold">TRADE MARKS CHECKER</div>

              <div class="mt-auto h-[120px] opacity-30">
                <!-- placeholder decoration -->
              </div>
            </div>
          </div>

          <!-- Right (1/2) -->
          <div class="w-1/2">
            <div class="flex h-full flex-col p-[40px]">
              <div class="text-center text-[18px] font-semibold text-[#333]">
                เข้าสู่ระบบผ่านช่องทาง Digital ID
              </div>

              <!-- Button row -->
              <div class="mt-[22px] flex justify-center">
                <button
                  type="button"
                  class="flex h-[52px] w-[320px] items-center justify-center gap-[10px] rounded-[10px] bg-[#1E40AF] px-[16px] text-[16px] font-semibold text-white"
                  @click="onThaiIdLogin"
                >
                  <span
                    class="flex h-[32px] w-[32px] items-center justify-center overflow-hidden rounded-[6px] bg-white/10"
                  >
                    <img src="/TH-Flag.png" class="h-[22px] w-[22px] object-contain" alt="ThaiID" />
                  </span>
                  เข้าสู่ระบบด้วย ThaiID
                </button>
              </div>

              <!-- Link under button -->
              <div class="mt-[10px] text-center">
                <a href="#" class="text-[14px] font-semibold text-[#2563EB] underline">
                  วิธีลงทะเบียน ThaiID
                </a>
              </div>

              <!-- Text blocks -->
              <div class="mt-[18px] text-[12px] leading-relaxed text-[#444]">
                <div class="font-semibold">การเข้าสู่ระบบด้วยแอปพลิเคชัน ThaiID</div>
                <div>1. เลือก “เข้าสู่ระบบด้วย ThaiID”</div>
                <div>2. ยืนยันตัวตนโดยใช้แอปพลิเคชัน ThaiID สแกน QR Code ที่แสดงบนเว็บไซต์</div>
              </div>

              <div class="mt-[18px] text-[12px] leading-relaxed text-[#444]">
                <div class="font-semibold">หากยังไม่มีแอปพลิเคชัน ThaiID ให้ทำดังนี้</div>
                <div>1. ดาวน์โหลดแอปพลิเคชัน ThaiID จาก Play Store หรือ App Store</div>
                <div>
                  2. ลงทะเบียนการใช้งาน ThaiID ด้วยตนเองผ่านแอปพลิเคชัน หรือ
                  ลงทะเบียนผ่านเจ้าหน้าที่ ณ สำนักงานเขตทั่วประเทศ
                </div>
              </div>

              <div class="mt-auto" />
            </div>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function onThaiIdLogin() {
  // placeholder: wire to real auth later
  console.log('thaiid login')
  // router.push('/auth/callback') // example
}
</script>
