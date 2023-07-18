<template>
  <a-modal
    v-model:visible="visible"
    centered
    width="32vw"
    title="Tạo tài khoản nhân viên"
    ok-text="Tạo"
    cancel-text="Đóng"
    @ok="submit"
    @cancel="emits('close')"
  >
    <a-form
      ref="formRef"
      name="custom-validation"
      layout="vertical"
      :model="formState"
      :rules="formRules"
      @finish="
        emits('ok', {
          username: formState.username,
          password: formState.password,
          branchId: formState.branchId,
          roleId: formState.roleId
        })
      "
    >
      <a-form-item has-feedback label="Tên đăng nhập" name="username">
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <div class="grid grid-cols-2 gap-x-8 mt-4">
        <a-form-item has-feedback label="Mật khẩu" name="password">
          <a-input v-model:value="formState.password" type="password" />
        </a-form-item>

        <a-form-item has-feedback label="Xác nhận" name="confirmPassword">
          <a-input v-model:value="formState.confirmPassword" type="password" />
        </a-form-item>
      </div>

      <div class="grid grid-cols-2 gap-x-8 mt-4">
        <a-form-item has-feedback label="Vai trò" name="roleId">
          <a-select
            v-model:value="formState.roleId"
            placeholder="Chọn vai trò"
            :options="userStore.roleOptions"
          />
        </a-form-item>

        <a-form-item has-feedback label="Chi nhánh" name="branchId">
          <a-select
            v-model:value="formState.branchId"
            placeholder="Chọn chi nhánh"
            :options="branchStore.branchOptions"
          />
        </a-form-item>
      </div>

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
  defEmptyPassword,
  defEmptyRole,
  defEmptyUsername
} from '~/modules/formRule'
import { useBranchStore } from '~/stores/branch'
import { useUserStore } from '~/stores/user'

const emits = defineEmits(['ok', 'close'])

// Store
const userStore = useUserStore()
const branchStore = useBranchStore()

// State
const formRules = {
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
  branchId: [{ required: true, validator: defEmptyBranch, trigger: 'change' }],
  roleId: [{ required: true, validator: defEmptyRole, trigger: 'change' }]
}
let btnSubmitRef = ref()
let formRef = ref()
const visible = ref(true)
const formState = ref({
  username: '',
  password: '',
  confirmPassword: '',
  branchId: null,
  roleId: null
})

// Methods
const submit = () => btnSubmitRef.value.$el.click()

// Hooks
onMounted(async () => {
  await branchStore.getAll()
})
</script>
