import React from 'react'
import { Typography, SxProps } from '@mui/material'

interface ITitleComponent {
    title: string;
    type?: 'h1'|'h2'|'h3'|'h4';
    fontWeight?: string;
    sx?: SxProps;
}

const TitleComponent = ({ title, type, fontWeight, sx }: ITitleComponent) => {
  return (
    <Typography
      component={ type ? (type === 'h1' ? 'h2' : type === 'h2' ? 'h3' : type === 'h3' ? 'h4' : type === 'h4' ? 'h5' : 'h2') : 'h2'}
      fontSize={ type ? (type === 'h1' ? 40 : type === 'h2' ? 30 : type === 'h3' ? 25 : type === 'h4' ? 20 : 40) : 40}
      fontWeight={fontWeight || 'bold'}
      sx={sx}
    >
      {title}
    </Typography>
  )
}

export default TitleComponent
