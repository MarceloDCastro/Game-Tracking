import { Box, Stack, SxProps } from '@mui/material'
import React from 'react'
import { useAppThemeContext, Pallete } from '../../context/ThemeContext'
import TitleComponent from '../TitleComponent'

interface IGenericPage {
    children: React.ReactNode;
    title?: string;
    rightElement?: React.ReactNode;
    sx?: SxProps;
}

const GenericPage = ({ children, title, rightElement, sx }: IGenericPage) => {
  const { mode } = useAppThemeContext()
  return (
            <Box component='main' sx={sx} bgcolor={mode === 'light' ? Pallete.light.fundo2.main : Pallete.dark.fundo2.main} p={5} m={{ xs: 2, sm: 5, lg: 7, xl: 10 }} boxShadow="0 3px 5px #00000040" borderRadius={5}>
                <Stack direction="row" alignItems='center'>
                    {title && <TitleComponent title={title} type='h1' sx={{ mr: 2 }} />}
                    {rightElement}
                </Stack>
                {children}
            </Box>
  )
}

export default GenericPage
