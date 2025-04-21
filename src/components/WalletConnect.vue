<template>
  {{ address }}
  <button
    v-if="!connected"
    class="bg-gradient-to-r from-pink-500 to-yellow-500 text-white text-xl font-bold px-4 py-2 rounded-2xl shadow-lg hover:scale-110 hover:rotate-1 transition-all duration-300"
    @click="connectWallet"
  >
    Connect Wallet
  </button>

  <v-btn v-else color="primary" @click="disconnectWallet"> disconnectWallet </v-btn>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useWalletStore } from '@/stores/useWallet'

const walletStore = useWalletStore()

const connected = computed(() => walletStore.connected)

const address = computed(() => {
  if (!walletStore.publicKey) {
    return ''
  }

  return walletStore.publicKey.toString()
})

const connectWallet = () => walletStore.connectWallet()
const disconnectWallet = () => walletStore.disconnectWallet()
</script>

<style scoped></style>
