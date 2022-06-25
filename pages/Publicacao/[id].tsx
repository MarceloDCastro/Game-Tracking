import React from 'react'
import { Avatar, Box, Button, Chip, Stack, Typography } from '@mui/material'
import { Message, PhotoCamera, Visibility } from '@mui/icons-material'
import PageComponent from '../../components/PageComponent'
import TitleComponent from '../../components/TitleComponent'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Pallete } from '../../context/ThemeContext'
import { api } from '../../services/api'
import { AxiosResponse } from 'axios'
import { IPublicacao } from '../../interfaces/Publicacao'
import moment from 'moment'
import Link from 'next/link'

export async function getStaticPaths () {
  const publicacoes = await api.get('publicacao/getIds')

  const paths = publicacoes.data?.map((publicacao: IPublicacao) => ({
    params: { id: `${publicacao.id}` }
  }))

  return { paths, fallback: false }
}

export async function getStaticProps ({ params }:{params: any}) {
  const publicacao = await api.get('publicacao/' + params.id)

  return {
    props: {
      publicacao: publicacao.data
    }
  }
}

export default function Publicacao ({ publicacao }: { publicacao: IPublicacao }) {
  return (
        <PageComponent>
            {publicacao
              ? (
                <Box>
                  {console.log('pub -> ', publicacao)}
                    <Stack direction={{ xs: 'column', md: 'row' }} alignItems={{ xs: 'center', md: 'start' }}>
                        <Stack mb={1}>
                            <Avatar
                                variant="rounded"
                                sx={{
                                  bgcolor: '#d1d1d1',
                                  width: { xs: '200px', sm: '250px' },
                                  height: { xs: '200px', sm: '250px' }
                                }}
                                src={publicacao?.imagem}
                            ><PhotoCamera /></Avatar>
                            <Typography sx={{ fontSize: 15 }} color="text.secondary" mt={1}>
                                Nome do jogo: {publicacao.Jogo?.nome}
                            </Typography>
                            <Typography sx={{ fontSize: 15 }} color="text.secondary">
                                Generos: {publicacao.Jogo?.Generos?.map(g => g.nome).join(', ')}
                            </Typography>
                            <Typography sx={{ fontSize: 15 }} color="text.secondary">
                                Data de lançamento: {moment(publicacao.Jogo?.dataLancamento).format('L')}
                            </Typography>
                        </Stack>
                        <Stack ml={2} justifyContent='space-between'>
                            <Box>
                                <TitleComponent title={publicacao?.titulo} />
                                <Stack direction='row' spacing={1} mb={1}>
                                  <Chip
                                    label={publicacao.tipo}
                                    sx={{
                                      backgroundColor: publicacao.tipo === 'Promoção' ? '#B22222' : publicacao.tipo === 'Grátis' ? '#2E8B57' : '#DAA520',
                                      color: '#FFF'
                                    }}
                                  />
                                  {
                                    publicacao.Plataformas?.map(plataforma => (
                                      <Chip
                                        key={plataforma.id}
                                        label={plataforma.nome}
                                        color='secondary'
                                      />
                                    ))
                                  }
                                </Stack>
                                <Typography sx={{ fontSize: 16, mb: 1 }} color="text.secondary">{moment(publicacao?.dataLancamento).format('L')}</Typography>
                                <Typography sx={{ fontSize: 17 }}>{publicacao?.descricao}</Typography>
                            </Box>
                            <Stack direction='row' justifyContent='start' gap={5} my={3}>
                                <Link href={publicacao.link} passHref>
                                  <a target="_blank">
                                    <Button variant='contained' startIcon={<Visibility />}>Ver mais</Button>
                                  </a>
                                </Link>
                                <Link href='/Sugestoes'>
                                  <Button variant='outlined' startIcon={<Message />}>Enviar Sugestão</Button>
                                  </Link>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack alignItems='center' mt={2}>
                        <Typography variant='h3'>Galeria</Typography>
                        <Box width='60%' minWidth='300px' maxWidth='450px' mt={2}>
                            <Carousel autoPlay infiniteLoop emulateTouch>
                                {
                                    publicacao.Jogo?.ImagensJogos?.map(i => (
                                        <img key={i.id} style={{ userSelect: 'none' }} src={i.url} />
                                    ))
                                }
                            </Carousel>
                        </Box>
                    </Stack>
                </Box>
                )
              : (
                <Typography>Publicação não encontrada!</Typography>
                )
            }

        </PageComponent>
  )
}
