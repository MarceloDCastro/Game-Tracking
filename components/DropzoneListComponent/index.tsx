import React, { useEffect, useState } from 'react'
import { Cancel } from '@mui/icons-material'
import { Card, CardActions, CardMedia, IconButton, List, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import { getBase64 } from '../../helpers/GetBase64'
import { Box } from '@mui/system'
import AlertComponent from '../AlertComponent'

interface IDropzoneListComponentProps {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  required?: boolean;
  label?: string;
}

export default function DropzoneListComponent ({ images, setImages, required, label }: IDropzoneListComponentProps) {
  const [file, setFile] = useState([])
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
      <Typography fontWeight='bold' display='flex'>{label || 'Imagens'} {true && <Typography color='red'>*</Typography>}</Typography>
      <Stack direction='row' gap={1} flexWrap='wrap'>
        {images?.map((image, index) => (
          <Card
          key={index}
          sx={{
            border: '1px solid #d1d1d1',
            boxShadow: 3,
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '250px',
            height: '250px'
          }}
        >
          {console.log(image)}
                    <CardMedia
                    component="img"
                    image={image.url || image}
                    id="output"
                    draggable="false"
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
                            onClick={() => {
                              const newArray = [...images]
                              newArray.splice(index, 1)
                              setImages([...newArray])
                            }}
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
        </Card>
        ))}

        {images?.length < 4 && (
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
                .then(base64 => {
                  setImages([...images, base64])
                })
                .catch(err => console.log(err))
            })}
          >
            <input {...getInputProps()} />
            <Stack width='250px' height='250px' justifyContent='center' alignItems='center'>
              <Typography fontSize={20} fontWeight='bold'>Selecione uma imagem</Typography>
            </Stack>
          </Card>
        )}
      </Stack>
    <AlertComponent message='Arquivo inválido!' type='error' showAlert={showAlert} setShowAlert={setShowAlert} />
    </Box>
  )
}
