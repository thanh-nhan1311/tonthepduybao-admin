<template>
  <section class="add-debt">
    <heading :title="MENU.ADD_DEBT_STEEL.name" class="items-start">
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

    <div class="grid grid-cols-12 gap-x-8 mt-2">
      <div class="col-span-12 mb-6">
        <label for="name"><span class="text-red-500">*</span> Tên công nợ</label>
        <a-input
          id="name"
          v-model:value="formState.name"
          placeholder="Nhập tên công nợ"
          :maxlength="500"
          :show-count="true"
          @change="clearValidate('name')"
        />
        <p v-if="formErrors.name" class="mb-0 text-red-500 mt-0.5 text-[12px]">
          {{ formErrors.name }}
        </p>
      </div>

      <div class="col-span-3 mb-4">
        <label for="date"><span class="text-red-500">*</span> Ngày nhập công nợ</label>
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

      <div class="col-span-3 mb-4">
        <label for="customerId"><span class="text-red-500">*</span> Nhà cung cấp</label>
        <a-select
          v-model:value="formState.customerId"
          :options="customerOptions"
          :show-search="true"
          placeholder="Chọn nhà cung cấp"
          class="w-full mt-1"
          @change="clearValidate('customerId')"
        />
        <p v-if="formErrors.customerId" class="mb-0 text-red-500 mt-0.5 text-[12px]">
          {{ formErrors.customerId }}
        </p>
      </div>

      <div class="col-span-3 mb-4">
        <label for="propertyIds"><span class="text-red-500">*</span> Thuộc tính</label>
        <a-select
          id="propertyIds"
          v-model:value="formState.propertyIds"
          :options="propertyOptions"
          placeholder="Chọn thuộc tính"
          max-tag-count="responsive"
          class="w-full mt-1"
          mode="multiple"
          @select="selectProperty"
          @deselect="deselectProperty"
          @change="clearValidate('propertyIds')"
        />
        <p v-if="formErrors.propertyIds" class="mb-0 text-red-500 mt-0.5 text-[12px]">
          {{ formErrors.propertyIds }}
        </p>
      </div>

      <div class="col-span-3 flex justify-end pt-[24px]">
        <a-button type="primary" ghost @click="initFormOptions">
          <Iconify icon="bx:reset" width="16px" />
          <span class="ml-2">Làm mới</span>
        </a-button>
        <a-button
          type="primary"
          ghost
          class="min-w-[120px] flex items-center ml-4"
          @click="addDebtItem"
        >
          <Iconify icon="mdi:plus-circle" width="16px" />
          <span class="ml-2">Thêm sản phẩm</span>
        </a-button>
      </div>
    </div>

    <div class="flex justify-between my-8">
      <div>
        <b>Bảng công nợ:</b>
        <span class="font-normal ml-2">{{ formState.items.length }} sản phẩm</span>

        <p v-if="formErrors.tableItems" class="mb-0 text-red-500 mt-0.5 text-[12px]">
          {{ formErrors.tableItems }}
        </p>
        <p
          v-if="formErrors.items && formErrors.items.length !== 0"
          class="mb-0 text-red-500 mt-0.5 text-[12px]"
        >
          Một trong số các trường bắt buộc của sản phẩm chưa được nhập
        </p>
      </div>
      <table class="summary-table">
        <tbody>
          <tr>
            <td>Tổng nhập cây/mét</td>
            <td>{{ formatCurrency(totalUnitPrice) }}</td>
          </tr>
          <tr>
            <td>Tổng nhập</td>
            <td>{{ formatCurrency(totalPrice) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <a-table
      :columns="ADD_DEBT_STEEL_TABLE_COLUMNS"
      :data-source="formState.items"
      :scroll="{ x: 'max-content' }"
      :pagination="false"
      :row-class-name="getTableRowClassName"
      empty-text="Dữ liệu trống"
      class="add-debt__table"
    >
      <template #headerCell="{ title, column }">
        <template v-if="['name', 'weight', 'quantity', 'unitPrice'].includes(column.key)">
          <span class="text-red-500"> * </span>
          {{ title }}
        </template>
      </template>

      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'name'">
          <div class="flex items-center">
            <span class="mr-4">{{ index + 1 }}.</span>
            <a-input
              v-model:value="formState.items[index].name"
              @change="clearValidate('items', index)"
            />
          </div>
        </template>
        <template v-else-if="column.key === 'note'">
          <a-input v-model:value="formState.items[index].note" />
        </template>
        <template v-else-if="column.key === 'properties'">
          <a-select
            v-for="(prop, propIndex) of selectedProperties"
            :key="prop.id"
            v-model:value="formState.items[index].properties[prop.id]"
            :options="prop.items.map((item) => ({ label: item.name, value: item.id }))"
            :allow-clear="true"
            :show-search="true"
            :placeholder="`Chọn ${prop.name}`"
            :class="['w-full', propIndex !== 0 && 'mt-2']"
          />
        </template>
        <template v-else-if="column.key === 'weight'">
          <a-input
            v-model:value="formState.items[index].weight"
            type="number"
            :min="0"
            @change="onChangeAvgProportion(index)"
          />
        </template>
        <template v-else-if="column.key === 'quantity'">
          <a-input
            v-model:value="formState.items[index].quantity"
            type="number"
            :min="0"
            @change="onChangeAvgProportion(index)"
          />
        </template>
        <template v-else-if="column.key === 'unitPrice'">
          <a-input
            v-model:value="formState.items[index].unitPrice"
            type="number"
            :min="0"
            @change="onChangeUnitPrice(index)"
          />
        </template>
        <template v-else-if="column.key === 'totalUnitPrice'">
          <span class="font-medium text-red-400">{{ formatCurrency(record.totalUnitPrice) }}</span>
        </template>
        <template v-else-if="column.key === 'action'">
          <div class="flex items-center">
            <a-button type="link" danger @click="deleteDebtItem(index, record)">
              <Iconify icon="mdi:trash-can" width="20px" />
            </a-button>
            <a-button type="link" @click="duplicateDebtItem(index)">
              <Iconify icon="mdi:content-duplicate" width="20px" />
            </a-button>
          </div>
        </template>
      </template>
    </a-table>
  </section>
</template>

<script setup>
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { Modal } from 'ant-design-vue'
import { computed, createVNode, onBeforeMount, onMounted, ref } from 'vue'
import { ADD_DEBT_STEEL_TABLE_COLUMNS } from '~/modules/table'
import { useCustomerStore } from '~/stores/customer'
import { usePropertyStore } from '~/stores/property'
import { useDebtStore } from '~/stores/debt'
import { isEmpty, cloneDeep } from 'lodash'
import { useMessage, useMoment } from '~/composables'
import { CUSTOMER_TYPE, DEBT_TYPE, MSG } from '~/modules/constant'
import { formatCurrency } from '~/modules/utils'
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import { MENU } from '~/modules/menu'

const router = useRouter()

// Store
const mc = useMessage()
const moment = useMoment()
const debtStore = useDebtStore()
const propertyStore = usePropertyStore()
const customerStore = useCustomerStore()

// State
const debtItem = {
  name: '',
  note: '',
  quantity: 0,
  weight: 0,
  avgProportion: 0,
  unitPrice: 0,
  totalUnitPrice: 0,
  properties: {} // dynamic property
}
const formState = ref({
  name: '',
  date: '',
  customerId: null,
  propertyIds: [],
  items: []
})
const formErrors = ref({})
const selectedProperties = ref([])
const totalPrice = ref(0)
const totalUnitPrice = ref(0)
const propertyOptions = ref([])
const customerOptions = ref([])

const isFormChange = computed(() => {
  const { name, date, customerId, propertyIds, items } = formState.value
  return (
    name !== '' ||
    date !== '' ||
    customerId !== null ||
    propertyIds.length !== 0 ||
    items.length !== 0
  )
})

// Methods
const initFormOptions = async () => {
  await propertyStore.getAll()
  await customerStore.getAll({ search: '', type: CUSTOMER_TYPE.SUPPLIER })

  propertyOptions.value = propertyStore.allProperty.map((item) => ({
    value: item.id,
    label: item.name
  }))
  customerOptions.value = customerStore.allCustomer.map((item) => ({
    value: item.id,
    label: item.name
  }))
}

const getTableRowClassName = (_record, index) => {
  return formErrors.value.items &&
    formErrors.value.items.length !== 0 &&
    formErrors.value.items.includes(index)
    ? 'add-debt__table--error'
    : ''
}

const addDebtItem = () => {
  if (selectedProperties.value.length === 0) {
    mc.error('Vui lòng chọn thuộc tính trước khi thêm công nợ')
  } else {
    const item = cloneDeep(debtItem)
    formState.value.items.push(item)

    clearValidate('tableItems')
  }
}

const deleteDebtItem = (index) => {
  formState.value.items.splice(index, 1)

  validateItems()
  calPrice()
}

const duplicateDebtItem = (index) => {
  formState.value.items.push(cloneDeep(formState.value.items[index]))
  calPrice()
}

const selectProperty = (propId) => {
  const property = propertyStore.allProperty.find((item) => item.id === propId)
  selectedProperties.value.push(property)
}

const deselectProperty = (propId) => {
  Modal.confirm({
    title: 'Xác nhận xoá',
    icon: createVNode(ExclamationCircleOutlined),
    content: `Khi xoá thuộc tính, các thuộc tính của sản phẩm cũng sẽ bị xoá theo, bạn có chắc muốn xoá không?`,
    wrapClassName: 'delete-property-confirm-modal',
    okText: 'Có',
    okType: 'primary',
    cancelText: 'Không',
    onOk() {
      // Delete selected property
      selectedProperties.value = selectedProperties.value.filter((item) => item.id !== propId)

      // Delete selected property field in [items]
      formState.value.items = formState.value.items.map((item) => {
        delete item.properties[propId]
        return item
      })
    },
    onCancel() {
      formState.value.propertyIds.push(propId)
    }
  })
}

const onChangeUnitPrice = (index) => {
  const { avgProportion, unitPrice } = formState.value.items[index]
  formState.value.items[index].totalUnitPrice = avgProportion * unitPrice

  calPrice()
  clearValidate('items', index)
}

const onChangeAvgProportion = (index) => {
  const { weight, quantity } = formState.value.items[index]
  formState.value.items[index].avgProportion = quantity > 0 ? (weight / quantity).toFixed(2) : 0

  onChangeUnitPrice(index)
}

const calPrice = () => {
  totalUnitPrice.value = formState.value.items
    .map((item) => item.avgProportion * item.unitPrice)
    .reduce((a, b) => a + b, 0)

  totalPrice.value = formState.value.items
    .map((item) => item.weight * item.unitPrice)
    .reduce((a, b) => a + b, 0)
}

const clearValidate = (errorName, index = -1) => {
  if (index === -1) delete formErrors.value[errorName]
  else if (formErrors.value.items && formErrors.value.items.length !== 0) {
    formErrors.value.items = formErrors.value.items.filter((itemIndex) => itemIndex !== index)
    if (formErrors.value.items.length === 0) delete formErrors.value.items
  }
}

const validateItems = () => {
  const { items } = formState.value

  if (!items || items.length === 0) {
    formErrors.value.tableItems = 'Vui lòng thêm sản phẩm cho công nợ'
    delete formErrors.value.items
  } else {
    delete formErrors.value.tableItems

    formErrors.value.items = items
      .map((item, index) => {
        if (!item.name.trim() || !item.weight || !item.quantity || !item.unitPrice) return index
        return -1
      })
      .filter((itemIndex) => itemIndex !== -1)

    if (formErrors.value.items.length === 0) clearValidate('items')
  }
}

const validate = () => {
  const { name, date, customerId, propertyIds } = formState.value

  if (!name.trim()) formErrors.value.name = 'Tên công nợ là trường băt buộc'
  else clearValidate('name')

  if (!date) formErrors.value.date = 'Ngày nhập công nợ là trường băt buộc'
  else clearValidate('date')

  if (!customerId) formErrors.value.customerId = 'Nhà cung cấp là trường băt buộc'
  else clearValidate('customerId')

  if (!propertyIds || propertyIds.length === 0)
    formErrors.value.propertyIds = 'Thuộc tính là trường băt buộc'
  else clearValidate('propertyIds')

  validateItems()

  return isEmpty(formErrors.value)
}

const submit = async () => {
  const isValid = validate()

  if (isValid) {
    const { name, date, customerId, propertyIds } = formState.value

    const items = cloneDeep(formState.value.items).map((item) => {
      return {
        name: item.name.trim(),
        note: item.note.trim(),
        properties: item.properties,
        weight: item.weight,
        quantity: item.quantity,
        unitPrice: item.unitPrice
      }
    })

    try {
      await debtStore.create({
        name: name.trim(),
        date,
        customerId,
        propertyIds,
        type: DEBT_TYPE.STEEL,
        items
      })
      mc.success(MSG.SAVE_SUCCESS)
      router.push(MENU.DEBT.path)
    } catch (error) {
      mc.error(MSG.SAVE_FAILED)
    }
  }
}

// Hooks
onMounted(async () => {
  await initFormOptions()

  window.onbeforeunload = function () {
    return MSG.PAGE_RELOAD_CONFIRMATION
  }
})

onBeforeMount(() => {
  window.onbeforeunload = null
})

onBeforeRouteLeave((to, from, next) => {
  if (isFormChange.value) {
    if (confirm('Bạn có chắc muốn rời khỏi trang này không?')) next()
    else next(false)
  } else next()
})

window.be
</script>

<style lang="scss">
@import './style.scss';
</style>
