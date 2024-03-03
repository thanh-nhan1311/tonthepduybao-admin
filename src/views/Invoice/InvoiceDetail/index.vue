<template>
  <section v-if="invoice" class="invoice-detail">
    <heading :title="`Mã hoá đơn: [${invoice.id}]`">
      <div class="flex items-center">
        <a-button
          type="primary"
          danger
          class="flex items-center px-8"
          @click="isShowConfirm = true"
        >
          <Iconify icon="mdi:trash-can" />
          <span class="ml-2">Xoá</span>
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
        class="grid grid-cols-2 gap-8 col-span-8 border border-solid border-gray-200 rounded-md p-4"
      >
        <div>
          <div class="flex items-center mb-2">
            <Iconify icon="mdi:calendar" class="mr-2" />
            <span class="mr-2">Ngày tạo:</span>
            <span class="font-semibold">{{ moment.dFormat(invoice.date) }}</span>
          </div>

          <div class="flex items-center mb-2">
            <Iconify icon="mdi:format-list-bulleted-type" class="mr-2" />
            <span class="mr-2">Chi nhánh:</span>
            <span class="font-semibold">{{ invoice.branch.name }}</span>
          </div>

          <div class="flex items-center">
            <Iconify icon="mdi:account" class="mr-2" />
            <span class="mr-2">Khách hàng:</span>
            <span class="font-semibold">{{ invoice.customer.name }}</span>
          </div>
        </div>

        <div class="font-medium">
          <div class="flex mb-2">
            <div class="flex">
              <Iconify icon="mdi:calendar" class="mr-2 mt-2" />
              <span class="mr-2">Chỉnh sửa gần đây:</span>
            </div>
            <div class="font-semibold italic">
              {{ moment.mFormat(invoice.updatedAt) }} <br />
              bởi {{ invoice.updatedBy }}
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end col-span-4">
        <table class="summary-table w-full h-full">
          <tbody>
            <tr>
              <td class="font-medium">Tổng giá trị</td>
              <td>{{ formatCurrency(invoice.totalPrice) }}</td>
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
      <a-input-search v-model:value="search" placeholder="Tìm kiếm ..." class="mr-4 w-[400px]" />
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
      v-model:visible="isShowConfirm"
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
const isShowConfirm = ref(false)

const invoice = computed(() => invoiceStore.invoice)
const invoiceProducts = computed(() => {
  const searchParam = normalize(search.value.toLowerCase())
  return invoice.value.invoiceProducts.filter((item) =>
    normalize(item.product.name.toLowerCase()).includes(searchParam)
  )
})

// Methods
const deleteInvoice = async () => {
  try {
    await invoiceStore.delete(invoice.value.id)
    isShowConfirm.value = false

    mc.success(MSG.DELETE_SUCCESS)
    router.push(MENU.INVOICE.path)
  } catch (error) {
    console.log(error);
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
