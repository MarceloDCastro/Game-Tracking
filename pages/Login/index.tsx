
import '../App.css';

import { Typography, Grid, TextField, Button, Link } from '@mui/material';

import Box from '@mui/material/Box';

function Login() {

 

  return (


    <div className="App">

      <Typography variant="h4" align="left" ml={1} mt={5} >
        Logar
      </Typography>



      <Grid className="form-container" container spacing={2}>

        <Grid md={12} xs={12} item >

          <Typography variant="body1" align="left" pb={1} >Email:</Typography>

          <Grid md={6} item >
            <Box sx={{ boxShadow: 2 }}>
              <TextField
                InputProps={{
                  disableUnderline: true,
                }}
                className="entrada"
                fullWidth={true}
                size="small"
                variant="standard"
              />
            </Box>
          </Grid>

        </Grid>

        <Grid md={12} xs={12} item >

          <Typography variant="body1" align="left" pb={1} >Senha:</Typography>

          <Grid md={6} item >
            <Box sx={{ boxShadow: 2 }}>
              <TextField
                InputProps={{
                  disableUnderline: true,
                }}
                className="entrada"
                fullWidth={true}
                size="small"
                variant="standard"
              />
            </Box>
          </Grid>

        </Grid>

        <Grid md={12} item >
          <div className="enviar" >
            <Button variant="contained">Login</Button>
            <Link ml={2} href="#" variant="body1">
              {'Não possuí uma conta ? Cadastrar-se'}
            </Link>
          </div>
        </Grid>

      </Grid>

    </div>

  );
}



export default Login;
