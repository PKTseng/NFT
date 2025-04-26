<template>
  <div v-if="connected" class="d-flex align-center justify-end gap-3">
    <div class="d-flex align-center">
      <v-icon color="amber-accent-3" class="mr-1"> mdi-currency-usd-circle </v-icon>
      <span class="text-white font-mono font-medium">{{ walletStore.walletBalance }} SOL</span>
    </div>

    <v-chip variant="elevated" color="green" class="px-6"> {{ shortenAddress(address) }} </v-chip>

    <v-btn color="error" class="px-8" rounded prepend-icon="mdi-logout-variant" @click="disconnectWallet">
      Disconnect
    </v-btn>
  </div>

  <div v-else class="flex items-center justify-end gap-3">
    <div class="relative flex-1 max-w-lg">
      <input
        v-model="address"
        type="text"
        placeholder="錢包地址"
        class="!rounded-full w-full px-4 py-2 bg-white text-gray-800 border 0 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm font-mono"
      />
      <button
        v-if="address"
        class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        @click="address = ''"
      >
        <v-icon size="small">mdi-close-circle</v-icon>
      </button>
    </div>

    <button
      class="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium px-6 py-2 rounded-full transition-all duration-200 flex items-center gap-2 shadow-md"
      @click="searchAddress"
    >
      <v-icon size="small">mdi-wallet</v-icon>
      Search
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { shortenAddress } from '@/utils/nft'
import { useWalletStore } from '@/stores/walletStore'

const walletStore = useWalletStore()

const connected = computed(() => walletStore.connected)

const emits = defineEmits(['searchAddress', 'disconnectWallet'])

const address = ref('')

const searchAddress = () => {
  if (!address.value) return

  emits('searchAddress', address.value)
}

const disconnectWallet = () => {
  address.value = ''
  emits('disconnectWallet')
}

watch(
  connected,
  (value) => {
    console.log(value)
    address.value = walletStore.publicKey?.toString() ?? ''

    console.log(address.value)
    searchAddress()
  },
  { immediate: true },
)
</script>

<style scoped></style>
