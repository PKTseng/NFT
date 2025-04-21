// Main JSON-RPC response
export interface JsonRpcResponse {
  jsonrpc: string
  result: ResultData
  id: string
}

// Result structure
export interface ResultData {
  total: number
  limit: number
  page: number
  items: NftItem[]
}

// NFT Item
export interface NftItem {
  interface: string
  id: string
  content: NftContent
  authorities: Authority[]
  compression: Compression
  grouping: Grouping[]
  royalty: Royalty
  creators: Creator[]
  ownership: Ownership
  supply: Supply
  mutable: boolean
  burnt: boolean
}

// NFT Content
export interface NftContent {
  $schema: string
  json_uri: string
  files: FileInfo[]
  metadata: {
    description: string // NFT 詳細描述
    name: string // NFT 名稱
    symbol: string // NFT 代號
    token_standard: string // 非同質化資產（NFT）
  }
}

// File Information
export interface FileInfo {
  uri: string
  cdn_uri: string
  mime: string
}

// Authority Information
export interface Authority {
  address: string
  scopes: string[]
}

// Compression Information
export interface Compression {
  eligible: boolean
  compressed: boolean
  data_hash: string
  creator_hash: string
  asset_hash: string
  tree: string
  seq: number
  leaf_id: number
}

// Grouping Information
export interface Grouping {
  group_key: string // 類似 Collection Group 的標籤
  group_value: string // Collection 的地址（代表此 NFT 屬於哪個系列）
  verified: boolean // 是否為官方驗證過的 Collection
  collection_metadata: {
    name: string // Collection 名稱
    symbol: string
    image: string // Collection 圖片
    description: string
    external_url: string // Collection 官網
  }
}

// Royalty Information
export interface Royalty {
  royalty_model: string
  target: null | string
  percent: number
  basis_points: number
  primary_sale_happened: boolean
  locked: boolean
}

// Creator Information
export interface Creator {
  address: string
  share: number
  verified: boolean
}

// Ownership Information
export interface Ownership {
  frozen: boolean
  delegated: boolean
  delegate: string
  ownership_model: string
  owner: string
}

// Supply Information
export interface Supply {
  print_max_supply: number
  print_current_supply: number
  edition_nonce: number
}
