<template>
  <section class="add-invoice">
    <heading :title="MENU.EDIT_INVOICE.name" class="items-start">
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
          <span class="ml-2">Cập nhật</span>
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
          <div class="flex items-center justify-between">
            <label for="customerId"><span class="text-red-500">*</span> Khách hàng</label>
            <a-button type="link" size="small" class="px-0" @click="isShowAddCustomerModal = true">
              Thêm khách hàng?
            </a-button>
          </div>
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
              <td>{{ formatCurrency(totalPrice) }}</td>
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

      <div v-if="formErrors.items && formErrors.items.length !== 0" class="mb-1">
        <p v-for="(eItem, index) of formErrors.items" :key="index" class="mb-0 text-red-500 mt-0.5 text-[12px]">{{ eItem.msg }}</p>
      </div>
      <a-table
        :columns="UPSERT_INVOICE_TABLE_COLUMNS"
        :data-source="formState.items"
        :scroll="{ x: 'max-content' }"
        :pagination="false"
        :row-class-name="getTableRowClassName"
        empty-text="Dữ liệu trống"
        :class="[
          'add-invoice__table',
          formState.type && `add-invoice__table--${formState.type.toLowerCase()}`
        ]"
      >
        <template #bodyCell="{ column, record, index }">
          <template v-if="column.key === 'no'">
            <div class="flex items-center h-full"><span class="font-bold">{{ index + 1 }}</span></div>
          </template>
          <template v-if="column.key === 'product'">
            <a-select
              :value="formState.items[index].product.id"
              :options="productStore.allProductOptions.map(item => ({ value: item.id, label: item.name }))"
              placeholder="Chọn sản phẩm"
              class="w-full"
              :show-search="true"
              :filter-option="customFilter"
              @change="(value) => selectProduct(value, index)"
            >
            </a-select>
          </template>
          <template v-if="column.key === 'productQuantity'">
            <div class="flex items-center h-full"><span class="font-bold">
              {{ formState.items[index].product ? formState.items[index].product.quantity : '' }}
            </span></div>
          </template>
          <template v-else-if="column.key === 'quantity'">
            <a-input
              v-model:value="formState.items[index].quantity"
              type="number"
              :min="0"
              :disabled="!formState.items[index].product"
              @change="calPrice"
            />
          </template>
          <template v-else-if="column.key === 'unitPrice'">
            <a-input
              v-model:value="formState.items[index].unitPrice"
              type="number"
              :min="0"
              :disabled="!formState.items[index].product"
              @change="calPrice"
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

    <upsert-customer-modal
      v-if="isShowAddCustomerModal"
      @submit="upsertCustomer"
      @close="isShowAddCustomerModal = false"
    />
  </section>
</template>

<script setup>
import { cloneDeep, isEmpty } from 'lodash'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMessage, useMoment } from '~/composables'
import { CUSTOMER_TYPE_KEY, MSG, NOT_FOUND_PATH } from '~/modules/constant'
import { MENU } from '~/modules/menu'
import { UPSERT_INVOICE_TABLE_COLUMNS } from '~/modules/table'
import { customFilter, formatCurrency } from '~/modules/utils'
import { useBranchStore } from '~/stores/branch'
import { useCommonStore } from '~/stores/common'
import { useCustomerStore } from '~/stores/customer'
import { useInvoiceStore } from '~/stores/invoice'
import { useProductStore } from '~/stores/product'

const route = useRoute()
const router = useRouter()

// Store
const mc = useMessage()
const moment = useMoment()
const commonStore = useCommonStore()
const branchStore = useBranchStore()
const customerStore = useCustomerStore()
const productStore = useProductStore()
const invoiceStore = useInvoiceStore()

const invoice = computed(() => invoiceStore.invoice)

// State
const initFormState = {
  id: null,
  date: '',
  customerId: null,
  branchId: null,
  note: '',
  items: []
}
const productItem = {
  id: null,
  product: null,
  quantity: 0,
  unitPrice: 0,
}
const formState = ref(cloneDeep(initFormState))
const formErrors = ref({})
const totalPrice = ref(0)
const isShowAddCustomerModal = ref(false)

// Methods
const initFormOptions = async () => {
  await branchStore.getAll()
  await customerStore.getAllOption({ type: CUSTOMER_TYPE_KEY.CUSTOMER })
}

const getTableRowClassName = (_record, index) => {
  return formErrors.value.items &&
    formErrors.value.items.length !== 0 &&
    formErrors.value.items.find(item => item.index === index)
    ? 'add-invoice__table--error'
    : ''
}

const addProductItem = async () => {
  if (!formState.value.branchId) {
    mc.error('Vui lòng chọn chi nhánh trước khi thêm sản phẩm')
  } else {
    if (formState.value.items.length === 0 || productStore.allProductOptions.length === 0)
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

const selectProduct = (value, index) => {
  formState.value.items[index].product = productStore.allProductOptions.find(p => p.id === value)
  clearValidate('items', index)
}

const duplicateProductItem = (index) => {
  formState.value.items.push(cloneDeep(formState.value.items[index]))
  calPrice()
}

const calPrice = () => {
  totalPrice.value = formState.value.items
    .map((item) => {
      const up = item.unitPrice ? Number(item.unitPrice) : 0
      const q = item.quantity ? Number(item.quantity) : 0

      return up * q
    })
    .reduce((a, b) => a + b, 0)
}

const clearValidate = (errorName, index = -1) => {
  if (index === -1) delete formErrors.value[errorName]
  else if (formErrors.value.items && formErrors.value.items.length !== 0) {
    formErrors.value.items = formErrors.value.items.filter((eItem) => eItem.index !== index)
    if (formErrors.value.items.length === 0) delete formErrors.value.items
  }
}

const validateItems = () => {
  if (!formState.value.items || isEmpty(formState.value.items) || formState.value.items.length === 0) {
    formErrors.value.items = [{ index: -1, msg: 'Vui lòng thêm sản phẩm cho hoá đơn' }]
  } else {
    delete formErrors.value.items

    formErrors.value.items = formState.value.items
      .map((item, index) => {
        if (!item.product || !item.quantity || !item.unitPrice)
          return { index, msg: `Sản phẩm STT=[${index + 1}] có giá trị không hợp lệ` }
        else {
          if (item.quantity > item.product.quantity)
            return { index, msg: `Số lượng sản phẩm STT=[${index + 1}] vượt quá số lượng tồn kho` }
        }
        return null
      })
      .filter((item) => item !== null)

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
        productId: item.product.id,
        quantity: item.quantity ? Number(item.quantity) : 0,
        unitPrice: item.unitPrice ? Number(item.unitPrice) : 0,
      }
    })

    try {
      // await invoiceStore.create({
      //   date,
      //   branchId,
      //   customerId,
      //   note,
      //   items
      // }) 

      formState.value = cloneDeep(initFormState)
      mc.success(MSG.SAVE_SUCCESS)
      router.push(MENU.INVOICE.path)
    } catch (error) {
      mc.error(MSG.SAVE_FAILED)
    }
  }
}

const upsertCustomer = async (payload) => {
  try {
    await customerStore.upsert(payload)
    await customerStore.getAllOption({ type: CUSTOMER_TYPE_KEY.CUSTOMER })

    isShowAddCustomerModal.value = false
    mc.success(MSG.UPDATE_SUCCESS)
  } catch (error) {
    mc.error(MSG.UPDATE_FAILED)
  }
}

// Hooks
onMounted(async () => {
  const { id } = route.params
  if (!id) router.push(NOT_FOUND_PATH)

  await initFormOptions()
  
  try {
    await invoiceStore.get(id)
    await productStore.getAllOption({ branchId: invoice.value.branch.id })

    // Update breadcrumb
    commonStore.setBreadcrumbs([
      MENU.DEBT,
      { name: MENU.EDIT_INVOICE.name, path: MENU.EDIT_INVOICE.path + invoice.value.id }
    ])

    const items = (invoice.value.invoiceProducts || []).map(item => ({
      id: item.id,
      product: { ...item.product, quantity: item.product.quantity + item.quantity },
      quantity: item.quantity,
      unitPrice: item.unitPrice,
    }))

    formState.value = {
      id: invoice.value.id,
      date: invoice.value.date,
      branchId: invoice.value.branch.id,
      customerId: invoice.value.customer.id,
      note: invoice.value.note,
      items
    }

    calPrice()
  } catch (error) {
    router.push(MENU.INVOICE.path)
  }
})
</script>

<style lang="scss">
@import './style.scss';
</style>
