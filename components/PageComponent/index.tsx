import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { useAppThemeContext, Pallete } from '../../context/ThemeContext';

interface IGenericPage {
    children: React.ReactNode;
    title?: string;
    rightElement?: React.ReactNode;
}

const GenericPage = ({ children, title, rightElement }: IGenericPage) => {
    const { mode } = useAppThemeContext();
    return (
        <Box bgcolor={mode == 'light' ? Pallete.light.fundo2.main : Pallete.dark.fundo2.main} p={5} m={{ xs: 2, sm: 5, lg: 7, xl: 10 }} boxShadow="0 3px 5px #00000040" borderRadius={2}>
            <Stack direction="row" alignItems='center'>
                <Typography fontSize={30} fontWeight='bold' mr={2}>{title}</Typography>
                {rightElement}
            </Stack>
            {children}
        </Box>
    )
}

export default GenericPage;