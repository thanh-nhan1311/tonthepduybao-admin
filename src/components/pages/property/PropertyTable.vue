<template>
  <a-table :columns="PROPERTY_TABLE_COLUMNS" :data-source="data">
    <template #headerCell="{ title, column }">
      <template v-if="['orderBy', 'updatedAt'].includes(column.key)">
        <div class="flex items-center">
          <Iconify
            icon="fa6-solid:sort"
            class="mr-4 cursor-pointer"
            @click="emits('sort', column.key)"
          />
          {{ title }}
        </div>
      </template>
    </template>
    <template #bodyCell="{ column, record, index }">
      <template v-if="column.key === 'no'">{{ index + 1 }}</template>
      <template v-else-if="column.key === 'updatedAt'">
        <div class="mb-1 flex items-center">
          <Iconify icon="mdi:account" />
          <span class="ml-2">{{ record.updatedBy }}</span>
        </div>
        <div class="mb-0 text-base text-gray-600 italic flex items-center">
          <Iconify icon="mdi:clock-time-four" width="13px" />
          <span class="ml-2">{{ moment.mFormat(record.updatedAt) }}</span>
        </div>
      </template>
      <template v-else-if="column.key === 'type'">{{ TYPE[record.type].label }}</template>
      <template v-else-if="column.key === 'properties'">
        {{ record.items.length }} thuộc tính
      </template>
      <template v-else-if="column.key === 'action'">
        <div>
          <a-button type="link" @click="emits('edit', record.id)">Sửa</a-button>
          <a-popconfirm
            v-if="!record.used"
            title="Bạn có chắn chắc muốn xoá thuộc tính này không?"
            ok-text="Có"
            cancel-text="Không"
            @confirm="emits('delete', record.id)"
          >
            <a-button type="link" danger>Xoá</a-button>
          </a-popconfirm>
        </div>
      </template>
    </template>
  </a-table>
</template>

<script setup>
import { useMoment } from '~/composables'
import { PROP_DEF, TYPE } from '~/modules/constant'
import { PROPERTY_TABLE_COLUMNS } from '~/modules/table'

defineProps({
  data: PROP_DEF.OBJECT_REQUIRED
})
const emits = defineEmits(['sort', 'delete', 'edit'])

// Store
const moment = useMoment()
</script>
