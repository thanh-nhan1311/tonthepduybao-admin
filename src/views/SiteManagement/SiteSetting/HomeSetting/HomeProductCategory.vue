<template>
  <div class="mt-8">
    <div class="flex items-center justify-between">
      <h4 class="font-semibold mb-0">3. Danh mục sản phẩm kinh doanh</h4>

      <a-button type="link" @click="isShowModal = true">
        <template #icon>
          <PlusCircleOutlined />
        </template>
        <span>Thêm</span>
      </a-button>
    </div>

    <a-table :columns="SITE_HOME_PRODUCT_CATEGORY_TABLE_COLUMNS" :data-source="productCategories">
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'no'">{{ index + 1 }}</template>
        <template v-else-if="column.key === 'category'">
          <div class="flex items-center">
            <a-image
              :width="100"
              :src="S3_URL + record.image"
              :fallback="FALLBACK_IMAGE"
              :preview="false"
            />
            <span class="ml-2">{{ record.category.name }}</span>
          </div>
        </template>
        <template v-else-if="column.key === 'action'">
          <div>
            <a-button type="link" @click="openModal(record)"> Chỉnh sửa </a-button>
            <a-popconfirm
              title="Bạn có chắc muốn xoá danh mục sản phẩm này không?"
              ok-text="Có"
              cancel-text="Không"
              @confirm="deleteProductCategory(record.id, record.image)"
            >
              <a-button type="text" danger class="ml-4"> Xoá </a-button>
            </a-popconfirm>
          </div>
        </template>
      </template>
    </a-table>

    <upsert-home-category-modal
      v-if="isShowModal"
      :product-category="selectProductCategory"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { computed, defineComponent, ref } from 'vue'

// Store
const siteSettingStore = useSiteSettingStore()
const uploadStore = useUploadStore()

// State
const isShowModal = ref(false)
const selectProductCategory = ref(null)
const productCategories = computed(() => {
  if (!siteSettingStore.allSetting || !siteSettingStore.allSetting.homeProductCategories) return []

  return siteSettingStore.allSetting.homeProductCategories.map((item) => {
    const productCategory = JSON.parse(item.value)
    return {
      ...item,
      ...productCategory,
      categoryId: productCategory.category.id
    }
  })
})

// Methods
const openModal = (productCategory) => {
  selectProductCategory.value = productCategory
  isShowModal.value = true
}
const closeModal = () => {
  selectProductCategory.value = null
  isShowModal.value = false
}
const deleteProductCategory = async (id, path) => {
  await uploadStore.delete({ path }, false)
  await siteSettingStore.deleteSetting(id)
}
</script>

<script>
import UpsertHomeCategoryModal from '@/components/modal/UpsertHomeCategoryModal.vue'
import { PlusCircleOutlined } from '@ant-design/icons-vue'
import { useSiteSettingStore } from '~/stores/siteManagement/siteSetting'
import { SITE_HOME_PRODUCT_CATEGORY_TABLE_COLUMNS } from '~/modules/table'
import { S3_URL } from '~/modules/http'
import { useUploadStore } from '~/stores/upload'

export default defineComponent({
  components: {
    PlusCircleOutlined,
    UpsertHomeCategoryModal
  }
})
</script>
