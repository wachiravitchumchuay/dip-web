<template>
  <div class="flex items-center gap-3 font-sans text-sm text-gray-600">

    <div class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm">
      <span>{{ totalItems }} รายการ</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400"><path d="m6 9 6 6 6-6"/></svg>
    </div>

    <div class="flex items-center bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden">
      <button
        @click="changePage(1)"
        :disabled="currentPage === 1"
        class="p-2 border-r border-gray-300 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400"><path d="m11 17-5-5 5-5"/><path d="m18 17-5-5 5-5"/></svg>
      </button>

      <button
        @click="changePage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="p-2 border-r border-gray-300 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400"><path d="m15 18-6-6 6-6"/></svg>
      </button>

      <div class="px-5 py-2 border-r border-gray-300 font-medium min-w-[80px] text-center">
        <span class="text-red-700 font-bold">{{ formatNumber(currentPage) }}</span>
        <span class="text-gray-400">/{{ formatNumber(totalPages) }}</span>
      </div>

      <button
        @click="changePage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="p-2 border-r border-gray-300 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b91c1c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </button>

      <button
        @click="changePage(totalPages)"
        :disabled="currentPage === totalPages"
        class="p-2 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b91c1c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 17 5-5-5-5"/><path d="m13 17 5-5-5-5"/></svg>
      </button>
    </div>

    <button
      @click="scrollToTop"
      class="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-sm"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b91c1c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
    </button>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// 1. กำหนด Interface สำหรับ Props
interface Props {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
}

const props = withDefaults(defineProps<Props>(), {
  totalItems: 0,
  itemsPerPage: 10,
  currentPage: 1
});

// 2. กำหนด Emits พร้อม Type
const emit = defineEmits<{
  (e: 'update:currentPage', page: number): void;
  (e: 'change', page: number): void;
}>();

// 3. Logic การคำนวณ
const totalPages = computed((): number => {
  return Math.ceil(props.totalItems / props.itemsPerPage) || 1;
});

const changePage = (page: number): void => {
  if (page >= 1 && page <= totalPages.value) {
    emit('update:currentPage', page);
    emit('change', page);
  }
};

const formatNumber = (num: number): string => {
  return num.toString().padStart(2, '0');
};

const scrollToTop = (): void => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>
