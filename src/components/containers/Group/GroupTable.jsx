import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { I18n } from "react-redux-i18n";
import DataTable from "../../presentation/DataTable/DataTable";
import { Paper, withStyles } from "@material-ui/core";
import { enqueueSnackbar } from "../../../redux/actions/Notifier/NotifierAction";
import { getMerchantById } from '../../../redux/actions/Group/MerchantByIdAction';
import { GroupStyles } from './GroupStyles';

class Group extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { openDialog: false, defaultId: '', largeScreen: false, };
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    this.setState({ largeScreen: window.innerWidth >= 1367 });
  }


  componentDidUpdate(prevProps, prevState) {
    if (this.props.id && prevProps.id !== this.props.id) {
      this.props.getMerchantById(this.props.id);
    }
  }

  handleDelete = (e, id) => {
    e.stopPropagation();
  };


  handleEdit = (e, id) => {
    this.setState({
      openDialog: true,
    });
    e.stopPropagation();
  };

  handleClose = () => {
    this.setState({
      openDialog: false,
    });
  };


  render() {
    const columns = [
      {
        name: `${I18n.t("GROUP.SERIAL_NUMBER")}`,
        selector: "serialNumber",
      },
      {
        name: `${I18n.t("GROUP.TERMINAL_MODEL")}`,
        selector: "terminalModel",
      },

      {
        name: `${I18n.t("GROUP.GROUP_NAME")}`,
        selector: "merchantName",
      },
      {
        name: `${I18n.t("GROUP.CITY")}`,
        selector: "city",
      },
      {
        name: `${I18n.t("GROUP.CREATED_TIME")}`,
        type: "date",
        selector: "createdAt",
      },
      {
        name: `${I18n.t("GROUP.STATUS")}`,
        selector: "status",
      },
    ];
    return (
      <>
        <Paper style={{ height: this.state.largeScreen ? "94vh" : "92vh" }}>
          <DataTable
            columns={columns}
            data={this.props.merchantDetails.merchantName ? this.props.merchantDetails.terminal : []}
            dataKey="_id"
            order="asc"
            orderBy="merchantName"
            checkbox={false}
            heightClass="data-table-area-no-toolbar-for-terminal"
            pagination={true}
            onSelectionChange={this.onSelectionChange}
            isDownload={true}
            searchBar={true}
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
      getMerchantById: getMerchantById,
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    i18n: state.i18n,
    merchantDetails: state.merchant,
    merchants: state.merchants,

  };
}

Group.propTypes = {
  openDialog: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(GroupStyles)(Group));
