<template>
  <div v-if="assets.length > 0" class="min-h-screen flex flex-col items-center">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 min-h-screen mt-4"
    >
      <div
        v-for="asset in assets"
        :key="asset.id"
        class="rounded-xl cursor-pointer overflow-hidden flex flex-col bg-white shadow-md"
        @click="goDetail(asset)"
      >
        <!-- 圖片 -->
        <div class="overflow-hidden rounded-t-xl h-full">
          <img
            :src="getImageUrl(asset) ?? ''"
            alt="asset image"
            class="transition-transform duration-300 hover:scale-125 object-cover w-full h-full"
          />
        </div>

        <!-- 資訊 -->
        <div class="flex flex-col justify-between bg-white pa-4 h-[200px]">
          <!-- 名稱 -->
          <p class="font-bold text-xl">{{ asset.content.metadata.name }}</p>

          <!-- Collection 名稱 -->
          <p class="text-gray-600">
            Collection: {{ asset.grouping?.[0]?.collection_metadata?.name || 'Uncategorized' }}
          </p>

          <!-- 擁有者地址 -->
          <p class="text-gray-600">
            Owner: {{ asset.ownership.owner.slice(0, 4) }}...{{ asset.ownership.owner.slice(-4) }}
          </p>

          <!-- 分潤比例 -->
          <p v-if="asset.royalty?.percent" class="text-gray-600">
            Royalty: {{ formatRoyaltyPercent(asset.royalty.percent) }}
          </p>
        </div>
      </div>

      <div class="flex justify-center items-center col-span-full mt-4">
        <Pagination v-model="currentPage" :total-pages="totalAssets" />
      </div>
    </div>
  </div>

  <div v-else class="min-h-screen max-w-xl mx-auto">沒有找到NFT資產</div>
</template>

<script setup lang="ts">
import { watch, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useGetAssetsByOwner } from '@/hooks/UseGetAssetsByOwner'
import { useWalletStore } from '@/stores/useWallet'
import { getImageUrl, formatRoyaltyPercent } from '@/utils/nft'
import type { NftItem } from '@/types/assetsByOwner'
import Pagination from '@/components/Pagination.vue'

const walletStore = useWalletStore()
const router = useRouter()
const { assets, currentPage, totalAssets, fetchAssetsByOwner } = useGetAssetsByOwner()

const loadAssets = async () => {
  try {
    const address = walletStore.publicKey?.toString()
    if (!address) return

    await fetchAssetsByOwner(address, currentPage.value, totalAssets.value)
  } catch (err) {
    console.error('Failed to load assets:', err)
  }
}

watch(
  () => currentPage.value,
  async (newPage) => {
    if (walletStore.publicKey) {
      await fetchAssetsByOwner(walletStore.publicKey.toString(), newPage, totalAssets.value)
      await nextTick()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  },
)

watch(
  () => walletStore.publicKey,
  async (newPublicKey) => {
    if (newPublicKey) {
      currentPage.value = 1
      await loadAssets()
    } else {
      assets.value = []
    }
  },
  { immediate: true },
)

const goDetail = (asset: NftItem) => {
  router.push({
    name: 'nft-detail',
    params: {
      id: asset.id,
    },
  })
}

onMounted(loadAssets)
</script>
