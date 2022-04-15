import React from 'react'
import { Avatar, Box, Button, Stack, Typography } from '@mui/material'
import { Message, PhotoCamera, Visibility } from '@mui/icons-material'
import PageComponent from '../../components/PageComponent'
import TitleComponent from '../../components/TitleComponent'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

export async function getStaticPaths () {
  const paths = [
    { params: { id: '1' } },
    { params: { id: '2' } }
  ]
  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps ({ params }: { params: any }) {
  const publicacao = {
    id: params.id,
    nome: 'Publicação ' + params.id,
    descricao: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti, nulla! Facilis, mollitia. Eligendi quasi nemo unde consequuntur ad dolorum in debitis tenetur mollitia? Incidunt sed autem laboriosam amet accusamus alias!',
    imagem: 'https://s2.glbimg.com/UgXIIunG5bMk3LYbQIRM0soczpQ=/0x0:1200x675/600x0/smart/filters:gifv():strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2020/j/U/iLO5YCRBmGHUsDwBIBHA/valorant-closed-beta-1200x675.png',
    data: '14/04/2022'
  }
  return {
    props: { publicacao }
  }
}

const imagensJogo = [
  'https://cdn1.epicgames.com/offer/cbd5b3d310a54b12bf3fe8c41994174f/EGS_VALORANT_RiotGames_S1_2560x1440-160cacc798ef1693cc0a339e869f1761',
  'https://playvalorant.com/assets/video/game-overview-poster-launch.jpg',
  'https://s2.glbimg.com/JtoL0IE6sG1nssCVUDvJZV5nGZc=/0x0:2560x1440/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2022/V/v/aur2XRRyaLUC06xX5hVQ/fiwxgnzxeaikkyy.jpg',
  'https://s2.glbimg.com/-MFrOgfjaPYQaVlB7SsyfdKCK5U=/0x0:1400x788/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2020/p/B/vlmXnfQqee9zfEWCI6Ig/valorant.jpg'
]

export default function Publicacao ({ publicacao }: { publicacao: any }) {
  return (
        <PageComponent>
            {publicacao
              ? (
                <Box>
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
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                Nome do jogo: Valorant
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                Data de lançamento: 10/10/2020
                            </Typography>
                        </Stack>
                        <Stack ml={2} justifyContent='space-between'>
                            <Box>
                                <TitleComponent title={publicacao?.nome} />
                                <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">{publicacao?.data}</Typography>
                                <Typography>{publicacao?.descricao}</Typography>
                            </Box>
                            <Stack direction='row' justifyContent='start' gap={5} my={3}>
                                <Button variant='contained' startIcon={<Visibility />}>Ver mais</Button>
                                <Button variant='outlined' startIcon={<Message />}>Enviar Sugestão</Button>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack alignItems='center' mt={2}>
                        <Typography variant='h3'>Galeria</Typography>
                        <Box width='60%' minWidth='300px' mt={2}>
                            <Carousel autoPlay infiniteLoop emulateTouch>
                                {
                                    imagensJogo?.map(i => (
                                        <img key={i} style={{ userSelect: 'none' }} src={i} />
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
