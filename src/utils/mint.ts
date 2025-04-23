import { Metaplex, walletAdapterIdentity } from '@metaplex-foundation/js'
import { Connection, clusterApiUrl, LAMPORTS_PER_SOL } from '@solana/web3.js'

// 使用外部 URI 的 NFT 鑄造
export const mintNft = async (wallet: any) => {
  console.log('開始 NFT 鑄造過程 (外部 URI 方案)...')

  try {
    const connection = new Connection(clusterApiUrl('devnet')) // 使用 devnet 連接

    if (!wallet || !wallet.publicKey) {
      console.error('未提供有效錢包')
      throw new Error('請先連接錢包')
    }

    console.log('使用錢包地址:', wallet.publicKey.toBase58())

    // 檢查錢包餘額
    const balance = await connection.getBalance(wallet.publicKey)
    console.log(`錢包餘額: ${balance / LAMPORTS_PER_SOL} SOL`)

    if (balance < 0.05 * LAMPORTS_PER_SOL) {
      throw new Error('錢包餘額不足，需要至少 0.05 SOL 才能鑄造 NFT')
    }

    // 創建 Metaplex 實例
    const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(wallet))

    // 使用已經存在的外部資源 URI
    // 這是一個公共可用的示例 NFT 元數據 URI
    const externalUri = 'https://arweave.net/yIgHNXiXkQih9rWr5t_DovEEYwf2UU5jet-c6pC_d1o'

    console.log('使用外部元數據 URI:', externalUri)
    console.log('創建 NFT...')

    const { nft } = await metaplex.nfts().create({
      name: 'External NFT',
      symbol: 'EXT',
      uri: externalUri, // 使用外部 URI
      sellerFeeBasisPoints: 0,
    })

    console.log('NFT 鑄造成功:', nft.address.toBase58())
    return nft.address.toBase58()
  } catch (e) {
    console.error('NFT 鑄造過程中出錯:', e)
  }
}
