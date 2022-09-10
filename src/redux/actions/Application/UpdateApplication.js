import axiosInstance from '../axiosInstance/axiosInstance';
import {
  UPDATE_APPLICATION_SUCCESS,
  UPDATE_APPLICATION_FAILURE,
} from '../../../constants/constants';
import { enqueueSnackbar } from '../../actions/Notifier/NotifierAction';
import { I18n } from 'react-redux-i18n';
import { loadApplication } from './ApplicationListAction';
import { loader } from '../Loader/LoaderActions';


export const updateApplication = (id, file, options) => {
  return (dispatch) => {
    dispatch(loader(true));
    axiosInstance()
      .put(`${process.env.REACT_APP_API_URL}/application/update/${id}`, file, options)
      .then(response => {
        dispatch(updateApplicationSuccess(response));
        dispatch(loadApplication());
        dispatch(enqueueSnackbar({
          message: I18n.t('FILE_UPLOAD.UPDATE_SUCCESS'),
          options: {
            variant: 'success'
          }
        }));
      })
      .catch(error => {
        if (error.response) {
          dispatch(updateApplicationFailure(error.message));
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


export const updateApplicationSuccess = update => {
  return {
    type: UPDATE_APPLICATION_SUCCESS,
    payload: update
  }
}

export const updateApplicationFailure = error => {
  return {
    type: UPDATE_APPLICATION_FAILURE,
    payload: error
  }
}