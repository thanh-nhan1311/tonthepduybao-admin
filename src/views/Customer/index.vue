<template>
  <section>
    <heading :title="pageTitle">
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

    <a-table
      :columns="CUSTOMER_TABLE_COLUMNS"
      :pagination="{
        current: currentPage,
        total: customerStore.allCustomer.totalItems,
        pageSize: customerStore.allCustomer.pageSize,
        onChange: init
      }"
      :data-source="customerStore.allCustomerTableData"
      class="mt-8"
    >
      <template #headerCell="{ title, column }">
        <template v-if="column.key === 'type'">
          <div class="flex items-center">
            <a-popover trigger="click" placement="bottom">
              <template #content>
                <a-checkbox-group
                  v-model:value="type"
                  :options="customerTypeOptions"
                  class="flex flex-col"
                  @change="init(currentPage)"
                />
              </template>
              <Iconify icon="mdi:filter" class="cursor-pointer outline-none" width="14px" />
            </a-popover>
            <span class="ml-4">{{ title }}</span>
          </div>
        </template>
      </template>
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'no'">{{ index + 1 }}</template>
        <template v-else-if="column.key === 'contact'">
          <div v-if="record.email" class="flex items-center mb-2">
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
        <template v-if="column.key === 'type'">{{ CUSTOMER_TYPE[record.type].name }}</template>
        <template v-else-if="column.key === 'action'">
          <div>
            <a-button type="link" @click="openModal(record)"> Sửa </a-button>
            <a-popconfirm
              v-if="authStore.isAdmin"
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
import { CUSTOMER_TABLE_COLUMNS } from '~/modules/table'
import { useAuthStore } from '~/stores/auth'
import { useCustomerStore } from '~/stores/customer'

// Store
const mc = useMessage()
const authStore = useAuthStore()
const customerStore = useCustomerStore()

// State
const search = ref('')
const type = ref([])
const selectedCustomer = ref(null)
const isShowModal = ref(false)
const currentPage = ref(PAGING.DEFAULT_PAGE)
const pageTitle = computed(() => {
  if (type.value.length === 1) {
    if (type.value.includes(CUSTOMER_TYPE_KEY.CUSTOMER)) return 'Danh sách khách hàng'
    else if (type.value.includes(CUSTOMER_TYPE_KEY.SUPPLIER)) return 'Danh sách nhà cung cấp'
  }

  return 'Danh sách khách hàng/nhà cung cấp'
})
const customerTypeOptions = computed(() =>
  Object.values(CUSTOMER_TYPE).map((item) => ({
    label: item.name,
    value: item.id
  }))
)

// Methods
const init = async (page = PAGING.DEFAULT_PAGE, pageSize = PAGING.DEFAULT_PAGE_SIZE) => {
  currentPage.value = page

  console.log(page)

  await customerStore.getAll({
    search: search.value,
    type: type.value.join(','),
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
