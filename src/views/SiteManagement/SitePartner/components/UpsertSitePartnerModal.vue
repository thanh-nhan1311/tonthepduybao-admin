<template>
  <a-modal
    v-model:visible="isShowModalProp"
    centered
    width="40vw"
    :title="`${isEdit ? 'Sửa' : 'Thêm mới'} đối tác`"
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
      <a-form-item has-feedback label="Tên đối tác" name="name">
        <a-input v-model:value="formState.name" />
      </a-form-item>

      <a-form-item has-feedback label="Logo" name="logoFile">
        <image-picker
          :src="formState.logo ? [formState.logo] : null"
          width="50%"
          @change="selectImage"
        />
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 14, offset: 4 }" class="hidden">
        <a-button ref="btnEditRef" type="primary" html-type="submit">Lưu</a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { defineComponent, defineEmits, defineProps, ref, toRef, watch } from 'vue'
import { defEmptyPartnerName, defEmptyPartnerLogo } from '~/modules/formRule'
import { isNil, cloneDeep } from 'lodash'
import ImagePicker from '~/components/ImagePicker.vue'
import { useSitePartnerStore } from '~/stores/siteManagement/sitePartner'

// Emits
const emits = defineEmits(['close'])

// Props
const props = defineProps({
  isShowModal: {
    type: Boolean,
    required: false,
    default: false
  },
  partner: {
    type: Object,
    default: null
  }
})
const isShowModalProp = toRef(props, 'isShowModal')
const partnerProp = toRef(props, 'partner')

// Store
const sitePartnerStore = useSitePartnerStore()

// State
const initialFormState = {
  id: null,
  name: '',
  logo: '',
  logoFile: null
}
const formRules = {
  name: [{ required: true, validator: defEmptyPartnerName, trigger: 'change' }],
  logoFile: [{ required: true, validator: defEmptyPartnerLogo, trigger: 'change' }]
}
let btnEditRef = ref()
let formRef = ref()
const isEdit = ref(false)
const formState = ref(initialFormState)

// Methods
const formSubmit = () => {
  const { id, name, logoFile } = formState.value

  const formData = new FormData()
  if (id) formData.append('id', id)
  formData.append('name', name)
  formData.append('logoFile', logoFile)

  sitePartnerStore.upsertPartner(formData)
  reset()
  emits('close')
}
const submit = () => btnEditRef.value.$el.click()
const reset = () => {
  formState.value = cloneDeep(initialFormState)
  formRef.value.resetFields()
}
const selectImage = (data) => {
  console.log(data)
  const { src, file } = data
  formState.value.logo = src
  formState.value.logoFile = file
}

// Watcher
watch(
  partnerProp,
  (newProp) => {
    isEdit.value = !isNil(newProp)
    if (isEdit.value) formState.value = cloneDeep(newProp)
    else reset()
  },
  { deep: true }
)
</script>

<script>
export default defineComponent({
  components: { ImagePicker }
})
</script>
