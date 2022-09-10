import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { I18n } from "react-redux-i18n";
import { TerminalDetailStyle } from "./TerminalDetailStyle";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {
  Tabs,
  Tab,
  Box,
  Paper,
  Fab,
  Typography,
  Grid,
  ListItemText,
  Card,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { TERMINALS_PATH, TERMINAL_GRAPH_COLOR_FOR_AVAILABLE, TERMINAL_GRAPH_COLOR_FOR_USED } from "../../../constants/constants";
import TerminalAccessLogs from "../../containers/Terminal/TerminalAccessLogs";
import { getAccessLogsByTerminalId } from "../../../redux/actions/Logs/GetLogsByTerminalId";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllLog,
  getAllLogReset,
} from "../../../redux/actions/Logs/GetAllLog";
import {
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Label,
} from "recharts";
import { useTheme } from "@material-ui/styles";
import { getApplicationByTerminalId, resetApplicationByTerminalId } from '../../../redux/actions/Application/getApplicationByTerminalId';
import { DataGrid } from '@material-ui/data-grid';
import { loadApplication } from '../../../redux/actions/Application/ApplicationListAction';
import Checkbox from '@material-ui/core/Checkbox';
import { addCall } from "../../../redux/actions/CallSetting/CallSettingAction";

const useStyles = makeStyles(TerminalDetailStyle);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Grid
      role="tabpanel"
      hidden={value !== index}
      id={`terminal-details-${index}`}
      aria-labelledby={`terminal-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </Grid>
  );
}

function TerminalDetail({
  serialNumber,
  systemIdentifier,
  terminalModel,
  manufacturer,
  appVersion,
  kernelVersion,
  osVersion,
  acquirerIPAddress,
  acquiredPort,
  TLS,
  blackListVersion,
  operatorName,
  apn,
  simSerialNo,
  merchantName,
  address,
  city,
  createdAt,
  updatedAt,
  ram,
  diskSpace,
  group,
  subGroup,
  lastCallDate,
}) {
  const theme = useTheme();
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = React.useState(0);
  const [isLogs, setIsLogs] = React.useState(false);
  const [rows, setRows] = useState([]);
  let [rowId, setRowId] = useState(1);
  const [pendingApps, setPendingApp] = useState([]);
  const [checkedApps, setCheckedApps] = useState([]);

  const dispatch = useDispatch();
  const { id } = useParams();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleReturn = () => {
    let path = TERMINALS_PATH;
    history.push(path);
    dispatch(getAllLogReset());
    dispatch(resetApplicationByTerminalId());
  };

  const dataRam = [
    {
      name: I18n.t("TERMINAL.TERMINAL_DETAIL.USED_RAM"),
      value: ram,
      fill: TERMINAL_GRAPH_COLOR_FOR_USED,
    },
    {
      name: I18n.t("TERMINAL.TERMINAL_DETAIL.FREE_RAM"),
      value: 100 - ram,
      fill: TERMINAL_GRAPH_COLOR_FOR_AVAILABLE,
    },
  ];

  const dataDisk = [
    {
      name: I18n.t("TERMINAL.TERMINAL_DETAIL.DISK_SPACE"),
      value: diskSpace,
      fill: TERMINAL_GRAPH_COLOR_FOR_USED,
    },
    {
      name: I18n.t("TERMINAL.TERMINAL_DETAIL.FREE_SPACE"),
      value: 100 - diskSpace,
      fill: TERMINAL_GRAPH_COLOR_FOR_AVAILABLE,
    },
  ];

  const logsDetails = () => {
    setIsLogs(false);
    dispatch(getAccessLogsByTerminalId({ id: id }));
  };

  const getAllLogs = () => {
    dispatch(getAllLog(id));
    setIsLogs(true);
  };

  const getApps = () => {
    dispatch(getApplicationByTerminalId(id));
    dispatch(loadApplication());
    setRowsN();
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 95 },
    {
      field: 'logo',
      headerName: 'App',
      width: 110,
      editable: true,
      renderCell: (app) => <img alt="logo" style={{ borderRadius: "20%" }} width='60' height='60' src={`data:image/jpeg;base64,${app.value}`} />
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 110,
      editable: true,
    },
    {
      field: 'size',
      headerName: 'Size',
      width: 110,
      editable: true,
      renderCell: (size) => <span>{parseInt(size.value)} MB</span>
    },
    {
      field: 'version',
      headerName: 'Version',
      width: 130,
      editable: true,
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 130,
      editable: true,
    },
  ];



  const logsByTerminalId = useSelector((state) => state.logsByTerminalId);
  const logs = useSelector((state) => state.logs);
  const terminalApps = useSelector(state => state.terminalApps);
  const applications = useSelector(state => state.applications);


  useEffect(() => {
    if (terminalApps && terminalApps.length === 0) {
      if (applications && applications.length > 0) {
        setPendingApp(applications);
      };
    };
    setRowsN();

  }, [terminalApps, applications, terminalApps, setRowsN]);

  const setRowsN = () => {
    if (terminalApps && terminalApps.length > 0) {
      let apps = [];
      terminalApps.map(x => (
        apps.push({ id: rowId++, logo: x.logo, title: x.title, size: x.size, version: x.version, type: x.type })
      ));
      setRows(apps);
      if (applications && applications.length > 0) {
        const presentApps = terminalApps.map(x => { return x._id });
        const apps = applications.filter(x => !presentApps.includes(x._id));
        setPendingApp(apps);
      }
    };
  };


  const handleCheckPublishApp = (e) => {
    if (e.target.checked) {
      setCheckedApps([...checkedApps, e.target.id]);
    } else {
      if (checkedApps && checkedApps.length === 1) {
        checkedApps.splice(checkedApps.indexOf(e.target.id), 1);
        setCheckedApps([])
      } else {
        checkedApps.splice(checkedApps.indexOf(e.target.id), 1);
      }
    };
  };

  const handlePublishApps = () => {
    const file = applications && applications.length > 0 && applications.filter(x => {
      if (checkedApps[0] === x._id) {
        return x.name;
      }
    });
    let callData = {
      startDateTime: new Date(new Date().setMinutes(new Date().getMinutes() + 5)),
      endDateTime: new Date(new Date().setMinutes(new Date().getMinutes() + 35)),
      type: "Application",
      executeOn: "terminal",
      terminalSerialNumber: [serialNumber],
      file: file && file.length > 0 ? file[0].name : "",
    };
    dispatch(addCall(callData));
  };

  return (
    <Paper className={classes.root}>
      <Grid className={classes.tabRow}>
        <Fab size="small" className={classes.redirect}>
          <ArrowBackIosIcon size="large" onClick={handleReturn} className={classes.backButton} />
        </Fab>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
          className={classes.tabStyles}
          initialselectedindex={value}
        >

          <Tab label={I18n.t("TERMINAL.TERMINAL_DETAIL.TERMINAL_DETAIL")} />
          <Tab
            label={I18n.t("TERMINAL.TERMINAL_DETAIL.CALL_HISTORY")}
            onClick={logsDetails}
          />
          <Tab
            className={classes.tab}
            label={I18n.t("TERMINAL.TERMINAL_DETAIL.LOGS")}
            onClick={getAllLogs}
          />
          <Tab
            className={classes.tab}
            label={I18n.t("TERMINAL.TERMINAL_DETAIL.APPS_KERNEL")}
            onClick={getApps}
          />
        </Tabs>
      </Grid>
      <TabPanel value={value} index={0} className={classes.tabBox}>
        <Grid container className={classes.root2}>
          <Grid item md="auto" className={classes.card}>
            <Typography className={classes.technicalText}>
              {I18n.t("TERMINAL.TERMINAL_DETAIL.TECHNICAL_DETAIL")}
            </Typography>
            <Grid container spacing={2}>
              <Grid item md={4} sm={6} xs={6}>
                <ListItemText
                  className={classes.listTextStyle}
                  primary={`${I18n.t(
                    "TERMINAL.TERMINAL_DETAIL.SERIAL_NUMBER"
                  )}`}
                  secondary={serialNumber}
                />
              </Grid>
              <Grid item md={4} sm={6} xs={6}>
                <ListItemText
                  className={classes.listTextStyle}
                  primary={`${I18n.t("TERMINAL.TERMINAL_DETAIL.ID")}`}
                  secondary={systemIdentifier}
                />
              </Grid>
              <Grid item md={4} sm={6} xs={6}>
                <ListItemText
                  className={classes.listTextStyle}
                  primary={`${I18n.t("TERMINAL.TERMINAL_DETAIL.MODEL")}`}
                  secondary={terminalModel}
                />
              </Grid>

              <Grid item md={4} sm={6} xs={6}>
                <ListItemText
                  className={classes.listTextStyle}
                  primary={`${I18n.t("TERMINAL.TERMINAL_DETAIL.MANUFACTURER")}`}
                  secondary={manufacturer}
                />
              </Grid>
              <Grid item md={4} sm={6} xs={6}>
                <ListItemText
                  className={classes.listTextStyle}
                  primary={`${I18n.t(
                    "TERMINAL.TERMINAL_DETAIL.ANDROID_VERSION"
                  )}`}
                  secondary={osVersion}
                />
              </Grid>
              <Grid item md={4} sm={6} xs={6}>
                <ListItemText
                  className={classes.listTextStyle}
                  primary={`${I18n.t(
                    "TERMINAL.TERMINAL_DETAIL.KERNEL_VERSION"
                  )}`}
                  secondary={kernelVersion}
                />
              </Grid>
              <Grid item md={4} sm={6} xs={6}>
                <ListItemText
                  className={classes.listTextStyle}
                  primary={`${I18n.t("TERMINAL.TERMINAL_DETAIL.CIB_VERSION")}`}
                  secondary={appVersion}
                />
              </Grid>
              <Grid item md={4} sm={6} xs={6}>
                <ListItemText
                  className={classes.listTextStyle}
                  primary={`${I18n.t(
                    "TERMINAL.TERMINAL_DETAIL.ACQUIRER_IP_ADDRESS"
                  )}`}
                  secondary={acquirerIPAddress}
                />
              </Grid>
              <Grid item md={4} sm={6} xs={6}>
                <ListItemText
                  className={classes.listTextStyle}
                  primary={`${I18n.t(
                    "TERMINAL.TERMINAL_DETAIL.ACQUIRER_PORT"
                  )}`}
                  secondary={acquiredPort}
                />
              </Grid>
              <Grid item md={4} sm={6} xs={6}>
                <ListItemText
                  className={classes.listTextStyle}
                  primary={`${I18n.t("TERMINAL.TERMINAL_DETAIL.TLS")}`}
                  secondary={TLS}
                />
              </Grid>
              <Grid item md={4} sm={6} xs={6}>
                <ListItemText
                  className={classes.listTextStyle}
                  primary={`${I18n.t(
                    "TERMINAL.TERMINAL_DETAIL.BLACKLIST_VERSION"
                  )}`}
                  secondary={blackListVersion}
                />
              </Grid>
              <Grid item md={4} sm={6} xs={6}>
                <ListItemText
                  className={classes.listTextStyle}
                  primary={`${I18n.t(
                    "TERMINAL.TERMINAL_DETAIL.OPERATOR_NAME"
                  )}`}
                  secondary={operatorName}
                />
              </Grid>
              <Grid item md={4} sm={6} xs={6}>
                <ListItemText
                  className={classes.listTextStyle}
                  primary={`${I18n.t("TERMINAL.TERMINAL_DETAIL.APN")}`}
                  secondary={apn}
                />
              </Grid>
              <Grid item md={4} sm={6} xs={6}>
                <ListItemText
                  className={classes.listTextStyle}
                  primary={`${I18n.t(
                    "TERMINAL.TERMINAL_DETAIL.SIM_SERIAL_NUMBER"
                  )}`}
                  secondary={simSerialNo}
                />
              </Grid>
              <Grid item md={4} sm={6} xs={6}>
                <ListItemText
                  className={classes.listTextStyle}
                  primary={`${I18n.t(
                    "TERMINAL.TERMINAL_DETAIL.MERCHANT_NAME"
                  )}`}
                  secondary={merchantName}
                />
              </Grid>
              <Grid item md={4} sm={6} xs={6}>
                <ListItemText
                  className={classes.listTextStyle}
                  primary={`${I18n.t("TERMINAL.TERMINAL_DETAIL.GROUP")}`}
                  secondary={group}
                />
              </Grid>
              <Grid item md={4} sm={6} xs={6}>
                <ListItemText
                  className={classes.listTextStyle}
                  primary={`${I18n.t("TERMINAL.TERMINAL_DETAIL.SUB_GROUP")}`}
                  secondary={subGroup}
                />
              </Grid>
              <Grid item md={4} sm={6} xs={6}>
                <ListItemText
                  className={classes.listTextStyle}
                  primary={`${I18n.t("TERMINAL.TERMINAL_DETAIL.ADDRESS")}`}
                  secondary={address}
                />
              </Grid>
              <Grid item md={4} sm={6} xs={6}>
                <ListItemText
                  className={classes.listTextStyle}
                  primary={`${I18n.t("TERMINAL.TERMINAL_DETAIL.CITY")}`}
                  secondary={city}
                />
              </Grid>
              <Grid item md={4} sm={6} xs={6}>
                <ListItemText
                  className={classes.listTextStyle}
                  primary={`${I18n.t("TERMINAL.TERMINAL_DETAIL.CREATED_TIME")}`}
                  secondary={createdAt}
                />
              </Grid>
              <Grid item md={4} sm={6} xs={6}>
                <ListItemText
                  className={classes.listTextStyle}
                  primary={`${I18n.t(
                    "TERMINAL.TERMINAL_DETAIL.LAST_CALL_DATE"
                  )}`}
                  secondary={lastCallDate}
                />
              </Grid>
              <Grid item md={4} sm={6} xs={6}>
                <ListItemText
                  className={classes.listTextStyle}
                  primary={`${I18n.t("TERMINAL.TERMINAL_DETAIL.UPDATED_AT")}`}
                  secondary={updatedAt}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item md="auto" className={classes.card1}>
            <Typography className={classes.pieCard}>{`${I18n.t(
              "TERMINAL.TERMINAL_DETAIL.TERMINAL_MONITOR"
            )}`}</Typography>
            <Grid xs="auto" className={classes.doughnutGrid}>
              <Typography className={classes.listText}>{`${I18n.t(
                "TERMINAL.TERMINAL_DETAIL.RAM"
              )}`}</Typography>
              <Grid className={classes.root3}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dataRam}
                      cx="50%"
                      cy="50%"
                      innerRadius={"60%"}
                      outerRadius={"80%"}
                      fill={theme.palette.primary}
                      dataKey="value"
                    >
                      <Label fill={dataRam[0].fill} width={30} position="center">{`${dataRam[0].value}% Used`}</Label>
                    </Pie>
                    <Legend verticalAlign="bottom" height={0} />
                  </PieChart>
                </ResponsiveContainer>
              </Grid>
            </Grid>
            <Grid xs="auto" className={classes.doughnutGrid}>
              <Typography className={classes.listText}>{`${I18n.t(
                "TERMINAL.TERMINAL_DETAIL.DISK_SPACE"
              )}`}</Typography>
              <Grid className={classes.root3}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dataDisk}
                      cx="50%"
                      cy="50%"
                      innerRadius={"60%"}
                      outerRadius={"80%"}
                      fill={theme.palette.primary}
                      dataKey="value"
                    >
                      <Label fill={dataDisk[0].fill} width={30} position="center">{`${dataDisk[0].value}% Used`}</Label>
                    </Pie>
                    <Legend verticalAlign="bottom" height={0} />
                  </PieChart>
                </ResponsiveContainer>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.tabBox}>
        <TerminalAccessLogs id={id} logs={logsByTerminalId} isLogs={isLogs} />
      </TabPanel>
      <TabPanel value={value} index={2} className={classes.tabBox}>
        <TerminalAccessLogs id={id} logs={logs} isLogs={isLogs} />
      </TabPanel>
      <TabPanel value={value} index={3} >
        <Grid container spacing={3}>
          <Grid item xs={8} sm={8}>
            <div style={{ height: "31rem", width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
              />
            </div>
          </Grid>
          <Grid item xs={4} sm={4} >
            <Button onClick={handlePublishApps} disabled={checkedApps && checkedApps.length > 0 ? false : true} color="primary" variant="contained" style={{ display: 'flex', width: "100%" }}>
              <Typography style={{ display: 'flex', justifyContent: "center" }}> {I18n.t("TERMINAL.TERMINAL_DETAIL.PUBLISH_BUTTON")} </Typography>
            </Button>
            <Card className={classes.cardApps}>
              {
                pendingApps && pendingApps.length > 0 && pendingApps.map((app) => (
                  <Card style={{ width: "100%", marginBottom: "5px" }}>
                    <Grid container >
                      <Grid item xs={2} sm={2}>
                        <Checkbox
                          id={app._id}
                          key={app._id}
                          onClick={handleCheckPublishApp}
                        />
                      </Grid>
                      <Grid item xs={2} sm={2}>
                        <Card style={{ width: "50px" }}>
                          <img width='50' height='40' style={{ boarderRadius: "50%" }} src={`data:image/jpeg;base64,${app.logo}`} alt="app" />
                        </Card>
                      </Grid>
                      <Grid xs={7} sm={7} style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>
                        <Typography id={app._id} >{app.title}</Typography>
                      </Grid>
                    </Grid>
                  </Card>
                ))
              }

            </Card>
          </Grid>
        </Grid>
      </TabPanel>
    </Paper >
  );
}

export default TerminalDetail;
