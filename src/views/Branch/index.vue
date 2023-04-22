<template>
  <section>
    <a-row class="flex justify-end items-center mb-4">
      <a-col :span="24">
        <h2 class="text-2xl">Danh sách chi nhánh</h2>
      </a-col>
    </a-row>

    <a-table :columns="BRANCH_TABLE_COLUMNS" :data-source="branchStore.allBranch">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <div>
            <h3>{{ record.name }}</h3>
            <a :href="record.mapUrl" target="_blank" rel="noopener noreferrer">
              {{ record.address }}
            </a>
          </div>
        </template>
        <template v-else-if="column.key === 'status'">
          <a-tag :color="record.status === BRANCH_STATUS.ACTIVE ? 'green' : 'error'">
            {{ record.status === BRANCH_STATUS.ACTIVE ? 'Đang hoạt động' : 'Ngưng hoạt động' }}
          </a-tag>
        </template>
        <template v-else-if="column.key === 'action'">
          <div>
            <a-button v-if="!record.resolvedFlag" type="link" @click="openModal(record.id)">
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
import { defineComponent, onMounted, ref } from 'vue'
import { BRANCH_STATUS } from '~/modules/constant'
import { BRANCH_TABLE_COLUMNS } from '~/modules/table'
import { useBranchStore } from '~/stores/branch'

// Store
const branchStore = useBranchStore()

// Data
const selectedBranch = ref(null)

// Methods
const openModal = (id) => {
  const findBranch = branchStore.allBranch.find((item) => item.id == id)
  if (findBranch) selectedBranch.value = findBranch
}
const closeModal = () => {
  selectedBranch.value = null
}
const updateBranchStatus = (branch) => {
  if (!branch) return

  branch.status =
    branch.status === BRANCH_STATUS.ACTIVE ? BRANCH_STATUS.INACTIVE : BRANCH_STATUS.ACTIVE
  branchStore.upsertBranch(branch)
}

// Hooks
onMounted(() => {
  branchStore.getAllBranch()
})
</script>

<script>
import EditBranchModal from './components/EditBranchModal.vue'

export default defineComponent({
  components: { EditBranchModal }
})
</script>
