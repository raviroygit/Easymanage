/* eslint-disable array-callback-return */
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Button,
  InputLabel,
  Select,
  MenuItem, Grid, withStyles
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import { I18n } from "react-redux-i18n";
import PropTypes from "prop-types";
import { UserManagementStyles, MenuProps } from './UserManagementStyles';
import { adminAccess } from '../../../redux/actions/UserManagement/AdminAccess';
import { createRole } from '../../../redux/actions/UserManagement/CreateRoles';
import { getUserAssociateRole, resetUserAssociateRole } from '../../../redux/actions/UserManagement/GetUserAssociateRole';
import { roleMappingToUser } from '../../../redux/actions/UserManagement/RoleMappingToUser';
import { deleteUserRoleByUserID } from '../../../redux/actions/UserManagement/DeleteUserRole';

class createRoles extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      role_name: "",
      roles: "",
      validationMessage: "",
      messageType: '',
      isRoleMapping: false
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.id && this.props.id !== prevProps.id && this.props.admin && this.props.admin.access_token) {
      this.props.getUserAssociateRole(this.props.admin.access_token, this.props.id);
    }
    if (!this.state.roles && this.props.userAssociateRole[0] && JSON.stringify(this.props.userAssociateRole[0]) !== JSON.stringify(prevProps.userAssociateRole[0])) {
      this.setState({
        roles: this.props.userAssociateRole[0].name ? this.props.userAssociateRole[0].name : null
      });
    }
  }

  onHandleCancel = () => {
    this.props.handleClose();
    this.resetState();
    this.props.adminAccess();
    this.props.resetUserAssociateRole();
  };

  resetState = () => {
    this.setState({
      description: "",
      role: "",
      validationMessage: "",
      messageType: '',
      roles: ""
    });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value, validationMessage: '', messageType: '' });
  };

  onSaveClick = () => {

    if (this.props.isRoleMapping && this.props.admin && this.props.admin.access_token) {
      if (!this.state.roles) {
        this.setState({ validationMessage: I18n.t('USER_MANAGEMENT.VALIDATION.PROVIDE_ROLES'), messageType: 'error' });
        return;
      }
      if(this.props.userAssociateRole && this.props.userAssociateRole.length > 0){
        const existingUserRole = [{ id: this.props.userAssociateRole[0].id, name: this.props.userAssociateRole[0].name }];
      this.props.deleteUserRoleByUserID(this.props.admin.access_token, this.props.id, existingUserRole);
      };
      const roleData = this.props.roles.map(role => {
        if (role.name === this.state.roles) {
          return { id: role.id, name: role.name };
        }
      });
      const newRoleData = roleData.filter(x => x !== undefined);
      if (newRoleData) {
        this.props.roleMappingToUser(this.props.admin.access_token, this.props.id, newRoleData);
      }
    } else {
      if (!this.state.role_name || this.state.role_name.trim() === "") {
        this.setState({ validationMessage: I18n.t('USER_MANAGEMENT.VALIDATION.PROVIDE_ROLE_NAME'), messageType: 'error' });
        return;
      }
      let userEditData = {
        name: this.state.role_name,
        description: this.state.description,
        composite: true,
        clientRole: true,
      };
      if (this.props.admin && this.props.admin.access_token) {
        this.props.createRole(this.props.admin.access_token, userEditData);
      }
    }
    this.onHandleCancel();
  };

  onEntering = () => {
    this.setState({
      isRoleMapping: this.props.isRoleMapping
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid>
        <Dialog
          open={this.props.open}
          onClose={this.onHandleCancel}
          aria-labelledby="add-user-dialog"
          maxWidth="lg"
          fullWidth={true}
          scroll="paper"
          TransitionProps={{
            onEntering: this.onEntering
          }}
          className={classes.resetPasswordDialogStyle}
        >
          {!this.state.isRoleMapping ?
            <DialogTitle id="create-role">
              {I18n.t('USER_MANAGEMENT.CREATE_ROLE_HEADING')}
            </DialogTitle> :
            <DialogTitle id="role-mapping">
              {I18n.t('USER_MANAGEMENT.ROLE_MAPPING')}
            </DialogTitle>
          }
          <DialogContent className={classes.content}>
            <Grid container spacing={3} className={classes.container}>
              {!this.state.isRoleMapping ?
                <>
                  <Grid item xs={6}>
                    <TextField
                      margin="dense"
                      fullWidth
                      id="role_name"
                      label={I18n.t("USER_MANAGEMENT.ROLE_NAME")}
                      value={this.state.role_name}
                      type="text"
                      name="role_name"
                      onChange={(e) => this.handleChange(e)}
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      margin="dense"
                      fullWidth
                      id="description"
                      label={I18n.t("USER_MANAGEMENT.ROLE_DESCRIPTION")}
                      value={this.state.description}
                      type="text"
                      name="description"
                      onChange={(e) => this.handleChange(e)}
                    />
                  </Grid>
                </> :
                <Grid item xs={12} >
                  <InputLabel
                    id="roles" >{I18n.t("USER_MANAGEMENT.ROLES")}</InputLabel>
                  <Select
                    labelId="roles"
                    id="roles"
                    name="roles"
                    fullWidth
                    className={classes.rolesSelect}
                    value={this.state.roles}
                    onChange={(e) => this.handleChange(e)}
                    displayEmpty={!this.state.roles}
                    MenuProps={MenuProps}
                  >
                    {this.props.roles && this.props.roles.map(role => (
                      <MenuItem key={role.name} value={role.name}>{role.name}</MenuItem>
                    ))}
                  </Select>
                </Grid>
              }
            </Grid>
          </DialogContent>
          <DialogActions>
            <Typography >
              {this.state.validationMessage}
            </Typography>
            <Button onClick={this.onHandleCancel} color="secondary" variant='contained'>
              {I18n.t('ACTIONS.CANCEL')}
            </Button>
            <Button onClick={this.onSaveClick} color="primary" variant='contained'>
              {I18n.t('ACTIONS.SAVE')}
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    adminAccess: adminAccess,
    createRole: createRole,
    getUserAssociateRole: getUserAssociateRole,
    resetUserAssociateRole: resetUserAssociateRole,
    deleteUserRoleByUserID: deleteUserRoleByUserID,
    roleMappingToUser: roleMappingToUser
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    i18n: state.i18n,
    admin: state.adminAccess,
    roles: state.roles,
    userAssociateRole: state.userAssociateRole
  };
}

createRoles.propTypes = {
  username: PropTypes.string,
  lastName: PropTypes.string,
  firstName: PropTypes.string,
  email: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(UserManagementStyles)(createRoles));