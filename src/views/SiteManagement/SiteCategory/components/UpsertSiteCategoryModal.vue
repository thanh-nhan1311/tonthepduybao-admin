<template>
  <a-modal
    v-model:visible="isShowModalProp"
    centered
    width="40vw"
    :title="`${isEdit ? 'Sửa' : 'Thêm mới'} danh mục`"
    ok-text="Lưu"
    cancel-text="Đóng"
    @ok="submit"
    @cancel="emits('close')"
  >
    <a-form
      ref="formRef"
      :model="formState"
      :rules="formRules"
      v-bind="{
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
      }"
      @finish="formSubmit"
    >
      <a-form-item has-feedback label="Tên danh mục" name="name">
        <a-input v-model:value="formState.name" />
      </a-form-item>

      <a-form-item has-feedback label="Chọn thư mục cha" name="parent">
        <a-select
          v-model:value="formState.parent"
          show-search
          placeholder="Chọn thư mục cha"
          :options="siteCategoryStore.parentOptions"
          :filter-option="filterParentOptions"
        ></a-select>
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 14, offset: 4 }" class="hidden">
        <a-button ref="btnEditRef" type="primary" html-type="submit">Lưu</a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { defineEmits, defineProps, ref, toRef, watch } from 'vue'
import { defEmptyCategoryName } from '~/modules/formRule'
import { useSiteCategoryStore } from '~/stores/siteManagement/siteCategory'
import { isNil, cloneDeep } from 'lodash'

// Emits
const emits = defineEmits(['close'])

// Props
const props = defineProps({
  isShowModal: {
    type: Boolean,
    required: false,
    default: false
  },
  category: {
    type: Object,
    default: null
  }
})
const isShowModalProp = toRef(props, 'isShowModal')
const categoryProp = toRef(props, 'category')

// Store
const siteCategoryStore = useSiteCategoryStore()

// State
const initialFormState = {
  id: null,
  name: '',
  seoUrl: '',
  totalProduct: 0,
  parent: null
}
const formRules = {
  name: [{ required: true, validator: defEmptyCategoryName, trigger: 'change' }]
}
let btnEditRef = ref()
let formRef = ref()
const isEdit = ref(false)
const formState = ref(initialFormState)

// Methods
const formSubmit = () => {
  siteCategoryStore.upsertCategory(formState.value)
  reset()
  emits('close')
}
const submit = () => btnEditRef.value.$el.click()
const reset = () => {
  formState.value = cloneDeep(initialFormState)
  formRef.value.resetFields()
}
const filterParentOptions = (input, option) => {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
}

// Watcher
watch(
  categoryProp,
  (newProp) => {
    isEdit.value = !isNil(newProp)

    if (isEdit.value) {
      siteCategoryStore.getCategoryOptions(newProp.id)
      formState.value = cloneDeep(newProp)
    } else siteCategoryStore.getCategoryOptions()
  },
  { deep: true }
)

watch(isShowModalProp, (newProp) => {
  if (newProp) siteCategoryStore.getCategoryOptions()
  else reset()
})
</script>
