
import axiosInstance from '../axiosInstance/axiosInstance';
import {
  GET_CALL_SUCCESS,
  GET_CALL_FAILURE,
  GET_CALL_RESET,
} from '../../../constants/constants'

import { enqueueSnackbar } from '../../actions/Notifier/NotifierAction';
import { I18n } from 'react-redux-i18n';

export const getCallById = (id) => {
  return (dispatch) => {
    axiosInstance()
      .get(`${process.env.REACT_APP_API_URL}/call/${id}`)
      .then(response => {
        dispatch(getCallByIdSuccess(response.data));
      })
      .catch(error => {
        if (error.response) {
          dispatch(getCallByIdFailure(error.message));
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


export const getCallByIdSuccess = call => {
  return {
    type: GET_CALL_SUCCESS,
    payload: call
  }
}

export const getCallByIdFailure = error => {
  return {
    type: GET_CALL_FAILURE,
    payload: error
  }
}

export const resetGetCallByIdSuccess = () => {
  return {
    type: GET_CALL_RESET,
    payload: ''
  }
}

