
import { Mail, Message, Phone, Send } from '@mui/icons-material'
import { Grid, Button, Stack, CircularProgress } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import AlertComponent from '../../components/AlertComponent'
import InputComponent from '../../components/InputComponent'

import PageComponent from '../../components/PageComponent'
import TextAreaComponent from '../../components/TextAreaComponent'
import { AuthContext } from '../../context/AuthContext'
import { api } from '../../services/api'

function Sugestao () {
  const { userInfo } = useContext(AuthContext)

  const [assunto, setAssunto] = useState('')
  const [mensagem, setMensagem] = useState('')

  const [loading, setLoading] = useState(false)

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

  const postSugestao = async () => {
    setLoading(true)
    api.post('sugestao', { assunto, mensagem })
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
    <Stack alignItems='center'>
      <PageComponent title="Sugestões" sx={{ width: '60%', minWidth: '320px' }}>
          <Grid container columnSpacing={{ xs: '7%', lg: '5%' }} rowSpacing={3} pt={1}>
            <Grid item xs={12} sm={12} md={6}>
              <InputComponent label='E-mail' value={userInfo?.email || 'É necessário estar autenticado!'} error={!userInfo} icon={<Mail />} />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <InputComponent label='Assunto' icon={<Mail />} value={assunto} onChange={e => setAssunto(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextAreaComponent label='Mensagem' icon={<Message />} value={mensagem} onChange={e => setMensagem(e.target.value)} />
            </Grid>
          </Grid>
          <Stack direction='row' justifyContent='center' mt={4}>
            <Button variant='contained' startIcon={loading ? <CircularProgress size='20px' color='inherit' /> : <Send />} disabled={!userInfo} onClick={postSugestao}>
              Enviar
            </Button>
          </Stack>
      </PageComponent>
    <AlertComponent message={alertSettings.message} type={alertSettings.type} showAlert={showAlert} setShowAlert={setShowAlert} />
    </Stack>
  )
}

export default Sugestao
