import { defineStore } from 'pinia'
import { useAuthAPI } from '~/api'
import { useCookie } from '~/compositions'
import { COOKIE_PARAM, STORAGE_PARAM } from '~/modules/http'
import { ALL_BRANCH_OPTION } from '~/modules/constant'

const authAPI = useAuthAPI()
const cookie = useCookie()

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuth: false
  }),

  actions: {
    checkAuth() {
      this.isAuth = !!cookie.get(COOKIE_PARAM.TOKEN)
    },

    async login(payload) {
      if (!payload.username) return

      const branchId = payload.branchId === ALL_BRANCH_OPTION.value ? null : payload.branchId
      const res = await authAPI.login({ ...payload, branchId })

      localStorage.setItem(STORAGE_PARAM.USER, JSON.stringify(res.data.user))
      cookie.set(COOKIE_PARAM.TOKEN, res.data.accessToken)

      window.location.reload()
    },

    async logout() {
      cookie.remove(COOKIE_PARAM.TOKEN)
      window.location.reload()
    }
  }
})
