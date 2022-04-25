
import { Mail, Message, Phone, Send } from '@mui/icons-material'
import { Grid, Button, Stack } from '@mui/material'
import { useContext } from 'react'
import InputComponent from '../../components/InputComponent'

import PageComponent from '../../components/PageComponent'
import TextAreaComponent from '../../components/TextAreaComponent'
import { AuthContext } from '../../context/AuthContext'

function Sugestao () {
  const { userInfo } = useContext(AuthContext)

  return (
    <Stack alignItems='center'>
      <PageComponent title="Sugestões" sx={{ width: '60%', minWidth: '320px' }}>
          <Grid container columnSpacing={{ xs: '7%', lg: '5%' }} rowSpacing={3} pt={1}>
            <Grid item xs={12} sm={12} lg={4}>
              <InputComponent label='E-mail' value={userInfo?.email || 'É necessário estar autenticado!'} error={!userInfo} icon={<Mail />} />
            </Grid>
            <Grid item xs={12} sm={12} lg={4}>
              <InputComponent label='Assunto' icon={<Mail />} />
            </Grid>
            <Grid item xs={12}>
              <TextAreaComponent label='Mensagem' icon={<Message />} />
            </Grid>
          </Grid>
          <Stack direction='row' justifyContent='center' mt={4}>
            <Button variant='contained' startIcon={<Send />} disabled={!userInfo}>
              Enviar
            </Button>
          </Stack>
      </PageComponent>
    </Stack>
  )
}

export default Sugestao
