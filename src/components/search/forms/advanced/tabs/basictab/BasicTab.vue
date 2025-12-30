<template>
  <div class="w-full">
    <div class="space-y-[12px] p-[12px]">
      <ConditionGroup
        v-for="(g, idx) in groups"
        :key="g.id"
        :group="g"
        :index="idx"
        :can-remove-group="groups.length > 1"
        @toggle-join="toggleGroupJoin(g.id)"
        @add-rule="addRule(g.id)"
        @remove-rule="removeRule(g.id, $event)"
        @update-rule="updateRule(g.id, $event.ruleId, $event.patch)"
        @remove-group="removeGroup(g.id)"
      />
      <div>
        <button type="button" class="app-button app-bg-gray border" @click="addGroup">
          <div class="flex pl-4">
            <AddCircleIcon />
            <div class="pl-2">เพิ่มกลุ่มเงื่อนไข</div>
          </div>
        </button>
      </div>
    </div>

    <div class="flex items-center bg-white mt-[12px] flex justify-between">
      <button type="button" class="app-button bg-[#F5A623] text-black" @click="onClear">
        <div class="flex pl-4">
          <RedoIcon />
          <div class="pl-2">ล้างเงื่อนไข</div>
        </div>
      </button>

      <button
        type="button"
        class="app-button app-bg-green text-white"
        @click="emit('submit', buildPayload())"
      >
        <div class="flex pl-4">
          <Search01Icon />
          <div class="pl-2">ค้นหาข้อมูล</div>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ConditionGroup from '@/components/search/forms/advanced/tabs/basictab/ConditionGroup.vue'
import type {
  ConditionGroup as Group,
  ConditionRule,
  JoinOp,
  ConditionKey,
} from '@/types/searchConditions'
import AddCircleIcon from '@/assets/icons/add-circle.svg'
import RedoIcon from '@/assets/icons/redo.svg'
import Search01Icon from '@/assets/icons/search-01.svg'
import { R } from 'vue-router/dist/router-CWoNjPRp.mjs'
const props = defineProps<{
  keyword: string
}>()

const emit = defineEmits<{
  (e: 'submit', payload: unknown): void
  (e: 'clear'): void
}>()

function id() {
  return crypto.randomUUID()
}

function newRule(): ConditionRule {
  return { id: id(), condition: '', value: '' }
}

function newGroup(): Group {
  return { id: id(), joinOp: 'AND', rules: [newRule()] }
}

const groups = ref<Group[]>([newGroup()])

function toggleGroupJoin(groupId: string) {
  const g = groups.value.find((x) => x.id === groupId)
  if (!g) return
  g.joinOp = g.joinOp === 'AND' ? 'OR' : 'AND'
}

function addRule(groupId: string) {
  const g = groups.value.find((x) => x.id === groupId)
  if (!g) return
  g.rules.push(newRule())
}

function removeRule(groupId: string, ruleId: string) {
  const g = groups.value.find((x) => x.id === groupId)
  if (!g) return
  if (g.rules.length <= 1) return
  g.rules = g.rules.filter((r) => r.id !== ruleId)
}

function updateRule(
  groupId: string,
  ruleId: string,
  patch: { condition?: ConditionKey; value?: string },
) {
  const g = groups.value.find((x) => x.id === groupId)
  if (!g) return
  const r = g.rules.find((x) => x.id === ruleId)
  if (!r) return
  if (patch.condition !== undefined) r.condition = patch.condition
  if (patch.value !== undefined) r.value = patch.value
}

function addGroup() {
  groups.value.push(newGroup())
}

function removeGroup(groupId: string) {
  if (groups.value.length <= 1) return
  groups.value = groups.value.filter((g) => g.id !== groupId)
}

function onClear() {
  groups.value = [newGroup()]
  emit('clear')
}

function buildPayload() {
  return {
    mode: 'similarity',
    keyword: props.keyword,
    groups: groups.value.map((g) => ({
      joinOp: g.joinOp as JoinOp,
      rules: g.rules.map((r) => ({
        condition: r.condition,
        value: r.value,
      })),
    })),
  }
}
</script>
