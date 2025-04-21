import { ref } from 'vue'
import { getSearchAssets } from '@/api/SearchAssets'
import type { JsonRpcResponse, NftItem } from '@/types/assetsByOwner'
import { useGlobalStore } from '@/stores/globalStore'

import { data } from '@/mocks/Assets'

export const useGetSearchAssets = () => {
  const globalStore = useGlobalStore()

  const assets = ref<NftItem[]>([])
  const error = ref<string | null>(null)
  const totalAssets = ref(0)
  const currentPage = ref(1)

  const fetchAssetsBySearch = async (ownerAddress: string, page: number = 1, limit: number = 50) => {
    globalStore.startLoading()

    error.value = null

    try {
      // const axiosResponse = await getSearchAssets(ownerAddress, page, limit)
      // const res = axiosResponse.data as JsonRpcResponse
      // console.log(res)

      const res = data
      if (res && res.result) {
        assets.value = res.result.items
        totalAssets.value = res.result.total
        currentPage.value = page
      }

      console.log(res)

      return res
    } catch (err) {
      console.error('Error fetching assets by owner:', err)
      error.value = err instanceof Error ? err.message : '獲取資產時發生錯誤'
      return null
    } finally {
      globalStore.stopLoading()
    }
  }

  // 獲取圖片URL（如果有的話）
  const getImageUrl = (asset: NftItem | undefined): string | null => {
    const defaultImageUrl = 'https://placehold.co/300x300?text=No+Image&font=montserrat'

    if (!asset || !asset.content.files || asset.content.files.length === 0) return defaultImageUrl

    // 優先使用CDN URL
    const imageFile = asset.content.files.find((file) => file.mime.startsWith('image/') && file.uri)

    if (imageFile) {
      return imageFile.uri || imageFile.cdn_uri
    }

    return defaultImageUrl
  }

  return {
    assets,
    error,
    totalAssets,
    currentPage,
    fetchAssetsBySearch,
    getImageUrl,
  }
}
