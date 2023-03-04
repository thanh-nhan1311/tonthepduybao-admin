import { defineStore } from 'pinia'
import authApi from '../api/authApi'
import { COOKIE_PARAM } from '../modules/constant'
import cookieUtil from '../modules/cookieUtil'

export const useAuthStore = defineStore('auth', () => {
  // State

  // Actions
  function login(payload) {
    return authApi.login(payload)
  }

  function checkAuth() {
    return !!cookieUtil.get(COOKIE_PARAM.TOKEN)
  }

  return { checkAuth, login }
})
