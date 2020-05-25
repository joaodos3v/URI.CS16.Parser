import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import DeleteIcon from '@material-ui/icons/Delete';
import * as Actions from '../store/actions';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function SentencesInput() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [localSentence, setLocalSentence] = useState('aabd');

  const startDemo = (sentence) => {
    return dispatch(Actions.startDemo(sentence));
  };

  const resetDemo = () => {
    setLocalSentence('');
    return dispatch(Actions.resetDemo());
  };

  return (
    <Grid container className={classes.wrapper}>
      <Grid item xs={8}>
        <TextField
          id="outlined-basic"
          label="Sentença"
          size="small"
          variant="outlined"
          fullWidth
          value={localSentence}
          onChange={(e) => setLocalSentence(e.target.value)}
        />
      </Grid>
      <Grid item xs={4}>
        <Button
          variant="contained"
          color="secondary"
          endIcon={<DeleteIcon />}
          className={classes.button}
          onClick={resetDemo}
        >
          Reset
        </Button>
        <Button
          variant="contained"
          size="medium"
          color="primary"
          endIcon={<PlayArrowIcon />}
          className={classes.button}
          onClick={() => startDemo(localSentence)}
        >
          Iniciar
        </Button>
      </Grid>
    </Grid>
  );
}

export default SentencesInput;
