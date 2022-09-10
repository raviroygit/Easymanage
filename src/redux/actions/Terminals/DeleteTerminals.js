
import axiosInstance from '../axiosInstance/axiosInstance';
import {
  DELETE_TERMINALS_SUCCESS,
  DELETE_TERMINALS_FAILURE,
  RESET_TERMINALS,
} from '../../../constants/constants'
import { enqueueSnackbar } from '../Notifier/NotifierAction';
import { loadTerminals } from '../Terminals/TerminalsListAction'
import { I18n } from 'react-redux-i18n';
import { GetUserAssociatedGroups } from '../../../lib/keycloak/GetUserAssociateGroupOrSubgroups';

export const deleteTerminals = (data) => {
  return (dispatch) => {
    axiosInstance()
      .post(`${process.env.REACT_APP_API_URL}/terminal/delete`, data)
      .then(response => {
        dispatch(deleteTerminalsSuccess());
        dispatch(loadTerminals(GetUserAssociatedGroups()));
        dispatch(enqueueSnackbar({
          message: I18n.t('TERMINAL.DELETE'),
          options: {
            variant: 'success'
          }
        }));
      })
      .catch(error => {
        if (error.response) {
          dispatch(deleteTerminalsFailure(error.message));
          dispatch(enqueueSnackbar({
            message: I18n.t(`ERRORCODES.${error.response.data.err.errorCode}`),
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
  }
}


export const deleteTerminalsSuccess = () => {
  return {
    type: DELETE_TERMINALS_SUCCESS,
  }
}

export const deleteTerminalsFailure = error => {
  return {
    type: DELETE_TERMINALS_FAILURE,
    payload: error
  }
}

export const resetTerminals = error => {
  return {
    type: RESET_TERMINALS,
    payload: error
  }
}