<template>
  <a-modal
    v-model:visible="visible"
    centered
    width="30vw"
    :title="`${isEdit ? 'Sửa' : 'Thêm'} thông tin giao hàng`"
    ok-text="Lưu"
    cancel-text="Đóng"
    @ok="submit"
    @cancel="emits('close')"
  >
    <a-form
      ref="formRef"
      name="custom-validation"
      :model="formState"
      :rules="formRules"
      layout="vertical"
      @finish="formSubmit"
    >
      <a-form-item has-feedback label="Tên người nhận" name="name">
        <a-input v-model:value="formState.name" />
      </a-form-item>

      <a-form-item has-feedback label="Số điện thoại" name="phone">
        <a-input v-model:value="formState.phone" />
      </a-form-item>

      <a-form-item has-feedback label="Địa chỉ" name="address">
        <a-input v-model:value="formState.address" />
      </a-form-item>

      <a-form-item has-feedback name="defaultAddress">
        <a-checkbox v-model:checked="formState.defaultAddress">Đặt làm địa chỉ mặc định</a-checkbox>
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 14, offset: 4 }" class="hidden">
        <a-button ref="btnSubmitRef" type="primary" html-type="submit">Lưu</a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { cloneDeep, isNil } from 'lodash'
import { onMounted, ref, toRef } from 'vue'
import { PROP_DEF } from '~/modules/constant'
import { defEmptyAddress, defEmptyCustomerName, defEmptyPhone } from '~/modules/formRule'

const emits = defineEmits(['submit', 'close'])
const props = defineProps({
  customerId: PROP_DEF.NUMBER_REQUIRED,
  shippingAddress: PROP_DEF.OBJECT
})
const shippingAddressProp = toRef(props, 'shippingAddress')

// State
const visible = ref(true)
const initialFormState = {
  id: null,
  name: '',
  phone: '',
  address: '',
  defaultAddress: false
}
const formRules = {
  name: [{ required: true, validator: defEmptyCustomerName, trigger: 'change' }],
  phone: [{ required: true, validator: defEmptyPhone, trigger: 'change' }],
  address: [{ required: true, validator: defEmptyAddress, trigger: 'change' }]
}
let btnSubmitRef = ref()
let formRef = ref()
const isEdit = ref(false)
const formState = ref(initialFormState)

// Methods
const formSubmit = async () => {
  emits('submit', formState.value)
}
const submit = () => btnSubmitRef.value.$el.click()
const reset = () => {
  formState.value = cloneDeep(initialFormState)
  formRef.value.resetFields()
}

// Hooks
onMounted(() => {
  isEdit.value = !isNil(shippingAddressProp.value)
  if (isEdit.value) formState.value = cloneDeep(shippingAddressProp.value)
  else reset()
})
</script>
