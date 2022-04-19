import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { Box } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

interface IThemeContextData {
  mode: 'light' | 'dark';
  toggleMode: () => void;
}

const inputOnHover = '#0000001F'

export const Pallete = {
  light: {
    primary: {
      main: '#7021d9'
    },
    secondary: {
      main: '#773B80'
    },
    fundo1: {
      main: '#EEE'
    },
    fundo2: {
      main: '#FFF'
    },
    fundo3: {
      main: '#FFF'
    },
    error: {
      main: '#FF6A74',
      contrastText: '#fff'
    },
    warning: {
      main: '#E1D425',
      contrastText: '#fff'
    },
    success: {
      main: '#27BE45',
      contrastText: '#fff'
    },
    white: {
      main: '#FFF',
      contrastText: '#000'
    },
    black: {
      main: '#000',
      contrastText: '#FFF'
    },
    disabled: {
      main: '#D1D1D1',
      contrastText: '#FFF'
    }
  },
  dark: {
    primary: {
      main: '#21D4FD'
    },
    secondary: {
      main: '#773B80'
    },
    fundo1: {
      main: '#000'
    },
    fundo2: {
      main: '#252632'
    },
    fundo3: {
      main: '#292A37'
    },
    error: {
      main: '#FF6A74',
      contrastText: '#fff'
    },
    warning: {
      main: '#E1D425',
      contrastText: '#fff'
    },
    success: {
      main: '#27BE45',
      contrastText: '#fff'
    },
    white: {
      main: '#FFF',
      contrastText: '#000'
    },
    black: {
      main: '#000',
      contrastText: '#FFF'
    },
    disabled: {
      main: '#D1D1D1',
      contrastText: '#FFF'
    },
    background: {
      paper: '#33373E',
      default: '#33373E'
    },
    text: {
      primary: '#ffffff',
      secondary: '#a1a1a1'
    }
  }
}

const ThemeContext = createContext({} as IThemeContextData)

export const useAppThemeContext = () => {
  return useContext(ThemeContext)
}

export const AppThemeProvider: React.FC = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const localStorageMode = localStorage.getItem('OfficeSafeMode')
    if (localStorageMode) setMode(localStorageMode as 'dark'|'light')
  }, [])

  useEffect(() => {
    localStorage.setItem('OfficeSafeMode', mode)
    console.log('Mode: ', mode)
  }, [mode])

  const toggleMode = useCallback(() => {
    setMode(oldMode => oldMode === 'light' ? 'dark' : 'light')
  }, [mode])

  const theme = useMemo(() => {
    const newTheme = createTheme({
      palette: mode === 'light' ? Pallete.light : Pallete.dark,
      components: {
        MuiTextField: {
          styleOverrides: {
            root: {
              '& .MuiInputLabel-root': {
                color: mode === 'light' ? '#00000099' : '#fff',
                '& span': {
                  color: 'red'
                },
                '&.Mui-focused': {
                  color: mode === 'light' ? Pallete.light.primary.main : Pallete.dark.primary.main
                }
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: mode === 'light' ? inputOnHover : '#D1D1D1',
                  borderWidth: 1,
                  backgroundColor: 'transparent',
                  color: '#fff'
                },
                '&:hover fieldset': {
                  color: mode === 'light' ? '#000' : '#fff',
                  borderColor: mode === 'light' ? inputOnHover : '#D1D1D1'
                },
                '&.Mui-focused fieldset': {
                  borderColor: mode === 'light' ? Pallete.light.primary.main : Pallete.dark.primary.main
                }
              }
            }
          }
        },
        MuiTypography: {
          styleOverrides: {
            root: {
              color: mode === 'light' ? '#000' : '#fff'
            }
          }
        },
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: 'none',
              borderRadius: 5,
              boxShadow: 'none',
              ':disabled': {
                color: 'white',
                backgroundColor: '#D1D1D1'
              }
            }
          },
          variants: [
            {
              props: { variant: 'contained', color: 'primary' },
              style: {
                '&:hover': {
                  backgroundColor: mode === 'light' ? Pallete.light.primary.main : Pallete.dark.primary.main,
                  opacity: 1
                }
              }
            },
            {
              props: { variant: 'contained', color: 'secondary' },
              style: {
                '&:hover': {
                  backgroundColor: mode === 'light' ? Pallete.light.secondary.main : Pallete.dark.secondary.main,
                  opacity: 1
                }
              }
            },
            {
              props: { variant: 'outlined' },
              style: {
                textTransform: 'none',
                color: mode === 'light' ? Pallete.light.primary.main : Pallete.dark.primary.main,
                '&:hover': {
                  backgroundColor: '#58667319',
                  boxShadow: 'none'
                }
              }
            }, {
              props: { variant: 'outlined' },
              style: {
                '&:disabled': {
                  backgroundColor: '#FFF',
                  opacity: 1,
                  color: '#D1D1D1'
                }
              }
            },
            {
              props: { variant: 'contained' },
              style: {
                '&:disabled': {
                  opacity: 1
                }
              }
            }
          ]
        },
        MuiBadge: {
          styleOverrides: {
            root: {
              '& .MuiBadge-badge': {
                height: 20,
                width: 10,
                fontSize: 9,
                lineHeight: 0
              }
            }
          }
        },
        MuiSwitch: {
          styleOverrides: {
            root: {
              '& .MuiSwitch-thumb': {
                backgroundColor: 'white'
              },
              '& .Mui-checked+.MuiSwitch-track': {
                opacity: 1
              },
              '& .css-uxl2i.Mui-checked + .MuiSwitch-track': {
                opacity: 1
              }
            }
          }
        },
        MuiIconButton: {
          styleOverrides: {
            root: {
              '& .MuiIcon-root': {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }
            }
          }
        },
        MuiFormControl: {
          styleOverrides: {
            root: {
              '& .MuiInputLabel-asterisk': {
                color: 'red'
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: inputOnHover
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                border: `2px solid ${inputOnHover}`
              }
            }
          }
        },
        MuiFormControlLabel: {
          styleOverrides: {
            root: {
              '& .MuiFormControlLabel-label': {
                color: mode === 'light' ? '#000' : '#fff'
              }
            }
          }
        },
        MuiSelect: {
          styleOverrides: {
            icon: {
              color: 'black'
            },
            iconOpen: {
              color: 'black'
            }
          }
        },
        MuiTablePagination: {
          styleOverrides: {
            root: {
              borderBottom: 'none',
              '& button': {
                '& svg': {
                  color: '#3E3E3E'
                }
              },
              '& .Mui-disabled svg': {
                color: '#AAAAAA'
              },
              '& .MuiTablePagination-displayedRows': {}
            }
          }
        },
        MuiList: {
          styleOverrides: {
            root: {
              paddingBottom: 0
            }
          }
        },
        MuiMenuItem: {
          styleOverrides: {
            divider: {
              borderBottom: '1px solid #D1D1D1'
            }
          },
          defaultProps: {
            divider: true
          }
        },
        MuiDialog: {
          styleOverrides: {
            root: {
              minWidth: '35vw',
              maxWidth: '40vw',
              '@media (max-width:1700px)': {
                minWidth: '40vw',
                maxWidth: '45vw'
              },
              marginLeft: 'auto',
              marginRight: 'auto'
            }
          }
        }
      }
    })
    return newTheme
  }, [mode])

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: mode === 'light' ? Pallete.light.fundo1.main : Pallete.dark.fundo1.main,
          position: 'absolute'
        }}
        >
        {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
