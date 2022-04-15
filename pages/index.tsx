import React, { useState } from 'react';
import { Box, TextField, Autocomplete, Grid, Fab } from '@mui/material'
import PageComponent from '../components/PageComponent';
import CardComponent from '../components/CardComponent';
import {ArrowUpward} from '@mui/icons-material';
import { IPublicaco } from '../interfaces/Publicacao';

const Home = () => {
    const [publicacoes, setPublicacoes] = useState<IPublicaco[]>([
        {
            cd_Publicacao: 1,
            nm_Titulo: 'Publicação 1',
            ds_Publicacao: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae quod praesentium facere, officiis reprehenderit esse maiores accusamus est ullam vel corporis. Nobis sequi sed quidem dolores officiis animi eius voluptate?',
            dt_Publicacao: '23/02/2022',
            ds_Tipo: 'Grátis',
            im_Publicacao: '',
        },
        {
            cd_Publicacao: 2,
            nm_Titulo: 'Publicação 2',
            ds_Publicacao: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae quod praesentium facere, officiis reprehenderit esse maiores accusamus est ullam vel corporis. Nobis sequi sed quidem dolores officiis animi eius voluptate?',
            dt_Publicacao: '23/02/2022',
            ds_Tipo: 'Grátis',
            im_Publicacao: '',
        },
        {
            cd_Publicacao: 3,
            nm_Titulo: 'Publicação 3',
            ds_Publicacao: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae quod praesentium facere, officiis reprehenderit esse maiores accusamus est ullam vel corporis. Nobis sequi sed quidem dolores officiis animi eius voluptate?',
            dt_Publicacao: '23/02/2022',
            ds_Tipo: 'Grátis',
            im_Publicacao: '',
        },
        {
            cd_Publicacao: 4,
            nm_Titulo: 'Publicação 4',
            ds_Publicacao: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae quod praesentium facere, officiis reprehenderit esse maiores accusamus est ullam vel corporis. Nobis sequi sed quidem dolores officiis animi eius voluptate?',
            dt_Publicacao: '23/02/2022',
            ds_Tipo: 'Grátis',
            im_Publicacao: '',
        },
        {
            cd_Publicacao: 5,
            nm_Titulo: 'Publicação 5',
            ds_Publicacao: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae quod praesentium facere, officiis reprehenderit esse maiores accusamus est ullam vel corporis. Nobis sequi sed quidem dolores officiis animi eius voluptate?',
            dt_Publicacao: '23/02/2022',
            ds_Tipo: 'Grátis',
            im_Publicacao: '',
        },
        {
            cd_Publicacao: 6,
            nm_Titulo: 'Publicação 6',
            ds_Publicacao: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae quod praesentium facere, officiis reprehenderit esse maiores accusamus est ullam vel corporis. Nobis sequi sed quidem dolores officiis animi eius voluptate?',
            dt_Publicacao: '23/02/2022',
            ds_Tipo: 'Grátis',
            im_Publicacao: '',
        },
        {
            cd_Publicacao: 7,
            nm_Titulo: 'Publicação 7',
            ds_Publicacao: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae quod praesentium facere, officiis reprehenderit esse maiores accusamus est ullam vel corporis. Nobis sequi sed quidem dolores officiis animi eius voluptate?',
            dt_Publicacao: '23/02/2022',
            ds_Tipo: 'Grátis',
            im_Publicacao: '',
        },
        {
            cd_Publicacao: 8,
            nm_Titulo: 'Publicação 8',
            ds_Publicacao: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae quod praesentium facere, officiis reprehenderit esse maiores accusamus est ullam vel corporis. Nobis sequi sed quidem dolores officiis animi eius voluptate?',
            dt_Publicacao: '23/02/2022',
            ds_Tipo: 'Grátis',
            im_Publicacao: '',
        },
    ]);
    const [searchInput, setSearchInput] = useState();

    return (
        <PageComponent title="Publicações" rightElement={
            <Box width='30%' minWidth='100px'>
                <Autocomplete
                    freeSolo
                    options={publicacoes.map((publicacao) => publicacao.nm_Titulo)}
                    renderInput={(params) => (
                    <Box display='flex' alignItems='center'>
                    <TextField
                        {...params}
                        label="Pesquisar publicação"
                    />
                    </Box>)}
                />
            </Box>
          }
        >
                <Fab variant="extended" size="small" color="primary" aria-label="up" sx={{
                    position: 'fixed',
                    bottom: '2%',
                    right: '2%',
                    zIndex: 20,
                }}>
                    <ArrowUpward />
                    
                </Fab>
        <Grid container spacing={3} my={3}>
            {
                publicacoes.map((publicacao) => (
                    <Grid key={publicacao.cd_Publicacao} item xs={12} sm={8} md={6} lg={4} xl={3}>
                        <CardComponent 
                            titulo={publicacao.nm_Titulo}
                            descricao={publicacao.ds_Publicacao}
                            data={publicacao.dt_Publicacao}
                            tipo={publicacao.ds_Tipo}
                            imagem='https://s2.glbimg.com/UgXIIunG5bMk3LYbQIRM0soczpQ=/0x0:1200x675/600x0/smart/filters:gifv():strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2020/j/U/iLO5YCRBmGHUsDwBIBHA/valorant-closed-beta-1200x675.png'
                            link={'Publicacao/' + publicacao.nm_Titulo}
                        />
                    </Grid>
                ))
            }
        </Grid>
    </PageComponent>
    )
}

export default Home