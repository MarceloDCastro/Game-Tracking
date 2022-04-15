
import { Grid, Button, Stack } from '@mui/material'

import { Mail, Phone, Password, Badge, PersonAddAlt } from '@mui/icons-material'

import InputComponent from '../../components/InputComponent'
import PageComponent from '../../components/PageComponent'

function Cadastro () {
  return (

    <PageComponent title="Cadastro">
      <Grid container columnSpacing={{ xs: '10%', lg: '5%' }} rowSpacing={3} pt={1}>
        <Grid item xs={12} sm={6} lg={4}>
          <InputComponent label='Nome' icon={<Badge />} />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <InputComponent label='Telefone' icon={<Phone />} />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <InputComponent label='E-mail' icon={<Mail />} />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <InputComponent label='Senha' icon={<Password />} />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <InputComponent label='Confirmar senha' icon={<Password />} />
        </Grid>
      </Grid>
      <Stack direction='row' mt={4}>
        <Button variant='contained' startIcon={<PersonAddAlt />}>
          Cadastrar
        </Button>
      </Stack>
    </PageComponent>

  )
}

export default Cadastro
