import React, { useContext, useEffect, useState } from 'react'
import { Avatar, Box, Button, Chip, CircularProgress, Modal, Stack, Typography } from '@mui/material'
import { CancelOutlined, Edit, Message, PhotoCamera, Visibility } from '@mui/icons-material'
import PageComponent from '../../components/PageComponent'
import TitleComponent from '../../components/TitleComponent'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Pallete } from '../../context/ThemeContext'
import { api } from '../../services/apiClient'
import { AxiosResponse } from 'axios'
import { IPublicacao } from '../../interfaces/Publicacao'
import moment from 'moment'
import Link from 'next/link'
import { AuthContext } from '../../context/AuthContext'
import { useRouter } from 'next/router'
import PhoneMask from '../../helpers/PhoneMask'
import DialogComponent from '../../components/DialogComponent'
import AlertComponent from '../../components/AlertComponent'
import InputComponent from '../../components/InputComponent'
import DropzoneComponent from '../../components/DropzoneComponent'

export default function Perfil () {
  const { userInfo, getUserInfo } = useContext(AuthContext)
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  // Campos formulário
  const [imagem, setImagem] = useState<string | undefined>()

  // Alerta
  const [showAlert, setShowAlert] = useState(false)
  const [alertSettings, setAlertSettings] = useState<{
    message: string,
    type: 'success'|'error'|'warning'|'info'
  }>({
    message: '',
    type: 'success'
  })

  // Modal
  const [showModal, setShowModal] = useState(false)

  // Dialog
  const [showDialog, setShowDialog] = useState(false)

  useEffect(() => {
    if (!userInfo) return router.push('/')

    setImagem(userInfo?.imagem)
  }, [userInfo])

  const putImage = () => {
    setLoading(true)
    api.put('usuario', {
      ...userInfo,
      imagem: imagem || null
    })
      .then(({ data }) => {
        setAlertSettings({
          type: 'success',
          message: data.message || 'Imagem atualizada com sucesso!'
        })
        setTimeout(getUserInfo, 1000)
      })
      .catch(({ data }) => setAlertSettings({
        type: 'error',
        message: data.message || 'Falha ao atualizar imagem!'
      }))
      .finally(() => {
        setLoading(false)
        setShowModal(false)
      })
  }

  const deleteImage = () => {
    setLoading(true)
    api.put('usuario', {
      ...userInfo,
      imagem: null
    })
      .then(({ data }) => {
        setAlertSettings({
          type: 'success',
          message: data.message || 'Imagem atualizada com sucesso!'
        })
        setTimeout(getUserInfo, 1000)
      })
      .catch(({ data }) => setAlertSettings({
        type: 'error',
        message: data.message || 'Falha ao atualizar imagem!'
      }))
      .finally(() => {
        setLoading(false)
        setShowDialog(false)
      })
  }

  return (
        <PageComponent>
                <Box>
                    <Stack direction={{ xs: 'column', md: 'row' }} alignItems={{ xs: 'center', md: 'start' }}>
                          <Box>
                              <TitleComponent title='Perfil' />
                              <Stack direction='row' spacing={5} mt={3}>
                                <Avatar
                                  variant="rounded"
                                  sx={{
                                    bgcolor: '#d1d1d1',
                                    width: { xs: '200px', sm: '250px' },
                                    height: { xs: '200px', sm: '250px' },
                                    boxShadow: 4
                                  }}
                                  src={userInfo?.imagem}
                                ><PhotoCamera /></Avatar>
                                <Stack justifyContent='space-between'>
                                  <Box>
                                    <Typography sx={{ fontSize: 25 }}>{userInfo?.nome}</Typography>
                                    <Typography sx={{ fontSize: 16, mb: 1 }}>{userInfo?.email}</Typography>
                                    <Stack direction='row' spacing={1} mb={1}>
                                      <Chip
                                        label={userInfo?.tipo === 3 ? 'Usuário' : userInfo?.tipo === 2 ? 'Editor' : userInfo?.tipo === 1 ? 'Administrador' : 'Usuário'}
                                        color='secondary'
                                      />
                                    </Stack>
                                    {userInfo?.telefone && <Typography sx={{ fontSize: 16, mb: 1 }}>Telefone: {PhoneMask(userInfo?.telefone)}</Typography>}
                                    {userInfo?.dataNascimeto && <Typography sx={{ fontSize: 16, mb: 1 }}>Data de Nascimento: {userInfo?.dataNascimeto}</Typography>}
                                  </Box>
                                  <Box>
                                    <Typography color="text.secondary">{`Criado em ${moment(userInfo?.createdAt).format('LL')}`}</Typography>
                                    <Typography color="text.secondary">{`Atualizado a última vez em ${moment(userInfo?.updatedAt).format('LL')}`}</Typography>
                                  </Box>
                                </Stack>
                              </Stack>
                              <Stack direction='row' justifyContent='space-between' sx={{ width: { xs: '200px', sm: '250px' }, mt: 2 }}>
                                <Button variant='contained' onClick={() => setShowModal(true)}>Editar Foto</Button>
                                <Button variant='outlined' onClick={() => { setImagem(userInfo?.imagem); setShowDialog(true) }}>Remover Foto</Button>
                              </Stack>
                          </Box>
                    </Stack>
                </Box>
                <Modal
                  open={showModal}
                  onClose={() => setShowModal(false)}
                  aria-labelledby="parent-modal-title"
                  aria-describedby="parent-modal-description"
                >
                  <PageComponent title='Editar Imagem'
                  sx={{
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    m: 0,
                    pt: 2,
                    px: 4,
                    pb: 3,
                    width: ['95vw', '85vw', '75vw'],
                    maxWidth: 1000,
                    maxHeight: '90vh',
                    overflowX: 'auto'
                  }}>
                    <Stack direction='row' justifyContent='center' gap={[3, '5%']} my={3}>
                      <DropzoneComponent image={imagem} setImage={setImagem} required />
                    </Stack>

                    <Stack direction={['column', 'row']} gap={3} justifyContent='center' alignItems='center'>
                      <Button variant='outlined' onClick={() => setShowModal(false)} startIcon={<CancelOutlined />}>Cancelar</Button>
                      <Button variant='contained' onClick={putImage} startIcon={loading ? <CircularProgress size='20px' color='inherit' /> : <Edit />}>Editar Imagem</Button>
                    </Stack>
                  </PageComponent>
                </Modal>
                <DialogComponent
                  open={showDialog}
                  setOpen={setShowDialog}
                  title="Remover imagem"
                  text="Tem certeza que deseja remover sua imagem de perfil?"
                  onConfirm={deleteImage}
                />
              <AlertComponent message={alertSettings.message} type={alertSettings.type} showAlert={showAlert} setShowAlert={setShowAlert} />
        </PageComponent>
  )
}
