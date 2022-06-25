import { Description, Title, Link as LinkIcon, CalendarToday, Info, InfoOutlined, Add, ArrowBack, Delete, Search, Clear, ArrowRight, Edit, CancelOutlined, Visibility, SportsEsports } from '@mui/icons-material'
import { Button, CircularProgress, Modal, Popover, Stack, Box, Typography, Table, TableCell, IconButton, Tooltip, TableContainer, TableHead, TableRow, Checkbox, TableBody, TablePagination, FormControl, InputLabel, Select, SelectChangeEvent, OutlinedInput, MenuItem, Chip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import InputComponent from '../../../../components/InputComponent'
import PageComponent from '../../../../components/PageComponent'
import SelectComponent from '../../../../components/SelectComponent'
import TextAreaComponent from '../../../../components/TextAreaComponent'

import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import moment from 'moment'
import { api } from '../../../../services/api'
import AlertComponent from '../../../../components/AlertComponent'
import Link from 'next/link'
import DropzoneComponent from '../../../../components/DropzoneComponent'
import { IPublicacao } from '../../../../interfaces/Publicacao'
import DialogComponent from '../../../../components/DialogComponent'
import Image from 'next/image'
import { IPlataforma } from '../../../../interfaces/Plataforma'

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

export default function Publicacoes () {
  const [loading, setLoading] = useState(false)
  const [loadingGet, setLoadingGet] = useState(false)

  const [publicacoes, setPublicacoes] = useState<IPublicacao[]>([])
  const [selectedPublicacoes, setSelectedPublicacoes] = useState<IPublicacao[]>([])

  const [objPublicacao, setObjPublicacao] = useState<Partial<IPublicacao> | undefined>()
  const [imagem, setImagem] = useState<string | undefined>()

  const [jogos, setJogos] = useState<{id: number, nome: string}[]>([])
  const [plataformas, setPlataformas] = useState<IPlataforma[]>([])

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

  const tiposPublicacao = [
    {
      value: 'Grátis',
      label: 'Grátis'
    },
    {
      value: 'Promoção',
      label: 'Promoção'
    },
    {
      value: 'Lançamento',
      label: 'Lançamento'
    }
  ]

  useEffect(() => {
    getNomeJogos()
    getPlataformas()
  }, [])

  useEffect(() => getPublicacoes(), [page, itemsPerPage, search.searchValue])

  useEffect(() => {
    if (modalType === 'post') {
      setObjPublicacao(undefined)
      setImagem(undefined)
    }
  }, [modalType])

  useEffect(() => console.log('objPublicacao: ', objPublicacao), [objPublicacao])
  useEffect(() => console.log('img: ', imagem), [imagem])

  useEffect(() => {
    if (alertSettings.message !== '') { setShowAlert(true) }
  }, [alertSettings])

  const getPublicacoes = () => {
    setLoadingGet(true)
    api.get(`publicacao?page=${page}&itemsPerPage=${itemsPerPage}&search=${search.searchValue}`)
      .then(res => {
        console.log('GET: ', res.data)
        setPublicacoes(res.data.publicacoes)
        setTotalItems(res.data.totalItems)
        setSelectedPublicacoes([])
      })
      .catch(err => setAlertSettings({
        message: err?.response?.data?.mensagem || 'Falha ao buscar publicações!',
        type: 'error'
      }))
      .finally(() => setLoadingGet(false))
  }

  const getNomeJogos = () => {
    api.get('jogo/names').then(({ data }) => setJogos(data)).catch(err => console.log(err))
  }

  const getPlataformas = () => {
    api.get('plataforma').then(({ data }) => setPlataformas(data)).catch(err => console.log(err))
  }

  const postPublicacao = () => {
    setLoading(true)
    const objPost = {
      ...objPublicacao,
      Jogo: objPublicacao?.Jogo?.id,
      Plataformas: objPublicacao?.Plataformas?.map(p => p.id),
      imagem
    }
    console.log('objPost: ', objPost)
    api.post('publicacao', objPost)
      .then(res => {
        setAlertSettings({
          message: res.data.mensagem,
          type: 'success'
        })
        getPublicacoes()
        setShowModal(false)
        setObjPublicacao(undefined)
        setImagem(undefined)
      })
      .catch(err => setAlertSettings({
        message: err?.response?.data?.mensagem || 'Falha ao cadastrar publicação!',
        type: 'error'
      }))
      .finally(() => setLoading(false))
  }

  const putPublicacao = () => {
    setLoading(true)
    const objPut = {
      ...objPublicacao,
      Jogo: objPublicacao?.Jogo?.id,
      Plataformas: objPublicacao?.Plataformas?.map(p => p.id),
      imagem
    }
    console.log('objPut: ', objPut)
    api.put('publicacao', objPut)
      .then(res => {
        setAlertSettings({
          message: res.data.mensagem,
          type: 'success'
        })
        getPublicacoes()
        setShowModal(false)
      })
      .catch(err => setAlertSettings({
        message: err?.response?.data?.mensagem || 'Falha ao editar publicação!',
        type: 'error'
      }))
      .finally(() => setLoading(false))
  }

  const deletePublicacoes = async () => {
    setLoading(true)
    const objDelete = { publicacoes: selectedPublicacoes.map(j => j.id) }
    console.log('objDelete: ', objDelete)
    api.post('publicacao/delete', objDelete)
      .then(res => {
        setAlertSettings({
          message: res.data.mensagem,
          type: 'success'
        })
        getPublicacoes()
        setShowDialog(false)
        setSelectedPublicacoes([])
      })
      .catch(err => setAlertSettings({
        message: err?.response?.data?.mensagem || 'Falha ao deletar publicação!',
        type: 'error'
      }))
      .finally(() => setLoading(false))
  }

  return (
    <PageComponent title='Publicações' rightElement={
      <Stack direction={['column', 'row']} gap={3} justifyContent='center' alignItems='center'>
        <Button variant='contained' onClick={() => { setModalType('post'); setShowModal(true) }} startIcon={<Add />}>Cadastrar Publicação</Button>
        <Button variant='outlined' onClick={() => {
          setModalType('put')
          setShowModal(true)
          setObjPublicacao({ ...selectedPublicacoes[0] })
          setImagem(selectedPublicacoes[0].imagem)
        }} startIcon={<Edit />} disabled={selectedPublicacoes.length !== 1}>Editar Publicação</Button>
        <Button variant='contained' color='error' onClick={() => { setShowDialog(true) }} startIcon={<Delete />} disabled={!selectedPublicacoes.length}>Remover Publicação(s)</Button>
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
          !publicacoes?.length
            ? 'Nenhuma publicação encontrado'
            : `${totalItems} publicações encontradas`
        }
          {selectedPublicacoes.length ? `, ${selectedPublicacoes.length} publicações selecionadas` : ''}
      </Typography>
      {
        loadingGet
          ? <Stack alignItems='center'><CircularProgress size={70} sx={{ my: 5 }} /></Stack>
          : !!publicacoes?.length && (
            <>
                <TableContainer sx={{ boxShadow: 3, borderRadius: 3 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Checkbox
                            checked={selectedPublicacoes.length === publicacoes.length}
                            indeterminate={!!selectedPublicacoes.length && selectedPublicacoes.length < publicacoes.length}
                            onChange={() => {
                              if (selectedPublicacoes.length < publicacoes.length) {
                                setSelectedPublicacoes([...publicacoes])
                              } else {
                                setSelectedPublicacoes([])
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>
                          Imagem
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>
                          Código
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>
                          Título
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>
                          Jogo
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>
                          Data Criação
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }} align='center'>
                          Ações
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        publicacoes?.map(publicacao => (
                          <TableRow key={publicacao.id} hover>
                            <TableCell>
                              <Checkbox
                                checked={selectedPublicacoes?.some(j => j.id === publicacao.id)}
                                onChange={e => {
                                  if (e.target.checked) {
                                    setSelectedPublicacoes([...selectedPublicacoes, publicacao])
                                  } else {
                                    const tempArray = [...selectedPublicacoes]
                                    tempArray.splice(tempArray.findIndex(f => f.id === publicacao.id), 1)
                                    setSelectedPublicacoes([...tempArray])
                                  }
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <Box sx={{ width: '80px', height: '80px', margin: '-10px 0' }}>
                                <img src={publicacao.imagem} alt={`Imagem da publicação ${publicacao.titulo}`} style={{ width: '80px', height: '80px' }} />
                              </Box>
                            </TableCell>
                            <TableCell>
                              {publicacao.id}
                            </TableCell>
                            <TableCell>
                              {publicacao.titulo}
                            </TableCell>
                            <TableCell>
                              {publicacao.Jogo?.nome}
                            </TableCell>
                            <TableCell>
                              {publicacao.dataLancamento && moment(publicacao.dataLancamento).format('L')}
                            </TableCell>
                            <TableCell align='center'>
                              <IconButton onClick={() => { setObjPublicacao(publicacao); setImagem(publicacao.imagem); setModalType('view'); setShowModal(true) }}><Visibility color='primary' /></IconButton>
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
        <PageComponent title={modalType === 'post' ? 'Cadastrar Publicação' : modalType === 'put' ? 'Editar Publicação' : 'Visualizar Publicação'}
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
          <Stack justifyContent='center' alignItems='center' mb={3} pt={3}>
              {modalType !== 'view'
                ? <DropzoneComponent image={imagem} setImage={setImagem} required />
                : <img src={imagem} alt={`Imagem da publicação ${objPublicacao?.titulo}`}
                    style={{ width: '300px' }}
                  />}
          </Stack>
          <Stack direction={['column', 'row']} gap={[3, '5%']} mb={3}>
            <InputComponent label='Título' value={objPublicacao?.titulo} onChange={e => setObjPublicacao({ ...objPublicacao, titulo: e.target.value })} icon={<Title />} required disabled={modalType === 'view'} />
            <SelectComponent label='Tipo' value={objPublicacao?.tipo} onChange={e => setObjPublicacao({ ...objPublicacao, tipo: e.target.value })} icon={<InfoOutlined />} required disabled={modalType === 'view'}
            options={tiposPublicacao} />
          </Stack>
          <Stack direction={['column', 'row']} gap={[3, '5%']} mb={3}>
            <InputComponent label='Link' value={objPublicacao?.link} onChange={e => setObjPublicacao({ ...objPublicacao, link: e.target.value })} icon={<LinkIcon />} required disabled={modalType === 'view'} />
            <InputComponent label='Data' value={objPublicacao?.dataLancamento ? moment(objPublicacao?.dataLancamento).format('DD/MM/YYYY') : ''} icon={<CalendarToday />} required disabled={modalType === 'view'}
            onClick={(e) => {
              if (modalType !== 'view') { setAnchorEl(e.currentTarget) }
            }} />
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
                selected={objPublicacao?.dataLancamento}
                onSelect={e => {
                  setObjPublicacao({ ...objPublicacao, dataLancamento: e })
                  setAnchorEl(null)
                }}
                fromYear={2000}
                toYear={new Date().getFullYear()}
                captionLayout="dropdown"
              />
            </Popover>
          </Stack>
          <Stack direction={['column', 'row']} gap={[3, '5%']} mb={3}>
          <SelectComponent label='Jogo' value={objPublicacao?.Jogo?.id?.toString()} onChange={e => setObjPublicacao({ ...objPublicacao, Jogo: jogos.find(j => j.id === parseInt(e.target.value)) })} icon={<SportsEsports />} required disabled={modalType === 'view'}
            options={jogos.map(j => ({ value: j.id?.toString(), label: j.nome }))} />
            <FormControl sx={{ width: '100%' }}>
                <InputLabel id="demo-multiple-chip-label">Plataformas</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={objPublicacao?.Plataformas?.map(g => g.id) || []}
                  onChange={(e: SelectChangeEvent<IPlataforma[] | number[]>) => {
                    setObjPublicacao({
                      ...objPublicacao,
                      Plataformas: e.target.value
                        .map((plataformaId: IPlataforma | number) => {
                          if (typeof plataformaId === 'number') {
                            return plataformas.find(g => g.id === plataformaId)
                          } else {
                            return plataformaId
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
                      {selected?.map((generoId) => (
                        <Chip key={plataformas.find(g => g.id === generoId)?.id} label={plataformas.find(g => g.id === generoId)?.nome} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                  disabled={modalType === 'view'}
                >
                  {plataformas?.map((plataforma) => (
                    <MenuItem
                      key={plataforma.id}
                      value={plataforma.id}
                    >
                      {plataforma.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
          </Stack>
          <Stack direction={['column', 'row']} mb={3}>
            <TextAreaComponent label='Descrição' value={objPublicacao?.descricao} onChange={e => setObjPublicacao({ ...objPublicacao, descricao: e.target.value })} icon={<Description />} required disabled={modalType === 'view'} />
          </Stack>

          <Stack direction={['column', 'row']} gap={3} justifyContent='center' alignItems='center'>
            <Button variant='outlined' onClick={() => setShowModal(false)} startIcon={<CancelOutlined />}>{modalType !== 'view' ? 'Cancelar' : 'Voltar'}</Button>
            {modalType !== 'view' && <Button variant='contained' onClick={modalType === 'put' ? putPublicacao : postPublicacao} startIcon={loading ? <CircularProgress size='20px' color='inherit' /> : modalType === 'put' ? <Edit /> : <Add />}>{`${modalType === 'put' ? 'Editar' : 'Cadastrar'} Publicacao`}</Button>}
          </Stack>
        </PageComponent>
      </Modal>
      <DialogComponent
        open={showDialog}
        setOpen={setShowDialog}
        title="Remover itens"
        text="Tem certeza que deseja remover estes itens?"
        onConfirm={deletePublicacoes}
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
              selectedPublicacoes.map(publicacao => (
                <Typography key={publicacao.id} display='flex' alignItems='center'><ArrowRight /> {publicacao.titulo}</Typography>
              ))
            }
          </Stack>
        }
      />
    <AlertComponent message={alertSettings.message} type={alertSettings.type} showAlert={showAlert} setShowAlert={setShowAlert} />
    </PageComponent>
  )
}
