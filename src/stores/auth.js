import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login } from '../api/authApi'
import { COOKIE_PARAM, STORAGE_PARAM } from '../modules/http'
import cookieUtil from '../modules/cookieUtil'
import { ALL_BRANCH_OPTION } from '../modules/constant'

export default defineStore('auth', () => {
  // State
  const isAuth = ref(false)

  // Actions
  function checkAuth() {
    isAuth.value = !!cookieUtil.get(COOKIE_PARAM.TOKEN)
  }

  async function signIn(payload) {
    if (!payload.username) return

    const branchId = payload.branchId === ALL_BRANCH_OPTION.value ? null : payload.branchId
    const res = await login({ ...payload, branchId })

    localStorage.setItem(STORAGE_PARAM.USER, JSON.stringify(res.data.user))
    cookieUtil.set(COOKIE_PARAM.TOKEN, res.data.accessToken)

    window.location.reload()
  }

  return { isAuth, checkAuth, signIn }
})
