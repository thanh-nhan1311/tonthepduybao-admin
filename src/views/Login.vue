<template>
  <main class="flex justify-center items-center w-screen h-screen bg-gray-100">
    <a-row class="w-full flex justify-center">
      <a-col :span="6" class="bg-white p-8 rounded-md">
        <div class="w-full flex justify-center mb-10">
          <a-image src="/img/logo.png" :width="200" :preview="false" />
        </div>
        <a-input
          v-model:value="formState.username"
          placeholder="Tên đăng nhập"
          class="mb-2"
          @keypress.enter="login"
        >
          <template #prefix>
            <user-outlined />
          </template>
        </a-input>
        <a-input-password
          v-model:value="formState.password"
          placeholder="Mật khẩu"
          class="mb-2"
          @keypress.enter="login"
        >
          <template #prefix>
            <key-outlined />
          </template>
        </a-input-password>

        <div class="w-full mb-4">
          <a-select
            v-model:value="formState.branchId"
            placeholder="Chọn chi nhánh"
            class="w-full"
            :options="branchStore.allBranchOptions"
          />
        </div>

        <div class="w-full flex justify-center">
          <a-button type="primary" @click="login">Đăng nhập</a-button>
        </div>
      </a-col>
    </a-row>
  </main>
</template>

<script setup>
import { defineComponent, onMounted, ref } from 'vue'
import { UserOutlined, KeyOutlined } from '@ant-design/icons-vue'
import { useAuthStore } from '~/stores/auth'
import { useBranchStore } from '~/stores/branch'

// Store
const authStore = useAuthStore()
const branchStore = useBranchStore()

// State
const formState = ref({
  username: '',
  password: '',
  branchId: -1
})

// Methods
const login = async () => {
  const { username, password, branchId } = formState.value

  await authStore.login({
    username,
    password,
    branchId: branchId === -1 ? null : branchId
  })
}

// Hooks
onMounted(async () => {
  await branchStore.getAll()
})
</script>

<script>
export default defineComponent({
  components: { UserOutlined, KeyOutlined }
})
</script>
