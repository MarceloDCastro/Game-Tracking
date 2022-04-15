import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Stack } from '@mui/material'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { AppThemeProvider } from '../context/ThemeContext'

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <AppThemeProvider>
      <Stack justifyContent="space-between" width="100vw" minHeight="100vh">
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </Stack>
    </AppThemeProvider>
  )
}

export default MyApp
