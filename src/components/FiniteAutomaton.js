import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { finiteAutomaton, ACTION_ERROR, ACTION_ACCEPT } from '../utils/constants';
import { recognizeSentence } from '../utils/functions';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#7986CB',
    color: theme.palette.common.white,
    fontSize: 15,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(2, 0),
  },
  empty: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(10),
  },
  accept: {
    color: theme.palette.primary.dark,
    fontWeight: '600',
  },
  error: {
    color: theme.palette.secondary.dark,
    fontWeight: '600',
  },
}));

const FiniteAutomaton = () => {
  const classes = useStyles();
  const { sentence, showFiniteAutomaton, stepByStep } = useSelector((state) => state);
  const { header } = finiteAutomaton;
  const [body, setBody] = useState([]);
  const [stack, setStack] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const aligns = ['left', 'right', 'center'];

  const formatMessage = useCallback(
    (message) => {
      let component = null;
      if (message.indexOf(ACTION_ACCEPT) >= 0) {
        component = <span className={classes.accept}>{message}</span>;
      } else if (message.indexOf(ACTION_ERROR) >= 0) {
        component = <span className={classes.error}>{message}</span>;
      } else {
        component = <span>{message.replace('$', ' $ ')}</span>;
      }

      return component;
    },
    [classes.error, classes.accept]
  );

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    if (showFiniteAutomaton) {
      const tabularTopDownPredictiveStack = recognizeSentence(sentence);

      if (stepByStep) {
        setStack(tabularTopDownPredictiveStack);
      } else {
        setBody(tabularTopDownPredictiveStack);
      }
    }
  }, [showFiniteAutomaton, sentence, stepByStep]);

  useEffect(() => {
    const stackVisiblePart = stack.slice(0, activeStep + 1);
    setBody(stackVisiblePart);
  }, [stack, activeStep]);

  return showFiniteAutomaton ? (
    <>
      <Typography variant="subtitle1" color="textSecondary" align="left" className={classes.title}>
        Pilha Preditiva Top-Down Tabular
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="customized table">
          <TableHead>
            <TableRow>
              {header.map(({ key, value }, index) => (
                <StyledTableCell key={key} align={aligns[index]}>
                  {value}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {body.map(({ key, values }) => (
              <TableRow key={key}>
                {values.map((column, columnIndex) => (
                  <TableCell key={`${column}-${String(columnIndex)}`} align={aligns[columnIndex]}>
                    {formatMessage(column)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {stepByStep && (
        <MobileStepper
          variant="text"
          steps={stack.length}
          position="static"
          activeStep={activeStep}
          className={classes.root}
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              <KeyboardArrowLeft /> Anterior
            </Button>
          }
          nextButton={
            <Button size="small" onClick={handleNext} disabled={activeStep === stack.length - 1}>
              Próximo <KeyboardArrowRight />
            </Button>
          }
        />
      )}
    </>
  ) : (
    <Typography variant="body1" color="textSecondary" align="center" className={classes.empty}>
      A pilha aparecerá aqui assim que você informar ou gerar uma sentença <InsertEmoticonIcon />
    </Typography>
  );
};

export default FiniteAutomaton;
