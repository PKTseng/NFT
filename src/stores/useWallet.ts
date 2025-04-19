import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useWalletStore = defineStore('wallet', () => {
  const connection = new Connection(clusterApiUrl('devnet'))
  const publickey = ref<PublicKey | null>(null)

  const connected = computed(() => publickey.value !== null)

  const connectWallet = async () => {
    try {
      console.log('連接按鈕被點擊')
      const { solana } = window

      console.log('window.solana 存在嗎?', !!solana)
      console.log('solana 類型:', typeof solana)
      console.log('isPhantom 屬性:', solana?.isPhantom)

      if (!solana?.isPhantom) {
        throw new Error('Phantom wallet not found')
      }

      console.log('嘗試連接錢包...')
      const response = await solana.connect()
      console.log('連接成功, 響應:', response)

      publickey.value = response.publicKey
      console.log('Wallet connected:', response.publicKey.toString())
    } catch (error) {
      console.error('連接錯誤:', error)
    }
  }

  const disconnectWallet = async () => {
    try {
      const { solana } = window

      await solana?.disconnect()
      publickey.value = null
    } catch (error) {
      console.log(error)
    }
  }

  return {
    connection,
    publickey,
    connected,
    connectWallet,
    disconnectWallet,
  }
})
