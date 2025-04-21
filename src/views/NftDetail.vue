<template>
  <v-btn color="primary" class="mb-4" @click="goOwner">回上一頁</v-btn>
  <div v-if="asset" class="mx-auto sm:p-6 lg:p-4">
    <div class="bg-white overflow-hidden">
      <div class="md:flex px-2">
        <!-- Image Section -->
        <div class="md:w-1/3 pa-4 flex justify-center items-start">
          <img
            :src="imageUrl"
            :alt="asset.content?.metadata?.name || 'Asset Image'"
            class="object-contain rounded-2xl"
            @error="onImageError"
          />
        </div>

        <!-- Details Section -->
        <div class="md:w-2/3 pa-4 flex flex-col justify-between">
          <div>
            <!-- Header -->
            <div class="mb-4">
              <div class="flex items-center justify-between mb-1">
                <h1 class="text-3xl font-bold text-gray-900">
                  {{ asset.content?.metadata?.name || 'Unnamed Asset' }}
                </h1>
                <span class="px-3 py-1 text-xs font-semibold text-indigo-800 bg-indigo-100 rounded-full">
                  {{ asset.interface }}
                </span>
              </div>
              <p v-if="asset.content?.metadata?.symbol" class="text-lg text-gray-500 font-medium">
                Symbol: {{ asset.content?.metadata?.symbol }}
              </p>
              <p class="text-sm text-gray-400 mt-1 break-all">ID: {{ asset.id }}</p>
            </div>

            <!-- Description -->
            <p v-if="asset.content?.metadata?.description" class="text-gray-700 mb-6">
              {{ asset.content?.metadata?.description }}
            </p>

            <!-- Core Info Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-6 text-sm">
              <DetailItem
                label="Owner"
                :value="shortenAddress(asset.ownership.owner)"
                :isAddress="true"
                :copyValue="asset.ownership.owner"
              />
              <DetailItem label="Token Standard" :value="asset.content?.metadata?.token_standard || 'N/A'" />
              <DetailItem v-if="asset.token_info" label="Decimals" :value="asset.token_info.decimals.toString()" />
              <DetailItem v-if="asset.token_info" label="Total Supply" :value="formattedSupply" />
              <DetailItem label="Mutable" :value="asset.mutable ? 'Yes' : 'No'" />
              <DetailItem label="Burnt" :value="asset.burnt ? 'Yes' : 'No'" />
              <DetailItem label="Compressed" :value="asset.compression.compressed ? 'Yes' : 'No'" />
              <DetailItem
                label="Royalty"
                :value="`${asset.royalty.percent * 100}% (${asset.royalty.basis_points} bps)`"
              />
              <DetailItem label="Ownership Model" :value="asset.ownership.ownership_model" />
              <DetailItem label="Frozen" :value="asset.ownership.frozen ? 'Yes' : 'No'" />
              <DetailItem label="Delegated" :value="asset.ownership.delegated ? 'Yes' : 'No'" />
              <DetailItem
                v-if="asset.ownership.delegate"
                label="Delegate"
                :value="shortenAddress(asset.ownership.delegate)"
                :isAddress="true"
                :copyValue="asset.ownership.delegate"
              />
            </div>

            <!-- Links -->
            <div v-if="asset.content?.links?.external_url" class="mb-6">
              <h3 class="text-sm font-medium text-gray-500 mb-1">External Link</h3>
              <a
                :href="asset.content.links.external_url"
                target="_blank"
                rel="noopener noreferrer"
                class="text-indigo-600 hover:text-indigo-800 break-all text-sm"
              >
                {{ asset.content.links.external_url }}
              </a>
            </div>

            <!-- Attributes (for NFTs mostly) -->
            <div
              v-if="asset.content?.metadata?.attributes && asset.content.metadata.attributes.length > 0"
              class="mb-6"
            >
              <h3 class="text-lg font-semibold text-gray-800 mb-2">Attributes</h3>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <div
                  v-for="(attr, index) in asset.content.metadata.attributes"
                  :key="index"
                  class="bg-gray-100 p-2 rounded text-center text-xs"
                >
                  <span class="block font-medium text-gray-600 uppercase">{{ attr.trait_type }}</span>
                  <span class="block text-gray-800">{{ attr.value }}</span>
                </div>
              </div>
            </div>

            <!-- Authorities -->
            <div v-if="asset.authorities && asset.authorities.length > 0" class="mb-6">
              <h3 class="text-lg font-semibold text-gray-800 mb-2">Authorities</h3>
              <ul class="space-y-1 text-sm">
                <li
                  v-for="(auth, index) in asset.authorities"
                  :key="index"
                  class="flex items-center justify-between bg-gray-50 pa-2 rounded"
                >
                  <span class="text-gray-600 font-mono break-all" :title="auth.address">
                    {{ shortenAddress(auth.address) }}
                  </span>
                  <span class="ml-2 px-2 py-0.5 text-md bg-blue-100 text-blue-800 rounded">
                    {{ auth.scopes.join(', ') }}
                  </span>
                </li>
              </ul>
            </div>

            <!-- Creators -->
            <div v-if="asset.creators && asset.creators.length > 0" class="mb-6">
              <h3 class="text-lg font-semibold text-gray-800 mb-2">Creators</h3>
              <ul class="space-y-1 text-sm">
                <li
                  v-for="creator in asset.creators"
                  :key="creator.address"
                  class="flex items-center justify-between bg-gray-50 p-2 rounded"
                >
                  <div class="flex items-center">
                    <span class="text-gray-600 font-mono break-all mr-2" :title="creator.address">
                      {{ shortenAddress(creator.address) }}
                    </span>
                    <svg
                      v-if="creator.verified"
                      class="w-4 h-4 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <svg
                      v-else
                      class="w-4 h-4 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span class="ml-2 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
                    Share: {{ creator.share }}%
                  </span>
                </li>
              </ul>
            </div>

            <!-- <TransferRecord /> -->
          </div>

          <!-- Footer Info -->
          <div class="mt-6 pt-4 border-t border-gray-200 text-xs text-gray-500">
            Data provided by Helius. Asset ID: {{ asset.id }}
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="text-center py-10 text-gray-500">Loading asset data...</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAssetsBySearch } from '@/hooks/UseSearchAssets'
import { useSignaturesForAsset } from '@/hooks/UseGetSignaturesForAsset'
import DetailItem from '@/components/DetailItem.vue'
import { getImageUrl, shortenAddress } from '@/utils/nft'
// import TransferRecord from '@/components/TransferRecord.vue'

const route = useRoute()
const router = useRouter()

const { asset, fetchAssetsBySearch } = useAssetsBySearch()
const { recordList, fetchSignaturesForAsset } = useSignaturesForAsset()

const imageLoadError = ref(false)

const goOwner = () => {
  router.go(-1)
}

// 格式化供應量 (處理大數字和 decimals)
const formattedSupply = computed<string>(() => {
  if (!asset.value?.token_info) {
    return 'N/A'
  }
  try {
    const supply = BigInt(asset.value.token_info.supply)
    const decimals = asset.value.token_info.decimals
    const divisor = BigInt(10 ** decimals)
    const integerPart = supply / divisor
    const fractionalPart = supply % divisor

    if (decimals === 0) {
      return integerPart.toString()
    }

    // 格式化小數部分，補零
    const fractionalString = fractionalPart.toString().padStart(decimals, '0')
    // 去掉末尾多餘的零
    const trimmedFractional = fractionalString.replace(/0+$/, '')

    let result = integerPart.toLocaleString() // 使用本地化格式化整數部分
    if (trimmedFractional.length > 0) {
      result += '.' + trimmedFractional
    }
    return result
  } catch (e) {
    console.error('Error formatting supply:', e)
    // 如果 supply 不是有效的數字或 BigInt，返回原始值或錯誤提示
    return String(asset.value.token_info.supply) || 'Invalid Supply'
  }
})

const imageUrl = computed(() => {
  if (!asset.value) return

  return getImageUrl(asset.value)
})

// 處理圖片加載失敗
const onImageError = () => {
  console.warn('Failed to load image:', imageUrl.value)
  imageLoadError.value = true // 設置錯誤標誌，computed 屬性會重新計算並返回 null
}

onMounted(async () => {
  if (!route.params.id) return

  await fetchAssetsBySearch(`${route.params.id}`)

  await fetchSignaturesForAsset(`${route.params.id}`)

  console.log(recordList.value)
})
</script>
