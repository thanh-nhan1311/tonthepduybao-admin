import { defineStore } from 'pinia'
import { useAuthAPI } from '~/api'
import { useCookie } from '~/composables'
import { COOKIE_PARAM, STORAGE_PARAM } from '~/modules/http'
import { ALL_BRANCH_OPTION, USER_ROLE } from '~/modules/constant'

const authAPI = useAuthAPI()
const cookie = useCookie()

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    isAuth: false,
    currentUser: null
  }),

  getters: {
    currentUserRole() {
      if (this.currentUser) return this.currentUser.role
      return null
    },

    isAdmin() {
      if (!this.currentUser) return false
      return this.currentUser.role.id === USER_ROLE.ADMIN
    },

    isStaff() {
      if (!this.currentUser) return false
      return this.currentUser.role.id === USER_ROLE.STAFF
    }
  },

  actions: {
    checkAuth() {
      const userStr = localStorage.getItem(STORAGE_PARAM.USER)
      if (userStr) this.currentUser = JSON.parse(userStr)
      else cookie.remove(COOKIE_PARAM.TOKEN)

      this.isAuth = !!cookie.get(COOKIE_PARAM.TOKEN)
    },

    updateCurrentUser(payload) {
      this.currentUser = payload
      localStorage.setItem(STORAGE_PARAM.USER, JSON.stringify(payload))
    },

    async login(payload) {
      if (!payload.username) return

      const branchId = payload.branchId === ALL_BRANCH_OPTION.value ? null : payload.branchId
      const { data } = await authAPI.login({ ...payload, branchId })

      this.currentUser = data.user

      localStorage.setItem(STORAGE_PARAM.USER, JSON.stringify(data.user))
      cookie.set(COOKIE_PARAM.TOKEN, data.accessToken)

      window.location.reload()
    },

    async logout() {
      cookie.remove(COOKIE_PARAM.TOKEN)
      window.location.reload()
    }
  }
})
