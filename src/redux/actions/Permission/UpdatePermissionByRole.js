import axiosInstance from '../axiosInstance/axiosInstance';
import {
  UPDATE_FEATURES_PERMISSION_SUCCESS,
  UPDATE_FEATURES_PERMISSION_FAILURE,
} from '../../../constants/constants';
import { enqueueSnackbar } from '../Notifier/NotifierAction';
import { I18n } from 'react-redux-i18n';
import { loader } from '../Loader/LoaderActions';

export const updatePermission = (permissionData) => {
  return (dispatch) => {
    dispatch(loader(true));
    axiosInstance()
      .put(`${process.env.REACT_APP_API_URL}/permission`, permissionData)
      .then(response => {
        dispatch(loader(false));
        dispatch(updatePermissionSuccess(response));
        dispatch(enqueueSnackbar({
          message: I18n.t('USER_MANAGEMENT.PERMISSION_ASSIGNED'),
          options: {
            variant: 'success'
          }
        }));
      })
      .catch(error => {
        dispatch(loader(false));
        if (error.response) {
          dispatch(updatePermissionFailure(error.message));
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


export const updatePermissionSuccess = update => {
  return {
    type: UPDATE_FEATURES_PERMISSION_SUCCESS,
    payload: update
  }
}

export const updatePermissionFailure = error => {
  return {
    type: UPDATE_FEATURES_PERMISSION_FAILURE,
    payload: error
  }
}