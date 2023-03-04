import axios from 'axios'
import { useCommonStore } from '../stores/common'
import {
  BASE_API_URL,
  COOKIE_PARAM,
  DEFAULT_HEADERS,
  HTTP_STATUS,
  LOGIN_URL
} from '../modules/constant'
import cookieUtil from '../modules/cookieUtil'

const instance = axios.create({
  baseURL: BASE_API_URL,
  headers: DEFAULT_HEADERS
})

// Request interceptor
instance.interceptors.request.use(
  function (config) {
    const commonStore = useCommonStore()
    commonStore.setLoading(true)

    const token = cookieUtil.get(COOKIE_PARAM.TOKEN)
    config.headers.Authorization = 'Bearer ' + token

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// Response interceptor
instance.interceptors.response.use(
  function (response) {
    const commonStore = useCommonStore()

    if (response) {
      switch (response.status) {
        case HTTP_STATUS.OK:
          commonStore.setLoading(false)
          break
      }
    }
    return response
  },
  function (error) {
    const commonStore = useCommonStore()
    commonStore.setLoading(false)

    if (error && error.response) {
      const { _401, _403 } = HTTP_STATUS

      switch (error.response.status) {
        case _401:
        case _403:
          cookieUtil.unset('token')
          if (window.location.pathname !== LOGIN_URL) window.location.reload()
          break
      }
    }
    return Promise.reject(error)
  }
)

export default instance
