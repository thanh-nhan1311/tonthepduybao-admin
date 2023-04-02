<template>
  <section>
    <a-row class="flex justify-end items-center mb-4">
      <a-col :span="16">
        <h2 class="text-2xl">Danh mục sản phẩm</h2>
      </a-col>
      <a-col :span="8" class="flex items-center">
        <a-input
          ref="refUsername"
          v-model:value="search"
          placeholder="Tìm kiếm liên hệ"
          class="mr-4 w-full"
          @keypress.enter="siteCategoryStore.searchCategory(search)"
        >
          <template #prefix>
            <search-outlined @click="siteCategoryStore.searchCategory(search)" />
          </template>
        </a-input>

        <a-button type="primary" @click="openModal">Thêm Danh Mục</a-button>
      </a-col>
    </a-row>

    <a-table
      :columns="SITE_CATEGORY_TABLE_COLUMNS"
      :data-source="siteCategoryStore.allCategoryTableData"
    >
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'no'">{{ index + 1 }}</template>
        <template v-else-if="column.key === 'action'">
          <div>
            <a-button type="link" @click="openModal(record.id)"> Chỉnh sửa </a-button>
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
      :is-show-modal="isShowModal"
      :category="selectedCategory"
      @close="closeModal"
    />
  </section>
</template>

<script setup>
import { SearchOutlined } from '@ant-design/icons-vue'
import UpsertSiteCategoryModal from '~/components/modal/UpsertSiteCategoryModal.vue'
import { defineComponent, onMounted, ref } from 'vue'
import { SITE_CATEGORY_TABLE_COLUMNS } from '~/modules/table'
import { useSiteCategoryStore } from '~/stores/siteManagement/siteCategory'

// Store
const siteCategoryStore = useSiteCategoryStore()

// State
const search = ref('')
const isShowModal = ref(false)
const selectedCategory = ref(null)

// Methods
const openModal = (id = null) => {
  if (id) {
    const findCategory = siteCategoryStore.allCategory.find((item) => item.id == id)
    if (findCategory) selectedCategory.value = findCategory
  }

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

<script>
export default defineComponent({
  components: {
    SearchOutlined,
    UpsertSiteCategoryModal
  }
})
</script>
