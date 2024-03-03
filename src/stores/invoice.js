import { defineStore } from 'pinia'
import { PAGING } from '~/modules/constant'
import { useInvoiceAPI } from '../api'

const invoiceAPI = useInvoiceAPI()

export const useInvoiceStore = defineStore('invoiceStore', {
  state: () => ({
    invoice: null,
    allInvoice: {
      data: [],
      page: PAGING.DEFAULT_PAGE,
      pageSize: PAGING.DEFAULT_PAGE_SIZE,
      totalPages: 0,
      totalItems: 0
    },
    allInvoiceTotalPrice: 0
  }),

  actions: {
    async create(payload) {
      await invoiceAPI.create(payload)
    },

    async get(payload) {
      const { data } = await invoiceAPI.get(payload)
      this.invoice = data
    },

    async delete(payload) {
      await invoiceAPI.del(payload)
    },

    async getAll(payload) {
      const { data } = await invoiceAPI.getAll(payload)
      this.allInvoice = data.allInvoice
      this.allInvoiceTotalPrice = data.totalPrice
    },
  }
})
