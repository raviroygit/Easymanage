
import axiosInstance from '../axiosInstance/axiosInstance';
import {
  GET_TERMINAL_SUCCESS,
  GET_TERMINAL_FAILURE,
  RESET_TERMINAL
} from '../../../constants/constants'

import { enqueueSnackbar } from '../../actions/Notifier/NotifierAction';
import { I18n } from 'react-redux-i18n';

export const getTerminalById = (id) => {
  return (dispatch) => {
    axiosInstance()
      .get(`${process.env.REACT_APP_API_URL}/terminal/${id}`)
      .then(response => {
        dispatch(getTerminalSuccess(response.data));
      })
      .catch(error => {
        if (error.response) {
          dispatch(getTerminalFailure(error.message));
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


export const getTerminalSuccess = terminal => {
  return {
    type: GET_TERMINAL_SUCCESS,
    payload: terminal
  }
}

export const getTerminalFailure = error => {
  return {
    type: GET_TERMINAL_FAILURE,
    payload: error
  }
}

export const resetTerminal = () => {
  return {
    type: RESET_TERMINAL,
    payload: ''
  }
}
