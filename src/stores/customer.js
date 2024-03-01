import { defineStore } from 'pinia'
import { PAGING } from '~/modules/constant'
import { useCustomerAPI } from '../api'

const customerAPI = useCustomerAPI()

export const useCustomerStore = defineStore('customerStore', {
  state: () => ({
    allCustomer: {
      data: [],
      page: PAGING.DEFAULT_PAGE,
      pageSize: PAGING.DEFAULT_PAGE_SIZE,
      totalPages: 0,
      totalItems: 0
    },
    allCustomerOptions: []
  }),

  getters: {
    customerOptions() {
      return this.allCustomerOptions.map((item) => ({
        label: item.name,
        value: item.id
      }))
    },
    allCustomerTableData() {
      return this.allCustomer.data.map((item) => {
        const phone =
          item.phone && item.phone.split(',').length !== 0
            ? item.phone.split(',').map((item) => item)
            : []
        return { ...item, phone }
      })
    }
  },

  actions: {
    async getAll(payload) {
      const { data } = await customerAPI.getAll(payload)
      this.allCustomer = data
    },

    async getAllOption(payload) {
      const { data } = await customerAPI.getAllOption(payload)
      this.allCustomerOptions = data
    },

    async upsert(payload) {
      await customerAPI.upsert(payload)
    }
  }
})
