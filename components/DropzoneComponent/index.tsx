import React, { useEffect, useState } from 'react'
import { Cancel } from '@mui/icons-material'
import { Card, CardActions, CardMedia, IconButton, List, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import { getBase64 } from '../../helpers/GetBase64'
import { Box } from '@mui/system'
import AlertComponent from '../AlertComponent'

interface IDropzoneComponentProps {
  image?: string | {id: number, idJogo: number, url: string};
  setImage: React.Dispatch<React.SetStateAction<string | undefined>>;
  required?: boolean;
}

export default function DropzoneComponent ({ image, setImage, required }: IDropzoneComponentProps) {
  const [showAlert, setShowAlert] = useState(false)

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 5,
    maxSize: 400000,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg', '.jpg']
    },
    onDropRejected: (rejectedFiles) => {
      setShowAlert(true)
    }
    // onDrop: async (acceptedFiles) => {
    //   await editObjectWithBase64(acceptedFiles)
    // }
  })

  return (
    <Box>
        <Card
          sx={{
            border: '1px solid #d1d1d1',
            boxShadow: 3,
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            cursor: 'pointer'
          }}
          {...getRootProps()}
          onChange={(e => {
            getBase64(e.target.files[0])
              .then((base64) => {
                setImage(base64)
              })
              .catch(err => console.log(err))
          })}
        >
          <input {...getInputProps()} />
          {
              image
                ? (
                    <>
                    <CardMedia
                    component="img"
                    image={typeof image === 'string' ? image : image?.url}
                    id="output"
                    draggable="false"
                    width='300px'
                    height='300px'
                    />
                        <CardActions sx={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          cursor: 'pointer'
                        }}>
                        <IconButton
                            sx={{
                              width: 10,
                              height: 10
                            }}
                            onClick={() => setImage(undefined)}
                        >
                          <Cancel
                              color="primary"
                              sx={{
                                maxHeight: 18,
                                maxWidth: 18,
                                '&:hover': {
                                  color: '#FF6A74'
                                }
                              }}
                          />
                        </IconButton>
                    </CardActions>
                    </>
                  )
                : (
                  <Stack width='300px' height='300px' justifyContent='center' alignItems='center'>
                    <Typography fontSize={20} fontWeight='bold' display='flex'>Selecione uma imagem  {required && <Typography color='red'>*</Typography>}</Typography>
                  </Stack>
                  )
          }
        </Card>
    <AlertComponent message='Arquivo inválido!' type='error' showAlert={showAlert} setShowAlert={setShowAlert} />
    </Box>
  )
}
