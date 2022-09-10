
import axiosInstance from '../axiosInstance/axiosInstance';
import {
  UPLOAD_APPLICATION_SUCCESS,
  UPLOAD_APPLICATION_FAILURE,
} from '../../../constants/constants';
import { enqueueSnackbar } from '../Notifier/NotifierAction';
import { I18n } from 'react-redux-i18n';
import { loadApplication } from './ApplicationListAction';
import { loader } from '../Loader/LoaderActions';

export const uploadApplicationFile = (file, options) => {
  return (dispatch) => {
    dispatch(loader(true));
    axiosInstance()
      .post(`${process.env.REACT_APP_API_URL}/application/upload`, file, options)
      .then(response => {
        dispatch(loader(false));
        dispatch(uploadApplicationSuccess(response.data));
        dispatch(loadApplication());
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
          dispatch(uploadApplicationFailure(error.message));
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


export const uploadApplicationSuccess = upload => {
  return {
    type: UPLOAD_APPLICATION_SUCCESS,
    payload: upload
  }
}

export const uploadApplicationFailure = error => {
  return {
    type: UPLOAD_APPLICATION_FAILURE,
    payload: error
  }
}