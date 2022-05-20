import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import DashBoard from './pages/DashBoard'
import Publicacoes from './pages/Publicacoes'
import { Group, Newspaper, TipsAndUpdates, ArrowRight, ArrowLeft, Edit, Devices, SportsEsports } from '@mui/icons-material'
import { Backdrop, SpeedDial, SpeedDialAction, SwipeableDrawer, Box, Slide, List, ListItem, ListItemIcon, ListItemText, IconButton, Button, Stack } from '@mui/material'
import { Pallete, useAppThemeContext } from '../../context/ThemeContext'
import Link from 'next/link'
import Generos from './pages/Generos'
import Plataformas from './pages/Plataformas'
import Sugestoes from './pages/Sugestoes'

interface IPageProps {
  label: string;
  pageName: string;
  page: React.ReactNode;
  icon: React.ReactNode;
}

export default function Admin () {
  const { mode } = useAppThemeContext()
  const router = useRouter()

  const [open, setOpen] = React.useState(false)

  const itemsArray: IPageProps[] = [
    {
      label: 'Usuários',
      pageName: 'Usuarios',
      page: <Publicacoes />,
      icon: <Group color='primary' />
    },
    {
      label: 'Sugestões',
      pageName: 'Sugestoes',
      page: <Sugestoes />,
      icon: <TipsAndUpdates color='primary' />
    },
    {
      label: 'Publicações',
      pageName: 'Publicacoes',
      page: <Publicacoes />,
      icon: <Newspaper color='primary' />
    },
    {
      label: 'Jogos',
      pageName: 'Jogos',
      page: <Publicacoes />,
      icon: <SportsEsports color='primary' />
    },
    {
      label: 'Gêneros',
      pageName: 'Generos',
      page: <Generos />,
      icon: <Edit color='primary' />
    },
    {
      label: 'Plataformas',
      pageName: 'Plataformas',
      page: <Plataformas />,
      icon: <Devices color='primary' />
    }
  ]

  useEffect(() => {
    console.log('route: ', router)
    console.log('Página: ', itemsArray?.find(i => i.pageName === router.query.page))
  }, [router])

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
                key={item.pageName}
                href={{
                  pathname: '/Admin',
                  query: item.pageName && { page: item.pageName }
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
          router.query.page
            ? itemsArray.find(i => i.pageName === router.query.page)?.page || <DashBoard itemsArray={itemsArray} />
            : <DashBoard itemsArray={itemsArray} />
        }
    </>
  )
}
