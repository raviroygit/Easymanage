/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  Grid,
  withStyles,
} from "@material-ui/core";
import { CallSettingStyles } from "./CallSettingStyles";
import { I18n } from "react-redux-i18n";
import DataTable from '../../presentation/DataTable/DataTable';
import { useDispatch, useSelector } from "react-redux";
import { callSchedule } from '../../../redux/actions/CallSetting/CallScheduleAction';
import { Add as AddIcon, Edit as EditIcon } from "@material-ui/icons";
import Tooltip from '@material-ui/core/Tooltip';
import CallSetting from './CallSetting';
import DeleteIcon from '@material-ui/icons/Delete';
import AlertDialog from '../AlertDialog/AlertDialog';
import { deleteScheduledCallById } from '../../../redux/actions/CallSetting/DeleteCall';
import { isAuthorized } from '../../../lib/keycloak/Permissions';
import { PERMISSIONS } from '../../../constants/constants';
import Fab from '@material-ui/core/Fab';

function CallScheduleTable(props) {
  const { classes } = props;
  const dispatch = useDispatch();
  const [addCall, setAddCall] = useState(false);
  const [callId, setCallId] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [deleteDialog, setDeletedDialog] = useState(false);
  const i18n = useSelector(state => state.i18n);

  useEffect(() => {
    dispatch(callSchedule());
  }, []);

  const callScheduleData = useSelector(state => state.callSchedule);

  const handleOpenCall = () => {
    setAddCall(true);
  };

  const handleClose = () => {
    setAddCall(false);
    setIsEdit(false);
    setCallId('');
    setDeletedDialog(false);
  };
  const terminalArrayFormatDocument = (terminalArray) => {
    let terminalString = terminalArray.join(', ');
    return (<span>{terminalString}</span>);
  };

  const handleEdit = (e, id) => {
    setAddCall(true);
    setCallId(id);
    setIsEdit(true);
  };

  const handleDelete = (e, id) => {
    setDeletedDialog(true);
    setCallId(id);
  };

  const onAgree = (id) => {
    dispatch(deleteScheduledCallById(id));
    setDeletedDialog(false);
  };

  const columns = [
    {
      name: `${I18n.t("CALL_SETTINGS.SELECTED_TERMINALS")}`,
      selector: "terminalSerialNumber",
      type: "string",
      formatter: x => terminalArrayFormatDocument(x),
    },
    {
      name: `${I18n.t("CALL_SETTINGS.EXECUTE_ON")}`,
      selector: "executeOn",
    },
    {
      name: `${I18n.t("CALL_SETTINGS.CALL_TYPES")}`,
      selector: "type",
    },
    {
      name: `${I18n.t("CALL_SETTINGS.FILE_NAME")}`,
      selector: "file",
    },
    {
    name: `${I18n.t("CALL_SETTINGS.Version")}`,
      selector: "version",
    },
    {
      name: `${I18n.t("CALL_SETTINGS.STARTING_DATE")}`,
      type: "date",
      selector: "startDateTime",
    },
    {
      name: `${I18n.t("CALL_SETTINGS.ENDING_DATE")}`,
      type: "date",
      selector: "endDateTime",
    },
  ];

  const action = {
    name: `${I18n.t("FORM.ACTIONS")}`,
    type: "actions",
    actions: [],
  };
  if (isAuthorized(PERMISSIONS.CALL_SETTINGS_EDIT)) {
    action.actions.push({
      name: I18n.t("MISC.EDIT"),
      handler: handleEdit,
      icon: <EditIcon />
    })
  }
  if (isAuthorized(PERMISSIONS.CALL_SETTINGS_DELETE)) {
    action.actions.push({
      name: I18n.t("MISC.DELETE"),
      handler: handleDelete,
      icon: <DeleteIcon />,
    })
  }
  if (isAuthorized(PERMISSIONS.CALL_SETTINGS_EDIT) || isAuthorized(PERMISSIONS.CALL_SETTINGS_DELETE)) {
    columns.push(action);
  }
  return (
    <Grid className={classes.callScheduleOuterBox}>
      {isAuthorized(PERMISSIONS.CALL_SETTING_ADD) &&
        <Fab size='small' className={classes.addIcon}>
          <Tooltip title={I18n.t("USER_MANAGEMENT.ADD_USER_TOOLTIP")}>
            <AddIcon className={classes.iconOnTop} size="large" onClick={handleOpenCall} />
          </Tooltip>
        </Fab>
      }
      <CallSetting
        open={addCall}
        handleClose={handleClose}
        id={callId}
        isEdit={isEdit}
      />
      <Grid className={classes.scheduleTableBox}>
        <DataTable
          columns={columns}
          data={callScheduleData ? callScheduleData : []}
          dataKey="_id"
          order="desc"
          orderBy="startDateTime"
          checkbox={false}
          pagination={true}
          isDownload={true}
          searchBar={true}
          heightClass="data-table-area-no-toolbar-for-terminal"
        />
      </Grid>
      <AlertDialog
        open={deleteDialog}
        onAgree={(e) => onAgree(callId)}
        onDisagree={handleClose}
        title={I18n.t('CALL_SETTINGS.ALERT.DELETE_CALL_SCHEDULED')}
        content={I18n.t('CALL_SETTINGS.ALERT.DELETE_CONTENT')}
      />
    </Grid>
  );
}

export default withStyles(CallSettingStyles)(CallScheduleTable);
