import { message } from 'ant-design-vue'

export default () => {
  const toast = (content, type, duration, callback, onCloseCallback) => {
    message[type](content, duration, () => {
      if (onCloseCallback) onCloseCallback()
    }).then(() => {
      if (callback) callback()
    })
  }

  const success = (content, duration = 3, callback = null, onCloseCallback = null) => {
    toast(content, 'success', duration, callback, onCloseCallback)
  }

  const error = (content, duration = 3, callback = null, onCloseCallback = null) => {
    toast(content, 'error', duration, callback, onCloseCallback)
  }

  const warning = (content, duration = 3, callback = null, onCloseCallback = null) => {
    toast(content, 'warning', duration, callback, onCloseCallback)
  }

  return { success, error, warning }
}
