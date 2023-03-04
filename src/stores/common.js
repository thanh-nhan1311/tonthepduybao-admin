import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCommonStore = defineStore('common', () => {
  // State
  const isLoading = ref(false)

  // Actions
  function setLoading(payload) {
    isLoading.value = payload
  }

  return { isLoading, setLoading }
})
