import React, { useEffect, useState } from 'react'
import {
  Box, TextField, Autocomplete, Grid, Fab, Pagination, Stack, IconButton, CircularProgress, Typography, Tooltip
} from '@mui/material'
import { ArrowUpward, Clear, Search, SearchOutlined } from '@mui/icons-material'
import PageComponent from '../components/PageComponent'
import CardComponent from '../components/CardComponent'
import { IPublicaco } from '../interfaces/Publicacao'
import { api } from '../services/api'
import { Pallete } from '../context/ThemeContext'
import InputComponent from '../components/InputComponent'

function Home () {
  const [loading, setLoading] = useState(false)
  const [publicacoes, setPublicacoes] = useState<IPublicaco[]>()
  const [totalItems, setTotalItems] = useState<number>()
  const [page, setPage] = useState<number>(1)

  const itemsPerPage = 10

  const [search, setSearch] = useState<{
    filterValue: string,
    searchValue: string
  }>({
    filterValue: '',
    searchValue: ''
  })

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  useEffect(() => getPublicacoes(), [page, search.searchValue])

  const getPublicacoes = () => {
    setLoading(true)
    api.get(`publicacao?page=${page - 1 || 0}&itemsPerPage=${itemsPerPage}&search=${search.searchValue}`)
      .then(res => {
        setPublicacoes(res.data.publicacoes)
        setTotalItems(res.data.totalItems)
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  }

  return (
    <PageComponent
      title="Publicações"
      rightElement={(
        <Box width="30%" minWidth="100px">
          <InputComponent
          label='Pesquisar por título'
          value={search.filterValue}
          onChange={e => setSearch({ ...search, filterValue: e.target.value })}
          onKeyPress={({ code }) => {
            if (code === 'Enter') {
              setSearch({ ...search, searchValue: search.filterValue })
              setPage(1)
            }
          }}
          endIcon={
            <>
              <Tooltip title="Buscar" arrow>
                <IconButton onClick={() => {
                  setSearch({ ...search, searchValue: search.filterValue })
                  setPage(1)
                }}>
                  <Search />
                </IconButton>
              </Tooltip>
              <Tooltip title="Limpar filtro" arrow>
                <IconButton onClick={() => {
                  setSearch({ filterValue: '', searchValue: '' })
                  setPage(1)
                }}>
                  <Clear />
                </IconButton>
              </Tooltip>
            </>
          }
          sx={{
            maxWidth: '450px'
          }} />
        </Box>
          )}
    >
      <Typography my={2}>
        {
          !publicacoes?.length
            ? 'Nenhuma publicação encontrada'
            : `${totalItems} publicações encontradas`
        }
      </Typography>
      <Grid container spacing={3} mb={3}>
        { loading
          ? <Stack alignItems='center'><CircularProgress size={70} sx={{ my: 5 }} /></Stack>
          : publicacoes?.map((publicacao) => (
                  <Grid key={publicacao.id} item xs={8} sm={6} md={4} lg={3}>
                    <CardComponent
                     id={publicacao.id}
                      titulo={publicacao.titulo}
                      descricao={publicacao.descricao}
                      data={publicacao.dataLancamento}
                      tipo={publicacao.tipo}
                      imagem={publicacao?.imagem}
                      plataformas={publicacao?.Plataformas?.map(p => p.nome)}
                      link={`Publicacao/${publicacao.nome}`}
                      height='100%'
                    />
                  </Grid>
          ))
            }
      </Grid>
      <Stack alignItems='center' mt={5}>
        <Pagination page={page} onChange={handleChange} count={(totalItems ? totalItems % itemsPerPage ? Math.floor(totalItems / itemsPerPage) + 1 : Math.floor(totalItems / itemsPerPage) : 1)} shape="rounded" size='large' color='primary' />
      </Stack>
    </PageComponent>
  )
}

export default Home
