
import axiosInstance from '../axiosInstance/axiosInstance';
import {
  GET_FILE_SUCCESS,
  GET_FILE_FAILURE,
  RESET_FILE
} from '../../../constants/constants'
import { I18n } from 'react-redux-i18n';
import { enqueueSnackbar } from '../../actions/Notifier/NotifierAction';

export const getFileById = (id) => {
  return (dispatch) => {
    axiosInstance()
      .get(`${process.env.REACT_APP_API_URL}/filestore/getFileById/${id}`)
      .then(response => {
        dispatch(getFileSuccess(response.data));
      })
      .catch(error => {
        if (error.response) {
          dispatch(getFileFailure(error.message));
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


export const getFileSuccess = file => {
  return {
    type: GET_FILE_SUCCESS,
    payload: file
  }
}

export const getFileFailure = error => {
  return {
    type: GET_FILE_FAILURE,
    payload: error
  }
}

export const resetGetFile = reset => {
  return {
    type: RESET_FILE,
    payload: ''
  }
}
