import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useWalletStore = defineStore('wallet', () => {
  const connection = new Connection(clusterApiUrl('devnet'))
  const publicKey = ref<PublicKey | null>(null)
  const walletBalance = ref<number>(0)

  const connected = computed(() => publicKey.value !== null)

  const connectWallet = async () => {
    try {
      const { solana } = window as any

      if (!solana?.isPhantom) {
        alert('請先安裝 Phantom 錢包擴展')
        window.open('https://phantom.app/', '_blank')
        return
      }

      const response = await solana.connect()
      publicKey.value = response.publicKey
      await fetchBalance()
    } catch (error) {
      console.error('連接錢包失敗:', error)
      throw error
    }
  }

  const disconnectWallet = async () => {
    try {
      const { solana } = window as any

      if (solana?.isPhantom) {
        await solana.disconnect()
      }

      publicKey.value = null
      walletBalance.value = 0
    } catch (error) {
      console.error('斷開錢包連接失敗:', error)
      throw error
    }
  }

  const fetchBalance = async () => {
    if (!publicKey.value) return

    try {
      const balance = await connection.getBalance(publicKey.value)
      walletBalance.value = balance / 1e9 // 轉換為 SOL 單位
    } catch (error) {
      console.error('獲取餘額失敗:', error)
    }
  }

  return {
    connection,
    publicKey,
    walletBalance,
    connected,
    connectWallet,
    disconnectWallet,
    fetchBalance,
  }
})
