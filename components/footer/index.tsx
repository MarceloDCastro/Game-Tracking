import React from 'react'
import { Stack, Typography, Button } from '@mui/material'
import styles from '../../styles/Geral.module.css'
import { useAppThemeContext, Pallete } from '../../context/ThemeContext'
import Link from 'next/link'

const Footer = () => {
  const { mode } = useAppThemeContext()

  return (
            <Stack direction={{ sx: 'column', md: 'row' }} p={2} bgcolor={mode === 'light' ? Pallete.light.fundo2.main : Pallete.dark.fundo2.main} justifyContent='space-evenly' alignItems='center'>
                <Typography fontSize={35} fontWeight='bold' sx={{ backgroundImage: `linear-gradient(19deg, ${Pallete.dark.primary.main}, ${Pallete.light.primary.main})` }} className={styles.gradiente}>
                    GameTracking
                </Typography>

                <Stack alignItems="center">
                    <Typography fontWeight='bold'>Mapa do site</Typography>
                    <Link href='/'><Button>Home</Button></Link>
                    <Link href='/Sobre'><Button>Sobre Nós</Button></Link>
                    <Link href='/Sugestoes'><Button>Sugestões</Button></Link>
                </Stack>
            </Stack>
  )
}

export default Footer
