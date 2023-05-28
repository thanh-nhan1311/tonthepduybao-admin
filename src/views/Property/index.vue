<template>
  <section>
    <heading title="Thiết lập thuộc tính">
      <a-button type="primary" class="flex items-center" @click="openModal">
        <Iconify icon="mdi:plus-circle" class="mr-1" />
        <span>Thêm</span>
      </a-button>
    </heading>

    <a-table :columns="PROPERTY_TABLE_COLUMNS" :data-source="properties">
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'no'">{{ index + 1 }}</template>
        <template v-else-if="column.key === 'properties'">
          <a-tag v-for="item in record.properties" :key="item.id" color="blue">
            {{ item.name }}
          </a-tag>
        </template>
        <template v-else-if="column.key === 'action'">
          <div>
            <a-button type="link" @click="openModal">Sửa</a-button>
            <a-button type="link" danger>Xoá</a-button>
          </div>
        </template>
      </template>
    </a-table>

    <upsert-property-modal v-if="isShowModal" :partner="selectedProperty" @close="closeModal" />
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { PROPERTY_TABLE_COLUMNS } from '~/modules/table'
import { MOCK_PROPERTIES } from '~/modules/mock'

// State
const isShowModal = ref(false)
const selectedProperty = ref(null)
const properties = computed(() =>
  MOCK_PROPERTIES.map((prop) => {
    return {
      id: prop.property.id,
      name: prop.property.name,
      properties: prop.items
    }
  })
)

// Methods
const openModal = (id = null) => {
  if (id) {
    const findProperty = properties.value.find((item) => item.id == id)
    if (findProperty) selectedProperty.value = findProperty
  }

  isShowModal.value = true
}
const closeModal = () => {
  isShowModal.value = false
}
</script>
