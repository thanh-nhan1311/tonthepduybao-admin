import { defineStore } from 'pinia'
import { useCustomerAPI } from '../api'
import { useMessage } from '../composables'
import { MSG } from '../modules/constant'

const mc = useMessage()
const customerAPI = useCustomerAPI()

export const useCustomerStore = defineStore('customerStore', {
  state: () => ({
    search: '',
    type: '',
    allCustomer: []
  }),

  getters: {
    allCustomerTableData: (state) =>
      state.allCustomer.map((item) => {
        const phone =
          item.phone && item.phone.split(',').length !== 0
            ? item.phone.split(',').map((item) => item)
            : []
        return { ...item, phone }
      })
  },

  actions: {
    // Function
    async getAll(payload = { search: '', type: '' }) {
      const { data } = await customerAPI.getAll(payload)
      this.allCustomer = data
    },

    async upsert(payload) {
      try {
        await customerAPI.upsert(payload)
        await this.getAll({ search: this.search, type: this.type })

        mc.success(MSG.UPDATE_SUCCESS)
      } catch (error) {
        mc.error(MSG.UPDATE_FAILED)
      }
    }
  }
})
