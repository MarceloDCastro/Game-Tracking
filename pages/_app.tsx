import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Box,Stack } from '@mui/material'
import NavBar from '../components/NavBar'
import Footer from '../components/footer'
import { AppThemeProvider } from '../context/ThemeContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppThemeProvider>
      <Stack justifyContent="space-between" minWidth='100vw' minHeight='100vh'>
        <NavBar />
        <Component {...pageProps} /> 
        <Footer />
      </Stack>
      
    </AppThemeProvider>
  )
}

export default MyApp
