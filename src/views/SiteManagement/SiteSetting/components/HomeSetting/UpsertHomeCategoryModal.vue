<template>
  <a-modal
    v-model:visible="isShowModalProp"
    centered
    width="40vw"
    title="Thêm danh mục sản phẩm kinh doanh"
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
      <a-form-item has-feedback label="Chọn danh mục" name="name">
        <a-select
          v-model:value="formState.category"
          show-search
          :options="siteCategoryStore.parentOptions"
          :filter-option="filterParentOptions"
        ></a-select>
      </a-form-item>

      <a-form-item has-feedback label="Hình ảnh" name="logoFile">
        <image-picker :src="formState.image ? [formState.image] : null" @change="selectImage" />
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 14, offset: 4 }" class="hidden">
        <a-button ref="btnSubmitRef" type="primary" html-type="submit">Lưu</a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { defineComponent, defineEmits, defineProps, onMounted, ref, toRef } from 'vue'
import { defEmptyCategory, defEmptyCategoryImage } from '~/modules/formRule'
import { useSiteCategoryStore } from '~/stores/siteManagement/siteCategory'
import { cloneDeep } from 'lodash'

// Emits
const emits = defineEmits(['close'])

// Props
const props = defineProps({
  isShowModal: {
    type: Boolean,
    required: false,
    default: false
  }
})
const isShowModalProp = toRef(props, 'isShowModal')

// Store
const siteCategoryStore = useSiteCategoryStore()

// State
const initialFormState = {
  category: null,
  image: '',
  imageFile: null
}
const formRules = {
  category: [{ required: true, validator: defEmptyCategory, trigger: 'change' }],
  image: [{ required: true, validator: defEmptyCategoryImage, trigger: 'change' }]
}
let btnSubmitRef = ref()
let formRef = ref()
const formState = ref(initialFormState)

// Methods
const formSubmit = () => {
  const { id, name, logoFile } = formState.value

  const formData = new FormData()
  if (id) formData.append('id', id)
  formData.append('category', name)
  formData.append('image', logoFile)

  reset()
  emits('close')
}
const submit = () => btnSubmitRef.value.$el.click()
const reset = () => {
  formState.value = cloneDeep(initialFormState)
  formRef.value.resetFields()
}
const selectImage = (data) => {
  const { src, file } = data
  formState.value.image = src
  formState.value.imageFile = file
}
const filterParentOptions = (input, option) => {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
}

// Mounted
onMounted(() => {
  siteCategoryStore.getCategoryOptions()
})
</script>

<script>
import ImagePicker from '~/components/ImagePicker.vue'

export default defineComponent({
  components: { ImagePicker }
})
</script>
