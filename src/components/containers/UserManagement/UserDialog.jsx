/* eslint-disable no-useless-escape */
/* eslint-disable array-callback-return */
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Button,
  Grid,
  withStyles,
  MenuItem
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
import { createUser } from '../../../redux/actions/UserManagement/CreateUser';
import { updateUser } from '../../../redux/actions/UserManagement/UpdateUser';
import { getUserInfo, resetUserInfo } from '../../../redux/actions/UserManagement/GetUserInfo';
import { getKeycloakGroups, resetKeycloakGroups } from '../../../redux/actions/Group/GetKeycloakGroups';
import { PASSWORD_VALIDATOR, EMAIL_VALIDATOR, NAME_VALIDATION, USER_NAME_VALIDATOR } from '../../../constants/constants';
import { assignGroupToUser } from '../../../redux/actions/UserManagement/AssignGroupToUser';
import { deleteAssignGroupFromUser } from '../../../redux/actions/UserManagement/DeleteGroupFromUser';
import { getUserAssociateGroups, resetUserAssociateGroups } from '../../../redux/actions/Group/GetUserAssociateGroup';
import { adminAccess } from '../../../redux/actions/UserManagement/AdminAccess';

class CreateUser extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      temPassword: "",
      token: "",
      validationMessage: "",
      messageType: '',
      showPassword: false,
      isEdit: false,
      group: "",
      groupSubGroupList: []
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.id && this.props.id !== prevProps.id && this.props.admin && this.props.admin.access_token) {
      this.props.getUserInfo(this.props.admin.access_token, this.props.id);
      this.props.getUserAssociateGroups(this.props.admin.access_token, this.props.id);
    }
    if (this.state.isEdit && this.props.userDetails && JSON.stringify(prevProps.userDetails) !== JSON.stringify(this.props.userDetails)) {
      this.setState({
        username: this.props.userDetails.username,
        firstName: this.props.userDetails.firstName,
        lastName: this.props.userDetails.lastName,
        email: this.props.userDetails.email,
        group: this.props.userAssociateGroup[0] && this.props.userAssociateGroup[0].name ? this.props.userAssociateGroup[0].name : ""
      });
    }
    if (this.state.isEdit && this.props.userAssociateGroup && this.props.userAssociateGroup[0] && this.props.userAssociateGroup[0].name) {
      this.setState({
        group: this.props.userAssociateGroup[0].name
      })
    };
  }

  onHandleCancel = () => {
    this.props.handleClose();
    this.props.resetUserInfo();
    this.resetState();
    this.props.resetUserAssociateGroups();
  };

  resetState = () => {
    this.setState({
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      roles: "",
      temPassword: "",
      token: "",
      validationMessage: "",
      messageType: '',
      showPassword: false,
    });
  };


  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value, validationMessage: '', messageType: '' });
  };

  handlePasswordChange = (prop) => (event) => {
    this.setState({ temPassword: event.target.value, validationMessage: '', messageType: '' });
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  onSaveClick = () => {
    const usernameValidation = new RegExp(USER_NAME_VALIDATOR);
    if (!this.state.username || !usernameValidation.test(this.state.username)) {
      this.setState({ validationMessage: I18n.t('USER_MANAGEMENT.VALIDATION.USER_NAME'), messageType: 'error' });
      return;
    }
    if (!this.state.firstName || this.state.firstName.trim() === "") {
      this.setState({ validationMessage: I18n.t('USER_MANAGEMENT.VALIDATION.FIRST_NAME'), messageType: 'error' });
      return;
    }
    if (!this.state.lastName || this.state.lastName.trim() === "") {
      this.setState({ validationMessage: I18n.t('USER_MANAGEMENT.VALIDATION.LAST_NAME'), messageType: 'error' });
      return;
    }
    const nameValidator = new RegExp(NAME_VALIDATION);
    if (!nameValidator.test(this.state.firstName)) {
      this.setState({ validationMessage: I18n.t('USER_MANAGEMENT.VALIDATION.FIRST_NAME_VALIDATION'), messageType: 'error' });
      return;
    }
    if (!nameValidator.test(this.state.lastName)) {
      this.setState({ validationMessage: I18n.t('USER_MANAGEMENT.VALIDATION.FIRST_NAME_VALIDATION'), messageType: 'error' });
      return;
    }
    if (!this.state.email) {
      this.setState({ validationMessage: I18n.t('USER_MANAGEMENT.VALIDATION.EMAIL'), messageType: 'error' });
      return;
    }
    const emailValidator = new RegExp(EMAIL_VALIDATOR);
    if (!emailValidator.test(this.state.email) || this.state.email.trim() === '') {
      this.setState({ validationMessage: I18n.t('USER_MANAGEMENT.VALIDATION.EMAIL_VALIDATION'), messageType: 'error' });
      return;
    }
    if (!this.props.isEdit) {
      const PasswordValidation = new RegExp(PASSWORD_VALIDATOR);
      if (!PasswordValidation.test(this.state.temPassword)) {
        this.setState({ validationMessage: I18n.t('USER_MANAGEMENT.VALIDATION.PASSWORD_VALIDATION'), messageType: 'error' });
        return;
      }

      let userData = {
        username: this.state.username,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        emailVerified: true,
        requiredActions: ['UPDATE_PASSWORD'],
        enabled: true,
        credentials: [{ "type": "password", "value": `${this.state.temPassword}`, "temporary": true }]
      }
      if (this.props.admin && this.props.admin.access_token) {
        this.props.createUser(this.props.admin.access_token, userData);
      }
      this.props.createUser(localStorage.adminToken, userData);
    } else {
      let userEditData = {};

      if (this.props.userDetails && this.props.userDetails.firstName !== this.state.firstName && this.props.lastName !== this.state.lastName) {
        userEditData.firstName = this.state.firstName;
        userEditData.lastName = this.state.lastName;
      };
      if (this.props.userDetails && this.props.userDetails.email !== this.state.email) {
        userEditData.email = this.state.email;
        userEditData.emailVerified = true;
      }
      if (this.props.userAssociateGroup[0] && this.state.group !== this.props.userAssociateGroup[0].name) {
        this.props.deleteAssignGroupFromUser(localStorage.token, this.props.id, this.props.userAssociateGroup[0].id);
      }
      const keycloakGroup = this.state.groupSubGroupList.filter(x => this.state.group === x.name);
      this.props.assignGroupToUser(localStorage.token, this.props.id, keycloakGroup[0].id);

      if (userEditData && this.props.admin && this.props.admin.access_token) {
        this.props.updateUser(this.props.admin.access_token, this.props.id, userEditData);
      }
    }
    this.onHandleCancel();
  };
  groupSubGroups = () => {
    if (this.props.isEdit) {
      this.props.keycloakGroups.map(group => {
        if (group) {
          this.state.groupSubGroupList.push(group)
        }
        if (group && group.subGroups && group.subGroups.length > 0) {
          this.state.groupSubGroupList.push(group.subGroups[0])
        }
      })
    }
  }

  onEntering = () => {
    this.groupSubGroups();
    this.setState({
      isEdit: this.props.isEdit
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
          className={classes.addUserDialog}
          TransitionProps={{
            onEntering: this.onEntering
          }}
        >
          {this.state.isEdit ?
            <DialogTitle id="add-user-dialog">
              {I18n.t('USER_MANAGEMENT.EDIT_USER')}
            </DialogTitle> :
            <DialogTitle id="add-user-dialog">
              {I18n.t('USER_MANAGEMENT.CREATE_USER')}
            </DialogTitle>
          }
          <DialogContent >
          {!this.props.isGroupStep &&
              <Grid container spacing={3} >
                <Grid item xs={4}>
                  <TextField
                    margin="dense"
                    fullWidth
                    id="username"
                    label={I18n.t("USER_MANAGEMENT.USER_NAME")}
                    value={this.state.username}
                    type="text"
                    name="username"
                    onChange={(e) => this.handleChange(e)}
                    disabled={this.props.isEdit}
                    required
                    InputLabelProps={this.state.isEdit && {
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    margin="dense"
                    fullWidth
                    id="firstName"
                    label={I18n.t('USER_MANAGEMENT.FIRST_NAME')}
                    value={this.state.firstName}
                    type="text"
                    name="firstName"
                    onChange={(e) => this.handleChange(e)}
                    required
                    InputLabelProps={this.state.isEdit && {
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    margin="dense"
                    fullWidth
                    id="lastName"
                    label={I18n.t("USER_MANAGEMENT.LAST_NAME")}
                    value={this.state.lastName}
                    type="text"
                    name="lastName"
                    onChange={(e) => this.handleChange(e)}
                    required
                    InputLabelProps={this.state.isEdit && {
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
              }
              <Grid container spacing={3} className={classes.container}>
              <Grid item xs={4}>
                <TextField
                  margin="dense"
                  fullWidth
                  id="email"
                  label={I18n.t("USER_MANAGEMENT.EMAIL")}
                  value={this.state.email}
                  type="email"
                  name="email"
                  onChange={(e) => this.handleChange(e)}
                  required
                  InputLabelProps={this.state.isEdit && {
                    shrink: true,
                  }}
                />
              
            </Grid>
            <Grid item xs={this.props.isGroupStep ? 12 : 4}>
                <TextField
                  margin="dense"
                  fullWidth
                  id="group"
                  label={I18n.t("USER_MANAGEMENT.GROUP")}
                  value={this.state.group}
                  type="group"
                  name="group"
                  onChange={(e) => this.handleChange(e)}
                  required
                  InputLabelProps={this.state.isEdit && {
                    shrink: true,
                  }}
                  SelectProps={{ MenuProps: MenuProps }}
                  select
                >
                  {this.state.groupSubGroupList && this.state.groupSubGroupList.length > 0 && this.state.groupSubGroupList.map(group => (
                    <MenuItem key={group.id} value={group.name}>{group.name}</MenuItem>
                  ))}
                </TextField>
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
    createUser: createUser,
    updateUser: updateUser,
    getUserInfo: getUserInfo,
    resetUserInfo: resetUserInfo,
    getKeycloakGroups: getKeycloakGroups,
    assignGroupToUser: assignGroupToUser,
    deleteAssignGroupFromUser: deleteAssignGroupFromUser,
    getUserAssociateGroups: getUserAssociateGroups,
    resetUserAssociateGroups: resetUserAssociateGroups,
    adminAccess: adminAccess,
    resetKeycloakGroups: resetKeycloakGroups
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    i18n: state.i18n,
    admin: state.adminAccess,
    userDetails: state.userDetails,
    keycloakGroups: state.keycloakAllGroup,
    userAssociateGroup: state.userAssociateGroups,
    logInUserInfo: state.logInUserInfo,
    loginUserAssociateGroups: state.loginUserAssociateGroups
  };
}

CreateUser.propTypes = {
  username: PropTypes.string,
  lastName: PropTypes.string,
  firstName: PropTypes.string,
  email: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(UserManagementStyles)(CreateUser));