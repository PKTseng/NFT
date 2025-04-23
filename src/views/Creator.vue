<template>
  <NftList :assets="assets" />

  <div class="flex justify-center items-center col-span-full mt-4">
    <Pagination v-model="currentPage" :total-pages="totalAssets" />
  </div>
</template>

<script setup lang="ts">
import { nextTick, watch } from 'vue'
import Pagination from '@/components/Pagination.vue'
import { useGetAssetsByCreator } from '@/hooks/UseGetAssetsByCreator'
import { useWalletStore } from '@/stores/walletStore'
import NftList from '@/components/NftList.vue'

const walletStore = useWalletStore()
const { assets, currentPage, totalAssets, fetchAssetsByCreator } = useGetAssetsByCreator()

const loadAssets = async () => {
  try {
    const address = walletStore.publicKey?.toString()
    if (!address) return

    await fetchAssetsByCreator(address, currentPage.value, totalAssets.value)
  } catch (err) {
    console.error('Failed to load assets:', err)
  }
}

watch(
  () => currentPage.value,
  async (newPage) => {
    if (walletStore.publicKey) {
      await fetchAssetsByCreator(walletStore.publicKey.toString(), newPage, totalAssets.value)
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
</script>

<style lang="scss" scoped></style>
