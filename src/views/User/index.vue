<template>
  <section>
    <heading title="Danh sách nhân viên">
      <div class="flex items-center">
        <a-input-search
          v-model:value="search"
          placeholder="Tìm kiếm ..."
          class="mr-4 w-[400px]"
          @keypress.enter="init"
        />

        <a-button type="primary" class="flex items-center" @click="isShowCreateUserModal = true">
          <Iconify icon="mdi:plus-circle" width="16px" />
          <span class="ml-2">Tạo tài khoản</span>
        </a-button>
      </div>
    </heading>

    <a-table :columns="USER_TABLE_COLUMNS" :data-source="userStore.allUser" class="mt-8">
      <template #headerCell="{ title, column }">
        <template v-if="column.key === 'role'">
          <div class="flex items-center">
            <a-popover trigger="click" placement="bottom">
              <template #content>
                <a-checkbox-group
                  v-model:value="role"
                  :options="userStore.roleOptions"
                  class="flex flex-col"
                  @change="init"
                />
              </template>
              <Iconify icon="mdi:filter" class="cursor-pointer outline-none" width="14px" />
            </a-popover>
            <span class="ml-4">{{ title }}</span>
          </div>
        </template>
        <template v-if="column.key === 'status'">
          <div class="flex items-center">
            <a-popover trigger="click" placement="bottom">
              <template #content>
                <a-checkbox-group
                  v-model:value="status"
                  :options="statusOptions"
                  class="flex flex-col"
                  @change="init"
                />
              </template>
              <Iconify icon="mdi:filter" class="cursor-pointer outline-none" width="14px" />
            </a-popover>
            <span class="ml-4">{{ title }}</span>
          </div>
        </template>
      </template>

      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'no'">{{ index + 1 }}</template>
        <template v-if="column.key === 'fullName'">
          <div class="flex items-center">
            <image-viewer scope="avatar" :avatar-size="32" :src="record.avatar" />
            <span class="ml-2 font-medium">{{ record.fullName }}</span>
          </div>
        </template>
        <template v-if="column.key === 'branch'">
          {{ record.branch ? record.branch.name : 'Tất cả chi nhánh' }}
        </template>
        <template v-if="column.key === 'role'">
          <span class="">{{ record.role.name }}</span>
        </template>
        <template v-if="column.key === 'status'">
          <a-tag v-if="record.status === USER_STATUS.ACTIVE" color="success">Đã kích hoạt</a-tag>
          <a-tag v-if="record.status === USER_STATUS.BLOCKED" color="error">Đã bị khoá</a-tag>
        </template>
        <template v-if="column.key === 'createdBy'">
          <div v-if="record.createdBy" class="mb-1 flex items-center">
            <Iconify icon="mdi:account" />
            <span class="ml-2">{{ record.createdBy }}</span>
          </div>
          <div class="mb-0 text-base text-gray-600 italic flex items-center">
            <Iconify icon="mdi:clock-time-four" width="13px" />
            <span class="ml-2">{{ moment.mFormat(record.createdAt) }}</span>
          </div>
        </template>
        <template v-else-if="column.key === 'action'">
          <div>
            <a-button type="link" @click="openModal(record)"> Cập nhật </a-button>
            <a-popconfirm
              title="Bạn có chắc muốn xoá khách hàng này không?"
              ok-text="Có"
              cancel-text="Không"
              @confirm="deleteUser(record.id)"
            >
              <a-button type="text" danger class="ml-4"> Xoá </a-button>
            </a-popconfirm>
          </div>
        </template>
      </template>
    </a-table>

    <create-user-modal
      v-if="isShowCreateUserModal"
      @ok="createUser"
      @close="isShowCreateUserModal = false"
    />
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useMessage, useMoment } from '~/composables'
import { MSG, USER_STATUS } from '~/modules/constant'
import { USER_TABLE_COLUMNS } from '~/modules/table'
import { useUserStore } from '~/stores/user'

// Store
const mc = useMessage()
const moment = useMoment()
const userStore = useUserStore()

// State
const statusOptions = [
  { label: 'Đã kích hoạt', value: USER_STATUS.ACTIVE },
  { label: 'Đã bị khoá', value: USER_STATUS.BLOCKED }
]
const search = ref('')
const status = ref([])
const role = ref([])
const isShowCreateUserModal = ref(false)

// Methods
const init = async () => {
  await userStore.getAll({
    search: search.value,
    status: status.value.join(','),
    role: role.value.join(',')
  })
}
const createUser = async (payload) => {
  try {
    await userStore.create(payload)
    await init()

    isShowCreateUserModal.value = false
    mc.success(MSG.SAVE_SUCCESS)
  } catch (error) {
    console.log(error)
    mc.error(MSG.SAVE_FAILED)
  }
}
const deleteUser = async (id) => {
  try {
    await userStore.del(id)
    await init()

    mc.success(MSG.DELETE_SUCCESS)
  } catch (error) {
    mc.error(MSG.DELETE_FAILED)
  }
}

// Hooks
onMounted(async () => {
  await init()
  await userStore.getAllRole()
})
</script>
