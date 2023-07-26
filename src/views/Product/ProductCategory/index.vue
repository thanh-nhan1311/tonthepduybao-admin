<template>
  <main class="product-category-page">
    <section class="grid grid-cols-12 gap-x-20">
      <div class="col-span-4">
        <heading title="Thêm danh mục" />

        <a-form
          ref="formRef"
          name="custom-validation"
          layout="vertical"
          :model="formState"
          :rules="formRules"
          @finish="createCategory"
        >
          <a-form-item
            has-feedback
            label="ID danh mục"
            name="id"
            :class="!formState.id && 'hidden'"
          >
            <a-input v-model:value="formState.id" :disabled="true" />
          </a-form-item>
          <a-form-item has-feedback label="Tên danh mục" name="name">
            <a-input v-model:value="formState.name" />
          </a-form-item>

          <a-form-item class="flex justify-start">
            <a-button type="primary" html-type="submit" class="px-20">Lưu</a-button>
          </a-form-item>
        </a-form>
      </div>

      <div class="col-span-8">
        <heading title="Danh sách danh mục">
          <a-input-search
            v-model:value="search"
            placeholder="Tìm kiếm ..."
            class="mr-4 w-[400px]"
            @keypress.enter="init"
          />
        </heading>

        <a-table
          :columns="PRODUCT_CATEGORY_TABLE_COLUMNS"
          :data-source="productCategoryStore.allProductCategory"
          class="mt-8"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'lastModified'">
              <div class="mb-1 flex items-center">
                <Iconify icon="mdi:account" />
                <span class="ml-2">{{ record.updatedBy }}</span>
              </div>
              <div class="mb-0 text-base text-gray-600 italic flex items-center">
                <Iconify icon="mdi:clock-time-four" width="13px" />
                <span class="ml-2">{{ moment.mFormat(record.updatedAt) }}</span>
              </div>
            </template>
            <template v-else-if="column.key === 'action'">
              <div>
                <a-button type="link" @click="selectCategory(record)"> Sửa </a-button>
                <a-popconfirm
                  title="Bạn có chắc muốn xoá khách hàng này không?"
                  ok-text="Có"
                  cancel-text="Không"
                >
                  <a-button type="text" danger class="ml-4"> Xoá </a-button>
                </a-popconfirm>
              </div>
            </template>
          </template>
        </a-table>
      </div>
    </section>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useMessage, useMoment } from '~/composables'
import { MSG } from '~/modules/constant'
import { defEmptyCategoryName } from '~/modules/formRule'
import { PRODUCT_CATEGORY_TABLE_COLUMNS } from '~/modules/table'
import { useProductCategoryStore } from '~/stores/productCategory'

// Store
const mc = useMessage()
const moment = useMoment()
const productCategoryStore = useProductCategoryStore()

// State
const formRules = {
  name: { required: true, validator: defEmptyCategoryName, trigger: 'change' }
}
const formRef = ref()
const formState = ref({ id: null, name: '' })
const search = ref('')

// Methods
const init = async () => {
  await productCategoryStore.getAll({ search: search.value })
}
const selectCategory = (record) => {
  formState.value = { id: record.id, name: record.name }
}
const createCategory = async (values) => {
  try {
    await productCategoryStore.upsert(values)
    await init()

    formRef.value.resetFields()

    mc.success(MSG.SAVE_SUCCESS)
  } catch (error) {
    mc.error(MSG.SAVE_FAILED)
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
