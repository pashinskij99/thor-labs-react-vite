import clsx from 'clsx'
import styles from './styles.module.scss'

const defaultOptions = {
  invertedIconLogic: false,
}

const ThemeToggleButton = ({
  theme,
  onChange,
  invertedIconLogic = defaultOptions.invertedIconLogic,
}) => {
  const isDark = theme === 'dark'
  return (
    <label
      className={clsx(styles.container, {
        [styles.IsDark]: isDark,
        [styles.IsLight]: !isDark,
      })}
      title={isDark ? 'Activate light mode' : 'Activate dark mode'}
      aria-label={isDark ? 'Activate light mode' : 'Activate dark mode'}
    >
      <input
        type='checkbox'
        defaultChecked={invertedIconLogic ? !isDark : isDark}
        onChange={onChange}
      />
      <div />
    </label>
  )
}

export default ThemeToggleButton
