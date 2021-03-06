import React from 'react'
import { Box, SxProps, TextField, Theme, Typography } from '@mui/material'

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
    sx?: SxProps<Theme>;
    endIcon?: React.ReactNode;
    onKeyPress?: React.KeyboardEventHandler<HTMLDivElement>;
    disabled?: boolean;
}

const InputComponent = ({ label, icon, value, onChange, error, type, required, onFocus, onBlur, onClick, sx, endIcon, onKeyPress, disabled }: IInputComponent) => {
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
      sx={sx}
      InputProps={{
        endAdornment: endIcon
      }}
      onKeyPress={onKeyPress}
      disabled={disabled}
    />
  )
}

export default InputComponent
