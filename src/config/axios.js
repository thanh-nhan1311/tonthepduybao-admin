import axios from 'axios'
import { useCommonStore } from '~/stores/common'
import { useMessageStore } from '~/stores/message'
import {
  BASE_API_URL,
  COOKIE_PARAM,
  DEFAULT_HEADERS,
  HTTP_STATUS,
  LOGIN_URL,
  WHITE_LIST_API_URL
} from '../modules/http'
import cookieUtil from '../modules/cookieUtil'
import { MSG } from '../modules/constant'

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
      const token = cookieUtil.get(COOKIE_PARAM.TOKEN)
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
    const messageStore = useMessageStore()
    const commonStore = useCommonStore()

    commonStore.setLoading(false)

    if (error && error.response) {
      const { _401, _403 } = HTTP_STATUS
      const { UNAUTHORIZED } = MSG

      switch (error.response.status) {
        case _401:
        case _403:
          messageStore.setErrorMsg(UNAUTHORIZED)
          cookieUtil.unset('token')
          if (window.location.pathname !== LOGIN_URL) window.location.reload()
          break
      }
    }
    return Promise.reject(error)
  }
)

export default instance
