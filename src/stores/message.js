import { defineStore } from 'pinia'

export const useMessageStore = defineStore('message', {
  state: () => ({
    errorMsg: '',
    successMsg: ''
  }),

  actions: {
    setErrorMsg(msg) {
      this.errorMsg = msg
    },
    setSuccessMsg(msg) {
      this.successMsg = msg
    }
  }
})
