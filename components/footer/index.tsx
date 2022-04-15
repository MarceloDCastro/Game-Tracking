import React, { useState } from 'react';
import { Stack, Typography, Grid, Button } from "@mui/material";
import styles from '../../styles/Geral.module.css';
import { useAppThemeContext, Pallete } from '../../context/ThemeContext';

const Footer = () => {

    const { toggleMode, mode } = useAppThemeContext();

    return (
            <Stack direction={{ sx: 'column', md: 'row' }} p={2} bgcolor={mode == 'light' ? Pallete.light.fundo2.main : Pallete.dark.fundo2.main} justifyContent='space-evenly' alignItems='center'>
                <Typography fontSize={35} fontWeight='bold' sx={{ backgroundImage: `linear-gradient(19deg, #21D4FD, #B721FF)` }} className={styles.gradiente}>
                    GameTracking
                </Typography>

                <Stack alignItems="center">
                    <Typography fontWeight='bold'>Mapa do site</Typography>
                    <Button>Home</Button>
                    <Button>Sobre Nós</Button>
                    <Button>Sugestões</Button>
                </Stack>
            </Stack>
    )
}

export default Footer