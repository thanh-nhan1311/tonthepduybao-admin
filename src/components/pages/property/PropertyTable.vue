<template>
  <a-table :columns="PROPERTY_TABLE_COLUMNS" :data-source="propertyStore.allProperty">
    <template #bodyCell="{ column, record, index }">
      <template v-if="column.key === 'no'">{{ index + 1 }}</template>
      <template v-else-if="column.key === 'lastModified'">
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
import { TYPE } from '~/modules/constant'
import { PROPERTY_TABLE_COLUMNS } from '~/modules/table'
import { usePropertyStore } from '~/stores/property'

const emits = defineEmits(['delete', 'edit'])

// Store
const moment = useMoment()
const propertyStore = usePropertyStore()
</script>
