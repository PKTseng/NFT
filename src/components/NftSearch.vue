<template>
  <div class="max-w-xl mx-auto">
    <div class="flex items-center gap-2">
      <v-text-field
        v-model="ownerAddress"
        rounded
        type="text"
        density="compact"
        placeholder="錢包地址"
        class="px-2 py-2 w-[660px]"
        hide-details
        variant="outlined"
        clearable
      />

      <button
        class="bg-gradient-to-r from-pink-500 to-yellow-500 text-white text-sm font-bold px-4 py-2 rounded-2xl shadow-lg hover:scale-110 hover:rotate-1 transition-all duration-300"
        @click="searchText"
      >
        Connect Wallet
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useWalletStore } from '@/stores/walletStore'

const walletStore = useWalletStore()
const { publicKey } = storeToRefs(walletStore)

const ownerAddress = ref(null)

const searchText = () => {
  publicKey.value = ownerAddress.value ?? null
}
</script>
