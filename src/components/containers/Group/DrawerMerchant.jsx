/* eslint-disable array-callback-return */
import React, { PureComponent } from 'react';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import TreeItem from '@material-ui/lab/TreeItem';
import { Grid, withStyles, MenuItem, Menu, Paper } from "@material-ui/core";
import MerchantList from './GroupTable';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { enqueueSnackbar } from "../../../redux/actions/Notifier/NotifierAction";
import { loadMerchants, merchantsReset } from "../../../redux/actions/Group/GroupListAction";
import Card from '@material-ui/core/Card';
import { loadTerminals } from "../../../redux/actions/Terminals/TerminalsListAction";
import PropTypes from "prop-types";
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import AlertDialog from "../AlertDialog/AlertDialog";
import { I18n } from "react-redux-i18n";
import Button from "@material-ui/core/Button";
import { deleteMerchantById } from '../../../redux/actions/Group/DeleteMerchant';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import GroupDialog from './GroupForm';
import { GroupStyles } from './GroupStyles';
import Collapse from "@material-ui/core/Collapse";
import { isAuthorized } from '../../../lib/keycloak/Permissions';
import { PERMISSIONS } from '../../../constants/constants';
import { GetUserAssociatedGroups } from '../../../lib/keycloak/GetUserAssociateGroupOrSubgroups';
import { deleteKeycloakGroup } from '../../../redux/actions/Group/DeleteKeyCloakGroups';

const StyledTreeItem = withStyles({
  label: {
    color: "#295EA7"
  },
})(TreeItem);

class MerchantDrawer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      expanded: [],
      selected: [],
      terminalId: '',
      openDialog: false,
      selectedGroupId: '',
      group: [],
      subGroup: [],
      isParent: false,
      openDrawer: true,
      subGroupId: '',
      defaultGroupId: '',
      dialogOpen: false,
      deleteOpen: false,
      add: true,
      groupAddDropdown: false,
      isGroup: false,
      isEditGroup: false,
      anchor: null,
      isRoot: false,
      rootLabel: "",
      largeScreen: false
    };
  }


  componentDidMount() {
    if (this.props.loginUserAssociateGroups && this.props.loginUserAssociateGroups.length > 0) {
      this.props.loadMerchants(GetUserAssociatedGroups(), { isMerchantList: true });
    }
  }
  componentWillUnmount() {
    this.props.merchantsReset();
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }
  resize() {
    this.setState({ largeScreen: window.innerWidth > 1366 });
  }
  componentDidUpdate(prevProps) {
    if (this.props.merchants && JSON.stringify(prevProps.merchants) !== JSON.stringify(this.props.merchants)) {
      if (this.props.merchants.length > 0 && !this.state.selectedGroupId) {
        this.setState({
          selectedGroupId: this.props.merchants[0]._id,
        })
      }
    }
    if (this.props.merchantDetail && JSON.stringify(this.props.merchantDetail) !== JSON.stringify(prevProps.merchantDetail)) {
      this.setState({
        isEditGroup: this.props.merchantDetail.isParent
      });
    }
    if (this.props.loginUserAssociateGroups && JSON.stringify(this.props.loginUserAssociateGroups) !== JSON.stringify(prevProps.loginUserAssociateGroups)) {
      this.setState({
        isRoot: this.props.loginUserAssociateGroups[0].name === process.env.REACT_APP_ROOT_GROUP_NAME,
        rootLabel: this.props.loginUserAssociateGroups[0].name === process.env.REACT_APP_ROOT_GROUP_NAME ? process.env.REACT_APP_ROOT_GROUP_NAME : ""
      })
      this.props.loadMerchants(GetUserAssociatedGroups(), { isMerchantList: true });

    }
  }


  handleEdit = (e, id) => {
    this.setState({
      dialogOpen: true,
      subGroupId: id,
      add: false,
    });
    e.stopPropagation();
  };

  handleSelect = (event, nodeIds) => {
    if (nodeIds !== "root") {
      this.setState({
        selected: nodeIds,
        selectedGroupId: nodeIds,
      })
    }
  };


  handleClose = () => {
    this.setState({
      dialogOpen: false,
      groupAddDropdown: false,
      selectedGroupId: '',
      add: false
    });
  };

  handleAddClick = (event) => {
    this.setState({ anchor: event.currentTarget, groupAddDropdown: true });
  };

  addGroupForm = () => {
    this.setState({
      dialogOpen: true,
      add: true,
      isGroup: true
    });
  };
  addSubGroupForm = () => {
    this.setState({
      dialogOpen: true,
      add: true,
      isGroup: false
    });
  };

  handleDelete = () => {
    this.setState({ deleteOpen: true })
  };

  onAgree = (id) => {
    let keycloakGroupId, groupName

    this.props.merchants.filter(group => {
      if (group._id === id) {
        groupName = group.merchantName
      } else if (group.subGroup[0] && group.subGroup[0]._id === id) {
        groupName = group.subGroup[0].merchantName
      }
    });
    this.props.keycloakGroup.map(group => {
      if (group.name === groupName) {
        keycloakGroupId = group.id;
      }
      if (group.subGroups[0] && group.subGroups[0].name === groupName) {
        keycloakGroupId = group.subGroups[0].id;
      }
    });
    if (this.props.admin && this.props.admin.access_token) {
      this.props.deleteKeycloakGroup(this.props.admin.access_token, keycloakGroupId);
    }
    this.props.deleteMerchantById(id);
    this.onAlertClose();
    this.setState({
      selectedGroupId: ''
    });
  };

  onAlertClose = () => {
    this.setState({ deleteOpen: false });
  };

  handleOpenDrawer = () => {
    this.setState({
      openDrawer: true
    });
  };
  handleCloseDrawer = () => {
    this.setState({
      openDrawer: false
    });
  };
  handleCloseDropDown = () => {
    this.setState({ anchor: null });
  };
  render() {
    const { classes } = this.props;

    const loop = data => {
      return data.map(item => {
        if (item.subGroup && item.subGroup.length) {
          return (<TreeItem key={item._id} nodeId={item._id} label={item.merchantName}>{loop(item.subGroup)}
          </TreeItem>);
        }
        return (<TreeItem key={item._id} nodeId={item._id} label={item.merchantName} >
        </TreeItem>);
      });
    };
    return (
      <Paper>
        <Grid container spacing={1} >
          {this.state.openDrawer === true &&
            <Grid item xs={12} sm={3} >
              <Collapse in={this.state.openDrawer} timeout="auto" >
                <Grid container spacing={1} >
                  <Grid item xs={12} sm={12}>
                    <Card >
                      <div className={classes.controls}>
                        {isAuthorized(PERMISSIONS.ADD_GROUP) && <Tooltip title={I18n.t("GROUP.ADD_TOOLTIP_TITLE")}>
                          <Button onClick={this.handleAddClick}>
                            <AddIcon onClick={this.handleAddClick} />
                          </Button>
                        </Tooltip>}
                        {this.state.groupAddDropdown &&
                          <Menu
                            className={classes.menu}
                            id="create-menu"
                            anchorEl={this.state.anchor}
                            open={Boolean(this.state.anchor)}
                            onClose={this.handleCloseDropDown}
                          >
                            <MenuItem key="create role" onClick={this.addGroupForm}>{I18n.t('GROUP.ADD_HEADING')}</MenuItem>
                            <MenuItem key="create user" onClick={this.addSubGroupForm}>{I18n.t('GROUP.ADD_SUBGROUP')}</MenuItem>
                          </Menu>
                        }
                        {isAuthorized(PERMISSIONS.UPDATE_GROUP) && <Tooltip title={I18n.t("GROUP.EDIT_TOOLTIP_TITLE")}>
                          {this.state.selectedGroupId ? <Button onClick={this.handleEdit} >
                            <EditIcon />
                          </Button> : <span><Button disabled>
                            <EditIcon />
                          </Button></span>}
                        </Tooltip>}
                        <GroupDialog
                          open={this.state.dialogOpen}
                          id={this.state.selectedGroupId}
                          handleClose={this.handleClose}
                          add={this.state.add}
                          isGroup={this.state.isGroup}
                          isEditGroup={this.state.isEditGroup}
                          addSubGroupForm={this.addSubGroupForm}
                          groupAddDropdown={this.state.groupAddDropdown}
                        />
                        {isAuthorized(PERMISSIONS.DELETE_GROUP) &&
                          <Tooltip title={I18n.t("GROUP.DELETE_TOOLTIP_TITLE")}>
                            {this.state.selectedGroupId ? <Button onClick={this.handleDelete} > <DeleteIcon /></Button> : <span><Button disabled > <DeleteIcon /></Button></span>}
                          </Tooltip>
                        }

                        {this.state.selectedGroupId ? <AlertDialog
                          open={this.state.deleteOpen}
                          onAgree={(e) => this.onAgree(this.state.selectedGroupId)}
                          onDisagree={this.onAlertClose}
                          title={I18n.t('TERMINAL.ALERT.DELETE.TITLE')}
                          content={I18n.t('TERMINAL.DELETE_CONTENT')}
                        /> : ""}
                      </div>
                    </Card>
                  </Grid>
                  <Grid item xs={11} sm={11} >
                    <TreeView
                      defaultCollapseIcon={<ExpandMoreIcon />}
                      defaultExpandIcon={<ChevronRightIcon />}
                      selected={this.state.selectedGroupId}
                      onNodeToggle={this.handleToggle}
                      onNodeSelect={this.handleSelect}
                    >
                      {this.props.loginUserAssociateGroups && this.props.loginUserAssociateGroups.length > 0 &&
                        this.props.loginUserAssociateGroups[0].name === process.env.REACT_APP_ROOT_GROUP_NAME &&
                        <StyledTreeItem key={process.env.REACT_APP_ROOT_GROUP_NAME} label={process.env.REACT_APP_ROOT_GROUP_NAME}>{process.env.REACT_APP_ROOT_GROUP_NAME}</StyledTreeItem>}
                      {loop(this.props.merchants)}
                    </TreeView>

                  </Grid>
                  <Grid item xs={1} sm={1}>
                    {this.state.openDrawer === true &&
                      <ChevronLeftIcon className={classes.closeIcon} style={{ marginTop: !this.state.largeScreen ? "250px" : "450px" }} onClick={this.handleCloseDrawer} />}
                  </Grid>
                </Grid>
              </Collapse>
            </Grid>
          }
          {this.state.openDrawer === false && <ChevronRightIcon className={classes.openIcon} style={{ marginTop: !this.state.largeScreen ? "300px" : "500px" }} onClick={this.handleOpenDrawer} />}
          <Grid item xs={this.state.openDrawer ? 12 : 12} sm={this.state.openDrawer ? 9 : 12} xl={this.state.openDrawer ? 9 : 12}>
            <MerchantList id={this.state.selectedGroupId} />
          </Grid>
        </Grid >
      </Paper >
    );
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    queueSnackbar: enqueueSnackbar,
    loadMerchants: loadMerchants,
    loadTerminals: loadTerminals,
    deleteMerchantById: deleteMerchantById,
    deleteKeycloakGroup: deleteKeycloakGroup,
    merchantsReset: merchantsReset,
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    i18n: state.i18n,
    merchants: state.merchants,
    terminals: state.terminals,
    delete: state.deleteReducer,
    merchantDetail: state.merchant,
    admin: state.adminAccess,
    loginUserAssociateGroups: state.loginUserAssociateGroups,
    logInUserInfo: state.logInUserInfo,
    keycloakGroup: state.keycloakAllGroup,
  };
}

MerchantDrawer.propTypes = {
  expanded: PropTypes.array,
  selected: PropTypes.array,
  terminalId: PropTypes.string,
  openDialog: PropTypes.bool,
  selectedGroupId: PropTypes.string,
  group: PropTypes.array,
  subGroup: PropTypes.array,
  isParent: PropTypes.bool,
  open: PropTypes.bool,
  subGroupId: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(GroupStyles)(MerchantDrawer));
