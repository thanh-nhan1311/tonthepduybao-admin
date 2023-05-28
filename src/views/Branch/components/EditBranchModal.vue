<template>
  <a-modal
    v-model:visible="isShowModal"
    centered
    width="50vw"
    :title="`Sửa thông tin chi nhánh - Cập nhật lúc: ${moment.mFormat(formState.updatedAt)}`"
    ok-text="Chỉnh sửa"
    cancel-text="Đóng"
    @ok="submit"
    @cancel="emits('close', null)"
  >
    <a-form
      ref="formRef"
      name="custom-validation"
      :model="formState"
      :rules="formRules"
      v-bind="{
        labelCol: { span: 4 },
        wrapperCol: { span: 18 }
      }"
      @finish="formSubmit"
      @validate="validate"
      @finish-failed="submitError"
    >
      <a-form-item has-feedback label="Tên chi nhánh" name="name">
        <a-input v-model:value="formState.name" />
      </a-form-item>

      <a-form-item has-feedback label="Số điện thoại" name="phone" :wrapper-col="{ span: 10 }">
        <a-input v-model:value="formState.phone" />
      </a-form-item>
      <a-form-item has-feedback label="Zalo" name="zalo" :wrapper-col="{ span: 10 }">
        <a-input v-model:value="formState.zalo" />
      </a-form-item>

      <a-form-item has-feedback label="Người đại diện" name="manager" :wrapper-col="{ span: 18 }">
        <a-input v-model:value="formState.manager" />
      </a-form-item>

      <a-form-item has-feedback label="Địa chỉ" name="address">
        <a-input v-model:value="formState.address" />
      </a-form-item>
      <a-form-item has-feedback label="Google Map URL" name="mapUrl">
        <a-input v-model:value="formState.mapUrl" />
      </a-form-item>
      <a-form-item has-feedback label="Google Map Embed" name="mapEmbedUrl">
        <a-input v-model:value="formState.mapEmbedUrl" :class="formState.mapEmbedUrl && 'mb-2'" />
        <iframe
          v-if="formState.mapEmbedUrl"
          :src="formState.mapEmbedUrl"
          width="100%"
          height="240"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 14, offset: 4 }" class="hidden">
        <a-button ref="btnEditRef" type="primary" html-type="submit">Chỉnh sửa</a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { ref, toRef, watch } from 'vue'
import {
  defEmptyBranchName,
  defEmptyAddress,
  defEmptyPhone,
  defEmptyManager
} from '~/modules/formRule'
import { useBranchStore } from '~/stores/branch'
import { useMoment } from '~/composables'
import { isNil, cloneDeep } from 'lodash'

// Emits
const emits = defineEmits(['close'])

// Props
const props = defineProps({
  branch: {
    type: Object,
    required: true
  }
})
const branchProp = toRef(props, 'branch')
// Store
const branchStore = useBranchStore()

// Composition API
const moment = useMoment()

// State
const initialFormState = {
  id: null,
  name: '',
  phone: '',
  zalo: '',
  manager: '',
  address: '',
  mapUrl: '',
  mapEmbedUrl: '',
  status: '',
  createdAt: '',
  updatedAt: ''
}
const formRules = {
  name: [{ required: true, validator: defEmptyBranchName, trigger: 'change' }],
  address: [{ required: true, validator: defEmptyAddress, trigger: 'change' }],
  phone: [{ required: true, validator: defEmptyPhone, trigger: 'change' }],
  manager: [{ required: true, validator: defEmptyManager, trigger: 'change' }]
}
const isShowModal = ref(false)
let btnEditRef = ref()
let formRef = ref()
const formState = ref(initialFormState)

// Methods
const formSubmit = () => {
  branchStore.upsertBranch(formState.value)
  formRef.value.resetFields()
  emits('close', null)
}
const submit = () => btnEditRef.value.$el.click()
const submitError = () => {}
const validate = () => {}

// Watcher
watch(
  branchProp,
  (newValue) => {
    isShowModal.value = !isNil(newValue)
    formState.value = cloneDeep(newValue) || initialFormState
  },
  { deep: true }
)
</script>
