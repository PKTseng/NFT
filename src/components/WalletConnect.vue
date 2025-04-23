<template>
  {{ shortenAddress(address) }}

  <v-btn color="error" class="ml-4" rounded @click="disconnectWallet"> disconnectWallet </v-btn>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useWalletStore } from '@/stores/walletStore'
import { shortenAddress } from '@/utils/nft'

const walletStore = useWalletStore()

const address = computed(() => {
  if (!walletStore.publicKey) {
    return ''
  }

  return walletStore.publicKey.toString()
})

const disconnectWallet = () => walletStore.disconnectWallet()
</script>

<style scoped></style>
