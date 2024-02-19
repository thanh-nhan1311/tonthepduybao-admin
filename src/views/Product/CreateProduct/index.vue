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

    <div class="grid grid-cols-12 gap-x-8 mt-8">
      <div class="col-span-3">
        <label for="date"><span class="text-red-500">*</span> Ngày nhập</label>
        <a-date-picker
          v-model:value="formState.date"
          placeholder="Chọn ngày"
          :format="moment.MOMENT_FORMAT.YYYY_MM_DD"
          :value-format="moment.MOMENT_FORMAT.YYYYMMDD"
          class="w-full"
          @change="clearValidate('productQuantities')"
        />
        <p v-if="formErrors.date" class="mb-0 text-red-500 mt-0.5 text-[12px]">
          {{ formErrors.date }}
        </p>
      </div>
      <div class="col-span-3">
        <label for="branch"><span class="text-red-500">*</span> Chi nhánh</label>
        <a-select
          v-model:value="formState.branch"
          :options="branchStore.branchOptions"
          placeholder="Chọn chi nhánh"
          class="w-full"
          @change="clearValidate('productQuantities')"
        />
        <p v-if="formErrors.branch" class="mb-0 text-red-500 mt-0.5 text-[12px]">
          {{ formErrors.branch }}
        </p>
      </div>
      <div class="col-span-3">
        <label for="quantity"><span class="text-red-500">*</span> Số lượng</label>
        <a-input
          v-model:value="formState.quantity"
          type="number"
          :min="0"
          @change="calSizeCalculator()"
        />
        <p v-if="formErrors.quantity" class="mb-0 text-red-500 mt-0.5 text-[12px]">
          {{ formErrors.quantity }}
        </p>
      </div>
    </div>

    <div v-if="type === 'CORRUGATED'" class="grid grid-cols-12 gap-x-8 mt-8">
      <div class="col-span-3">
        <label for="name">Khổ/quy cách (mm)</label>
        <a-input
          v-model:value="formState.size"
          type="number"
          :min="0"
          @change="calSizeCalculator(index)"
        />
      </div>
      <div class="col-span-3">
        <label for="name">Diện tích (m2)</label>
        <a-input
          v-model:value="formState.sizeCalculator"
          :disabled="true"
        />
      </div>
    </div>

    <a-divider orientation="left" class="mt-8 mb-4" orientation-margin="0">
      <span class="text-red-500">*</span><span class="ml-2 text-xl font-medium">Thuộc tính</span>
    </a-divider>
    <div>
      <div class="grid grid-cols-12 gap-x-20 gap-y-8 mt-4">
        <div
          v-for="prop of selectedProperties"
          :key="prop.id"
          class="col-span-3 flex items-center"
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
  </section>
</template>

<script setup>
import { cloneDeep, isEmpty } from 'lodash'
import { computed, onMounted, ref } from 'vue'
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import { useMessage, useMoment } from '~/composables'
import { MSG, TYPE, TYPE_KEY } from '~/modules/constant'
import { MENU } from '~/modules/menu'
import { customFilter } from '~/modules/utils'
import { useBranchStore } from '~/stores/branch'
import { useProductStore } from '~/stores/product'
import { usePropertyStore } from '~/stores/property'

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
  date: '',
  branch: null,
  quantity: 0,
  size: 0,
  sizeCalculator: 0
}
const formState = ref(cloneDeep(initFormState))
const formErrors = ref({})
const selectedProperties = ref([])
const isSummitting = ref(false)

const isFormChange = computed(() => {
  const { name, type, parent, properties, date, branch, quantity } = formState.value
  return (
    !name ||
    !type ||
    !parent ||
    Object.values(properties).length !== 0 ||
    !date ||
    !branch ||
    !quantity
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


const calSizeCalculator = () => {
  const { type, size, quantity } = formState.value

  if (TYPE_KEY.CORRUGATED === type && size && quantity) {
    formState.value.sizeCalculator = (size / 1000) * quantity
  }
}

const clearValidate = (errorName) => {
  delete formErrors.value[errorName]
}

const validate = () => {
  const { name, type, properties, date, branch, quantity } = formState.value

  if (!name) formErrors.value.name = 'Tên sản phẩm là trường băt buộc'
  else clearValidate('name')

  if (!type) formErrors.value.type = 'Loại sản phẩm là trường băt buộc'
  else clearValidate('type')

  if (!date) formErrors.value.date = 'Ngày nhập là trường băt buộc'
  else clearValidate('date')

  if (!branch) formErrors.value.branch = 'Chi nhánh là trường băt buộc'
  else clearValidate('branch')

  if (!quantity) formErrors.value.quantity = 'Số lượng là trường băt buộc'
  else clearValidate('quantity')

  if (!properties || Object.values(properties).length === 0)
    formErrors.value.properties = 'Thuộc tính là trường băt buộc'
  else clearValidate('properties')

  return isEmpty(formErrors.value)
}

const submit = async () => {
  isSummitting.value = true
  const isValid = validate()

  if (isValid) {
    const { name, type, parent, properties, date, branch, quantity, size, sizeCalculator } = formState.value

    try {
      await productStore.create({
        name: name.trim(),
        type,
        properties,
        parent,
        date,
        branch,
        quantity,
        size,
        sizeCalculator
      })

      formState.value = cloneDeep(initFormState)
      mc.success(MSG.SAVE_SUCCESS)
      router.push(MENU.PRODUCT.path)
    } catch (error) {
      mc.error(MSG.SAVE_FAILED)
      isSummitting.value = false
    }
  }
}

// Hooks
onMounted(async () => {
  await initFormOptions()
})

onBeforeRouteLeave((to, from, next) => {
  if (!isSummitting.value && isFormChange.value) {
    if (confirm('Bạn có chắc muốn rời khỏi trang này không?')) next()
    else next(false)
  } else next()
})
</script>

<style lang="scss">
@import './style.scss';
</style>
