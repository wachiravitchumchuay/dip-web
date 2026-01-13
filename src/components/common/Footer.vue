<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <footer class="w-full text-18 mt-[60px]">
    <div class="w-full h-[182px] px-20 app-bg-gray-2">
      <div class="flex w-full h-full items-center justify-between">
        <div class="flex-col w-1/2">
          <div class="pb-[12px]">
            <img width="215" height="26" src="/DIP-Logo.png" alt="DIP Logo" />
          </div>

          <div class="flex">
            <div>
              <Location09Icon />
            </div>
            <div>
              <div>เลขที่ 563 ถนนนนทบุรี ต.บางกระสอ อ.เมืองนนทบุรี</div>
              <div>จังหวัดนนทบุรี 11000</div>
            </div>
          </div>
        </div>

        <div class="flex justify-around w-1/2 px-[32px]">
          <div class="flex app-text-red">
            <div classname="flex items-start">
              <PhoneIcon />
            </div>
            <div class="flex-col">
              <div>สายด่วน/ติดต่อสอบถาม</div>
              <div class="text-32 font-semibold">1368</div>
            </div>
          </div>
          <div class="flex">
            <div>
              <MessageQuestionIcon />
            </div>
            <div>แบบสอบถามปัญหาการใช้งาน</div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full h-[32px] app-bg-red !rounded-none">
      <div class="text-center text-white pt-1 rounded-none">
        ©2025 กรมทรัพย์สินทางปัญญา,กระทรวงพาณิชย์ | นโยบายการคุ้มครองข้อมูลส่วนบุคคล
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import Location09Icon from '@/assets/icons/location-09.svg'
import PhoneIcon from '@/assets/icons/phone.svg'
import MessageQuestionIcon from '@/assets/icons/message-question.svg'
</script>
