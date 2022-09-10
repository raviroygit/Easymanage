/* eslint-disable array-callback-return */
import React from "react";
import { I18n } from "react-redux-i18n";
import {
  Grid,
  Paper,
  FormGroup,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import { ReportStyles } from "./ReportStyles";
import { withStyles } from "@material-ui/styles";
import { COLUMNS } from '../../../constants/constants';


const Filter = (props) => {

  const handleChange = (event) => {
    const selectedColumns = [];
    COLUMNS.forEach(x => {
      if (x.checked) {
        selectedColumns.push({ name: I18n.t(`TERMINAL.${x.name}`), selector: x.selector, type: x.type });
      }
      if (event.target.name === x.selector) {
        if (!event.target.checked) {
          x.checked = event.target.checked;
          const index = selectedColumns.findIndex(index => index.selector === x.selector);
          selectedColumns.splice(index);
        } else {
          x.checked = event.target.checked;
          selectedColumns.push({ name: I18n.t(`TERMINAL.${x.name}`), selector: x.selector, type: x.type });
        }
      }
    })
    props.getFilterQuery(selectedColumns);
  };


  const { classes } = props;
  return (
    <Paper className={classes.paper}>
      <Grid container className={classes.container}>
        <FormGroup row className={classes.formGroupRow}>
          {COLUMNS.map(column => (
            <FormControlLabel
              key={column.name}
              control={<Checkbox checked={column.checked} onChange={handleChange} name={column.selector} />}
              label={I18n.t(`TERMINAL.${column.name}`)}
            />
          ))}
        </FormGroup>
      </Grid>
    </Paper>
  );

}
export default withStyles(ReportStyles)(Filter);
