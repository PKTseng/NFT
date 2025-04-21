import { axiosIns } from '@/utils/request'

const API_KEY = import.meta.env.VITE_APP_API_KEY

export const getSearchAssets = (id: string) => {
  const payload = {
    jsonrpc: '2.0',
    id: 'test',
    method: 'getAsset',
    params: { id },
  }

  return axiosIns.post(`?api-key=${API_KEY}`, payload)
}
