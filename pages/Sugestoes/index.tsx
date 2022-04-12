

import { Typography, Grid, TextField, Button, Link, TextareaAutosize } from '@mui/material';

import Box from '@mui/material/Box';

import PageComponent from '../../components/PageComponent';


function Sugestao() {



  return (



    
      <PageComponent title="Sugestões">
      <Grid className="form-container" container spacing={2}>

        <Grid md={6} xs={12} item >

          <Typography variant="body1" align="left" pb={1} >Nome:</Typography>

          <Grid md={12} item >
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



        <Grid md={6} xs={12} item >

          <Typography variant="body1" align="left" pb={1} >Email:</Typography>

          <Grid md={12} item >
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



        <Grid md={6} xs={12} item >

          <Typography variant="body1" align="left" pb={1} >Telefone (opcional):</Typography>

          <Grid md={12} item >
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

          <Grid md={12} item mt={7}  >
            <div className="enviar" >
              <Button style={{ background: "#97A8FF", color: "#000" }} variant="contained">Enviar</Button>
            </div>
          </Grid>

        </Grid>


        <Grid md={6} xs={12} item >

          <Typography variant="body1" align="left" pb={1} >Mensagem:</Typography>

          <Grid md={12} item >
            <Box sx={{ boxShadow: 2 }}>
              <TextField
                InputProps={{
                  disableUnderline: true,
                }}
                className="entrada"
                fullWidth={true}
                size="small"
                variant="standard"
                multiline
                rows={5}
              />
            </Box>
          </Grid>

        </Grid>



      </Grid>
      </PageComponent>

  );
}

export default Sugestao;
