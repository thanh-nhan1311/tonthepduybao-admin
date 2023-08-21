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
    },
    allDebtTotalPrice: 0
  }),

  actions: {
    async get(payload) {
      const { data } = await debtAPI.get(payload)
      this.debt = data
      this.allDebtTotalPrice = data.totalPrice
    },

    async getAll(payload) {
      const { data } = await debtAPI.getAll(payload)
      this.allDebt = data.allDebt
      this.allDebtTotalPrice = data.totalPrice
    },

    async create(payload) {
      await debtAPI.create(payload)
    },

    async createFromFile(payload) {
      return await debtAPI.createFromFile(payload)
    },

    async update(payload) {
      await debtAPI.update(payload)
    },

    async delete(payload) {
      await debtAPI.del(payload)
    },

    async download(payload) {
      return await debtAPI.download(payload)
    },

    async downloadTemplate(payload) {
      return await debtAPI.downloadTemplate(payload)
    }
  }
})
