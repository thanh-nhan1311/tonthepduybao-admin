import { defineStore } from 'pinia'

export const useCommonStore = defineStore('commonStore', {
  state: () => ({
    breadcrumbs: [],

    isLoading: false,
    isShowSelectDebtTypeModal: false
  }),

  actions: {
    setBreadcrumbs(payload) {
      this.breadcrumbs = payload
    },
    setLoading(payload) {
      this.isLoading = payload
    },
    setShowSelectDebtTypeModal(payload) {
      this.isShowSelectDebtTypeModal = payload
    }
  }
})
