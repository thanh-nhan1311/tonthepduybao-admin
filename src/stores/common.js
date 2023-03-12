import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', {
  state: () => ({
    isLoading: false
  }),

  actions: {
    setLoading(payload) {
      this.isLoading = payload
    }
  }
})
