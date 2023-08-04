<template>
  <a-table
    :columns="CUSTOMER_TABLE_COLUMNS"
    :pagination="{
      currentPage: 1,
      showSizeChanger: false,
      total: customerStore.allCustomer.totalItems,
      pageSize: customerStore.allCustomer.pageSize,
      onChange: (page) => emits('init', page)
    }"
    :data-source="customerStore.allCustomerTableData"
  >
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
      <template v-if="column.key === 'type'">{{ CUSTOMER_TYPE[record.type].label }}</template>
      <template v-else-if="column.key === 'action'">
        <div>
          <a-button type="link" @click="emits('edit', record)"> Sửa </a-button>
          <a-popconfirm
            v-if="authStore.isAdmin"
            title="Bạn có chắc muốn xoá khách hàng này không?"
            ok-text="Có"
            cancel-text="Không"
            @confirm="emits('delete', record.id)"
          >
            <a-button type="text" danger class="ml-4"> Xoá </a-button>
          </a-popconfirm>
        </div>
      </template>
    </template>
  </a-table>
</template>

<script setup>
import { CUSTOMER_TYPE } from '~/modules/constant'
import { CUSTOMER_TABLE_COLUMNS } from '~/modules/table'
import { useAuthStore } from '~/stores/auth'
import { useCustomerStore } from '~/stores/customer'

const emits = defineEmits(['init', 'delete', 'edit'])

// Store
const authStore = useAuthStore()
const customerStore = useCustomerStore()
</script>
