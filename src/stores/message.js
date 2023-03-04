import { message } from 'ant-design-vue'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export default defineStore('message', () => {
  // State
  const errorMsg = ref('')

  // Action
  function setErrorMsg(msg) {
    errorMsg.value = msg
  }

  // Hooks
  watch(errorMsg, () => {
    if (errorMsg.value) message.error(errorMsg.value)
  })

  return { errorMsg, setErrorMsg }
})
