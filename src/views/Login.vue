<template>
  <main class="flex justify-center items-center w-screen h-screen bg-gray-100">
    <a-row class="w-full flex justify-center">
      <a-col :span="6" class="bg-white p-8 rounded-md">
        <div class="w-full flex justify-center mb-10">
          <a-image src="/img/logo.png" :width="200" />
        </div>
        <a-input
          ref="refUsername"
          v-model:value="userLogin.username"
          placeholder="Tên đăng nhập"
          class="mb-2"
          @keypress.enter="authComposition.login(userLogin)"
        >
          <template #prefix>
            <user-outlined />
          </template>
        </a-input>
        <a-input-password
          v-model:value="userLogin.password"
          placeholder="Mật khẩu"
          class="mb-2"
          @keypress.enter="authComposition.login(userLogin)"
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
          <a-button type="primary" @click="authComposition.login(userLogin)">Đăng nhập</a-button>
        </div>
      </a-col>
    </a-row>
  </main>
</template>

<script>
import { defineComponent, reactive, ref, computed } from 'vue'
import { UserOutlined, KeyOutlined } from '@ant-design/icons-vue'
import { useAuth } from '~/compositions'
import { useBranchStore } from '~/stores/branch'
import { ALL_BRANCH_OPTION } from '~/modules/constant'

export default defineComponent({
  components: { UserOutlined, KeyOutlined },
  setup() {
    // Composition
    const branchStore = useBranchStore()
    const authComposition = useAuth()

    // Computed
    const branchOptions = computed(() => branchStore.branchOptions)

    // Data
    const selectedBranch = ref(ALL_BRANCH_OPTION.value)
    const userLogin = reactive({
      username: '',
      password: '',
      branchId: null
    })

    // Function
    function selectBranch(value) {
      selectedBranch.value = value
    }
    return {
      authComposition,
      branchStore,

      branchOptions,
      selectedBranch,
      userLogin,
      selectBranch
    }
  },
  mounted() {
    // Auto focus
    this.$refs.refUsername.focus()
    this.branchStore.getBranchOptions()
  }
})
</script>
