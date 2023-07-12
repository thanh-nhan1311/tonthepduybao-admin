<template>
  <section>
    <heading title="Danh mục sản phẩm">
      <div class="flex items-center">
        <a-input
          ref="refUsername"
          v-model:value="search"
          placeholder="Tìm kiếm liên hệ"
          class="mr-4 w-[400px]"
          @keypress.enter="siteCategoryStore.searchCategory(search)"
        >
          <template #prefix>
            <Iconify icon="ic:outline-search" @click="siteCategoryStore.searchCategory(search)" />
          </template>
        </a-input>

        <a-button type="primary" @click="openModal">Thêm Danh Mục</a-button>
      </div>
    </heading>

    <a-table
      :columns="SITE_CATEGORY_TABLE_COLUMNS"
      :data-source="siteCategoryStore.allCategoryTableData"
    >
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'no'">{{ index + 1 }}</template>
        <template v-else-if="column.key === 'action'">
          <div>
            <a-button type="link" @click="openModal(record)"> Chỉnh sửa </a-button>
            <a-button
              v-if="record.totalProduct === 0"
              type="text"
              danger
              class="ml-4"
              @click="deleteCategory(record.id)"
            >
              Xoá
            </a-button>
          </div>
        </template>
      </template>
    </a-table>

    <upsert-site-category-modal
      v-if="isShowModal"
      :category="selectedCategory"
      @close="closeModal"
    />
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useSiteCategoryStore } from '~/stores/siteManagement/siteCategory'
import { SITE_CATEGORY_TABLE_COLUMNS } from '~/modules/table'

// Store
const siteCategoryStore = useSiteCategoryStore()

// State
const search = ref('')
const isShowModal = ref(false)
const selectedCategory = ref(null)

// Methods
const openModal = (category) => {
  selectedCategory.value = category
  isShowModal.value = true
}
const closeModal = () => {
  selectedCategory.value = null
  isShowModal.value = false
}
const deleteCategory = async (id) => {
  await siteCategoryStore.deleteCategory(id)
  await siteCategoryStore.searchCategory('')
}

// Hooks
onMounted(() => {
  siteCategoryStore.searchCategory(search.value)
})
</script>
