
import { Typography, Grid } from '@mui/material'

import PageComponent from '../../components/PageComponent'

function Sobre () {
  return (
    <PageComponent title="Sobre Nós">

      <Grid className="form-sobre" container spacing={2} mt={2}>
        <Grid md={12} xs={12} item >
            <Typography variant="body1" className="p-sobre" align="left" pb={3} >
              Um grupo formado por 3 alunos da Fatec Rubens Lara teve uma ideia para um projeto... Que era desenvolver um site intuitivo de fácil navegação que auxilie pessoas na busca por jogos gratuitos ou em promoção e lançamentos, provendo informações sobre eles.
            </Typography>
            <Typography variant="body1" className="p-sobre" align="left" pb={3} >
            Devido a ausência de sites que fossem focados apenas nesta divulgação. Os grandes portais de notícias de tecnologia e jogos divulgam apenas  títulos de desenvolvedoras de grande porte
            </Typography>
            <Typography variant="body1" className="p-sobre" align="left" pb={3} >
            Uma ferramenta já existente com propósito similar proposto pelo projeto é o GX Corner, que é um recurso presente no navegador Opera GX, porém o mesmo é pouco conhecido.
            </Typography>
            <Typography variant="body1" className="p-sobre" align="left" pb={3} >
            Então o GameTracking foi criado.
            </Typography>
            <Typography variant="body1" className="p-sobre" align="left" pb={3} >
            A equipe GameTracking é formada por: Breno Lins, Marcelo de Castro e Gabriel de Almeida
            </Typography>
        </Grid>
      </Grid>
    </PageComponent>

  )
}

export default Sobre
