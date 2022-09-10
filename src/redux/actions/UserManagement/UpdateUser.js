/* eslint-disable no-useless-concat */
import axios from 'axios';
import {
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
} from '../../../constants/constants';
import { enqueueSnackbar } from '../Notifier/NotifierAction';
import { I18n } from 'react-redux-i18n';
import { userList } from './UserList';
import { loader } from '../Loader/LoaderActions';
import { isAdminSessionExpire } from '../../../lib/keycloak/isAdminSessionExpire';

export const updateUser = (token, id, userEditData, isReset) => {
  return async (dispatch) => {
    const RegeneratedAdminToken = await isAdminSessionExpire(token);
    const config = {
      headers: { Authorization: `Bearer ${RegeneratedAdminToken}` }
    };
    dispatch(loader(true));
    axios
      .put(`${process.env.REACT_APP_AUTH_URL}/admin/realms/${process.env.REACT_APP_REALMS}/users/${id}`, userEditData, config)
      .then(response => {
        dispatch(loader(false));
        dispatch(updateUserSuccess(response.data));
        dispatch(userList(RegeneratedAdminToken));
        if (isReset) {
          dispatch(enqueueSnackbar({
            message: I18n.t(("USER_MANAGEMENT.RESET_PASSWORD")),
            options: {
              variant: 'success'
            }
          }));
        } else {
          dispatch(enqueueSnackbar({
            message: I18n.t(("USER_MANAGEMENT.USER_UPDATED")),
            options: {
              variant: 'success'
            }
          }));
        }

      })
      .catch(error => {
        dispatch(loader(false));
        if (error.response) {
          dispatch(updateUserFailure(error.response));
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


export const updateUserSuccess = user => {
  return {
    type: UPDATE_USER_SUCCESS,
    payload: user
  }
}

export const updateUserFailure = error => {
  return {
    type: UPDATE_USER_FAILURE,
    payload: error
  }
}