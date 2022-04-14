import React, { useState } from 'react';
import { Card, CardMedia, Typography, CardContent, Button, Badge, IconButton, Stack, Tooltip, Zoom, Box, TextField } from '@mui/material';
import { FavoriteBorderOutlined, Favorite } from '@mui/icons-material';
import { useAppThemeContext, Pallete } from '../../context/ThemeContext';

interface IInputComponent {
    label: string;
    icon?: React.ReactNode;
    value?: string;
    onChange?: (e: Event) => void;
}

const InputComponent = ({label, icon, value, onChange}: IInputComponent) => {

    return (
      <TextField
      fullWidth
      label={
        <Box display='flex' alignItems='center'>
          {icon && icon}  <Box ml={0.3}>{label}</Box>
        </Box>
      }
      variant='standard'
      />
    )
}

export default InputComponent;