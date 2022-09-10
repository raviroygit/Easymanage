
import axiosInstance from '../axiosInstance/axiosInstance';
import {
  DOWNLOAD_LOGS_FILE_SUCCESS,
  DOWNLOAD_LOGS_FILE_FAILURE,
} from '../../../constants/constants'
import { I18n } from 'react-redux-i18n';
import { enqueueSnackbar } from '../../actions/Notifier/NotifierAction';
import download from 'js-file-download';

export const downloadLogs = (data, fileName) => {

  return (dispatch) => {
    axiosInstance()
      .post(`${process.env.REACT_APP_API_URL}/download-logs`, data)
      .then(response => {
        download(response.data, fileName);
        dispatch(downloadLogsSuccess(response));
      })
      .catch(error => {
        if (error.response) {
          dispatch(downloadLogsFailure(error.message));
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


export const downloadLogsSuccess = file => {
  return {
    type: DOWNLOAD_LOGS_FILE_SUCCESS,
    payload: file
  }
}

export const downloadLogsFailure = error => {
  return {
    type: DOWNLOAD_LOGS_FILE_FAILURE,
    payload: error
  };
};
