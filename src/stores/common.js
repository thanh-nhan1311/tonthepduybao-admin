import { defineStore } from 'pinia'

export const useCommonStore = defineStore('commonStore', {
  state: () => ({
    isLoading: false
  }),

  actions: {
    setLoading(payload) {
      this.isLoading = payload
    }
  }
})
