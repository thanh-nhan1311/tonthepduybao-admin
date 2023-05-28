import { defineStore } from 'pinia'
import { useBranchAPI } from '../api'
import { useMessage } from '../composables'
import { MSG } from '../modules/constant'

const mc = useMessage()
const branchAPI = useBranchAPI()

export const useBranchStore = defineStore('branch', {
  state: () => ({
    properties: []
  }),

  actions: {
    // Function
    async getAll() {
      const res = await branchAPI.getAllBranch()
      this.allBranch = res.data
    },

    async upsertBranch(payload) {
      try {
        await branchAPI.upsertBranch(payload)
        await this.getAllBranch()

        mc.success(MSG.UPDATE_SUCCESS)
      } catch (error) {
        mc.error(MSG.UPDATE_FAILED)
      }
    }
  }
})
