import { Header } from '../../layout/Header'
import { Home } from '../../pages/home'
import { clusterApiUrl } from '@solana/web3.js'
import {
  WalletAdapterNetwork,
  // WalletError
} from '@solana/wallet-adapter-base'
import { useMemo } from 'react'
;('@solana/wallet-adapter-base')
import {
  CoinbaseWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react'

export const App = () => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet
  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network])
  console.log(endpoint)
  //wallet connection Error handling
  // const walletConnectionErr = (error = WalletError) => {
  //   console.log('Wallet Connection Error:', error)
  // }
  const wallet = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new CoinbaseWalletAdapter(),
      new SlopeWalletAdapter(),
      new TorusWalletAdapter(),
      new SolflareWalletAdapter({ network }),
    ],
    [network]
  )

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallet}>
        <WalletModalProvider>
          <main>
            <Header />
            <Home />
          </main>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
