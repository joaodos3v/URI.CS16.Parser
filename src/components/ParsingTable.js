import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { parsingTable } from '../utils/constants';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#7986CB',
    color: theme.palette.common.white,
    fontSize: 16,
  },
  body: {
    fontSize: 15,
  },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
  firstRow: {
    backgroundColor: '#7986CB',
    color: theme.palette.common.white,
  },
}));

const ParsingTable = () => {
  const classes = useStyles();
  const { header, body } = parsingTable;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            {header.map(({ key, value }) => (
              <StyledTableCell key={key} align="center">
                {value}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {body.map(({ key, values }) => (
            <TableRow key={key}>
              {values.map((column, columnIndex) => (
                <StyledTableCell
                  key={`${key}-${String(columnIndex)}`}
                  align="center"
                  component="th"
                  scope="row"
                  className={columnIndex === 0 ? classes.firstRow : ''}
                >
                  {column}
                </StyledTableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ParsingTable;
