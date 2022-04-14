import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Box } from '@mui/material'
import NavBar from '../components/NavBar'
import Footer from '../components/footer'
import { AppThemeProvider } from '../context/ThemeContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppThemeProvider>
      <Box width='100vw' height='100vh'>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </Box>
    </AppThemeProvider>
  )
}

export default MyApp
