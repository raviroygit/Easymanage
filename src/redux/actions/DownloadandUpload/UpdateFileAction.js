import axiosInstance from '../axiosInstance/axiosInstance';
import {
  UPDATE_FILE_SUCCESS,
  UPDATE_FILE_FAILURE,
} from '../../../constants/constants';
import { enqueueSnackbar } from '../Notifier/NotifierAction';
import { I18n } from 'react-redux-i18n';
import { loadFiles } from './FileListAction';
import { loader } from '../Loader/LoaderActions';

export const updateFile = (id, file, options) => {
  return (dispatch) => {
    dispatch(loader(true));
    axiosInstance()
      .put(`${process.env.REACT_APP_API_URL}/filestore/update/${id}`, file, options)
      .then(response => {
        dispatch(loader(false));
        dispatch(importTerminalSuccess(response));
        dispatch(loadFiles());
        dispatch(enqueueSnackbar({
          message: I18n.t('FILE_UPLOAD.UPDATE_SUCCESS'),
          options: {
            variant: 'success'
          }
        }));
      })
      .catch(error => {
        dispatch(loader(false));
        if (error.response) {
          dispatch(importTerminalFailure(error.message));
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


export const importTerminalSuccess = update => {
  return {
    type: UPDATE_FILE_SUCCESS,
    payload: update
  }
}

export const importTerminalFailure = error => {
  return {
    type: UPDATE_FILE_FAILURE,
    payload: error
  }
}