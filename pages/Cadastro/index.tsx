
import { Button, Stack, Box } from '@mui/material'

import { Mail, Phone, Password, Badge, PersonAddAlt } from '@mui/icons-material'

import InputComponent from '../../components/InputComponent'
import PageComponent from '../../components/PageComponent'

function Cadastro () {
  return (
    <Box width='100%' display='flex' justifyContent='center'>
      <PageComponent title="Cadastro" sx={{ width: '30%', minWidth: '360px' }}>
        <Stack direction='column' spacing={3}>
          <InputComponent label='Nome' icon={<Badge />} />
          <InputComponent label='Telefone' icon={<Phone />} />
          <InputComponent label='E-mail' icon={<Mail />} />
          <InputComponent label='Senha' icon={<Password />} />
          <InputComponent label='Confirmar senha' icon={<Password />} />
          <Button variant='contained' startIcon={<PersonAddAlt />}>
            Cadastrar
          </Button>
        </Stack>
      </PageComponent>
    </Box>
  )
}

export default Cadastro
