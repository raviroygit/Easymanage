import axiosInstance from "../axiosInstance/axiosInstance";
import { enqueueSnackbar } from "../../actions/Notifier/NotifierAction";
import { I18n } from "react-redux-i18n";
import {
  ACTIVE_INACTIVE_TERMINALS_SUCCESS,
  ACTIVE_INACTIVE_TERMINALS_FAILURE,
  ACTIVE_STATUS, INACTIVE_STATUS,
} from "../../../constants/constants";
import { loadTerminals } from '../Terminals/TerminalsListAction'
import { GetUserAssociatedGroups } from '../../../lib/keycloak/GetUserAssociateGroupOrSubgroups';

export const activeInactiveTerminals = (data) => {
  return (dispatch) => {
    axiosInstance()
      .post(`${process.env.REACT_APP_API_URL}/terminal/statusChange`, data)
      .then((response) => {
        dispatch(activeInactiveTerminalsSuccess(response.data));
        dispatch(loadTerminals(GetUserAssociatedGroups()));
        if (response.data.successCode === ACTIVE_STATUS) {
          dispatch(enqueueSnackbar({
            message: I18n.t(`TERMINAL.ALERT.ACTIVE_STATUS`),
            options: {
              variant: 'success'
            }
          }));
        }
        else if (response.data.successCode === INACTIVE_STATUS) {
          dispatch(enqueueSnackbar({
            message: I18n.t(`TERMINAL.ALERT.INACTIVE_STATUS`),
            options: {
              variant: 'success'
            }
          }));
        }
      })
      .catch(error => {
        if (error.response) {
          dispatch(activeInactiveTerminalsFailure(error.message));
          dispatch(enqueueSnackbar({
            message: I18n.t(`ERRORCODES.UNKNOWN_ERROR`),
            options: {
              variant: 'error'
            }
          }));
        } else {
          dispatch(enqueueSnackbar({
            message: I18n.t(`ERRORCODES.UNKNOWN_ERROR`),
            options: {
              variant: 'error'
            }
          }));
        }
      })
  };
};

export const activeInactiveTerminalsSuccess = (data) => {
  return {
    type: ACTIVE_INACTIVE_TERMINALS_SUCCESS,
    payload: data,
  };
};

export const activeInactiveTerminalsFailure = (error) => {
  return {
    type: ACTIVE_INACTIVE_TERMINALS_FAILURE,
    payload: error,
  };
};
