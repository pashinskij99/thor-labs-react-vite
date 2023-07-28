/* eslint-disable no-unused-vars */
import clsx from 'clsx'
import styles from './styles.module.scss'
import { QuestionIcon, ShareIcon } from '../../components/Icons'

import { truncateString } from '../../utils/truncateString'
import { PayCart } from './PayCart'
import ReactSwitch from 'react-switch'
import ThemeToggleButton from '../../components/UI/Button/ThemeToggle'

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
          <PayCart />

          <div className={styles.payDescription}>
            <p className={styles.payDescription__description}>
              <b className={styles.payDescription__b}>Disclaimer:</b> This is a
              DeFi payment that can&apos;t be reversed. Funds go directly to the
              merchant.{' '}
              <a className={styles.payDescription__link} href='#'>
                See our terms
              </a>
            </p>

            <div className={styles.payDescription__additional}>
              {/* <img
                className={styles.payDescription__additionalImg}
                src='/images/logo/logo-bigger.png'
                alt='logo'
              /> */}
              <p className={styles.payDescription__additionalAudited}>
                Audited
              </p>
              <ThemeToggleButton
                className={
                  styles.payDescription__additionalAuditedThemeSwitcher
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
