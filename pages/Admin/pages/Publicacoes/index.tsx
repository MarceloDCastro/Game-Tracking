import { Description, Title, Link as LinkIcon, CalendarToday, Info, InfoOutlined, Add, ArrowBack } from '@mui/icons-material'
import { Button, CircularProgress, Modal, Popover, Stack, Box, Typography, Table } from '@mui/material'
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

export default function Publicacoes () {
  const [loading, setLoading] = useState(false)
  const [loadingGet, setLoadingGet] = useState(false)

  const [publicacoes, setPublicacoes] = useState([])

  // Campos formulário
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [dataLancamento, setDataLancamento] = useState<Date>()
  const [tipo, setTipo] = useState('')
  const [link, setLink] = useState('')
  const [imagem, setImagem] = useState<string>()

  useEffect(() => console.log('img: ', imagem), [imagem])

  // DatePicker
  const [anchorEl, setAnchorEl] = useState<Element |((element: Element) => Element) | null | undefined>(null)
  const openDateModal = Boolean(anchorEl)

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

  useEffect(() => getPublicacoes(), [])

  useEffect(() => console.log('imagem: ', imagem), [imagem])

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

  const getPublicacoes = () => {
    setLoadingGet(true)
    api.get('publicacao')
      .then(res => setPublicacoes(res.data))
      .catch(err => setAlertSettings({
        message: err?.response?.data?.mensagem || 'Falha ao buscar publicações!',
        type: 'error'
      }))
      .finally(() => setLoadingGet(false))
  }

  const postPublicacao = () => {
    const objPost = {
      titulo,
      descricao,
      dataLancamento,
      tipo,
      link,
      imagem: imagem
    }
    console.log('objPost: ', objPost)
    api.post('publicacao', objPost)
      .then(res => console.log('Deu certo: ', res)
      // setAlertSettings({
      //   message: res.data.mensagem,
      //   type: 'success'
      // })
      )
      .catch(err => setAlertSettings({
        message: err?.response?.data?.mensagem || 'Falha ao cadastrar publicação!',
        type: 'error'
      }))
      .finally(() => setLoading(false))
  }

  return (
    <PageComponent title='Publicações' rightElement={
      <Stack direction={['column', 'row']} gap={3} justifyContent='center' alignItems='center'>
        <Button variant='contained' onClick={() => { setModalType('post'); setShowModal(true) }} startIcon={loading ? <CircularProgress size='20px' color='inherit' /> : <Add />}>Cadastrar Publicação</Button>
      </Stack>
    }>
      {
        loadingGet
          ? <Stack alignItems='center'><CircularProgress size={70} sx={{ my: 5 }} /></Stack>
          : !publicacoes.length
              ? <Typography>Não foi possível encontrar publicações</Typography>
              : <Table>

              </Table>
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
        <PageComponent title='Cadastrar Publicação'
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
              <DropzoneComponent label="Imagem da Publicação:" image={imagem} setImage={setImagem} required />
          </Stack>
          <Stack direction={['column', 'row']} gap={[3, '5%']} mb={3}>
            <InputComponent label='Título' value={titulo} onChange={e => setTitulo(e.target.value)} icon={<Title />} required />
            <SelectComponent label='Tipo' value={tipo} onChange={e => setTipo(e.target.value)} icon={<InfoOutlined />} required
            options={tiposPublicacao} />
          </Stack>
          <Stack direction={['column', 'row']} gap={[3, '5%']} mb={3}>
            <InputComponent label='Link' value={link} onChange={e => setLink(e.target.value)} icon={<LinkIcon />} required />
            <InputComponent label='Data' value={dataLancamento ? moment(dataLancamento).format('DD/MM/YYYY') : ''} icon={<CalendarToday />} required
            onClick={(e) => setAnchorEl(e.currentTarget)} />
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
                selected={dataLancamento}
                onSelect={e => {
                  setDataLancamento(e)
                  setAnchorEl(null)
                }}
                fromYear={2000}
                toYear={new Date().getFullYear()}
                captionLayout="dropdown"
              />
            </Popover>
          </Stack>
          <Stack direction={['column', 'row']} mb={3}>
            <TextAreaComponent label='Descrição' value={descricao} onChange={e => setDescricao(e.target.value)} icon={<Description />} required />
          </Stack>

          <Stack direction={['column', 'row']} gap={3} justifyContent='center' alignItems='center'>
            <Button variant='outlined' onClick={() => setShowModal(false)} startIcon={<ArrowBack />}>Voltar</Button>
            <Button variant='contained' onClick={postPublicacao} startIcon={loading ? <CircularProgress size='20px' color='inherit' /> : <Add />}>Cadastrar Publicação</Button>
          </Stack>
        </PageComponent>
      </Modal>
    <AlertComponent message={alertSettings.message} type={alertSettings.type} showAlert={showAlert} setShowAlert={setShowAlert} />
    </PageComponent>
  )
}
