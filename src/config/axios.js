import axios from 'axios'
import { useCommonStore } from '~/stores/common'
import { useMessage, useCookie } from '~/compositions'
import {
  BASE_API_URL,
  COOKIE_PARAM,
  DEFAULT_HEADERS,
  HTTP_STATUS,
  LOGIN_URL,
  WHITE_LIST_API_URL
} from '~/modules/http'
import { MSG } from '~/modules/constant'

const mc = useMessage()
const cookie = useCookie()

const instance = axios.create({
  baseURL: BASE_API_URL,
  data: {},
  params: {},
  headers: DEFAULT_HEADERS
})

// Request interceptor
instance.interceptors.request.use(
  function (config) {
    const commonStore = useCommonStore()
    commonStore.setLoading(true)

    if (!WHITE_LIST_API_URL.includes(config.url)) {
      const token = cookie.get(COOKIE_PARAM.TOKEN)
      config.headers.Authorization = 'Bearer ' + token
    } else config.headers.Authorization = ''

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
        case HTTP_STATUS._200:
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
      const { _401, _403, _500 } = HTTP_STATUS
      const { UNAUTHORIZED, SYSTEM_ERROR } = MSG

      switch (error.response.status) {
        case _401:
        case _403:
          mc.error(UNAUTHORIZED)
          cookie.remove(COOKIE_PARAM.TOKEN)
          if (window.location.pathname !== LOGIN_URL) window.location.reload()
          break
        case _500:
          mc.error(SYSTEM_ERROR)
          break
      }
    }
    return Promise.reject(error)
  }
)

export default instance
