<template>
  <section class="list-debt">
    <heading :title="MENU.DEBT.subMenu.LIST_DEBT.name">
      <div class="flex items-center">
        <a-input-search
          v-model:value="search"
          placeholder="Tìm kiếm ..."
          class="mr-4 w-[400px]"
          @keypress.enter="init(currentPage)"
        />

        <a-button
          type="primary"
          class="flex items-center"
          @click="router.push(MENU.DEBT.subMenu.SELECT_DEBT_TYPE.path)"
        >
          <Iconify icon="mdi:plus-circle" width="16px" />
          <span class="ml-2">Tạo công nợ</span>
        </a-button>
      </div>
    </heading>

    <div
      v-if="isFiltering"
      class="mt-8 mb-4 flex border border-solid border-neutral-200 rounded-md justify-between p-4"
    >
      <div>
        <p class="mb-1">Tiêu chí tìm kiếm:</p>
        <div class="mb-0 pl-8">
          <p v-if="search" class="mb-1">
            Nội dung: <span class="font-semibold">{{ search }}</span>
          </p>

          <div class="mb-1">
            <div v-if="date && date.length === 2" class="flex items-center mb-1">
              <Iconify icon="mdi:calendar" class="mr-2" />
              <span>Ngày tạo từ </span>
              <span class="font-semibold mx-2">{{ moment.dFormat(date[0]) }}</span>
              <span>đến</span>
              <span class="font-semibold ml-2">{{ moment.dFormat(date[1]) }}</span>
            </div>
            <div v-if="type && type.length !== 0" class="flex items-center">
              <Iconify icon="mdi:format-list-bulleted-type" class="mr-2" />
              <span class="mr-2">Phân loại:</span>
              <span v-if="type.includes(DEBT_TYPE.STEEL)" class="font-semibold">
                Tôn - Sắt - Thép
              </span>
              <span v-if="type.length === 2">,&nbsp;</span>
              <span v-if="type.includes(DEBT_TYPE.SCREW)" class="font-semibold">Vật liệu</span>
            </div>
          </div>

          <div v-if="customerId && customerId.length !== 0" class="flex items-center">
            <div class="flex items-center">
              <Iconify icon="mdi:account" class="mr-2" />
              <span class="mr-2">Nhà cung cấp:</span>
              <span
                v-for="(item, index) of selectedCustomer"
                :key="item.id"
                :class="['font-semibold', index !== selectedCustomer.length - 1 && 'mr-1']"
              >
                {{ item.name }}{{ index !== selectedCustomer.length - 1 ? ',' : '' }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <a-button v-if="isFiltering" type="primary" class="flex items-center" @click="reset">
        <Iconify icon="tabler:zoom-reset" width="16px" />
        <span class="ml-2">Làm mới</span>
      </a-button>
    </div>

    <p class="text-red-500 font-semibold mb-2 mt-4">
      Tổng số: {{ debtStore.allDebt.totalItems }} công nợ
    </p>

    <a-table
      :columns="LIST_DEBT_TABLE_COLUMNS"
      :scroll="{ x: 'max-content' }"
      :pagination="{
        current: currentPage,
        total: debtStore.allDebt.totalItems,
        pageSize: debtStore.allDebt.pageSize,
        onChange: init
      }"
      :custom-row="
        (record) => ({
          onClick: () => router.push(MENU.DEBT.subMenu.DEBT_DETAIL.path + record.id)
        })
      "
      :data-source="debts"
      row-class-name="cursor-pointer"
    >
      <template #headerCell="{ title, column }">
        <template v-if="column.key === 'customer'">
          <div class="flex items-center">
            <a-popover
              trigger="click"
              placement="bottom"
              overlay-class-name="list-debt-customer-popover"
            >
              <template #content>
                <div class="max-h-[320px] overflow-y-auto custom-scroll p-4">
                  <a-input
                    v-model:value="customerSearch"
                    placeholder="Tìm kiếm nhà cung cấp ..."
                    class="w-full mb-4"
                    @keypress.enter="customerStore.getAll({ search: customerSearch })"
                  />

                  <a-checkbox-group
                    v-if="customerOptions.length !== 0"
                    v-model:value="customerId"
                    :options="customerOptions"
                    class="flex flex-col"
                    @change="init(currentPage)"
                  />
                  <p class="text-center my-4">Không có dữ liệu</p>
                </div>
              </template>
              <Iconify icon="mdi:filter" class="cursor-pointer outline-none" width="14px" />
            </a-popover>
            <span class="ml-4">{{ title }}</span>
          </div>
        </template>

        <template v-if="column.key === 'type'">
          <div class="flex items-center">
            <a-popover
              trigger="click"
              placement="bottom"
              overlay-class-name="list-debt-customer-popover"
            >
              <template #content>
                <div class="px-4 py-2">
                  <a-checkbox-group
                    v-model:value="type"
                    :options="debtTypeOptions"
                    class="flex flex-col"
                    @change="init(currentPage)"
                  />
                </div>
              </template>
              <Iconify icon="mdi:filter" class="cursor-pointer outline-none" width="14px" />
            </a-popover>
            <span class="ml-4">{{ title }}</span>
          </div>
        </template>

        <template v-else-if="column.key === 'date'">
          <div class="flex items-center">
            <a-popover trigger="click" placement="bottom">
              <template #content>
                <a-range-picker
                  v-model:value="date"
                  :format="moment.MOMENT_FORMAT.YYYY_MM_DD"
                  :value-format="moment.MOMENT_FORMAT.YYYYMMDD"
                  :input-read-only="true"
                  :placeholder="['Từ ngày', 'đến ngày']"
                  @change="init(currentPage)"
                />
              </template>
              <Iconify icon="mdi:filter" class="cursor-pointer outline-none" width="14px" />
            </a-popover>
            <span class="ml-4">{{ title }}</span>
          </div>
        </template>
      </template>
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'no'">{{ index + 1 }}</template>
        <template v-else-if="column.key === 'date'">{{ moment.dFormat(record.date) }}</template>
        <template v-if="column.key === 'customer'">
          {{ record.customer.name }}
        </template>
        <template v-if="column.key === 'totalPrice'">
          <p class="font-medium mb-1">
            Tổng nhập:
            <span class="font-semibold text-red-500">
              {{ formatCurrency(record.totalImportPrice) }}
            </span>
          </p>
          <p class="font-medium mb-0">
            Tổng xuất:
            <span class="font-semibold text-red-500">
              {{ formatCurrency(record.totalExportPrice) }}
            </span>
          </p>
        </template>
        <template v-if="column.key === 'type'">
          <span v-if="DEBT_TYPE.STEEL === record.type">Tôn - Sắt - Thép</span>
          <span v-if="DEBT_TYPE.SCREW === record.type">Vật liệu</span>
        </template>
        <template v-else-if="column.key === 'lastModified'">
          <div class="mb-1 flex items-center">
            <Iconify icon="mdi:account" />
            <span class="ml-2">{{ record.updatedBy }}</span>
          </div>
          <div class="mb-0 text-base text-gray-600 italic flex items-center">
            <Iconify icon="mdi:clock-time-four" width="13px" />
            <span class="ml-2">{{ moment.mFormat(record.updatedAt) }}</span>
          </div>
        </template>
      </template>
    </a-table>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMoment } from '~/composables'
import { DEBT_TYPE, PAGING } from '~/modules/constant'
import { MENU } from '~/modules/menu'
import { LIST_DEBT_TABLE_COLUMNS } from '~/modules/table'
import { formatCurrency } from '~/modules/utils'
import { useCustomerStore } from '~/stores/customer'
import { useDebtStore } from '~/stores/debt'

const router = useRouter()

// Store
const moment = useMoment()
const debtStore = useDebtStore()
const customerStore = useCustomerStore()

// State
const debtTypeOptions = [
  { label: 'Tôn - Sắt - Thép', value: DEBT_TYPE.STEEL },
  { label: 'Vật liệu', value: DEBT_TYPE.SCREW }
]
const currentPage = ref(PAGING.DEFAULT_PAGE)
const search = ref('')
const date = ref([])
const customerId = ref([])
const type = ref([])
const customerSearch = ref('')

const debts = computed(() => (debtStore.allDebt ? debtStore.allDebt.data : []))
const customerOptions = computed(() =>
  customerStore.allCustomer.map((item) => ({
    label: item.name,
    value: item.id
  }))
)
const selectedCustomer = computed(() =>
  customerStore.allCustomer.filter((item) => customerId.value.includes(item.id))
)
const isFiltering = computed(() => {
  return (
    search.value ||
    (date.value && date.value.length === 2) ||
    customerId.value.length !== 0 ||
    type.value.length !== 0
  )
})

// Methods
const init = async (page = PAGING.DEFAULT_PAGE, pageSize = PAGING.DEFAULT_PAGE_SIZE) => {
  currentPage.value = page

  await debtStore.getAll({
    search: search.value,
    fromDate: date.value && date.value.length === 2 ? date.value[0] : '',
    toDate: date.value && date.value.length === 2 ? date.value[1] : '',
    customerId: customerId.value.join(','),
    type: type.value.join(','),
    page,
    pageSize
  })
}

const reset = () => {
  search.value = ''
  date.value = []
  customerId.value = []
  type.value = []
  customerSearch.value = ''

  init()
}

onMounted(async () => {
  await init(currentPage.value)
  await customerStore.getAll({ search: customerSearch.value })
})
</script>

<style lang="scss">
@import './style.scss';
</style>
