import {
  DASHBOARD_SUCCESS,
  DASHBOARD_FAILURE,
  DASHBOARD_RESET,
} from '../../../constants/constants'
import { enqueueSnackbar } from '../Notifier/NotifierAction';
import { I18n } from 'react-redux-i18n';
import axiosInstance from '../axiosInstance/axiosInstance';

import { loader } from '../Loader/LoaderActions';

export const dashboardDetails = (data) => {
  return (dispatch) => {
    dispatch(loader(true));
    axiosInstance()
      .post(`${process.env.REACT_APP_API_URL}/dashboard/detail`, data)
      .then(response => {
        dispatch(loader(false));
        dispatch(dashboardSuccess(response.data))
      })
      .catch(error => {
        dispatch(loader(false));

        if (error.response) {
          dispatch(dashboardFailure(error.message));
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


export const dashboardSuccess = terminals => {
  return {
    type: DASHBOARD_SUCCESS,
    payload: terminals
  }
}

export const dashboardFailure = error => {
  return {
    type: DASHBOARD_FAILURE,
    payload: error
  }
}

export const dashboardReset = () => {
  return {
    type: DASHBOARD_RESET,
    payload: ''
  }
}