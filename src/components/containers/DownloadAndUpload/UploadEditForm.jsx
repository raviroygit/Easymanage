import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import { Grid, Paper, withStyles, Box } from "@material-ui/core";
import { I18n } from "react-redux-i18n";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { uploadFile } from "../../../redux/actions/DownloadandUpload/UploadFileAction";
import { DownloadAndUploadStyles, MenuProps } from "./DownloadAndUploadStyles";
import { enqueueSnackbar } from "../../../redux/actions/Notifier/NotifierAction";
import PropTypes from "prop-types";
import ProgressBar from "../../presentation/ProgressBar/ProgressBar";
import {
  getFileById,
  resetGetFile,
} from "../../../redux/actions/DownloadandUpload/GetFileByIdAction";
import { updateFile } from "../../../redux/actions/DownloadandUpload/UpdateFileAction";

class UploadEditForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      supplier: "",
      description: "",
      file: null,
      fileName: "",
      uploadPercentage: 0,
      isSaveButtonDisabled: false,
      isEdit: false,
    };
  }

  resetState = () => {
    this.setState({
      type: "",
      supplier: "",
      description: "",
      file: null,
      fileName: "",
      uploadPercentage: 0,
      validationMessage: "",
      messageType: "",
    });
  };

  onAddCancel = () => {
    this.props.handleClose();
    this.resetState();
    this.props.resetGetFile();
    this.setState({
      isSaveButtonDisabled: false,
    });
  };
  componentDidUpdate(prevProps) {
    if (this.props.id && prevProps.id !== this.props.id) {
      this.props.getFileById(this.props.id);
    }

    if (
      !this.state.isEdit &&
      this.props.fileDetails &&
      JSON.stringify(prevProps.fileDetails) !==
      JSON.stringify(this.props.fileDetails)
    ) {
      this.setState({
        type: this.props.fileDetails.type ? this.props.fileDetails.type : null,
        fileName: this.props.fileDetails.name
          ? this.props.fileDetails.name
          : null,
      });
    }
  }

  onSaveClick = () => {
    this.setState({
      isSaveButtonDisabled: true,
    });
    const progress = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        if (percent <= 100) {
          this.setState({ uploadPercentage: percent });
        }
        if (percent === 100) {
          setTimeout(() => {
            this.onAddCancel();
          }, 1000);
        }
      },
    };
    if (!this.state.isEdit) {
      if (!this.state.type) {
        this.setState({
          validationMessage: I18n.t("FILE_UPLOAD.TYPE"),
          messageType: "error",
        });
        return;
      }
      if (!this.state.file) {
        this.setState({
          validationMessage: I18n.t("FILE_UPLOAD.FILE"),
          messageType: "error",
        });
        return;
      }
      const file = new FormData();
      file.append("file", this.state.file);
      file.append("type", this.state.type);
      this.props.updateFile(this.props.id, file, progress);
    } else {
      if (!this.state.file) {
        this.setState({
          validationMessage: I18n.t("FILE_UPLOAD.FILE"),
          messageType: "error",
        });
        return;
      }
      if (!this.state.type) {
        this.setState({
          validationMessage: I18n.t("FILE_UPLOAD.TYPE"),
          messageType: "error",
        });
        return;
      }
      const file = new FormData();
      file.append("file", this.state.file);
      file.append("type", this.state.type);
      file.append("supplier", this.state.supplier);
      file.append("description", this.state.description);
      this.props.uploadFile(file, progress);
    }
  };

  handleFileChosen(file) {
    if (file) {
      const fileExtension = file.name.split(".").pop();
      if (
        fileExtension === "xml" ||
        fileExtension === "XML" ||
        fileExtension === "json" ||
        fileExtension === "txt"
      ) {
        this.setState({ fileName: file.name, file: file });
      } else {
        this.setState({ fileName: "" });
        this.props.enqueueSnackbar({
          message: I18n.t("FILE_UPLOAD.EXCEPT_ONLY"),
          options: {
            variant: "warning",
          },
        });
      }
    } else {
      this.setState({ fileName: null });
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      validationMessage: "",
      messageType: "",
    });
  };

  onEntering = () => {
    this.setState({
      isEdit: this.props.isEdit,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid>
        <Dialog
          open={this.props.open}
          aria-labelledby="uploadFile-dialog"
          maxWidth="md"
          TransitionProps={{
            onEntering: this.onEntering,
          }}
        >
          {!this.state.isEdit ? (
            <DialogTitle id="uploadFile-dialog">
              {I18n.t("FILE_UPLOAD.EDIT_HEADING")}
            </DialogTitle>
          ) : (
            <DialogTitle id="uploadFile-dialog">
              {I18n.t("FILE_UPLOAD.UPLOAD_HEADING")}
            </DialogTitle>
          )}
          <DialogContent className={classes.diaContent}>
            <Grid container spacing={3} className={classes.grid}>
              <Grid item xs={4} className={classes.type}>
                <InputLabel id="file-upload-heading">
                  {" "}
                  {I18n.t("FILE_UPLOAD.TYPE_HEADING")}
                </InputLabel>
                <Select
                  labelId="file-upload-heading"
                  id="file-type"
                  name="type"
                  fullWidth
                  value={this.state.type}
                  onChange={(e) => this.handleChange(e)}
                  MenuProps={MenuProps}
                >
                  <MenuItem key="Blacklist" value="Blacklist">
                    {I18n.t("FILE_TYPE.BLACKLIST")}
                  </MenuItem>
                  <MenuItem key="Parameter_Prod" value="Parameter_Prod">
                    {I18n.t("FILE_TYPE.PARAMETER_PROD")}
                  </MenuItem>
                  <MenuItem key="Parameter_Test" value="Parameter_Test">
                    {I18n.t("FILE_TYPE.PARAMETER_TEST")}
                  </MenuItem>
                  <MenuItem key="Parameter_Bill" value="Parameter_Bill">
                    {I18n.t("FILE_TYPE.PARAMETER_BILLER")}
                  </MenuItem>
                </Select>
              </Grid>
              <Grid item xs={8}>
                <Paper>
                  <Grid>
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
                          style={DownloadAndUploadStyles.uploadInput}
                          type="file"
                          accept=".xml,.json,.txt,.XML"
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
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </DialogContent>
          {this.state.uploadPercentage > 0 ? (
            <Box className={classes.box}>
              <ProgressBar value={this.state.uploadPercentage} />
            </Box>
          ) : null}
          <DialogActions>
            <Typography>
              {this.state.validationMessage}
            </Typography>
            <Button
              onClick={this.onAddCancel}
              color="secondary"
              variant="contained"
            >
              {I18n.t("ACTIONS.CANCEL")}
            </Button>
            <Button
              disabled={this.state.isSaveButtonDisabled}
              variant="contained"
              onClick={this.onSaveClick}
              color="primary"
            >
              {I18n.t("ACTIONS.SAVE")}
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      uploadFile: uploadFile,
      enqueueSnackbar: enqueueSnackbar,
      getFileById: getFileById,
      updateFile: updateFile,
      resetGetFile: resetGetFile,
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    i18n: state.i18n,
    file: state.uploadFile,
    fileDetails: state.fileById,
    updateFile: state.updateFile,
  };
}

UploadEditForm.propTypes = {
  fileName: PropTypes.string,
  type: PropTypes.string,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(DownloadAndUploadStyles)(UploadEditForm));
