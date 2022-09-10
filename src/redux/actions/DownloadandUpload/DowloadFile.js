
import axiosInstance from '../axiosInstance/axiosInstance';
import {
  DOWNLOAD_FILE_SUCCESS,
  DOWNLOAD_FILE_FAILURE,
} from '../../../constants/constants'
import { I18n } from 'react-redux-i18n';
import { enqueueSnackbar } from '../../actions/Notifier/NotifierAction';
import download from 'js-file-download';

export const downloadFile = (id, fileName) => {
  return (dispatch) => {
    axiosInstance()
      .get(`${process.env.REACT_APP_API_URL}/filestore/download`, { params: id })
      .then(response => {
        download(response.data, fileName);
        dispatch(downloadFileSuccess(response.data));
      })
      .catch(error => {
        if (error.response) {
          dispatch(downloadFileFailure(error.message));
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


export const downloadFileSuccess = file => {
  return {
    type: DOWNLOAD_FILE_SUCCESS,
    payload: file
  }
}

export const downloadFileFailure = error => {
  return {
    type: DOWNLOAD_FILE_FAILURE,
    payload: error
  };
};
