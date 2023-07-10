import { defineStore } from 'pinia'
import { useDebtAPI } from '../api'
import { useMessage } from '../composables'
import { MSG } from '../modules/constant'

const mc = useMessage()
const debtAPI = useDebtAPI()

export const useDebtStore = defineStore('debtStore', {
  state: () => ({}),

  actions: {
    // Function
    async create(payload) {
      try {
        await debtAPI.create(payload)

        mc.success(MSG.SAVE_SUCCESS)
      } catch (error) {
        mc.error(MSG.SAVE_FAILED)
      }
    }
  }
})
