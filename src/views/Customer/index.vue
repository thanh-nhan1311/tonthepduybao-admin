<template>
  <section>
    <heading :title="`Danh sách ${CUSTOMER_TYPE[type].label.toLowerCase()}`">
      <div class="flex items-center">
        <a-input-search
          v-model:value="search"
          placeholder="Tìm kiếm ..."
          class="mr-4 w-[400px]"
          @keypress.enter="init(1)"
        />

        <a-button type="primary" class="flex items-center" @click="isShowModal = true">
          <Iconify icon="mdi:plus-circle" width="16px" />
          <span class="ml-2">Thêm thông tin</span>
        </a-button>
      </div>
    </heading>

    <a-tabs v-model:activeKey="type" class="mt-8" @change="init()">
      <a-tab-pane :key="CUSTOMER_TYPE_KEY.CUSTOMER" :tab="CUSTOMER_TYPE.CUSTOMER.label">
        <customer-table
          @init="(page) => init(page)"
          @edit="(customer) => openModal(customer)"
          @delete="(id) => deleteCustomer(id)"
        />
      </a-tab-pane>
      <a-tab-pane :key="CUSTOMER_TYPE_KEY.SUPPLIER" :tab="CUSTOMER_TYPE.SUPPLIER.label">
        <customer-table
          @init="(page) => init(page)"
          @edit="(customer) => openModal(customer)"
          @delete="(id) => deleteCustomer(id)"
        />
      </a-tab-pane>
    </a-tabs>

    <upsert-customer-modal
      v-if="isShowModal"
      :customer="selectedCustomer"
      @submit="upsertCustomer"
      @close="closeModal"
    />
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useMessage } from '~/composables'
import { CUSTOMER_TYPE, CUSTOMER_TYPE_KEY, MSG, PAGING } from '~/modules/constant'
import { useCustomerStore } from '~/stores/customer'

// Store
const mc = useMessage()
const customerStore = useCustomerStore()

// State
const search = ref('')
const type = ref(CUSTOMER_TYPE_KEY.CUSTOMER)
const selectedCustomer = ref(null)
const isShowModal = ref(false)
const currentPage = ref(PAGING.DEFAULT_PAGE)

// Methods
const init = async (page = PAGING.DEFAULT_PAGE, pageSize = PAGING.DEFAULT_PAGE_SIZE) => {
  currentPage.value = page

  console.log(page)

  await customerStore.getAll({
    search: search.value,
    type: type.value,
    page,
    pageSize
  })
}
const openModal = (customer) => {
  selectedCustomer.value = customer
  isShowModal.value = true
}
const closeModal = () => {
  selectedCustomer.value = null
  isShowModal.value = false
}
const upsertCustomer = async (payload) => {
  try {
    await customerStore.upsert(payload)
    await init(currentPage.value)

    closeModal()
    mc.success(MSG.UPDATE_SUCCESS)
  } catch (error) {
    mc.error(MSG.UPDATE_FAILED)
  }
}

// TODO: delete customer
const deleteCustomer = () => {}

// Hooks
onMounted(async () => {
  await init(currentPage.value)
})
</script>
