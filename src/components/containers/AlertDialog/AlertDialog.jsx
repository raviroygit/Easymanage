import React from "react";
import PropTypes from "prop-types";
import { Button, withStyles} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { AlertDialogStyles } from "./AlertDialogStyles";
import { I18n } from "react-redux-i18n";
import Paper from "@material-ui/core/Paper";
import WarningIcon from "@material-ui/icons/Warning";
import TextField from "@material-ui/core/TextField";

class AlertDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      disabled: false,
    };
  }

  componentDidUpdate() {
    if (this.state.disabled && this.props.open) {
      this.setState({ disabled: false });
    }
  }

  handleClose = () => {
    this.setState({ comment: "" });
    this.props.onDisagree();
  };

  handleAgree = () => {
    this.setState({ disabled: true });
    this.props.onAgree();
  };

  handleDownload = (e) => {
    this.props.downloadFile(e);
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Dialog
          open={this.props.open}
          // onClose={this.handleClose}
          className={classes.dialog}
        >
          
            <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
          {this.props.alertIcon ? (
            <Paper elevation={0} className={classes.iconContainer}>
              <WarningIcon className={classes.alertIcon} />
              <h4>{I18n.t("FORM.WARNING")}</h4>
            </Paper>
          ) : (
            <></>
          )}
          <DialogContent>
            <DialogContentText>{this.props.content}</DialogContentText>
          </DialogContent>
          {this.props.comment ? (
            <div className={classes.iconContainer}>
              <TextField
                className={classes.alertComment}
                id="alert-comment"
                label={I18n.t("ALERTDIALOG.COMMENT")}
                variant="outlined"
                multiline={true}
                onChange={this.props.commented}
              />
            </div>
          ) : (
            <></>
          )}
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              {I18n.t("ACTIONS.DISAGREE")}
            </Button>
            <Button
              onClick={this.handleAgree}
              disabled={this.state.disabled}
              color="primary"
              autoFocus
            >
              {I18n.t("ACTIONS.AGREE")}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

AlertDialog.defaultProps = {
  comment: false,
  alertIcon: false,
};

AlertDialog.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onAgree: PropTypes.func.isRequired,
  onDisagree: PropTypes.func.isRequired,
  downloadText: PropTypes.string,
  downloadLink: PropTypes.string,
  classes: PropTypes.object,
  downloadFile: PropTypes.func,
  comment: PropTypes.bool,
  alertIcon: PropTypes.bool,
};

export default withStyles(AlertDialogStyles)(AlertDialog);
