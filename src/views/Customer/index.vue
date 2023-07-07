<template>
  <section>
    <heading title="Danh sách khách hàng">
      <div class="flex items-center">
        <a-input
          ref="refUsername"
          v-model:value="search"
          placeholder="Tìm kiếm khách hàng"
          class="mr-4 w-[400px]"
          @keypress.enter="customerStore.search({ search })"
        >
          <template #prefix>
            <Iconify icon="ic:outline-search" @click="customerStore.search({ search })" />
          </template>
        </a-input>

        <a-button type="primary" @click="isShowModal = true">Thêm khách hàng</a-button>
      </div>
    </heading>

    <a-table :columns="CUSTOMER_TABLE_COLUMNS" :data-source="customerStore.allCustomerTableData">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'phone'">
          <div class="grid grid-cols-1 gap-y-2">
            <a-tag v-for="(item, index) in record.phone" :key="index" color="blue" class="w-fit">
              <a :href="`tel:${item}`" target="_blank">{{ item }}</a>
            </a-tag>
          </div>
        </template>
        <template v-else-if="column.key === 'email'">
          <a :href="`mailto:${record.email}`" target="_blank">{{ record.email }}</a>
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
import { onMounted, ref } from 'vue'
import { CUSTOMER_TABLE_COLUMNS } from '~/modules/table'
import { useCustomerStore } from '~/stores/customer'

// Store
const customerStore = useCustomerStore()

// State
const search = ref('')
const selectedCustomer = ref(null)
const isShowModal = ref(false)

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
  customerStore.search({ search: '' })
})
</script>
