
import { Button, Stack } from '@mui/material'
import { Mail, Password, Login as LoginIcon } from '@mui/icons-material'

import InputComponent from '../../components/InputComponent'
import PageComponent from '../../components/PageComponent'
import { Box } from '@mui/system'

function Login () {
  return (
    <Box width='100%' display='flex' justifyContent='center'>
    <PageComponent title="Logar" sx={{ width: '30%', minWidth: '360px' }}>
      <Stack direction='column' spacing={3}>
          <InputComponent label='E-mail' icon={<Mail />} />
          <InputComponent label='Senha' icon={<Password />} />
        <Button variant='contained' startIcon={<LoginIcon />}>
          Login
        </Button>
      </Stack>
    </PageComponent>
    </Box>
  )
}

export default Login
