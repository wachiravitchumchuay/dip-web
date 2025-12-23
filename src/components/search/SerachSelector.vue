<template>
  <section class="w-full py-[33px]">
    <div class="">เลือกชุดข้อมูลเพื่อค้นหา</div>

    <div
      class="mt-[8px] grid gap-[8px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
    >
      <SearchSelectorCard
        label="ค้นหาทั้งหมด"
        iconSrc="/SearchSelectorCardIcon/ai-search-02.svg"
        :selected="selected === 'dataset-01'"
        @click="selectDataset('dataset-01')"
      />
      <SearchSelectorCard
        label="สิทธิบัตรการประดิษฐ์"
        iconSrc="/SearchSelectorCardIcon/document-validation.svg"
        :selected="selected === 'dataset-02'"
        @click="selectDataset('dataset-02')"
      />
      <SearchSelectorCard
        label="สิทธิบัตรการออกแบบผลิตภัณฑ์"
        iconSrc="/SearchSelectorCardIcon/file-validation.svg"
        :selected="selected === 'dataset-03'"
        @click="selectDataset('dataset-03')"
      />
      <SearchSelectorCard
        label="อนุสิทธิบัตร"
        iconSrc="/SearchSelectorCardIcon/identity-card.svg"
        :selected="selected === 'dataset-04'"
        @click="selectDataset('dataset-04')"
      />
      <SearchSelectorCard
        label="ผังภูมิของวงจรรวม"
        iconSrc="/SearchSelectorCardIcon/chart-histogram.svg"
        :selected="selected === 'dataset-05'"
        @click="selectDataset('dataset-05')"
      />
      <SearchSelectorCard
        label="ลิขสิทธิ์"
        iconSrc="/SearchSelectorCardIcon/clipboard.svg"
        :selected="selected === 'dataset-06'"
        @click="selectDataset('dataset-06')"
      />
      <SearchSelectorCard
        label="ลิขสิทธิ์เพลง"
        iconSrc="/SearchSelectorCardIcon/playlist-02.svg"
        :selected="selected === 'dataset-07'"
        @click="selectDataset('dataset-07')"
      />
      <SearchSelectorCard
        label="เครื่องหมายการค้า"
        iconSrc="/SearchSelectorCardIcon/audit-01.svg"
        :selected="selected === 'dataset-08'"
        @click="selectDataset('dataset-08')"
      />
      <SearchSelectorCard
        label="สิ่งบ่งชี้ทางภูมิศาสตร์"
        iconSrc="/SearchSelectorCardIcon/mountain.svg"
        :selected="selected === 'dataset-09'"
        @click="selectDataset('dataset-09')"
      />
      <SearchSelectorCard
        label="ข้อมมูลความหลาหลายทาง ชีวิวภาพ"
        iconSrc="/SearchSelectorCardIcon/biomass-energy.svg"
        :selected="selected === 'dataset-10'"
        @click="selectDataset('dataset-10')"
      />
      <SearchSelectorCard
        label="ข้อมมูลความหลาหลายทางวัฒนธรรม "
        iconSrc="/SearchSelectorCardIcon/agreement-02.svg"
        :selected="selected === 'dataset-11'"
        @click="selectDataset('dataset-11')"
      />
      <SearchSelectorCard
        label="ข้อมูลสมุนไพรไทย"
        iconSrc="/SearchSelectorCardIcon/leaf-01.svg"
        :selected="selected === 'dataset-12'"
        @click="selectDataset('dataset-12')"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import SearchSelectorCard from '@/components/search/SearchSelectorCard.vue'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { parseDatasetKey } from '@/types/search'
import type { DatasetKey } from '@/types/search'

const route = useRoute()
const router = useRouter()

const selected = computed(() => parseDatasetKey(route.query.dataset))

async function selectDataset(key: DatasetKey) {
  await router.push({
    query: {
      ...route.query,
      dataset: key,
    },
  })
}
</script>
