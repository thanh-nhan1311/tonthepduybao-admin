import { defineStore } from 'pinia'
import { useDebtAPI } from '../api'
import { PAGING } from '~/modules/constant'

const debtAPI = useDebtAPI()

export const useDebtStore = defineStore('debtStore', {
  state: () => ({
    debt: null,
    allDebt: {
      data: [],
      page: PAGING.DEFAULT_PAGE,
      pageSize: PAGING.DEFAULT_PAGE_SIZE,
      totalPages: 0,
      totalItems: 0
    }
  }),

  actions: {
    async get(payload) {
      const { data } = await debtAPI.get(payload)
      this.debt = data
    },

    async getAll(payload) {
      const { data } = await debtAPI.getAll(payload)
      this.allDebt = data
    },

    async create(payload) {
      await debtAPI.create(payload)
    },

    async delete(payload) {
      await debtAPI.del(payload)
    }
  }
})
