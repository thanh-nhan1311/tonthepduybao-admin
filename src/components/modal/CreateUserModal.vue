<template>
  <a-modal
    v-model:visible="visible"
    centered
    width="50vw"
    title="Tạo tài khoản nhân viên"
    ok-text="Tạo"
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
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
      }"
      @finish="
        emits('ok', {
          fullName: formState.fullName,
          username: formState.username,
          password: formState.password,
          branchId: formState.branchId
        })
      "
    >
      <a-form-item has-feedback label="Họ và tên" name="fullName">
        <a-input v-model:value="formState.fullName" />
      </a-form-item>

      <a-form-item has-feedback label="Tên đăng nhập" name="username">
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item has-feedback label="Mật khẩu" name="password">
        <a-input v-model:value="formState.password" type="password" />
      </a-form-item>

      <a-form-item has-feedback label="Xác nhận" name="confirmPassword">
        <a-input v-model:value="formState.confirmPassword" type="password" />
      </a-form-item>

      <a-form-item has-feedback label="Chi nhánh" name="branchId">
        <a-select
          v-model:value="formState.branchId"
          placeholder="Chọn chi nhánh"
          :options="branchStore.branchOptions"
        />
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 14, offset: 6 }" class="hidden">
        <a-button ref="btnSubmitRef" type="primary" html-type="submit">Lưu</a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import {
  defEmptyBranch,
  defEmptyFullName,
  defEmptyPassword,
  defEmptyUsername
} from '~/modules/formRule'
import { useBranchStore } from '~/stores/branch'

const emits = defineEmits(['ok', 'close'])

// Store
const branchStore = useBranchStore()

// State
const formRules = {
  fullName: [{ required: true, validator: defEmptyFullName, trigger: 'change' }],
  username: [
    { required: true, validator: defEmptyUsername, trigger: 'change' },
    {
      pattern: '^[a-z0-9]*$',
      message: 'Tên đăng nhập chỉ được nhập chữ hoặc số'
    }
  ],
  password: [{ required: true, validator: defEmptyPassword, trigger: 'change' }],
  confirmPassword: [
    {
      required: true,
      validator: async (_rule, value) => {
        if (!value) return Promise.reject('Xác nhận mật khẩu là trường bắt buộc.')
        else if (formState.value.password !== value)
          return Promise.reject('Xác nhận mật khẩu không khớp.')
        else Promise.resolve()
      },
      trigger: 'change'
    }
  ],
  branchId: [{ required: true, validator: defEmptyBranch, trigger: 'change' }]
}
let btnSubmitRef = ref()
let formRef = ref()
const visible = ref(true)
const formState = ref({
  fullName: '',
  username: '',
  password: '',
  confirmPassword: '',
  branchId: null
})

// Methods
const submit = () => btnSubmitRef.value.$el.click()

// Hooks
onMounted(async () => {
  await branchStore.getBranchOptions()
})
</script>
