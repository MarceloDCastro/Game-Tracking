import React, { useContext, useState } from 'react'
import { Stack, Typography, Button, IconButton, Avatar, Box, Menu, MenuItem, Divider, ListItemIcon } from '@mui/material'
import { Settings, Logout, LightMode, DarkMode } from '@mui/icons-material'
import styles from '../../styles/Geral.module.css'
import { useAppThemeContext, Pallete } from '../../context/ThemeContext'
import Link from 'next/link'
import { AuthContext } from '../../context/AuthContext'

const NavBar = () => {
  const { toggleMode, mode } = useAppThemeContext()
  const { isAuthenticated, userInfo, signOut } = useContext(AuthContext)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const openMenu = Boolean(anchorEl)
  const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  return (
        <Stack direction='row' bgcolor={mode === 'light' ? Pallete.light.fundo2.main : Pallete.dark.fundo2.main} p={2} justifyContent='space-between' alignItems='center'>
                <Stack direction='row'>
                    <Typography component='h1' fontSize={35} fontWeight='bold' sx={{
                      backgroundImage: `linear-gradient(19deg, ${Pallete.dark.primary.main}, ${Pallete.light.primary.main})`
                    }} className={styles.gradiente}>GameTracking</Typography>
                </Stack>
                <Stack direction='row' display={{ xs: 'none', md: 'flex' }}>
                    <Stack direction='row'>
                        <Link href="/"><Button size="large">Home</Button></Link>
                        <Link href="/Sobre"><Button size="large">Sobre Nós</Button></Link>
                        <Link href="/Sugestoes"><Button size="large">Sugestões</Button></Link>
                        <Box alignItems='center' display='flex'>
                            <IconButton color='primary' onClick={toggleMode}>{mode === 'light' ? <DarkMode /> : <LightMode />}</IconButton>
                        </Box>
                        {isAuthenticated
                          ? (
                            <Box>
                                <IconButton
                                    onClick={handleClickMenu}>
                                    <Avatar>M</Avatar>
                                </IconButton>
                                <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={openMenu}
                                onClose={handleCloseMenu}
                                onClick={handleCloseMenu}
                                PaperProps={{
                                  elevation: 0,
                                  sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                      width: 32,
                                      height: 32,
                                      ml: -0.5,
                                      mr: 1
                                    },
                                    '&:before': {
                                      content: '""',
                                      display: 'block',
                                      position: 'absolute',
                                      top: 0,
                                      right: 14,
                                      width: 10,
                                      height: 10,
                                      bgcolor: 'background.paper',
                                      transform: 'translateY(-50%) rotate(45deg)',
                                      zIndex: 0
                                    }
                                  }
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <MenuItem>
                                    <Avatar /> Perfil
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem>
                                    <ListItemIcon>
                                        <Settings fontSize="small" />
                                    </ListItemIcon>
                                    Configurações
                                    </MenuItem>
                                    <MenuItem onClick={signOut}>
                                      <ListItemIcon>
                                          <Logout fontSize="small" />
                                      </ListItemIcon>
                                      Sair
                                    </MenuItem>
                                </Menu>
                            </Box>
                            )
                          : (
                            <Box>
                                <Link href='/Login'><Button size="large">Logar</Button></Link>
                                <Link href='/Cadastro'><Button size="large">Cadastrar</Button></Link>
                            </Box>
                            )
                        }
                    </Stack>
                </Stack>
            </Stack>
  )
}

export default NavBar
