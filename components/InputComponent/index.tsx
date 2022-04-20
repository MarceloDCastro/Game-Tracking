import React from 'react'
import { Box, TextField } from '@mui/material'

interface IInputComponent {
    label: string;
    icon?: React.ReactNode;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    error?: boolean;
}

const InputComponent = ({ label, icon, value, onChange, error }: IInputComponent) => {
  return (
      <TextField
      fullWidth
      label={
        <Box display='flex' alignItems='center'>
          {icon && icon}  <Box ml={0.3}>{label}</Box>
        </Box>
      }
      value={value}
      onChange={onChange}
      variant='standard'
      error={error}
      />
  )
}

export default InputComponent
