<template>
  <div class="app-bg-gray-2 p-4">
    <div class="flex items-center justify-between">
      <div class="text-18 font-semibold">กลุ่มเงื่อนไขที่ {{ index + 1 }}</div>

      <button
        v-if="canRemoveGroup"
        type="button"
        class="inline-flex items-center gap-[8px] text-[#C0272D]"
        @click="emit('remove-group')"
      >
        <div class="flex pl-6">
          <Delete04Icon />
          <div class="pl-2">ลบกลุ่มเงื่อนไข</div>
        </div>
      </button>
    </div>

    <div class="mt-[12px]" v-if="index !== 0">
      <button type="button" class="app-button app-bg-green text-white" @click="emit('toggle-join')">
        <div class="flex pl-6">
          <CircleArrowDown01Icon />
          <div class="pl-2">{{ joinLabel }}</div>
        </div>
      </button>
    </div>

    <div class="mt-[12px] space-y-[12px]">
      <div v-for="rule in group.rules" :key="rule.id" class="flex-col">
        <div class="grid gap-[12px] md:grid-cols-[1fr_1fr_auto] md:items-end">
          <div>
            <div class="mb-[6px] relative">เงื่อนไข</div>
            <select
              :value="rule.condition"
              class="app-select appearance-none"
              @change="onChangeCondition(rule.id, ($event.target as HTMLSelectElement).value)"
            >
              <option value="">เลือกเงื่อนไขหรือพิมพ์เพื่อค้นหา</option>
              <option value="name">ชื่อ</option>
              <option value="owner">เจ้าของ</option>
              <option value="number">เลขที่</option>
            </select>
          </div>

          <div>
            <div class="mb-[6px] text-black">คำค้นหา</div>
            <input
              :value="rule.value"
              type="text"
              class="app-input"
              placeholder="ใส่คำสำหรับการค้นหา"
              @input="onChangeValue(rule.id, ($event.target as HTMLInputElement).value)"
            />
          </div>

          <div class="flex-col items-center gap-[8px]">
            <button type="button" class="app-button border" @click="emit('add-rule')">
              <div class="flex pl-4">
                <AddCircleIcon />
                <div class="pl-2">เพิ่มเงื่อนไข</div>
              </div>
            </button>
          </div>
        </div>
        <div class="flex w-full justify-end">
          <button
            v-if="group.rules.length > 1"
            type="button"
            class="inline-flex items-center gap-[8px] text-[#C0272D]"
            @click="emit('remove-rule', rule.id)"
            aria-label="ลบเงื่อนไข"
          >
            <div class="flex pl-6">
              <Delete04Icon />
              <div class="pl-2">ลบเงื่อนไข</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ConditionGroup, ConditionKey } from '@/types/searchConditions'
import AddCircleIcon from '@/assets/icons/add-circle.svg'
import CircleArrowDown01Icon from '@/assets/icons/circle-arrow-down-01.svg'
import Delete04Icon from '@/assets/icons/delete-04.svg'

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
