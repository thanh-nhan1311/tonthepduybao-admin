import { defineStore } from 'pinia'
import { useBranchAPI } from '../api'

const branchAPI = useBranchAPI()

export const useBranchStore = defineStore('branchStore', {
  state: () => ({
    allBranch: []
  }),

  getters: {
    branchOptions() {
      return this.allBranch.map((item) => ({
        value: item.id,
        label: item.name
      }))
    }
  },

  actions: {
    async getAll() {
      const { data } = await branchAPI.getAll()
      this.allBranch = data
    },

    async upsert(payload) {
      await branchAPI.upsert(payload)
      await this.getAll()
    }
  }
})
