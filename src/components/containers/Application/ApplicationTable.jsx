/* eslint-disable no-useless-concat */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { I18n } from "react-redux-i18n";
import { Add as AddIcon } from "@material-ui/icons";
import { Paper, withStyles, Tooltip, Fab, Grid, Badge, Typography, Divider, TextField, IconButton } from "@material-ui/core";
import { enqueueSnackbar } from "../../../redux/actions/Notifier/NotifierAction";
import { ApplicationStyles } from './ApplicationStyles';
import { loadApplication } from '../../../redux/actions/Application/ApplicationListAction';
import { isAuthorized } from '../../../lib/keycloak/Permissions';
import { PERMISSIONS } from '../../../constants/constants';
import { Redirect } from "react-router";
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import moment from "moment";
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import AlertDialog from "../AlertDialog/AlertDialog";
import { deleteApplication } from '../../../redux/actions/Application/DeleteAppsAction';

class ApplicationTable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      applicationId: '', upload: false, name: '', isResetDialogOpen: false, isOpenDialog: false, isAdd: false,
      searchValue: "",
      searchedResult: [],
      appsList: [],
      finalSearched: [],
      openAlertDialog: false
    };
  }

  componentDidMount() {
    this.props.loadApplication();
  }

  handleDelete = (e, id) => {
    e.stopPropagation();
  };

  handleEdit = (e, id) => {
    this.setState({
      isOpenDialog: true,
      fileId: id,
      isAdd: false
    });
    e.stopPropagation();
  };

  handleUpload = () => {
    this.setState({
      isAdd: true,
      upload: true
    });
  };
  handleClose = () => {
    this.setState({
      isOpenDialog: false,
      fileId: ''
    });
  };

  handleOnClick = (e, id) => {
    this.setState({ applicationId: id, redirected: true });

  };

  handleSearch = (e) => {
    this.setState({ searchValue: e.target.value });
    // eslint-disable-next-line array-callback-return
    const searchResult = this.props.applications && this.props.applications.length > 0 && this.props.applications.filter((el) => {
      if (el.title && el.title.includes(e.target.value)) {
        return el;
      }
    })
    this.setState({ searchedResult: [...searchResult] });
  };

  handleDeleteApps = (e, id) => {
    this.setState({ openAlertDialog: true, applicationId: id });
  };

  handleCloseDeleteDialog = () => {
    this.setState({ openAlertDialog: false });

  };

  deleteAppsOnAgree = () => {
    this.props.deleteApplication(this.state.applicationId);
    this.handleCloseDeleteDialog();
  };

  handleSearchedApps = (classes, appsList) => {

    return (
      <>
        {
          appsList && appsList.length > 0 && appsList.map(app => (
            <Grid container className={classes.containerImg} >
              <Grid item xs={11} sm={11}>
                <Grid container onClick={e => this.handleOnClick(e, app._id)}>
                  <Grid item xs={2} sm={3}>
                    <img id={app._id} width='100' height='60' src={`data:image/jpeg;base64,${app.logo}`} alt="app" />
                  </Grid>
                  <Grid xs={9} sm={8} >
                    <Typography id={app._id} className={classes.title}>{app.title}</Typography>
                    <span>{app.isVerified && <VerifiedUserIcon className={classes.verifiedIcon} />} {app.developer ? "Developer:   " + app.developer + " /" : ""} &nbsp; {app.appType ? "type: " + app.appType + " / " : ""} &nbsp;
                      {"Publish: " + `${moment(app.createdAt).format("DD-MM-YYYY HH:MM:SS")}`}
                    </span>
                  </Grid>
                  <Badge
                    style={{ marginTop: "18px" }}
                    anchorOrigin={{
                      vertical: 'center',
                      horizontal: 'right',
                    }}
                    badgeContent={app.price}
                    color="primary"
                  />
                  
                </Grid>
              </Grid>
              <Grid item xs={1} sm={1}>
              <DeleteIcon key={app._id} className={classes.deleteIcon} onClick={e => this.handleDeleteApps(e, app._id)} />
              </Grid>
              <Divider />
            </Grid>
          ))
        }
        <AlertDialog
          open={this.state.openAlertDialog}
          title={I18n.t("DOWNLOAD_AND_UPLOAD.DELETE_APPLICATION_HEADING")}
          onDisagree={this.handleCloseDeleteDialog}
          content={I18n.t("DOWNLOAD_AND_UPLOAD.DELETE_CONTENT")}
          onAgree={this.deleteAppsOnAgree}
        />
      </>
    );
  }

  render() {
    if (this.state.redirected) {
      return <Redirect push to={`/app-details/${this.state.applicationId}`} />
    } else {


      const { classes } = this.props;
      return (
        <>
          <Paper className={classes.paper}>
            <TextField
              placeholder={I18n.t("DOWNLOAD_AND_UPLOAD.SEARCH")}
              margin="dense"
              name="searchValue"
              value={this.state.searchValue}
              onChange={(e) => this.handleSearch(e)}
              InputProps={{
                style: {
                  height: "30px",
                  width: "200px"
                },
                endAdornment: (
                  <IconButton>
                    <SearchIcon onClick={this.handleSearched} />
                  </IconButton>
                )
              }}
              variant="outlined"
            />
            <br />
            <Typography style={{ marginBottom: "10px" }}>{I18n.t("DOWNLOAD_AND_UPLOAD.HEADING")}</Typography>
            <Grid item xs={4} sm={4}>
              {isAuthorized(PERMISSIONS.UPLOAD_OS_APPLICATION_KERNEL) &&
                <Fab size="small" className={classes.addIcon}>
                  <Tooltip title={I18n.t("DOWNLOAD_AND_UPLOAD.ADD_TOOLTIP_TITLE")}>
                    <AddIcon size="large" id={this.state.applicationId} onClick={this.handleUpload} />
                  </Tooltip>
                </Fab>
              }
            </Grid>
            {this.handleSearchedApps(classes, this.state.searchedResult && this.state.searchedResult.length > 0 ? this.state.searchedResult : this.props.applications)}
            {this.state.upload &&
              <Redirect push to={"/application-upload"} />
            }

          </Paper>
        </>
      );
    }

  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      enqueueSnackbar: enqueueSnackbar,
      loadApplication: loadApplication,
      deleteApplication: deleteApplication
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    i18n: state.i18n,
    applications: state.applications,
  };
}

ApplicationTable.propTypes = {
  applicationId: PropTypes.string,
  name: PropTypes.string,
  isResetDialogOpen: PropTypes.bool,
  editDialog: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(ApplicationStyles)(ApplicationTable));

