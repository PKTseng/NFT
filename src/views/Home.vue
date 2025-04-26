<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- 歡迎區域 -->
    <section class="pa-24 mb-12 bg-gradient-to-br from-gray-900 to-blue-900 rounded-[2.5rem] shadow-2xl">
      <div class="max-w-4xl mx-auto text-center px-4 py-8 sm:px-8">
        <div class="space-y-6">
          <h1 class="text-4xl sm:text-5xl font-bold text-white leading-tight">
            <span class="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Solana NFT 宇宙
            </span>
          </h1>
          <p class="text-lg text-blue-200/90 font-medium max-w-2xl mx-auto">探索、收藏並鑄造獨一無二的數字藝術品</p>
          <div class="flex flex-wrap justify-center gap-4 mt-8">
            <RouterLink
              to="/nft-list"
              class="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl/50 hover:scale-[1.02] transition-all duration-300 flex items-center gap-2"
            >
              <span class="mdi mdi-compass-outline text-lg"></span>
              探索作品
            </RouterLink>
            <RouterLink
              to="/mint"
              class="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl/50 hover:scale-[1.02] transition-all duration-300 flex items-center gap-2"
            >
              <span class="mdi mdi-plus-circle-outline text-lg"></span>
              建立 NFT
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- 功能亮點區域 -->
    <section class="py-20 space-y-16">
      <div class="text-center space-y-4">
        <h2 class="text-3xl font-bold text-white">
          <span class="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> 核心功能 </span>
        </h2>
        <p class="text-blue-200/80 max-w-xl mx-auto my-4">重新定義數字藝術收藏體驗</p>
      </div>
    </section>

    <!-- 精選 NFT 區域 -->
    <section class="py-20 space-y-16 my-16">
      <div class="text-center space-y-4">
        <h2 class="text-3xl font-bold text-white my-4">
          <span class="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> 精選藏品 </span>
        </h2>
        <p class="text-blue-200/80 max-w-xl mx-auto my-4">來自頂級藝術家的最新創作</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- NFT 卡片 -->
        <div
          v-for="asset in assets"
          :key="asset.id"
          class="group relative bg-gray-900 rounded-xl border border-gray-700/50 hover:border-cyan-400/30 transition-all duration-500 overflow-hidden pa-4"
        >
          <div class="aspect-square overflow-hidden relative">
            <img
              :src="getImageUrl(asset) ?? ''"
              alt="asset image"
              class="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105 rounded-t-xl"
              loading="lazy"
            />

            <div class="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
          </div>

          <div class="space-y-3 mt-3">
            <h3 class="font-semibold text-white truncate">{{ asset.content.metadata.name }}</h3>
            <p class="text-gray-600 mt-2">Collection: {{ asset.grouping?.[0]?.collection_metadata?.name || 'N/A' }}</p>
            <div class="flex items-center gap-2 text-sm">
              <span class="mdi mdi-account-outline text-cyan-400"></span>
              <span class="text-cyan-400 font-medium truncate mt-2">
                Owner: {{ asset.ownership.owner.slice(0, 4) }}...{{ asset.ownership.owner.slice(-4) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 關於我區域 -->
    <section class="py-20 my-12 bg-gradient-to-br from-gray-900 to-blue-900/80 rounded-[2.5rem] shadow-2xl">
      <div class="max-w-5xl mx-auto pa-8">
        <div class="flex flex-col lg:flex-row items-center gap-12">
          <!--大頭照 -->
          <div class="relative w-40 h-40">
            <div
              class="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-xl opacity-30 animate-pulse"
            ></div>
            <div
              class="relative w-full h-full bg-gray-800 rounded-full border-4 border-gray-700/50 overflow-hidden shadow-xl"
            >
              <img src="@/assets/image/head.jpg" class="w-full h-full object-cover" alt="大頭照" />
            </div>
          </div>

          <!-- 內容 -->
          <div class="flex-1 text-center space-y-6 mx-auto max-w-2xl">
            <div class="space-y-4">
              <h2
                class="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
              >
                Web3 Developer
              </h2>
              <p class="text-blue-200/90 leading-relaxed">
                專注於以 Vue 3 + TypeScript 打造 Web3 前端，結合 Solana 生態與智能合約互動，從 UI
                設計到交易執行提供完整解決方案。
              </p>
            </div>

            <button
              class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500/80 to-blue-600/80 rounded-xl font-semibold text-white hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl/50 mt-8"
              @click="goLinkedin"
            >
              了解更多
              <span class="mdi mdi-arrow-right-thin text-xl"></span>
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useGetAssetsByCreator } from '@/hooks/UseGetAssetsByCreator'
import { getImageUrl } from '@/utils/nft'

const { assets, currentPage, totalAssets, fetchAssetsByCreator } = useGetAssetsByCreator()

const address = ref('D3XrkNZz6wx6cofot7Zohsf2KSsu2ArngNk8VqU9cTY3')
onMounted(() => {
  fetchAssetsByCreator(address.value, 1, 3)
})

const goLinkedin = () => {
  window.open('https://www.linkedin.com/in/ken-tseng/', '_blank')
}
</script>
