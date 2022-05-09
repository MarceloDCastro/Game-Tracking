import React from 'react'
import { Box, TextField, Typography } from '@mui/material'

interface IInputComponent {
    label: string;
    icon?: React.ReactNode;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    error?: boolean;
    type?: string;
    required?: boolean;
    onFocus?: React.FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const InputComponent = ({ label, icon, value, onChange, error, type, required, onFocus, onBlur, onClick }: IInputComponent) => {
  return (
    <TextField
      fullWidth
      label={
        <Box display='inline'>
          <Box display='flex' alignItems='center'>
            {icon && icon}  <Box ml={0.3} display='flex'>{label}{required && <Typography color='red'>*</Typography>}</Box>
          </Box>
        </Box>
      }
      type={type}
      value={value}
      onChange={onChange}
      variant='standard'
      error={error}
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={onClick}
    />
  )
}

export default InputComponent
