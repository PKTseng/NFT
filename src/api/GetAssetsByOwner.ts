import { axiosIns } from '@/utils/request'

const API_KEY = import.meta.env.VITE_APP_API_KEY

export const getAssetsByOwner = (page: number = 1, limit: number = 50) => {
  const payload = {
    jsonrpc: '2.0', // JSON-RPC 協議版本，用於標準化遠程過程調用
    id: 'text', // 請求的唯一識別符，用於對應請求和響應
    method: 'getAssetsByOwner', // API 方法名稱（此處未指定具體值）
    params: {
      ownerAddress: '86xCnPeV69n6t3DnyGvkKobf9FdN2H9oiVDdaMpo2MMY', // 目標錢包地址（Solana 格式）

      page, // 分頁參數：當前頁碼（此處未指定具體值）
      limit, // 分頁參數：每頁顯示的項目數量（此處未指定具體值）

      sortBy: {
        // 排序設置
        sortBy: 'created', // 按照創建時間進行排序
        sortDirection: 'asc', // 升序排列（從早到晚）
      },

      options: {
        // 查詢選項，控制返回的數據內容
        showUnverifiedCollections: true, // 顯示未經驗證的收藏品
        showCollectionMetadata: true, // 顯示收藏品的元數據信息
        showGrandTotal: true, // 顯示資產總計數據
        showFungible: true, // 顯示同質化代幣（如一般貨幣）
        showNativeBalance: true, // 顯示原生幣種餘額（如 SOL）
        showInscription: true, // 顯示鏈上銘文數據
        showZeroBalance: true, // 顯示餘額為零的資產項目
      },
    },
  }

  return axiosIns.post(`?api-key=${API_KEY}`, payload)
}
