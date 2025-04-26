<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- 歡迎區域 -->
    <Welcome />

    <CoreFeature :assets="assets" />

    <!--  精選 NFT 區域 -->
    <Featured />

    <!-- 關於我區域 -->
    <About />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useGetAssetsByCreator } from '@/hooks/UseGetAssetsByCreator'
import Welcome from './components/Welcome.vue'
import CoreFeature from './components/CoreFeature.vue'
import Featured from './components/Featured.vue'
import About from './components/About.vue'

const { assets, fetchAssetsByCreator } = useGetAssetsByCreator()

const address = ref('D3XrkNZz6wx6cofot7Zohsf2KSsu2ArngNk8VqU9cTY3')
onMounted(() => {
  fetchAssetsByCreator(address.value, 1, 3)
})
</script>
