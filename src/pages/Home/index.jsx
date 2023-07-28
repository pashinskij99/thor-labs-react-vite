import clsx from 'clsx'
import styles from './styles.module.scss'
import {
  QRCodeIcon,
  QuestionIcon,
  ShareIcon,
  USDCIcon,
} from '../../components/Icons'
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useState } from 'react'
import { truncateString } from '../../utils/truncateString'

export const Home = () => {
  return (
    <div className={styles.home}>
      <div className={clsx('container', styles.home__container)}>
        <div className={styles.paymentCart}>
          <div className={styles.paymentCart__header}>
            <div className={styles.paymentCart__statusWrapper}>
              <QuestionIcon className={styles.paymentCart__statusIcon} />
              <p className={styles.paymentCart__status}>Unverified</p>
            </div>

            <div className={styles.paymentCart__highlightedWrapper}>
              <p className={styles.paymentCart__highlightedText}>Recipient:</p>
              <a
                href={`https://solscan.io/account/${
                  import.meta.env.VITE_WALLET_TO_TRANSFER
                }`}
                target='_blank'
                className={styles.paymentCart__highlightedLink}
                rel='noreferrer'
              >
                {truncateString(import.meta.env.VITE_WALLET_TO_TRANSFER, 6, 3)}
              </a>
            </div>
          </div>

          <div className={styles.paymentCart__main}>
            <div className={styles.paymentCart__mainHeader}>
              <h2 className={styles.paymentCart__title}>Test</h2>
              <h4 className={styles.paymentCart__price}>$1 USDC</h4>
            </div>

            <p className={styles.paymentCart__message}>Test</p>
          </div>

          <div className={styles.paymentCart__footer}>
            <a
              className={styles.paymentCart__reportLink}
              target='_blank'
              href='https://solscan.io/address/dick3qAa8WbS3DyimJhorzMSMYbJUAy2YHWKHYwwmhE?cluster=mainnet'
              rel='noreferrer'
            >
              REPORT LINK
            </a>

            <a className={styles.paymentCart__share} href='#'>
              <p className={styles.paymentCart__shareText}>Share on</p>
              <div className={styles.paymentCart__shareIcon}>
                <ShareIcon />
              </div>
            </a>
          </div>
        </div>
        <div className={styles.rightSide}>
          <Pay />

          <p className={styles.payDescription}>
            <b className={styles.payDescription__b}>Disclaimer:</b> This is a
            DeFi payment that can&apos;t be reversed. Funds go directly to the
            merchant.{' '}
            <a className={styles.payDescription__link} href='#'>
              See our terms
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

const Pay = () => {
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
          <div className={styles.pay__headerIcon}>
            <USDCIcon />
          </div>
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
