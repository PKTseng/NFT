import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('globalStore', () => {
  const isPageLoading = ref(false)

  const startLoading = () => {
    isPageLoading.value = true
  }

  const stopLoading = () => {
    isPageLoading.value = false
  }

  return {
    isPageLoading,
    startLoading,
    stopLoading,
  }
})
