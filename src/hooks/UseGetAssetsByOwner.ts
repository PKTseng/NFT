import { ref } from 'vue'
import { getAssetsByOwner } from '@/api/getAssetsByOwner'
import type { JsonRpcResponse, NftItem } from '@/types/assetsByOwner'

export const useGetAssetsByOwner = () => {
  const assets = ref<NftItem[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const totalAssets = ref(0)
  const currentPage = ref(1)

  const fetchAssetsByOwner = async (page: number = 1, limit: number = 50) => {
    loading.value = true
    error.value = null

    try {
      const axiosResponse = await getAssetsByOwner(page, limit)
      const res = axiosResponse.data as JsonRpcResponse

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
      loading.value = false
    }
  }

  const getAssetById = (assetId: string): NftItem | undefined => {
    return assets.value.find((asset) => asset.id === assetId)
  }

  const getNftContentDetails = (asset: NftItem | undefined) => {
    if (!asset) return null

    return {
      schema: asset.content.$schema,
      jsonUri: asset.content.json_uri,
      files: asset.content.files.map((file) => ({
        uri: file.uri,
        cdnUri: file.cdn_uri,
        mimeType: file.mime,
      })),
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
    if (!asset || !asset.content.files || asset.content.files.length === 0) return null

    // 優先使用CDN URL
    const imageFile = asset.content.files.find((file) => file.mime.startsWith('image/') && file.cdn_uri)

    if (imageFile) {
      return imageFile.cdn_uri || imageFile.uri
    }

    return null
  }

  return {
    assets,
    loading,
    error,
    totalAssets,
    currentPage,
    fetchAssetsByOwner,
    getAssetById,
    getNftContentDetails,
    getOwnershipDetails,
    getCreatorDetails,
    getImageUrl,
  }
}
