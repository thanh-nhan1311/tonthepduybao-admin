<template>
  <section class="add-debt">
    <div class="grid grid-cols-12 gap-x-8">
      <div class="col-span-12 mb-6">
        <label for="name"><span class="text-red-500">*</span> Tên công nợ</label>
        <a-input id="name" v-model:value="formState.name" placeholder="Nhập tên công nợ" />
      </div>

      <div class="col-span-3 mb-4">
        <label for="date"><span class="text-red-500">*</span> Ngày thêm công nợ</label>
        <a-date-picker
          id="date"
          v-model:value="formState.date"
          placeholder="Chọn ngày"
          value-format="YYYY-MM-DD"
          class="w-full mt-1"
        />
      </div>

      <div class="col-span-3 mb-4">
        <label for="customerId"><span class="text-red-500">*</span> Khách hàng</label>
        <a-select
          v-model:value="formState.customerId"
          :options="customerOptions"
          :show-search="true"
          placeholder="Chọn khách hàng"
          class="w-full mt-1"
        />
      </div>

      <div class="col-span-4 mb-4">
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
        />
      </div>

      <div class="col-span-2 flex justify-end items-center mt-6">
        <a-button type="primary" ghost class="min-w-[120px] flex items-center" @click="addDebtItem">
          <Iconify icon="mdi:plus-circle" width="28px" />
          <span class="ml-2">Thêm sản phẩm</span>
        </a-button>
        <a-button type="primary" class="w-[120px] ml-4 flex items-center justify-center">
          <Iconify icon="mdi:content-save" />
          <span class="ml-2">Lưu</span>
        </a-button>
      </div>
    </div>

    <div class="flex justify-between my-8">
      <div>
        <b>Bảng công nợ:</b>
        <span class="font-normal ml-2">{{ formState.items.length }} sản phẩm</span>
      </div>
      <table class="add-debt__summary-table">
        <tbody>
          <tr>
            <td>Tổng nhập cây/mét</td>
            <td class="text-red-500">0</td>
          </tr>
          <tr>
            <td>Tổng nhập</td>
            <td class="text-red-500">0</td>
          </tr>
        </tbody>
      </table>
    </div>

    <a-table
      :columns="ADD_DEBT_TABLE_COLUMNS"
      :data-source="formState.items"
      :scroll="{ x: 'max-content' }"
      :pagination="false"
      empty-text="Dữ liệu trống"
      class="add-debt__table"
    >
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'no'">{{ index + 1 }}</template>
        <template v-else-if="column.key === 'name'">
          <a-input v-model:value="formState.items[index].name" />
        </template>
        <template v-else-if="column.key === 'producer'">
          <a-input v-model:value="formState.items[index].producer" />
        </template>
        <template v-else-if="column.key === 'note'">
          <a-input v-model:value="formState.items[index].note" />
        </template>
        <template v-else-if="column.key === 'properties'">
          <a-select
            v-for="(prop, propIndex) of selectedProperties"
            :key="prop.id"
            v-model:value="formState.items[index][`property${prop.id}`]"
            :options="prop.items.map((item) => ({ label: item.name, value: item.id }))"
            :show-search="true"
            :placeholder="`Chọn ${prop.name}`"
            :class="['w-full', propIndex !== 0 && 'mt-2']"
            style="width: 100%"
          />
        </template>
        <template v-else-if="column.key === 'weight'">
          <a-input
            v-model:value="formState.items[index].weight"
            type="number"
            :min="0"
            @change="calAvgProportion(index)"
          />
        </template>
        <template v-else-if="column.key === 'quantity'">
          <a-input
            v-model:value="formState.items[index].quantity"
            type="number"
            :min="0"
            @change="calAvgProportion(index)"
          />
        </template>
        <template v-else-if="column.key === 'unitPrice'">
          <a-input
            v-model:value="formState.items[index].unitPrice"
            type="number"
            :min="0"
            @change="calPrice(index)"
          />
        </template>
        <template v-else-if="column.key === 'action'">
          <a-button type="link" danger @click="deleteDebtItem(index, record)">
            <Iconify icon="mdi:trash-can" width="20px" />
          </a-button>
          <a-button type="link" @click="duplicateDebtItem(index)">
            <Iconify icon="mdi:content-duplicate" width="20px" />
          </a-button>
        </template>
      </template>
    </a-table>
  </section>
</template>

<script setup>
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { Modal } from 'ant-design-vue'
import { createVNode, onMounted, ref } from 'vue'
import { ADD_DEBT_TABLE_COLUMNS } from '~/modules/table'
import { useCustomerStore } from '~/stores/customer'
import { usePropertyStore } from '~/stores/property'
import { cloneDeep } from 'lodash'
import { useMessage } from '~/composables'

// Store
const mc = useMessage()
const propertyStore = usePropertyStore()
const customerStore = useCustomerStore()

// State
const debtItem = {
  name: '',
  producer: '',
  note: '',
  quantity: 0,
  weight: 0,
  avgProportion: 0,
  unitPrice: 0
}
const formState = ref({
  name: '',
  date: '',
  customerId: null,
  propertyIds: [],
  items: []
})
const selectedProperties = ref([])
const totalPrice = ref(0)
const totalUnitPrice = ref(0)
const propertyOptions = ref([])
const customerOptions = ref([])

// Methods
const addDebtItem = () => {
  if (selectedProperties.value.length === 0) {
    mc.error('Vui lòng chọn thuộc tính trước khi thêm công nợ')
  } else {
    const item = cloneDeep(debtItem)
    formState.value.items.push(item)
  }
}
const deleteDebtItem = (index) => {
  formState.value.items.splice(index, 1)
}
const duplicateDebtItem = (index) => {
  formState.value.items.push(formState.value.items[index])
}
const selectProperty = (value) => {
  const property = propertyStore.allProperty.find((item) => item.id === value)
  selectedProperties.value.push(property)
}
const deselectProperty = (value) => {
  Modal.confirm({
    title: 'Xác nhận xoá',
    icon: createVNode(ExclamationCircleOutlined),
    content: `Khi xoá thuộc tính, các thuộc tính của công nợ và sản phẩm cũng sẽ bị xoá theo, bạn có chắc muốn xoá không?`,
    wrapClassName: 'delete-property-confirm-modal',
    okText: 'Có',
    okType: 'primary',
    cancelText: 'Không',
    onOk() {
      selectedProperties.value = selectedProperties.value.filter((item) => item.id !== value)
    },
    onCancel() {
      formState.value.propertyIds.push(value)
    }
  })
}
const calAvgProportion = (index) => {
  const weight = formState.value.items[index].weight
  const quantity = formState.value.items[index].quantity

  formState.value.items[index].avgProportion = quantity > 0 ? (weight / quantity).toFixed(2) : 0
  calPrice(index)
}
const calPrice = (index) => {}

// Hooks
onMounted(async () => {
  await propertyStore.getAll()
  await customerStore.getAll()

  propertyOptions.value = propertyStore.allProperty.map((item) => ({
    value: item.id,
    label: item.name
  }))
  customerOptions.value = customerStore.allCustomer.map((item) => ({
    value: item.id,
    label: item.name
  }))
})
</script>

<style lang="scss">
@import './style.scss';
</style>
