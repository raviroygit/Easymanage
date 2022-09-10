/* eslint-disable array-callback-return */
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Button, Grid, withStyles, FormControl } from "@material-ui/core";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { I18n } from "react-redux-i18n";
import {
  getTerminalById,
  resetTerminal,
} from "../../../redux/actions/Terminals/GetTerminalById";
import { updateTerminal } from "../../../redux/actions/Terminals/UpdateTerminalsAction";
import PropTypes from "prop-types";
import { TerminalStyles, MenuProps } from "./TerminalStyles";
import { terminalRegistration } from "../../../redux/actions/Terminals/TerminalRegistration";
import {
  loadMerchants,
  merchantsReset,
} from "../../../redux/actions/Group/GroupListAction";
import { TERMINAL_STATUS } from '../../../constants/constants';
import { GetUserAssociatedGroups } from '../../../lib/keycloak/GetUserAssociateGroupOrSubgroups';

class TerminalDialog extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      serialNumber: "",
      systemIdentifier: "",
      acquirerIPAddress: "",
      acquiredPort: "",
      status: "",
      validationMessage: "",
      messageType: "",
      TLS: false,
      group: "",
      groupList: [],
      subGroup: "",
      subGroupList: [],
      terminalHaveGroup: false,
    };
  }

  onHandleCancel = () => {
    this.props.handleClose();
    this.resetState();
    this.props.resetTerminal();
  };

  resetState = () => {
    this.setState({
      serialNumber: "",
      systemIdentifier: "",
      acquiredPort: "",
      acquirerIPAddress: "",
      TLS: false,
      status: "",
      validationMessage: "",
      messageType: "",
      group: "",
      subGroup: "",
      comment: "",
      terminalHaveGroup: false,
      isLogsUpload: false
    });
  };

  componentWillUnmount() {
    this.props.resetTerminal();
    this.props.merchantsReset();
  }
  componentDidUpdate(prevProps) {
    if (this.props.id && prevProps.id !== this.props.id) {
      this.props.getTerminalById(this.props.id);
    }
    if (this.props.loginUserAssociateGroups && JSON.stringify(this.props.loginUserAssociateGroups) !== JSON.stringify(prevProps.loginUserAssociateGroups)) {
      this.props.loadMerchants(GetUserAssociatedGroups(), { isMerchantList: false });
    }
    if (
      this.props.isEdit &&
      this.props.terminalDetail &&
      JSON.stringify(prevProps.terminalDetail) !==
      JSON.stringify(this.props.terminalDetail)
    ) {
      this.getSubGroupList(
        this.props.terminalDetail.group
      );
      this.setState({
        serialNumber: this.props.terminalDetail.serialNumber
          ? this.props.terminalDetail.serialNumber
          : "",
        systemIdentifier: this.props.terminalDetail.systemIdentifier
          ? this.props.terminalDetail.systemIdentifier
          : "",
        acquiredPort: this.props.terminalDetail.acquiredPort
          ? this.props.terminalDetail.acquiredPort
          : "",
        acquirerIPAddress: this.props.terminalDetail.acquirerIPAddress
          ? this.props.terminalDetail.acquirerIPAddress
          : "",
        TLS: this.props.terminalDetail.TLS ? this.props.terminalDetail.TLS : "false",
        status: this.props.terminalDetail.status
          ? this.props.terminalDetail.status
          : "false",
        group: this.props.terminalDetail.group
          ? this.props.terminalDetail.group
          : "",
        subGroup: this.props.terminalDetail.subGroup
          ? this.props.terminalDetail.subGroup
          : "",
        isLogsUpload: this.props.terminalDetail.isLogsUpload ?
          this.props.terminalDetail.isLogsUpload
          : "false"
      });
    }
  }

  componentDidMount() {
    if (this.props.loginUserAssociateGroups && this.props.loginUserAssociateGroups.length > 0) {
      this.props.loadMerchants(GetUserAssociatedGroups(), { isMerchantList: false });
    }
  }
  onEnter = () => {
    if (this.props.merchants) {
      const groupList =
        this.props.merchants.length > 0 &&
        this.props.merchants.map((group) => {
          return !group.isRoot && {
            id: group._id,
            name: group.merchantName,
          }
        });
      this.setState({ groupList: groupList });
    }
  };

  getSubGroupList = (groupName) => {
    const matchGroup = [];
    this.props.merchants.forEach((group) => {
      if (group.merchantName === groupName) {
        const subGroupList = [...group.subGroup];
        subGroupList.forEach((subgroup) =>
          matchGroup.push({ id: subgroup._id, name: subgroup.merchantName })
        );
      }
    });
    this.setState({ subGroupList: matchGroup });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      validationMessage: "",
      messageType: "",
    });
    if (event.target.name === "group") {
      this.getSubGroupList(event.target.value);
    }
  };

  validateIPaddress = (ipAddress) => {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipAddress)) {
      return (true)
    }
    return (false)
  };

  validateAlphaNumeric = (input) => {
    if (/^[A-Za-z0-9]+$/.test(input)) {
      return (true)
    }
    return (false)
  };

  validateNumeric = (input) => {
    if (/^[0-9]+$/.test(input)) {
      return (true)
    }
    return (false)
  };

  onSaveClick = () => {
    const groupsToSend = [this.state.group, this.state.subGroup];
    if (!this.state.serialNumber) {
      this.setState({
        validationMessage: I18n.t("TERMINAL.VALIDATION.SERIAL_NUMBER"),
        messageType: "error",
      });
      return;
    } else if (!this.state.systemIdentifier) {
      this.setState({
        validationMessage: I18n.t("TERMINAL.VALIDATION.SYS_IDENTIFIER"),
        messageType: "error",
      });
      return;
    } else if (!this.state.acquiredPort) {
      this.setState({
        validationMessage: I18n.t("TERMINAL.VALIDATION.AQUIRED_PORT"),
        messageType: "error",
      });
      return;
    } else if (!this.state.acquirerIPAddress) {
      this.setState({
        validationMessage: I18n.t("TERMINAL.VALIDATION.AQUIRER_IP"),
        messageType: "error",
      });
      return;
    } else if (!this.validateIPaddress(this.state.acquirerIPAddress)) {
      this.setState({
        validationMessage: I18n.t("TERMINAL.VALIDATION.VALID_ACQUIRER_IP"),
        messageType: "error",
      });
      return;
    } else if(!this.validateAlphaNumeric(this.state.serialNumber)){
      this.setState({
        validationMessage: I18n.t("TERMINAL.VALIDATION.VALID_SERIAL_NUMBER"),
        messageType: "error",
      });
      return;
    } else if(!this.validateAlphaNumeric(this.state.systemIdentifier)){
      this.setState({
        validationMessage: I18n.t("TERMINAL.VALIDATION.VALID_TERMINAL_ID"),
        messageType: "error",
      });
      return;
    } else if(!this.validateNumeric(this.state.acquiredPort)){
      this.setState({
        validationMessage: I18n.t("TERMINAL.VALIDATION.VALID_PORT"),
        messageType: "error",
      });
      return;
    }
     else if (this.props.isEdit) {
      let terminalData = {
        systemIdentifier: this.state.systemIdentifier,
        acquiredPort: this.state.acquiredPort,
        acquirerIPAddress: this.state.acquirerIPAddress,
        TLS: this.state.TLS,
        status: this.state.status,
        groups: groupsToSend,
        comment: this.state.comment,
        ids: [this.props.id],
        isLogsUpload: this.state.isLogsUpload
      };
      this.props.updateTerminal(terminalData);
    } else if (!this.props.isEdit) {
      let terminalData = {
        serialNumber: this.state.serialNumber,
        systemIdentifier: this.state.systemIdentifier,
        acquiredPort: this.state.acquiredPort,
        acquirerIPAddress: this.state.acquirerIPAddress,
        TLS: this.state.TLS,
        groups: groupsToSend,
      };
      this.props.terminalRegistration(terminalData);
    }
    this.onHandleCancel();
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.onHandleCancel}
          aria-labelledby="terminal-dialog"
          maxWidth="lg"
          fullWidth={true}
          TransitionProps={{
            onEntering: this.onEnter
          }}
        >
          {this.props.isEdit ? (
            <DialogTitle id="terminal-dialog">
              {I18n.t("TERMINAL.DIALOG_HEADING")}
            </DialogTitle>
          ) : (
            <DialogTitle id="terminal-dialog">
              {I18n.t("TERMINAL.ADD_NEW_TERMINAL")}
            </DialogTitle>
          )}
          <DialogContent>
            <Grid container spacing={3} >
              <Grid item xs={4}>
                <TextField
                  margin="dense"
                  fullWidth
                  id="serial-number"
                  label={I18n.t("FORM.SERIAL_NUMBER")}
                  value={this.state.serialNumber}
                  type="text"
                  name="serialNumber"
                  onChange={(e) => this.handleChange(e)}
                  disabled={this.props.isEdit ? true : false}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  margin="dense"
                  fullWidth
                  id="id-terminal"
                  label={I18n.t("TERMINAL.SYSTEM_IDENTIFIER")}
                  value={this.state.systemIdentifier}
                  type="text"
                  name="systemIdentifier"
                  onChange={(e) => this.handleChange(e)}
                />
              </Grid>
              <Grid item xs={4}>
                <FormControl className={classes.groupSelect}>
                  <InputLabel id="groups">{I18n.t("TERMINAL.GROUPS")}</InputLabel>
                  <Select
                    labelId="terminal-group"
                    id="terminal-status-select"
                    name="group"
                    className={classes.groupSelect}
                    value={this.state.group}
                    onChange={(e) => this.handleChange(e)}
                    MenuProps={MenuProps}
                  >
                    {this.state.groupList && this.state.groupList.length > 0 && this.state.groupList.map((el) => (
                      <MenuItem key={el.id} value={el.name}>
                        {el.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl className={classes.groupSelect}>
                  <InputLabel id="subgroup">
                    {I18n.t("TERMINAL.SUB_GROUP")}
                  </InputLabel>
                  <Select
                    id="terminal-subGroup-select"
                    name="subGroup"
                    className={classes.groupSelect}
                    value={this.state.subGroup}
                    onChange={(e) => this.handleChange(e)}
                    MenuProps={MenuProps}
                  >
                    {this.state.subGroupList.map((el) => (
                      <MenuItem key={el.id} value={el.name}>
                        {el.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  margin="dense"
                  fullWidth
                  id="acquirerIPAddress"
                  label={I18n.t("TERMINAL.ACQUIRER_IP_ADDRESS")}
                  value={this.state.acquirerIPAddress}
                  type="text"
                  name="acquirerIPAddress"
                  onChange={(e) => this.handleChange(e)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  margin="dense"
                  fullWidth
                  id="acquiredPort"
                  label={I18n.t("TERMINAL.ACQUIRER_PORT")}
                  value={this.state.acquiredPort}
                  type="text"
                  name="acquiredPort"
                  onChange={(e) => this.handleChange(e)}
                />
              </Grid>
              <Grid item xs={4}>
                <InputLabel id="terminal-TLS">
                  {I18n.t("TERMINAL.TLS")}
                </InputLabel>
                <Select
                  labelId="terminal-TLS"
                  id="terminal-TLS"
                  name="TLS"
                  className={classes.tls}
                  value={this.state.TLS}
                  displayEmpty
                  onChange={(e) => this.handleChange(e)}
                  MenuProps={MenuProps}
                >
                  <MenuItem key="true" value={true}>{I18n.t("TERMINAL.TRUE")}</MenuItem>
                  <MenuItem key="false" value={false}>{I18n.t("TERMINAL.FALSE")}</MenuItem>
                </Select>
              </Grid>
              {this.props.isEdit && (
                <Grid item xs={4}>
                  <InputLabel id="terminal-status">
                    {I18n.t("TERMINAL.STATUS")}
                  </InputLabel>
                  <Select
                    labelId="terminal-status"
                    id="terminal-status-select"
                    name="status"
                    value={this.state.status}
                    fullWidth
                    onChange={(e) => this.handleChange(e)}
                    MenuProps={MenuProps}
                  >
                    {TERMINAL_STATUS.map(status => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              )}
              {this.props.isEdit &&
                <Grid item xs={4}>
                  <InputLabel id="terminal-isLogsUpload">
                    {I18n.t("TERMINAL.IS_LOGS_UPLOAD")}
                  </InputLabel>
                  <Select
                    labelId="terminal-isLogsUpload"
                    id="terminal-isLogsUpload"
                    name="isLogsUpload"
                    value={this.state.isLogsUpload}
                    fullWidth
                    onChange={(e) => this.handleChange(e)}
                    MenuProps={MenuProps}
                  >
                    <MenuItem key="true" value={true}>{I18n.t("TERMINAL.TRUE")}</MenuItem>
                    <MenuItem key="false" value={false}>{I18n.t("TERMINAL.FALSE")}</MenuItem>
                  </Select>
                </Grid>
              }
              
              {this.props.isEdit && (
                <Grid item xs={4}>
                  <TextField
                    margin="dense"
                    fullWidth
                    className={classes.commentField}
                    id="comment"
                    label={I18n.t("TERMINAL.COMMENT")}
                    value={this.state.comment}
                    type="text"
                    name="comment"
                    multiline
                    onChange={(e) => this.handleChange(e)}
                  />
                </Grid>
              )}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Typography >
              {this.state.validationMessage}
            </Typography>
            <Button
              onClick={this.onHandleCancel}
              color="secondary"
              variant="contained"
            >
              {I18n.t("ACTIONS.CANCEL")}
            </Button>
            <Button
              onClick={this.onSaveClick}
              color="primary"
              variant="contained"
            >
              {I18n.t("ACTIONS.SAVE")}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {

  return bindActionCreators(
    {
      getTerminalById: getTerminalById,
      updateTerminal: updateTerminal,
      resetTerminal: resetTerminal,
      terminalRegistration: terminalRegistration,
      loadMerchants: loadMerchants,
      merchantsReset: merchantsReset,
    },
    dispatch
  );

}

function mapStateToProps(state) {
  return {
    i18n: state.i18n,
    merchants: state.merchants,
    terminalDetail: state.terminal,
    updateTerminalStatus: state.updateTerminalStatus,
    loginUserAssociateGroups: state.loginUserAssociateGroups
  };
}

TerminalDialog.propTypes = {
  serialNumber: PropTypes.string,
  systemIdentifier: PropTypes.string,
  acquirerIPAddress: PropTypes.string,
  acquiredPort: PropTypes.string,
  status: PropTypes.string,
  validationMessage: PropTypes.string,
  messageType: PropTypes.string,
  terminalModel: PropTypes.string,
  merchantName: PropTypes.string,
  city: PropTypes.string,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(TerminalStyles)(TerminalDialog));
