/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { withStyles, Grid, Paper } from "@material-ui/core";
import DataTable from '../../presentation/DataTable/DataTable';
import { UserManagementStyles } from './UserManagementStyles';
import { useDispatch, useSelector } from "react-redux";
import { I18n } from "react-redux-i18n";
import { userLog } from '../../../redux/actions/UserManagement/UserLogAction';

function UserLog(props) {
  const { classes } = props;
  const dispatch = useDispatch();
  const userName = useSelector(state => state.userName);
  const i18n = useSelector(state => state.i18n);

  useEffect(() => {
    dispatch(userLog({ user: userName }));
  }, [])

  const userLogData = useSelector(state => state.userLogData);
  
  const actionLanguage = (e) => {
      return I18n.t(`USER_LOG.ACTIONS_LIST.${e}`)
  };

  const terminalArrayFormatDocument = (terminalArray) => {
    let terminalString = terminalArray.join(', ');
    return (<span>{terminalString}</span>)
  };

  const columns = [
    {
      name: `${I18n.t("USER_LOG.DATE")}`,
      type: "date",
      selector: "createdAt",
    },
    {
      name: `${I18n.t("USER_LOG.USER")}`,
      selector: "user",
    },
    {
      name: `${I18n.t("USER_LOG.ACTION")}`,
      selector: "action",
      type: "string",
      formatter: x => actionLanguage(x),

    },
    {
      name: `${I18n.t("USER_LOG.TERMINALS")}`,
      selector: "terminals",
      type: "string",
      formatter: x => terminalArrayFormatDocument(x),
    },
    {
      name: `${I18n.t("USER_LOG.COMMENT")}`,
      selector: "comment",
    },
  ];
  return (
    <Paper className={classes.userLogPage}>
        <DataTable
          columns={columns}
          data={userLogData ? userLogData : []}
          dataKey="_id"
          order="desc"
          orderBy="createdAt"
          checkbox={false}
          pagination={true}
          isDownload={true}
          searchBar={true}
          heightClass="data-table-area-no-toolbar-for-terminal"
        />
    </Paper>
  );
}

export default withStyles(UserManagementStyles)(UserLog);