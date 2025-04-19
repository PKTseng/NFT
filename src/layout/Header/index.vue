<template>
  <header class="flex justify-between items-center px-6 py-4 bg-white shadow">
    <h1 class="text-xl font-bold">
      <RouterLink to="/">MyNFT Market</RouterLink>
    </h1>

    <nav class="space-x-4">
      <RouterLink to="/" class="hover:underline">Home</RouterLink>
      <RouterLink to="/mint" class="hover:underline">Mint</RouterLink>
      <RouterLink to="/manage" class="hover:underline">Manage</RouterLink>
    </nav>

    <WalletConnect />
  </header>
</template>

<script setup lang="ts">
import WalletConnect from '@/components/WalletConnect.vue'
</script>
