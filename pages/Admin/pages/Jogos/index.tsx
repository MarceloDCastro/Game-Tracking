import React, { useEffect, useState } from 'react'
import { Add, ArrowBack, Clear, Edit, Delete, Cancel, Check, ArrowRight, Visibility, Message, Search, CancelOutlined, CalendarToday } from '@mui/icons-material'
import { Button, CircularProgress, TextField, Modal, Stack, Box, Typography, Table, TableHead, TableRow, TableCell, Paper, TableBody, TableContainer, Checkbox, IconButton, Tooltip, Chip, TableFooter, Pagination, TablePagination, Popover, InputLabel, FormControl, Select, MenuItem, OutlinedInput, SelectChangeEvent } from '@mui/material'
import InputComponent from '../../../../components/InputComponent'
import PageComponent from '../../../../components/PageComponent'

import 'react-day-picker/dist/style.css'
import { api } from '../../../../services/api'
import AlertComponent from '../../../../components/AlertComponent'
import Link from 'next/link'
import { useAppThemeContext } from '../../../../context/ThemeContext'
import DialogComponent from '../../../../components/DialogComponent'
import { IJogo, IJogoPost } from '../../../../interfaces/Jogo'
import TextAreaComponent from '../../../../components/TextAreaComponent'
import moment from 'moment'
import { DayPicker } from 'react-day-picker'
import { IGenero } from '../../../../interfaces/Genero'
import DropzoneListComponent from '../../../../components/DropzoneListComponent'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

export default function Jogos () {
  const { mode } = useAppThemeContext()

  const [loading, setLoading] = useState(false)
  const [loadingGet, setLoadingGet] = useState(false)

  const [jogos, setJogos] = useState<IJogo[]>([])
  const [generos, setGeneros] = useState<IGenero[]>([])
  const [jogoVisualizada, setJogoVisualizada] = useState<IJogo>()
  const [selectedJogos, setSelectedJogos] = useState<IJogo[]>([])

  const [objJogo, setObjJogo] = useState<Partial<IJogo> | undefined>()
  const [images, setImages] = useState<string[]>([])

  // DatePicker
  const [anchorEl, setAnchorEl] = useState<Element |((element: Element) => Element) | null | undefined>(null)
  const openDateModal = Boolean(anchorEl)

  // Filtro
  const [search, setSearch] = useState<{
    filterValue: string,
    searchValue: string
  }>({
    filterValue: '',
    searchValue: ''
  })

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
  const [modalType, setModalType] = useState<'post'|'put'|'view'>()

  // Dialog
  const [showDialog, setShowDialog] = useState(false)

  useEffect(() => getGeneros(), [])

  useEffect(() => getJogos(), [page, itemsPerPage, search.searchValue])

  useEffect(() => {
    if (modalType === 'post') {
      setObjJogo(undefined)
      setImages([])
    }
  }, [modalType])

  useEffect(() => console.log('Selecionados: ', selectedJogos), [selectedJogos])
  useEffect(() => console.log('objJogo: ', objJogo), [objJogo])

  useEffect(() => {
    if (alertSettings.message !== '') { setShowAlert(true) }
  }, [alertSettings])

  const getJogos = () => {
    setLoadingGet(true)
    api.get(`jogo?page=${page}&itemsPerPage=${itemsPerPage}&search=${search.searchValue}`)
      .then(res => {
        console.log('GET: ', res.data)
        setJogos(res.data.jogos)
        setTotalItems(res.data.totalItems)
        setSelectedJogos([])
      })
      .catch(err => setAlertSettings({
        message: err?.response?.data?.mensagem || 'Falha ao buscar jogos!',
        type: 'error'
      }))
      .finally(() => setLoadingGet(false))
  }

  const postJogo = () => {
    setLoading(true)
    const objPost = {
      ...objJogo,
      Generos: objJogo?.Generos?.map(g => g.id),
      imagens: images
    }
    console.log('objPost: ', objPost)
    api.post('jogo', objPost)
      .then(res => {
        setAlertSettings({
          message: res.data.mensagem,
          type: 'success'
        })
        getJogos()
        setShowModal(false)
        setObjJogo(undefined)
        setImages([])
      })
      .catch(err => setAlertSettings({
        message: err?.response?.data?.mensagem || 'Falha ao cadastrar jogo!',
        type: 'error'
      }))
      .finally(() => setLoading(false))
  }

  const putJogo = () => {
    setLoading(true)
    const objPut = {
      ...objJogo,
      Generos: objJogo?.Generos?.map(g => g.id),
      imagens: images
    }
    console.log('objPut: ', objPut)
    api.put('jogo', objPut)
      .then(res => {
        setAlertSettings({
          message: res.data.mensagem,
          type: 'success'
        })
        getJogos()
        setShowModal(false)
      })
      .catch(err => setAlertSettings({
        message: err?.response?.data?.mensagem || 'Falha ao editar jogo!',
        type: 'error'
      }))
      .finally(() => setLoading(false))
  }

  const deleteJogos = async () => {
    setLoading(true)
    const objDelete = { jogos: selectedJogos.map(j => j.id) }
    console.log('objDelete: ', objDelete)
    api.post('jogo/delete', objDelete)
      .then(res => {
        setAlertSettings({
          message: res.data.mensagem,
          type: 'success'
        })
        getJogos()
        setShowDialog(false)
        setSelectedJogos([])
      })
      .catch(err => setAlertSettings({
        message: err?.response?.data?.mensagem || 'Falha ao deletar jogo!',
        type: 'error'
      }))
      .finally(() => setLoading(false))
  }

  const getGeneros = () => {
    api.get('genero')
      .then(res => setGeneros(res.data))
      .catch(err => console.log(err))
  }

  return (
    <PageComponent title='Jogos' rightElement={
      <Stack direction={['column', 'row']} gap={3} justifyContent='center' alignItems='center'>
        <Button variant='contained' onClick={() => { setModalType('post'); setShowModal(true) }} startIcon={<Add />}>Cadastrar Jogo</Button>
        <Button variant='outlined' onClick={() => {
          setModalType('put')
          setShowModal(true)
          setObjJogo({ ...selectedJogos[0] })
          setImages([...selectedJogos[0].ImagensJogos])
        }} startIcon={<Edit />} disabled={selectedJogos.length !== 1}>Editar Jogo</Button>
        <Button variant='contained' color='error' onClick={() => { setShowDialog(true) }} startIcon={<Delete />} disabled={!selectedJogos.length}>Remover Jogo(s)</Button>
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
          !jogos.length
            ? 'Nenhum jogo encontrado'
            : `${totalItems} jogos encontrados`
        }
          {selectedJogos.length ? `, ${selectedJogos.length} jogos selecionadas` : ''}
      </Typography>
      {
        loadingGet
          ? <Stack alignItems='center'><CircularProgress size={70} sx={{ my: 5 }} /></Stack>
          : !!jogos?.length && (
            <>
                <TableContainer sx={{ boxShadow: 3, borderRadius: 3 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Checkbox
                            checked={selectedJogos.length === jogos.length}
                            indeterminate={!!selectedJogos.length && selectedJogos.length < jogos.length}
                            onChange={() => {
                              if (selectedJogos.length < jogos.length) {
                                setSelectedJogos([...jogos])
                              } else {
                                setSelectedJogos([])
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
                        <TableCell sx={{ fontWeight: 'bold' }}>
                          Lançamento
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }} align='center'>
                          Ações
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        jogos?.map(jogo => (
                          <TableRow key={jogo.id} hover>
                            <TableCell>
                              <Checkbox
                                checked={selectedJogos?.some(j => j.id === jogo.id)}
                                onChange={e => {
                                  if (e.target.checked) {
                                    setSelectedJogos([...selectedJogos, jogo])
                                  } else {
                                    const tempArray = [...selectedJogos]
                                    tempArray.splice(tempArray.findIndex(f => f.id === jogo.id), 1)
                                    setSelectedJogos([...tempArray])
                                  }
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              {jogo.id}
                            </TableCell>
                            <TableCell>
                              {jogo.nome}
                            </TableCell>
                            <TableCell>
                              {jogo.dataLancamento && moment(jogo.dataLancamento).format('L')}
                            </TableCell>
                            <TableCell align='center'>
                              <IconButton onClick={() => { setObjJogo(jogo); setImages([...jogo.ImagensJogos]); setModalType('view'); setShowModal(true) }}><Visibility color='primary' /></IconButton>
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
        <PageComponent title={modalType === 'post' ? 'Cadastrar Jogo' : modalType === 'put' ? 'Editar Jogo' : 'Visualizar Jogo'}
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
            <InputComponent label='Nome' value={objJogo?.nome} onChange={e => setObjJogo({ ...objJogo, nome: e.target.value })} icon={<Edit />} required disabled={modalType === 'view'} />
            <InputComponent label='Data de Lançamento' value={objJogo?.dataLancamento ? moment(objJogo.dataLancamento).format('DD/MM/YYYY') : ''} onClick={(e) => { if (modalType !== 'view') setAnchorEl(e.currentTarget) }} icon={<CalendarToday />} required disabled={modalType === 'view'} />
            <Popover
              id='dataLancamento'
              open={openDateModal}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              onClose={() => setAnchorEl(null)}
            >
              <DayPicker
                mode="single"
                selected={objJogo?.dataLancamento}
                onSelect={e => {
                  setObjJogo({ ...objJogo, dataLancamento: e })
                  setAnchorEl(null)
                }}
                fromYear={2000}
                toYear={new Date().getFullYear()}
                captionLayout="dropdown"
              />
            </Popover>
          </Stack>

          <Stack direction={['column', 'row']} gap={[3, '5%']} my={3}>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel id="demo-multiple-chip-label">Gêneros</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={objJogo?.Generos?.map(g => g.id) || []}
                  onChange={(e: SelectChangeEvent<IGenero[] | number[]>) => {
                    setObjJogo({
                      ...objJogo,
                      Generos: e.target.value
                        .map((generoId: IGenero | number) => {
                          if (typeof generoId === 'number') {
                            return generos.find(g => g.id === generoId)
                          } else {
                            return generoId
                          }
                        })
                        .sort((a, b) => {
                          if (a.nome > b.nome) return 1
                          if (a.nome < b.nome) return -1
                          return 0
                        })
                    })
                  }}
                  input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {console.log('s: ', selected)}
                      {selected?.map((generoId) => (
                        <Chip key={generos.find(g => g.id === generoId)?.id} label={generos.find(g => g.id === generoId)?.nome} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                  disabled={modalType === 'view'}
                >
                  {generos?.map((genero) => (
                    <MenuItem
                      key={genero.id}
                      value={genero.id}
                    >
                      {genero.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
          </Stack>

          <Stack direction={['column', 'row']} gap={[3, '5%']} my={3}>
            <TextAreaComponent label='Descrição' icon={<Message />} value={objJogo?.descricao} onChange={e => setObjJogo({ ...objJogo, descricao: e.target.value })} disabled={modalType === 'view'} />
          </Stack>

          <Stack direction={['column', 'row']} gap={[3, '5%']} my={3}>
            {modalType !== 'view'
              ? <DropzoneListComponent images={images} setImages={setImages} required />
              : (
                <Stack justifyContent='center' alignItems='center'>
                  <Box width='60%' minWidth='300px'>
                    <Typography fontWeight='bold' display='flex'>Imagens ({images.length}/4)</Typography>
                    <Carousel autoPlay infiniteLoop emulateTouch>
                      {
                        images?.map(i => (
                            <img key={i.id} style={{ userSelect: 'none' }} src={i.url} />
                        ))
                      }
                    </Carousel>
                  </Box>
                </Stack>
                )
            }
          </Stack>

          <Stack direction={['column', 'row']} gap={3} justifyContent='center' alignItems='center'>
            <Button variant='outlined' onClick={() => setShowModal(false)} startIcon={<CancelOutlined />}>{modalType !== 'view' ? 'Cancelar' : 'Voltar'}</Button>
            {modalType !== 'view' && <Button variant='contained' onClick={modalType === 'put' ? putJogo : postJogo} startIcon={loading ? <CircularProgress size='20px' color='inherit' /> : modalType === 'put' ? <Edit /> : <Add />}>{`${modalType === 'put' ? 'Editar' : 'Cadastrar'} Jogo`}</Button>}
          </Stack>
        </PageComponent>
      </Modal>
      <DialogComponent
        open={showDialog}
        setOpen={setShowDialog}
        title="Remover itens"
        text="Tem certeza que deseja remover estes itens?"
        onConfirm={deleteJogos}
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
              selectedJogos.map(jogo => (
                <Typography key={jogo.id} display='flex' alignItems='center'><ArrowRight /> {jogo.nome}</Typography>
              ))
            }
          </Stack>
        }
      />
    <AlertComponent message={alertSettings.message} type={alertSettings.type} showAlert={showAlert} setShowAlert={setShowAlert} />
    </PageComponent>
  )
}
