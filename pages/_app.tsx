import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Box } from '@mui/material'
import NavBar from '../components/NavBar'
import { AppThemeProvider } from '../context/ThemeContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppThemeProvider>
        <NavBar />
        <Component {...pageProps} />
    </AppThemeProvider>
  )
}

export default MyApp
