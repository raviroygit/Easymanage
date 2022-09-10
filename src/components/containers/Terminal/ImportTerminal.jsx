/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CancelIcon from "@material-ui/icons/Cancel";
import Typography from "@material-ui/core/Typography";
import { Grid, Paper, withStyles, Box, Card, DialogTitle, DialogContent } from "@material-ui/core";
import { I18n } from "react-redux-i18n";
import { TerminalStyles } from "./TerminalStyles";
import { enqueueSnackbar } from "../../../redux/actions/Notifier/NotifierAction";
import ProgressBar from "../../presentation/ProgressBar/ProgressBar";
import { importTerminal } from "../../../redux/actions/Terminals/ImportTerminal";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";

class ImportTerminal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      fileName: "",
      uploadPercentage: 0,
      validationMessage: "",
      messageType: "",
      error: "",
      isSaveButtonDisabled: false
    };
  }

  resetState = () => {
    this.setState({
      file: null,
      fileName: "",
      uploadPercentage: 0,
      validationMessage: "",
      messageType: "",
    });
  };

  onSaveClick = () => {
    this.setState({
      isSaveButtonDisabled: true
    });
    if (!this.state.file) {
      this.setState({
        validationMessage: I18n.t("FILE_UPLOAD.FILE"),
        messageType: "error",
      });
      return;
    }
    const progress = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        if (percent <= 100) {
          this.setState({ uploadPercentage: percent });
        }
        if (percent === 100) {
          setTimeout(() => {
            this.onHandleCancel();
          }, 1000)
        }
      },
    };
    const errorhandler = (response) => {
      this.setState({ error: response });
    };
    const file = new FormData();
    file.append("file", this.state.file);
    this.props.importTerminal(file, progress, errorhandler);
  };

  handleFileChosen(file) {
    if (file) {
      const fileExtension = file.name.split(".").pop();
      if (fileExtension === "csv" || fileExtension === "xlsx") {
        this.setState({ fileName: file.name, file: file });
      } else {
        this.setState({ fileName: "", file: "" });
        this.props.enqueueSnackbar({
          message: I18n.t("FILE_UPLOAD.EXCEPT_ONLY"),
          options: {
            variant: "warning",
          },
        });
      }
    } else {
      this.setState({ fileName: "", file: "" });
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      validationMessage: "",
      messageType: "",
    });
  };

  onHandleCancel = () => {
    this.props.handleClose();
    this.resetState();
    this.setState({
      isSaveButtonDisabled: false
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Dialog
        open={this.props.handleOpen}
        aria-labelledby="terminal-dialog"
        fullWidth={true}
      >
        <DialogTitle id="terminal-dialog" className={classes.aasDialogTitle} >
          {I18n.t("UPLOAD.HEADING")}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} className={classes.import}>
              <Paper>
                <div>
                  <Button
                    className={classes.btnStyle}
                    tooltip={I18n.t("UPLOAD.BROWSE")}
                    variant="contained"
                    color="primary"
                    type="button"
                  >
                    <label>
                      {I18n.t("UPLOAD.CHOOSE_FILE")}
                      <input
                        hidden
                        style={TerminalStyles.uploadInput}
                        type="file"
                        accept=".csv,.xlsx"
                        name="file"
                        id="exampleInputFile"
                        onChange={(e) =>
                          this.handleFileChosen(e.target.files[0])
                        }
                      />
                    </label>
                  </Button>
                  <span className={classes.span}>
                    <label className={classes.label}>
                      {this.state.fileName}
                    </label>
                  </span>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} >
              {this.state.uploadPercentage > 0 && (
                <Box className={classes.box}>
                  <ProgressBar
                    error={this.props.progressImportTerminal}
                    value={this.state.uploadPercentage}
                  />
                </Box>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Typography >
            {this.state.validationMessage}
          </Typography>
          <Button
            className={classes.cancelBtn}
            color="secondary"
            variant="contained"
            onClick={this.onHandleCancel}
          >
            <CancelIcon />
            {I18n.t("UPLOAD.CANCEL")}
          </Button>
          <Button
            className={classes.uploadButton}
            variant="contained"
            color="primary"
            onClick={this.onSaveClick}
            disabled={this.state.isSaveButtonDisabled}
          >
            <CloudUploadIcon />
            {I18n.t("UPLOAD.UPLOAD")}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      enqueueSnackbar: enqueueSnackbar,
      importTerminal: importTerminal,
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    i18n: state.i18n,
    progressImportTerminal: state.progressImportTerminal
  };
}

ImportTerminal.propTypes = {
  fileName: PropTypes.string,
  type: PropTypes.string,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(TerminalStyles)(ImportTerminal));
