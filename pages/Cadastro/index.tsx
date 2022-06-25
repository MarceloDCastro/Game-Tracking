
import { Button, Stack, Box, CircularProgress } from '@mui/material'

import { Mail, Phone, Password, Badge, PersonAddAlt } from '@mui/icons-material'

import InputComponent from '../../components/InputComponent'
import PageComponent from '../../components/PageComponent'
import { api } from '../../services/apiClient'
import { useContext, useEffect, useState } from 'react'
import AlertComponent from '../../components/AlertComponent'
import { AuthContext } from '../../context/AuthContext'
import { useRouter } from 'next/router'
import PhoneMask from '../../helpers/PhoneMask'
import GetOnlyNumbers from '../../helpers/getOnlyNumbers'

function Cadastro () {
  const { userInfo } = useContext(AuthContext)
  const router = useRouter()

  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmSenha, setConfirmSenha] = useState('')

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
    if (userInfo) router.push('/')
  }, [userInfo])

  useEffect(() => {
    if (alertSettings.message !== '') setShowAlert(true)
  }, [alertSettings])

  const signUp = async () => {
    setLoading(true)
    if (senha !== confirmSenha) {
      setAlertSettings({
        message: 'Senhas diferentes!',
        type: 'error'
      })
      return setLoading(false)
    }
    const objCadastro = {
      nome,
      email,
      telefone: GetOnlyNumbers(telefone),
      senha,
      tipo: 3
    }
    api.post('usuario/cadastro', objCadastro)
      .then(res => setAlertSettings({
        message: res.data?.mensagem,
        type: 'success'
      }))
      .catch(err => setAlertSettings({
        message: err.response?.data?.mensagem || 'Falha na autenticação!',
        type: 'error'
      }))
      .finally(() => setLoading(false))
  }

  return (
    <Box width='100%' display='flex' justifyContent='center'>
      <PageComponent title="Cadastro" sx={{ width: '30%', minWidth: '360px' }}>
        <Stack direction='column' spacing={3}>
          <InputComponent label='Nome' value={nome} onChange={(e) => setNome(e.target.value)} icon={<Badge />} />
          <InputComponent label='Telefone' value={telefone} onChange={(e) => setTelefone(PhoneMask(e.target.value))} icon={<Phone />} />
          <InputComponent label='E-mail' value={email} onChange={(e) => setEmail(e.target.value)} icon={<Mail />} />
          <InputComponent label='Senha' value={senha} onChange={(e) => setSenha(e.target.value)} icon={<Password />} type='password' />
          <InputComponent label='Confirmar senha' value={confirmSenha} onChange={(e) => setConfirmSenha(e.target.value)} icon={<Password />} error={senha !== confirmSenha} type='password' />
          <Button variant='contained' startIcon={loading ? <CircularProgress size='20px' color='inherit' /> : <PersonAddAlt />} onClick={signUp}>
            Cadastrar
          </Button>
        </Stack>
      </PageComponent>
      <AlertComponent message={alertSettings.message} type={alertSettings.type} showAlert={showAlert} setShowAlert={setShowAlert} />
    </Box>
  )
}

export default Cadastro
