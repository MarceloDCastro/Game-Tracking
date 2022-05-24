import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Stack } from '@mui/material'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { AppThemeProvider } from '../context/ThemeContext'
import { AuthProvider } from '../context/AuthContext'

function MyApp ({ Component, pageProps }: AppProps) {
  return (
      <AppThemeProvider>
        <AuthProvider>
          <Stack justifyContent="space-between" width="100vw" minHeight="100vh">
            <NavBar />
            <Component {...pageProps} />
            <Footer />
          </Stack>
        </AuthProvider>
      </AppThemeProvider>
  )
}

export default MyApp
