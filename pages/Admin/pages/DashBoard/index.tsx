import React from 'react'
import { Button, Grid, Stack, Typography } from '@mui/material'
import PageComponent from '../../../../components/PageComponent'
import { Box } from '@mui/system'
import { Pallete, useAppThemeContext } from '../../../../context/ThemeContext'
import Link from 'next/link'

export default function DashBoard ({ itemsArray }: { itemsArray: { label: string, pageName: string, page: React.ReactNode, icon: React.ReactNode }[] }) {
  const { mode } = useAppThemeContext()

  const GridItem = ({ label, pageName, icon }: { label: string, pageName: string, icon: React.ReactNode }) => {
    return (
      <Grid item xs={2}>
        <Link href={{
          pathname: '/Admin',
          query: pageName && { page: pageName }
        }}>
          <Button fullWidth sx={{ justifyContent: 'start' }}>
            <Stack direction='row' alignItems='center' spacing={2} p={1}>
              <Box border={`1px solid ${mode === 'dark' ? Pallete.dark.primary.main : Pallete.light.primary.main}`} borderRadius={5} p={2} display='flex' justifyContent='center' alignItems='center'>
                {icon}
              </Box>
              <Typography fontSize={25} color='primary'>{label}</Typography>
            </Stack>
          </Button>
          </Link>
        </Grid>
    )
  }

  return (
    <PageComponent title="Dashboard">
      <Grid container columns={{ xs: 2, md: 4 }} my={1} spacing={2}>
        {itemsArray?.map(item => <GridItem key={item.pageName} label={item.label} pageName={item.pageName} icon={item.icon} />)}
      </Grid>
    </PageComponent>
  )
}
