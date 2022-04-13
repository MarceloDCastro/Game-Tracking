

import { Mail, MailOutline, Message, MessageOutlined, Phone, Send } from '@mui/icons-material';
import { Typography, Grid, TextField, Button, Link, TextareaAutosize, Stack, Box } from '@mui/material';
import InputComponent from '../../components/InputComponent';

import PageComponent from '../../components/PageComponent';
import TextAreaComponent from '../../components/TextAreaComponent';


function Sugestao() {

  return (
      <PageComponent title="Sugestões">
          <Grid container columnSpacing={{ xs: '10%', lg: '5%'}} rowSpacing={3} pt={1}>
            <Grid item xs={12} sm={6} lg={4}>
              <InputComponent label='E-mail' icon={<Mail />} />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <InputComponent label='Telefone' icon={<Phone />} />
            </Grid>
            <Grid item xs={12} sm={12} lg={4}>
              <InputComponent label='Assunto' icon={<Mail />} />
            </Grid>
            <Grid item xs={12}>
              <TextAreaComponent label='Mensagem' icon={<Message />} />
            </Grid>
          </Grid>
          <Stack direction='row' justifyContent='center' mt={4}>
            <Button variant='contained' startIcon={<Send />}>
              Enviar
            </Button>
          </Stack>
      </PageComponent>
  );
}

export default Sugestao;
