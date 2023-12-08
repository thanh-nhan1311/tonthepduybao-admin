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
          @keypress.enter="init(sort)"
        />
        <a-button type="primary" class="flex items-center ml-4" @click="openModal">
          <Iconify icon="mdi:plus-circle" class="mr-1" />
          <span>Thêm</span>
        </a-button>
      </div>
    </heading>

    <!-- Property tabs -->
    <a-tabs v-model:activeKey="type" @change="init()">
      <a-tab-pane v-for="item of Object.values(TYPE)" :key="item.value" :tab="item.label">
        <property-table
          :data="propertyStore.allProperty"
          @sort="(sortField) => init(sortField)"
          @edit="(id) => openModal(id)"
          @delete="(id) => deleteProperty(id)"
        />
      </a-tab-pane>
    </a-tabs>

    <!-- Create/update property modal -->
    <upsert-property-modal
      v-if="isShowModal"
      :property="selectedProperty"
      @callback="init()"
      @close="closeModal"
    />
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useMessage } from '~/composables'
import { MSG, TYPE, TYPE_KEY } from '~/modules/constant'
import { usePropertyStore } from '~/stores/property'

// Store
const mc = useMessage()
const propertyStore = usePropertyStore()

// State
const isShowModal = ref(false)
const selectedProperty = ref(null)
const search = ref('')
const sort = ref('')
const type = ref(TYPE_KEY.IRON)

// Methods
const init = async (sortField = '') => {
  sort.value = sortField
  await propertyStore.getAll({ search: search.value, sort: sortField, type: type.value })
}
const openModal = (id = null) => {
  if (id) {
    selectedProperty.value = propertyStore.allProperty.find((item) => item.id == id)
  }
  isShowModal.value = true
}
const closeModal = () => {
  isShowModal.value = false
}
const deleteProperty = async (id) => {
  try {
    await propertyStore.delete(id)
    await init(sort.value)

    mc.success(MSG.DELETE_SUCCESS)
  } catch (error) {
    mc.error(MSG.DELETE_FAILED)
  }
}

// Hooks
onMounted(async () => {
  await init()
})
</script>

<style lang="scss">
@import './style.scss';
</style>
