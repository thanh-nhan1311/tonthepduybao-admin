import { defineStore } from 'pinia'
import { useProductCategoryAPI } from '../api'

const productCategoryAPI = useProductCategoryAPI()

export const useProductCategoryStore = defineStore('productCategoryStore', {
  state: () => ({
    allProductCategory: []
  }),

  getters: {
    productCategoryOptions() {
      return this.allProductCategory.map((item) => ({
        value: item.id,
        label: item.name
      }))
    }
  },

  actions: {
    async getAll(payload) {
      const { data } = await productCategoryAPI.getAll(payload)
      this.allProductCategory = data
    },

    async upsert(payload) {
      await productCategoryAPI.upsert(payload)
    }
  }
})
