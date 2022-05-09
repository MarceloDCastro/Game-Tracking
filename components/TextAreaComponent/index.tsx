import React from 'react'
import { Box, TextField, Typography } from '@mui/material'

interface ITextAreaComponent {
    label: string;
    icon?: React.ReactNode;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    required?: boolean;
}

const TextAreaComponent = ({ label, icon, value, onChange, required }: ITextAreaComponent) => {
  return (
      <TextField
              fullWidth
              multiline
              rows={3}
              value={value}
              onChange={onChange}
              label={
                <Box display='flex' alignItems='center'>
                  {icon && icon} <Box ml={0.3} display='flex'>{label}{required && <Typography color='red'>*</Typography>}</Box>
                </Box>
              }
              variant='outlined'
              />
  )
}

export default TextAreaComponent
