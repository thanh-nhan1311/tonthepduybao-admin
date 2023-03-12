import { cloneDeep } from 'lodash'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

const getNameRule = async (_rule, value) => {
  if (!value || value.length > 255)
    return Promise.reject('Tên chi nhánh không được để trống và vượt quá 255 kí tự')
  return Promise.resolve()
}

const getAddressRule = async (_rule, value) => {
  if (!value || value.length > 1000)
    return Promise.reject('Địa chỉ không được để trống và vượt quá 1000 kí tự')
  return Promise.resolve()
}

const getPhoneRule = async (_rule, value) => {
  if (!value || value.length > 20)
    return Promise.reject('Số điện thoại không được để trống và vượt quá 20 kí tự')
  return Promise.resolve()
}

const getManagerRule = async (_rule, value) => {
  if (!value || value.length > 255)
    return Promise.reject('Tên người đại diện không được để trống và vượt quá 255 kí tự')
  return Promise.resolve()
}

export default () => {
  // State
  let formRef = ref()
  let formState = reactive({
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
  })

  // Action
  const formRules = {
    name: [{ required: true, validator: getNameRule, trigger: 'change' }],
    address: [{ required: true, validator: getAddressRule, trigger: 'change' }],
    phone: [{ required: true, validator: getPhoneRule, trigger: 'change' }],
    manager: [{ required: true, validator: getManagerRule, trigger: 'change' }]
  }

  const setState = (data) => (formState = cloneDeep(data))

  const reset = () => formRef.value.resetFields()
  const submit = () => {}
  const submitError = () => {}
  const validate = () => {}

  return { formRef, formState, formRules, setState, reset, submit, submitError, validate }
}
