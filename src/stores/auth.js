import { defineStore } from 'pinia'
import { COOKIE_PARAM } from '../modules/http'
import cookieUtil from '../modules/cookieUtil'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuth: false
  }),

  actions: {
    checkAuth() {
      this.isAuth = !!cookieUtil.get(COOKIE_PARAM.TOKEN)
    }
  }
})
