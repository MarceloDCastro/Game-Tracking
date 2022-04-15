
import { Typography, Grid, TextField, Button, Link, Stack } from '@mui/material';
import { Mail, MailOutline, Message, MessageOutlined, Phone, Send, Password} from '@mui/icons-material';
import LoginIcon from '@mui/icons-material/Login';
import Box from '@mui/material/Box';

import InputComponent from '../../components/InputComponent';
import PageComponent from '../../components/PageComponent'
  ;

function Login() {

  return (

    <PageComponent title="Logar">
      <Grid container columnSpacing={{ xs: '10%', lg: '5%' }} rowSpacing={3} pt={1}>
        <Grid item xs={12} sm={6} lg={4}>
          <InputComponent label='E-mail' icon={<Mail />} />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <InputComponent label='Senha' icon={<Password />} />
        </Grid>
      </Grid>
      <Stack direction='row' mt={4}>
        <Button variant='contained' startIcon={<LoginIcon />}>
          Login
        </Button>
      </Stack>
    </PageComponent>
  );
}



export default Login;
