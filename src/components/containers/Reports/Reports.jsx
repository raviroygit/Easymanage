/* eslint-disable no-mixed-operators */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Paper,
  Button,
  Card,
  Grid,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Fab,
  Tooltip,
  Typography
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardDateTimePicker
} from "@material-ui/pickers";
import Filter from './Filter';
import DateFnsUtils from "@date-io/moment";
import FilterListIcon from '@material-ui/icons/FilterList';
import { useDispatch, useSelector } from "react-redux";
import { getReport, resetReport } from "../../../redux/actions/Report/getReportAction";
import { DATE_FORMAT, FILTER_DATE_FORMAT, PWD_FORMAT, COLUMNS, TERMINAL_STATUS } from "../../../constants/constants";
import ReportList from "./ReportList";
import { I18n } from "react-redux-i18n";
import { getFilterList } from '../../../redux/actions/Report/getFilterLIst';
import { withStyles } from "@material-ui/styles";
import { ReportStyles, MenuProps } from "./ReportStyles";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import moment from 'moment';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { Country, State, City } from "country-state-city";

function Reports(props) {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    idsa: '',
    serialNumber: '',
    model: '',
    appVersion: '',
    blacklistVersion: '',
    group: '',
    subGroup: '',
    operator: '',
    status: '',
    validationMessage: "",
    messageType: "",
    country: "India",
    state: "",
    city: ""
  });
  const [subGroupList, setSubGroupList] = useState([]);
  const [registrationDate, setRegistrationDate] = useState(null);
  const [lastConnectionEndDate, setLastConnectionEndDate] = useState(null);
  const [lastConnectionStartDate, setLastConnectionStartDate] = useState(null);
  const [filter, setFilter] = useState(false);
  const [columns, setColumns] = useState([]);
  const [search, setSearch] = useState(true);
  const filterList = useSelector((state) => state.filterList);
  const loginUserAssociateGroups = useSelector(state => state.loginUserAssociateGroups);
  const userInfo = useSelector(state => state.logInUserInfo);
  const countries = Country.getAllCountries();
  // eslint-disable-next-line no-unused-vars
  const i18n = useSelector(state => state.i18n);

  useEffect(() => {
    dispatch(getFilterList());
  }, [])

  useEffect(() => {
    defaultSubGroupList();
  }, [loginUserAssociateGroups, userInfo]);

  const isRootGroup = filterList && filterList.groups && filterList.groups.length > 0 && filterList.groups.filter(x => loginUserAssociateGroups && loginUserAssociateGroups.length > 0 && loginUserAssociateGroups[0].name === x.merchantName);


  const defaultSubGroupList = () => {
    const subGroupList = [];
    if (loginUserAssociateGroups && loginUserAssociateGroups.length > 0 && loginUserAssociateGroups[0].name !== process.env.REACT_APP_ROOT_GROUP_NAME) {
      filterList && filterList.groups && filterList.groups.length > 0 && filterList.groups.forEach((x) => {
        if (loginUserAssociateGroups && loginUserAssociateGroups.length > 0 && loginUserAssociateGroups[0].name === x.merchantName) {
          subGroupList.push(...x.subGroup);
        }
      });
    }
    const filterSubGroupDetails = filterList && filterList.groups && filterList.groups.length > 0 && filterList.groups.filter(x => subGroupList.includes(x._id));
    setSubGroupList(filterSubGroupDetails)
  }
  const handleRegistrationDateChange = (date) => {
    setRegistrationDate(date);
  };
  const handleLastConnectionEndDate = (date) => {
    setLastConnectionEndDate(date);
  };
  const handleLastConnectionStartDate = (date) => {
    setLastConnectionStartDate(date);
  };

  const handleChange = (event) => {
    if (event.target.name === 'group') {
      setState({ ...state, subGroup: '', group: event.target.value });
      const subGroupOfSelectedGroup = [];
      filterList.groups.forEach(el => {
        if (el._id === event.target.value) {
          subGroupOfSelectedGroup.push(...el.subGroup);
        }
      });

      const subGroupLists = filterList.groups.filter(el => subGroupOfSelectedGroup.includes(el._id));
      setSubGroupList(subGroupLists);
    }
    else {
      setState({ ...state, [event.target.name]: event.target.value });
    }
  };

  const handleDefaultColumns = () => {
    const column = [];
    COLUMNS.forEach(x => {
      if (x.checked) {
        column.push({ name: I18n.t(`TERMINAL.${x.name}`), selector: x.selector, type: x.type });
      }
    })
    setColumns(column);
  }

  const getFilterQuery = (query) => {
    setColumns(query)
  }

  const handleSearch = () => {

    if (lastConnectionEndDate && lastConnectionStartDate && lastConnectionStartDate >= lastConnectionEndDate) {
      setState({
        validationMessage: I18n.t("REPORT.VALIDATION.LAST_CONNECTION_VALIDATION"),
        messageType: "error",
      });
      return;
    }

    setSearch(false);
    handleDefaultColumns();
    const reportData = {
      createdAt: registrationDate ? moment(registrationDate).format(FILTER_DATE_FORMAT) : null,
      serialNumber: state.serialNumber,
      systemIdentifier: state.idsa,
      appVersion: state.appVersion,
      blVersion: state.blacklistVersion,
      city: state.city,
      group: loginUserAssociateGroups && loginUserAssociateGroups.length > 0 && loginUserAssociateGroups[0].name === process.env.REACT_APP_ROOT_GROUP_NAME ? state.group : isRootGroup && isRootGroup.length > 0 && isRootGroup[0]._id,
      subGroup: state.subGroup,
      operatorName: state.operator,
      lastCallDateEnd: lastConnectionEndDate,
      lastCallDateStart: lastConnectionStartDate,
      terminalModel: state.model,
      status: state.status
    };
    dispatch(getReport(reportData));
  };

  const showFilter = () => {
    setFilter(!filter);
  }

  const hideFilter = () => {
    setFilter(false);
  }

  const backToSearch = () => {
    dispatch(resetReport());
    setSearch(true);
  };

  const { classes } = props;
  return (
    <Grid container className={classes.containerReport}>
      <Paper className={classes.paperReport}>
        {search ?
          <Card className={classes.inner_card}>
            <div className={classes.search_box}>
              <Grid container spacing={6}>
                <Grid item xs={4}>
                  <InputLabel
                    id="serialNumber">{I18n.t('TERMINAL.SERIAL_NUMBER')}
                  </InputLabel>
                  <TextField
                    className={classes.input_txt}
                    type="text"
                    name="serialNumber"
                    value={state.serialNumber}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <InputLabel
                    id="status">{I18n.t('TERMINAL.STATUS')}
                  </InputLabel>
                  <TextField
                    className={classes.input_txt}
                    name="status"
                    select
                    value={state.status}
                    onChange={handleChange}
                  >
                    {TERMINAL_STATUS.map(status => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={4} >
                  <InputLabel id="isa">
                    {I18n.t('TERMINAL.TERMINAL_ID')}
                  </InputLabel>
                  <TextField
                    className={classes.input_txt}
                    type="text"
                    name="idsa"
                    value={state.idsa}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={6}>
                <Grid item xs={4}>
                  <InputLabel id="lastConnectionStartDate">
                    {I18n.t('REPORT.START_CONNECTION')}
                  </InputLabel>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDateTimePicker
                      className={classes.time_card}
                      format={DATE_FORMAT}
                      ampm={false}
                      value={lastConnectionStartDate}
                      onChange={handleLastConnectionStartDate}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={4}>
                  <InputLabel id="lastConnectionStartDate">
                    {I18n.t('REPORT.END_CONNECTION')}
                  </InputLabel>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDateTimePicker
                      className={classes.time_card}
                      format={DATE_FORMAT}
                      ampm={false}
                      value={lastConnectionEndDate}
                      onChange={handleLastConnectionEndDate}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={4}>
                  <InputLabel id="registrationDate">
                    {I18n.t('REPORT.CREATED_DATE')}
                  </InputLabel>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      className="time-card"
                      ampm={false}
                      format={PWD_FORMAT}
                      value={registrationDate}
                      onChange={handleRegistrationDateChange}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
              <Grid container spacing={6}>
                <Grid item xs={4}>
                  <InputLabel
                    id="blacklistVersion" >{I18n.t('REPORT.BLACKLIST_VERSION')}</InputLabel>
                  <Select
                    className={classes.input_txt}
                    labelId={I18n.t('REPORT.BLACKLIST_VERSION')}
                    id="blacklist-version"
                    name="blacklistVersion"
                    value={state.blacklistVersion}
                    onChange={handleChange}
                    MenuProps={MenuProps}
                    displayEmpty
                  >
                    <MenuItem key="" value="">{I18n.t('REPORT.EMPTY_LABEL')}</MenuItem>
                    {filterList.blackListVersion && filterList.blackListVersion.map(version => (
                      <MenuItem key={version} value={version}>{version}</MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={4} >
                  <InputLabel
                    id="operator" >{I18n.t('REPORT.OPERATOR')}</InputLabel>
                  <Select
                    className={classes.input_txt}
                    labelId={I18n.t('REPORT.OPERATOR')}
                    id="operator"
                    name="operator"
                    value={state.operator}
                    onChange={handleChange}
                    MenuProps={MenuProps}
                    displayEmpty
                  >
                    <MenuItem key="$nin" value="$nin">{I18n.t('REPORT.EMPTY_LABEL')}</MenuItem>
                    {filterList.operatorName && filterList.operatorName.map(operator => (
                      <MenuItem key={operator} value={operator}>{operator}</MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={4} >
                  <InputLabel
                    id="model" >{I18n.t('REPORT.MODEL')}</InputLabel>
                  <Select
                    className={classes.input_txt}
                    labelId={I18n.t('REPORT.MODEL')}
                    id="model-select"
                    name="model"
                    value={state.model}
                    onChange={handleChange}
                    MenuProps={MenuProps}
                    displayEmpty
                  >
                    <MenuItem key="" value="">{I18n.t('REPORT.EMPTY_LABEL')}</MenuItem>
                    {filterList.terminalModel && filterList.terminalModel.map(model => (
                      <MenuItem key={model} value={model}>{model}</MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
              <Grid container spacing={6}>
                <Grid item xs={4} >
                  <InputLabel
                    id="appVersion" >{I18n.t('REPORT.APPLICATION_VERSION')}</InputLabel>
                  <Select
                    className={classes.input_txt}
                    labelId={I18n.t('REPORT.APPLICATION_VERSION')}
                    id="application-version"
                    name="appVersion"
                    value={state.appVersion}
                    onChange={handleChange}
                    MenuProps={MenuProps}
                    displayEmpty
                  >
                    <MenuItem key="" value="">{I18n.t('REPORT.EMPTY_LABEL')}</MenuItem>
                    {filterList.applicationVersion && filterList.applicationVersion.map(version => (
                      <MenuItem key={version} value={version}>{version}</MenuItem>
                    ))}
                  </Select>
                </Grid>
                {loginUserAssociateGroups && loginUserAssociateGroups.length > 0 && loginUserAssociateGroups[0].name === process.env.REACT_APP_ROOT_GROUP_NAME &&
                  <Grid item xs={4} >
                    <InputLabel
                      id="group">{I18n.t('REPORT.GROUP')}
                    </InputLabel>
                    <Select
                      className={classes.input_txt}
                      labelId={I18n.t('REPORT.GROUP')}
                      id="group"
                      name="group"
                      value={state.group}
                      onChange={handleChange}
                      MenuProps={MenuProps}
                    >
                      <MenuItem key="$nin" value="$nin">{I18n.t('REPORT.EMPTY_LABEL')}</MenuItem>
                      {filterList.groups && filterList.groups.map(group => (group.isParent &&
                        <MenuItem key={group._id} value={group._id}>{group.merchantName}</MenuItem>
                      ))}
                    </Select>
                  </Grid>
                }
                {loginUserAssociateGroups && loginUserAssociateGroups.length > 0 && loginUserAssociateGroups[0].name === process.env.REACT_APP_ROOT_GROUP_NAME || isRootGroup && isRootGroup.length > 0 && isRootGroup[0].isParent ?
                  <Grid item xs={4} >
                    <InputLabel
                      id="sub-group">{I18n.t('REPORT.SUBGROUP')}
                    </InputLabel>
                    <Select
                      className={classes.input_txt}
                      labelId={I18n.t('REPORT.GROUP')}
                      id="subGroup"
                      name="subGroup"
                      value={state.subGroup}
                      onChange={handleChange}
                      MenuProps={MenuProps}
                    >
                      <MenuItem value="">{I18n.t('REPORT.EMPTY_LABEL')}</MenuItem>
                      {subGroupList && subGroupList.length > 0 && subGroupList.map(group => (
                        <MenuItem value={group._id}>{group.merchantName}</MenuItem>
                      ))}
                    </Select>
                  </Grid> : null}
                <Grid item xs={4}>
                  <InputLabel
                    id="country">{I18n.t('REPORT.COUNTRY')}
                    {I18n.t('REPORT.COUNTRY')}
                  </InputLabel>
                  <Select
                    className={classes.input_txt}
                    labelId={I18n.t('REPORT.COUNTRY')}
                    id="country"
                    name="country"
                    value={state.country}
                    onChange={handleChange}
                    MenuProps={MenuProps}
                  >
                    <MenuItem value="">{I18n.t('REPORT.EMPTY_LABEL')}</MenuItem>
                    {countries.map(country => (
                      <MenuItem value={country.isoCode}>{country.name}</MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={4} >
                  <InputLabel
                    id="state">{I18n.t('REPORT.STATE')}
                  </InputLabel>
                  <Select
                    className={classes.input_txt}
                    labelId={I18n.t('REPORT.STATE')}
                    id="state"
                    name="state"
                    value={state.state}
                    onChange={handleChange}
                    MenuProps={MenuProps}
                  >
                    <MenuItem value="">{I18n.t('REPORT.EMPTY_LABEL')}</MenuItem>
                    {state.country && State.getStatesOfCountry(state.country).map(state => (
                      <MenuItem value={state.isoCode}>{state.name}</MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={4} >
                  <InputLabel
                    id="city">{I18n.t('REPORT.CITY')}
                  </InputLabel>
                  <Select
                    className={classes.input_txt}
                    labelId={I18n.t('REPORT.CITY')}
                    id="city"
                    name="city"
                    value={state.city}
                    onChange={handleChange}
                    MenuProps={MenuProps}>
                    <MenuItem value="">{I18n.t('REPORT.EMPTY_LABEL')}</MenuItem>
                    {state.state && state.country && City.getCitiesOfState(state.country, state.state).map(city => (
                      <MenuItem value={city.name}>{city.name}</MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
              <div>
                <Typography className={classes.validationMessage}>
                  {state.validationMessage}
                </Typography>
                <div className={classes.button_container}>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={handleSearch}
                  >
                    {I18n.t("REPORT.BUTTON")}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
          :
          <>
            <Grid container className={classes.reportTableOuterBox}>
              <Fab size="small" onClick={backToSearch} className={classes.returnBox}>
                <Tooltip title={I18n.t("REPORT.CLOSE")}>
                  <ArrowBackIosIcon size="medium" onClick={backToSearch} className={classes.backButton} />
                </Tooltip>
              </Fab>
              <ClickAwayListener onClickAway={hideFilter}>
                <Fab size="small" className={classes.filterGrid}>
                  <Tooltip title={I18n.t("REPORT.COLUMN_LIST")}>
                    <FilterListIcon size="large" className={classes.filterIcon} onClick={filter ? hideFilter : showFilter} />
                  </Tooltip>
                  {filter ? <Filter getFilterQuery={getFilterQuery} /> : null}
                </Fab>
              </ClickAwayListener>
              <Grid item xs={12} className={classes.tableBox}>
                <ReportList columns={columns} />
              </Grid>
            </Grid>
          </>
        }
      </Paper>
    </Grid>
  );
}

export default withStyles(ReportStyles)(Reports);
