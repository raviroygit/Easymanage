/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
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
  TextField,
  Grid,
  Card,
  Typography
} from "@material-ui/core";
import { I18n } from "react-redux-i18n";
import { withStyles } from "@material-ui/styles";
import { TerminalStyles } from "./TerminalStyles";
import { AAS_SETTING_CHANGE } from '../../../constants/constants';

function AasDialog(props) {
  const { classes } = props;
  const [acquiredPort, setAcquiredPort] = useState("");
  const [acquirerIPAddress, setAcquirerIPAddress] = useState("");
  const [TLS, setTLS] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const dispatch = useDispatch();
  const selectedTerminals = useSelector((state) => state.selectedList)

  const handleChangeAas = (event) => {
    if (event.target.name === "acquirerIPAddress") {
      setAcquirerIPAddress(event.target.value);
      setValidationMessage("");
      setMessageType("");
    }
    if (event.target.name === "acquiredPort") {
      setAcquiredPort(event.target.value);
      setValidationMessage("");
      setMessageType("");
    }
    if (event.target.name === "TLS") {
      setTLS(event.target.value);
    }
  };

  const resetState = () => {
    setAcquirerIPAddress("");
    setAcquiredPort("");
    setTLS(false);
    setMessageType("");
    setValidationMessage("");
  }

  const onSaveClick = () => {
    if (!acquiredPort) {
      setValidationMessage(I18n.t("TERMINAL.VALIDATION.AQUIRED_PORT"));
      setMessageType("error");
    }
    else if (!acquirerIPAddress) {
      setValidationMessage(I18n.t("TERMINAL.VALIDATION.AQUIRER_IP"));
      setMessageType("error");
    }
    else {
      let terminalData = {
        acquiredPort: acquiredPort,
        acquirerIPAddress: acquirerIPAddress,
        TLS: TLS,
        ids: selectedTerminals,
        action: AAS_SETTING_CHANGE,
      }
      dispatch(updateTerminal(terminalData));
      resetState();
      handleAasClose();
    }
  }

  const handleAasClose = () => {
    props.handleClose();
  };

  return (
    <>
      <Dialog
        open={props.isAasDialogOpen}
        onClose={handleAasClose}
        aria-labelledby="terminal-dialog"
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle id="terminal-dialog" className={classes.aasDialogTitle} >
          {I18n.t("TERMINAL.AAS_SETTING_HEADING")}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}  >
            <Grid item xs={6}>
              <TextField
                margin="dense"
                fullWidth
                id="acquirerIPAddress"
                label={I18n.t("TERMINAL.ACQUIRER_IP_ADDRESS")}
                value={acquirerIPAddress}
                type="text"
                name="acquirerIPAddress"
                onChange={(e) => handleChangeAas(e)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                fullWidth
                id="acquiredPort"
                label={I18n.t("TERMINAL.ACQUIRER_PORT")}
                value={acquiredPort}
                type="text"
                name="acquiredPort"
                onChange={(e) => handleChangeAas(e)}
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel id="terminal-TLS" className={classes.aasInputGridStyle} >
                TLS
              </InputLabel>
              <Select
                labelId="terminal-status"
                id="terminal-TLS"
                name="TLS"
                className={classes.aasSelectStyle}
                value={TLS}
                displayEmpty
                onChange={(e) => handleChangeAas(e)}
              >
                <MenuItem key={true} value={true}>
                  {I18n.t("TERMINAL.TRUE")}
                </MenuItem>
                <MenuItem key={false} value={false}>
                  {I18n.t("TERMINAL.FALSE")}
                </MenuItem>
              </Select>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Typography>
            {validationMessage}
          </Typography>
          <Button
            onClick={handleAasClose}
            color="primary"
            variant="contained"
          >
            {I18n.t("ACTIONS.CANCEL")}
          </Button>
          <Button
            onClick={onSaveClick}
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

export default withStyles(TerminalStyles)(AasDialog);