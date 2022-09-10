import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { I18n } from "react-redux-i18n";
import {
  MenuItem,
  Grid,
  Button,
  withStyles,
  FormControl,
  FormHelperText,
  List,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import { enqueueSnackbar } from "../../../redux/actions/Notifier/NotifierAction";
import { CallSettingStyles, MenuProps } from "./CallSettingStyles";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import {
  loadTerminals,
  terminalReset,
} from "../../../redux/actions/Terminals/TerminalsListAction";
import {
  loadMerchants,
  merchantsReset,
} from "../../../redux/actions/Group/GroupListAction";
import DateFnsUtils from "@date-io/moment";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import CheckboxTree from "react-checkbox-tree";
import { addCall } from "../../../redux/actions/CallSetting/CallSettingAction";
import { CALL_SCHEDULE_PATH, DATE_FORMAT } from "../../../constants/constants";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import { applicationsReset, loadApplication } from "../../../redux/actions/Application/ApplicationListAction";
import { withRouter } from "react-router-dom";
import { getCallById, resetGetCallByIdSuccess } from '../../../redux/actions/CallSetting/GetCallById';
import { updateCall } from '../../../redux/actions/CallSetting/CallUpdate';
import { FixedSizeList as Lists } from "react-window";
import { GetUserAssociatedGroups } from '../../../lib/keycloak/GetUserAssociateGroupOrSubgroups';

class CallSetting extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: new Date(),
      selectedEndDate: new Date(),
      errorDate: false,
      typeCall: I18n.t("CALL_SETTINGS.CALL_TYPE"),
      filter: I18n.t("CALL_SETTINGS.GROUP"),
      emptyFilter: false,
      emptyTerminal: false,
      emptyGroup: false,
      group: true,
      terminal: false,
      selectedTerminalsIds: [],
      selectedTerminals: [],
      terminalCollection: [],
      allGroupTerminals: [],
      openGroup: [],
      allGroupSelected: [],
      groupTerminalCollection: [],
      checked: [],
      expanded: [],
      typeFile: "",
      fileData: [],
      isCheckedAllTerminal: true,
      isCheckedAllGroup: true,
      isEdit: false
    };
  }

  componentDidMount() {
    this.props.loadApplication();
  }

  componentWillUnmount() {
    this.props.applicationsReset();
  }

  resetState = () => {
    this.setState({
      selectedStartDate: new Date(),
      selectedEndDate: new Date(),
      errorDate: false,
      typeCall: I18n.t("CALL_SETTINGS.CALL_TYPE"),
      filter: I18n.t("CALL_SETTINGS.GROUP"),
      emptyFilter: false,
      emptyTerminal: false,
      emptyGroup: false,
      group: true,
      terminal: false,
      typeFile: "",
      validationMessage: '',
      messageType: ''
    })
  }

  handleDateChangeStart = (date) => {
    this.setState({
      selectedStartDate: date,
    });
  };

  handleDateChangeEnd = (date) => {
    this.setState(
      {
        selectedEndDate: date,
      },
      () => {
        if (
          new Date(this.state.selectedStartDate).getTime() <
          new Date(this.state.selectedEndDate).getTime()
        ) {
          this.setState({ errorDate: false });
        }
      }
    );
  };

  handleClick = () => {
    this.setState({
      open: true,
    });
  };

  handleChangeType = (event) => {
    this.setState({ typeCall: event.target.value, typeFile: "" }, () => {
      const apps = this.handleFile(this.props.applications);
      this.setState({ fileData: apps });
    });
  };

  handleChangeFileType = (event) => {
    this.setState({
      typeFile: event.target.value,
    });
  };

  handleChangeFilter = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      selectedTerminalsIds: [],
      selectedTerminals: [],
      terminalCollection: [],
    });
    if (event.target.value === I18n.t("CALL_SETTINGS.GROUP")) {
      this.props.resetMerchant();
      this.setState({
        group: true,
        emptyFilter: false,
      });
      if (this.props.loginUserAssociateGroups) {
        this.props.loadMerchants(GetUserAssociatedGroups(), { isMerchantList: false });
      }
    }
    if (event.target.value === I18n.t("CALL_SETTINGS.TERMINAL")) {
      this.props.resetTerminal();
      this.setState({
        group: false,
        emptyFilter: false,
        checked: [],
      });
      this.props.loadTerminals();
    }
  };

  handleFile = (file) => {
    let apps = [];
    file.forEach(el => el.type === this.state.typeCall && apps.push(el.name))
    return apps;
  };

  componentDidUpdate(prevProps) {
    if (this.props.id && this.props.id !== prevProps.id) {
      this.props.getCallById(this.props.id);
    }
    if (this.props.loginUserAssociateGroups && JSON.stringify(this.props.loginUserAssociateGroups) !== JSON.stringify(prevProps.loginUserAssociateGroups)) {
      this.props.loadMerchants(GetUserAssociatedGroups(), { isMerchantList: false });
    }
    if (
      this.props.applications &&
      JSON.stringify(prevProps.applications) !==
      JSON.stringify(this.props.applications)
    ) {
      const apps = this.handleFile(this.props.applications);
      this.setState({ fileData: apps });
    }
    if (this.state.group === false) {
      if (
        this.props.terminals &&
        JSON.stringify(prevProps.terminals) !==
        JSON.stringify(this.props.terminals)
      ) {
        const terminalCollection = this.props.terminals.map((terminal) => ({
          sn: terminal.serialNumber,
          id: terminal._id,
        }));
        this.setState({ terminalCollection: terminalCollection }, () => {
          const allSerialNumber = [];
          terminalCollection.forEach((el) => allSerialNumber.push(el.sn));
          this.setState({ selectedTerminals: allSerialNumber });
        });
      }
    }
    if (this.state.group === true) {
      if (
        this.props.merchants &&
        JSON.stringify(prevProps.merchants) !==
        JSON.stringify(this.props.merchants)
      ) {
        const terminalCollection = [];
        const groups = [];
        const groupsIds = [];
        const openGroup = [];
        const loops = (data) => {
          if (data && data.length > 0) {
            return data.map((groupData) => {
              if (groupData.subGroup && groupData.subGroup.length) {
                loops(groupData.subGroup);
                openGroup.push(groupData._id);
              }
              return (
                groups.push(groupData.merchantName),
                groupsIds.push(groupData._id),
                groupData.terminal && groupData.terminal.length > 0 && groupData.terminal.forEach((terminalData) => {
                  if (terminalData && terminalData._id) {
                    terminalCollection.push({
                      id: terminalData._id,
                      sn: terminalData.serialNumber,
                      merchantId: groupData._id,
                    })
                  }
                }
                )
              );
            });
          }
        };
        loops(this.props.merchants);
        const collect = this.repeatTerminalRemove(terminalCollection);
        this.setState({
          openGroup: openGroup,
          allGroupTerminals: terminalCollection,
          selectedGroups: groups,
          checked: groupsIds,
          allGroupSelected: groupsIds,
          selectedGroupsIds: groupsIds,
          terminalCollection: collect,
          groupTerminalCollection: collect,
          selectedTerminals: this.terminalArray(collect),
        });
      }
    }
    if (this.state.isEdit && this.props.callDetails && JSON.stringify(this.props.callDetails) !== JSON.stringify(prevProps.callDetails)) {
      this.setState({ typeCall: this.props.callDetails.type, typeFile: "" }, () => {
        const apps = this.handleFile(this.props.applications);
        this.setState({ fileData: apps });
      });
      this.setState({
        typeCall: this.props.callDetails.type ? this.props.callDetails.type : null,
        typeFile: this.props.callDetails.file ? this.props.callDetails.file : null,
        filter: this.props.callDetails.executeOn ? this.props.callDetails.executeOn : null,
        selectedTerminals: this.props.callDetails.terminalSerialNumber && this.props.callDetails.terminalSerialNumber.length > 0 ? this.props.callDetails.terminalSerialNumber : [],
        selectedStartDate: this.props.callDetails.startDateTime ? this.props.callDetails.startDateTime : null,
        selectedEndDate: this.props.callDetails.endDateTime ? this.props.callDetails.endDateTime : null,
        isCheckedAllTerminal: this.state.terminalCollection.length === (this.props.callDetails.terminalSerialNumber && this.props.callDetails.terminalSerialNumber.length > 0 ? this.props.callDetails.terminalSerialNumber.length : 0)
      });
    }
  }

  terminalArray = (data) => {
    // let terminalArray = 
    return data.map((terminalData) => terminalData.sn);
  };

  repeatTerminalRemove = (data) => {
    let terminals = [];
    let dataLength = data.length;
    for (let i = 0; i < dataLength; i++) {
      if (terminals.length === 0) {
        terminals.push({ id: data[i].id, sn: data[i].sn });
      }
      if (terminals.length > 0) {
        if (!terminals.find((e) => e.id === data[i].id)) {
          terminals.push({ id: data[i].id, sn: data[i].sn });
        }
      }
    }
    return terminals;
  };

  terminalChange = (event) => {
    const terminal = String(event);
    const item = this.state.selectedTerminals.find((data) => data === terminal);
    if (item === terminal) {
      const selectTerminal = this.state.selectedTerminals.filter(
        (data) => data !== terminal
      );
      this.setState({
        selectedTerminals: selectTerminal,
        isCheckedAllTerminal: false
      });
    } else if (!item) {
      this.setState({
        selectedTerminals: [...this.state.selectedTerminals, terminal],
      });
    }
  };

  handleChecked = (checked) => {
    const filterId = this.state.allGroupTerminals.filter((terminal) =>
      checked.includes(terminal.merchantId)
    );
    const arrayTerminal = this.repeatTerminalRemove(filterId);
    this.setState({
      checked: checked,
      terminalCollection: arrayTerminal,
      selectedTerminals: this.terminalArray(arrayTerminal),
      isCheckedAllGroup: false
    });
  };

  onApply = () => {
    if (this.state.typeCall) {
      if (!this.state.typeFile) {
        this.setState({ validationMessage: I18n.t("CALL_SETTINGS.VALIDATION.SELECT_FILE"), messageType: 'error' });
        return;
      }
    }
    if (new Date(this.state.selectedStartDate) < new Date()) {
      this.setState({ validationMessage: I18n.t("CALL_SETTINGS.VALIDATION.START_END_DATE"), messageType: 'error' });
      return;
    }
    if (
      this.state.selectedTerminals.length === 0 ||
      new Date(this.state.selectedStartDate).getTime() >=
      new Date(this.state.selectedEndDate).getTime()
    ) {
      if (
        this.state.filter === I18n.t("CALL_SETTINGS.TERMINAL") &&
        this.state.selectedTerminals.length === 0
      ) {
        this.setState({ emptyTerminal: true });
      } else if (
        this.state.filter === I18n.t("CALL_SETTINGS.GROUP") &&
        this.state.checked.length === 0
      ) {
        this.setState({ emptyGroup: true });
      } else if (
        this.state.filter === I18n.t("CALL_SETTINGS.GROUP") &&
        this.state.selectedTerminals.length === 0
      ) {
        this.setState({ emptyTerminal: true });
      } else if (
        new Date(this.state.selectedStartDate).getTime() >=
        new Date(this.state.selectedEndDate).getTime()
      ) {
        this.setState({ errorDate: true });
      }
    }
    if (
      this.state.selectedTerminals.length > 0 &&
      new Date(this.state.selectedStartDate).getTime() <
      new Date(this.state.selectedEndDate).getTime()
    ) {
      let callData = {
        startDateTime: this.state.selectedStartDate,
        endDateTime: this.state.selectedEndDate,
        type: this.state.typeCall,
        executeOn: this.state.filter,
        terminalSerialNumber: this.state.selectedTerminals,
        file: this.state.typeFile,
      };
      if (!this.state.isEdit) {
        this.props.addCall(callData);
      } else {
        callData.id = this.props.id;
        this.props.updateCall(callData);
      }
      this.resetState();
      this.props.resetMerchant();
      if (this.props.loginUserAssociateGroups) {
        this.props.loadMerchants(GetUserAssociatedGroups(), { isMerchantList: false });
      }
      this.onHandleCancel();
    }
  };

  routeCallSchedule = () => {
    this.props.history.push(CALL_SCHEDULE_PATH)
  };

  onHandleCancel = () => {
    this.props.handleClose();
    this.resetState();
    this.props.resetGetCallByIdSuccess();
  };

  handleUncheckAllTerminal = (e) => {
    if (e.target.checked) {
      const allTerminalSN = this.state.terminalCollection.map(terminal => {
        return terminal.sn;
      })
      this.setState({
        isCheckedAllTerminal: true,
        selectedTerminals: [...allTerminalSN]
      });
    } else {
      this.setState({ isCheckedAllTerminal: false, selectedTerminals: [] });
    }
  };

  handleUncheckAllGroup = (e) => {
    if (e.target.checked) {
      this.setState({
        isCheckedAllGroup: true,
        checked: [...this.state.allGroupSelected],
        terminalCollection: [...this.state.groupTerminalCollection],
        isCheckedAllTerminal: true
      });
    } else {
      this.setState({
        isCheckedAllGroup: false,
        checked: [],
        terminalCollection: [],
        isCheckedAllTerminal: false
      });
    }
  };

  onEntering = () => {
    this.props.loadMerchants(GetUserAssociatedGroups(), { isMerchantList: false });
    this.setState({
      isEdit: this.props.isEdit
    });
  };
  render() {
    const { classes } = this.props;

    const loop = (data) => {
      return data.map((item, index) => {
        if (item.group && item.group.length) {
          return {
            value: item._id,
            label: item.merchantName,
            children: loop(item.group),
          };
        }
        return {
          value: item._id,
          label: item.merchantName,
        };
      });
    };

    const icons = {
      check: <CheckBoxIcon className={classes.checkboxIconCheck} />,
      uncheck: (
        <CheckBoxOutlineBlankIcon className={classes.checkboxIcoUncheck} />
      ),
      halfCheck: (
        <IndeterminateCheckBoxIcon className={classes.checkboxIconHalfcheck} />
      ),
      expandClose: <ExpandMoreIcon className={classes.expandCloseIcon} />,
      expandOpen: <NavigateNextIcon className={classes.expandOpenIcon} />,
    };

    const Row = ({ index, key, style }) => (
      <MenuItem
        style={style}
        value={this.state.terminalCollection[index].sn}
        key={this.state.terminalCollection[index].id}
        className={classes.menuItem1}
        id={this.state.terminalCollection[index].id}
        onClick={(e) => this.terminalChange(e.target.value)}
      >
        <Checkbox
          value={this.state.terminalCollection[index].sn}
          onClick={(e) => this.terminalChange(e.target.value)}
          checked={
            this.state.selectedTerminals.indexOf(this.state.terminalCollection[index].sn) > -1
          }
        />
        {this.state.terminalCollection[index].sn}
      </MenuItem>
    );
    return (
      <Dialog
        open={this.props.open}
        onClose={this.onHandleCancel}
        aria-labelledby="add-user-dialog"
        maxWidth="lg"
        fullWidth={true}
        TransitionProps={{
          onEntering: this.onEntering
        }}
      >
        <DialogTitle id="callSetting-dialog">
          {I18n.t('CALL_SETTINGS.CALL_SETTINGS')}
        </DialogTitle>
        <DialogContent className={classes.content}>
          <Grid container spacing={3} className={classes.type} >
            <Grid item xs={4}>
              <TextField
                className={classes.typeStyle}
                required
                id="select-type"
                select
                SelectProps={{ MenuProps: MenuProps }}
                name="typeCall"
                label={I18n.t("CALL_SETTINGS.SELECT_TYPE")}
                value={this.state.typeCall}
                onChange={(e) => this.handleChangeType(e)}
                InputLabelProps={{
                  shrink: true
                }}
              >
                <MenuItem key="OS" value="OS">
                  {I18n.t("CALL_SETTINGS.UPDATE_OS")}
                </MenuItem>
                <MenuItem key="Application" value="Application">
                  {I18n.t("CALL_SETTINGS.UPDATE_APP")}
                </MenuItem>
              </TextField>

            </Grid>
            <Grid item xs={4}>
              <TextField
                required
                id="file-type"
                fullWidth
                select
                name="fileType"
                label={I18n.t("CALL_SETTINGS.SELECT_FILE")}
                value={this.state.typeFile}
                onChange={(e) => this.handleChangeFileType(e)}
                SelectProps={{ MenuProps: MenuProps }}
              >
                {this.state.fileData.map((el) => (
                  <MenuItem key={el} value={el}>
                    {el}
                  </MenuItem>
                ))}
              </TextField>

            </Grid>
            <Grid item xs={4}>
              <TextField
                className={classes.typeStyle}
                id="select-filter"
                select
                name="filter"
                SelectProps={{ MenuProps: MenuProps }}
                label={I18n.t("CALL_SETTINGS.FILTER")}
                value={this.state.filter}
                onChange={(e) => this.handleChangeFilter(e)}
                InputLabelProps={{
                  shrink: true
                }}
              >
                <MenuItem key={"group"} value="group">
                  {I18n.t("CALL_SETTINGS.GROUPS")}
                </MenuItem>
                <MenuItem key="terminal" value="terminal">
                  {I18n.t("CALL_SETTINGS.SERIAL_NUMBER")}
                </MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <Grid container spacing={3} className={classes.gridDate} >
            <Grid item xs={6}>
              <InputLabel>{I18n.t("CALL_SETTINGS.SELECT_GROUP")}</InputLabel>
              <FormControl
                className={classes.formControlStyle}
                error={this.state.emptyGroup}
              >

                <List
                  className={classes.terminalStyle}
                  disabled={!this.state.group}
                >
                  <MenuItem key="unchecked group" className={classes.allCheckedGroup}>
                    <Checkbox
                      onClick={(e) => this.handleUncheckAllGroup(e)}
                      checked={
                        this.state.isCheckedAllGroup
                      }
                    />
                    {I18n.t("CALL_SETTINGS.SELECT_ALL")}
                  </MenuItem>
                  <List className={classes.groupSelectStyle}>
                    <CheckboxTree
                      nodes={loop(this.props.merchants)}
                      icons={icons}
                      showNodeIcon={false}
                      checked={this.state.checked}
                      expanded={this.state.expanded}
                      disabled={!this.state.group}
                      checkModel="all"
                      onCheck={(checked) => this.handleChecked(checked)}
                      onExpand={(expanded) => this.setState({ expanded })}
                    />
                  </List>
                </List>
                <FormHelperText className={classes.formHelperStyle}>
                  {this.state.emptyGroup
                    ? `${I18n.t("CALL_SETTINGS.EMPTY_GROUP")}`
                    : ""}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <InputLabel className={classes.label1Style}>
                {I18n.t("CALL_SETTINGS.SELECT_TERMINAL")}
              </InputLabel>
              <FormControl
                className={classes.formControlStyle}
                error={this.state.emptyTerminal}
              >
                <List className={classes.terminalStyle} >
                  <MenuItem key="unchecked all terminal">
                    <Checkbox
                      onClick={(e) => this.handleUncheckAllTerminal(e)}
                      checked={
                        this.state.isCheckedAllTerminal
                      }
                    />
                    {I18n.t("CALL_SETTINGS.SELECT_ALL")}
                  </MenuItem>
                  <Lists
                    width={"100%"}
                    height={145}
                    itemCount={this.state.terminalCollection.length}
                    itemSize={40}
                  >
                    {Row}
                  </Lists>
                </List>
                <FormHelperText className={classes.helperTextStyle}>
                  {this.state.emptyTerminal
                    ? `${I18n.t("CALL_SETTINGS.EMPTY_TERMINAL")}`
                    : ""}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Grid className={classes.gridDateTime} container spacing={3} >
            <Grid item xs={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                  variant="inline"
                  ampm={false}
                  views={['hours', 'minutes', 'seconds']}
                  className={classes.keyboardDTPstyle}
                  label={I18n.t("CALL_SETTINGS.START_DATE")}
                  value={this.state.selectedStartDate}
                  onChange={this.handleDateChangeStart}
                  disablePast
                  format={DATE_FORMAT}
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item xs={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                  variant="inline"
                  ampm={false}
                  views={['hours', 'minutes', 'seconds']}
                  className={classes.keyboardDTPstyle}
                  label={I18n.t("CALL_SETTINGS.END_DATE")}
                  color="secondary"
                  value={this.state.selectedEndDate}
                  onChange={this.handleDateChangeEnd}
                  minDate={this.state.selectedStartDate}
                  disablePast
                  format={DATE_FORMAT}
                />
                <FormHelperText className={classes.dateTimeHelperTextStyle}>
                  {this.state.errorDate
                    ? I18n.t("CALL_SETTINGS.ERRORDATE")
                    : ""}
                </FormHelperText>
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Typography >
            {this.state.validationMessage}
          </Typography>
          <Button onClick={this.onHandleCancel} color="secondary" variant='contained'>
            {I18n.t('ACTIONS.CANCEL')}
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={this.onApply}
          >
            {I18n.t("ACTIONS.APPLY")}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      enqueueSnackbar: enqueueSnackbar,
      loadTerminals: loadTerminals,
      loadMerchants: loadMerchants,
      resetTerminal: terminalReset,
      resetMerchant: merchantsReset,
      addCall: addCall,
      loadApplication: loadApplication,
      merchantsReset: merchantsReset,
      applicationsReset: applicationsReset,
      getCallById: getCallById,
      resetGetCallByIdSuccess: resetGetCallByIdSuccess,
      updateCall: updateCall
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    i18n: state.i18n,
    terminals: state.terminals,
    merchants: state.merchants,
    applications: state.applications,
    callDetails: state.callDetails,
    loginUserAssociateGroups: state.loginUserAssociateGroups,
    logInUserInfo: state.logInUserInfo,
  };
}

CallSetting.propTypes = {
  openDialog: PropTypes.bool,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(CallSettingStyles)(withRouter(CallSetting)));

