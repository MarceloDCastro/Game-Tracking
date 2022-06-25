import React, { useEffect, useState } from 'react'
import { Add, ArrowBack, Clear, Edit, Delete, Cancel, CancelOutlined, ArrowRight } from '@mui/icons-material'
import { Button, CircularProgress, Modal, Stack, Box, Typography, Table, TableHead, TableRow, TableCell, Paper, TableBody, TableContainer, Checkbox, IconButton, Tooltip } from '@mui/material'
import InputComponent from '../../../../components/InputComponent'
import PageComponent from '../../../../components/PageComponent'

import 'react-day-picker/dist/style.css'
import { api } from '../../../../services/apiClient'
import AlertComponent from '../../../../components/AlertComponent'
import Link from 'next/link'
import { useAppThemeContext } from '../../../../context/ThemeContext'
import DialogComponent from '../../../../components/DialogComponent'
import { IPlataforma, IPlataformaPost } from '../../../../interfaces/Plataforma'

export default function Plataformas () {
  const { mode } = useAppThemeContext()

  const [loading, setLoading] = useState(false)
  const [loadingGet, setLoadingGet] = useState(false)

  const [plataformas, setPlataformas] = useState<IPlataforma[]>([])
  const [selectedPlataformas, setSelectedPlataformas] = useState<number[]>([])

  const [filteredValue, setFilteredValue] = useState('')

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

  // Dialog
  const [showDialog, setShowDialog] = useState(false)

  useEffect(() => getPlataformas(), [])

  useEffect(() => {
    if (modalType === 'post') {
      setNome('')
    }
  }, [modalType])

  useEffect(() => console.log('Selecionados: ', selectedPlataformas), [selectedPlataformas])

  useEffect(() => {
    if (alertSettings.message !== '') { setShowAlert(true) }
  }, [alertSettings])

  const getPlataformas = () => {
    setLoadingGet(true)
    api.get('plataforma')
      .then(res => setPlataformas(res.data))
      .catch(err => setAlertSettings({
        message: err?.response?.data?.mensagem || 'Falha ao buscar plataformas!',
        type: 'error'
      }))
      .finally(() => setLoadingGet(false))
  }

  const postPlataforma = () => {
    setLoading(true)
    const objPost: IPlataformaPost = { nome }
    console.log('objPost: ', objPost)
    api.post('plataforma', objPost)
      .then(res => {
        setAlertSettings({
          message: res.data.mensagem,
          type: 'success'
        })
        getPlataformas()
        setShowModal(false)
        setNome('')
      })
      .catch(err => setAlertSettings({
        message: err?.response?.data?.mensagem || 'Falha ao cadastrar plataforma!',
        type: 'error'
      }))
      .finally(() => setLoading(false))
  }

  const putPlataforma = () => {
    setLoading(true)
    const objPut = { id: selectedPlataformas[0], nome }
    console.log('objPut: ', objPut)
    api.put('plataforma', objPut)
      .then(res => {
        setAlertSettings({
          message: res.data.mensagem,
          type: 'success'
        })
        getPlataformas()
        setShowModal(false)
      })
      .catch(err => setAlertSettings({
        message: err?.response?.data?.mensagem || 'Falha ao editar plataforma!',
        type: 'error'
      }))
      .finally(() => setLoading(false))
  }

  const deletePlataformas = async () => {
    setLoading(true)
    const objDelete = { plataformas: selectedPlataformas }
    console.log('objDelete: ', objDelete)
    api.post('plataforma/delete', objDelete)
      .then(res => {
        setAlertSettings({
          message: res.data.mensagem,
          type: 'success'
        })
        getPlataformas()
        setShowDialog(false)
        setSelectedPlataformas([])
      })
      .catch(err => setAlertSettings({
        message: err?.response?.data?.mensagem || 'Falha ao deletar plataforma!',
        type: 'error'
      }))
      .finally(() => setLoading(false))
  }

  return (
    <PageComponent title='Plataformas' rightElement={
      <Stack direction={['column', 'row']} gap={3} justifyContent='center' alignItems='center'>
        <Button variant='contained' onClick={() => { setModalType('post'); setShowModal(true) }} startIcon={<Add />}>Cadastrar Plataforma</Button>
        <Button variant='outlined' onClick={() => { setModalType('put'); setShowModal(true); setNome(plataformas.find(g => g.id === selectedPlataformas[0])?.nome || '') }} startIcon={<Edit />} disabled={selectedPlataformas.length !== 1}>Editar Plataforma</Button>
        <Button variant='contained' color='error' onClick={() => { setShowDialog(true) }} startIcon={<Delete />} disabled={!selectedPlataformas.length}>Remover Plataforma(s)</Button>
      </Stack>
    }>
      <InputComponent
      label='Filtro'
      value={filteredValue}
      onChange={e => setFilteredValue(e.target.value)}
      endIcon={<Tooltip title="Limpar filtro" arrow><IconButton onClick={() => setFilteredValue('')}><Clear /></IconButton></Tooltip>}
      sx={{
        maxWidth: '450px'
      }} />
      <Typography my={1}>{plataformas?.length} plataformas encontradas{selectedPlataformas.length ? `, ${selectedPlataformas.length} plataformas selecionados` : ''}</Typography>
      {
        loadingGet
          ? <Stack alignItems='center'><CircularProgress size={70} sx={{ my: 5 }} /></Stack>
          : !!plataformas?.length && (
                <TableContainer sx={{ boxShadow: 3, borderRadius: 3 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Checkbox
                            checked={selectedPlataformas.length === plataformas.length}
                            indeterminate={!!selectedPlataformas.length && selectedPlataformas.length < plataformas.length}
                            onChange={() => {
                              if (selectedPlataformas.length < plataformas.length) {
                                setSelectedPlataformas([...plataformas.map(g => g.id)])
                              } else {
                                setSelectedPlataformas([])
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
                        (filteredValue ? plataformas.filter(g => g.id.toString() === filteredValue || g.nome.toLowerCase().includes(filteredValue.toLowerCase())) : plataformas)?.map(plataforma => (
                          <TableRow key={plataforma.id} hover>
                            <TableCell>
                              <Checkbox
                                checked={selectedPlataformas?.includes(plataforma.id)}
                                onChange={e => {
                                  if (e.target.checked) {
                                    setSelectedPlataformas([...selectedPlataformas, plataforma.id])
                                  } else {
                                    const tempArray = [...selectedPlataformas]
                                    tempArray.splice(tempArray.findIndex(g => g === plataforma.id), 1)
                                    setSelectedPlataformas([...tempArray])
                                  }
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              {plataforma.id}
                            </TableCell>
                            <TableCell>
                              {plataforma.nome}
                            </TableCell>
                          </TableRow>
                        ))
                      }
                    </TableBody>
                  </Table>
                </TableContainer>
            )
      }

      <Stack direction={['column', 'row']} gap={3} justifyContent='center' alignItems='center' mt={3}>
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
        <PageComponent title={`${modalType === 'put' ? 'Editar' : 'Cadastrar'} Plataforma`}
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
            <Button variant='outlined' onClick={() => setShowModal(false)} startIcon={<CancelOutlined />}>Cancelar</Button>
            <Button variant='contained' onClick={modalType === 'put' ? putPlataforma : postPlataforma} startIcon={loading ? <CircularProgress size='20px' color='inherit' /> : modalType === 'put' ? <Edit /> : <Add />}>{`${modalType === 'put' ? 'Editar' : 'Cadastrar'} Plataforma`}</Button>
          </Stack>
        </PageComponent>
      </Modal>
      <DialogComponent
        open={showDialog}
        setOpen={setShowDialog}
        title="Remover itens"
        text="Tem certeza que deseja remover estes itens?"
        onConfirm={deletePlataformas}
        content={
          <Stack
            direction='column'
            boxShadow={3}
            borderRadius={3}
            pl={2}
            py={1}
            mt={2}
            overflow='auto'
            maxHeight={250}
          >
            {
              selectedPlataformas.map(idPlataforma => (
                <Typography key={idPlataforma} display='flex' alignItems='center'><ArrowRight /> {plataformas.find(g => g.id === idPlataforma)?.nome}</Typography>
              ))
            }
          </Stack>
        }
      />
    <AlertComponent message={alertSettings.message} type={alertSettings.type} showAlert={showAlert} setShowAlert={setShowAlert} />
    </PageComponent>
  )
}
