<template>
  <!-- 核心功能區域 -->
  <section class="py-20 space-y-16">
    <div class="text-center space-y-4">
      <h2 class="text-3xl font-bold text-white">
        <span class="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> 核心功能 </span>
      </h2>
      <p class="text-blue-200/80 max-w-xl mx-auto my-4">重新定義數字藝術收藏體驗</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
      <!-- 元數據多樣性 -->
      <div class="p-6 bg-gray-900/50 rounded-xl border transition-all pa-4">
        <div class="text-cyan-400 text-3xl mb-4 text-center"><span class="mdi mdi-shape-plus"></span></div>
        <h3 class="text-white font-semibold mb-2">多元屬性</h3>
        <p class="text-blue-200/80 text-sm">
          平均 {{ avgAttributes }} 種可組合特徵<br />
          示例：{{ sampleAttribute }}
        </p>
      </div>

      <!-- 智能版稅 -->
      <div class="p-6 bg-gray-900/50 rounded-xl border transition-all pa-4">
        <div class="text-cyan-400 text-3xl mb-4 text-center"><span class="mdi mdi-cash-sync"></span></div>
        <h3 class="text-white font-semibold mb-2">自動分潤</h3>
        <p class="text-blue-200/80 text-sm">
          固定 {{ royaltyRate }}% 創作者版稅<br />
          支援 {{ creatorCount }} 方協作
        </p>
      </div>

      <!-- 集合驗證 -->
      <div class="p-6 bg-gray-900/50 rounded-xl border transition-all pa-4">
        <div class="text-cyan-400 text-3xl mb-4 text-center"><span class="mdi mdi-shield-star"></span></div>
        <h3 class="text-white font-semibold mb-2">權威認證</h3>
        <p class="text-blue-200/80 text-sm">
          {{ verifiedCollections }} 個認證集合<br />
          示例：{{ sampleCollection }}
        </p>
      </div>

      <!-- 所有權保障 -->
      <div class="p-6 bg-gray-900/50 rounded-xl border border-cyan-400/20 hover:border-cyan-400/40 transition-all pa-4">
        <div class="text-cyan-400 text-3xl mb-4 text-center"><span class="mdi mdi-lock-check"></span></div>
        <h3 class="text-white font-semibold mb-2">鏈上歸屬</h3>
        <p class="text-blue-200/80 text-sm">
          即時所有權追蹤<br />
          {{ uniqueOwners }} 位獨立持有者
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ assets: any[] }>()

// 計算平均屬性數量
const avgAttributes = computed(() => {
  return props.assets.length > 0
    ? Math.round(
        props.assets.reduce((acc, asset) => acc + asset.content.metadata.attributes.length, 0) / props.assets.length,
      )
    : 0
})

// 提取示例屬性
const sampleAttribute = computed(() => {
  const firstAsset = props.assets[0]
  return firstAsset?.content.metadata.attributes[0]?.trait_type || 'Background'
})

// 版稅比例 (取第一個 NFT 的設定)
const royaltyRate = computed(() => {
  return props.assets[0]?.royalty.percent * 100 || 4.2
})

// 創作者數量 (取第一個 NFT 的設定)
const creatorCount = computed(() => {
  return props.assets[0]?.creators.length || 2
})

// 已驗證集合數量
const verifiedCollections = computed(() => {
  return new Set(
    props.assets.filter((asset) => asset.grouping[0].verified).map((asset) => asset.grouping[0].group_value),
  ).size
})

// 示例集合名稱
const sampleCollection = computed(() => {
  return props.assets[0]?.grouping[0].collection_metadata.name || 'Famous Fox Federation'
})

// 獨立持有者數量
const uniqueOwners = computed(() => {
  return new Set(props.assets.map((asset) => asset.ownership.owner)).size
})
</script>
