/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import FileUploadProgress from 'react-fileupload-progress';
import { withStyles, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { enqueueSnackbar } from '../../../redux/actions/Notifier/NotifierAction';
import FileUploadActionSuccess from '../../../redux/actions/FileUpload/FileUploadActionSuccess';
import FileUploadActionFailure from '../../../redux/actions/FileUpload/FileUploadActionFailure';
import { I18n } from 'react-redux-i18n';
import { FileUploaderStyles } from './FileUploaderStyles';

class FileUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null, openSuccess: false, successMessage: '', open: false, vertical: 'top', horizontal: 'right', errorMessage: '',
      flagUploadStatus: true, flagUploadServerStatus: true, fileNameLable: '', fileUploaded: false, progressBarActive: true, showLoader: false
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleCloseSuccess = this.handleCloseSuccess.bind(this);
  }

  //event to append extra form properties
  formGetter() {
    // const formData = 

    return new FormData(document.getElementById('customForm'));
  }

  //event to render custom upload form
  customFormRenderer(onSubmit) {
    const { classes } = this.props;

    return (
      <form id='customForm' className={classes.form}>
        <div style={FileUploaderStyles.chooseFileDiv}>
          <div className={classes.div1}>
            <Button className={classes.btnStyle} tooltip={I18n.t('UPLOAD.BROWSE')} variant="contained" color="primary" type="button">
              <label>{I18n.t('UPLOAD.CHOOSE_FILE')}</label>
              <input type="file" style={FileUploaderStyles.uploadInput} accept=".xlsx,.txt" name='file' id="exampleInputFile" onChange={e => this.handleFileChosen(e.target.files[0])} />
            </Button>
            <span className={classes.span}>
              <label className={classes.lable}>{this.state.fileNameLable}</label></span>
          </div>
          {this.state.fileUploaded ?
            <div className={classes.div2}>
              <Button tooltip={I18n.t('UPLOAD.FILE')} variant="contained" color="primary" type="button" onClick={onSubmit}>{I18n.t('UPLOAD.UPLOAD')}<CloudUploadIcon style={FileUploaderStyles.rightIcon} /></Button>
              <br />
            </div>
            : null
          }
        </div>

        <p style={FileUploaderStyles.bsHelp}>{I18n.t('UPLOAD.VALID_EXTENSIONS')}
        </p>

      </form>
    );
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleCloseSuccess() {
    this.setState({ openSuccess: false });
  }

  handleFileChosen(file) {
    this.setState({ progressBarActive: false });

    if (file) {
      if (file.name.includes('.xlsx')) {
        this.setState({ fileNameLable: file.name, fileUploaded: true, file: file, flagUploadServerStatus: true });
      }
      else {
        this.setState({ fileUploaded: false, fileNameLable: '', flagUploadStatus: false, progressBarActive: false });
        this.props.enqueueSnackbar({
          message: I18n.t('UPLOAD.EXCEL_ONLY'),
          options: {
            variant: 'error'
          }
        });
      }
    } else {
      this.setState({ fileNameLable: null, fileUploaded: false });
    }
  }

  //event for custom progress bar
  customProgressRenderer(progress, hasError, cancelHandler) {
    if (this.props.FileUploadReducer.status === 200 && this.state.flagUploadServerStatus && this.state.fileNameLable !== '') {
      this.setState({ flagUploadServerStatus: false });
      this.props.FileUploadReducer.status = 0;

      return;
    }

    if (this.state.progressBarActive === false && progress === 0) {
      this.setState({ progressBarActive: true });
    }

    if (progress > -1 && progress !== 100) {
      if (this.props.FileUploadReducer.data && (this.props.FileUploadReducer.data === 'Uploaded'
        || this.props.FileUploadReducer.data['Upload Status'] === 'File read Successfully' || this.props.FileUploadReducer.data['Upload Status'] === 'File Upload Fail')
      ) {
        this.props.FileUploadReducer.data = 'Uploading';
        this.setState({ progressBarActive: true });
      }
    }

    if (hasError || progress > -1) {
      const barStyle = Object.assign({}, FileUploaderStyles.progressBar);

      barStyle.width = progress + '%';

      let message = (<span>{barStyle.width}</span>);

      if (hasError && this.props.FileUploadReducer.status === 400) {
        barStyle.backgroundColor = '#d9534f';
        message = (<span style={FileUploaderStyles.msgSpan}>Failed to upload ...</span>);
      }

      if (progress === 100) {
        if (this.props.FileUploadReducer.data && this.props.FileUploadReducer.data !== 'Uploaded' && (this.props.FileUploadReducer.data['Upload Status'] === 'File read Successfully' || this.props.FileUploadReducer.data['Upload Status'] === 'File Upload Fail')) {
          this.props.FileUploadReducer.data = 'Uploaded';
          this.setState({ progressBarActive: true });
        }

        if (this.state.flagUploadStatus) {
          if (this.state.fileNameLable !== null) {
            if (this.props.FileUploadReducer.status !== 200) {
              this.setState({ flagUploadStatus: false });
            }
          } else {
            this.setState({ flagUploadStatus: false });
            this.props.enqueueSnackbar({
              message: I18n.t('UPLOAD.EXCEL'),
              options: {
                variant: 'error'
              }
            });
          }
        }
      } else {
        if (!this.state.flagUploadStatus) {
          this.setState({ flagUploadStatus: true });
        }
      }

      return (
        <div>
          {
            this.state.progressBarActive && this.state.fileUploaded &&
            <div style={FileUploaderStyles.div3}>
              <div style={FileUploaderStyles.progressWrapper}>
                <div style={barStyle}></div>
                <div><p>Hey</p></div>
              </div>
              <button style={FileUploaderStyles.cancelButton} onClick={cancelHandler}>
                <span>&times;</span>
              </button>
              <div style={FileUploaderStyles.div4}>
                {message}
              </div>
            </div>
          }
        </div>
      );
    }
  }

  customBeforeSend(req) {
    return req;
  }

  render() {

    return (
      <div >
        <FileUploadProgress style={FileUploaderStyles.div3} key={this.props.key} url={this.props.url} method={'POST'}
          onProgress={(e, request, progress) => {
            if (this.state.file && this.state.progressBarActive) {
              this.setState({ showLoader: true, fileUploaded: false, fileNameLable: '', flagUploadStatus: false, progressBarActive: false });
            }
          }}
          onLoad={(e, request) => {
            document.getElementById('exampleInputFile').value = '';
            this.props.fileUploadActionFailure('');

            if (JSON.parse(e.currentTarget.responseText)['Upload Status'] === 'File read Successfully') {
              this.props.enqueueSnackbar({
                message: I18n.t('UPLOAD.SUCCESS'),
                options: {
                  variant: 'success'
                }
              });
              this.props.FileUpload(true);
            } else {
              this.props.enqueueSnackbar({
                message: I18n.t('UPLOAD.FAIL'),
                options: {
                  variant: 'error'
                }
              });
              this.setState({ progressBarActive: false });
              this.props.FileUpload(false);
            }

            this.setState({ showLoader: false });
          }}
          onError={(e, request) => {
            document.getElementById('exampleInputFile').value = '';
            const res = JSON.parse(request.responseText);

            this.props.enqueueSnackbar({
              message: I18n.t(`UPLOAD.${res.Error}`),
              options: {
                variant: 'error'
              }
            });
            this.setState({ progressBarActive: false });

            this.setState({ showLoader: false });
            this.props.FileUpload(false);
          }}
          onAbort={(e, request) => {
            document.getElementById('exampleInputFile').value = '';
            this.props.enqueueSnackbar({
              message: I18n.t('UPLOAD.FAIL'),
              options: {
                variant: 'error'
              }
            });
            this.setState({ progressBarActive: false });
            this.setState({ showLoader: false });
            this.props.FileUpload(false);
          }}
          formGetter={this.formGetter.bind(this)}
          formRenderer={this.customFormRenderer.bind(this)}
          progressRenderer={this.customProgressRenderer.bind(this)}
          beforeSend={this.customBeforeSend.bind(this)}
        />
      </div>

    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    FileUpload: FileUploadActionSuccess,
    fileUploadActionFailure: FileUploadActionFailure,
    enqueueSnackbar: enqueueSnackbar
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    FileUploadReducer: state.FileUploadReducer,
  };
}

FileUploader.propTypes = {
  classes: PropTypes.object,
  uploadStatus: PropTypes.bool,
  FileUploadReducer: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ]),
  key: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(FileUploaderStyles)(FileUploader));
