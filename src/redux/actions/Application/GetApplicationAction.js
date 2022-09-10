
import axiosInstance from '../axiosInstance/axiosInstance';
import {
  GET_APPLICATION_SUCCESS,
  GET_APPLICATION_FAILURE,
  RESET_APPLICATION
} from '../../../constants/constants';
import { I18n } from 'react-redux-i18n';
import { enqueueSnackbar } from '../../actions/Notifier/NotifierAction';


export const getApplicationById = (id) => {
  return (dispatch) => {
    axiosInstance()
      .get(`${process.env.REACT_APP_API_URL}/application/getApplication/${id}`)
      .then(response => {
        dispatch(getApplicationSuccess(response.data));
      })
      .catch(error => {
        if (error.response) {
          dispatch(getApplicationFailure(error.message));
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


export const getApplicationSuccess = file => {
  return {
    type: GET_APPLICATION_SUCCESS,
    payload: file
  }
}

export const getApplicationFailure = error => {
  return {
    type: GET_APPLICATION_FAILURE,
    payload: error
  }
}
export const resetApplication = reset => {
  return {
    type: RESET_APPLICATION,
    payload: ''
  }
}

