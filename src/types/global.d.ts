interface PhantomProvider {
  isPhantom: boolean
  publicKey?: { toString(): string }
  isConnected?: boolean
  signTransaction: (transaction: any) => Promise<any>
  signAllTransactions: (transactions: any[]) => Promise<any[]>
  signMessage: (message: Uint8Array) => Promise<{ signature: Uint8Array }>
  connect: () => Promise<{ publicKey: { toString(): string } }>
  disconnect: () => Promise<void>
  on: (event: string, callback: (...args: any[]) => void) => void
}

interface Window {
  phantom?: {
    solana?: PhantomProvider
  }
}
