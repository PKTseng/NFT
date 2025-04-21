import type { NftItem } from '@/types/assetsByOwner' // 根據你的實際類型路徑調整
import type { AssetData } from '@/types/assets'

export const getImageUrl = (asset: NftItem | AssetData | undefined): string => {
  // console.log(asset)

  const defaultImageUrl = 'https://placehold.co/300x300?text=No+Image&font=montserrat'

  if (!asset || !asset.content.files || asset.content.files.length === 0) return defaultImageUrl

  const imageFile = asset.content.files.find((file) => file.mime.startsWith('image/') && file.uri)

  return imageFile?.uri || imageFile?.cdn_uri || defaultImageUrl
}

export const formatRoyaltyPercent = (value: number | undefined): string => {
  if (typeof value !== 'number') return '0.0%'
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value)
}

export const shortenAddress = (address: string | undefined): string => {
  if (!address || address.length < 8) return address ?? ''
  return `${address.slice(0, 4)}...${address.slice(-4)}`
}

export const truncateText = (text: string | undefined, maxLength = 50): string => {
  if (!text) return ''
  return text.length <= maxLength ? text : `${text.slice(0, maxLength)}...`
}
