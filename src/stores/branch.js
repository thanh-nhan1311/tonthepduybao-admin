import { defineStore } from 'pinia'
import { getAllBranchAPI, upsertBranchAPI } from '../api/branchApi'
import { useMessage } from '../compositions'
import { ALL_BRANCH_OPTION, MSG } from '../modules/constant'

const mc = useMessage()

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
    },

    async upsertBranch(payload) {
      try {
        await upsertBranchAPI(payload)
        await this.getAllBranch()

        mc.success(MSG.UPDATE_SUCCESS)
      } catch (error) {
        mc.error(MSG.UPDATE_FAILED)
      }
    }
  }
})
