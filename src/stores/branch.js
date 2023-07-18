import { defineStore } from 'pinia'
import { useBranchAPI } from '../api'
import { ALL_BRANCH_OPTION } from '../modules/constant'

const branchAPI = useBranchAPI()

export const useBranchStore = defineStore('branchStore', {
  state: () => ({
    allBranch: [],
    branchOptions: []
  }),

  actions: {
    // Function
    async getAllBranch() {
      const { data } = await branchAPI.getAll()
      this.allBranch = data
    },

    async getBranchOptions(hasAllOption = false) {
      const { data } = await branchAPI.getAll()
      this.branchOptions = data.map((item) => ({
        value: item.id,
        label: item.name
      }))

      if (hasAllOption) this.branchOptions.unshift(ALL_BRANCH_OPTION)
    },

    async upsertBranch(payload) {
      await branchAPI.upsert(payload)
      await this.getAllBranch()
    }
  }
})
