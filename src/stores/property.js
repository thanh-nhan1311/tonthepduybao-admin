import { defineStore } from 'pinia'
import { usePropertyAPI } from '../api'

const propertyAPI = usePropertyAPI()

export const usePropertyStore = defineStore('propertyStore', {
  state: () => ({
    allProperty: []
  }),

  getters: {
    propertyOptions() {
      return this.allProperty.map((item) => ({
        value: item.id,
        label: item.name
      }))
    }
  },

  actions: {
    // Function
    async getAll(payload) {
      const { data } = await propertyAPI.getAll(payload)
      this.allProperty = data
    },

    async delete(payload) {
      await propertyAPI.del(payload)
    },

    async create(payload) {
      await propertyAPI.create(payload)
    },

    async update(payload) {
      await propertyAPI.update(payload)
    }
  }
})
