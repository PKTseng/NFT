import { ref } from 'vue'
import { getAssetsByOwner } from '@/api/GetAssetsByOwner'
import type { JsonRpcResponse, NftItem } from '@/types/assetsByOwner'
import { useGlobalStore } from '@/stores/globalStore'

import { data } from '@/hooks/mockData'

export const useGetAssetsByOwner = () => {
  const globalStore = useGlobalStore()

  const assets = ref<NftItem[]>([])
  const error = ref<string | null>(null)
  const totalAssets = ref(0)
  const currentPage = ref(1)

  const fetchAssetsByOwner = async (page: number = 1, limit: number = 50) => {
    globalStore.startLoading()

    error.value = null

    try {
      console.log(limit)
      // const axiosResponse = await getAssetsByOwner(page, limit)
      // const res = axiosResponse.data as JsonRpcResponse
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

  const getOwnershipDetails = (asset: NftItem | undefined) => {
    if (!asset) return null

    return {
      owner: asset.ownership.owner,
      delegate: asset.ownership.delegate,
      isDelegated: asset.ownership.delegated,
      ownershipModel: asset.ownership.ownership_model,
      isFrozen: asset.ownership.frozen,
    }
  }

  const getCreatorDetails = (asset: NftItem | undefined) => {
    if (!asset) return null

    return asset.creators.map((creator) => ({
      address: creator.address,
      share: creator.share,
      verified: creator.verified,
    }))
  }

  // 獲取圖片URL（如果有的話）
  const getImageUrl = (asset: NftItem | undefined): string | null => {
    const defaultImageUrl = 'https://placehold.co/300x300?text=No+Image&font=montserrat'
    console.log(asset)
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
    fetchAssetsByOwner,

    getOwnershipDetails,
    getCreatorDetails,
    getImageUrl,
  }
}
