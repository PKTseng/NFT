<template>
  <header class="bg-blue-900 text-white shadow">
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

      <!-- 右側區塊：手機選單按鈕 + 錢包連接 -->
      <div class="flex items-center">
        <!-- Mobile Menu Button -->
        <button class="md:hidden text-white focus:outline-none" @click="isMenuOpen = !isMenuOpen">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <!-- Wallet (Desktop) -->
        <div class="hidden md:block ml-4 tex-right">
          <Wallet />
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

      <Wallet />
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Wallet from './Wallet/index.vue'

const isMenuOpen = ref(false)

const navLinks = [
  { path: '/creator', label: '創作者作品' },
  // { path: '/series', label: '系列分類' },
  { path: '/mint', label: 'Mint NFT' },
  // { path: '/manage', label: '販售管理' },
]
</script>
