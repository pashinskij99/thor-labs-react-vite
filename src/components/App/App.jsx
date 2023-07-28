import { Header } from '../../layout/Header'
import { Home } from '../../pages/Home'
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
import { ToastContainer } from 'react-toastify'

export const App = () => {
  const network = WalletAdapterNetwork.Devnet
  const endpoint = useMemo(() => clusterApiUrl(network), [network])
  console.log(endpoint)

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
          <ToastContainer
            position='bottom-right'
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='light'
          />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
