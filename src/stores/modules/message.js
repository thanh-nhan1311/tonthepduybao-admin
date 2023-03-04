import { message } from 'ant-design-vue'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export default defineStore('message', () => {
  // State
  const errorMsg = ref('')
  const successMsg = ref('')

  // Action
  function setErrorMsg(msg) {
    errorMsg.value = msg
  }
  function setSuccessMsg(msg) {
    successMsg.value = msg
  }

  // Hooks
  watch(errorMsg, () => {
    if (errorMsg.value) message.error(errorMsg.value)
  })
  watch(successMsg, () => {
    if (successMsg.value) message.success(successMsg.value)
  })

  return { errorMsg, successMsg, setErrorMsg, setSuccessMsg }
})
