import { defineStore } from 'pinia'
import { useShippingAddressAPI } from '../api'

const shippingAddressAPI = useShippingAddressAPI()

export const useShippingAddressStore = defineStore('shippingAddress', {
  state: () => ({
    allShippingAddress: []
  }),

  getters: {
    shippingAddresses() {
      const defaultAddress = this.allShippingAddress.find(item => item.defaultAddress)
      if (defaultAddress) {
        const notDefaultAddreses = this.allShippingAddress.filter(item => item.id !== defaultAddress.id)

        return [defaultAddress, ...notDefaultAddreses]
      } else return this.allShippingAddress
    }
  },

  actions: {
    async getAll(payload) {
      const { data } = await shippingAddressAPI.getAll(payload)
      this.allShippingAddress = data
    },

    async upsert(payload) {
      await shippingAddressAPI.upsert(payload)
    },

    async updateDefault(payload) {
      await shippingAddressAPI.updateDefault(payload)
    },

    async delete(payload) {
      await shippingAddressAPI.del(payload)
    }
  }
})
