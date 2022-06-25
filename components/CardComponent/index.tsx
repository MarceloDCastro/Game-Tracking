import React, { useState } from 'react'
import { Card, CardMedia, Typography, CardContent, Button, Badge, IconButton, Stack, Tooltip, Zoom, Chip, Box } from '@mui/material'
import { FavoriteBorderOutlined, Favorite } from '@mui/icons-material'
import moment from 'moment'
import 'moment/locale/pt'

interface ICardComponent {
    id: number;
    titulo: string;
    descricao: string;
    data: string;
    tipo: string;
    imagem: string;
    link: string;
    plataformas: string[];
    width?: string;
    maxWidth?: string;
    minWidth?: string;
    height?: string;
}

const CardComponent = ({ titulo, descricao, data, tipo, imagem, id, plataformas, width, maxWidth, minWidth, height }: ICardComponent) => {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: '0 3px 5px #00000040', height: height, width: width, maxWidth: maxWidth, minWidth: minWidth }}>
      <CardMedia
        component="img"
        height="200"
        image={imagem}
        alt="green iguana"
      />
        <Typography width={'100%'} sx={{ py: '4px', backgroundColor: tipo === 'Promoção' ? '#B22222' : tipo === 'Grátis' ? '#2E8B57' : '#DAA520', color: '#fff' }} p={1}>
            {tipo}
        </Typography>
        <CardContent sx={{ height: '260px' }}>
        <Stack justifyContent='space-between' height='100%'>
          <Box>
            <Stack direction='row' spacing={1} mt='-8px' mb='5px'>
              {
                plataformas?.map(plataforma => (
                  <Chip
                    key={plataforma}
                    label={plataforma}
                    color='secondary'
                  />
                ))
              }
            </Stack>
            <Typography variant="h6" fontWeight='bold'>
              {titulo}
            </Typography>
            <Typography variant="body1">
              {descricao.length > 100 ? descricao.substring(0, 100) + '...' : descricao}
            </Typography>
          </Box>
          <Box>
          <Typography color="text.secondary" gutterBottom>
              {data && moment(data).locale('pt-br').fromNow()}
            </Typography>
            <Button variant='contained' href={`/Publicacao/${id}`} fullWidth sx={{ mt: 1 }}>Ver Mais</Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default CardComponent
