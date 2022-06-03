import React, { useState } from 'react'
import { Card, CardMedia, Typography, CardContent, Button, Badge, IconButton, Stack, Tooltip, Zoom } from '@mui/material'
import { FavoriteBorderOutlined, Favorite } from '@mui/icons-material'
import moment from 'moment'
import 'moment/locale/pt'

interface ICardComponent {
    titulo: string;
    descricao: string;
    data: string;
    tipo: string;
    imagem: string;
    link: string;
}

const CardComponent = ({ titulo, descricao, data, tipo, imagem, link }: ICardComponent) => {
  const [liked, setLiked] = useState<boolean>(false)

  return (
    <Card sx={{ borderRadius: 3, boxShadow: '0 3px 5px #00000040' }}>
      <CardMedia
        component="img"
        height="200"
        image={imagem}
        alt="green iguana"
      />
      <Typography width={'100%'} sx={{ backgroundColor: '#FF6961', color: '#fff' }} p={1}>
          {tipo}
      </Typography>
      <CardContent>
        <Typography variant="h5">
          {titulo}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          {data && moment(data).locale('pt-br').fromNow()}
        </Typography>
        <Typography variant="body1">
          {descricao.length > 100 ? descricao.substring(0, 100) + '...' : descricao}
        </Typography>
        <Button variant='contained' href={link} fullWidth sx={{ mt: 1 }}>Ver Mais</Button>
      </CardContent>
    </Card>
  )
}

export default CardComponent
