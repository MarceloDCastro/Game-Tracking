import React, { useState } from 'react';
import { Card, CardMedia, Typography, CardContent, Button, Badge, IconButton, Stack, Tooltip, Zoom, Box } from '@mui/material';
import { FavoriteBorderOutlined, Favorite } from '@mui/icons-material';
import { useAppThemeContext, Pallete } from '../../context/ThemeContext';

interface ICardComponent {
    cd_Publicacao?: number;
    titulo: string;
    descricao: string;
    data: string;
    tipo: string;
    imagem: string;
    link: string;
}

const CardComponent = ({titulo, descricao, data, tipo, imagem, link}: ICardComponent) => {
  const { mode } = useAppThemeContext();
    const [liked, setLiked] = useState<boolean>(false);

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
          
        <Typography variant="h5" component="div">
          {titulo}
        </Typography>
        <Typography gutterBottom component="div">
          {data}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {descricao.length > 100 &&  descricao.substring(0,100) + '...'}
        </Typography>
        <Stack direction="row" justifyContent="end">
            <Tooltip title="Curtir" placement="left" TransitionComponent={Zoom} arrow>
            <Badge badgeContent='5.3k' color="secondary" anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}>
            <IconButton onClick={() => setLiked(!liked)}>
                {liked ? <Favorite color='error' /> : <FavoriteBorderOutlined />}
            </IconButton>
            </Badge>
            </Tooltip>
        </Stack>
        <Button variant='contained' href={link} fullWidth sx={{ mt: 1 }}>Ver Mais</Button>
      </CardContent>
    </Card>
    )
}

export default CardComponent;