/* eslint-disable no-useless-escape */
/* eslint-disable array-callback-return */
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
  IconButton, Grid, withStyles
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import { I18n } from "react-redux-i18n";
import PropTypes from "prop-types";
import { UserManagementStyles } from './UserManagementStyles';
import { adminAccess } from '../../../redux/actions/UserManagement/AdminAccess';
import { updateUser } from '../../../redux/actions/UserManagement/UpdateUser';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { PASSWORD_VALIDATOR } from '../../../constants/constants';

class resetPasswordDialog extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      temPassword: "",
      token: "",
      validationMessage: "",
      messageType: '',
      showPassword: false,
    };
  }

  onHandleCancel = () => {
    this.props.handleClose();
    this.resetState();
    this.props.adminAccess();
  };

  resetState = () => {
    this.setState({
      temPassword: "",
      token: "",
      validationMessage: "",
      messageType: '',
      showPassword: false,
    });
  };


  handleChange = (prop) => (event) => {
    this.setState({ temPassword: event.target.value, validationMessage: '', messageType: '' });
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  onSaveClick = () => {
    if (this.state.temPassword.trim() === '' || !this.state.temPassword) {
      this.setState({ validationMessage: I18n.t('USER_MANAGEMENT.VALIDATION.TEMPRORY_PASSWORD'), messageType: 'error' });
      return;
    }
    const PasswordValidation = new RegExp(PASSWORD_VALIDATOR);
    if (!PasswordValidation.test(this.state.temPassword)) {
      this.setState({ validationMessage: I18n.t('USER_MANAGEMENT.VALIDATION.PASSWORD_VALIDATION'), messageType: 'error' });
      return;
    }
    let userEditData = {
      requiredActions: ["UPDATE_PASSWORD"],
      credentials: [{ "type": "password", "value": `${this.state.temPassword}`, "temporary": true }]
    };
    if (this.props.admin && this.props.admin.access_token) {
      this.props.updateUser(this.props.admin.access_token, this.props.id, userEditData);
    }
    this.onHandleCancel();
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
          className={classes.resetPasswordDialogStyle}
        >
          <DialogTitle id="add-user-dialog">
            {I18n.t('USER_MANAGEMENT.RESET_TEMPRORY_PASSWORD')}
          </DialogTitle>
          <DialogContent >
            <Grid container spacing={3} >
              <Grid item xs={12}>
                <FormControl fullWidth={true} required>
                  <InputLabel htmlFor="temp-password">{I18n.t("USER_MANAGEMENT.TEMPRORY_PASSWORD")}</InputLabel>
                  <Input
                    id="temp-password"
                    type={this.state.showPassword ? 'text' : 'password'}
                    value={this.state.temPassword.password}
                    onChange={this.handleChange('password')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle temprory password visibility"
                          onClick={this.handleClickShowPassword}
                          onMouseDown={this.handleMouseDownPassword}
                        >
                          {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Typography >
              {this.state.validationMessage}
            </Typography>
            <Button className={classes.button} onClick={this.onHandleCancel} color="secondary" variant='contained'>
              {I18n.t('ACTIONS.CANCEL')}
            </Button>
            <Button className={classes.button} onClick={this.onSaveClick} color="primary" variant='contained'>
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
    updateUser: updateUser,

  }, dispatch);
}

function mapStateToProps(state) {
  return {
    i18n: state.i18n,
    admin: state.adminAccess,
  };
}

resetPasswordDialog.propTypes = {
  username: PropTypes.string,
  lastName: PropTypes.string,
  firstName: PropTypes.string,
  email: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(UserManagementStyles)(resetPasswordDialog));