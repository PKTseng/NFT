<template>
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
</template>

<script setup lang="ts">
const goLinkedin = () => {
  window.open('https://www.linkedin.com/in/ken-tseng/', '_blank')
}
</script>
