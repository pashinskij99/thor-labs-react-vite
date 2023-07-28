import clsx from 'clsx'
import styles from './styles.module.scss'
import { useContext, useState } from 'react'
import ThemeToggleButton from '../../components/UI/Button/ThemeToggle'
import { ThemeContext } from '../../theme/ThemeContext'

export const Header = () => {
  const { setTheme, theme } = useContext(ThemeContext)

  const handleTheme = () => {
    setTheme((prevState) => (prevState === 'light' ? 'dark' : 'light'))
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

        <div className={styles.header__theme}>
          <ThemeToggleButton
            theme={theme}
            invertedIconLogic
            onChange={handleTheme}
          />
        </div>
      </div>
    </div>
  )
}
