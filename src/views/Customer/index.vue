<template>
  <section>
    <heading :title="`Danh sách ${type === 'DELETED' ? 'bị xoá' : CUSTOMER_TYPE[type].label.toLowerCase()}`">
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

    <a-tabs v-model:activeKey="type" class="mt-8" @change="activeKey => init(activeKey)">
      <a-tab-pane :key="CUSTOMER_TYPE_KEY.CUSTOMER" :tab="`${CUSTOMER_TYPE.CUSTOMER.label} (${allCustomer.data.totalCustomer})`">
        <customer-table
          :data="customerStore.allCustomerTableData"
          :total="allCustomer.totalElements"
          :page-size="allCustomer.pageSize"
          :is-delete="authStore.isAdmin"
          @init="(page) => init(type, page)"
          @edit="(customer) => openModal(customer)"
          @delete="(id) => deleteCustomer(id)"
        />
      </a-tab-pane>
      <a-tab-pane :key="CUSTOMER_TYPE_KEY.SUPPLIER" :tab="`${CUSTOMER_TYPE.SUPPLIER.label} (${allCustomer.data.totalSupplier})`">
        <customer-table
          :data="customerStore.allCustomerTableData"
          :total="allCustomer.totalElements"
          :page-size="allCustomer.pageSize"
          :is-delete="authStore.isAdmin"
          @init="(page) => init(type, page)"
          @edit="(customer) => openModal(customer)"
          @delete="(id) => deleteCustomer(id)"
        />
      </a-tab-pane>
      <a-tab-pane key="DELETED" :tab="`Đã xoá (${allCustomer.data.totalDeleted})`">
        <customer-table
          :data="customerStore.allCustomerTableData"
          :total="allCustomer.totalElements"
          :page-size="allCustomer.pageSize"
          :is-undelete="true"
          @init="(page) => init(type, page)"
          @edit="(customer) => openModal(customer)"
          @undelete="(id) => undeleteCustomer(id)"
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
import { computed, onMounted, ref } from 'vue'
import { useMessage } from '~/composables'
import { CUSTOMER_TYPE, CUSTOMER_TYPE_KEY, MSG, PAGING } from '~/modules/constant'
import { useAuthStore } from '~/stores/auth'
import { useCustomerStore } from '~/stores/customer'

// Store
const mc = useMessage()
const authStore = useAuthStore()
const customerStore = useCustomerStore()

// State
const search = ref('')
const type = ref(CUSTOMER_TYPE_KEY.CUSTOMER)
const selectedCustomer = ref(null)
const isShowModal = ref(false)
const currentPage = ref(PAGING.DEFAULT_PAGE)

const allCustomer = computed(() => customerStore.allCustomer)

// Methods
const init = async (activeKey, page = PAGING.DEFAULT_PAGE, pageSize = PAGING.DEFAULT_PAGE_SIZE) => {
  currentPage.value = page
  type.value = activeKey
  const deleted = activeKey === 'DELETED'

  console.log(activeKey);

  await customerStore.getAll({
    search: search.value,
    type: deleted ? '' : activeKey,
    deleted,
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
    await init(type.value, currentPage.value)

    closeModal()
    mc.success(MSG.UPDATE_SUCCESS)
  } catch (error) {
    mc.error(MSG.UPDATE_FAILED)
  }
}

const deleteCustomer = async (id) => {
  await customerStore.delete(id)
  await init(type.value)
}

const undeleteCustomer = async (id) => {
  await customerStore.undelete(id)
  await init(type.value)
}

// Hooks
onMounted(async () => {
  await init(type.value, currentPage.value)
})
</script>
