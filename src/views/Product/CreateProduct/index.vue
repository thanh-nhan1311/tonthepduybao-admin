<template>
  <section class="create-product-page">
    <heading :title="MENU.CREATE_PRODUCT.name" class="items-start">
      <div class="flex items-center mb-4">
        <a-button
          type="default"
          class="w-[120px] flex items-center justify-center"
          @click="router.back()"
        >
          Huỷ bỏ
        </a-button>

        <a-button
          type="primary"
          class="w-[120px] ml-4 mr-0 flex items-center justify-center"
          @click="submit"
        >
          <Iconify icon="mdi:content-save" />
          <span class="ml-2">Thêm</span>
        </a-button>
      </div>
    </heading>

    <p class="text-right italic mb-0 mt-2 text-xl text-red-500">(*) Là các trường bắt buộc</p>

    <div class="grid grid-cols-12 gap-x-8 mt-2">
      <div class="col-span-6">
        <label for="name"><span class="text-red-500">*</span> Tên sản phẩm</label>
        <a-input
          id="name"
          v-model:value="formState.name"
          placeholder="Nhập tên sản phẩm"
          :maxlength="500"
          :show-count="true"
          @change="clearValidate('name')"
        />
        <p v-if="formErrors.name" class="mb-0 text-red-500 mt-0.5 text-[12px]">
          {{ formErrors.name }}
        </p>
      </div>

      <div class="col-span-3">
        <label for="type"><span class="text-red-500">*</span> Danh mục</label>
        <a-select
          v-model:value="formState.type"
          :options="Object.values(TYPE)"
          placeholder="Chọn loại sản phẩm"
          class="w-full"
          :disabled="formState.productQuantities.length !== 0"
          @change="changeType"
        />
        <p v-if="formErrors.type" class="mb-0 text-red-500 mt-0.5 text-[12px]">
          {{ formErrors.type }}
        </p>
      </div>

      <div class="col-span-3">
        <label for="type">Sản phẩm gốc</label>
        <a-select
          v-model:value="formState.parent"
          :options="[]"
          placeholder="Chọn sản phẩm gốc"
          class="w-full"
        />
        <p v-if="formErrors.type" class="mb-0 text-red-500 mt-0.5 text-[12px]">
          {{ formErrors.type }}
        </p>
      </div>
    </div>

    <a-divider orientation="left" class="mt-8 mb-4" orientation-margin="0">
      <span class="text-red-500">*</span><span class="ml-2 text-xl font-medium">Thuộc tính</span>
    </a-divider>
    <div>
      <div class="grid grid-cols-12 gap-x-20 mt-4">
        <div
          v-for="prop of selectedProperties"
          :key="prop.id"
          class="col-span-3 flex items-center mt-2"
        >
          <span class="mr-4 w-[160px] font-semibold">{{ prop.name }}:</span>
          <a-select
            v-model:value="formState.properties[prop.id]"
            :options="prop.items.map((item) => ({ label: item.name, value: item.id }))"
            :placeholder="`Chọn ${prop.name}`"
            :show-search="true"
            :filter-option="customFilter"
            max-tag-count="responsive"
            class="w-full"
            @change="clearValidate('properties')"
          />
        </div>
      </div>

      <p v-if="formErrors.properties" class="mb-0 text-red-500 mt-0.5 text-[12px]">
        {{ formErrors.properties }}
      </p>
    </div>

    <div class="flex mb-8">
      <div class="w-11/12">
        <a-divider orientation="left" class="mt-8 mb-4" orientation-margin="0">
          <span class="text-red-500">*</span>
          <span class="ml-2 text-xl font-medium">Tồn kho</span>
        </a-divider>
        <p v-if="formErrors.tableItems" class="mb-0 text-red-500 mt-2 text-[12px]">
          {{ formErrors.tableItems }}
        </p>
        <p
          v-if="formErrors.productQuantities && formErrors.productQuantities.length !== 0"
          class="mb-0 text-red-500 mt-0.5 text-[12px]"
        >
          Một trong số các trường bắt buộc của sản phẩm chưa được nhập
        </p>
      </div>

      <a-button
        type="primary"
        ghost
        class="min-w-[120px] flex items-center mt-7 ml-4"
        @click="addProductQuantity"
      >
        <Iconify icon="mdi:plus-circle" width="16px" />
        <span class="ml-2">Thêm sản phẩm</span>
      </a-button>
    </div>

    <a-table
      :columns="tableColumns"
      :data-source="formState.productQuantities"
      :scroll="{ x: 'max-content' }"
      :pagination="false"
      :row-class-name="getTableRowClassName"
      empty-text="Dữ liệu trống"
      :class="[
        'create-product-page__table',
        formState.type && `create-product-page__table--${formState.type.toLowerCase()}`
      ]"
    >
      <template #headerCell="{ title, column }">
        <template v-if="['branch', 'date'].includes(column.key)">
          <span class="text-red-500"> * </span>
          {{ title }}
        </template>
      </template>

      <template #bodyCell="{ column, index }">
        <template v-if="column.key === 'branch'">
          <a-select
            v-model:value="formState.productQuantities[index].branch"
            :options="branchStore.branchOptions"
            placeholder="Chọn chi nhánh"
            class="w-full"
            @change="clearValidate('productQuantities', index)"
          />
        </template>
        <template v-else-if="column.key === 'date'">
          <a-date-picker
            v-model:value="formState.productQuantities[index].date"
            placeholder="Chọn ngày"
            :format="moment.MOMENT_FORMAT.YYYY_MM_DD"
            :value-format="moment.MOMENT_FORMAT.YYYYMMDD"
            class="w-full"
            @change="clearValidate('productQuantities')"
          />
        </template>
        <template v-else-if="column.key === 'quantity'">
          <a-input
            v-model:value="formState.productQuantities[index].quantity"
            type="number"
            :min="0"
            @change="calSizeCalculator(index)"
          />
        </template>
        <template v-else-if="column.key === 'size'">
          <a-input
            v-model:value="formState.productQuantities[index].size"
            type="number"
            :min="0"
            @change="calSizeCalculator(index)"
          />
        </template>

        <template v-else-if="column.key === 'action'">
          <a-button type="link" danger @click="deleteProductQuantity(index)">
            <Iconify icon="mdi:trash-can" width="20px" />
          </a-button>
        </template>
      </template>
    </a-table>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { usePropertyStore } from '~/stores/property'
import { useProductStore } from '~/stores/product'
import { isEmpty, cloneDeep } from 'lodash'
import { useMessage, useMoment } from '~/composables'
import { TYPE, TYPE_KEY, MSG } from '~/modules/constant'
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import { MENU } from '~/modules/menu'
import { useBranchStore } from '~/stores/branch'
import { PRODUCT_CORRUGATED_TABLE_COLUMNS, PRODUCT_FULL_TABLE_COLUMNS } from '~/modules/table'
import { customFilter } from '~/modules/utils'

const router = useRouter()

// Store
const mc = useMessage()
const moment = useMoment()
const productStore = useProductStore()
const branchStore = useBranchStore()
const propertyStore = usePropertyStore()

// State
const initFormState = {
  name: '',
  type: TYPE_KEY.IRON,
  parent: null,
  properties: {},
  productQuantities: []
}
const productQuantityItem = {
  date: '',
  branch: null,
  quantity: 0,
  size: 0,
  sizeCalculator: 0
}
const formState = ref(cloneDeep(initFormState))
const formErrors = ref({})
const selectedProperties = ref([])

const tableColumns = computed(() =>
  formState.value.type === TYPE_KEY.CORRUGATED
    ? PRODUCT_FULL_TABLE_COLUMNS
    : PRODUCT_CORRUGATED_TABLE_COLUMNS
)
const isFormChange = computed(() => {
  const { name, type, parent, properties, productQuantities } = formState.value
  return (
    name !== '' ||
    type !== null ||
    parent !== null ||
    Object.values(properties).length !== 0 ||
    productQuantities.length !== 0
  )
})

// Methods
const initFormOptions = async () => {
  await branchStore.getAll()
  await changeType()
}

const changeType = async () => {
  await propertyStore.getAll({ type: formState.value.type })

  const sortedProperties = propertyStore.allProperty.sort((a, b) => a.orderBy - b.orderBy)
  selectedProperties.value = sortedProperties

  formState.value.properties = {}
  sortedProperties.forEach((item) => (formState.value.properties[item.id] = null))

  clearValidate('type')
}

const getTableRowClassName = (_record, index) => {
  return formErrors.value.productQuantities &&
    formErrors.value.productQuantities.length !== 0 &&
    formErrors.value.productQuantities.includes(index)
    ? 'create-product-page__table--error'
    : ''
}

const addProductQuantity = () => {
  formState.value.productQuantities.push(cloneDeep(productQuantityItem))
  clearValidate('tableItems')
}

const deleteProductQuantity = (index) => {
  formState.value.productQuantities.splice(index, 1)
  validateItems()
}

const calSizeCalculator = (index) => {
  const { type, productQuantities } = formState.value

  if (TYPE_KEY.CORRUGATED === type) {
    const size = productQuantities[index].size || 0
    const quantity = productQuantities[index].quantity || 0

    formState.value.productQuantities[index].sizeCalculator = (size / 1000) * quantity
  }
}

const clearValidate = (errorName, index = -1) => {
  if (index === -1) delete formErrors.value[errorName]
  else if (formErrors.value.productQuantities && formErrors.value.productQuantities.length !== 0) {
    formErrors.value.productQuantities = formErrors.value.productQuantities.filter(
      (itemIndex) => itemIndex !== index
    )
    if (formErrors.value.productQuantities.length === 0) delete formErrors.value.productQuantities
  }
}

const validateItems = () => {
  const { productQuantities } = formState.value

  if (!productQuantities || productQuantities.length === 0) {
    formErrors.value.tableItems = 'Bạn chưa thêm thông tin chi tiết cho sản phẩm'
    delete formErrors.value.productQuantities
  } else {
    delete formErrors.value.tableItems

    formErrors.value.productQuantities = productQuantities
      .map((item, index) => {
        if (!item.date || !item.branch) return index
        return -1
      })
      .filter((itemIndex) => itemIndex !== -1)

    if (formErrors.value.productQuantities.length === 0) clearValidate('productQuantities')
  }
}

const validate = () => {
  const { name, type, properties } = formState.value

  if (!name) formErrors.value.name = 'Tên sản phẩm là trường băt buộc'
  else clearValidate('name')

  if (!type) formErrors.value.type = 'Loại sản phẩm là trường băt buộc'
  else clearValidate('type')

  if (!properties || Object.values(properties).length === 0)
    formErrors.value.properties = 'Thuộc tính là trường băt buộc'
  else clearValidate('properties')

  validateItems()

  return isEmpty(formErrors.value)
}

const submit = async () => {
  const isValid = validate()

  if (isValid) {
    const { name, type, parent, properties } = formState.value

    const productQuantities = cloneDeep(formState.value.productQuantities).map((item) => {
      return {
        date: item.date,
        branch: item.branch,
        quantity: item.quantity,
        size: item.size,
        sizeCalculator: item.sizeCalculator
      }
    })

    try {
      await productStore.create({
        name: name.trim(),
        type,
        properties,
        parent,
        productQuantities
      })

      formState.value = cloneDeep(initFormState)
      mc.success(MSG.SAVE_SUCCESS)
      router.push(MENU.PRODUCT.path)
    } catch (error) {
      mc.error(MSG.SAVE_FAILED)
    }
  }
}

// Hooks
onMounted(async () => {
  await initFormOptions()
})

onBeforeRouteLeave((to, from, next) => {
  if (isFormChange.value) {
    if (confirm('Bạn có chắc muốn rời khỏi trang này không?')) next()
    else next(false)
  } else next()
})
</script>

<style lang="scss">
@import './style.scss';
</style>
