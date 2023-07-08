<template>
  <a-modal
    v-model:visible="visible"
    centered
    width="50vw"
    :title="`${isEdit ? 'Sửa' : 'Thêm'} thông tin khách hàng`"
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
      v-bind="{
        labelCol: { span: 4 },
        wrapperCol: { span: 18 }
      }"
      @finish="formSubmit"
    >
      <a-form-item has-feedback label="Tên khách hàng" name="name">
        <a-input v-model:value="formState.name" />
      </a-form-item>

      <a-form-item has-feedback label="Phân loại" name="type">
        <a-radio-group v-model:value="formState.type" :options="customerTypeOptions" />
      </a-form-item>

      <div v-for="(item, index) in formState.phone" :key="index" class="flex mb-2">
        <a-form-item
          :label="`Số điện thoại ${index + 1}`"
          :name="[index]"
          :wrapper-col="{ span: 8 }"
          class="w-full mb-2"
        >
          <div class="flex items-center">
            <a-input v-model:value="formState.phone[index]" />
            <Iconify
              icon="uil:times"
              class="text-red-500 cursor-pointer"
              width="24px"
              @click="formState.phone.splice(index, 1)"
            />
          </div>
        </a-form-item>
      </div>
      <a-form-item class="" :wrapper-col="{ span: 8, offset: 4 }">
        <a-button
          type="dashed"
          block
          class="flex items-center justify-center"
          @click="formState.phone.push('')"
        >
          <Iconify icon="ic:round-plus" width="24px" />
          Thêm số điện thoại
        </a-button>
      </a-form-item>

      <a-form-item has-feedback label="Email" name="email">
        <a-input v-model:value="formState.email" />
      </a-form-item>

      <a-form-item has-feedback label="Địa chỉ" name="address">
        <a-input v-model:value="formState.address" />
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 14, offset: 4 }" class="hidden">
        <a-button ref="btnSubmitRef" type="primary" html-type="submit">Lưu</a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { ref, toRef, onMounted } from 'vue'
import { defEmptyCustomerName, defEmptyCustomerType } from '~/modules/formRule'
import { isNil, cloneDeep } from 'lodash'
import { useCustomerStore } from '~/stores/customer'
import { CUSTOMER_TYPE } from '~/modules/constant'

const emits = defineEmits(['close'])
const props = defineProps({
  customer: {
    type: Object,
    required: true
  }
})
const customerProp = toRef(props, 'customer')

// Store
const customerStore = useCustomerStore()

// State
const customerTypeOptions = [
  { label: 'Khách hàng', value: CUSTOMER_TYPE.CUSTOMER },
  { label: 'Nhà cung cấp', value: CUSTOMER_TYPE.SUPPLIER }
]
const visible = ref(true)
const initialFormState = {
  id: null,
  name: '',
  type: CUSTOMER_TYPE.CUSTOMER,
  phone: [],
  email: '',
  address: '',
  updatedAt: ''
}
const formRules = {
  name: [{ required: true, validator: defEmptyCustomerName, trigger: 'change' }],
  type: [{ required: true, validator: defEmptyCustomerType, trigger: 'change' }]
}
let btnSubmitRef = ref()
let formRef = ref()
const isEdit = ref(false)
const formState = ref(initialFormState)

// Methods
const formSubmit = async () => {
  const phone =
    formState.value.phone && formState.value.phone.length !== 0
      ? formState.value.phone.join(',')
      : ''
  const payload = {
    ...formState.value,
    phone
  }
  await customerStore.upsert(payload)
  reset()
  emits('close')
}
const submit = () => btnSubmitRef.value.$el.click()
const reset = () => {
  formState.value = cloneDeep(initialFormState)
  formRef.value.resetFields()
}

// Hooks
onMounted(() => {
  isEdit.value = !isNil(customerProp.value)
  if (isEdit.value) formState.value = cloneDeep(customerProp.value)
  else reset()
})
</script>
