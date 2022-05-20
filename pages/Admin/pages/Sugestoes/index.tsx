import React, { useEffect, useState } from 'react'
import { Add, ArrowBack, Clear, Edit, Delete, Cancel, Check, ArrowRight, Visibility, Message, Search } from '@mui/icons-material'
import { Button, CircularProgress, TextField, Modal, Stack, Box, Typography, Table, TableHead, TableRow, TableCell, Paper, TableBody, TableContainer, Checkbox, IconButton, Tooltip, Chip, TableFooter, Pagination, TablePagination } from '@mui/material'
import InputComponent from '../../../../components/InputComponent'
import PageComponent from '../../../../components/PageComponent'

import 'react-day-picker/dist/style.css'
import { api } from '../../../../services/api'
import AlertComponent from '../../../../components/AlertComponent'
import Link from 'next/link'
import { useAppThemeContext } from '../../../../context/ThemeContext'
import DialogComponent from '../../../../components/DialogComponent'
import { ISugestao, ISugestaoPost } from '../../../../interfaces/Sugestao'
import TextAreaComponent from '../../../../components/TextAreaComponent'
import moment from 'moment'

export default function Sugestoes () {
  const { mode } = useAppThemeContext()

  const [loading, setLoading] = useState(false)
  const [loadingGet, setLoadingGet] = useState(false)

  const [sugestoes, setSugestoes] = useState<ISugestao[]>([])
  const [sugestaoVisualizada, setSugestaoVisualizada] = useState<ISugestao>()
  const [selectedSugestoes, setSelectedSugestoes] = useState<number[]>([])

  // Filtro
  const [search, setSearch] = useState<{
    filterValue: string,
    searchValue: string
  }>({
    filterValue: '',
    searchValue: ''
  })

  // Campos formulário
  const [nome, setNome] = useState('')

  // Paginação
  const [page, setPage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(12)
  const [totalItems, setTotalItems] = useState(0)

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

  useEffect(() => getSugestoes(), [page, itemsPerPage, search.searchValue])

  useEffect(() => {
    if (modalType === 'post') {
      setNome('')
    }
  }, [modalType])

  useEffect(() => console.log('Selecionados: ', selectedSugestoes), [selectedSugestoes])

  useEffect(() => {
    if (alertSettings.message !== '') { setShowAlert(true) }
  }, [alertSettings])

  const getSugestoes = () => {
    setLoadingGet(true)
    api.get(`sugestao?page=${page}&itemsPerPage=${itemsPerPage}&search=${search.searchValue}`)
      .then(res => {
        console.log('GET: ', res.data)
        setSugestoes(res.data.sugestoes)
        setTotalItems(res.data.totalItems)
        setSelectedSugestoes([])
      })
      .catch(err => setAlertSettings({
        message: err?.response?.data?.mensagem || 'Falha ao buscar sugestoes!',
        type: 'error'
      }))
      .finally(() => setLoadingGet(false))
  }

  const marcarSugestaoComoVisualizada = () => {
    setLoading(true)
    const objPut = { ...sugestaoVisualizada }
    console.log('objPut: ', objPut)
    api.post(`sugestao/MarcarComoVisualizada/${sugestaoVisualizada?.id}`)
      .then(res => {
        setAlertSettings({
          message: res.data.mensagem,
          type: 'success'
        })
        getSugestoes()
        setShowModal(false)
      })
      .catch(err => setAlertSettings({
        message: err?.response?.data?.mensagem || 'Falha ao editar sugestao!',
        type: 'error'
      }))
      .finally(() => setLoading(false))
  }

  const deleteSugestoes = async () => {
    setLoading(true)
    const objDelete = { sugestoes: selectedSugestoes }
    console.log('objDelete: ', objDelete)
    api.post('sugestao/delete', objDelete)
      .then(res => {
        setAlertSettings({
          message: res.data.mensagem,
          type: 'success'
        })
        getSugestoes()
        setShowDialog(false)
        setSelectedSugestoes([])
      })
      .catch(err => setAlertSettings({
        message: err?.response?.data?.mensagem || 'Falha ao deletar sugestao!',
        type: 'error'
      }))
      .finally(() => setLoading(false))
  }

  return (
    <PageComponent title='Sugestões' rightElement={
      <Stack direction={['column', 'row']} gap={3} justifyContent='center' alignItems='center'>
        <Button variant='contained' color='error' onClick={() => { setShowDialog(true) }} startIcon={<Delete />} disabled={!selectedSugestoes.length}>Remover Sugestões</Button>
      </Stack>
    }>
      <InputComponent
      label='Filtro'
      value={search.filterValue}
      onChange={e => setSearch({ ...search, filterValue: e.target.value })}
      onKeyPress={({ code }) => {
        if (code === 'Enter') {
          setSearch({ ...search, searchValue: search.filterValue })
          setPage(0)
        }
      }}
      endIcon={
        <>
          <Tooltip title="Buscar" arrow>
            <IconButton onClick={() => {
              setSearch({ ...search, searchValue: search.filterValue })
              setPage(0)
            }}>
              <Search />
            </IconButton>
          </Tooltip>
          <Tooltip title="Limpar filtro" arrow>
            <IconButton onClick={() => {
              setSearch({ filterValue: '', searchValue: '' })
              setPage(0)
            }}>
              <Clear />
            </IconButton>
          </Tooltip>
        </>
      }
      sx={{
        maxWidth: '450px'
      }} />
      <Typography my={1}>
        {
          !sugestoes.length
            ? 'Nenhuma sugestão encontrada'
            : `${totalItems} sugestões encontradas`
        }
          {selectedSugestoes.length ? `, ${selectedSugestoes.length} sugestões selecionadas` : ''}
      </Typography>
      {
        loadingGet
          ? <Stack alignItems='center'><CircularProgress size={70} sx={{ my: 5 }} /></Stack>
          : !!sugestoes?.length && (
            <>
                <TableContainer sx={{ boxShadow: 3, borderRadius: 3 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Checkbox
                            checked={selectedSugestoes.length === sugestoes.length}
                            indeterminate={!!selectedSugestoes.length && selectedSugestoes.length < sugestoes.length}
                            onChange={() => {
                              if (selectedSugestoes.length < sugestoes.length) {
                                setSelectedSugestoes([...sugestoes.map(g => g.id)])
                              } else {
                                setSelectedSugestoes([])
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>
                          Código
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>
                          Assunto
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>
                          Usuário
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>
                          Status
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }} align='center'>
                          Ver
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        sugestoes?.map(sugestao => (
                          <TableRow key={sugestao.id} hover>
                            <TableCell>
                              <Checkbox
                                checked={selectedSugestoes?.includes(sugestao.id)}
                                onChange={e => {
                                  if (e.target.checked) {
                                    setSelectedSugestoes([...selectedSugestoes, sugestao.id])
                                  } else {
                                    const tempArray = [...selectedSugestoes]
                                    tempArray.splice(tempArray.findIndex(g => g === sugestao.id), 1)
                                    setSelectedSugestoes([...tempArray])
                                  }
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              {sugestao.id}
                            </TableCell>
                            <TableCell>
                              {sugestao.assunto}
                            </TableCell>
                            <TableCell>
                              {sugestao.Usuario.nome}
                            </TableCell>
                            <TableCell>
                              <Chip label={sugestao.status} color={sugestao.status === 'Visualizado' ? 'success' : 'warning'} />
                            </TableCell>
                            <TableCell align='center'>
                              <IconButton onClick={() => { setSugestaoVisualizada(sugestao); setShowModal(true) }}><Visibility color='primary' /></IconButton>
                            </TableCell>
                          </TableRow>
                        ))
                      }
                    </TableBody>
                  </Table>
                  <Stack justifyContent='center' alignItems='center' p={1}>
                  <TablePagination
                    count={totalItems}
                    page={page}
                    onPageChange={(e, value) => setPage(value)}
                    rowsPerPageOptions={[12, 24, 36]}
                    rowsPerPage={itemsPerPage}
                    onRowsPerPageChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                  />
                  </Stack>
                </TableContainer>
              </>
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
        <PageComponent title='Visualizar Sugestão'
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
          <Stack direction={'column'} gap={3} my={3} py={1} px={3} boxShadow={3} borderRadius={3}>
            <Typography fontWeight='bold' fontSize={18}>#{sugestaoVisualizada?.id} - {sugestaoVisualizada?.assunto}</Typography>
            <Typography overflow='auto' maxHeight={250}>{sugestaoVisualizada?.mensagem}</Typography>
            <Stack>
              <Typography color="text.secondary">{sugestaoVisualizada?.Usuario?.nome}</Typography>
              <Typography color="text.secondary">{moment(sugestaoVisualizada?.createdAt).format('LLLL')}</Typography>
              </Stack>
          </Stack>

          <Stack direction={['column', 'row']} gap={3} justifyContent='center' alignItems='center'>
            <Button variant='outlined' onClick={() => setShowModal(false)} startIcon={<ArrowBack />}>Voltar</Button>
            {sugestaoVisualizada?.status !== 'Visualizado' && <Button variant='contained' onClick={marcarSugestaoComoVisualizada} startIcon={<Check />}>Marcar como Visualizada</Button>}
          </Stack>
        </PageComponent>
      </Modal>
      <DialogComponent
        open={showDialog}
        setOpen={setShowDialog}
        title="Remover itens"
        text="Tem certeza que deseja remover estes itens?"
        onConfirm={deleteSugestoes}
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
              selectedSugestoes.map(idSugestao => (
                <Typography key={idSugestao} display='flex' alignItems='center'><ArrowRight /> {sugestoes.find(s => s.id === idSugestao)?.assunto}</Typography>
              ))
            }
          </Stack>
        }
      />
    <AlertComponent message={alertSettings.message} type={alertSettings.type} showAlert={showAlert} setShowAlert={setShowAlert} />
    </PageComponent>
  )
}
