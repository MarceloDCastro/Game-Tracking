import { Description, Title, Link as LinkIcon, CalendarToday, Info, InfoOutlined, Add } from '@mui/icons-material'
import { Button, CircularProgress, Popover, Stack, TextField } from '@mui/material'
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

export default function Publicacoes () {
  const [loading, setLoading] = useState(false)

  // Campos formulário
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [dataLancamento, setDataLancamento] = useState<Date>()
  const [tipo, setTipo] = useState('')
  const [link, setLink] = useState('')

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

  useEffect(() => {
    if (alertSettings.message !== '') { setShowAlert(true) }
  }, [alertSettings])

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

  const postPublicacao = () => {
    const objPost = {
      titulo,
      descricao,
      dataLancamento,
      tipo,
      link
    }
    console.log('objPost: ', objPost)
    api.post('publicacao', objPost)
      .then(res => setAlertSettings({
        message: res.data.mensagem,
        type: 'success'
      }))
      .catch(err => setAlertSettings({
        message: err?.response?.data?.mensagem || 'Falha ao enviar sugestão!',
        type: 'error'
      }))
      .finally(() => setLoading(false))
  }

  return (
    <PageComponent title='Publicações'>
      <Stack direction={['column', 'row']} gap={[3, '5%']} pt={1} mb={3}>
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
        <InputComponent label='Link' value={link} onChange={e => setLink(e.target.value)} icon={<LinkIcon />} required />

      <Stack direction={['column', 'row']} gap={3} justifyContent='center' alignItems='center'>
      <Link href='/Admin'>
        <Button variant='outlined'>Voltar ao DashBoard</Button>
      </Link>
        <Button variant='contained' onClick={postPublicacao} startIcon={loading ? <CircularProgress size='20px' color='inherit' /> : <Add />}>Cadastrar</Button>
      </Stack>
    <AlertComponent message={alertSettings.message} type={alertSettings.type} showAlert={showAlert} setShowAlert={setShowAlert} />
    </PageComponent>
  )
}
