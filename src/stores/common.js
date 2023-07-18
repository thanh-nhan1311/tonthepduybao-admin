import { defineStore } from 'pinia'

export const useCommonStore = defineStore('commonStore', {
  state: () => ({
    breadcrumbs: [],
    isLoading: false
  }),

  actions: {
    setBreadcrumbs(payload) {
      this.breadcrumbs = payload
    },
    setLoading(payload) {
      this.isLoading = payload
    }
  }
})
