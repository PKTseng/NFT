export interface AssetData {
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
