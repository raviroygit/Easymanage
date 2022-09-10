/* eslint-disable array-callback-return */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { I18n } from "react-redux-i18n";
import DataTable from "../../presentation/DataTable/DataTable";
import { withStyles } from "@material-ui/core";
import { enqueueSnackbar } from "../../../redux/actions/Notifier/NotifierAction";
import { PasswordGeneratorStyles } from "./PasswordGeneratorStyles";
import { resetGenerator } from "../../../redux/actions/PasswordGenerator/PasswordGeneratorAction";

class PasswordTable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      passwordDialog: false,
      type: [],
      fileId: "",
    };
  }

  handleDelete = (e, id) => {
    e.stopPropagation();
  };

  handleEdit = (e, id) => {
    this.setState({
      passwordDialog: true,
      fileId: id,
    });
    e.stopPropagation();
  };

  handleClose = () => {
    this.setState({
      passwordDialog: false,
      fileId: "",
    });
    this.props.resetGenerator();
  };

  render() {
    const columns = [
      {
        name: `${I18n.t("FORM.SERIAL_NUMBER")}`,
        selector: "serialNumber",
      }
    ];
    if (this.props.password.length > 0) {
      if (this.props.password[0].superPassword) {
        columns.push({
          name: `${I18n.t("FORM.SUPER_PASSWORD")}`,
          selector: "superPassword",
        })
      }
      if (this.props.password[0].maintainerPassword) {
        columns.push({
          name: `${I18n.t("FORM.MAINTAINER_PASSWORD")}`,
          selector: "maintainerPassword",
        })
      }
    }

    return (
      <>
        <DataTable
          columns={columns}
          data={this.props.password ? this.props.password : []}
          dataKey="_id"
          order="asc"
          orderBy="password"
          checkbox={false}
          heightClass="data-table-area-no-toolbar-for-terminal"
          pagination={true}
          onSelectionChange={this.onSelectionChange}
          isDownload={true}
          searchBar={true}
        />
      </>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      enqueueSnackbar: enqueueSnackbar,
      resetGenerator: resetGenerator,
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    i18n: state.i18n,
  };
}

PasswordTable.propTypes = {
  applicationId: PropTypes.string,
  name: PropTypes.string,
  isResetDialogOpen: PropTypes.bool,
  passwordDialog: PropTypes.bool,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(PasswordGeneratorStyles)(PasswordTable));
