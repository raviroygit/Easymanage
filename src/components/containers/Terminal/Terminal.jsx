import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { I18n } from "react-redux-i18n";
import { Edit as EditIcon, Add as AddIcon, Backup as ImportIcon, Settings as UserPermissionManagement } from "@material-ui/icons";
import DataTable from "../../presentation/DataTable/DataTable";
import { Paper, withStyles, Grid, Fab } from "@material-ui/core";
import { enqueueSnackbar } from "../../../redux/actions/Notifier/NotifierAction";
import { loadTerminals, terminalReset } from "../../../redux/actions/Terminals/TerminalsListAction";
import TerminalDialog from "./TerminalDialog";
import ImportTerminal from "./ImportTerminal";
import { TerminalStyles } from "./TerminalStyles";
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";
import ResetPasswordDialog from "./ResetPasswordDialog";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { Redirect } from "react-router";
import { terminalDetailId } from "../../../redux/actions/Terminals/TerminalDetailId";
import Tooltip from '@material-ui/core/Tooltip';
import { isAuthorized } from '../../../lib/keycloak/Permissions';
import { ACTIVE, DELETE, PASSIVE, PERMISSIONS } from '../../../constants/constants';
import AasDialog from "./AasDialog";
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import DeleteIcon from '@material-ui/icons/Delete';
import SignalWifi4BarIcon from '@material-ui/icons/SignalWifi4Bar';
import SignalWifiOffIcon from '@material-ui/icons/SignalWifiOff';
import MoveToInboxIcon from '@material-ui/icons/MoveToInbox';
import BuildIcon from '@material-ui/icons/Build';
import GraphicEqIcon from '@material-ui/icons/GraphicEq';
import MoveDialog from "./MoveDialog";
import ActivePassiveDeleteDialog from "./ActivePassiveDeleteDialog";
import { GetUserAssociatedGroups } from '../../../lib/keycloak/GetUserAssociateGroupOrSubgroups';
import { loginUserAssociateGroupsReset } from '../../../redux/actions/Group/getLoginUserAssociateGroups';

class Terminal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      terminalId: "",
      selectedSerialNo: "",
      isResetDialogOpen: false,
      importOpen: false,
      isMoveOpen: false,
      statusButton: true,
      terminalIds: [],
      display: false,
      isEdit: false,
      isAasOpen: false,
      openDial: false,
      hidden: true,
      alertBoxOpen: false,
      alertBoxTitle: "",
      alertBoxContent: "",
      alertBoxName: "",
      actionsDial: [],
    };
  }


  componentDidMount() {
    if (this.props.loginUserAssociateGroups && this.props.loginUserAssociateGroups.length > 0) {
      this.props.loadTerminals(GetUserAssociatedGroups());
    }
  }

  handleDelete = (e, id) => {
    e.stopPropagation();
  };

  handleEdit = (e, id) => {
    this.setState({
      openDialog: true,
      terminalId: id,
      isEdit: true
    });
    e.stopPropagation();
  };

  routeChange = (e, id) => {
    this.props.terminalDetailid(id);
    this.setState({
      terminalId: id,
      redirect: true,
    });
    e.stopPropagation();
  };

  handleClose = () => {
    this.setState({
      openDialog: false,
      terminalId: "",
    });
  };

  handleImportOpen = () => {
    this.setState({
      importOpen: true,
    });
  };

  handleRegisterDialogOpen = () => {
    this.setState({
      openDialog: true,
      isEdit: false
    })
  }
  handleImportClose = () => {
    this.setState({
      importOpen: false,
    });
  };

  handleResetPassword = (e, id) => {
    let selectedTerminal = this.props.terminals.find((x) => x._id === id);
    if (selectedTerminal) {
      this.setState({
        isResetDialogOpen: true,
        selectedSerialNo: selectedTerminal.serialNumber,
      });
    }
    e.stopPropagation();
  };

  handleResetPasswordClose = () => {
    this.setState({
      isResetDialogOpen: false,
      selectedSerialNo: "",
    });
  };

  handleAasClose = () => {
    this.setState({
      isAasOpen: false
    });
  };

  handleOpenDial = () => {
    this.setState({
      openDial: true
    });
  };

  handleCloseDial = () => {
    this.setState({
      openDial: false
    });
  };

  handleDialActive = () => {
    this.setState({
      alertBoxOpen: true,
      alertBoxTitle: I18n.t("TERMINAL.ALERT.ACTIVATE.TITLE"),
      alertBoxContent: I18n.t("TERMINAL.ALERT.ACTIVATE.CONTENT"),
      alertBoxName: ACTIVE,
    });
  }
  handleDialPassive = () => {
    this.setState({
      alertBoxOpen: true,
      alertBoxTitle: I18n.t("TERMINAL.ALERT.DISABLE.TITLE"),
      alertBoxContent: I18n.t("TERMINAL.ALERT.DISABLE.CONTENT"),
      alertBoxName: PASSIVE,
    });
  }
  handleDialDelete = () => {
    this.setState({
      alertBoxOpen: true,
      alertBoxTitle: I18n.t("TERMINAL.ALERT.DELETE.TITLE"),
      alertBoxContent: I18n.t("TERMINAL.ALERT.DELETE.CONTENT"),
      alertBoxName: DELETE,
    });
  }

  handleDialAasSetting = () => {
    this.setState({
      isAasOpen: true
    });
  };

  handleDialApnSetting = () => {

  }
  handleDialMove = () => {
    this.setState({
      isMoveOpen: true
    });
  }

  handleMoveClose = () => {
    this.setState({
      isMoveOpen: false,
    });
  };

  handleAlertClose = () => {
    this.setState({
      alertBoxOpen: false,
      alertBoxTitle: "",
      alertBoxContent: "",
      alertBoxName: "",
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.loginUserAssociateGroups && JSON.stringify(this.props.loginUserAssociateGroups) !== JSON.stringify(prevProps.loginUserAssociateGroups)) {
      this.props.loadTerminals(GetUserAssociatedGroups());
    }
  }
  onSelectionChange = (elm) => {
    if (this.props.selectedList.length > 0) {
      this.setState({ hidden: false });
    } else {
      this.setState({ hidden: true });
    }
    if (elm.length > 0) {
      const actions = []
      if (isAuthorized(PERMISSIONS.ACTIVATE_TERMINAL)) {
        actions.push({ icon: <SignalWifi4BarIcon />, name: I18n.t("DATA_TABLE.ACTIVE"), action: this.handleDialActive })
      }
      if (isAuthorized(PERMISSIONS.DEACTIVATE_TERMINAL)) {
        actions.push({ icon: <SignalWifiOffIcon />, name: I18n.t("DATA_TABLE.DISABLE"), action: this.handleDialPassive })
      }
      if (isAuthorized(PERMISSIONS.DELETE_TERMINAL)) {
        actions.push({ icon: <DeleteIcon />, name: I18n.t("DATA_TABLE.DELETE"), action: this.handleDialDelete })
      }
      if (isAuthorized(PERMISSIONS.AAS_SETTING)) {
        actions.push({ icon: <BuildIcon />, name: I18n.t("DATA_TABLE.AAS_SETTING"), action: this.handleDialAasSetting })
      }
      if (isAuthorized(PERMISSIONS.APN_SETTING)) {
        actions.push({ icon: <GraphicEqIcon />, name: I18n.t("DATA_TABLE.APN_SETTING"), action: this.handleDialApnSetting })
      }
      if (isAuthorized(PERMISSIONS.MOVE_GROUPS)) {
        actions.push({ icon: <MoveToInboxIcon />, name: I18n.t("DATA_TABLE.MOVE_GROUPS"), action: this.handleDialMove })
      }
      this.setState({
        hidden: false,
        actionsDial: actions,
      });

    } else {
      this.setState({
        hidden: true
      });
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect push to={`/terminaldetail/${this.state.terminalId}`} />;
    } else {
      const columns = [
        {
          name: `${I18n.t("TERMINAL.SERIAL_NUMBER")}`,
          selector: "serialNumber",
          type: "link",
          clickHandler: this.routeChange,
        },
        {
          name: `${I18n.t("TERMINAL.TERMINAL_ID")}`,
          selector: "systemIdentifier",
        },
        {
          name: `${I18n.t("TERMINAL.TERMINAL_MODEL")}`,
          selector: "terminalModel",
        },
        {
          name: `${I18n.t("TERMINAL.GROUP_NAME")}`,
          selector: "merchantName",
        },
        {
          name: `${I18n.t("TERMINAL.CITY")}`,
          selector: "city",
        },
        {
          name: `${I18n.t("TERMINAL.CREATED_TIME")}`,
          type: "date",
          selector: "createdAt",
        },
        {
          name: `${I18n.t("TERMINAL.STATUS")}`,
          selector: "status",
        },

      ];
      const action = {
        name: `${I18n.t("FORM.ACTIONS")}`,
        type: "actions",
        actions: [
          {
            name: I18n.t("MISC.DETAIL"),
            handler: this.routeChange,
            icon: <ListAltIcon />,
          },
        ],
      };
      if (isAuthorized(PERMISSIONS.UPDATE_TERMINAL)) {
        action.actions.push({
          name: I18n.t("MISC.EDIT"),
          handler: this.handleEdit,
          icon: <EditIcon />,
        })
      }
      if (isAuthorized(PERMISSIONS.RESET_PASSWORD_TERMINAL)) {
        action.actions.push({
          name: I18n.t("MISC.RESET_PASSWORD"),
          handler: this.handleResetPassword,
          icon: <SettingsBackupRestoreIcon />,
        })
      }

      columns.push(action);
      const { classes } = this.props;

      return (
        <>
          <Paper className={classes.TerminalPaper}>
            {isAuthorized(PERMISSIONS.ADD_NEW_TERMINAL) &&
              <Fab size="small" className={classes.groupButtonStyleAdd}>
                <Tooltip title={I18n.t("TERMINAL.ADD_NEW_TERMINAL")}>
                  <AddIcon size="large" onClick={this.handleRegisterDialogOpen} />
                </Tooltip>
              </Fab>
            }
            {isAuthorized(PERMISSIONS.IMPORT_TERMINAL) &&
              <Fab size="small" className={classes.groupButtonStyle}>
                <Tooltip title={I18n.t("TERMINAL.IMPORT_LIST")}>
                  <ImportIcon size="large" onClick={this.handleImportOpen} />
                </Tooltip>
              </Fab>
            }
            <SpeedDial
              ariaLabel="Terminal-SpeedDial"
              className={classes.speedDial}
              hidden={this.state.hidden}
              FabProps={{ size: "small" }}
              icon={<UserPermissionManagement size="large" className={classes.selectTerminalIcon} />}
              onClose={this.handleCloseDial}
              onOpen={this.handleOpenDial}
              open={this.state.openDial}
              direction="left"
            >
              {this.state.actionsDial.map((action) => (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  onClick={action.action}
                />
              ))}
            </SpeedDial>
            <Grid className={classes.terminalDataTable}>
              <DataTable
                columns={columns}
                data={this.props.terminals ? this.props.terminals : []}
                dataKey="_id"
                order="desc"
                orderBy="createdAt"
                checkbox={true}
                heightClass="data-table-area-no-toolbar-for-terminal"
                pagination={true}
                onSelectionChange={this.onSelectionChange}
                selected={this.state.terminalIds}
                selectedTerminalBar={true}
                isDownload={true}
                searchBar={true}
                searchFieldCSS={TerminalStyles.searchField}
              />
              <TerminalDialog
                open={this.state.openDialog}
                id={this.state.terminalId}
                handleClose={this.handleClose}
                isEdit={this.state.isEdit}
              />
              <ResetPasswordDialog
                isResetDialogOpen={this.state.isResetDialogOpen}
                selectedSerialNo={this.state.selectedSerialNo}
                handleClose={this.handleResetPasswordClose}
              />
              <AasDialog
                isAasDialogOpen={this.state.isAasOpen}
                handleClose={this.handleAasClose}
              />
              <ImportTerminal
                handleOpen={this.state.importOpen}
                handleClose={this.handleImportClose}
              />
              <MoveDialog
                isMoveOpen={this.state.isMoveOpen}
                terminalIds={this.state}
                handleClose={this.handleMoveClose}
              />
              <ActivePassiveDeleteDialog
                alertOpen={this.state.alertBoxOpen}
                alertTitle={this.state.alertBoxTitle}
                alertContent={this.state.alertBoxContent}
                alertName={this.state.alertBoxName}
                alertClose={this.handleAlertClose}
              />
            </Grid>
          </Paper>
        </>
      );
    }
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      enqueueSnackbar: enqueueSnackbar,
      loadTerminals: loadTerminals,
      terminalDetailid: terminalDetailId,
      loginUserAssociateGroupsReset: loginUserAssociateGroupsReset,
      terminalReset: terminalReset
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    i18n: state.i18n,
    terminals: state.terminals,
    selectedList: state.selectedList,
    loginUserAssociateGroups: state.loginUserAssociateGroups,
    logInUserInfo: state.logInUserInfo
  };
}

Terminal.propTypes = {
  openDialog: PropTypes.bool,
  terminalId: PropTypes.string,
  selectedSerialNo: PropTypes.string,
  isResetDialogOpen: PropTypes.bool,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(TerminalStyles)(Terminal));
