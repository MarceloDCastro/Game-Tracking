import { Cancel } from '@mui/icons-material'
import { Card, CardActions, CardMedia, IconButton, List, Typography } from '@mui/material'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { getBase64 } from '../../helpers/GetBase64'

export default function DropzoneComponent ({ image, setImage, required }) {
  const [file, setFile] = useState([])
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 5,
    maxSize: 400000,
    accept: 'image/png, image/jpeg',
    onDropRejected: (rejectedFiles) => {
      setShowAlert(true)
    }
    // onDrop: async (acceptedFiles) => {
    //   await editObjectWithBase64(acceptedFiles)
    // }
  })

  return (
        <Card
          sx={{
            backgroundImage: `url="${image}"`,
            maxWidth: !image ? '350px' : '350px',
            maxHeight: !image ? '350px' : '350px',
            backgroundColor: '#00000011',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer'
          }}
          {...getRootProps()}
          onChange={(e => {
            getBase64(e.target.files[0]).then(res => setImage(res.base64))
          })}
        >
          <input {...getInputProps()} />
          {
              image
                ? (
                    <>
                    <CardMedia
                    component="img"
                    image={image}
                    id="output"
                    draggable="false"
                    />
                        <CardActions sx={{
                          position: 'absolute',
                          top: '0px',
                          right: '0px',
                          cursor: 'pointer'
                        }}>
                        <IconButton
                            sx={{
                              width: 10,
                              height: 10
                            }}
                            icon={
                            <Cancel
                                color="primary"
                                sx={{
                                  maxHeight: 18,
                                  maxWidth: 18,
                                  '&:hover': {
                                    color: '#FF6A74'
                                  }
                                }}
                                onClick={() => setImage(undefined)}
                            />
                            }
                        />
                    </CardActions>
                    </>
                  )
                : (
                <Typography fontSize={20} fontWeight='bold' display='flex'>Selecione uma imagem {true && <Typography color='red'>*</Typography>}</Typography>
                  )
          }
        </Card>
  )
}
