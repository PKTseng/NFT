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
          <span class="text-yellow">錢包未連接 !</span>
        </div>
      </div>

      <v-btn v-if="!walletConnected" :disabled="loading" rounded @click="connectWallet"> 連接 Phantom 錢包 </v-btn>
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
      <v-btn color="primary" class="px-4 py-2" rounded :disabled="loading || !walletConnected" @click="onMint">
        {{ loading ? `Minting (${retryCount}/${maxRetries})...` : 'Mint NFT' }}
      </v-btn>

      <v-btn color="primary" rounded :disabled="loading || !walletConnected" @click="fetchMyNfts">
        查看我的所有 NFT
      </v-btn>

      <v-btn v-if="error" rounded color="warning" @click="clearError"> 清除錯誤 </v-btn>
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

    <NftList :assets="myNfts" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { mintNft } from '@/utils/mint'
import { getSearchAssets } from '@/api/SearchAssets'
import { getAssetsByOwner } from '@/api/GetAssetsByOwner'
import NftList from '@/components/NftList.vue'

// 錢包狀態
const walletConnected = ref(false)
const walletAddress = ref('')
const walletObj = ref<PhantomProvider | null>(null)

const mintAddress = ref('')
const nftDetails = ref(null)
const myNfts = ref([])
const loading = ref(false)
const error = ref('')
const statusMessages = ref<{ time: string; message: string }[]>([])
const retryCount = ref(0)
const maxRetries = 3

// 添加狀態消息
const addStatus = (message: string) => {
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
    const provider = window?.phantom?.solana as PhantomProvider | undefined

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
    error.value = '無法連接錢包: ' + (e || '未知錯誤')
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
    if (!walletObj.value) {
      throw new Error('錢包未連接')
    }

    mintAddress.value = (await mintNft(walletObj.value)) as string

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

    addStatus(`錯誤: ${e}`)
  } finally {
    if (retryCount.value >= maxRetries || mintAddress.value) {
      loading.value = false
    }
  }
}

// 判斷是否應該重試的輔助函數
const shouldRetry = (error: any) => {
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
    addStatus(`獲取 NFT 詳情失敗: ${e || '未知錯誤'}`)
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
    error.value = '無法獲取錢包 NFT: ' + (e || '未知錯誤')
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
