import axiosInstance from '../axiosInstance/axiosInstance';
import {
  IMPORT_TERMINAL_SUCCESS,
  IMPORT_TERMINAL_FAILURE
} from '../../../constants/constants';
import { enqueueSnackbar } from '../Notifier/NotifierAction';
import { I18n } from 'react-redux-i18n';
import { progressImportTerminal } from './ProgressImportTerminal';

export const importTerminal = (file, options) => {
  return (dispatch) => {
    axiosInstance()
      .post(`${process.env.REACT_APP_API_URL}/terminalImport`, file, options)
      .then(response => {
        dispatch(progressImportTerminal(true));
        dispatch(importTerminalSuccess(response));
        dispatch(enqueueSnackbar({
          message: I18n.t('TERMINAL.TERMINAL_IMPORT_SUCCESS'),
          options: {
            variant: 'success'
          }
        }));
      })
      .catch(error => {
        if (error.response) {
          dispatch(progressImportTerminal(false));
          dispatch(importTerminalFailure(error.message));
          dispatch(enqueueSnackbar({
            message: I18n.t(`ERRORCODES.${error.response.data.errorCode}`),
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


export const importTerminalSuccess = importTerminal => {
  return {
    type: IMPORT_TERMINAL_SUCCESS,
    payload: importTerminal
  }
}

export const importTerminalFailure = error => {
  return {
    type: IMPORT_TERMINAL_FAILURE,
    payload: error
  }
}
