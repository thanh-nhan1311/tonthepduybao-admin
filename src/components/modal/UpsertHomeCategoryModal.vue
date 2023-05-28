<template>
  <a-modal
    v-model:visible="visible"
    centered
    width="40vw"
    :title="`${isEdit ? 'Sửa' : 'Thêm'} danh mục sản phẩm kinh doanh`"
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
      <a-form-item has-feedback label="Chọn danh mục" name="categoryId">
        <a-select
          v-model:value="formState.categoryId"
          show-search
          :options="siteCategoryStore.parentOptions"
          :filter-option="filterParentOptions"
        ></a-select>
      </a-form-item>

      <a-form-item has-feedback label="Hình ảnh" name="image">
        <image-picker :src="formState.image ? [formState.image] : null" @change="selectImage" />
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 14, offset: 4 }" class="hidden">
        <a-button ref="btnSubmitRef" type="primary" html-type="submit">Lưu</a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { defineComponent, onMounted, ref, toRef } from 'vue'
import { defEmptyCategory, defEmptyCategoryImage } from '~/modules/formRule'
import { useSiteCategoryStore } from '~/stores/siteManagement/siteCategory'
import { useUploadStore } from '~/stores/upload'
import { isNil, cloneDeep } from 'lodash'

const emits = defineEmits(['close'])
const props = defineProps({
  productCategory: {
    type: Object,
    default: null
  }
})
const productCategoryProp = toRef(props, 'productCategory')

// Store
const siteCategoryStore = useSiteCategoryStore()
const siteSettingStore = useSiteSettingStore()
const uploadStore = useUploadStore()

// State
const visible = true
const initialFormState = {
  id: null,
  categoryId: null,
  image: '',
  imageFile: null
}
const formRules = {
  categoryId: [{ required: true, validator: defEmptyCategory, trigger: 'change' }],
  image: [{ required: true, validator: defEmptyCategoryImage, trigger: 'change' }]
}
let btnSubmitRef = ref()
let formRef = ref()
const isEdit = ref(false)
const formState = ref(cloneDeep(initialFormState))

// Methods
const formSubmit = async () => {
  const { id, categoryId, image, imageFile } = formState.value

  let endpoints = []
  if (imageFile) {
    const formData = new FormData()
    formData.append('directory', SITE_SETTING.DIR.PRODUCT_CATEGORY)
    formData.append('files', imageFile)

    endpoints = await uploadStore.upload(formData, false)
  } else if (isEdit.value) endpoints = [image]

  const category = siteCategoryStore.allCategory.find((item) => item.id === categoryId)
  const payload = endpoints.map((item) => ({
    id,
    masterKey: SITE_SETTING.MASTER_KEY.HOME,
    key: SITE_SETTING.KEY.PRODUCT_CATEGORY,
    value: JSON.stringify({ category, image: item.replace(S3_URL, '') })
  }))
  await siteSettingStore.saveSetting({ settings: payload }, async () => {
    for (let i = 0; i < endpoints.length; i++) {
      await uploadStore.delete({ path: endpoints[i] }, false)
    }
  })

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
onMounted(async () => {
  await siteCategoryStore.getCategoryOptions()

  isEdit.value = !isNil(productCategoryProp.value)
  if (isEdit.value) {
    formState.value = cloneDeep(productCategoryProp.value)
    formState.value.image = S3_URL + formState.value.image
  } else reset()
})
</script>

<script>
import ImagePicker from '~/components/ImagePicker.vue'
import { SITE_SETTING } from '~/modules/constant'
import { useSiteSettingStore } from '~/stores/siteManagement/siteSetting'
import { S3_URL } from '~/modules/http'

export default defineComponent({
  components: { ImagePicker }
})
</script>
