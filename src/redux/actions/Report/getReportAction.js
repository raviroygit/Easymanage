
import axiosInstance from '../axiosInstance/axiosInstance';
import {
  GET_REPORT_SUCCESS,
  GET_REPORT_FAILURE,
  RESET_REPORT
} from '../../../constants/constants';
import { I18n } from 'react-redux-i18n';
import { enqueueSnackbar } from '../../actions/Notifier/NotifierAction';
import { loader } from '../Loader/LoaderActions';

export const getReport = (data) => {
  return (dispatch) => {
    dispatch(loader(true));
    axiosInstance()
      .post(`${process.env.REACT_APP_API_URL}/report`, data)
      .then(response => {
        dispatch(loader(false));
        dispatch(getReportSuccess(response.data));
      })
      .catch(error => {
        dispatch(loader(false));
        if (error.response) {
          dispatch(getReportFailure(error.message));
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


export const getReportSuccess = data => {
  return {
    type: GET_REPORT_SUCCESS,
    payload: data
  }
}

export const getReportFailure = error => {
  return {
    type: GET_REPORT_FAILURE,
    payload: error
  }
}
export const resetReport = () => {
  return {
    type: RESET_REPORT,
    payload: ''
  }
}

