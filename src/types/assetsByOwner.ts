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
  content: {
    $schema: string
    json_uri: string
    files: {
      uri: string
      cdn_uri: string
      mime: string
    }[]
    metadata: {
      description: string
      name: string
      symbol: string
      token_standard: string
      attributes: {
        trait_type: string
        value: string
      }[]
    }
    links: {
      image: string
      external_url?: string
    }
  }
  authorities: {
    address: string
    scopes: string[]
  }[]
  compression: {
    eligible: boolean
    compressed: boolean
    data_hash: string
    creator_hash: string
    asset_hash: string
    tree: string
    seq: number
    leaf_id: number
  }
  grouping: [
    {
      group_key: string
      group_value: string
      verified: boolean
      collection_metadata: {
        name: string
        symbol: string
        image: string
        description: string
        external_url: string
      }
    },
  ]
  royalty: {
    royalty_model: string
    target: string | null
    percent: number
    basis_points: number
    primary_sale_happened: boolean
    locked: boolean
  }
  creators: {
    address: string
    share: number
    verified: boolean
  }[]
  ownership: {
    frozen: boolean
    delegated: boolean
    delegate: string | null
    ownership_model: string
    owner: string
  }
  supply: number | null
  mutable: boolean
  burnt: boolean
  token_info: {
    token_accounts: {
      address: string
      balance: number
    }[]
    balance: number
    supply: number
    decimals: number
    token_program: string
    associated_token_address: string
  }
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
