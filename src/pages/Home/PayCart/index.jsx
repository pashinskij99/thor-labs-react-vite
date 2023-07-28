import styles from './styles.module.scss'
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useState } from 'react'
import { QRCodeIcon, USDCIcon } from '../../../components/Icons'

export const PayCart = () => {
  const [balance, setBalance] = useState(null)

  const { connection } = useConnection()
  const wallet = useWallet()

  console.log({
    'connection >>': connection,
    'wallet >>': wallet,
    'publicKey >>': wallet.publicKey,
  })

  const getBalance = async () => {
    try {
      const balance = await connection.getBalance(wallet.publicKey)
      setBalance(balance)
      console.log('Balance:', balance)
    } catch (error) {
      console.error('Error fetching balance:', error)
    }
  }

  return (
    <div className={styles.pay}>
      <div className={styles.pay__header}>
        <div className={styles.pay__headerTextWrapper}>
          <USDCIcon />
          <div className={styles.pay__headerText}>Pay with USDC</div>
        </div>

        <>
          {wallet.connected && (
            <div className={styles.pay__disconnectWalletButton}>
              <WalletDisconnectButton>Disconnect</WalletDisconnectButton>
            </div>
          )}
        </>
      </div>

      {/* <button onClick={getBalance}>Get Balance</button>
      <span>{balance}</span> */}

      <div className={styles.pay__body}>
        <div className={styles.pay__totalPrice}>
          <div className={styles.pay__totalPriceText}>Total Price: </div>
          <div className={styles.pay__totalPriceCount}>
            ${import.meta.env.VITE_PRICE} USDC
          </div>
        </div>
        <div className={styles.pay__connectWalletButton}>
          <WalletMultiButton>Connect Wallet</WalletMultiButton>
        </div>
      </div>

      <div className={styles.pay__footer}>
        <div className={styles.pay__withQR}>
          <div className={styles.pay__withQRText}>Pay with QR</div>
          <div className={styles.pay__withQRIcon}>
            <QRCodeIcon />
          </div>
        </div>
      </div>
    </div>
  )
}
