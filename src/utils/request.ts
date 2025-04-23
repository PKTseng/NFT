import axios from 'axios'
import { useNetworkStore } from '@/stores/networkStore'

export const controller = new AbortController()

// 不直接使用環境變量，改為從 store 獲取
const createAxiosInstance = () => {
  const networkStore = useNetworkStore()

  // 確保 store 已初始化
  networkStore.initNetwork()

  return axios.create({
    baseURL: networkStore.currentBaseUrl,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const axiosIns = createAxiosInstance()

// 添加一個重新配置axios實例的函數，當網絡切換時調用
export const reconfigureAxios = () => {
  const networkStore = useNetworkStore()
  axiosIns.defaults.baseURL = networkStore.currentBaseUrl
}
