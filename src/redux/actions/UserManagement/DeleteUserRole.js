import axios from 'axios';
import {
  DELETE_USER_ROLE_SUCCESS,
  DELETE_USER_ROLE_FAILURE,
} from '../../../constants/constants';
import { enqueueSnackbar } from '../Notifier/NotifierAction';
import { I18n } from 'react-redux-i18n';
import { isAdminSessionExpire } from '../../../lib/keycloak/isAdminSessionExpire';

export const deleteUserRoleByUserID = (token, id, roleData) => {
  return async (dispatch) => {
    const RegeneratedAdminToken = await isAdminSessionExpire(token);
    const config = {
      headers: { Authorization: `Bearer ${RegeneratedAdminToken}` },
      data: roleData
    };
    axios
      .delete(`${process.env.REACT_APP_AUTH_URL}/admin/realms/${process.env.REACT_APP_REALMS}/users/${id}/role-mappings/clients/${process.env.REACT_APP_CLIENT_FRONT_END_ID}`, config)
      .then(response => {
        dispatch(deleteUserRoleByUserIDSuccess());
      })
      .catch(error => {
        if (error.response) {
          dispatch(deleteUserRoleByUserIDFailure(error.message));
          dispatch(enqueueSnackbar({
            message: I18n.t(`ERRORCODES.${error.response.statusText}`),
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


export const deleteUserRoleByUserIDSuccess = roles => {
  return {
    type: DELETE_USER_ROLE_SUCCESS,
    payload: roles
  }
}

export const deleteUserRoleByUserIDFailure = error => {
  return {
    type: DELETE_USER_ROLE_FAILURE,
    payload: error
  }
}