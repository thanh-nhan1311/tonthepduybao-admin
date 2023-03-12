import { loginAPI } from '~/api/authApi'
import { COOKIE_PARAM, STORAGE_PARAM } from '~/modules/http'
import cookieUtil from '~/modules/cookieUtil'
import { ALL_BRANCH_OPTION } from '~/modules/constant'

export default () => {
  const login = async (payload) => {
    if (!payload.username) return

    const branchId = payload.branchId === ALL_BRANCH_OPTION.value ? null : payload.branchId
    const res = await loginAPI({ ...payload, branchId })

    localStorage.setItem(STORAGE_PARAM.USER, JSON.stringify(res.data.user))
    cookieUtil.set(COOKIE_PARAM.TOKEN, res.data.accessToken)

    window.location.reload()
  }

  const logout = () => {
    cookieUtil.delete(COOKIE_PARAM.TOKEN)
    window.location.reload()
  }

  return { login, logout }
}
