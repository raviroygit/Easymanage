import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { I18n } from "react-redux-i18n";
import DataTable from "../../presentation/DataTable/DataTable";
import { withStyles, Grid } from "@material-ui/core";
import { enqueueSnackbar } from "../../../redux/actions/Notifier/NotifierAction";
import { TerminalStyles } from "./TerminalStyles";
import Download from '@material-ui/icons/GetApp';
import { downloadLogs } from '../../../redux/actions/Logs/DownloadLogsFile';

class TerminalAccessLogs extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      terminalId: "",
      selectedSerialNo: "",
      isResetDialogOpen: false,
      importOpen: false,
      statusButton: true,
      terminalIds: [],
      display: false,
      logId: '',
      fileName: ''
    };
  }


  onDownloadHandler = (e, id) => {
    if (this.props.logs && this.props.isLogs) {
      const selectedLog = this.props.logs.filter(x => x._id === id);
      this.getLogFile(id, selectedLog[0].logsFile);
    }
  };

  getLogFile = (id, fileName) => {
    this.props.downloadLogs({ id: id }, fileName);
  };

  render() {

    const columns = [];
    if (!this.props.isLogs) {
      columns.push(
        {
          name: `${I18n.t("CALL_HISTORY.CREATED_TIME")}`,
          type: "date",
          selector: "createdAt",
        },
        {
          name: `${I18n.t("CALL_HISTORY.TYPE")}`,
          selector: "action",
        },
        {
        name: `${I18n.t("CALL_HISTORY.FILE_NAME")}`,
        selector: "fileName",
        },
        {
          name: `${I18n.t("CALL_HISTORY.COMMENT")}`,
          selector: "comment",
        })
    } else {
      columns.push(
        {
          name: `${I18n.t("CALL_HISTORY.CREATED_TIME")}`,
          type: "date",
          selector: "createdAt",
        },
        {
          name: `${I18n.t("CALL_HISTORY.FILE_NAME")}`,
          selector: "logsFile",
        },
        {
          name: `${I18n.t("FORM.ACTIONS")}`,
          type: "actions",
          actions: [
            {
              name: I18n.t("MISC.DOWNLOAD"),
              handler: this.onDownloadHandler,
              icon: <Download />,
            },
          ],
        }
      )
    }

    const { classes } = this.props;

    return (
      <>
        <Grid className={classes.terminalAccessLogsTable} >
          <DataTable
            columns={columns}
            data={this.props.logs ? this.props.logs : []}
            dataKey="createdAt"
            order="desc"
            orderBy="application"
            checkbox={false}
            heightClass="data-table-area-no-toolbar-for-call-history"
            pagination={true}
            isDownload={true}
          />
        </Grid>
      </>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      enqueueSnackbar: enqueueSnackbar,
      downloadLogs: downloadLogs,
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    i18n: state.i18n,
    logFile: state.logFile,
    log: state.logById
  };
}

TerminalAccessLogs.propTypes = {
  openDialog: PropTypes.bool,
  terminalId: PropTypes.string,
  selectedSerialNo: PropTypes.string,
  isResetDialogOpen: PropTypes.bool,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(TerminalStyles)(TerminalAccessLogs));
