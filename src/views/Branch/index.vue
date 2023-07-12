<template>
  <section>
    <heading title="Danh sách chi nhánh"></heading>

    <a-table :columns="BRANCH_TABLE_COLUMNS" :data-source="branchStore.allBranch">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <div>
            <h3 class="mb-1">{{ record.name }}</h3>
            <a :href="record.mapUrl" target="_blank" rel="noopener noreferrer">
              {{ record.address }}
            </a>
          </div>
        </template>
        <template v-else-if="column.key === 'phone' || column.key === 'zalo'">
          <a :href="`tel:${record.phone}`" target="_blank" rel="noopener noreferrer">
            {{ record.phone }}
          </a>
        </template>
        <template v-else-if="column.key === 'status'">
          <a-tag :color="record.status === BRANCH_STATUS.ACTIVE ? 'green' : 'error'">
            {{ record.status === BRANCH_STATUS.ACTIVE ? 'Đang hoạt động' : 'Ngưng hoạt động' }}
          </a-tag>
        </template>
        <template v-else-if="column.key === 'action'">
          <div>
            <a-button v-if="!record.resolvedFlag" type="link" @click="selectedBranch = record">
              Sửa
            </a-button>
            <a-button
              :type="record.status === BRANCH_STATUS.ACTIVE ? 'text' : 'link'"
              :danger="record.status === BRANCH_STATUS.ACTIVE"
              class="ml-4"
              @click="updateBranchStatus(record)"
            >
              {{ record.status === 'ACTIVE' ? 'Tạm ngưng' : 'Kích hoạt' }}
            </a-button>
          </div>
        </template>
      </template>
    </a-table>

    <edit-branch-modal :branch="selectedBranch" @close="closeModal" />
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useMessage } from '~/composables'
import { BRANCH_STATUS, MSG } from '~/modules/constant'
import { BRANCH_TABLE_COLUMNS } from '~/modules/table'
import { useBranchStore } from '~/stores/branch'

// Store
const mc = useMessage()
const branchStore = useBranchStore()

// State
const selectedBranch = ref(null)

// Methods
const closeModal = () => {
  selectedBranch.value = null
}
const updateBranchStatus = async (branch) => {
  try {
    if (!branch) return

    branch.status =
      branch.status === BRANCH_STATUS.ACTIVE ? BRANCH_STATUS.INACTIVE : BRANCH_STATUS.ACTIVE
    await branchStore.upsertBranch(branch)

    mc.success(MSG.UPDATE_SUCCESS)
  } catch (error) {
    mc.error(MSG.UPDATE_FAILED)
  }
}

// Hooks
onMounted(() => {
  branchStore.getAllBranch()
})
</script>
