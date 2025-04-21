import { axiosIns } from '@/utils/request'

const API_KEY = import.meta.env.VITE_APP_API_KEY

export const getAssetsByCreator = (page: number = 1, limit: number = 50) => {
  const payload = {
    jsonrpc: '2.0',
    id: 'text',
    method: 'getAssetsByCreator',
    params: {
      creatorAddress: 'D3XrkNZz6wx6cofot7Zohsf2KSsu2ArngNk8VqU9cTY3',
      page,
      limit,
      sortBy: {
        sortBy: 'created',
        sortDirection: 'asc',
      },
      options: {
        showUnverifiedCollections: true,
        showCollectionMetadata: true,
        showGrandTotal: true,
        showInscription: true,
      },
    },
  }

  return axiosIns.post(`?api-key=${API_KEY}`, payload)
}
