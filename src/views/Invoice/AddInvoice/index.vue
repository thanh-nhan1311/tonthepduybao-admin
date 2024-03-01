<template>
  <section class="add-debt">
    <heading :title="MENU.ADD_INVOICE.name" class="items-start">
      <div class="flex items-center mb-4">
        <a-button
          type="default"
          class="w-[120px] flex items-center justify-center"
          @click="router.back()"
        >
          Huỷ bỏ
        </a-button>

        <a-button
          type="primary"
          class="w-[120px] ml-4 mr-0 flex items-center justify-center"
          @click="submit"
        >
          <Iconify icon="mdi:content-save" />
          <span class="ml-2">Tạo</span>
        </a-button>
      </div>
    </heading>

    <p class="text-right italic mb-0 mt-2 text-xl text-red-500">(*) Là các trường bắt buộc</p>

    <div class="w-9/12 mx-auto">
      <div class="grid grid-cols-12 gap-x-8 mt-2 mb-4">
        <div class="col-span-4">
          <label for="date"><span class="text-red-500">*</span> Ngày nhập hoá đơn</label>
          <a-date-picker
            id="date"
            v-model:value="formState.date"
            placeholder="Chọn ngày"
            :format="moment.MOMENT_FORMAT.YYYY_MM_DD"
            :value-format="moment.MOMENT_FORMAT.YYYYMMDD"
            class="w-full mt-1"
            @change="clearValidate('date')"
          />
          <p v-if="formErrors.date" class="mb-0 text-red-500 mt-0.5 text-[12px]">
            {{ formErrors.date }}
          </p>
        </div>

        <div class="col-span-4">
          <label for="customerId"><span class="text-red-500">*</span> Khách hàng</label>
          <a-select
            v-model:value="formState.customerId"
            :options="customerStore.customerOptions"
            :filter-option="customFilter"
            :show-search="true"
            placeholder="Chọn khách hàng"
            class="w-full mt-1"
            @change="clearValidate('customerId')"
          />
          <p v-if="formErrors.customerId" class="mb-0 text-red-500 mt-0.5 text-[12px]">
            {{ formErrors.customerId }}
          </p>
        </div>

        <div class="col-span-4">
          <label for="branchId"><span class="text-red-500">*</span> Chi nhánh</label>
          <a-select
            v-model:value="formState.branchId"
            :options="branchStore.branchOptions"
            placeholder="Chọn chi nhánh"
            class="w-full"
            @change="clearValidate('branchId')"
          />
          <p v-if="formErrors.branchId" class="mb-0 text-red-500 mt-0.5 text-[12px]">
            {{ formErrors.branchId }}
          </p>
        </div>
      </div>

      <div class="mt-2 mb-8">
        <label for="id">Ghi chú </label>
        <a-textarea
          v-model:value="formState.note"
          placeholder="Nhập ghi chú"
          @change="clearValidate('note')"
        />
        <p v-if="formErrors.note" class="mb-0 text-red-500 mt-0.5 text-[12px]">
          {{ formErrors.note }}
        </p>
      </div>

      <div class="flex justify-between mb-4">
        <table class="summary-table">
          <tbody>
            <tr>
              <td>Tổng giá trị hoá đơn</td>
              <td>{{ formatCurrency(0) }}</td>
            </tr>
          </tbody>
        </table>
        
        <div class="flex items-center">
          <a-button type="primary" ghost class="flex items-center" @click="initFormOptions">
            <Iconify icon="bx:reset" width="16px" />
            <span class="ml-2">Làm mới</span>
          </a-button>
          <a-button
            type="primary"
            ghost
            class="min-w-[120px] flex items-center ml-4"
            @click="addProductItem"
          >
            <Iconify icon="mdi:plus-circle" width="16px" />
            <span class="ml-2">Thêm sản phẩm</span>
          </a-button>
        </div>
      </div>

      <a-table
        :columns="UPSERT_INVOICE_TABLE_COLUMNS"
        :data-source="formState.items"
        :scroll="{ x: 'max-content' }"
        :pagination="false"
        :row-class-name="getTableRowClassName"
        empty-text="Dữ liệu trống"
        :class="[
          'add-debt__table',
          formState.type && `add-debt__table--${formState.type.toLowerCase()}`
        ]"
      >
        <template #bodyCell="{ column, record, index }">
          <template v-if="column.key === 'productId'">
            <a-select
              v-model:value="formState.items[index].productId"
              :options="productStore.allProductOptions.map(item => ({ value: item.id, label: item.name }))"
              placeholder="Chọn sản phẩm"
              class="w-full"
              :show-search="true"
              :filter-option="customFilter"
              @change="clearValidate('items', index)"
            />
          </template>
          <template v-else-if="column.key === 'quantity'">
            <a-input
              v-model:value="formState.items[index].quantity"
              type="number"
              :min="0"
            />
          </template>
          <template v-else-if="column.key === 'unitPrice'">
            <a-input
              v-model:value="formState.items[index].unitPrice"
              type="number"
              :min="0"
            />
          </template>
          
          <template v-else-if="column.key === 'action'">
            <div class="flex items-center">
              <a-button type="link" danger @click="deleteProductItem(index, record)">
                <Iconify icon="mdi:trash-can" width="20px" />
              </a-button>
              <a-button type="link" @click="duplicateProductItem(index)">
                <Iconify icon="mdi:content-duplicate" width="20px" />
              </a-button>
            </div>
          </template>
        </template>
      </a-table>
    </div>
  </section>
</template>

<script setup>
import { cloneDeep, isEmpty } from 'lodash'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage, useMoment } from '~/composables'
import { CUSTOMER_TYPE_KEY, MSG } from '~/modules/constant'
import { MENU } from '~/modules/menu'
import { UPSERT_INVOICE_TABLE_COLUMNS } from '~/modules/table'
import { customFilter, formatCurrency } from '~/modules/utils'
import { useBranchStore } from '~/stores/branch'
import { useCustomerStore } from '~/stores/customer'
import { useInvoiceStore } from '~/stores/invoice'
import { useProductStore } from '~/stores/product'

const router = useRouter()

// Store
const mc = useMessage()
const moment = useMoment()
const branchStore = useBranchStore()
const customerStore = useCustomerStore()
const productStore = useProductStore()
const invoiceStore = useInvoiceStore()

// State
const initFormState = {
  date: '',
  customerId: null,
  branchId: null,
  note: '',
  items: []
}
const productItem = {
  productId: null,
  quantity: 0,
  unitPrice: 0,
}
const formState = ref(cloneDeep(initFormState))
const formErrors = ref({})
const totalPrice = ref(0)
const totalUnitPrice = ref(0)

// Methods
const initFormOptions = async () => {
  await branchStore.getAll()
  await customerStore.getAllOption({ type: CUSTOMER_TYPE_KEY.CUSTOMER })
}

const getTableRowClassName = (_record, index) => {
  return formErrors.value.items &&
    formErrors.value.items.length !== 0 &&
    formErrors.value.items.includes(index)
    ? 'add-debt__table--error'
    : ''
}

const addProductItem = async () => {
  if (!formState.value.branchId) {
    mc.error('Vui lòng chọn chi nhánh trước khi thêm sản phẩm')
  } else {
    if (productStore.allProductOptions.length === 0)
      await productStore.getAllOption({ branchId: formState.value.branchId })

    const item = cloneDeep(productItem)
    formState.value.items.push(item)

    clearValidate('items')
  }
}

const deleteProductItem = (index) => {
  formState.value.items.splice(index, 1)

  validateItems()
  calPrice()
}

const duplicateProductItem = (index) => {
  formState.value.items.push(cloneDeep(formState.value.items[index]))
  calPrice()
}

const calPrice = () => {
  totalUnitPrice.value = formState.value.items
    .map((item) => item.totalUnitPrice)
    .reduce((a, b) => a + b, 0)

  totalPrice.value = formState.value.items.map((item) => item.totalPrice).reduce((a, b) => a + b, 0)
}

const clearValidate = (errorName, index = -1) => {
  if (index === -1) delete formErrors.value[errorName]
  else if (formErrors.value.items && formErrors.value.items.length !== 0) {
    formErrors.value.items = formErrors.value.items.filter((itemIndex) => itemIndex !== index)
    if (formErrors.value.items.length === 0) delete formErrors.value.items
  }
}

const validateItems = () => {
  if (!formState.value.items || Object.values(formState.value.items).length === 0 || formState.value.items.length === 0) {
    formErrors.value.items = 'Vui lòng thêm sản phẩm cho hoá đơn'
    delete formErrors.value.items
  } else {
    delete formErrors.value.items

    formErrors.value.items = formState.value.items
      .map((item, index) => {
        if (!item.productId || !item.quantity || !item.unitPrice) return index
        return -1
      })
      .filter((itemIndex) => itemIndex !== -1)

    if (formErrors.value.items.length === 0) clearValidate('items')
  }
}

const validate = () => {
  const { date, branchId, customerId } = formState.value

  if (!date) formErrors.value.date = 'Ngày nhập hoá đơn là trường băt buộc'
  else clearValidate('date')

  if (!customerId) formErrors.value.customerId = 'Nhà cung cấp là trường băt buộc'
  else clearValidate('customerId')

  if (!branchId) formErrors.value.branchId = 'Chi nhánh là trường băt buộc'
  else clearValidate('branchId')

  validateItems()

  return isEmpty(formErrors.value)
}

const submit = async () => {
  const isValid = validate()

  if (isValid) {
    const { date, branchId, customerId, note } = formState.value

    const items = cloneDeep(formState.value.items).map((item) => {
      return {
        productId: item.productId,
        quantity: item.quantity ? Number(item.quantity) : 0,
        unitPrice: item.unitPrice ? Number(item.unitPrice) : 0,
      }
    })

    try {
      await invoiceStore.create({
        date,
        branchId,
        customerId,
        note,
        items
      })

      formState.value = cloneDeep(initFormState)
      mc.success(MSG.SAVE_SUCCESS)
      router.push(MENU.INVOICE.path)
    } catch (error) {
      mc.error(MSG.SAVE_FAILED)
    }
  }
}

// Hooks
onMounted(async () => {
  await initFormOptions()
})
</script>

<style lang="scss">
@import './style.scss';
</style>
