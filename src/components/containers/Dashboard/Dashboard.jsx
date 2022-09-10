import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { I18n } from "react-redux-i18n";
import {
  withStyles,
  Typography,
  Grid,
  Paper,
} from "@material-ui/core";

import { DashBoardStyle, MenuProps } from "./DashBoardStyle";
import { dashboardDetails, dashboardReset } from "../../../redux/actions/Dashboard/DashboardDetails";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import {
  DASHBOARD_PIE_COLOR, LIMIT_FOR_GROUP_CHART, GROUP_TYPE
} from "../../../constants/constants";

import DashboardMap from "./DashboardMap";
import { GetUserAssociatedGroups } from '../../../lib/keycloak/GetUserAssociateGroupOrSubgroups';
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Legend } from "recharts";
import RechartCustomLabel from "../../presentation/Rechart/RechartCustomLabel";

class Dashboard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      changeMonths: 0,
      groupType: "bank",
      modelValue: [],
      groupValue: [],
      statusValue: [],
      userGroup: "",
      activeIndex: 0,
      activeIndexModel: 0,
    };
  }


  componentDidMount() {
    if (this.props.loginUserAssociateGroups && this.props.loginUserAssociateGroups.length > 0 && this.props.loginUserAssociateGroups[0].name) {
      this.terminalStatusCount(this.state.changeMonths, { groupName: this.props.loginUserAssociateGroups[0].name });
    }
  }


  componentDidUpdate(prevProps, prevState) {
    if (this.props.loginUserAssociateGroups && JSON.stringify(this.props.loginUserAssociateGroups) !== JSON.stringify(prevProps.loginUserAssociateGroups)) {
      this.terminalStatusCount(this.state.changeMonths, GetUserAssociatedGroups());
    }

    if (this.props.dashboardData && this.props.dashboardData !== prevProps.dashboardData) {
      const modelValue = [];
      const groupValue = [];
      for (let i in this.props.dashboardData.dashboardModel) {
        if (this.props.dashboardData.dashboardModel[i]._id === null) {
          modelValue.push({
            name: "Other",
            value: this.props.dashboardData.dashboardModel[i].count,
          });
        } else {
          modelValue.push({
            name: this.props.dashboardData.dashboardModel[i]._id,
            value: this.props.dashboardData.dashboardModel[i].count,
          });
        }
      }
      for (let i in this.props.dashboardData.dashboardGroups) {
        if (i > LIMIT_FOR_GROUP_CHART) {
          break;
        }
        if (
          this.state.groupType ===
          this.props.dashboardData.dashboardGroups[i].type
        ) {
          groupValue.push({
            name: this.props.dashboardData.dashboardGroups[i].name,
            value: this.props.dashboardData.dashboardGroups[i].terminalCount,
          });
        }
      }
      this.setState({
        modelValue: modelValue,
        groupValue: groupValue,
        statusValue: [
          {
            name: "Active Terminals",
            value: this.props.dashboardData.dashboardStatus && this.props.dashboardData.dashboardStatus.activeTerminals ?
              this.props.dashboardData.dashboardStatus.activeTerminals : 0
          },
          {
            name: "Inactive Terminals",
            value: this.props.dashboardData.dashboardStatus && this.props.dashboardData.dashboardStatus.inactiveTerminals ?
              this.props.dashboardData.dashboardStatus.inactiveTerminals : 0
          },
        ],
      });
    }
  }

  terminalStatusCount = (value) => {
    if (value > 0) {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() - value;
      let data = {
        startDate: new Date(currentDate.setMonth(currentMonth)),
        endDate: new Date(),
        groupName: GetUserAssociatedGroups().groupName,
        isParent: GetUserAssociatedGroups().isParent
      }
      this.props.getDashboardDetail(data)
    } else {
      this.props.getDashboardDetail(GetUserAssociatedGroups())
    }
  };

  handleDateChange = (event) => {
    this.setState({ changeMonths: event.target.value })
    this.terminalStatusCount(event.target.value, this.state.userGroup)
  };

  handleRefresh = () => {
    this.setState({ changeMonths: 1 })
    this.terminalStatusCount(this.state.changeMonths, this.state.userGroup);
  };

  handleGroupType = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    const groupValue = [];
    for (let i in this.props.dashboardData.dashboardGroups) {
      if (i > LIMIT_FOR_GROUP_CHART) {
        break;
      }
      if (
        event.target.value === this.props.dashboardData.dashboardGroups[i].type
      ) {
        groupValue.push({
          name: this.props.dashboardData.dashboardGroups[i].name,
          value: this.props.dashboardData.dashboardGroups[i].terminalCount
        });
      }
    }
    this.setState({
      groupValue: groupValue,
    });
  };

  onPieEnter = (enter, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  onPieEnterModel = (enter, index) => {
    this.setState({
      activeIndexModel: index,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.dashboardPaper} sx={{ flexGrow: 1 }}>
        <Grid container className={classes.mainContainer}>
          <Grid item xs="auto" className={classes.mapContainer}>
            <DashboardMap />
          </Grid>
          <Grid item xs="auto" className={classes.statusContainer}>
            <Grid className={classes.modelTextBox}>
              <Typography className={classes.modelHeading}>
                {I18n.t("DASH_BOARD.TERMINAL_STATISTICS")}
              </Typography>
              <Select
                id="dateDurationSelector"
                value={this.state.changeMonths}
                onChange={this.handleDateChange}
                displayEmpty
                className={classes.groupType}
                MenuProps={MenuProps}
              >
                <MenuItem key={1} value={1}>
                  {I18n.t("DASH_BOARD.ONE_MONTHS")}
                </MenuItem>
                <MenuItem key={3} value={3}>
                  {I18n.t("DASH_BOARD.THREE_MONTHS")}
                </MenuItem>
                <MenuItem key={6} value={6}>
                  {I18n.t("DASH_BOARD.SIX_MONTHS")}
                </MenuItem>
                <MenuItem key={0} value={0}>
                  {I18n.t("DASH_BOARD.ALL")}
                </MenuItem>
              </Select>
            </Grid>
            <Grid className={classes.statsPie}>
              <ResponsiveContainer className={classes.graphContainer}>
                <PieChart >
                  <Pie
                    activeIndex={this.state.activeIndex}
                    onMouseEnter={this.onPieEnter}
                    data={this.state.statusValue}
                    cx="50%"
                    cy="50%"
                    innerRadius={"60%"}
                    outerRadius={"80%"}
                    fill={this.props.theme.palette.primary}
                    dataKey="value"
                    paddingAngle={5}
                    activeShape={RechartCustomLabel}
                  >
                    {this.state.statusValue.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          DASHBOARD_PIE_COLOR[
                          index % DASHBOARD_PIE_COLOR.length
                          ]
                        }
                      />
                    ))}
                  </Pie>
                  <Legend verticalAlign="bottom" height={16} />
                </PieChart>
              </ResponsiveContainer>
            </Grid>
          </Grid>
          <Grid item xs="auto" className={classes.groupContainer}>
            <Grid className={classes.modelTextBox}>
              <Typography className={classes.modelHeading}>
                {I18n.t("DASH_BOARD.GROUP_DISTRIBUTION")}
              </Typography>
              <Select
                className={classes.groupType}
                required
                id="group-type"
                name="groupType"
                MenuProps={MenuProps}
                value={this.state.groupType}
                onChange={(e) => this.handleGroupType(e)}
              >
                {GROUP_TYPE.map(type => (
                  <MenuItem className={classes.type} key={type} value={type}>
                    {I18n.t(`GROUP.${type.toUpperCase()}`)}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid className={classes.groupBarBox}>
              <ResponsiveContainer className={classes.graphContainer}>
                <BarChart className={classes.barChart} data={this.state.groupValue}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="value" barSize={50} fill={this.props.theme.palette.primary} >
                    {this.state.groupValue.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          DASHBOARD_PIE_COLOR[
                          index % DASHBOARD_PIE_COLOR.length
                          ]
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Grid>
          </Grid>
          <Grid item xs="auto" className={classes.modelContainer}>
            <Grid className={classes.modelTextBox}>
              <Typography className={classes.modelHeading}>
                {I18n.t("DASH_BOARD.MODEL_DISTRIBUTION")}
              </Typography>
            </Grid>
            <Grid className={classes.modelPieBox}>
              <ResponsiveContainer className={classes.graphContainer}>
                <PieChart >
                  <Pie
                    activeIndex={this.state.activeIndexModel}
                    onMouseEnter={this.onPieEnterModel}
                    data={this.state.modelValue}
                    cx="50%"
                    cy="50%"
                    innerRadius={"60%"}
                    outerRadius={"80%"}
                    fill={this.props.theme.palette.primary}
                    dataKey="value"
                    paddingAngle={5}
                    activeShape={RechartCustomLabel}
                  >
                    {this.state.modelValue.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          DASHBOARD_PIE_COLOR[
                          index % DASHBOARD_PIE_COLOR.length
                          ]
                        }
                      />
                    ))}
                  </Pie>
                  <Legend verticalAlign="bottom" height={16} />
                </PieChart>
              </ResponsiveContainer>
            </Grid>
          </Grid>
        </Grid >
      </Paper >
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getDashboardDetail: dashboardDetails,
      dashboardReset: dashboardReset
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    i18n: state.i18n,
    dashboardData: state.dashboardDetails,
    loginUserAssociateGroups: state.loginUserAssociateGroups
  };
}

Dashboard.propTypes = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(DashBoardStyle, { withTheme: true })(Dashboard));
