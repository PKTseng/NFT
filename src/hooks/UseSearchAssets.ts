import { ref } from 'vue'
import { getSearchAssets } from '@/api/SearchAssets'
import type { AssetData } from '@/types/assets'
import { useGlobalStore } from '@/stores/globalStore'

// import { data } from '@/mocks/Assets'

export const useAssetsBySearch = () => {
  const globalStore = useGlobalStore()

  const asset = ref<AssetData | null>(null)
  const error = ref<string | null>(null)

  const fetchAssetsBySearch = async (id: string) => {
    globalStore.startLoading()

    error.value = null

    try {
      const response = await getSearchAssets(id)
      const res = response.data.result as AssetData
      // console.log(res)

      // const res = data as AssetData

      if (res) {
        asset.value = res
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
    asset,
    error,
    fetchAssetsBySearch,
  }
}
