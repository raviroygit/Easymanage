
/* eslint-disable react/no-typos */
/* eslint-disable no-mixed-operators */
import { Button, Paper, MenuItem, Grid, withStyles, TextField, Typography, Fab, Tooltip } from '@material-ui/core';
import { PasswordGeneratorStyles,MenuProps } from './PasswordGeneratorStyles';
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { I18n } from "react-redux-i18n";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from "prop-types";
import moment from 'moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/moment';
import PasswordTable from './PasswordTable';
import { enqueueSnackbar } from '../../../redux/actions/Notifier/NotifierAction';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { passwordGenerate, resetGenerator, passwordGenerateFailure } from '../../../redux/actions/PasswordGenerator/PasswordGeneratorAction';

class PasswordGenerator extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'serialNumber',
      selectedDate: moment(new Date(), 'MM/DD/YYYY'),
      open: false,
      validationMessage: '',
      messageType: '',
      checkMaintainerPassword: false,
      checkSuperPassword: false,
      file: null,
      rangeStart: '',
      rangeEnd: '',
      type: [],
      fileName: '',
      isTable: false,
      error: ''
    };
  }

  handleDateChange = (date) => {
    this.setState({
      selectedDate: date
    });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value, validationMessage: '', messageType: '' });
    if (this.state.selected === 'serialNumber') {
      this.setState({
        file: null,
        fileName: ''
      })
    }
    if (this.state.selected === 'file') {
      this.setState({
        rangeEnd: '',
        rangeStart: ''
      })
    }
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  handleOpen = () => {
    this.setState({
      open: true
    });
  };

  handleChangeCheckBox = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  handleFileChosen(file) {
    if (file) {
      const fileExtension = file.name.split('.').pop();
      if (fileExtension === 'csv' || fileExtension === 'txt') {
        this.setState({ fileName: file.name, file: file });
      }
      else {
        this.setState({ fileName: '' });
        this.props.enqueueSnackbar({
          message: I18n.t('PASSWORD.EXCEPT_ONLY'),
          options: {
            variant: 'warning'
          }
        });
      }
    } else {
      this.setState({ fileName: null });
    }
  }

  handleOnPaste = (e) => {
    e.preventDefault();
  };
  resetState = () => {
    this.setState({
      validationMessage: '',
      messageType: '',
      file: null,
      type: [],
      fileName: '',
      rangeEnd: '',
      rangeStart: ''
    })
  }

  goBack = () => {
    this.setState({
      isTable: false,
      checkMaintainerPassword: false,
      checkSuperPassword: false,
    })
    this.resetState();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.password && JSON.stringify(prevProps.password) !== JSON.stringify(this.props.password)) {
      this.setState({ isTable: true })
    }

  }

  generatePassword = (e) => {
    if (this.state.selected === 'file' && !this.state.file) {
      this.setState({ validationMessage: I18n.t('PASSWORD.VALIDATION.CHOOSE_FILE'), messageType: 'error' });
      return;
    }
    if (this.state.selected === 'serialNumber') {
      if (!this.state.rangeStart) {
        this.setState({ validationMessage: I18n.t('PASSWORD.VALIDATION.RANGE_START'), messageType: 'error' });
        return;
      }
      if (!this.state.rangeEnd) {
        this.setState({ validationMessage: I18n.t('PASSWORD.VALIDATION.RANGE_END'), messageType: 'error' });
        return;
      }
    }
    if (this.state.selected === 'serialNumber') {
      if (this.state.rangeStart.length < 6 || this.state.rangeEnd < 6) {
        this.setState({ validationMessage: I18n.t('PASSWORD.VALIDATION.SERIAL_LENGTH'), messageType: 'error' });
        return;
      }
    }

    if (this.state.rangeStart > this.state.rangeEnd) {
      this.setState({ validationMessage: I18n.t('PASSWORD.VALIDATION.GREATER_LESS'), messageType: 'error' });
      return;
    }
    if (!this.state.selectedDate) {
      this.setState({ validationMessage: I18n.t('PASSWORD.VALIDATION.DATE'), messageType: 'error' });
      return;
    }

    if (!this.state.checkMaintainerPassword && !this.state.checkSuperPassword) {
      this.setState({ validationMessage: I18n.t('PASSWORD.VALIDATION.CHECKBOX'), messageType: 'error' });
      return;
    }
    let maintainerPassword, superPassword;
    if (this.state.checkMaintainerPassword || this.state.checkSuperPassword) {
      if (this.state.checkMaintainerPassword === true) {
        maintainerPassword = 'maintainerPassword'
      }
      if (this.state.checkSuperPassword === true) {
        superPassword = 'superPassword';
      }
    }
    const data = new FormData();
    data.append("file", this.state.file);
    data.append("date", moment(this.state.selectedDate).format('DDMMYY'));
    data.append("type", maintainerPassword);
    data.append("type", superPassword);
    data.append("rangeStart", this.state.rangeStart);
    data.append("rangeEnd", this.state.rangeEnd);

    this.props.passwordGenerate(data);
    if (this.state.isTable === false) {
      this.props.resetGenerator();
      this.resetState();
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        {this.state.isTable === false ? (
          <Paper className={classes.paper}>
            <Grid className={classes.divContainer}>
              <Grid container spacing={3} className={classes.inputGrid}>
                <Grid item xs={3} >
                  <TextField
                    className={classes.textField}
                    id="select-type"
                    select
                    SelectProps={{MenuProps:MenuProps}}
                    name="selected"
                    label={I18n.t('PASSWORD.SELECT_TYPE')}
                    value={this.state.selected}
                    onChange={(e) => this.handleChange(e)}
                  >
                    <MenuItem key="serialNumber" value="serialNumber">{I18n.t("FORM.SERIAL_NUMBER")}</MenuItem>
                    <MenuItem key="file" value="file">{I18n.t("PASSWORD.FILE")}</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
              <Grid container spacing={3} className={classes.rangeGrid}>
                <Grid item xs={3} >
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      style={{ width: '100%' }}
                      margin="normal"
                      id="resetDate"
                      format="DD/MM/YYYY"
                      value={this.state.selectedDate}
                      onChange={this.handleDateChange}
                      color="secondary"
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                {this.state.selected === 'file' ?
                  <Grid item xs={3} >
                    <Button className={classes.fileButton} tooltip={I18n.t('UPLOAD.BROWSE')} variant="contained" color="primary" type="button" >
                      <label  >{I18n.t('UPLOAD.CHOOSE_FILE')}
                        <input hidden type="file" accept=".csv,.txt" name='file' id="exampleInputFile" onChange={e => this.handleFileChosen(e.target.files[0])} />
                      </label>
                    </Button>
                    <span className={classes.span}>
                      <label className={classes.lable}>{this.state.fileName}</label></span>
                  </Grid> : null
                }
                {this.state.selected === 'serialNumber' &&
                  <>
                    <Grid item xs={3}>
                      <TextField
                        onKeyPress={(event) => { if (!/\w/.test(event.key)) { event.preventDefault(); } }}
                        fullWidth
                        id="serial-number-range-start"
                        className={classes.numberField}
                        label={I18n.t('PASSWORD.RANGE_START')}
                        value={this.state.rangeStart}
                        name="rangeStart"
                        onPaste={(e) => this.handleOnPaste(e)}
                        onChange={(e) => this.handleChange(e)}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        fullWidth
                        onKeyPress={(event) => { if (!/\w/.test(event.key)) { event.preventDefault(); } }}
                        id="arial-number-range-end"
                        className={classes.numberField}
                        label={I18n.t('PASSWORD.RANGE_END')}
                        value={this.state.rangeEnd}
                        name="rangeEnd"
                        onPaste={(e) => this.handleOnPaste(e)}
                        onChange={(e) => this.handleChange(e)}
                      />
                    </Grid>
                  </>}
              </Grid>
              <Grid container spacing={3} className={classes.password}>
                <Grid item xs={3}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.checkMaintainerPassword}
                        onChange={this.handleChangeCheckBox}
                        name="checkMaintainerPassword"
                        color="primary"
                      />
                    }
                    label={I18n.t('FORM.MAINTAINER_PASSWORD')}
                  />
                </Grid>
                <Grid item xs={3}>
                  <FormControlLabel
                    className={classes.superPass}
                    control={
                      <Checkbox
                        checked={this.state.checkSuperPassword}
                        onChange={this.handleChangeCheckBox}
                        name="checkSuperPassword"
                        color="primary"
                      />
                    }
                    label={I18n.t('FORM.SUPER_PASSWORD')}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3} className={classes.buttonGrid}>
                <Grid item xs={6}>
                  <div style={{ flex: 'auto' }}>
                    <Typography style={{ color: 'red', marginLeft: '35px' }}>
                      {this.state.validationMessage}
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={6} >
                  <Button className={classes.buttonGenerate} onClick={this.generatePassword}
                    variant="contained"
                    color="primary"
                  >
                    {I18n.t('ACTIONS.GENERATE')}
                  </Button>

                </Grid>
              </Grid>
            </Grid>
          </Paper>
        ) : <>
          <Paper className={classes.passwordTable}>
            <Grid className={classes.passwordTable} >
              {/* <Grid item xs={12} >
                <ArrowBackIosIcon className={classes.buttonCancel} onClick={this.goBack} />
              </Grid> */}
              <Fab size="small" className={classes.returnBox}>
                <Tooltip title={I18n.t("REPORT.CLOSE")}>
                  <ArrowBackIosIcon size="medium" onClick={this.goBack} className={classes.backButton} />
                </Tooltip>
              </Fab>
              <PasswordTable
                password={this.props.password}
              />
            </Grid>
          </Paper>
        </>
        }
      </>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    enqueueSnackbar: enqueueSnackbar,
    resetGenerator: resetGenerator,
    passwordGenerate: passwordGenerate,
    passwordGenerateFailure: passwordGenerateFailure,
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    i18n: state.i18n,
    password: state.passwordGenerate,

  };
}

PasswordGenerator.propTypes = {
  selected: PropTypes.string,
  open: PropTypes.bool,
  validationMessage: PropTypes.string,
  messageType: PropTypes.string,
  checkMaintainerPassword: PropTypes.bool,
  checkSuperPassword: PropTypes.bool,
  file: PropTypes.func,
  rangeStart: PropTypes.string,
  rangeEnd: PropTypes.string,

};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(PasswordGeneratorStyles)(PasswordGenerator));