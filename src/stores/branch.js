import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getAllBranch } from '../api/branchApi'
import { ALL_BRANCH_OPTION } from '../modules/constant'

export default defineStore('branch', () => {
  // State
  const branchOptions = ref([])

  // Function
  async function getBranchOptions() {
    const allBranch = await getAllBranch()
    branchOptions.value = allBranch.data.map((item) => {
      return {
        value: item.id,
        label: item.name
      }
    })
    branchOptions.value.unshift(ALL_BRANCH_OPTION)
  }

  return { branchOptions, getBranchOptions }
})
