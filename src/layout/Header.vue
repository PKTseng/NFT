<template>
  <header class="fixed top-0 left-0 right-0 bg-blue-900 text-white shadow z-10">
    <div class="flex justify-between items-center px-4 py-4 md:px-6">
      <!-- 左側區塊：Logo + 桌面導覽列 -->
      <div class="flex items-center">
        <!-- Logo -->
        <h1 class="text-xl font-bold">
          <RouterLink to="/">NFT Market</RouterLink>
        </h1>

        <!-- Navigation Links (Desktop) 靠左排列 -->
        <nav class="hidden md:flex ml-6 space-x-2">
          <RouterLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="bg-gradient-to-r from-pink-500 to-yellow-500 text-white text-sm font-bold px-3 py-2 mx-2 rounded-2xl shadow hover:scale-110 hover:rotate-1 transition-all duration-300"
          >
            {{ link.label }}
          </RouterLink>
        </nav>
      </div>

      <!-- 右側區塊：手機選單按鈕 + 網絡切換 + 錢包連接 -->
      <div class="flex items-center">
        <!-- Mobile Menu Button -->
        <button class="md:hidden text-white focus:outline-none" @click="isMenuOpen = !isMenuOpen">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <!-- Network Switch (Desktop) -->
        <div class="hidden md:flex items-center mx-4">
          <button
            class="flex items-center bg-blue-800 hover:bg-blue-700 text-xs px-3 py-2 rounded-lg transition-colors"
            @click="handleNetworkToggle"
          >
            <span class="mr-2">{{ networkStore.isMainnet ? 'Mainnet' : 'Testnet' }}</span>
            <div class="relative w-8 h-4 bg-gray-600 rounded-full">
              <div
                class="absolute top-0 left-0 w-4 h-4 rounded-full transition-transform duration-300 transform"
                :class="networkStore.isMainnet ? 'translate-x-4 bg-green-400' : 'bg-yellow-400'"
              ></div>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu (Dropdown) -->
    <div v-if="isMenuOpen" class="md:hidden px-4 pb-4 space-y-2">
      <RouterLink
        v-for="link in navLinks"
        :key="link.path"
        :to="link.path"
        class="block w-full bg-gradient-to-r from-pink-500 to-yellow-500 text-white text-sm font-bold px-3 py-2 my-4 rounded-xl shadow hover:scale-105 transition"
        @click="isMenuOpen = false"
      >
        {{ link.label }}
      </RouterLink>

      <!-- Network Switch (Mobile) -->
      <div class="flex justify-center my-4">
        <button
          class="flex items-center bg-blue-800 hover:bg-blue-700 text-sm px-4 py-2 rounded-lg transition-colors"
          @click="handleNetworkToggle"
        >
          <span class="mr-2">{{ networkStore.isMainnet ? 'Mainnet' : 'Testnet' }}</span>
          <div class="relative w-10 h-5 bg-gray-600 rounded-full">
            <div
              class="absolute top-0 left-0 w-5 h-5 rounded-full transition-transform duration-300 transform"
              :class="networkStore.isMainnet ? 'translate-x-5 bg-green-400' : 'bg-yellow-400'"
            ></div>
          </div>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useNetworkStore } from '@/stores/networkStore'
import { reconfigureAxios } from '@/utils/request'

const isMenuOpen = ref(false)
const networkStore = useNetworkStore()

const navLinks = [
  { path: '/nft-list', label: 'NFT 瀏覽' },
  { path: '/my-nfts', label: '我的 NFT' },
  { path: '/mint', label: '創建 NFT' },
  // { path: '/about', label: '關於' },
]

// 處理網絡切換並重新配置 axios
const handleNetworkToggle = () => {
  networkStore.toggleNetwork()
  reconfigureAxios()
}

// 組件掛載時初始化網絡設置
onMounted(() => {
  networkStore.initNetwork()
})
</script>
