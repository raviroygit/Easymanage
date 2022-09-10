/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { updateTerminal } from '../../../redux/actions/Terminals/UpdateTerminalsAction';
import {
  MenuItem,
  Select,
  InputLabel,
  Button,
  Grid,
} from "@material-ui/core";
import { I18n } from "react-redux-i18n";
import { withStyles } from "@material-ui/styles";
import { TerminalStyles } from "./TerminalStyles";
import { TERMINALS_MOVED } from '../../../constants/constants';

function MoveDialog(props) {
  const { classes } = props;
  const [group, setGroup] = useState("");
  const [terminals, setTerminals] = useState([]);
  const [moveTerminalsList, setMoveTerminalsList] = useState([]);
  const dispatch = useDispatch();

  const merchants = useSelector((state) => state.merchants);
  const selectedTerminals = useSelector((state) => state.selectedList);
  const terminalsList = useSelector((state) => state.terminals);

  useEffect(() => {
    filterTerminals();
    setTerminals(selectedTerminals);
  }, [selectedTerminals]);

  const filterTerminals = () => {
    const filterList = terminalsList.filter(el => selectedTerminals.includes(el._id));
    setMoveTerminalsList(filterList);
  }

  const handleMoveClose = () => {
    props.handleClose();
  };

  const resetMove = () => {
    setGroup("");
  };

  const handleGroupChangeMove = (event) => {
    setGroup(event.target.value);
  };

  const onMoveSaveClick = () => {
    let moveData = {
      ids: selectedTerminals,
      groups: [group],
      action: TERMINALS_MOVED,
    }
    dispatch(updateTerminal(moveData));
    handleMoveClose();
    resetMove();
  };
  return (
    <>
      <Dialog
        open={props.isMoveOpen}
        onClose={handleMoveClose}
        aria-labelledby="terminal-dialog"
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle id="terminal-dialog" className={classes.dialogTitleStyle} >
          {I18n.t("TERMINAL.MOVE_TERMINALS")}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} >
            <Grid item xs={6}>
              <InputLabel id="terminal-group">
                {I18n.t("TERMINAL.SELECTED_TERMINALS")}
              </InputLabel>
              <Select
                labelId="terminal-selected"
                id="terminal-selected"
                name="terminals"
                className={classes.moveSelectStyle}
                MenuProps={{ classes: { paper: classes.moveSelectTerminalStyle } }}
                multiple
                value={terminals}
                onChange={(e) => handleGroupChangeMove(e)}
              >
                {moveTerminalsList.map(el => (
                  <MenuItem key={el._id} value={el._id} disabled>
                    {el.serialNumber}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={6}>
              <InputLabel id="terminal-group">
                {I18n.t("TERMINAL.GROUP_LIST")}
              </InputLabel>
              <Select
                labelId="terminal-group"
                id="terminal-group"
                name="group"
                className={classes.moveSelectStyle}
                value={group}
                onChange={(e) => handleGroupChangeMove(e)}
              >
                {merchants &&
                  merchants.map(el => el.isParent && (
                    <MenuItem key={el._id} value={el.merchantName}>
                      {el.merchantName}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleMoveClose}
            color="primary"
            variant="contained"
          >
            {I18n.t("ACTIONS.CANCEL")}
          </Button>
          <Button
            onClick={onMoveSaveClick}
            color="secondary"
            variant="contained"
          >
            {I18n.t("ACTIONS.SAVE")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default withStyles(TerminalStyles)(MoveDialog);