<template>
  <section>
    <a-row class="flex justify-end items-center mb-4">
      <a-col :span="16">
        <h2 class="text-2xl">Danh sách chi nhánh</h2>
      </a-col>
      <a-col :span="8">
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
          <a-tag :color="record.status === BRANCH_STATUS.ACTIVE ? 'green' : 'danger'">
            {{ record.status === BRANCH_STATUS.ACTIVE ? 'Đang hoạt động' : 'Ngưng hoạt động' }}
          </a-tag>
        </template>
        <template v-else-if="column.key === 'action'">
          <div>
            <a-button v-if="!record.resolvedFlag" type="link" @click="selectBranch(record.id)">
              Sửa
            </a-button>
            <a-button
              type="text"
              danger
              class="ml-4"
              @click="siteContactStore.deleteContact(record.id)"
            >
              Tạm ngưng
            </a-button>
          </div>
        </template>
      </template>
    </a-table>

    <a-modal
      v-model:visible="showModal"
      :footer="null"
      centered
      width="50vw"
      title="Sửa thông tin chi nhánh"
    >
      <edit-branch-form :branch="selectedBranch" />
    </a-modal>
  </section>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'
import EditBranchForm from '../components/forms/EditBranchForm.vue'
import { BRANCH_STATUS } from '../modules/constant'
import { BRANCH_TABLE_COLUMNS } from '../modules/table'
import { useBranchStore } from '~/stores/branch'

export default defineComponent({
  components: { EditBranchForm },
  setup() {
    // Store
    const branchStore = useBranchStore()

    // Data
    const showModal = ref(false)
    let selectedBranch = reactive(null)

    // Function
    const openModal = () => (showModal.value = true)
    const closeModal = () => (showModal.value = false)
    function selectBranch(id) {
      openModal()
      selectedBranch = branchStore.allBranch.find((item) => item.id == id)
    }

    return {
      BRANCH_STATUS,
      BRANCH_TABLE_COLUMNS,
      branchStore,

      showModal,
      selectedBranch,

      openModal,
      closeModal,
      selectBranch
    }
  },

  mounted() {
    this.branchStore.getAllBranch()
  }
})
</script>
