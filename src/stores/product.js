import { defineStore } from 'pinia'
import { PAGING } from '~/modules/constant'
import { useProductAPI } from '../api'

const productAPI = useProductAPI()

export const useProductStore = defineStore('productStore', {
  state: () => ({
    allProduct: {
      data: [],
      page: PAGING.DEFAULT_PAGE,
      pageSize: PAGING.DEFAULT_PAGE_SIZE,
      totalPages: 0,
      totalItems: 0
    }
  }),

  actions: {
    async create(payload) {
      await productAPI.create(payload)
    },

    async delete(payload) {
      await productAPI.delete(payload)
    },
    
    async deleteAll() {
      await productAPI.deleteAll()
    },

    async getAll(payload) {
      const { data } = await productAPI.getAll(payload)
      this.allProduct = data
    }
  }
})
