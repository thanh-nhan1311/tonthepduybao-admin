<template>
  <section v-if="me" class="profile-page px-32">
    <div class="flex">
      <div class="mr-20 min-w-[200px]">
        <image-viewer scope="avatar" :has-prefix="true" :src="me.avatar" />

        <button
          class="outline-none border-none bg-transparent flex items-center mt-8 text-blue-500 cursor-pointer"
          @click="avatarRef.click()"
        >
          <Iconify icon="material-symbols:upload" width="16px" />
          <span class="ml-2">Cập nhật ảnh đại diện</span>
        </button>
        <input
          ref="avatarRef"
          type="file"
          class="hidden"
          accept=".jpeg,.jpg,.png"
          @change="updateAvatar"
        />
      </div>

      <div class="border border-solid border-slate-300 w-full rounded-md">
        <div class="flex items-center justify-between py-4 px-8 bg-slate-100">
          <span class="font-semibold text-slate-800">Thông tin tài khoản</span>

          <div class="flex items-center">
            <a-button
              v-if="authStore.isAdmin"
              type="link"
              class="w-fit flex items-center px-0"
              @click="isShowSystemLogModal = true"
            >
              <Iconify icon="material-symbols:download" width="16px" />
              <span class="ml-2">Tải log</span>
            </a-button>
            <a-button
              v-if="!isEdit"
              type="link"
              class="w-fit flex items-center px-0 ml-16"
              @click="isEdit = true"
            >
              <Iconify icon="lucide:edit" width="14px" />
              <span class="ml-2">Sửa</span>
            </a-button>
          </div>
        </div>

        <div class="px-8 py-4">
          <a-form
            ref="formRef"
            :model="formState"
            :rules="formRules"
            v-bind="{
              labelCol: { span: 4 },
              wrapperCol: { span: 18 }
            }"
            :class="['profile-page__form', isEdit && 'editing']"
            @finish="formSubmit"
          >
            <a-form-item>
              <template #label>
                <Iconify icon="ic:baseline-login" />
                <span class="ml-2">Tên đăng nhập</span>
              </template>

              <span class="font-medium">{{ me.username }}</span>
            </a-form-item>

            <a-form-item>
              <template #label>
                <Iconify icon="solar:key-bold" />
                <span class="ml-2">Vai trò</span>
              </template>

              <span class="font-medium">{{ me.role.name }}</span>
            </a-form-item>

            <a-form-item>
              <template #label>
                <Iconify icon="mdi:store-marker-outline" />
                <span class="ml-2">Chi nhánh</span>
              </template>

              <span class="font-medium">{{ me.role.name }}</span>
            </a-form-item>

            <a-form-item name="fullName">
              <template #label>
                <Iconify icon="mdi:user" />
                <span class="ml-2">Họ và tên</span>
              </template>

              <span v-if="!isEdit" class="font-medium">{{ me.fullName }}</span>
              <a-input v-else v-model:value="formState.fullName" />
            </a-form-item>

            <a-form-item name="phone">
              <template #label>
                <Iconify icon="mdi:phone" />
                <span class="ml-2">Số điện thoại</span>
              </template>

              <span v-if="!isEdit" :class="[me.phone ? 'font-medium' : 'text-gray-400 italic']">
                {{ me.phone || 'Vui lòng thêm số điện thoại' }}
              </span>
              <a-input v-else v-model:value="formState.phone" />
            </a-form-item>

            <a-form-item name="email">
              <template #label>
                <Iconify icon="mdi:email" />
                <span class="ml-2">Email</span>
              </template>

              <span v-if="!isEdit" :class="[me.email ? 'font-medium' : 'text-gray-400 italic']">
                {{ me.email || 'Vui lòng thêm email' }}
              </span>
              <a-input v-else v-model:value="formState.email" />
            </a-form-item>

            <a-form-item name="address">
              <template #label>
                <Iconify icon="mdi:address-marker" />
                <span class="ml-2">Địa chỉ</span>
              </template>

              <span v-if="!isEdit" :class="[me.address ? 'font-medium' : 'text-gray-400 italic']">
                {{ me.address || 'Vui lòng thêm địa chỉ' }}
              </span>
              <a-input v-else v-model:value="formState.address" />
            </a-form-item>

            <a-form-item :wrapper-col="{ span: 18, offset: 4 }">
              <div v-if="isEdit" class="mt-8">
                <a-button type="default" class="px-20" @click="initForm">Huỷ bỏ</a-button>
                <a-button type="primary" class="px-20 ml-4" html-type="submit">Lưu</a-button>
              </div>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>

    <system-log-modal
      v-if="isShowSystemLogModal"
      @ok="downloadSystemLog"
      @close="isShowSystemLogModal = false"
    />
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useMessage } from '~/composables'
import { MSG } from '~/modules/constant'
import { defEmptyAddress, defEmptyEmail, defEmptyFullName, defEmptyPhone } from '~/modules/formRule'
import { downloadFromResponse } from '~/modules/utils'
import { useAuthStore } from '~/stores/auth'
import { useSystemLogStore } from '~/stores/systemLog'
import { useUserStore } from '~/stores/user'

// Store
const mc = useMessage()
const authStore = useAuthStore()
const userStore = useUserStore()
const systemLogStore = useSystemLogStore()

// State
const formRules = {
  fullName: [{ required: true, validator: defEmptyFullName, trigger: 'change' }],
  phone: [
    { required: true, validator: defEmptyPhone, trigger: 'change' },
    { pattern: '^[0][0-9]{8,11}$', message: 'Số điện thoại không hợp lệ' }
  ],
  email: [
    { required: true, validator: defEmptyEmail, trigger: 'change' },
    { type: 'email', message: 'Email không hợp lệ' }
  ],
  address: [{ required: true, validator: defEmptyAddress, trigger: 'change' }]
}
const formState = ref({
  fullName: '',
  phone: '',
  email: '',
  address: ''
})
const isEdit = ref(false)
const isShowSystemLogModal = ref(false)
const formRef = ref()
const avatarRef = ref()

const me = computed(() => userStore.me)

// Methods
const updateAvatar = async (event) => {
  const files = event.target.files
  if (files && files.length !== 0) {
    const formData = new FormData()
    formData.append('avatar', files[0])

    await userStore.updateAvatar(formData)
    authStore.updateCurrentUser(me.value)
  }
}
const initForm = () => {
  formRef.value.resetFields()
  formState.value = {
    fullName: me.value.fullName,
    phone: me.value.phone,
    email: me.value.email,
    address: me.value.address
  }
  isEdit.value = false
}
const formSubmit = async () => {
  try {
    await userStore.update(formState.value)
    authStore.updateCurrentUser(me.value)

    initForm()

    mc.success(MSG.UPDATE_SUCCESS)
  } catch (error) {
    mc.error(MSG.UPDATE_FAILED)
  }
}
const downloadSystemLog = async (payload) => {
  try {
    const { headers, data } = await systemLogStore.download(payload)
    downloadFromResponse(headers, data)

    mc.success(MSG.DOWNLOAD_SUCCESS)
    isShowSystemLogModal.value = false
  } catch (error) {
    mc.error(MSG.DOWNLOAD_FAILED)
    isShowSystemLogModal.value = false
  }
}

// Hooks
onMounted(async () => {
  await userStore.getMe()
  initForm()
})
</script>

<style lang="scss">
@import './style.scss';
</style>
