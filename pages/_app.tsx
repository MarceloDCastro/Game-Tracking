import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Stack } from '@mui/material'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { AppThemeProvider } from '../context/ThemeContext'
import { AuthProvider } from '../context/AuthContext'

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <html>
      <head>
        <title>GameTracking</title>
        <link rel="preconnect" href="https://fonts.googleapis.com/%22%3E" />
        <link rel="preconnect" href="https://fonts.gstatic.com/" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap" rel="stylesheet" />
      </head>
      <AppThemeProvider>
        <AuthProvider>
          <Stack justifyContent="space-between" width="100vw" minHeight="100vh">
            <NavBar />
            <Component {...pageProps} />
            <Footer />
          </Stack>
        </AuthProvider>
      </AppThemeProvider>
    </html>
  )
}

export default MyApp
