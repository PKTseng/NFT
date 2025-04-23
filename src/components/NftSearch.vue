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

      <v-btn rounded @click="searchText"> Connect Wallet</v-btn>
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
