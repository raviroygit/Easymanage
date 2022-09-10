
import axiosInstance from '../axiosInstance/axiosInstance';
import {
  FEATURES_PERMISSIONS_SUCCESS,
  FEATURES_PERMISSIONS_FAILURE,
  FEATURES_PERMISSIONS_RESET
} from '../../../constants/constants'
import { enqueueSnackbar } from '../../actions/Notifier/NotifierAction';
import { I18n } from 'react-redux-i18n';
import { loader } from '../Loader/LoaderActions';

export const getFeaturesPermissionByRole = (role) => {
  return (dispatch) => {
    dispatch(loader(true));
    axiosInstance()
      .post(`${process.env.REACT_APP_API_URL}/getPermissionByRole`, role)
      .then(response => {
        dispatch(loader(false));
        dispatch(getFeaturesPermissionByRoleSuccess(response.data));
      })
      .catch(error => {
        dispatch(loader(false));
        if (error.response) {
          dispatch(getFeaturesPermissionByRoleFailure(error.message));
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


export const getFeaturesPermissionByRoleSuccess = permission => {
  return {
    type: FEATURES_PERMISSIONS_SUCCESS,
    payload: permission
  }
}

export const getFeaturesPermissionByRoleFailure = error => {
  return {
    type: FEATURES_PERMISSIONS_FAILURE,
    payload: error
  }
}

export const resetFeaturesPermissionByRole = () => {
  return {
    type: FEATURES_PERMISSIONS_RESET,
    payload: ''
  }
}

