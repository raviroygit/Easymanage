/* eslint-disable no-mixed-operators */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AssessmentIcon from '@material-ui/icons/Assessment'
import DashboardIcon from "@material-ui/icons/Dashboard";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import VerifiedUserSharpIcon from "@material-ui/icons/VerifiedUserSharp";
import SystemUpdateIcon from '@material-ui/icons/SystemUpdate';
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import StayPrimaryPortraitIcon from "@material-ui/icons/StayPrimaryPortrait";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import CallIcon from "@material-ui/icons/Call";
import SettingsIcon from "@material-ui/icons/Settings";
import { NavLink } from "react-router-dom";
import { I18n } from "react-redux-i18n";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import { MenuStyles } from "./MenuStyles";
import { makeStyles } from '@material-ui/core/styles';
import { isAuthorized } from '../../../lib/keycloak/Permissions';
import { PERMISSIONS } from '../../../constants/constants';
import Grid from "@material-ui/core/Grid";
import AddToHomeScreenIcon from '@material-ui/icons/AddToHomeScreen';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ListIcon from '@material-ui/icons/List';
import DnsIcon from '@material-ui/icons/Dns';
import { Tooltip } from "@material-ui/core";

const useStyles = makeStyles(MenuStyles);

function MenuList(props) {
  const [open, setOpen] = React.useState(false)
  const [merchant, setMerchant] = React.useState(false)
  const [tools, setTools] = React.useState(false)
  const [userLog, setUserLog] = React.useState(false)
  const [location, setLocation] = React.useState([]);

  const reset = () => {
    setOpen(false);
    setMerchant(false);
    setTools(false);
    setUserLog(false);
  };

  const handleClick = () => {
    setOpen(!open)
  };

  const handleClickMerchant = () => {
    setMerchant(!merchant)
  };

  const handleClickTools = () => {
    setTools(!tools)
  };

  const handleClickUserLog = () => {
    setUserLog(!userLog)
  };
  const classes = useStyles();
  useEffect(() => {
    if (!props.drawerClose) {
      reset();
    }
    if (props.roleLocation && props.roleLocation.length > 0) {
      setLocation(props.roleLocation);
    }
  }, [props.roleLocation, location, props.drawerClose])
  return (
    <div className={classes.sideStyle}>
      {isAuthorized(PERMISSIONS.DASHBOARD) &&
        <NavLink className={classes.link} to="/dashboard" activeClassName={classes.selected}>
          <ListItem button>
            <ListItemIcon className={classes.sidebarIcon}>
              <Tooltip disableHoverListener={props.drawerClose} title={I18n.t("NAVBAR.DASHBOARD")}>
                <DashboardIcon />
              </Tooltip>
            </ListItemIcon>
            <ListItemText primary={I18n.t("NAVBAR.DASHBOARD")} className={classes.sidebarText} />
          </ListItem>
        </NavLink>
      }
      {isAuthorized(PERMISSIONS.TERMINALS) &&
        <Grid className={classes.link}>
          <List
            component="nav"
            aria-labelledby="nested-list-subheader">
            <ListItem button onClick={handleClick}>
              <ListItemIcon className={classes.sidebarIcon}>
                <Tooltip disableHoverListener={props.drawerClose} title={I18n.t("NAVBAR.TERMINALS")}>
                  <StayPrimaryPortraitIcon />
                </Tooltip>
              </ListItemIcon>
              <ListItemText primary={I18n.t("NAVBAR.TERMINALS")} className={classes.sidebarText} />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding >
                <NavLink className={classes.link} to="/terminals" activeClassName={classes.selected}>
                  <ListItem button >
                    <ListItemIcon className={classes.sidebarIcon}>
                      <Tooltip disableHoverListener={props.drawerClose} title={I18n.t("NAVBAR.VIEW_LIST")}>
                        <AddToHomeScreenIcon />
                      </Tooltip>
                    </ListItemIcon>
                    <ListItemText size="large" align="left" primary={I18n.t("NAVBAR.VIEW_LIST")} />
                  </ListItem>
                </NavLink>
              </List>
            </Collapse>
          </List>
        </Grid>}
      {isAuthorized(PERMISSIONS.REPORT) &&
        <NavLink className={classes.link} to='/report' activeClassName={classes.selected}>
          <ListItem button>
            <ListItemIcon className={classes.sidebarIcon}>
              <Tooltip disableHoverListener={props.drawerClose} title={I18n.t('NAVBAR.REPORTS')}>
                <AssessmentIcon />
              </Tooltip>
            </ListItemIcon>
            <ListItemText primary={I18n.t('NAVBAR.REPORTS')} className={classes.sidebarText} />
          </ListItem>
        </NavLink>
      }
      {isAuthorized(PERMISSIONS.DOWNLOAD_UPLOAD) &&
        <NavLink className={classes.link} to="/downloadupload" activeClassName={classes.selected}>
          <ListItem button>
            <ListItemIcon className={classes.sidebarIcon}>
              <Tooltip disableHoverListener={props.drawerClose} title={I18n.t("NAVBAR.DOWNLOAD_AND_UPLOAD")}>
                <ArrowDownwardIcon />
              </Tooltip>
            </ListItemIcon>
            <ListItemText primary={I18n.t("NAVBAR.DOWNLOAD_AND_UPLOAD")} className={classes.sidebarText} />
          </ListItem>
        </NavLink>
      }
      {isAuthorized(PERMISSIONS.APPLICATION) &&
        <NavLink className={classes.link} to='/application' activeClassName={classes.selected}>
          <ListItem button>
            <ListItemIcon className={classes.sidebarIcon}>
              <Tooltip disableHoverListener={props.drawerClose} title={I18n.t('NAVBAR.UPDATE')}>
                <SystemUpdateIcon />
              </Tooltip>
            </ListItemIcon>
            <ListItemText primary={I18n.t('NAVBAR.UPDATE')} className={classes.sidebarText} />
          </ListItem>
        </NavLink>
      }
      {isAuthorized(PERMISSIONS.GROUPS) &&
        <Grid className={classes.link}>
          <ListItem button onClick={handleClickMerchant}>
            <ListItemIcon className={classes.sidebarIcon}>
              <Tooltip disableHoverListener={props.drawerClose} title={I18n.t("NAVBAR.MERCHANTS")}>
                <GroupWorkIcon />
              </Tooltip>
            </ListItemIcon>
            <ListItemText primary={I18n.t("NAVBAR.MERCHANTS")} className={classes.sidebarText} />
            {merchant ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={merchant} timeout="auto" unmountOnExit >
            <List component="div" disablePadding >
              <NavLink className={classes.link} to="/groups" activeClassName={classes.selected}>
                <ListItem button >
                  <ListItemIcon className={classes.sidebarIcon}>
                    <Tooltip disableHoverListener={props.drawerClose} title={I18n.t("NAVBAR.GROUP_LIST")}>
                      <AccountTreeIcon />
                    </Tooltip>
                  </ListItemIcon>
                  <ListItemText size="large" align="left" primary={I18n.t("NAVBAR.GROUP_LIST")} />
                </ListItem>
              </NavLink>
            </List>
          </Collapse>
        </Grid >}
      {isAuthorized(PERMISSIONS.CALL_SETTING) &&
        <NavLink className={classes.link} to="/callsettings" activeClassName={classes.selected}>
          <ListItem button>
            <ListItemIcon className={classes.sidebarIcon}>
              <Tooltip disableHoverListener={props.drawerClose} title={I18n.t("NAVBAR.CALL_SETTINGS")}>
                <CallIcon />
              </Tooltip>
            </ListItemIcon>
            <ListItemText primary={I18n.t("NAVBAR.CALL_SETTINGS")} className={classes.sidebarText} />
          </ListItem>
        </NavLink>
      }
      {isAuthorized(PERMISSIONS.PASSWORD_GENERATOR) &&
        <Grid className={classes.link}>
          <ListItem button onClick={handleClickTools}>
            <ListItemIcon className={classes.sidebarIcon}>
              <Tooltip disableHoverListener={props.drawerClose} title={I18n.t("NAVBAR.TOOLS")}>
                <SettingsIcon />
              </Tooltip>
            </ListItemIcon>
            <ListItemText primary={I18n.t("NAVBAR.TOOLS")} className={classes.sidebarText} />
            {tools ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={tools} timeout="auto" unmountOnExit >
            <List component="div" disablePadding >
              <NavLink className={classes.link} to="/password" activeClassName={classes.selected}>
                <ListItem button >
                  <ListItemIcon className={classes.sidebarIcon}>
                    <Tooltip disableHoverListener={props.drawerClose} title={I18n.t("NAVBAR.PASSWORD_GERNRATE")}>
                      <VpnKeyIcon />
                    </Tooltip>
                  </ListItemIcon>
                  <ListItemText size="large" align="left" primary={I18n.t("NAVBAR.PASSWORD_GERNRATE")} />
                </ListItem>
              </NavLink>
            </List>
          </Collapse>
        </Grid >}
      {isAuthorized(PERMISSIONS.TRANSACTIONS) &&
        <NavLink className={classes.link} to="/transactions" activeClassName={classes.selected}>
          <ListItem button>
            <ListItemIcon className={classes.sidebarIcon}>
              <Tooltip disableHoverListener={props.drawerClose} title={I18n.t("NAVBAR.TRANSECTIONS")}>
                <CompareArrowsIcon />
              </Tooltip>
            </ListItemIcon>
            <ListItemText primary={I18n.t("NAVBAR.TRANSECTIONS")} className={classes.sidebarText} />
          </ListItem>
        </NavLink>
      }
      {isAuthorized(PERMISSIONS.USER_LOGS) || isAuthorized(PERMISSIONS.USER_LIST) ?
        <Grid className={classes.link}>
          <ListItem button onClick={handleClickUserLog}>
            <ListItemIcon className={classes.sidebarIcon}>
              <Tooltip disableHoverListener={props.drawerClose} title={I18n.t("NAVBAR.USER_MANAGEMENT")}>
                <VerifiedUserSharpIcon />
              </Tooltip>
            </ListItemIcon>
            <ListItemText primary={I18n.t("NAVBAR.USER_MANAGEMENT")} className={classes.sidebarText} />
            {userLog ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={userLog} timeout="auto" unmountOnExit >
            <List component="div" disablePadding >
              {isAuthorized(PERMISSIONS.USER_LIST) &&
                <NavLink className={classes.link} to="/userlist" activeClassName={classes.selected}>
                  <ListItem button >
                    <ListItemIcon className={classes.sidebarIcon}>
                      <Tooltip disableHoverListener={props.drawerClose} title={I18n.t("NAVBAR.USER_LIST")}>
                        <ListIcon />
                      </Tooltip>
                    </ListItemIcon>
                    <ListItemText size="large" align="left" primary={I18n.t("NAVBAR.USER_LIST")} />
                  </ListItem>
                </NavLink>
              }
            </List>
            <List component="div" disablePadding >
              {isAuthorized(PERMISSIONS.USER_LOGS) &&
                <NavLink className={classes.link} to="/userlogs" activeClassName={classes.selected}>
                  <ListItem button >
                    <ListItemIcon className={classes.sidebarIcon}>
                      <Tooltip disableHoverListener={props.drawerClose} title={I18n.t("NAVBAR.USER_ACCESS_LOG")}>
                        <DnsIcon />
                      </Tooltip>
                    </ListItemIcon>
                    <ListItemText size="large" align="left" primary={I18n.t("NAVBAR.USER_ACCESS_LOG")} />
                  </ListItem>
                </NavLink>
              }
            </List>
          </Collapse>
        </Grid > : null}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    language: state.language,
    i18n: state.i18n,
    permission: state.permission
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuList);