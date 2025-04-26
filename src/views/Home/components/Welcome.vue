<template>
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
</template>

<script setup lang="ts"></script>
