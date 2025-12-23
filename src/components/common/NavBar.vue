<template>
  <nav class="w-full h-20 bg-app-bg text-18 border-b border-separator-gray">
    <div class="px-20 py-5">
      <div class="flex justify-between">
        <div class="flex items-center">
          <div>
            <img width="270" height="42" src="/dip-logo.png" />
          </div>
        </div>

        <div class="flex items-center">
          <a href="#" class="pr-3 border-r border-separator-gray">คำแนะนำการใช้งาน</a>
          <a href="#" class="px-3 border-r border-separator-gray">แจ้งปัญหาการใช้งาน</a>
          <a href="#" class="px-3 border-r border-separator-gray">ตัวช่วยสำหรับคนพิการ</a>
          <div class="flex items-center px-3">
            <div class="flex h-[24px] w-[24px] flex-shrink-0 items-center justify-center">
              <img
                src="/phone-fill.svg"
                class="h-[24px] w-[24px] object-contain"
                alt="Phone-fill logo"
              />
            </div>
            <div class="text-custom-red font-semibold">1368</div>
          </div>
          <div class="px-3">
            <div class="flex items-center gap-2">
              <div class="h-[24px] w-[24px] overflow-hidden rounded-full">
                <img src="/th-flag.png" class="h-full w-full object-cover" alt="TH logo" />
              </div>
              <div>ไทย</div>
            </div>
          </div>
          <div class="px-3">
            <div class="flex items-center gap-2">
              <div class="flex h-[24px] w-[24px] flex-shrink-0 items-center justify-center">
                <img
                  src="/account_circle.svg"
                  class="h-[24px] w-[24px] object-contain"
                  alt="account logo"
                />
              </div>
              <div>เข้าสู่ระบบ</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
