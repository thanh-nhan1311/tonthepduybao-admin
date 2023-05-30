import { defineStore } from 'pinia'
import { useCustomerAPI } from '../api'
import { useMessage } from '../composables'
import { ALL_CUSTOMER_OPTION, MSG } from '../modules/constant'

const mc = useMessage()
const customerAPI = useCustomerAPI()

export const useCustomerStore = defineStore('customerStore', {
  state: () => ({
    allCustomer: [],
    customerOptions: []
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
    async search(payload = { search: '' }) {
      const { data } = await customerAPI.search(payload)
      this.allCustomer = data
    },

    async getOptions() {
      const res = await customerAPI.search()
      this.customerOptions = res.data.map((item) => {
        return {
          value: item.id,
          label: item.name
        }
      })
      this.customerOptions.unshift(ALL_CUSTOMER_OPTION)
    },

    async upsert(payload) {
      try {
        await customerAPI.upsert(payload)
        await this.search()

        mc.success(MSG.UPDATE_SUCCESS)
      } catch (error) {
        mc.error(MSG.UPDATE_FAILED)
      }
    }
  }
})
