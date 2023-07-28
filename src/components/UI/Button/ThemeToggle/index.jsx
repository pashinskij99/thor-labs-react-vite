import { useContext } from 'react'
import { ThemeContext, themes } from '../../../../theme/ThemeContext'
import ReactSwitch from 'react-switch'
import { SunIcon } from '../../../Icons'

// const defaultOptions = {
//   invertedIconLogic: false,
// }

const ThemeToggleButton = ({
  // theme,
  // onChange,
  // invertedIconLogic = defaultOptions.invertedIconLogic,
  className,
}) => {
  const { setTheme, theme } = useContext(ThemeContext)

  const isDark = theme === themes.dark
  const handleTheme = () => {
    setTheme((prevState) =>
      prevState === themes.light ? themes.dark : themes.light
    )
  }
  return (
    <ReactSwitch
      onChange={handleTheme}
      checkedIcon={false}
      uncheckedIcon={false}
      checkedHandleIcon={<SunIcon width={20} height={20} />}
      uncheckedHandleIcon={
        <img src='/icons/dark.png' width={20} height={20} alt='light theme' />
        // <img src='/icons/sun.png' width={20} height={20} alt='light theme' />
      }
      checked={isDark}
      offColor='#fb8900'
      onColor='#2a2a2b'
      onHandleColor='#fb8900'
      offHandleColor='#fff'
      className={className}
    />
  )
  // <img src='/icons/sun.png' alt='light theme' />
}

export default ThemeToggleButton
