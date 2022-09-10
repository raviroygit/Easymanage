import axiosInstance from '../axiosInstance/axiosInstance';
import {
  DELETE_FEATURES_PERMISSION_SUCCESS,
  DELETE_FEATURES_PERMISSION_FAILURE,
} from '../../../constants/constants';
import { enqueueSnackbar } from '../Notifier/NotifierAction';
import { I18n } from 'react-redux-i18n';


export const deletePermission = (permissionData) => {
  return (dispatch) => {
    axiosInstance()
      .post(`${process.env.REACT_APP_API_URL}/deletePermission`, permissionData)
      .then(response => {
        dispatch(deletePermissionSuccess(response));
        dispatch(enqueueSnackbar({
          message: I18n.t('USER_MANAGEMENT.PERMISSION_DELETED'),
          options: {
            variant: 'success'
          }
        }));
      })
      .catch(error => {
        if (error.response) {
          dispatch(deletePermissionFailure(error.message));
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
};

export const deletePermissionSuccess = (deletePermission) => {
  return {
    type: DELETE_FEATURES_PERMISSION_SUCCESS,
    payload: deletePermission
  }
}

export const deletePermissionFailure = error => {
  return {
    type: DELETE_FEATURES_PERMISSION_FAILURE,
    payload: error
  }
}