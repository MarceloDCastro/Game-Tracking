import React, { useEffect, useState } from 'react'
import { Add, ArrowBack, Edit } from '@mui/icons-material'
import { Button, CircularProgress, Modal, Stack, Box, Typography, Table, TableHead, TableRow, TableCell, Paper, TableBody, TableContainer, Checkbox } from '@mui/material'
import InputComponent from '../../../../components/InputComponent'
import PageComponent from '../../../../components/PageComponent'

import 'react-day-picker/dist/style.css'
import { api } from '../../../../services/api'
import AlertComponent from '../../../../components/AlertComponent'
import Link from 'next/link'

export default function Generos () {
  const [loading, setLoading] = useState(false)
  const [loadingGet, setLoadingGet] = useState(false)

  const [generos, setGeneros] = useState([])
  const [selectedGeneros, setSelectedGeneros] = useState<number[]>([])

  // Campos formulário
  const [nome, setNome] = useState('')

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
  const [modalType, setModalType] = useState<'post'|'put'>()

  useEffect(() => getGeneros(), [])

  useEffect(() => {
    if (modalType === 'post') {
      setNome('')
    }
  }, [modalType])

  useEffect(() => console.log('Selecionados: ', selectedGeneros), [selectedGeneros])

  useEffect(() => {
    if (alertSettings.message !== '') { setShowAlert(true) }
  }, [alertSettings])

  const getGeneros = () => {
    setLoadingGet(true)
    api.get('genero')
      .then(res => setGeneros(res.data))
      .catch(err => setAlertSettings({
        message: err?.response?.data?.mensagem || 'Falha ao buscar gêneros!',
        type: 'error'
      }))
      .finally(() => setLoadingGet(false))
  }

  const postGenero = () => {
    const objPost = { nome }
    console.log('objPost: ', objPost)
    api.post('genero', objPost)
      .then(res => {
        setAlertSettings({
          message: res.data.mensagem,
          type: 'success'
        })
        getGeneros()
        setShowModal(false)
      })
      .catch(err => setAlertSettings({
        message: err?.response?.data?.mensagem || 'Falha ao cadastrar gênero!',
        type: 'error'
      }))
      .finally(() => setLoading(false))
  }

  const putGenero = () => {
    const objPut = { id: selectedGeneros[0], nome }
    console.log('objPut: ', objPut)
    api.put('genero', objPut)
      .then(res => {
        setAlertSettings({
          message: res.data.mensagem,
          type: 'success'
        })
        getGeneros()
        setShowModal(false)
      })
      .catch(err => setAlertSettings({
        message: err?.response?.data?.mensagem || 'Falha ao editar gênero!',
        type: 'error'
      }))
      .finally(() => setLoading(false))
  }

  return (
    <PageComponent title='Gêneros' rightElement={
      <Stack direction={['column', 'row']} gap={3} justifyContent='center' alignItems='center'>
        <Button variant='contained' onClick={() => { setModalType('post'); setShowModal(true) }} startIcon={<Add />}>Cadastrar Gênero</Button>
        <Button variant='outlined' onClick={() => { setModalType('put'); setShowModal(true); setNome(generos.find(g => g.id === selectedGeneros[0]).nome) }} startIcon={<Edit />} disabled={selectedGeneros.length !== 1}>Editar Gênero</Button>
      </Stack>
    }>
      {
        loadingGet
          ? <Stack alignItems='center'><CircularProgress size={70} sx={{ my: 5 }} /></Stack>
          : !generos?.length
              ? <Typography my={5}>Não foi possível encontrar gêneros</Typography>
              : (
                <TableContainer sx={{ boxShadow: 3, borderRadius: 3, my: 3 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Checkbox
                            checked={selectedGeneros.length === generos.length}
                            indeterminate={selectedGeneros.length && selectedGeneros.length !== generos.length}
                            onChange={() => {
                              if (selectedGeneros.length < generos.length) {
                                setSelectedGeneros([...generos.map(g => g.id)])
                              } else {
                                setSelectedGeneros([])
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>
                          Código
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>
                          Nome
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        generos?.map(genero => (
                          <TableRow key={genero.id}>
                            <TableCell>
                              <Checkbox
                                checked={selectedGeneros?.includes(genero.id)}
                                onChange={e => {
                                  if (e.target.checked) {
                                    setSelectedGeneros([...selectedGeneros, genero.id])
                                  } else {
                                    const tempArray = [...selectedGeneros]
                                    tempArray.splice(tempArray.findIndex(g => g === genero.id), 1)
                                    setSelectedGeneros([...tempArray])
                                  }
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              {genero.id}
                            </TableCell>
                            <TableCell>
                              {genero.nome}
                            </TableCell>
                          </TableRow>
                        ))
                      }
                    </TableBody>
                  </Table>
                </TableContainer>
                )
      }

      <Stack direction={['column', 'row']} gap={3} justifyContent='center' alignItems='center'>
        <Link href='/Admin'>
          <Button variant='outlined' startIcon={<ArrowBack />}>Voltar ao DashBoard</Button>
        </Link>
      </Stack>

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <PageComponent title={`${modalType === 'put' ? 'Editar' : 'Cadastrar'} Gênero`}
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
          <Stack direction={['column', 'row']} gap={[3, '5%']} my={3}>
            <InputComponent label='Nome' value={nome} onChange={e => setNome(e.target.value)} icon={<Edit />} required />
          </Stack>

          <Stack direction={['column', 'row']} gap={3} justifyContent='center' alignItems='center'>
            <Button variant='outlined' onClick={() => setShowModal(false)} startIcon={<ArrowBack />}>Voltar</Button>
            <Button variant='contained' onClick={modalType === 'put' ? putGenero : postGenero} startIcon={loading ? <CircularProgress size='20px' color='inherit' /> : modalType === 'put' ? <Edit /> : <Add />}>{`${modalType === 'put' ? 'Editar' : 'Cadastrar'} Gênero`}</Button>
          </Stack>
        </PageComponent>
      </Modal>
    <AlertComponent message={alertSettings.message} type={alertSettings.type} showAlert={showAlert} setShowAlert={setShowAlert} />
    </PageComponent>
  )
}
