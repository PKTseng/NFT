<template>
  <header class="flex justify-between items-center px-6 py-4 bg-blue-700 shadow text-white">
    <div class="flex items-center">
      <h1 class="text-xl font-bold">
        <RouterLink to="/">NFT Market</RouterLink>
      </h1>

      <nav class="ml-4">
        <RouterLink
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="mx-2 bg-gradient-to-r from-pink-500 to-yellow-500 text-white text-xl font-bold px-8 py-4 rounded-2xl shadow-lg hover:scale-110 hover:rotate-1 transition-all duration-300"
        >
          {{ link.label }}
        </RouterLink>
      </nav>
    </div>

    <WalletConnect />
  </header>
</template>

<script setup lang="ts">
import WalletConnect from '@/components/WalletConnect.vue'

const navLinks = [
  { path: '/', label: '首頁' },
  { path: '/mint', label: 'Mint' },
  { path: '/nfts', label: 'Manage' },
]
</script>
