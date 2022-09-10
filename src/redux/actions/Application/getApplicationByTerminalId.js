
import axiosInstance from '../axiosInstance/axiosInstance';
import {
    GET_APPLICATION_BY_TERMINAL_ID_SUCCESS,
    GET_APPLICATION_BY_TERMINAL_ID_FAILURE,
    RESET_APPLICATION_BY_TERMINAL_ID,
} from '../../../constants/constants';
import { I18n } from 'react-redux-i18n';
import { enqueueSnackbar } from '../../actions/Notifier/NotifierAction';


export const getApplicationByTerminalId = (id) => {
  return (dispatch) => {
    axiosInstance()
      .get(`${process.env.REACT_APP_API_URL}/application/byTerminalId`,{params:{id:id}})
      .then(response => {
        dispatch(getApplicationByTerminalIdSuccess(response.data));
      })
      .catch(error => {
        if (error.response) {
          dispatch(getApplicationByTerminalIdFailure(error.message));
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


export const getApplicationByTerminalIdSuccess = file => {
  return {
    type: GET_APPLICATION_BY_TERMINAL_ID_SUCCESS,
    payload: file
  }
}

export const getApplicationByTerminalIdFailure = error => {
  return {
    type: GET_APPLICATION_BY_TERMINAL_ID_FAILURE,
    payload: error
  }
}
export const resetApplicationByTerminalId = reset => {
  return {
    type: RESET_APPLICATION_BY_TERMINAL_ID,
    payload: ''
  }
}

