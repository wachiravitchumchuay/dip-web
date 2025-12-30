<template>
  <div class="w-full py-[33px]">
    <div>เลือกชุดข้อมูลเพื่อค้นหา</div>

    <div
      class="mt-[8px] grid gap-[8px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
    >
      <SearchSelectorCard
        label="ค้นหาทั้งหมด"
        :icon="AiSearchIcon"
        :selected="selected === 'dataset-01'"
        @click="selectDataset('dataset-01')"
      />
      <SearchSelectorCard
        label="สิทธิบัตรการประดิษฐ์"
        :icon="DocumentValidationIcon"
        :selected="selected === 'dataset-02'"
        @click="selectDataset('dataset-02')"
      />
      <SearchSelectorCard
        label="สิทธิบัตรการออกแบบผลิตภัณฑ์"
        :icon="FileValidationIcon"
        :selected="selected === 'dataset-03'"
        @click="selectDataset('dataset-03')"
      />
      <SearchSelectorCard
        label="อนุสิทธิบัตร"
        :icon="IdentityCardIcon"
        :selected="selected === 'dataset-04'"
        @click="selectDataset('dataset-04')"
      />
      <SearchSelectorCard
        label="ผังภูมิของวงจรรวม"
        :icon="ChartHistogramIcon"
        :selected="selected === 'dataset-05'"
        @click="selectDataset('dataset-05')"
      />
      <SearchSelectorCard
        label="ลิขสิทธิ์"
        :icon="ClipboardIcon"
        :selected="selected === 'dataset-06'"
        @click="selectDataset('dataset-06')"
      />
      <SearchSelectorCard
        label="ลิขสิทธิ์เพลง"
        :icon="PlaylistIcon"
        :selected="selected === 'dataset-07'"
        @click="selectDataset('dataset-07')"
      />
      <SearchSelectorCard
        label="เครื่องหมายการค้า"
        :icon="AuditIcon"
        :selected="selected === 'dataset-08'"
        @click="selectDataset('dataset-08')"
      />
      <SearchSelectorCard
        label="สิ่งบ่งชี้ทางภูมิศาสตร์"
        :icon="MountainIcon"
        :selected="selected === 'dataset-09'"
        @click="selectDataset('dataset-09')"
      />
      <SearchSelectorCard
        label="ข้อมมูลความหลาหลายทาง ชีวิวภาพ"
        :icon="BiomassIcon"
        :selected="selected === 'dataset-10'"
        @click="selectDataset('dataset-10')"
      />
      <SearchSelectorCard
        label="ข้อมมูลความหลาหลายทางวัฒนธรรม "
        :icon="AgreementIcon"
        :selected="selected === 'dataset-11'"
        @click="selectDataset('dataset-11')"
      />
      <SearchSelectorCard
        label="ข้อมูลสมุนไพรไทย"
        :icon="LeafIcon"
        :selected="selected === 'dataset-12'"
        @click="selectDataset('dataset-12')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchSelectorCard from '@/components/search/SearchSelectorCard.vue'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { parseDatasetKey } from '@/types/search'
import type { DatasetKey } from '@/types/search'

import AiSearchIcon from '@/assets/icons/SearchSelectorCardIcon/ai-search-02.svg'
import DocumentValidationIcon from '@/assets/icons/SearchSelectorCardIcon/document-validation.svg'
import FileValidationIcon from '@/assets/icons/SearchSelectorCardIcon/file-validation.svg'
import IdentityCardIcon from '@/assets/icons/SearchSelectorCardIcon/identity-card.svg'
import ChartHistogramIcon from '@/assets/icons/SearchSelectorCardIcon/chart-histogram.svg'
import ClipboardIcon from '@/assets/icons/SearchSelectorCardIcon/clipboard.svg'
import PlaylistIcon from '@/assets/icons/SearchSelectorCardIcon/playlist-02.svg'
import AuditIcon from '@/assets/icons/SearchSelectorCardIcon/audit-01.svg'
import MountainIcon from '@/assets/icons/SearchSelectorCardIcon/mountain.svg'
import BiomassIcon from '@/assets/icons/SearchSelectorCardIcon/biomass-energy.svg'
import AgreementIcon from '@/assets/icons/SearchSelectorCardIcon/agreement-02.svg'
import LeafIcon from '@/assets/icons/SearchSelectorCardIcon/leaf-01.svg'

const route = useRoute()
const router = useRouter()

const selected = computed(() => parseDatasetKey(route.query.dataset))

async function selectDataset(key: DatasetKey) {
  await router.push({
    query: { ...route.query, dataset: key },
  })
}
</script>
