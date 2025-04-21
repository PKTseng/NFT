import { axiosIns } from '@/utils/request'

const API_KEY = import.meta.env.VITE_APP_API_KEY

export const getSearchAssets = (ownerAddress: string, page: number = 1, limit: number = 50) => {
  const payload = {
    jsonrpc: '2.0',
    id: 'my-id',
    method: 'searchAssets',
    params: {
      ownerAddress,
      tokenType: 'all',
      page,
      limit,
    },
  }

  return axiosIns.post(`?api-key=${API_KEY}`, payload)
}
