import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { I18n } from "react-redux-i18n";
import { Edit as EditIcon, Add as AddIcon } from "@material-ui/icons";
import DataTable from "../../presentation/DataTable/DataTable";
import { Paper, withStyles, Tooltip, Fab } from "@material-ui/core";
import { enqueueSnackbar } from "../../../redux/actions/Notifier/NotifierAction";
import { DownloadAndUploadStyles } from './DownloadAndUploadStyles';
import { loadFiles } from '../../../redux/actions/DownloadandUpload/FileListAction';
import DownloadUploadDialog from './UploadEditForm';
import { isAuthorized } from '../../../lib/keycloak/Permissions';
import { PERMISSIONS } from '../../../constants/constants';
import { downloadFile } from '../../../redux/actions/DownloadandUpload/DowloadFile';
import Download from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';
import AlertDialog from '../AlertDialog/AlertDialog';
import { deleteFile } from '../../../redux/actions/DownloadandUpload/DeleteFileAction';

class FileTable extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      fileId: '', selectedSerialNo: '', isResetDialogOpen: false, isOpenDialog: false, isEdit: false,
      openAlertDialog: false
    };

  }

  componentDidMount() {
    this.props.loadFiles();
  }

  handleDelete = (e, id) => {
    e.stopPropagation();
  };


  handleEdit = (e, id) => {
    this.setState({

      isOpenDialog: true,
      fileId: id,
      isEdit: false

    });
    e.stopPropagation();
  };

  handleClose = () => {
    this.setState({

      isOpenDialog: false,

      fileId: '',
    });
  };
  handleAdd = () => {
    this.setState({

      isOpenDialog: true,
      isEdit: true

    });
  };
  onDownloadHandler = (e, id) => {
    if (this.props.files && this.props.files.length > 0) {
      const selectedFile = this.props.files.filter(x => x._id === id);
      this.props.downloadFile({ id: id }, selectedFile[0].name);
    }
  };

  onDeleteHandler = (e, id) => {
    this.setState({ openAlertDialog: true, fileId: id });
  };

  onDeleteHandlerClose = () => {
    this.setState({ openAlertDialog: false });
  };

  onDeleteHandlerOnAgree = () => {
    this.props.deleteFile(this.state.fileId);
    this.onDeleteHandlerClose();

  };
  
  render() {
    const columns = [
      {
        name: `${I18n.t("DOWNLOAD_AND_UPLOAD.FILE_NAME")}`,
        selector: "name",
      },
      {
        name: `${I18n.t("DOWNLOAD_AND_UPLOAD.TYPE")}`,
        selector: "type",
      },

      {
        name: `${I18n.t("DOWNLOAD_AND_UPLOAD.CREATED_TIME")}`,
        type: "date",
        selector: "createdAt",
      },
      {
        name: `${I18n.t("DOWNLOAD_AND_UPLOAD.VERSION")}`,
        selector: "version",
      },
    ];
    if (isAuthorized(PERMISSIONS.UPDATE_PRAMS_BLACKLIST)) {
      columns.push({
        name: `${I18n.t("FORM.ACTIONS")}`,
        type: "actions",
        actions: [
          {
            name: I18n.t("MISC.EDIT"),
            handler: this.handleEdit,
            icon: <EditIcon />,
          },
          {
            name: I18n.t("MISC.DOWNLOAD"),
            handler: this.onDownloadHandler,
            icon: <Download />,
          },
          {
            name: I18n.t("MISC.DELETE"),
            handler: this.onDeleteHandler,
            icon: <DeleteIcon />,
          }
        ],
      })
    }

    const { classes } = this.props;
    return (
      <>
        <Paper className={classes.paper}>
          {isAuthorized(PERMISSIONS.UPLOAD_PRAMS_BLACKLIST) &&
            <Fab size="small" className={classes.addIcon}>
              <Tooltip title={I18n.t("DOWNLOAD_AND_UPLOAD.ADD_TOOLTIP_TITLE")}>
                <AddIcon size="large" onClick={this.handleAdd} />
              </Tooltip>
            </Fab>
          }
          <DataTable
            columns={columns}
            data={this.props.files ? this.props.files : []}
            dataKey="_id"
            order="desc"
            orderBy="createdAt"
            checkbox={false}
            heightClass="data-table-area-no-toolbar-for-terminal"
            pagination={true}
            onSelectionChange={this.onSelectionChange}
            isDownload={true}
            searchBar={true}
          />
          <DownloadUploadDialog

            open={this.state.isOpenDialog}
            id={this.state.fileId}
            handleClose={this.handleClose}
            isEdit={this.state.isEdit}

          />
          <AlertDialog
            open={this.state.openAlertDialog}
            onAgree={this.onDeleteHandlerOnAgree}
            onDisagree={this.onDeleteHandlerClose}
            title={I18n.t("FILE_UPLOAD.TITLE_DELETE_DIALOG")}
            content={I18n.t("FILE_UPLOAD.DELETE_CONTENT")}
          />
        </Paper>
      </>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      enqueueSnackbar: enqueueSnackbar,
      loadFiles: loadFiles,
      downloadFile: downloadFile,
      deleteFile: deleteFile
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    i18n: state.i18n,
    files: state.files,
  };
}

FileTable.propTypes = {
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(DownloadAndUploadStyles)(FileTable));

