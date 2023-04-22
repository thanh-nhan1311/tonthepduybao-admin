<template>
  <main class="flex justify-center items-center w-screen h-screen bg-gray-100">
    <a-row class="w-full flex justify-center">
      <a-col :span="6" class="bg-white p-8 rounded-md">
        <div class="w-full flex justify-center mb-10">
          <a-image src="/img/logo.png" :width="200" :preview="false" />
        </div>
        <a-input
          ref="usernameRef"
          v-model:value="userLogin.username"
          placeholder="Tên đăng nhập"
          class="mb-2"
          @keypress.enter="authStore.login(userLogin)"
        >
          <template #prefix>
            <user-outlined />
          </template>
        </a-input>
        <a-input-password
          v-model:value="userLogin.password"
          placeholder="Mật khẩu"
          class="mb-2"
          @keypress.enter="authStore.login(userLogin)"
        >
          <template #prefix>
            <key-outlined />
          </template>
        </a-input-password>

        <div class="w-full mb-4">
          <a-select
            v-model:value="selectedBranch"
            placeholder="Chọn chi nhánh"
            style="width: 100%"
            :options="branchStore.branchOptions"
            @change="selectBranch"
          />
        </div>

        <div class="w-full flex justify-center">
          <a-button type="primary" @click="authStore.login(userLogin)">Đăng nhập</a-button>
        </div>
      </a-col>
    </a-row>
  </main>
</template>

<script setup>
import { defineComponent, reactive, ref, onMounted } from 'vue'
import { UserOutlined, KeyOutlined } from '@ant-design/icons-vue'
import { useAuthStore } from '~/stores/auth'
import { useBranchStore } from '~/stores/branch'
import { ALL_BRANCH_OPTION } from '~/modules/constant'

// Store
const branchStore = useBranchStore()
const authStore = useAuthStore()

// State
const usernameRef = ref()
const selectedBranch = ref(ALL_BRANCH_OPTION.value)
const userLogin = reactive({
  username: '',
  password: '',
  branchId: null
})

// Function
const selectBranch = (value) => {
  selectedBranch.value = value
}

onMounted(() => {
  const childrens = usernameRef.value.$el.children
  for (let child of childrens) {
    if (child.tagName.toLowerCase() === 'input') {
      child.focus()
    }
  }

  branchStore.getBranchOptions()
})
</script>

<script>
export default defineComponent({
  components: { UserOutlined, KeyOutlined }
})
</script>
