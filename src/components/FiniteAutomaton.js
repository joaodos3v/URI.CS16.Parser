import React, { useState, useEffect } from 'react';
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
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { parsingTable, finiteAutomaton } from '../utils/constants';

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
  emptyWarning: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(10),
  },
}));

const FiniteAutomaton = () => {
  const classes = useStyles();
  const { header, body } = parsingTable;
  const { header: localHeader } = finiteAutomaton;
  const sentence = useSelector((state) => state.sentence);
  const showFiniteAutomaton = useSelector((state) => state.showFiniteAutomaton);
  const [localBody, setLocalBody] = useState([]);

  const getAlign = (index) => {
    switch (index) {
      case 0:
        return 'left';

      case 1:
        return 'right';

      default:
        return 'center';
    }
  };

  const getLeftmostDigit = (input) => input[0];

  const getStackTop = (stack) => stack[stack.length - 1];

  const getAction = (stackTop, leftmostDigit) => {
    const columnIndex = header.findIndex((column) => column.value === leftmostDigit);
    const rowIndex = body.findIndex((row) => row.key === stackTop);

    return body[rowIndex].values[columnIndex] || null;
  };

  const updateStack = (currentStack, action) => {
    const stackTop = getStackTop(currentStack);
    let newStackTop = '';

    if (action !== 'Read' && !action.includes('ε')) {
      const cutoff = action.indexOf('→') + 1;
      const newPiece = action.substr(cutoff);
      newStackTop = newPiece.split('').reverse().join('');
    }

    // Ps: can't use replace because it will remove the first occurrence!
    return currentStack.substr(0, currentStack.lastIndexOf(stackTop)) + newStackTop;
  };

  const addLine = (currentStack, currentSentence, currentAction, currentIteration, newBody) => {
    const currentBody = [
      ...newBody,
      {
        key: currentIteration,
        values: [currentStack, currentSentence, currentAction],
      },
    ];

    console.log(`Iteração ${currentIteration} =>`, currentBody);
    return currentBody;
  };

  useEffect(() => {
    if (showFiniteAutomaton) {
      let stack = '$S';
      let localSentence = `${sentence}$`;
      let iterations = 0;
      let newBody = [];

      let cont = 0;
      while (localSentence.length > 0) {
        iterations += 1;
        const stackTop = getStackTop(stack); // S
        const leftmostDigit = getLeftmostDigit(localSentence); // a
        let action = null;

        if (stackTop === leftmostDigit) {
          if (stackTop === '$') {
            newBody = addLine(
              stack,
              localSentence,
              `OK em ${iterations} iterações`,
              iterations,
              newBody
            );
            setLocalBody(newBody);
            break;
          } else {
            newBody = addLine(stack, localSentence, `Ler ${leftmostDigit}`, iterations, newBody);
            stack = updateStack(stack, 'Read');
            localSentence = localSentence.substr(1);
          }
        } else {
          action = getAction(stackTop, leftmostDigit); // S→aAd
          if (action) {
            newBody = addLine(stack, localSentence, action, iterations, newBody);

            stack = updateStack(stack, action);
          } else {
            addLine(stack, localSentence, `ERRO em ${iterations} iterações`, newBody);
          }
        }

        cont += 1;
        if (cont >= 20) break;
      }
    }
  }, [showFiniteAutomaton, sentence]);

  return showFiniteAutomaton ? (
    <>
      <Typography variant="subtitle1" color="textSecondary" align="left" className={classes.title}>
        Pilha Preditiva Top-Down Tabular
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="customized table">
          <TableHead>
            <TableRow>
              {localHeader.map(({ key, value }, index) => (
                <StyledTableCell key={key} align={index === 0 ? 'left' : 'right'}>
                  {value}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {localBody.map(({ key, values }) => (
              <TableRow key={key}>
                {values.map((column, columnIndex) => (
                  <TableCell
                    key={`${column}-${String(columnIndex)}`}
                    align={columnIndex === 0 ? 'left' : 'right'}
                    component="th"
                    scope="row"
                  >
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  ) : (
    <Typography
      variant="body1"
      color="textSecondary"
      align="center"
      className={classes.emptyWarning}
    >
      A pilha aparecerá aqui assim que você informar ou gerar uma sentença <InsertEmoticonIcon />
    </Typography>
  );
};

export default FiniteAutomaton;
