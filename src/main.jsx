import '@solana/wallet-adapter-react-ui/styles.css'
import './styles/index.scss'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './components/App'
import ThemeProvider from './theme/ThemeProvider'
import 'react-toastify/dist/ReactToastify.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
)
