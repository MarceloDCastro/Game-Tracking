import React, { useState } from 'react';
import { Stack, Typography, Grid } from "@mui/material";

import { Settings, Logout, LightMode, DarkMode } from '@mui/icons-material';
import styles from '../../styles/Geral.module.css';
import { useAppThemeContext, Pallete } from '../../context/ThemeContext';

const Footer = () => {

    const { toggleMode, mode } = useAppThemeContext();

    return (
        <Grid container p={5} bgcolor={mode == 'light' ? Pallete.light.fundo2.main : Pallete.dark.fundo2.main} p={2} justifyContent='space-between' alignItems='center' >

            <Grid item md={4} sm={12}>
                <Typography fontSize={35} fontWeight='bold' sx={{
                    backgroundImage: `linear-gradient(19deg, #21D4FD, #B721FF)`,
                }} className={styles.gradiente}>GameTracking</Typography>
            </Grid>

            <Grid item md={4} sm={12} >
                <Stack gap={2} alignItems="center" >
                    <Typography variant="body1" >Mapa do site</Typography>
                    <Typography variant={'button'} >
                        Home
                    </Typography>
                    <Typography variant={'button'} >
                        Sobre Nós
                    </Typography>
                    <Typography variant={'button'} >
                        Sugestões
                    </Typography>
                </Stack>
            </Grid>

            <Grid item md={4} sm={12} justifyContent="center" >
                <Stack gap={2}>
                    <Typography variant={'button'} >
                        Home
                    </Typography>
                    <Typography variant={'button'} >
                        Sobre Nós
                    </Typography>
                    <Typography variant={'button'} >
                        Sugestões
                    </Typography>
                </Stack>
            </Grid>

        </Grid>
    )
}

export default Footer