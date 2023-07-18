<template>
  <a-modal
    v-model:visible="visible"
    centered
    width="auto"
    title="Tải log hệ thống"
    ok-text="Tải xuống"
    cancel-text="Đóng"
    @ok="emits('ok', { day, type })"
    @cancel="emits('close')"
  >
    <div class="grid grid-cols-2 gap-x-8">
      <div class="flex flex-col min-w-[160px]">
        <label>Số ngày xem log</label>
        <a-select v-model:value="day" :options="dayOptions" />
      </div>
      <div class="flex flex-col min-w-[160px]">
        <label>Chọn kiểu</label>
        <a-select v-model:value="type" :options="typeOptions" />
      </div>
    </div>
  </a-modal>
</template>

<script setup>
import { ref } from 'vue'
import { SYSTEM_LOG_TYPE } from '~/modules/constant'

const emits = defineEmits(['ok', 'close'])

// State
const typeOptions = [
  { label: '.log', value: SYSTEM_LOG_TYPE.LOG },
  { label: '.txt', value: SYSTEM_LOG_TYPE.TXT },
  { label: '.csv', value: SYSTEM_LOG_TYPE.CSV }
]
const dayOptions = [
  { label: '7 ngày', value: 7 },
  { label: '30 ngày', value: 30 },
  { label: '60 ngày', value: 60 },
  { label: '90 ngày', value: 90 }
]
const visible = ref(true)
const type = ref(SYSTEM_LOG_TYPE.LOG)
const day = ref(7)
</script>
