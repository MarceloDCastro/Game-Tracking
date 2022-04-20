
import { Button, Stack, Box } from '@mui/material'

import { Mail, Phone, Password, Badge, PersonAddAlt } from '@mui/icons-material'

import InputComponent from '../../components/InputComponent'
import PageComponent from '../../components/PageComponent'
import { api } from '../../services/api'
import { useEffect, useState } from 'react'
import AlertComponent from '../../components/AlertComponent'

function Cadastro () {
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmSenha, setConfirmSenha] = useState('')

  const [showAlert, setShowAlert] = useState(false)
  const [alertSettings, setAlertSettings] = useState<{
    message: string,
    type: 'success'|'error'|'warning'|'info'
  }>({
    message: '',
    type: 'success'
  })

  useEffect(() => {
    if (alertSettings.message !== '') setShowAlert(true)
  }, [alertSettings])

  const signUp = async () => {
    if (senha !== confirmSenha) {
      return setAlertSettings({
        message: 'Senhas diferentes!',
        type: 'error'
      })
    }
    const objCadastro = {
      nome,
      email,
      telefone,
      senha,
      tipo: 3
    }
    api.post('usuario/cadastro', objCadastro)
      .then(res => setAlertSettings({
        message: res.data.mensagem,
        type: 'success'
      }))
      .catch(err => setAlertSettings({
        message: err.response.data.mensagem,
        type: 'error'
      }))
  }

  return (
    <Box width='100%' display='flex' justifyContent='center'>
      <PageComponent title="Cadastro" sx={{ width: '30%', minWidth: '360px' }}>
        <Stack direction='column' spacing={3}>
          <InputComponent label='Nome' value={nome} onChange={(e) => setNome(e.target.value)} icon={<Badge />} />
          <InputComponent label='Telefone' value={telefone} onChange={(e) => setTelefone(e.target.value)} icon={<Phone />} />
          <InputComponent label='E-mail' value={email} onChange={(e) => setEmail(e.target.value)} icon={<Mail />} />
          <InputComponent label='Senha' value={senha} onChange={(e) => setSenha(e.target.value)} icon={<Password />} />
          <InputComponent label='Confirmar senha' value={confirmSenha} onChange={(e) => setConfirmSenha(e.target.value)} icon={<Password />} error={senha !== confirmSenha} />
          <Button variant='contained' startIcon={<PersonAddAlt />} onClick={signUp}>
            Cadastrar
          </Button>
        </Stack>
      </PageComponent>
      <AlertComponent message={alertSettings.message} type={alertSettings.type} showAlert={showAlert} setShowAlert={setShowAlert} />
    </Box>
  )
}

export default Cadastro
