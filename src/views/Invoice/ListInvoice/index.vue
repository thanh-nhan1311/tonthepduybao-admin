<template>
  <section class="list-invoice">
    <heading :title="MENU.INVOICE.name">
      <div class="flex items-center">
        <a-input-search
          v-model:value="filter.search"
          type="number"
          placeholder="Nhập ID hoá đơn để tìm kiếm ..."
          class="mr-4 w-[480px]"
          @keypress.enter="init(currentPage)"
        />

        <a-button type="primary" class="flex items-center" @click="router.push(MENU.ADD_INVOICE.path)">
          <Iconify icon="mdi:plus-circle" width="16px" />
          <span class="ml-2">Tạo hoá đơn</span>
        </a-button>
      </div>
    </heading>

    <div class="grid grid-cols-12 gap-x-8 my-8">
      <div class="col-span-8"></div>
      <!-- <div
        :class="[
          'flex justify-between col-span-8 rounded-md p-4',
          isFiltering && 'border border-solid border-gray-200'
        ]"
      >
        <div v-if="isFiltering">
          <p class="mb-1">Tiêu chí tìm kiếm:</p>
          <div class="mb-0 pl-8">
            <p v-if="filter.search" class="mb-1">
              Nội dung: <span class="font-semibold">{{ filter.search }}</span>
            </p>

            <div class="mb-1">
              <div v-if="filter.date && filter.date.length === 2" class="flex items-center mb-1">
                <Iconify icon="mdi:calendar" class="mr-2" />
                <span>Ngày tạo từ </span>
                <span class="font-semibold mx-2">{{ moment.dFormat(filter.date[0]) }}</span>
                <span>đến</span>
                <span class="font-semibold ml-2">{{ moment.dFormat(filter.date[1]) }}</span>
              </div>
              <div v-if="filter.branchId && filter.branchId.length !== 0" class="flex items-center">
                <Iconify icon="mdi:format-list-bulleted-type" class="mr-2" />
                <span class="mr-2">Chi nhánh:</span>
                <span class="font-semibold">{{ selectedBranch }}</span>
              </div>
            </div>

            <div
              v-if="filter.customerId && filter.customerId.length !== 0"
              class="flex items-center"
            >
              <div class="flex items-center">
                <Iconify icon="mdi:account" class="mr-2" />
                <span class="mr-2">Nhà cung cấp:</span>
                <span class="font-semibold">{{ selectedCustomer }}</span>
              </div>
            </div>
          </div>
        </div>

        <a-button v-if="isFiltering" type="primary" class="w-fit flex items-center" @click="reset">
          <Iconify icon="tabler:zoom-reset" width="16px" />
          <span class="ml-2">Làm mới</span>
        </a-button>
      </div> -->

      <div class="flex items-end justify-end col-span-4">
        <table class="summary-table w-full h-fit">
          <tbody>
            <tr>
              <td class="font-medium">Tổng số</td>
              <td>{{ invoiceStore.allInvoice.totalItems }} hoá đơn</td>
            </tr>
            <tr>
              <td class="font-medium">Tổng giá trị</td>
              <td>{{ formatCurrency(invoiceStore.allInvoiceTotalPrice) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <a-table
      :row-key="(record) => record.id"
      :columns="LIST_INVOICE_TABLE_COLUMNS"
      :scroll="{ x: 'max-content' }"
      :row-selection="rowSelection"
      :pagination="{
        current: currentPage,
        total: invoiceStore.allInvoice.totalItems,
        pageSize: invoiceStore.allInvoice.pageSize,
        onChange: init
      }"
      :data-source="invoices"
      row-class-name="cursor-pointer"
    >
      <template #headerCell="{ title, column }">
        <!-- <template v-if="column.key === 'customer'">
          <div class="flex items-center">
            <a-popover
              trigger="click"
              placement="bottom"
              overlay-class-name="list-debt-customer-popover"
            >
              <template #content>
                <div class="max-h-[320px] overflow-y-auto custom-scroll p-4">
                  <a-input
                    v-model:value="filter.customerSearch"
                    placeholder="Tìm kiếm nhà cung cấp ..."
                    class="w-full mb-4"
                    @keypress.enter="
                      customerStore.getAll({
                        page: 1,
                        pageSize: 1000,
                        search: filter.customerSearch
                      })
                    "
                  />

                  <a-checkbox-group
                    v-if="customerStore.allCustomer.length !== 0"
                    v-model:value="filter.customerId"
                    :options="customerStore.allCustomer.map(item => ({ label: item.name, value: item.id }))"
                    class="flex flex-col"
                    @change="init(currentPage)"
                  />
                  <p v-else class="text-center my-4">Không có dữ liệu</p>
                </div>
              </template>
              <Iconify icon="mdi:filter" class="cursor-pointer outline-none" width="14px" />
            </a-popover>
            <span class="ml-4">{{ title }}</span>
          </div>
        </template> -->

        <!-- <template v-if="column.key === 'branch'">
          <div class="flex items-center">
            <a-popover
              trigger="click"
              placement="bottom"
              overlay-class-name="list-debt-customer-popover"
            >
              <template #content>
                <div class="px-4 py-2">
                  <a-checkbox-group
                    v-model:value="filter.branchId"
                    :options="Object.values(TYPE)"
                    class="flex flex-col"
                    @change="init(currentPage)"
                  />
                </div>
              </template>
              <Iconify icon="mdi:filter" class="cursor-pointer outline-none" width="14px" />
            </a-popover>
            <span class="ml-4">{{ title }}</span>
          </div>
        </template> -->

        <template v-if="column.key === 'date'">
          <div class="flex items-center">
            <a-popover trigger="click" placement="bottom">
              <template #content>
                <a-range-picker
                  v-model:value="filter.date"
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

      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'id'">
          <span class="font-bold">{{ record.id }}</span>
        </template>
        <template v-else-if="column.key === 'date'">{{ moment.dFormat(record.date) }}</template>
        <template v-if="column.key === 'customer'">
          {{ record.customer.name }}
        </template>
        <template v-if="column.key === 'branch'">
          {{ record.branch.name }}
        </template>
        <template v-if="column.key === 'totalPrice'">
          <span class="font-semibold text-red-500">
            {{ formatCurrency(record.totalPrice) }}
          </span>
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
        <template v-else-if="column.key === 'action'">
          <div class="flex items-center">
            <a-button type="link" @click="router.push(MENU.INVOICE_DETAIL.path + record.id)">
              <Iconify icon="mdi:eye" width="24px" />
            </a-button>
            <a-button type="link" @click="router.push(MENU.EDIT_INVOICE.path + record.id)">
              <Iconify icon="mdi:file-document-edit" width="24px" />
            </a-button>
          </div>
        </template>
      </template>
    </a-table>
  </section>
</template>

<script setup>
import { cloneDeep } from 'lodash'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage, useMoment } from '~/composables'
import { CUSTOMER_TYPE_KEY, PAGING } from '~/modules/constant'
import { MENU } from '~/modules/menu'
import { LIST_INVOICE_TABLE_COLUMNS } from '~/modules/table'
import { formatCurrency } from '~/modules/utils'
import { useBranchStore } from '~/stores/branch'
import { useCustomerStore } from '~/stores/customer'
import { useInvoiceStore } from '~/stores/invoice'

const router = useRouter()

// Store
const mc = useMessage()
const moment = useMoment()
const invoiceStore = useInvoiceStore()
const customerStore = useCustomerStore()
const branchStore = useBranchStore()

// State
const initialFilter = {
  search: '',
  date: [],
  customerId: [],
  branchId: []
}
const filter = ref(cloneDeep(initialFilter))
const currentPage = ref(PAGING.DEFAULT_PAGE)
const selectedDebt = ref([])

const rowSelection = ref({
  key: 'id',
  onChange: (selectedRowKeys) => {
    selectedDebt.value = selectedRowKeys
  }
})

const invoices = computed(() => (invoiceStore.allInvoice ? invoiceStore.allInvoice.data : []))
// const selectedCustomer = computed(() =>
//   customerStore.allCustomerOptions.data
//     .filter((item) => filter.value.customerId.includes(item.id))
//     .map((item) => item.name)
//     .join(', ')
// )
// const selectedBranch = computed(() =>
//   branchStore.allBranch
//     .filter((item) => filter.value.type.includes(item.id))
//     .map((item) => item.name)
//     .join(', ')
// )
// const isFiltering = computed(() => {
//   const { search, date, customerId, branchId } = filter.value
//   return search || (date && date.length === 2) || customerId.length !== 0 || branchId.length !== 0
// })

// Methods
const init = async (page = PAGING.DEFAULT_PAGE, pageSize = PAGING.DEFAULT_PAGE_SIZE) => {
  currentPage.value = page

  const { search, date, customerId, branchId } = filter.value
  await invoiceStore.getAll({
    search,
    fromDate: date && date.length === 2 ? date[0] : '',
    toDate: date && date.length === 2 ? date[1] : '',
    customerId: '',
    branchId: '',
    page,
    pageSize
  })
}

// const reset = () => {
//   filter.value = cloneDeep(initialFilter)
//   init()
// }

onMounted(async () => {
  await init(currentPage.value)
  await branchStore.getAll()
  await customerStore.getAllOption({ type: CUSTOMER_TYPE_KEY.CUSTOMER })
})
</script>

<style lang="scss">
@import './style.scss';
</style>
