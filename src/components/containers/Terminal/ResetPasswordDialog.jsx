import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Grid, Typography, withStyles } from "@material-ui/core";
import { TerminalStyles } from "./TerminalStyles";
import { I18n } from "react-redux-i18n";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/moment';
import { enqueueSnackbar } from "../../../redux/actions/Notifier/NotifierAction";
import { CopyToClipboard } from "react-copy-to-clipboard";
import moment from 'moment';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from "prop-types";
import { passwordGenerate, resetGenerator } from "../../../redux/actions/PasswordGenerator/PasswordGeneratorAction";

class ResetPasswordDialog extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: moment(new Date()).format('MM/DD/YYYY'),
      maintainerPassword: '',
      superPassword: '',
      checkMaintainerPassword: false,
      checkSuperPassword: false,
      password: false
    };
  }

  onResetClick = () => {
    if (this.state.checkMaintainerPassword === false && this.state.checkSuperPassword === false) {
      this.setState({
        password: !this.state.password
      })
    }
    else {
      this.setState({
        password: false
      })
      let maintainerPassword, superPassword;
      if (this.state.checkSuperPassword === true) {
        superPassword = "superPassword";
      }
      if (this.state.checkMaintainerPassword === true) {
        maintainerPassword = "maintainerPassword";
      }
      const data = new FormData();
      data.append("date", moment(this.state.selectedDate).format('DDMMYY'));
      data.append("type", superPassword);
      data.append("type", maintainerPassword);
      data.append("rangeStart", this.props.selectedSerialNo);
      data.append("rangeEnd", this.props.selectedSerialNo);

      this.props.passwordGenerate(data);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.state.checkSuperPassword || this.state.checkMaintainerPassword) {
      this.setState({ password: false })
    }
    if (this.props.selectedSerialNo && this.props.selectedSerialNo !== prevProps.selectedSerialNo) {
      this.setState({
        selectedDate: new Date(),
        maintainerPassword: "",
        superPassword: "",
      });
    }
    if (this.props.password && JSON.stringify(prevProps.password) !== JSON.stringify(this.props.password)
      && this.props.password.length > 0 && this.props.password[0].serialNumber.toString() === this.props.selectedSerialNo.toString()) {
      this.setState({
        superPassword: this.props.password[0].superPassword ? this.props.password[0].superPassword : null,
        maintainerPassword: this.props.password[0].maintainerPassword ? this.props.password[0].maintainerPassword : null,
      });
    }
  }

  handleDateChange = (date) => {
    this.setState({
      selectedDate: date
    });
  };


  onHandleCancel = () => {
    this.props.resetGenerator();
    this.props.handleClose();
    this.setState({
      selectedDate: moment(new Date()).format('DD/MM/YYYY'), maintainerPassword: '', superPassword: '', checkedM: false,
      checkSuperPassword: false,
    });
  }


  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  successSnackbar = () => {
    return this.props.enqueueSnackbar({
      message: I18n.t('TERMINAL.PASSWORD_COPIED'),
      options: {
        variant: 'success'
      }
    })
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Dialog
          open={this.props.isResetDialogOpen}
          onClose={this.onHandleCancel}
          aria-labelledby="terminal-dialog"
          fullWidth={true}
        >
          <DialogTitle id="terminal-dialog">
            {I18n.t('MISC.HEADING')}
          </DialogTitle>
          <DialogContent >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="resetDate"
                    label={I18n.t('FORM.SELECT_DATE')}
                    format="DD/MM/YYYY"
                    value={this.state.selectedDate}
                    onChange={this.handleDateChange}
                    className={classes.resetDatePicker}
                    color="secondary"
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.checkSuperPassword}
                    onChange={this.handleChange}
                    name="checkSuperPassword"
                    color="primary"
                  />
                }
                label={I18n.t('FORM.SUPER_PASSWORD')}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.checkMaintainerPassword}
                    onChange={this.handleChange}
                    name="checkMaintainerPassword"
                    color="primary"
                  />
                }
                label={I18n.t('FORM.MAINTAINER_PASSWORD')}
              />
            </FormGroup>
          </DialogContent>
          <DialogActions>
            <Grid className={classes.resetActionGrid}>
              {this.state.checkSuperPassword && this.state.superPassword && <CopyToClipboard
                text={this.state.superPassword}
                onCopy={() => this.successSnackbar}
              >
                <Button className={classes.resetPasswordButton}>{this.state.superPassword}</Button>
              </CopyToClipboard>
              }
              {this.state.checkMaintainerPassword && this.state.maintainerPassword && <CopyToClipboard
                text={this.state.maintainerPassword}
                onCopy={() => this.successSnackbar}
              >
                <Button className={classes.resetPasswordButton}>{this.state.maintainerPassword}</Button>
              </CopyToClipboard>
              }
              <Typography className={this.state.password ? classes.resetPasswordErrorMessage : classes.noErrorMessage} >{I18n.t('TERMINAL.RESET_ERROR')}</Typography>
            </Grid>
            <Button onClick={this.onHandleCancel} color="secondary" variant='contained'>
              {I18n.t('ACTIONS.CANCEL')}
            </Button>
            <Button onClick={this.onResetClick} color="primary" variant='contained'>
              {I18n.t('ACTIONS.RESET')}
            </Button>
          </DialogActions>
        </Dialog>
      </div >
    )
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    enqueueSnackbar: enqueueSnackbar,
    passwordGenerate: passwordGenerate,
    resetGenerator: resetGenerator,

  }, dispatch);
}

function mapStateToProps(state) {
  return {
    i18n: state.i18n,
    password: state.passwordGenerate,
  };
}

ResetPasswordDialog.propTypes = {
  password: PropTypes.array,
  checkMaintainerPassword: PropTypes.bool,
  checkSuperPassword: PropTypes.bool,

};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(TerminalStyles)(ResetPasswordDialog));