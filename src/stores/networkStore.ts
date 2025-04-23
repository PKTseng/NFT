import { defineStore } from 'pinia'
import { ref } from 'vue'
import { mainnet, testnet } from '@/config/constants'

export const useNetworkStore = defineStore('network', () => {
  const isMainnet = ref(true)
  const currentBaseUrl = ref(mainnet)

  function toggleNetwork() {
    isMainnet.value = !isMainnet.value
    currentBaseUrl.value = isMainnet.value ? mainnet : testnet

    localStorage.setItem('network', isMainnet.value ? 'mainnet' : 'testnet')

    // window.location.reload()
  }

  // 初始化網絡設置
  function initNetwork() {
    const savedNetwork = localStorage.getItem('network')
    if (savedNetwork) {
      isMainnet.value = savedNetwork === 'mainnet'
      currentBaseUrl.value = isMainnet.value ? mainnet : testnet
    }
  }

  // 返回當前 API 基礎 URL
  function getBaseUrl() {
    return currentBaseUrl.value
  }

  return {
    isMainnet,
    currentBaseUrl,
    toggleNetwork,
    initNetwork,
    getBaseUrl,
  }
})
