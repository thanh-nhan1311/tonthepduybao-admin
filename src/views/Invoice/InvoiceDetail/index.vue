<template>
  <section v-if="invoice" class="invoice-detail">
    <heading 
      :title="`Mã hoá đơn: [${invoice.id}] - ${moment.dFormat(invoice.date)}`"
      :sub-title="`Chỉnh sửa gần đây ${moment.mFormat(invoice.updatedAt)} bởi ${invoice.updatedBy}`"
    >
      <div class="flex items-center">
        <a-button
          type="primary"
          danger
          class="flex items-center px-8"
          @click="isShowConfirmModal = true"
        >
          <Iconify icon="mdi:trash-can" />
          <span class="ml-2">Xoá</span>
        </a-button>

        <a-button
          type="primary"
          class="flex items-center px-8 ml-4"
          @click="togglePrintInvoice(invoice)"
        >
          <Iconify icon="mdi:printer" />
          <span class="ml-2">In hoá đơn</span>
        </a-button>

        <a-button
          type="primary"
          class="flex items-center px-8 ml-4"
          @click="router.push(MENU.EDIT_INVOICE.path + invoice.id)"
        >
          <Iconify icon="mdi:pencil-box-outline" />
          <span class="ml-2">Sửa</span>
        </a-button>
      </div>
    </heading>

    <div class="grid grid-cols-12 gap-x-8 mt-8">
      <div
        class="grid grid-cols-12 gap-8 col-span-8 border border-solid border-gray-200 rounded-md p-4"
      >
        <div class="col-span-5 space-y-3">
          <div class="flex items-center">
            <Iconify icon="mdi:calendar" class="mr-2" />
            <span class="mr-2">Ngày tạo:</span>
            <span class="font-semibold">{{ moment.dFormat(invoice.date) }}</span>
          </div>

          <div class="flex items-center">
            <Iconify icon="mdi:format-list-bulleted-type" class="mr-2" />
            <span class="mr-2">Chi nhánh:</span>
            <span class="font-semibold">{{ invoice.branch.name }}</span>
          </div>
        </div>

        <div class="col-span-7 space-y-3">
          <div class="flex items-center">
            <Iconify icon="mdi:account" class="mr-2" />
            <span class="mr-2">Khách hàng:</span>
            <span class="font-semibold">{{ invoice.customer.name }}</span>
          </div>

          <div class="flex flex-col">
            <div class="flex items-center">
              <Iconify icon="mdi:address-marker" class="mr-2" />
              <span class="mr-2">Địa chỉ giao hàng:</span>
            </div>
            <ul class="m-0 pl-7 list-none">
              <li>- <span class="font-semibold">Tên:</span> {{ invoice.shippingAddress.name }}</li>
              <li>- <span class="font-semibold">Số ĐT:</span> {{ invoice.shippingAddress.phone }}</li>
              <li>- <span class="font-semibold">Địa chỉ:</span> {{ invoice.shippingAddress.address }}</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="flex justify-end col-span-4">
        <table class="summary-table w-full h-full">
          <tbody>
            <tr>
              <td class="font-medium text-4xl">Tổng giá trị</td>
              <td class="text-4xl font-bold">{{ formatCurrency(invoice.totalPrice) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="flex justify-between mt-8 mb-4">
      <div>
        <b>Danh sách sản phẩm:</b>
        <span class="font-normal ml-2">{{ invoiceProducts.length }} sản phẩm</span>
      </div>
      <a-input-search :value="search" @update:value="search = $event" placeholder="Tìm kiếm ..." class="mr-4 w-[400px]" />
    </div>

    <a-table
      :columns="INVOICE_PRODUCTS_TABLE_COLUMNS"
      :data-source="invoiceProducts"
      :scroll="{ x: 'max-content' }"
      :pagination="false"
    >
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'no'">{{ index + 1 }}</template>
        <template v-else-if="column.key === 'product'">
          <span class="font-medium">{{ record.product.name }}</span>
        </template>
        <template v-else-if="column.key === 'quantity'">{{ record.quantity }}</template>
        <template v-else-if="column.key === 'unitPrice'">
          {{ formatCurrency(record.unitPrice) }}
        </template>
        <template v-else-if="column.key === 'totalPrice'">
          <span class="font-medium text-red-400">{{ formatCurrency(record.unitPrice * record.quantity) }}</span>
        </template>
      </template>
    </a-table>

    <a-modal
      :visible="isShowConfirmModal"
      @update:visible="val => isShowConfirmModal = val"
      ok-text="Có"
      cancel-text="Không"
      :centered="true"
      :ok-button-props="{
        type: 'primary',
        danger: true,
        class: 'px-10'
      }"
      @ok="deleteInvoice"
    >
      <div class="flex items-center">
        <Iconify icon="ph:warning-fill" class="text-red-500 mr-4" width="20px" />
        <span>Bạn có chắc muốn xoá hoá đơn này không?</span>
      </div>
    </a-modal>

    <print-invoice-modal :invoice="selectedInvoice" @close="togglePrintInvoice(undefined)" />
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMessage, useMoment } from '~/composables'
import { MSG, NOT_FOUND_PATH } from '~/modules/constant'
import { MENU } from '~/modules/menu'
import { INVOICE_PRODUCTS_TABLE_COLUMNS } from '~/modules/table'
import { formatCurrency, normalize } from '~/modules/utils'
import { useCommonStore } from '~/stores/common'
import { useInvoiceStore } from '~/stores/invoice'

const route = useRoute()
const router = useRouter()

// Store
const mc = useMessage()
const moment = useMoment()
const commonStore = useCommonStore()
const invoiceStore = useInvoiceStore()

// State
const search = ref('')
const isShowConfirmModal = ref(false)
const selectedInvoice = ref(undefined)

const invoice = computed(() => invoiceStore.invoice)
const invoiceProducts = computed(() => {
  const searchParam = normalize(search.value.toLowerCase())
  return invoice.value.invoiceProducts.filter((item) =>
    normalize(item.product.name.toLowerCase()).includes(searchParam)
  )
})

// Methods
const togglePrintInvoice = (value) => {
  selectedInvoice.value = value
}

const deleteInvoice = async () => {
  try {
    await invoiceStore.delete(invoice.value.id)
    isShowConfirmModal.value = false

    mc.success(MSG.DELETE_SUCCESS)
    router.push(MENU.INVOICE.path)
  } catch (error) {
    mc.error(MSG.DELETE_FAILED)
  }
}

// Hooks
onMounted(async () => {
  const { id } = route.params
  if (!id) router.push(NOT_FOUND_PATH)

  try {
    await invoiceStore.get(id)

    commonStore.setBreadcrumbs([
      MENU.INVOICE,
      { name: invoice.value.id, path: MENU.INVOICE_DETAIL.path + invoice.value.id }
    ])
  } catch (error) {
    router.push(MENU.INVOICE.path)
  }
})

onUnmounted(() => {
  commonStore.setBreadcrumbs([])
})
</script>

<style lang="scss">
@import './style.scss';
</style>
