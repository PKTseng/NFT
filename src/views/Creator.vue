<template>
  <div class="min-h-screen">
    <v-data-table class="mt-5 elevation-3" :headers="viewHeader" :items="searchTable" items-per-page="50">
      <template #[`item.image`]="{ item }">
        <img v-if="item.image" :src="item.image" alt="asset image" class="object-cover w-full h-full" />
      </template>

      <template #[`item.description`]="{ item }">
        <v-tooltip location="top">
          <template #activator="{ props }">
            <span v-bind="props" class="truncate w-40 cursor-pointer">
              {{ truncateText(item.description) }}
            </span>
          </template>
          <span>{{ item.description }}</span>
        </v-tooltip>
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
    </v-data-table>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { VDataTable } from 'vuetify/components'
import { useGetAssetsByCreator } from '@/hooks/UseGetAssetsByCreator'
import { getImageUrl, formatRoyaltyPercent, shortenAddress, truncateText } from '@/utils/nft'

const { assets, fetchAssetsByCreator } = useGetAssetsByCreator()

const viewHeader: VDataTable['$props']['headers'] = [
  { title: '名稱', key: 'name', align: 'start' },
  { title: '圖片', key: 'image', align: 'start' },
  { title: '描述', key: 'description', align: 'start' },
  { title: 'Collection 名稱', key: 'collection', align: 'start' },
  { title: '擁有者地址', key: 'owner', align: 'start' },
  { title: '分潤比例', key: 'royalty', align: 'start' },
]

const formattedAssets = computed(() => {
  return assets.value.map((item) => {
    return {
      ...item,
      image: getImageUrl(item) ?? '',
      name: item.content.metadata.name,
      description: item.content.metadata.description,
      collection: item.grouping[0].collection_metadata.name,
      owner: item.ownership.owner,
      royalty: formatRoyaltyPercent(item.royalty.percent),
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

    const userLabelMatch = item.name.toLowerCase()?.includes(lowerCaseSearchTerm)
    const descriptionMatch = item.description.toLowerCase()?.includes(lowerCaseSearchTerm)
    const collectionMatch = item.collection.toLowerCase()?.includes(lowerCaseSearchTerm)
    const ownerMatch = item.owner.toLowerCase()?.includes(lowerCaseSearchTerm)
    const royaltyMatch = item.owner.toLowerCase()?.includes(lowerCaseSearchTerm)

    return userLabelMatch || descriptionMatch || collectionMatch || ownerMatch || royaltyMatch
  })
})

onMounted(async () => {
  await fetchAssetsByCreator(1, 50)
})
</script>

<style lang="scss" scoped></style>
