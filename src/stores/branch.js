import { defineStore } from 'pinia'
import { getAllBranchAPI } from '../api/branchApi'
import { ALL_BRANCH_OPTION } from '../modules/constant'

export const useBranchStore = defineStore('branch', {
  state: () => ({
    allBranch: [],
    branchOptions: []
  }),

  actions: {
    // Function
    async getAllBranch() {
      const res = await getAllBranchAPI()
      this.allBranch = res.data
    },

    async getBranchOptions() {
      const res = await getAllBranchAPI()
      this.branchOptions = res.data.map((item) => {
        return {
          value: item.id,
          label: item.name
        }
      })
      this.branchOptions.unshift(ALL_BRANCH_OPTION)
    }
  }
})
