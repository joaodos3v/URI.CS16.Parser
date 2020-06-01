import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  about: {
    minWidth: 300,
    maxWidth: 300,
    padding: theme.spacing(1),
    alignContent: 'center',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    padding: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
}));

function About() {
  const classes = useStyles();

  return (
    <Grid container className={classes.about}>
      <Grid item className={classes.section} xs={12}>
        <Typography variant="h6">O OBJETIVO</Typography>
        <Typography variant="subtitle1" color="textSecondary" align="left">
          O objetivo deste trabalho é pôr em prática parte dos conhecimentos adquiridos na
          disciplina de Compiladores, através da implementação de um Analisador Sintático Top-Down
          Preditivo Tabular.
        </Typography>
        <Divider className={classes.divider} />
      </Grid>
      <Grid item className={classes.section} xs={12}>
        <Typography variant="h6">SUA FUNÇÃO</Typography>
        <Typography variant="subtitle1" color="textSecondary" align="left">
          A função de um analisador sintático é o reconhecimento de erros sintáticos, que são
          construções do programa fonte que não estão de acordo com as regras de formação de
          estruturas sintáticas como especificado pela gramática.
        </Typography>
        <Divider className={classes.divider} />
      </Grid>
      <Grid item className={classes.section} xs={12}>
        <Typography variant="h6">A FERRAMENTA</Typography>
        <Typography variant="subtitle1" color="textSecondary" align="left">
          Para utilizar a aplicação, você pode informar a sentença livremente ou, se preferir, gerar
          uma através da própria ferramenta. Uma tabela será exibida na parte direita da tela,
          informando se a sentença foi aceita ou não.
        </Typography>
      </Grid>
    </Grid>
  );
}

export default About;
