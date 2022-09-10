/* eslint-disable no-useless-concat */
import axios from 'axios';
import {
  USER_RESET_PASSWORD_SUCCESS,
  USER_RESET_PASSWORD_FAILURE,
} from '../../../constants/constants';
import { enqueueSnackbar } from '../Notifier/NotifierAction';
import { I18n } from 'react-redux-i18n';
import { loader } from '../Loader/LoaderActions';
import { isAdminSessionExpire } from '../../../lib/keycloak/isAdminSessionExpire';

export const resetUserPassword = (token, id, userEditData) => {
  return async (dispatch) => {
    const RegeneratedAdminToken = await isAdminSessionExpire(token);
    const config = {
      headers: { Authorization: `Bearer ${RegeneratedAdminToken}` }
    };
    dispatch(loader(true));
    axios
      .put(`${process.env.REACT_APP_AUTH_URL}/admin/realms/${process.env.REACT_APP_REALMS}/users/${id}/reset-password`, userEditData, config)
      .then(response => {
        dispatch(loader(false));
        dispatch(resetUserPasswordSuccess(response.data));
        dispatch(enqueueSnackbar({
          message: I18n.t(("USER_MANAGEMENT.RESET_PASSWORD")),
          options: {
            variant: 'success'
          }
        }));
      })
      .catch(error => {
        dispatch(loader(false));
        if (error.response) {
          dispatch(resetUserPasswordFailure(error.response));
          dispatch(enqueueSnackbar({
            message: I18n.t(`ERRORCODES.${error.response.data.errorMessage}`),
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
  };
};


export const resetUserPasswordSuccess = resetUserPassword => {
  return {
    type: USER_RESET_PASSWORD_SUCCESS,
    payload: resetUserPassword
  }
}

export const resetUserPasswordFailure = error => {
  return {
    type: USER_RESET_PASSWORD_FAILURE,
    payload: error
  }
}