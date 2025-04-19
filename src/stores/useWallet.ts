import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useWalletStore = defineStore('wallet', () => {
  const connection = new Connection(clusterApiUrl('devnet'))
  const publickey = ref<PublicKey | null>(null)

  const connected = computed(() => publickey.value !== null)

  const connectWallet = async () => {
    try {
      const { solana } = window

      if (!solana?.isPhantom) {
        throw new Error('Phantom wallet not found')
      }

      const response = await solana.connect()
      publickey.value = response.publicKey
    } catch (error) {
      console.log(error)
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
