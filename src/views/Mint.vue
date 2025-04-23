<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { mintNft } from '@/utils/mint'
import { getSearchAssets } from '@/api/SearchAssets'
import { getAssetsByOwner } from '@/api/GetAssetsByOwner'

// 錢包狀態
const walletConnected = ref(false)
const walletAddress = ref('')
const walletObj = ref(null)

const mintAddress = ref('')
const nftDetails = ref(null)
const myNfts = ref([])
const loading = ref(false)
const error = ref('')
const statusMessages = ref([])
const retryCount = ref(0)
const maxRetries = 3

// 添加狀態消息
const addStatus = (message) => {
  statusMessages.value.push({ time: new Date().toLocaleTimeString(), message })
  // 保持消息列表在合理大小
  if (statusMessages.value.length > 10) {
    statusMessages.value.shift()
  }
}

// 連接到 Phantom 錢包
const connectWallet = async () => {
  try {
    error.value = ''
    addStatus('正在連接錢包...')

    // 檢查 Phantom 是否已安裝
    const provider = window?.phantom?.solana

    if (!provider?.isPhantom) {
      error.value = '請安裝 Phantom 錢包擴展'
      return
    }

    // 連接錢包
    const response = await provider.connect()
    walletObj.value = provider
    walletAddress.value = response.publicKey.toString()
    walletConnected.value = true

    addStatus(`錢包連接成功: ${walletAddress.value.slice(0, 8)}...`)
    console.log('錢包已連接:', walletAddress.value)
  } catch (e) {
    console.error('錢包連接錯誤:', e)
    error.value = '無法連接錢包: ' + (e.message || '未知錯誤')
    addStatus('錢包連接失敗')
  }
}

const onMint = async () => {
  if (!walletConnected.value) {
    error.value = '請先連接錢包'
    return
  }

  loading.value = true
  error.value = ''
  retryCount.value = 0
  addStatus('準備鑄造 NFT...')

  await attemptMint()
}

const attemptMint = async () => {
  try {
    addStatus('開始鑄造過程...')

    // 傳遞錢包對象給 mintNft 函數
    mintAddress.value = await mintNft(walletObj.value)

    addStatus(`NFT 鑄造成功: ${mintAddress.value.slice(0, 8)}...`)
    console.log('NFT Minted:', mintAddress.value)

    // 成功後自動獲取NFT詳情
    await fetchNftDetails()
  } catch (e) {
    console.error('Mint 失敗:', e)

    // 檢查是否需要重試
    if (retryCount.value < maxRetries && shouldRetry(e)) {
      retryCount.value++
      addStatus(`嘗試重新鑄造 (${retryCount.value}/${maxRetries})...`)

      // 稍等後重試
      setTimeout(() => {
        attemptMint()
      }, 2000)
      return
    }

    let errorMsg = '無法 mint NFT'

    // 提供更具體的錯誤信息
    if (e.message?.includes('insufficient funds') || e.message?.includes('Attempt to debit an account')) {
      errorMsg = '錢包餘額不足，請確保有足夠的 SOL'
    } else if (e.message?.includes('timeout') || e.message?.includes('net::ERR_CONNECTION_RESET')) {
      errorMsg = '網絡連接超時，請檢查網絡連接後重試'
    } else if (e.message?.includes('429')) {
      errorMsg = '請求過多，請稍後再試'
    } else {
      errorMsg = `鑄造失敗: ${e.message || '請查看控制台了解詳情'}`
    }

    error.value = errorMsg
    addStatus(`錯誤: ${errorMsg}`)
  } finally {
    if (retryCount.value >= maxRetries || mintAddress.value) {
      loading.value = false
    }
  }
}

// 判斷是否應該重試的輔助函數
const shouldRetry = (error) => {
  const msg = error.message || ''
  // 網絡錯誤、超時等情況下重試
  return (
    msg.includes('timeout') ||
    msg.includes('net::') ||
    msg.includes('429') ||
    msg.includes('socket') ||
    msg.includes('connection')
  )
}

const fetchNftDetails = async () => {
  if (!mintAddress.value) {
    error.value = '請先 mint NFT'
    return
  }

  addStatus('獲取 NFT 詳情...')

  try {
    const response = await getSearchAssets(mintAddress.value)
    nftDetails.value = response.data.result
    addStatus('NFT 詳情獲取成功')
    console.log('NFT 詳情:', nftDetails.value)
  } catch (e) {
    console.error('獲取 NFT 詳情失敗:', e)
    addStatus(`獲取 NFT 詳情失敗: ${e.message || '未知錯誤'}`)
    // 不阻止流程繼續
  }
}

const fetchMyNfts = async () => {
  if (!walletConnected.value) {
    error.value = '請先連接錢包'
    return
  }

  loading.value = true
  error.value = ''
  addStatus('獲取錢包中的 NFT...')

  try {
    const response = await getAssetsByOwner(walletAddress.value, 1, 20)
    myNfts.value = response.data.result?.items || []
    addStatus(`找到 ${myNfts.value.length} 個 NFT`)
    console.log('我的所有 NFT:', myNfts.value)
  } catch (e) {
    console.error('獲取我的 NFT 失敗:', e)
    error.value = '無法獲取錢包 NFT: ' + (e.message || '未知錯誤')
    addStatus('獲取 NFT 列表失敗')
  } finally {
    loading.value = false
  }
}

// 清除錯誤
const clearError = () => {
  error.value = ''
}

// 頁面加載時嘗試自動連接錢包
onMounted(() => {
  addStatus('頁面已加載')
  if (window?.phantom?.solana) {
    connectWallet()
  } else {
    addStatus('未檢測到 Phantom 錢包')
  }
})
</script>

<template>
  <div class="flex flex-col gap-4 p-4">
    <!-- 錢包連接狀態 -->
    <div class="flex items-center gap-2 mb-4">
      <div class="flex-1">
        <div v-if="walletConnected" class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-green-500"></div>
          <span class="font-medium text-white">錢包已連接</span>
          <span class="text-gray-500 truncate max-w-xs">{{ walletAddress }}</span>
        </div>
        <div v-else class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-red-500"></div>
          <span>錢包未連接</span>
        </div>
      </div>

      <button
        v-if="!walletConnected"
        class="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:bg-purple-300"
        :disabled="loading"
        @click="connectWallet"
      >
        連接 Phantom 錢包
      </button>
    </div>

    <!-- 操作日誌 -->
    <div class="mt-2 p-3 bg-gray-800 text-green-400 rounded font-mono text-sm max-h-40 overflow-y-auto">
      <div v-for="(status, index) in statusMessages" :key="index" class="mb-1">
        <span class="text-gray-500">[{{ status.time }}]</span> {{ status.message }}
      </div>
      <div v-if="statusMessages.length === 0" class="text-gray-500">等待操作...</div>
    </div>

    <!-- 按鈕區域 -->
    <div class="flex flex-wrap gap-4 mt-2">
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300 flex items-center"
        :disabled="loading || !walletConnected"
        @click="onMint"
      >
        <span v-if="loading" class="mr-2">
          <svg
            class="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </span>
        {{ loading ? `Minting (${retryCount}/${maxRetries})...` : 'Mint NFT' }}
      </button>

      <button
        class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-green-300"
        :disabled="loading || !walletConnected"
        @click="fetchMyNfts"
      >
        查看我的所有 NFT
      </button>

      <button v-if="error" class="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600" @click="clearError">
        清除錯誤
      </button>
    </div>

    <!-- 錯誤提示 -->
    <div v-if="error" class="mt-4 p-3 bg-red-900 border border-red-700 text-white rounded">
      <div class="font-bold mb-1">錯誤</div>
      {{ error }}
    </div>

    <!-- Mint 成功提示 -->
    <div v-if="mintAddress" class="mt-4 p-3 bg-green-900 border border-green-700 text-white rounded">
      <p class="font-medium">NFT 成功鑄造！</p>
      <p class="break-all text-sm">地址: {{ mintAddress }}</p>
    </div>

    <!-- NFT 詳情 -->
    <div v-if="nftDetails" class="mt-4 p-4 border border-gray-700 rounded">
      <h3 class="text-lg font-bold text-white">最新 NFT 詳情</h3>
      <pre class="bg-gray-900 p-2 mt-2 overflow-auto max-h-60 text-xs text-gray-300 rounded">{{
        JSON.stringify(nftDetails, null, 2)
      }}</pre>
    </div>

    <!-- NFT 列表 -->
    <div v-if="myNfts.length" class="mt-4">
      <h3 class="text-lg font-bold mb-2 text-white">我的所有 NFT ({{ myNfts.length }})</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="nft in myNfts" :key="nft.id" class="border border-gray-700 p-3 rounded">
          <div class="font-bold text-white">{{ nft.content?.metadata?.name || 'Unnamed NFT' }}</div>
          <div class="text-xs text-gray-500 break-all">{{ nft.id }}</div>
          <div v-if="nft.content?.links?.image" class="mt-2">
            <img :src="nft.content.links.image" class="w-full h-auto rounded" alt="NFT Image" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
