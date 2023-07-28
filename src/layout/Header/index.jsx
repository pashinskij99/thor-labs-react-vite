import clsx from 'clsx'
import styles from './styles.module.scss'
import { useCallback, useContext, useEffect, useState } from 'react'
// import ThemeToggleButton from '../../components/UI/Button/ThemeToggle'
import { ThemeContext, themes } from '../../theme/ThemeContext'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { truncateString } from '../../utils/truncateString'
import {
  CopyIcon,
  DisconnectWalletIcon,
  USDCIcon,
} from '../../components/Icons'
import { toast } from 'react-toastify'

function UserPanel(props) {
  const [balance, setBalance] = useState(null)
  // const [isCopied, setIsCopied] = useState(false)

  const { connection } = useConnection()
  const wallet = useWallet()

  const getBalance = useCallback(async () => {
    try {
      const balance = await connection.getBalance(wallet.publicKey)
      setBalance(balance)
      console.log('Balance:', balance)
    } catch (error) {
      console.error('Error fetching balance:', error)
    }
  }, [connection, wallet.publicKey])

  async function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text)
    } else {
      return document.execCommand('copy', true, text)
    }
  }

  const notify = () => toast.success('The text has been copied!')

  const handleCopyClick = (copyText) => {
    copyTextToClipboard(copyText)
      .then(() => {
        notify()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getBalance()
  }, [getBalance, wallet.publicKey])

  return (
    <div className={styles.header__userPanel}>
      <div className={styles.header__userPanelUSDC}>
        <div className={styles.header__userPanelUSDCText}>
          <p className={styles.header__userPanelUSDCCount}>
            ${wallet.publicKey && balance}
          </p>
          <p className={styles.header__userPanelUSDCDesc}>USDC</p>
        </div>
        <USDCIcon className={styles.header__userPanelUSDCIcon} />
      </div>
      {/* <div className={styles.header__userPanelSOL}>
        <div className={styles.header__userPanelSOLText}>
          <p className={styles.header__userPanelSOLCount}>0</p>
          <p className={styles.header__userPanelSOLDesc}>SOL</p>
        </div>
        <SOLIcon className={styles.header__userPanelSOLIcon} />
      </div> */}

      <div className={styles.header__userPanelInfo}>
        <div className={styles.header__userPanelInfoId}>
          {truncateString(props.publicKey.toBase58(), 6, 3)}
          <button
            onClick={() => handleCopyClick(props.publicKey.toBase58())}
            className={styles.header__userPanelInfoIdCopy}
          >
            <CopyIcon />
          </button>
        </div>
        <div className={styles.header__userPanelInfoStatus}>
          Connected wallet
        </div>
      </div>

      <button
        onClick={wallet.disconnect}
        className={styles.header__userPanelDisconnect}
      >
        <DisconnectWalletIcon />
      </button>

      {/* <div className={styles.header__theme}>
        <ThemeToggleButton
          theme={props.theme}
          invertedIconLogic
          onChange={props.handleTheme}
        />
      </div> */}
    </div>
  )
}

export const Header = () => {
  const { setTheme, theme } = useContext(ThemeContext)
  const wallet = useWallet()

  const handleTheme = () => {
    setTheme((prevState) =>
      prevState === themes.light ? themes.dark : themes.light
    )
  }

  return (
    <div className={styles.header}>
      <div className={clsx('container', styles.header__container)}>
        <img
          className={styles.header__logo}
          src='/images/logo/logo.png'
          alt='Logo'
          width={60}
          height={60}
        />

        {wallet.connected ? (
          <UserPanel
            theme={theme}
            publicKey={wallet.publicKey}
            handleTheme={handleTheme}
          />
        ) : null}
      </div>
    </div>
  )
}
