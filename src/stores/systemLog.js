import { defineStore } from 'pinia'
import { useSystemLogAPI } from '~/api'

const systemLogAPI = useSystemLogAPI()

export const useSystemLogStore = defineStore('systemLogStore', {
  actions: {
    async download(payload) {
      return await systemLogAPI.download(payload)
    }
  }
})
