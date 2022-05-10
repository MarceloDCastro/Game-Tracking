import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import DashBoard from './pages/DashBoard'
import Publicacoes from './pages/Publicacoes'
import { Group, Newspaper, TipsAndUpdates, Menu, ArrowRight, ArrowLeft, Edit } from '@mui/icons-material'
import { Backdrop, SpeedDial, SpeedDialAction, SwipeableDrawer, Box, Slide, List, ListItem, ListItemIcon, ListItemText, IconButton, Button, Stack } from '@mui/material'
import { Pallete, useAppThemeContext } from '../../context/ThemeContext'
import Link from 'next/link'
import Generos from './pages/Generos'

export default function Admin () {
  const { mode } = useAppThemeContext()
  const router = useRouter()

  const [open, setOpen] = React.useState(false)

  const itemsArray = [
    {
      label: 'Dashboard',
      page: '',
      icon: <Group color='primary' />
    },
    {
      label: 'Usuários',
      page: 'Usuarios',
      icon: <Group color='primary' />
    },
    {
      label: 'Sugestões',
      page: 'Sugestoes',
      icon: <TipsAndUpdates color='primary' />
    }, {
      label: 'Publicações',
      page: 'Publicacoes',
      icon: <Newspaper color='primary' />
    }, {
      label: 'Gêneros',
      page: 'Generos',
      icon: <Edit color='primary' />
    }
  ]

  useEffect(() => console.log('route: ', router), [router])

  return (
    <>
      <Button
        color='primary'
        variant='contained'
        onClick={() => setOpen(!open)}
        sx={{
          position: 'fixed',
          top: 'calc(50vh - 33px)',
          left: -32,
          width: '65px',
          height: '65px',
          borderRadius: '50%',
          transition: 'position 3s'
        }}
        size='large'
      >
          <ArrowRight fontSize='large' sx={{ ml: 3 }} />
      </Button>
      <SwipeableDrawer
        open={open}
        onClose={() => setOpen(!open)}
        onOpen={() => setOpen(!open)}
        swipeAreaWidth={0}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true
        }}
      >
        <Box display='flex'>
          <Stack>
            {itemsArray.map((item) => (
              <Link
                key={item.page}
                href={{
                  pathname: '/Admin',
                  query: item.page && { page: item.page }
                }}
              >
                <Button startIcon={item.icon} sx={{ justifyContent: 'start', px: 3, py: 2, fontSize: 'large' }} onClick={() => setOpen(false)}>
                  {item.label}
                </Button>
              </Link>
            ))}
          </Stack>
        </Box>
      </SwipeableDrawer>
        {
          !router.query.page
            ? <DashBoard itemsArray={itemsArray} />
            : router.query.page === 'Publicacoes'
              ? <Publicacoes />
              : router.query.page === 'Generos'
                ? <Generos />
                : <DashBoard itemsArray={itemsArray} />
        }
    </>
  )
}
