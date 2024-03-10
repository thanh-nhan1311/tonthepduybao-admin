<template>
  <a-table
    :columns="CUSTOMER_TABLE_COLUMNS"
    :pagination="{
      currentPage: 1,
      showSizeChanger: false,
      total: total,
      pageSize: pageSize,
      onChange: (page) => emits('init', page)
    }"
    :data-source="data"
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
            v-if="isDelete"
            title="Bạn có chắc muốn xoá khách hàng này không?"
            ok-text="Có"
            cancel-text="Không"
            @confirm="emits('delete', record.id)"
          >
            <a-button type="text" danger class="ml-4"> Xoá </a-button>
          </a-popconfirm>

          <a-popconfirm
            v-if="isUndelete"
            title="Bạn có chắc muốn gỡ bỏ việc xoá khách hàng này không?"
            ok-text="Có"
            cancel-text="Không"
            @confirm="emits('undelete', record.id)"
          >
            <a-button type="text" danger class="ml-4"> Gỡ xoá </a-button>
          </a-popconfirm>
        </div>
      </template>
    </template>
  </a-table>
</template>

<script setup>
import { CUSTOMER_TYPE, PROP_DEF } from '~/modules/constant';
import { CUSTOMER_TABLE_COLUMNS } from '~/modules/table';

defineProps({
  data: PROP_DEF.OBJECT_REQUIRED,
  total: PROP_DEF.NUMBER,
  pageSize: PROP_DEF.NUMBER,
  isDelete: PROP_DEF.BOOLEAN,
  isUndelete: PROP_DEF.BOOLEAN
})
const emits = defineEmits(['init', 'delete', 'undelete', 'edit'])
</script>
