import {
  TERMINALS_SERIAL_NUMBER_SUCCESS,
  TERMINALS_SERIAL_NUMBER_FAILURE,
  TERMINALS_SERIAL_NUMBER_RESET,
} from '../../../constants/constants'
import { enqueueSnackbar } from '../../actions/Notifier/NotifierAction';
import { I18n } from 'react-redux-i18n';
import axiosInstance from '../axiosInstance/axiosInstance';

export const getTerminalSerialNumberList = () => {
  return (dispatch) => {
    axiosInstance()
      .get(`${process.env.REACT_APP_API_URL}/terminal/serialList`)
      .then(response => {
        const terminals = response.data
        dispatch(terminalSerialListSuccess(terminals))
      })
      .catch(error => {
        if (error.response) {
          dispatch(terminalSerialListFailure(error.message));
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


export const terminalSerialListSuccess = terminals => {
  return {
    type: TERMINALS_SERIAL_NUMBER_SUCCESS,
    payload: terminals
  }
}

export const terminalSerialListFailure = error => {
  return {
    type: TERMINALS_SERIAL_NUMBER_FAILURE,
    payload: error
  }
}

export const terminalSerialListReset = () => {
  return {
    type: TERMINALS_SERIAL_NUMBER_RESET,
    payload: []
  }
}