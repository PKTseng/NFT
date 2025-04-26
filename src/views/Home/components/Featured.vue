<template>
  <section class="py-20 space-y-16 my-16">
    <div class="text-center space-y-4">
      <h2 class="text-3xl font-bold text-white my-4">
        <span class="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> 精選藏品 </span>
      </h2>
      <p class="text-blue-200/80 max-w-xl mx-auto my-4">來自頂級藝術家的最新創作</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- 動態渲染 NFT 卡片 -->
      <div
        v-for="asset in data"
        :key="asset.id"
        class="group relative bg-gray-900 rounded-xl border border-gray-700/50 hover:border-cyan-400/30 transition-all duration-500 overflow-hidden pa-4"
      >
        <!-- NFT 圖片 -->
        <div class="aspect-square overflow-hidden relative">
          <img
            :src="getImageUrl(asset) ?? ''"
            :alt="asset.content.metadata.name"
            class="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105 rounded-t-xl"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
        </div>

        <!-- NFT 詳細信息 -->
        <div class="space-y-3 mt-3">
          <!-- 名稱 + 集合驗證標記 -->
          <div class="flex items-center justify-between">
            <h3 class="font-semibold text-white truncate">{{ asset.content.metadata.name }}</h3>
            <span v-if="asset.grouping[0].verified" class="mdi mdi-verified text-cyan-400"></span>
          </div>

          <!-- 集合名稱 -->
          <p class="text-gray-400 text-sm">
            {{ asset.grouping[0].collection_metadata.name }}
          </p>

          <!-- 精選屬性展示 -->
          <div class="flex flex-wrap gap-2 mt-2">
            <div
              v-for="(attr, index) in asset.content.metadata.attributes.slice(0, 3)"
              :key="index"
              class="px-3 py-1 bg-gray-800 rounded-full text-sm text-cyan-300 border border-cyan-400/20"
            >
              {{ attr.value }}
            </div>
          </div>

          <!-- 版稅與所有權 -->
          <div class="flex justify-between items-center pt-4">
            <div class="text-cyan-400 text-sm">
              <span class="mdi mdi-cash"></span>
              {{ (asset.royalty.percent * 100).toFixed(1) }}% 版稅
            </div>
            <div class="text-cyan-400 text-sm">
              <span class="mdi mdi-account"></span>
              {{ shortenAddress(asset.ownership.owner) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { getImageUrl, shortenAddress } from '@/utils/nft'
import { data } from '@/mocks/Home.ts'
</script>

<style lang="scss" scoped></style>
