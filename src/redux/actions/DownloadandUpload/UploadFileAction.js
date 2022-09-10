import axiosInstance from '../axiosInstance/axiosInstance';
import {
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAILURE,
} from '../../../constants/constants';
import { enqueueSnackbar } from '../Notifier/NotifierAction';
import { I18n } from 'react-redux-i18n';
import { loadFiles } from './FileListAction';
import { loader } from '../Loader/LoaderActions';

export const uploadFile = (file, options) => {
  return (dispatch) => {
    dispatch(loader(true));
    axiosInstance()
      .post(`${process.env.REACT_APP_API_URL}/filestore/upload`, file, options)
      .then(response => {
        dispatch(loader(false));
        dispatch(uploadFileSuccess());
        dispatch(loadFiles());
        dispatch(enqueueSnackbar({
          message: I18n.t('FILE_UPLOAD.UPLOAD_SUCCESS'),
          options: {
            variant: 'success'
          }
        }));
      })
      .catch(error => {
        dispatch(loader(false));
        if (error.response) {
          dispatch(uploadFileFailure(error.message));
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


export const uploadFileSuccess = upload => {
  return {
    type: UPLOAD_FILE_SUCCESS,
    payload: upload
  }
}

export const uploadFileFailure = error => {
  return {
    type: UPLOAD_FILE_FAILURE,
    payload: error
  }
}