<!-- src/components/search/forms/advanced/tabs/ConditionGroup.vue -->
<template>
  <div class="bg-[#F3F3F3] p-[12px]">
    <div class="flex items-center justify-between">
      <div class="text-18 font-semibold">กลุ่มเงื่อนไขที่ {{ index + 1 }}</div>

      <button
        v-if="canRemoveGroup"
        type="button"
        class="inline-flex items-center gap-[8px] text-[#C0272D]"
        @click="emit('remove-group')"
      >
        <span class="inline-flex h-[20px] w-[20px] items-center justify-center">🗑️</span>
        <span>ลบกลุ่มเงื่อนไข</span>
      </button>
    </div>

    <div class="mt-[12px]">
      <button
        type="button"
        class="h-15 w-[110px] bg-[#1B8A6B] px-[12px] text-white"
        @click="emit('toggle-join')"
      >
        {{ joinLabel }}
      </button>
    </div>

    <div class="mt-[12px] space-y-[12px]">
      <div
        v-for="rule in group.rules"
        :key="rule.id"
        class="grid gap-[12px] md:grid-cols-[1fr_1fr_auto] md:items-end"
      >
        <div>
          <div class="mb-[6px]">เงื่อนไข</div>
          <select
            :value="rule.condition"
            class="h-15 w-full border border-[#D9D9D9] px-[12px] outline-none"
            @change="onChangeCondition(rule.id, ($event.target as HTMLSelectElement).value)"
          >
            <option value="">เลือกเงื่อนไขหรือพิมพ์เพื่อค้นหา</option>
            <option value="name">ชื่อ</option>
            <option value="owner">เจ้าของ</option>
            <option value="number">เลขที่</option>
          </select>
        </div>

        <div>
          <div class="mb-[6px]">คำค้นหา</div>
          <input
            :value="rule.value"
            type="text"
            class="h-15 w-full border border-[#D9D9D9] px-[12px] outline-none"
            placeholder="ใส่คำสำหรับการค้นหา"
            @input="onChangeValue(rule.id, ($event.target as HTMLInputElement).value)"
          />
        </div>

        <div class="flex items-center gap-[8px]">
          <button
            type="button"
            class="inline-flex h-15 items-center gap-[8px] border border-[#D9D9D9] bg-white px-[14px]"
            @click="emit('add-rule')"
          >
            <span
              class="inline-flex h-[22px] w-[22px] items-center justify-center rounded-full border border-[#D9D9D9]"
              >+</span
            >
            <span>เพิ่มเงื่อนไข</span>
          </button>

          <button
            v-if="group.rules.length > 1"
            type="button"
            class="inline-flex h-15 w-[44px] items-center justify-center border border-[#D9D9D9] bg-white"
            @click="emit('remove-rule', rule.id)"
            aria-label="ลบเงื่อนไข"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ConditionGroup, ConditionKey } from '@/types/searchConditions'

const props = defineProps<{
  group: ConditionGroup
  index: number
  canRemoveGroup: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle-join'): void
  (e: 'add-rule'): void
  (e: 'remove-rule', ruleId: string): void
  (
    e: 'update-rule',
    payload: { ruleId: string; patch: { condition?: ConditionKey; value?: string } },
  ): void
  (e: 'remove-group'): void
}>()

const joinLabel = computed(() => (props.group.joinOp === 'AND' ? 'และ' : 'หรือ'))

function onChangeCondition(ruleId: string, v: string) {
  const condition = (v as ConditionKey) ?? ''
  emit('update-rule', { ruleId, patch: { condition } })
}

function onChangeValue(ruleId: string, v: string) {
  emit('update-rule', { ruleId, patch: { value: v } })
}
</script>
