
import axiosInstance from '../axiosInstance/axiosInstance';
import {
    GET_AAP_DETAILS_BY_VERSION_SUCCESS,
    GET_AAP_DETAILS_BY_VERSION_FAILURE,
    RESET_AAP_DETAILS_BY_VERSION
} from '../../../constants/constants';
import { I18n } from 'react-redux-i18n';
import { enqueueSnackbar } from '../../actions/Notifier/NotifierAction';


export const getApplicationByVersion = (id) => {
  return (dispatch) => {
    axiosInstance()
      .get(`${process.env.REACT_APP_API_URL}/application/getApplication/${id}`)
      .then(response => {
        dispatch(getApplicationByVersionSuccess(response.data));
      })
      .catch(error => {
        if (error.response) {
          dispatch(getApplicationByVersionFailure(error.message));
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


export const getApplicationByVersionSuccess = file => {
  return {
    type: GET_AAP_DETAILS_BY_VERSION_SUCCESS,
    payload: file
  }
}

export const getApplicationByVersionFailure = error => {
  return {
    type: GET_AAP_DETAILS_BY_VERSION_FAILURE,
    payload: error
  }
}
export const resetApplicationByVersion = reset => {
  return {
    type: RESET_AAP_DETAILS_BY_VERSION,
    payload: ''
  }
}

