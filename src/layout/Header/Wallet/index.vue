<template>
  <!-- Mobile 錢包連接 -->
  <WalletConnect v-if="connected" />

  <NftSearch v-else />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useWalletStore } from '@/stores/walletStore'
import WalletConnect from '@/components/WalletConnect.vue'
import NftSearch from '@/components/NftSearch.vue'

const walletStore = useWalletStore()
const connected = computed(() => walletStore.connected)
</script>

<style scoped></style>
