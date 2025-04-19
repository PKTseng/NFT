<template>
  <div>
    <div v-if="loading">載入中...</div>
    <div v-else-if="assets.length > 0" class="grid grid-cols-3 gap-4">
      <div v-for="asset in assets" :key="asset.id" class="border p-4 rounded">
        <img v-if="getImageUrl(asset)" :src="getImageUrl(asset)" alt="NFT" class="w-full h-auto" />
        <h3 class="mt-2 font-bold">{{ asset.id.slice(0, 8) }}...</h3>
      </div>
    </div>
    <div v-else>沒有找到NFT資產</div>
  </div>
</template>

<script setup lang="ts">
import { useGetAssetsByOwner } from '@/hooks/UseGetAssetsByOwner'
import { onMounted } from 'vue'

const { assets, loading, fetchAssetsByOwner, getImageUrl } = useGetAssetsByOwner()

onMounted(async () => {
  await fetchAssetsByOwner(1, 10)
})
</script>
