import React from 'react'
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material'

interface IInputComponent {
    label: string;
    icon?: React.ReactNode;
    value?: string;
    onChange?: (event: SelectChangeEvent<string>, child: React.ReactNode) => void;
    error?: boolean;
    options: {value: string, label: string}[];
    placeholder?: string
    required?: boolean;
    disabled?: boolean;
}

const InputComponent = ({ label, icon, value, onChange, error, options, placeholder, required, disabled }: IInputComponent) => {
  return (
    <FormControl variant="standard" fullWidth error={error}>
      <InputLabel id="demo-simple-select-standard-label">
        <Box display='flex' alignItems='center'>
          {icon && icon}  <Box ml={0.3} display='flex'>{label}{required && <Typography color='red'>*</Typography>}</Box>
        </Box>
      </InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={value}
        onChange={onChange}
        label="Age"
        disabled={disabled}
      >
        {
          options?.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))
        }
      </Select>
    </FormControl>
  )
}

export default InputComponent
