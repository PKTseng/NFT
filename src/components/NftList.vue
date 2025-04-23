<template>
  <div class="min-h-screen">
    <v-data-table
      class="mt-5 elevation-3"
      :headers="viewHeader"
      :items="formattedAssets"
      items-per-page="50"
      hide-default-footer
    >
      <template #[`item.image`]="{ item }">
        <img v-if="item.image" :src="item.image" alt="asset image" class="object-cover w-full h-full" />
        <div v-else class="bg-gray-200 flex items-center justify-center h-12 w-12">
          <span class="text-xs text-gray-500">無圖片</span>
        </div>
      </template>

      <template #[`item.description`]="{ item }">
        <v-tooltip v-if="item.description" location="top">
          <template #activator="{ props }">
            <span v-bind="props" class="truncate w-40 cursor-pointer">
              {{ truncateText(item.description) }}
            </span>
          </template>
          <span>{{ item.description }}</span>
        </v-tooltip>
        <span v-else class="text-gray-400">-</span>
      </template>

      <template #[`item.owner`]="{ item }">
        <v-tooltip location="top">
          <template #activator="{ props }">
            <span v-bind="props" class="truncate w-40 cursor-pointer">
              {{ shortenAddress(item.owner) }}
            </span>
          </template>
          <span>{{ item.owner }}</span>
        </v-tooltip>
      </template>

      <template #[`item.creator`]="{ item }">
        <v-tooltip v-if="item.creator" location="top">
          <template #activator="{ props }">
            <span v-bind="props" class="truncate w-40 cursor-pointer">
              {{ shortenAddress(item.creator) }}
            </span>
          </template>
          <span>{{ item.creator }}</span>
        </v-tooltip>
        <span v-else class="text-gray-400">-</span>
      </template>
    </v-data-table>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { VDataTable } from 'vuetify/components'
import { shortenAddress, truncateText } from '@/utils/nft'
import type { AssetData } from '@/types/assets'

const props = defineProps<{
  assets: AssetData | AssetData[]
}>()

// 確保 assets 是一個陣列，即使只傳入單一物件
const assetsArray = computed(() => {
  return Array.isArray(props.assets) ? props.assets : [props.assets]
})

const viewHeader: VDataTable['$props']['headers'] = [
  { title: '名稱', key: 'name', align: 'start' },
  { title: '圖片', key: 'image', align: 'start' },
  { title: 'Symbol', key: 'symbol', align: 'start' },
  { title: 'Token 類型', key: 'tokenStandard', align: 'start' },
  { title: '描述', key: 'description', align: 'start' },
  { title: 'Collection 名稱', key: 'collection', align: 'start' },
  { title: '擁有者地址', key: 'owner', align: 'start' },
  { title: '創建者', key: 'creator', align: 'start' },
  { title: '創建者份額', key: 'creatorShare', align: 'start' },
  { title: '分潤比例', key: 'royalty', align: 'start' },
  { title: '可變性', key: 'mutable', align: 'start' },
]

const formattedAssets = computed(() => {
  return assetsArray.value.map((item) => {
    // 嘗試獲取 JSON URI 中的圖片 (如果存在)
    const jsonUri = item.content?.json_uri || ''

    return {
      id: item.id || '',
      // 使用 content.metadata 中的名稱，如果不存在則顯示 ID 的縮短版本
      name: item.content?.metadata?.name || shortenAddress(item.id || ''),
      // 目前沒有圖片數據，可以從 json_uri 中獲取或顯示預設
      image: '',
      symbol: item.content?.metadata?.symbol || '-',
      tokenStandard: item.content?.metadata?.token_standard || '-',
      // 描述可能不存在
      description: '-',
      // 集合資訊可能不存在
      collection:
        item.grouping && item.grouping[0]?.collection_metadata?.name ? item.grouping[0].collection_metadata.name : '-',
      owner: item.ownership?.owner || '-',
      // 創建者資訊
      creator: (item.creators && item.creators[0]?.address) || '-',
      creatorShare: item.creators && item.creators[0]?.share ? `${item.creators[0].share}%` : '-',
      // 格式化分潤比例
      royalty: typeof item.royalty?.percent === 'number' ? `${item.royalty.percent}%` : '-',
      mutable: item.mutable ? '可變更' : '不可變更',
      // 其他可能需要顯示的信息
      balance: item.token_info?.balance || 0,
      supply: item.token_info?.supply || 0,
    }
  })
})

const searchTerm = ref('')
const searchTable = computed(() => {
  if (searchTerm.value === '') {
    return formattedAssets.value
  }

  return formattedAssets.value.filter((item) => {
    const lowerCaseSearchTerm = searchTerm.value.toLowerCase()

    const nameMatch = String(item.name).toLowerCase()?.includes(lowerCaseSearchTerm)
    const symbolMatch = String(item.symbol).toLowerCase()?.includes(lowerCaseSearchTerm)
    const descriptionMatch = String(item.description).toLowerCase()?.includes(lowerCaseSearchTerm)
    const collectionMatch = String(item.collection).toLowerCase()?.includes(lowerCaseSearchTerm)
    const ownerMatch = String(item.owner).toLowerCase()?.includes(lowerCaseSearchTerm)
    const creatorMatch = String(item.creator).toLowerCase()?.includes(lowerCaseSearchTerm)

    return nameMatch || symbolMatch || descriptionMatch || collectionMatch || ownerMatch || creatorMatch
  })
})
</script>

<style lang="scss" scoped></style>
