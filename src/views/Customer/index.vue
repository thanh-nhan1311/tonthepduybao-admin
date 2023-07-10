<template>
  <section>
    <heading :title="title">
      <div class="flex items-center">
        <a-input-search
          ref="refUsername"
          v-model:value="search"
          placeholder="Tìm kiếm ..."
          class="mr-4 w-[400px]"
          @keypress.enter="customerStore.getAll({ search, type })"
        />

        <a-select
          v-model:value="type"
          :options="customerTypeOptions"
          :show-search="true"
          placeholder="Chọn khách hàng"
          class="w-[200px] mr-4"
          @change="customerStore.getAll({ search, type })"
        />

        <a-button type="primary" class="flex items-center" @click="isShowModal = true">
          <Iconify icon="mdi:plus-circle" width="16px" />
          <span class="ml-2">Thêm thông tin</span>
        </a-button>
      </div>
    </heading>

    <a-table
      :columns="CUSTOMER_TABLE_COLUMNS"
      :data-source="customerStore.allCustomerTableData"
      class="mt-8"
    >
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'no'">{{ index + 1 }}</template>
        <template v-else-if="column.key === 'contact'">
          <div class="flex items-center mb-2">
            <Iconify icon="mdi:email" width="16px" />
            <a :href="`mailto:${record.email}`" target="_blank" class="ml-2">{{ record.email }}</a>
          </div>
          <div v-if="record.phone.length !== 0" class="flex items-center">
            <Iconify icon="mdi:phone" width="16px" />
            <div class="flex ml-2">
              <a
                v-for="(item, phoneIndex) in record.phone"
                :key="phoneIndex"
                :href="`tel:${item}`"
                class="underline mr-2"
                target="_blank"
              >
                <span>{{ item }}</span>
                <span v-if="phoneIndex !== record.phone.length - 1">,</span>
              </a>
            </div>
          </div>
        </template>
        <template v-if="column.key === 'type'">
          <span v-if="record.type === CUSTOMER_TYPE.CUSTOMER">Khách hàng</span>
          <span v-if="record.type === CUSTOMER_TYPE.SUPPLIER">Nhà cung cấp</span>
        </template>
        <template v-else-if="column.key === 'action'">
          <div>
            <a-button type="link" @click="openModal(record)"> Sửa </a-button>
            <a-popconfirm
              title="Bạn có chắc muốn xoá khách hàng này không?"
              ok-text="Có"
              cancel-text="Không"
              @confirm="deleteCustomer(record.id)"
            >
              <a-button type="text" danger class="ml-4"> Xoá </a-button>
            </a-popconfirm>
          </div>
        </template>
      </template>
    </a-table>

    <upsert-customer-modal v-if="isShowModal" :customer="selectedCustomer" @close="closeModal" />
  </section>
</template>

<script setup>
import { computed, onMounted, ref, toRef } from 'vue'
import { CUSTOMER_TYPE } from '~/modules/constant'
import { CUSTOMER_TABLE_COLUMNS } from '~/modules/table'
import { useCustomerStore } from '~/stores/customer'

// Store
const customerStore = useCustomerStore()

// State
const customerTypeOptions = [
  { label: 'Chọn tất cả', value: '' },
  { label: 'Khách hàng', value: CUSTOMER_TYPE.CUSTOMER },
  { label: 'Nhà cung cấp', value: CUSTOMER_TYPE.SUPPLIER }
]
const search = toRef(customerStore, 'search')
const type = toRef(customerStore, 'type')
const selectedCustomer = ref(null)
const isShowModal = ref(false)
const title = computed(() => {
  let suffix = 'khách hàng/nhà cung cấp'

  if (type.value === CUSTOMER_TYPE.CUSTOMER) suffix = 'khách hàng'
  else if (type.value === CUSTOMER_TYPE.SUPPLIER) suffix = 'nhà cung cấp'

  return `Danh sách ${suffix}`
})

// Methods
const openModal = (customer) => {
  selectedCustomer.value = customer
  isShowModal.value = true
}
const closeModal = () => {
  selectedCustomer.value = null
  isShowModal.value = false
}
const deleteCustomer = () => {}

// Hooks
onMounted(() => {
  customerStore.getAll()
})
</script>
