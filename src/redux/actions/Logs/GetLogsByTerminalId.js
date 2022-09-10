
import axiosInstance from '../axiosInstance/axiosInstance';
import {
  GET_ACCESS_LOG_BY_TERMINAL_ID_SUCCESS,
  GET_ACCESS_LOG_BY_TERMINAL_ID_FAILURE
} from '../../../constants/constants'
import { I18n } from 'react-redux-i18n';
import { enqueueSnackbar } from '../../actions/Notifier/NotifierAction';
import { loader } from '../Loader/LoaderActions';

export const getAccessLogsByTerminalId = (data) => {
  return (dispatch) => {
    dispatch(loader(true));
    axiosInstance()
      .post(`${process.env.REACT_APP_API_URL}/statusLogs`, data)
      .then(response => {
        dispatch(loader(false));
        dispatch(getLogSuccess(response.data));
      })
      .catch(error => {
        dispatch(loader(false));
        if (error.response) {
          dispatch(getLogFailure(error.message));
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


export const getLogSuccess = log => {
  return {
    type: GET_ACCESS_LOG_BY_TERMINAL_ID_SUCCESS,
    payload: log
  }
}

export const getLogFailure = error => {
  return {
    type: GET_ACCESS_LOG_BY_TERMINAL_ID_FAILURE,
    payload: error
  }
}
