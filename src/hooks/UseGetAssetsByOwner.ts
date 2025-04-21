import { ref } from 'vue'
import { getAssetsByOwner } from '@/api/GetAssetsByOwner'
import type { JsonRpcResponse, NftItem } from '@/types/assetsByOwner'
import { useGlobalStore } from '@/stores/globalStore'

import { data } from '@/mocks/Owner'

export const useGetAssetsByOwner = () => {
  const globalStore = useGlobalStore()

  const assets = ref<NftItem[]>([])
  const error = ref<string | null>(null)
  const totalAssets = ref(0)
  const currentPage = ref(1)

  const fetchAssetsByOwner = async (ownerAddress: string, page: number = 1, limit: number = 50) => {
    globalStore.startLoading()

    error.value = null

    try {
      const axiosResponse = await getAssetsByOwner(ownerAddress, page, limit)
      const res = axiosResponse.data as JsonRpcResponse
      // console.log(res)

      // const res = data
      if (res && res.result) {
        assets.value = res.result.items
        totalAssets.value = res.result.total
        currentPage.value = page
      }

      return res
    } catch (err) {
      console.error('Error fetching assets by owner:', err)
      error.value = err instanceof Error ? err.message : '獲取資產時發生錯誤'
      return null
    } finally {
      globalStore.stopLoading()
    }
  }

  return {
    assets,
    error,
    totalAssets,
    currentPage,
    fetchAssetsByOwner,
  }
}
