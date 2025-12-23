<template>
  <div class="w-full">
    <div v-if="loading" class="border border-[#D9D9D9] bg-white p-[16px]">กำลังโหลด...</div>
    <div v-else>
      ข้อมูล สิทธิบัตร/สิทธิบัตรออกแบบ/อนุสิทธิบัตร ที่ตรวจค้น เป็นข้อมูลที่ประกาศโฆษณาแล้วเท่านั้น
      <div
        class="grid gap-[12px]"
        :class="view === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'"
      >
        <div v-for="item in items" :key="item.id" class="border border-[#D9D9D9] bg-white p-[16px]">
          <div class="font-semibold text-[#B21F29]">เลขที่คำขอ : {{ item.appNo }}</div>

          <div class="mt-[10px] leading-relaxed text-[#333333]">
            <div><span class="text-[#666666]">ชื่อผู้ขอ :</span> {{ item.owner }}</div>
            <div class="mt-[6px]">
              <span class="text-[#666666]">ชื่อการประดิษฐ์ :</span> {{ item.title }}
            </div>
            <div class="mt-[6px]">
              <span class="text-[#666666]">ประเภทสิทธิบัตร :</span> {{ item.type }}
            </div>
          </div>

          <button type="button" class="mt-[14px] h-[40px] border border-[#D9D9D9] px-[14px]">
            รายละเอียด
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  loading: boolean
  view: 'grid' | 'list'
  items: Array<{
    id: string
    appNo: string
    owner: string
    title: string
    type: string
  }>
}>()
</script>
