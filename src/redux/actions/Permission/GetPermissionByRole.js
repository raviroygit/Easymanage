
import axiosInstance from '../axiosInstance/axiosInstance';
import {
  GET_PERMISSION_BY_ROLE_SUCCESS,
  GET_PERMISSION_BY_ROLE_FAILURE,
} from '../../../constants/constants'

import { enqueueSnackbar } from '../../actions/Notifier/NotifierAction';
import { I18n } from 'react-redux-i18n';

export const getPermissionByRole = (role) => {
  return (dispatch) => {
    axiosInstance()
      .post(`${process.env.REACT_APP_API_URL}/getPermissionByRole`, role)
      .then(response => {
        dispatch(getPermissionByRoleSuccess(response.data));
      })
      .catch(error => {
        if (error.response) {
          dispatch(getPermissionByRoleFailure(error.message));
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


export const getPermissionByRoleSuccess = permission => {
  return {
    type: GET_PERMISSION_BY_ROLE_SUCCESS,
    payload: permission
  }
}

export const getPermissionByRoleFailure = error => {
  return {
    type: GET_PERMISSION_BY_ROLE_FAILURE,
    payload: error
  }
}

