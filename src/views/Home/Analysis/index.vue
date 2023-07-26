<template>
  <div>
    <heading title="Thống kê">
      <div class="flex items-center">
        <a-radio-group v-model:value="viewMode" button-style="solid" @change="changeViewMode">
          <a-radio-button value="month">Theo tháng</a-radio-button>
          <a-radio-button value="quarter">Theo quý</a-radio-button>
        </a-radio-group>
        <a-select v-model:value="year" :options="yearOptions" class="ml-4" />
        <a-select
          v-model:value="branch"
          placeholder="Chọn chi nhánh"
          class="w-[240px] ml-4"
          :options="branchStore.allBranchOptions"
        />
      </div>
    </heading>

    <BarChart :chart-data="testData" />
  </div>
</template>
<script setup>
import { computed, defineComponent, onMounted, ref } from 'vue'
import { Chart, registerables } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { useBranchStore } from '~/stores/branch'
import { random } from 'lodash'

Chart.register(...registerables, ChartDataLabels)

// Store
const moment = useMoment()
const branchStore = useBranchStore()

// State

const branch = ref(-1)
const year = ref(moment.moment().year())
const viewMode = ref('month')
const chartLabels = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
const chartData = ref({
  debt: [30, 40, 60, 70, 5, 30, 40, 60, 70, 5, 36, 24],
  revenue: [30, 40, 60, 70, 5, 30, 40, 60, 70, 5, 36, 24],
  profit: [30, 40, 60, 70, 5, 30, 40, 60, 70, 5, 36, 24]
})

const yearOptions = computed(() => {
  const currentYear = moment.moment().year()
  return [...Array(10).keys()].map((i) => ({
    label: currentYear - i,
    value: currentYear - i
  }))
})
const testData = computed(() => ({
  labels: chartLabels.value,
  datasets: [
    {
      label: 'Công nợ',
      data: chartData.value.debt,
      backgroundColor: '#f7b37e'
    },
    {
      label: 'Doanh thu',
      data: chartData.value.revenue,
      backgroundColor: '#99c2f0'
    },
    {
      label: 'Lợi nhuận',
      data: chartData.value.profit,
      backgroundColor: '#4c9e42'
    }
  ]
}))

// Methods
const changeViewMode = () => {
  let totalItems = viewMode.value === 'quarter' ? 4 : 12

  chartLabels.value = [...Array(totalItems).keys()].map(
    (i) => `${viewMode.value === 'quarter' ? 'Quý' : 'Tháng'} ${i + 1}`
  )
  chartData.value = {
    debt: [...Array(totalItems).keys()].map((i) => random(0, 100)),
    revenue: [...Array(totalItems).keys()].map((i) => random(0, 100)),
    profit: [...Array(totalItems).keys()].map((i) => random(0, 100))
  }
}

// Hooks
onMounted(async () => {
  await branchStore.getAll()
  changeViewMode()
})
</script>

<script>
import { BarChart } from 'vue-chart-3'
import { useMoment } from '~/composables'

export default defineComponent({
  name: 'Analysis',
  components: { BarChart }
})
</script>
