<template>
  <section class="property-page">
    <heading title="Danh sách thuộc tính" :tooltip="true" class="mb-8">
      <template #tooltip>
        <div class="pt-2 pl-2">
          <p class="mb-2 text-[12px] font-medium">
            Lưu ý, chức năng xoá sẽ bị ẩn trong các TH sau:
          </p>
          <ul class="pl-2 ml-8 text-base">
            <li>Thuộc tính đang được sử dụng trong công nợ</li>
            <li>Giá trị của thuộc tính đang được sử dụng trong công nợ/sản phẩm</li>
          </ul>
        </div>
      </template>

      <div class="flex items-center">
        <a-input-search
          v-model:value="search"
          placeholder="Tìm kiếm thuộc tính..."
          class="w-[320px]"
          @keypress.enter="propertyStore.getAll({ search })"
        />
        <a-button type="primary" class="flex items-center ml-4" @click="openModal">
          <Iconify icon="mdi:plus-circle" class="mr-1" />
          <span>Thêm</span>
        </a-button>
      </div>
    </heading>

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
        <template v-else-if="column.key === 'properties'">
          <a-tag v-for="item in record.items" :key="item.id" color="blue" class="mb-2">
            {{ item.name }}
          </a-tag>
        </template>
        <template v-else-if="column.key === 'action'">
          <div>
            <a-button type="link" @click="openModal(record.id)">Sửa</a-button>
            <a-popconfirm
              v-if="!record.used"
              title="Bạn có chắn chắc muốn xoá thuộc tính này không?"
              ok-text="Có"
              cancel-text="Không"
              @confirm="deleteProperty(record.id)"
            >
              <a-button type="link" danger>Xoá</a-button>
            </a-popconfirm>
          </div>
        </template>
      </template>
    </a-table>

    <upsert-property-modal v-if="isShowModal" :property="selectedProperty" @close="closeModal" />
  </section>
</template>

<script setup>
import { onMounted, ref, toRef } from 'vue'
import { useMoment } from '~/composables'
import { PROPERTY_TABLE_COLUMNS } from '~/modules/table'
import { usePropertyStore } from '~/stores/property'

const moment = useMoment()

// Store
const propertyStore = usePropertyStore()
const search = toRef(propertyStore, 'search')

// State
const isShowModal = ref(false)
const selectedProperty = ref(null)

// Methods
const openModal = (id = null) => {
  if (id) {
    selectedProperty.value = propertyStore.allProperty.find((item) => item.id == id)
  }
  isShowModal.value = true
}
const closeModal = () => {
  isShowModal.value = false
}
const deleteProperty = (id) => {
  propertyStore.delete(id)
}

// Hooks
onMounted(() => {
  propertyStore.getAll({ search: search.value })
})
</script>

<style lang="scss">
@import './style.scss';
</style>
