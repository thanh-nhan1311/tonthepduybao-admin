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
      const res = await branchAPI.getAll()
      this.allBranch = res.data
    },

    async getBranchOptions() {
      const res = await branchAPI.getAll()
      this.branchOptions = res.data.map((item) => ({
        value: item.id,
        label: item.name
      }))
      this.branchOptions.unshift(ALL_BRANCH_OPTION)
    },

    async upsertBranch(payload) {
      await branchAPI.upsert(payload)
      await this.getAllBranch()
    }
  }
})
