import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import DeleteIcon from '@material-ui/icons/Delete';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import * as Actions from '../store/actions';
import { generateSentence } from '../utils/functions';

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
  const [localSentence, setLocalSentence] = useState('');

  const newSentence = () => {
    let generatedSentece = generateSentence();

    while (generatedSentece === localSentence || generatedSentece.length >= 15) {
      generatedSentece = generateSentence();
    }

    setLocalSentence(generatedSentece);
  };

  const startDemo = () => {
    // TODO: implement validation for blank sentence
    return dispatch(Actions.startDemo(localSentence));
  };

  const resetDemo = () => {
    setLocalSentence('');
    return dispatch(Actions.resetDemo());
  };

  return (
    <Grid container className={classes.wrapper}>
      <Grid item xs={8}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="generate-new-sentence">Sentença</InputLabel>
          <OutlinedInput
            id="generate-new-sentence"
            type="text"
            value={localSentence}
            onChange={(e) => setLocalSentence(e.target.value)}
            labelWidth={70}
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="generate new sentence" onClick={newSentence} edge="end">
                  <AutorenewIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
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
          onClick={startDemo}
        >
          Iniciar
        </Button>
      </Grid>
    </Grid>
  );
}

export default SentencesInput;
