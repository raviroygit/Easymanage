import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables(props) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Version Name</StyledTableCell>
            <StyledTableCell align="right">Version Code</StyledTableCell>
            <StyledTableCell align="right">compileSdkVersion</StyledTableCell>
            <StyledTableCell align="right">Package</StyledTableCell>
            <StyledTableCell align="right">App</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <StyledTableRow key="app-Details">
              <StyledTableCell component="th" scope="row">
              {props.appResponse.versionName}
              </StyledTableCell>
              <StyledTableCell align="right">{props.appResponse.versionCode}</StyledTableCell>
              <StyledTableCell align="right">{props.appResponse.compileSdkVersion}</StyledTableCell>
              <StyledTableCell align="right">{props.appResponse.package}</StyledTableCell>
              <StyledTableCell align="right">{props.fileName}</StyledTableCell>
            </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}