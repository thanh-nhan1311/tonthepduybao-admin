import { defineStore } from 'pinia'
import { useCustomerAPI } from '../api'

const customerAPI = useCustomerAPI()

export const useCustomerStore = defineStore('customerStore', {
  state: () => ({
    search: '',
    type: [],
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
      await customerAPI.upsert(payload)
      await this.getAll({ search: this.search, type: this.type })
    }
  }
})
