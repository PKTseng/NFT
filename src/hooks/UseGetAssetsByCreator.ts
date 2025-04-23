import { ref } from 'vue'
import { getAssetsByCreator } from '@/api/GetAssetsByCreator'
import type { JsonRpcResponse } from '@/types/assetsByOwner'
import { useGlobalStore } from '@/stores/globalStore'
import type { AssetData } from '@/types/assets'

import { data } from '@/mocks/Creator'

export const useGetAssetsByCreator = () => {
  const globalStore = useGlobalStore()

  const assets = ref<AssetData[]>([])
  const error = ref<string | null>(null)
  const totalAssets = ref(20)
  const currentPage = ref(1)

  const fetchAssetsByCreator = async (creatorAddress: string, page: number = 1, limit: number = 50) => {
    globalStore.startLoading()
    error.value = null

    try {
      const axiosResponse = await getAssetsByCreator(creatorAddress, page, limit)
      const res = axiosResponse.data as JsonRpcResponse

      // const res = data
      // console.log(res)
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
    fetchAssetsByCreator,
  }
}
