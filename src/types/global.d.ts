import { PublicKey } from '@solana/web3.js'

declare global {
  interface Window {
    solana?: {
      isPhantom?: boolean
      isConnected: boolean
      publickey: PublicKey
      connect: () => Promise<{ publicKey: PublicKey }>
      disconnect: () => Promise<void>
      handleNotification: (e: any) => Promise<void>
      removeAllListeners: (e: string) => void
      request: (request: { method: string; params?: any }) => Promise<any>
      signAllTransactions: (e: any[]) => Promise<any[]>
      signAndSendAllTransactions: (e: any, t: any) => Promise<any>
      signAndSendTransaction: (e: any, t: any) => Promise<any>
      signIn: (e?: any) => Promise<any>
      signMessage: (e: any, t?: string) => Promise<any>
      signTransaction: (e: any) => Promise<any>
      on(event: 'connect', listener: (publicKey: PublicKey) => void): void
      on(event: 'disconnect', listener: () => void): void
      on(event: 'accountChanged', listener: (publicKey: PublicKey) => void): void
    }
  }
}

export {}
