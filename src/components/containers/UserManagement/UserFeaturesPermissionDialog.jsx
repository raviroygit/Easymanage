/* eslint-disable array-callback-return */
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Checkbox,
  List, Grid, withStyles
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import { I18n } from "react-redux-i18n";
import PropTypes from "prop-types";
import { UserManagementStyles, MenuProps } from './UserManagementStyles';
import { FEATURES_PERMISSION, ROUTE_PERMISSION } from '../../../constants/constants';
import { getFeaturesPermissionByRole, resetFeaturesPermissionByRole } from '../../../redux/actions/Permission/GetFeaturesPermissionByRole';
import { deletePermission } from '../../../redux/actions/Permission/DeletePermissionByRole';
import { updatePermission } from '../../../redux/actions/Permission/UpdatePermissionByRole';

class featuresPermissions extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      roles: '',
      permissionList: [],
      validationMessage: '',
      messageType: '',
      isRoleMapping: false,
      viewPermissions: []
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.roles && this.state.roles !== prevState.roles) {
      this.props.resetFeaturesPermissionByRole();
      this.setState({ viewPermissions: [], permissionList: [] });
      this.props.getFeaturesPermissionByRole({ role: this.state.roles });
    }
    if (this.props.permissionByRoles && this.props.permissionByRoles.features && this.props.permissionByRoles.route && JSON.stringify(this.props.permissionByRoles) !== JSON.stringify(prevProps.permissionByRoles)) {
      this.setState({
        permissionList: this.props.permissionByRoles.features.map(permission => { return permission }),
        viewPermissions: this.props.permissionByRoles.route.map(viewPermission => { return viewPermission })
      });
    }
  }

  onHandleCancel = () => {
    this.props.handleClose();
    this.props.resetFeaturesPermissionByRole();
    this.resetState();
  };

  resetState = () => {
    this.setState({
      isAddPermission: '',
      roles: '',
      permissionList: [],
      validationMessage: "",
      messageType: '',
      viewPermissions: []
    });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value, validationMessage: '', messageType: '' });
  };

  onSaveClick = async () => {
    if (!this.state.roles || this.state.roles.trim() === "") {
      this.setState({ validationMessage: I18n.t('USER_MANAGEMENT.VALIDATION.PROVIDE_ROLE_NAME'), messageType: 'error' });
      return;
    }

    const permissionData = {
      role: this.state.roles,
      features: this.state.permissionList,
      route: this.state.viewPermissions
    }
    this.props.updatePermission(permissionData);

    this.onHandleCancel();
  };


  handleChangeFeaturesPermission = (e) => {
    if (!e.target.checked) {
      const uncheckedPermission = this.state.permissionList.filter(x => x !== e.target.value);
      this.setState({ permissionList: uncheckedPermission });
    } else {
      this.setState({
        permissionList: [...this.state.permissionList, e.target.value]
      })
    }
  };

  handleChangeViewPermission = (e) => {
    if (!e.target.checked) {
      const uncheckedPermission = this.state.viewPermissions.filter(x => x !== e.target.value);
      this.setState({ viewPermissions: uncheckedPermission });
    } else {
      this.setState({
        viewPermissions: [...this.state.viewPermissions, e.target.value]
      })
    }
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
          className={classes.featuresPermissionDialog}
        >
          <DialogTitle id="create-role">
            {I18n.t('USER_MANAGEMENT.ADD_FEATURES_PERMISSION')}
          </DialogTitle>
          <DialogContent >
            <Grid container spacing={3} >
              <Grid item xs={12}>
                <FormControl className={classes.rolesSelect}>
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
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <InputLabel
                  id="features-permission-list">{I18n.t('USER_MANAGEMENT.PERMISSION_LIST')}
                </InputLabel>
                <FormControl
                  fullWidth
                >
                  <List className={classes.list}>
                    {FEATURES_PERMISSION.map((e) => (
                      <MenuItem
                        value={e}
                        key={e}
                      >
                        <Checkbox
                          value={e}
                          name={e}
                          onClick={(el) => this.handleChangeFeaturesPermission(el)}
                          checked={this.state.permissionList.indexOf(e) > -1}
                        />
                        {e}
                      </MenuItem>
                    ))}
                  </List>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <InputLabel
                  id="features-permission-list">{I18n.t('USER_MANAGEMENT.VIEW_PERMISSION')}
                </InputLabel>
                <FormControl
                  fullWidth
                >
                  <List className={classes.list}>
                    {ROUTE_PERMISSION.map((e) => (
                      <MenuItem
                        value={e}
                        key={e}
                      >
                        <Checkbox
                          value={e}
                          name={e}
                          onClick={(el) => this.handleChangeViewPermission(el)}
                          checked={this.state.viewPermissions.indexOf(e) > -1}
                        />
                        {e}
                      </MenuItem>
                    ))}
                  </List>
                </FormControl>
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
    getFeaturesPermissionByRole: getFeaturesPermissionByRole,
    resetFeaturesPermissionByRole: resetFeaturesPermissionByRole,
    updatePermission: updatePermission,
    deletePermission: deletePermission
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    i18n: state.i18n,
    roles: state.roles,
    permissionByRoles: state.featuresPermissionByRoles
  };
}

featuresPermissions.propTypes = {
  username: PropTypes.string,
  lastName: PropTypes.string,
  firstName: PropTypes.string,
  email: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(UserManagementStyles)(featuresPermissions));