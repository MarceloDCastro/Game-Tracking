import React, { useEffect, useState } from 'react'
import {
  Box, TextField, Autocomplete, Grid, Fab, Pagination, Stack, IconButton
} from '@mui/material'
import { ArrowUpward, Search, SearchOutlined } from '@mui/icons-material'
import PageComponent from '../components/PageComponent'
import CardComponent from '../components/CardComponent'
import { IPublicaco } from '../interfaces/Publicacao'
import { api } from '../services/api'
import { Pallete } from '../context/ThemeContext'

function Home () {
  const [publicacoes, setPublicacoes] = useState<IPublicaco[]>()

  useEffect(() => {
    getPublicacoes()
  }, [])

  useEffect(() => console.log('publicacoes: ', publicacoes), [publicacoes])

  const getPublicacoes = async () => {
    api.get('publicacao')
      .then(res => setPublicacoes(res.data))
      .catch(err => console.log(err.response))
  }

  return (
    <PageComponent
      title="Publicações"
      rightElement={(
        <Box width="30%" minWidth="100px">
          <Autocomplete
            freeSolo
            options={publicacoes?.map((publicacao) => publicacao.nome) || []}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Pesquisar publicação"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      <IconButton color='primary'>
                        <Search />
                      </IconButton>
                      {params.InputProps.endAdornment}
                    </>
                  )
                }}
              />
            )}
          />
        </Box>
          )}
    >
      <Fab
        variant="extended"
        size="small"
        color="primary"
        aria-label="up"
        sx={{
          position: 'fixed',
          bottom: '2%',
          right: '2%',
          zIndex: 20
        }}
      >
        <ArrowUpward />

      </Fab>
      <Grid container spacing={3} my={3}>
        {
                publicacoes?.map((publicacao) => (
                  <Grid key={publicacao.id} item xs={12} sm={8} md={6} lg={4} xl={3}>
                    <CardComponent
                      titulo={publicacao.nome}
                      descricao={publicacao.descricao}
                      data={publicacao.dataLancamento}
                      tipo={publicacao.tipo}
                      imagem={publicacao?.imagem}
                      link={`Publicacao/${publicacao.nome}`}
                    />
                  </Grid>
                ))
            }
      </Grid>
      <Stack alignItems='center' mt={5}>
        <Pagination count={10} shape="rounded" size='large' color='primary' />
      </Stack>
    </PageComponent>
  )
}

export default Home
