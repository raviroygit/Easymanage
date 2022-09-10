/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-operators */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { withStyles, Paper, Grid, Menu, MenuItem, Fab } from "@material-ui/core";
import DataTable from '../../presentation/DataTable/DataTable';
import { UserManagementStyles } from './UserManagementStyles';
import { useDispatch, useSelector } from "react-redux";
import { I18n } from "react-redux-i18n";
import { userList } from '../../../redux/actions/UserManagement/UserList';
import { Add as AddIcon, Edit as EditIcon, Settings as UserPermissionManagement } from "@material-ui/icons";
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";
import Tooltip from '@material-ui/core/Tooltip';
import UserDialog from './UserDialog';
import UserDialogStepper from './UserDialogStepper';
import ResetPasswordDialog from './ResetPasswordDialog';
import UserRolesDialog from './UserRolesDialog';
import EditAttributesIcon from '@material-ui/icons/EditAttributes';
import { getRoles } from '../../../redux/actions/UserManagement/GetAllRoles';
import UserFeaturesPermissionDialog from './UserFeaturesPermissionDialog';

function UserList(props) {
  const { classes } = props;
  const dispatch = useDispatch();
  const admin = useSelector(state => state.adminAccess);
  const users = useSelector(state => state.users);
  // eslint-disable-next-line no-unused-vars
  const i18n = useSelector(state => state.i18n);

  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogStepper, setOpenDialogStepper] = useState(false);
  const [userId, setUserId] = useState('');
  const [isEdit, setEdit] = useState(false);
  const [resetDialog, setResetDialog] = useState(false);
  const [createMenu, setCreateMenu] = useState(false);
  const [roleDialog, setRoleDialog] = useState(false);
  const [isRoleMapping, setRoleMapping] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const [permissionDialog, setPermissionDialog] = useState(false);


  useEffect(() => {
    if (admin && admin.access_token && users && users.length === 0) {
      dispatch(userList(admin.access_token));
      dispatch(getRoles(admin.access_token));
    }
  }, [admin]);


  const handleEdit = (e, id) => {
    setUserId(id);
    setOpenDialog(true);
    setEdit(true);
  };

  const handleResetPassword = (e, id) => {
    setResetDialog(true);
    setUserId(id);
  };

  const handleRoleMapping = (e, id) => {
    setRoleMapping(true);
    setRoleDialog(true);
    setUserId(id);
  };


  const columns = [
    {
      name: `${I18n.t("USER_MANAGEMENT.FIRST_NAME")}`,
      selector: "firstName",
    },
    {
      name: `${I18n.t("USER_MANAGEMENT.LAST_NAME")}`,
      selector: "lastName",
    },
    {
      name: `${I18n.t("USER_MANAGEMENT.USER_NAME")}`,
      selector: "username",
    },
    {
      name: `${I18n.t("USER_MANAGEMENT.EMAIL")}`,
      selector: "email",
    },
    {
      name: `${I18n.t("USER_MANAGEMENT.CREATED_DATE")}`,
      type: "date",
      selector: "createdTimestamp",
    },
    {
      name: `${I18n.t("FORM.ACTIONS")}`,
      type: "actions",
      actions: [
        {
          name: I18n.t("MISC.EDIT"),
          handler: handleEdit,
          icon: <EditIcon />,
        },
        {
          name: I18n.t("USER_MANAGEMENT.RESET_PASSWORD_TOOLTIP"),
          handler: handleResetPassword,
          icon: <SettingsBackupRestoreIcon />,
        },
        {
          name: I18n.t("USER_MANAGEMENT.ROLE_MAPPING"),
          handler: handleRoleMapping,
          icon: <EditAttributesIcon />,
        },
      ],
    },
  ];

  const userDetails = [];
  users.map(user => {
    userDetails.push({ _id: user.id, firstName: user.firstName, lastName: user.lastName, username: user.username, email: user.email, createdTimestamp: new Date(user.createdTimestamp) });
  });

  const handleRegisterDialogOpen = () => {
    setOpenDialogStepper(true)
    setEdit(false);
  };

  const handleRoleDialog = () => {
    setRoleDialog(true);
    setRoleMapping(false);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setResetDialog(false);
    setRoleDialog(false);
    setUserId('');
    setRoleMapping(false);
    setEdit(false);
    setPermissionDialog(false);
    setOpenDialogStepper(false);
  };

  const handleClose1 = () => {
    setAnchor(null);
  };

  const handleClickPermissionMenu = (event) => {
    setAnchor(event.currentTarget);
    setCreateMenu(true);
  };

  const permissionAddSettingDialog = (e) => {
    setPermissionDialog(true);
  };

  return (
    <Paper className={classes.userList}>
      <Fab size='small' className={classes.userSettings}>
        <Tooltip title={I18n.t("USER_MANAGEMENT.ADD_FEATURES_PERMISSION")}>
          <UserPermissionManagement size="small" onClick={permissionAddSettingDialog} />
        </Tooltip>
      </Fab>
      <Fab size='small' className={classes.addIcon}>
        <Tooltip title={I18n.t("USER_MANAGEMENT.ADD_USER_TOOLTIP")}>
          <AddIcon size="small" onClick={handleClickPermissionMenu} />
        </Tooltip>
      </Fab>

      {createMenu &&
        <Menu
          className={classes.menu}
          id="create-menu"
          anchorEl={anchor}
          open={Boolean(anchor)}
          onClose={handleClose1}
        >
          <MenuItem key="create role" onClick={handleRoleDialog}>{I18n.t("USER_MANAGEMENT.ROLE_CREATE")}</MenuItem>
          <MenuItem key="create user" onClick={handleRegisterDialogOpen}>{I18n.t("USER_MANAGEMENT.CREATE_USER")}</MenuItem>
        </Menu>
      }
      <UserRolesDialog
        open={roleDialog}
        handleClose={handleClose}
        isRoleMapping={isRoleMapping}
        id={userId}
      />
      <UserFeaturesPermissionDialog
        open={permissionDialog}
        handleClose={handleClose}
      />
      <Grid className={classes.userListTable}>
        <DataTable
          columns={columns}
          data={userDetails.length > 0 ? userDetails : []}
          dataKey="_id"
          order="asc"
          orderBy="user"
          checkbox={false}
          pagination={true}
          isDownload={true}
          searchBar={true}
          heightClass="data-table-area-no-toolbar-for-terminal"
        />
      </Grid>
      <UserDialog
        open={openDialog}
        handleClose={handleClose}
        id={userId}
        isEdit={true}
        createMenu={createMenu}
      />
      <UserDialogStepper
        open={openDialogStepper}
        handleClose={handleClose}
        id={userId}
        isEdit={false}
      />
      <ResetPasswordDialog
        handleClose={handleClose}
        id={userId}
        open={resetDialog}
      />
    </Paper>
  );
}

export default withStyles(UserManagementStyles)(UserList);