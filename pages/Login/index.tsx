
import { Button, CircularProgress, Stack } from '@mui/material'
import { Mail, Password, Login as LoginIcon } from '@mui/icons-material'

import InputComponent from '../../components/InputComponent'
import PageComponent from '../../components/PageComponent'
import { Box } from '@mui/system'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'

function Login () {
  const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  return (
    <Box width='100%' display='flex' justifyContent='center'>
    <PageComponent title="Logar" sx={{ width: '30%', minWidth: '360px' }}>
      <Stack direction='column' spacing={3}>
          <InputComponent label='E-mail' value={email} onChange={(e) => setEmail(e.target.value)} icon={<Mail />} />
          <InputComponent label='Senha' value={password} onChange={(e) => setPassword(e.target.value)} icon={<Password />} type='password' />
        <Button variant='contained' startIcon={loading ? <CircularProgress size='20px' color='inherit' /> : <LoginIcon />} onClick={() => signIn({ email, password, setLoading })}>
          Login
        </Button>
      </Stack>
    </PageComponent>
    </Box>
  )
}

export default Login
